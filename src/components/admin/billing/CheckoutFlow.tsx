'use client';

import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';
import TopTabs from '@/src/components/common/TopTabs';
import { useTabsQueryState } from '@/src/lib/helper/useTabsQueryState';
import { getErrorMessage } from '@/src/lib/getErrorMessage';
import ChoosePlanStep from './ChoosePlanStep';
import CheckoutStep from './CheckoutStep';
import DetailsStep from './DetailsStep';
import { CHECKOUT_STEP_TABS, MOCK_SAVED_CARDS } from './mockBillingData';
import {
  useCreateCheckoutSessionMutation,
  useProcessPaymentMutation,
} from '@/src/redux/features/subscription/subscriptionApi';
import type { BillingCycle, CheckoutSessionResponse } from '@/src/types/billingTypes';
import type {
  BillingDetailsFormValues,
  BillingPeriod,
  CardEntryValues,
  CheckoutStepKey,
  Plan,
} from './types';
import OrderSummaryCard from './OrderSummaryCard';

const EMPTY_DETAILS: BillingDetailsFormValues = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  street: '',
  city: '',
  postalCode: '',
  country: '',
};

const EMPTY_CARD_ENTRY: CardEntryValues = {
  cardNumber: '',
  cardholderName: '',
  expiry: '',
  cvv: '',
};

/**
 * Sandbox card used to complete `process-payment` when the user is returned
 * from PayPal (`…?step=checkout&subscription_id=…`) with an empty card form.
 * The user can override these values in the form before retrying via "Pay Now".
 */
const PAYPAL_RETURN_CARD = {
  cardHolderName: 'string',
  cardNumber: '371449635398431',
  expiryMonth: '12',
  expiryYear: '29',
  cvv: '123',
};

type CheckoutFlowProps = {
  plan: Plan;
  billingPeriod: BillingPeriod;
  onBack: () => void;
  onComplete: () => void;
};

export default function CheckoutFlow({ plan, billingPeriod, onBack, onComplete }: CheckoutFlowProps) {
  const [step, setStep] = useTabsQueryState<CheckoutStepKey>('step', 'plan');
  const [details, setDetails] = useState<BillingDetailsFormValues>(EMPTY_DETAILS);
  const [cardEntry, setCardEntry] = useState<CardEntryValues>(EMPTY_CARD_ENTRY);
  const [selectedCardId, setSelectedCardId] = useState<string | null>(
    MOCK_SAVED_CARDS.find(card => card.isDefault)?.id ?? null,
  );
  const [session, setSession] = useState<CheckoutSessionResponse['data'] | null>(null);
  const [paymentError, setPaymentError] = useState<string | null>(null);

  const [createCheckoutSession, { isLoading: isCreatingCheckout }] =
    useCreateCheckoutSessionMutation();
  const [processPayment, { isLoading: isProcessingPayment }] =
    useProcessPaymentMutation();

  const stepIndex = CHECKOUT_STEP_TABS.findIndex(s => s.key === step);
  const goToStep = (index: number) => {
    const target = CHECKOUT_STEP_TABS[index];
    if (target) setStep(target.key);
  };

  const billingCycle = plan.billingCycle as BillingCycle;

  const searchParams = useSearchParams();
  const payPalSubscriptionId = searchParams.get('subscription_id');
  const autoConfirmAttemptedRef = useRef(false);

  /**
   * PayPal approval callback.
   *
   * After the user approves the subscription on PayPal, the backend returns
   * them to `/admin/dashboard/billing?plan=…&step=checkout&subscription_id=…&ba_token=…&token=…`.
   * When we land here we seed the checkout session from the URL and
   * automatically call `subscription-payment/process-payment` with that
   * subscription id. The card form is shown so the user can retry via
   * "Pay Now" if the auto-confirm fails.
   */
  useEffect(() => {
    if (step !== 'checkout' || !payPalSubscriptionId) return;

    setSession(prev =>
      prev ?? {
        subscriptionId: payPalSubscriptionId,
        isFree: false,
        isRepeatCustomer: true,
        requiresCardEntry: true,
        plan: {
          id: plan.id,
          name: plan.name,
          price: plan.priceMonthly,
          currency: plan.currency,
          billingCycle,
        },
      },
    );

    setCardEntry(prev =>
      prev.cardNumber.length
        ? prev
        : {
            cardNumber: PAYPAL_RETURN_CARD.cardNumber,
            cardholderName: PAYPAL_RETURN_CARD.cardHolderName,
            expiry: `${PAYPAL_RETURN_CARD.expiryMonth}/${PAYPAL_RETURN_CARD.expiryYear}`,
            cvv: PAYPAL_RETURN_CARD.cvv,
          },
    );

    if (autoConfirmAttemptedRef.current) return;
    autoConfirmAttemptedRef.current = true;

    const confirm = async () => {
      const [rawMonth = '', rawYear = ''] = cardEntry.expiry
        .split('/')
        .map(part => part.trim());
      const expiryMonth = rawMonth || PAYPAL_RETURN_CARD.expiryMonth;
      const expiryYear = rawYear || PAYPAL_RETURN_CARD.expiryYear;

      try {
        await processPayment({
          planId: plan.id,
          subscriptionId: payPalSubscriptionId,
          cardHolderName:
            cardEntry.cardholderName || PAYPAL_RETURN_CARD.cardHolderName,
          cardNumber: cardEntry.cardNumber || PAYPAL_RETURN_CARD.cardNumber,
          expiryMonth,
          expiryYear,
          cvv: cardEntry.cvv || PAYPAL_RETURN_CARD.cvv,
          billingCycle,
          saveCard: false,
        }).unwrap();

        onComplete();
      } catch (err) {
        setPaymentError(
          getErrorMessage(
            err,
            'Payment confirmation failed. Click “Pay Now” to retry.',
          ),
        );
        autoConfirmAttemptedRef.current = false;
      }
    };

    confirm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, payPalSubscriptionId, plan.id, billingCycle, onComplete]);

  /**
   * Creates the checkout session. Branching follows the API response:
   *  – free plan  → activated immediately, finish the flow
   *  – `approveUrl` → send the user to PayPal for approval
   *  – `requiresCardEntry` → open the in-app card form, then `processPayment`
   */
  const handleProceedToCheckout = async () => {
    setPaymentError(null);

    try {
      const res = await createCheckoutSession({
        planId: plan.id,
        firstName: details.firstName,
        lastName: details.lastName,
        email: details.email,
        phoneNumber: details.phone,
        streetAddress: details.street,
        city: details.city,
        postalCode: details.postalCode,
        country: details.country,
        billingCycle,
      }).unwrap();

      const result = res.data;

      if (result.isFree) {
        onComplete();
        return;
      }

      if (result.approveUrl) {
        window.location.href = result.approveUrl;
        return;
      }

      setSession(result);
    } catch (err) {
      setPaymentError(
        getErrorMessage(err, 'Unable to start checkout. Please try again.'),
      );
    }
  };

  /** Completes the payment with the card entered in the in-app form. */
  const handlePayNow = async () => {
    if (!session) return;
    setPaymentError(null);

    const [expiryMonth = '', expiryYear = ''] = cardEntry.expiry
      .split('/')
      .map(part => part.trim());

    try {
      await processPayment({
        planId: plan.id,
        subscriptionId: session.subscriptionId,
        cardHolderName: cardEntry.cardholderName,
        cardNumber: cardEntry.cardNumber,
        expiryMonth,
        expiryYear,
        cvv: cardEntry.cvv,
        billingCycle,
        saveCard: false,
      }).unwrap();

      onComplete();
    } catch (err) {
      setPaymentError(
        getErrorMessage(
          err,
          'Payment failed. Please check your card details and try again.',
        ),
      );
    }
  };

  return (
    <div className="space-y-6">
      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center gap-1 text-[13px] font-medium text-[#667085] hover:text-[#101828]"
      >
        <ChevronLeft size={14} /> Back to plan details
      </button>

      <TopTabs variant="stepper" tabs={CHECKOUT_STEP_TABS} activeKey={step} onChange={setStep} />

      {step === 'plan' && (
        <ChoosePlanStep plan={plan} billingPeriod={billingPeriod} onNext={() => goToStep(stepIndex + 1)} />
      )}

      {step === 'details' && (
        <DetailsStep
          plan={plan}
          billingPeriod={billingPeriod}
          values={details}
          onChange={patch => setDetails(prev => ({ ...prev, ...patch }))}
          onNext={() => goToStep(stepIndex + 1)}
        />
      )}

      {step === 'checkout' && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.3fr_1fr]">
          <CheckoutStep
            plan={plan}
            savedCards={MOCK_SAVED_CARDS}
            selectedCardId={selectedCardId}
            onSelectCard={setSelectedCardId}
            cardEntry={cardEntry}
            onCardEntryChange={patch => setCardEntry(prev => ({ ...prev, ...patch }))}
            totalLabel={`$${plan.priceMonthly.toFixed(2)}`}
            session={session}
            error={paymentError}
            isSubmitting={isCreatingCheckout}
            isPaying={isProcessingPayment}
            onSubmit={handleProceedToCheckout}
            onPayNow={handlePayNow}
          />
          <OrderSummaryCard plan={plan} billingPeriod={billingPeriod} />
        </div>
      )}
    </div>
  );
}
