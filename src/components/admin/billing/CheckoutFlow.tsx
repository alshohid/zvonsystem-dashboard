'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';
import toast from 'react-hot-toast';
import TopTabs from '@/src/components/common/TopTabs';
import { useTabsQueryState } from '@/src/lib/helper/useTabsQueryState';
import { getErrorMessage } from '@/src/lib/getErrorMessage';
import ChoosePlanStep from './ChoosePlanStep';
import CheckoutStep from './CheckoutStep';
import DetailsStep from './DetailsStep';
import StepNavigation from './StepNavigation';
import OrderSummaryCard from './OrderSummaryCard';
import { CHECKOUT_STEP_TABS, PAYMENT_GATEWAYS } from './mockBillingData';
import {
  firstCardEntryError,
  firstDetailsError,
  validateCardEntry,
  validateDetails,
  validateDetailsField,
} from './checkoutValidation';
import {
  useCreateCheckoutSessionMutation,
  useProcessPaymentMutation,
} from '@/src/redux/features/subscription/subscriptionApi';
import type { BillingCycle, CheckoutSessionResponse } from '@/src/types/billingTypes';
import type { DetailsFieldErrors } from './checkoutValidation';
import type {
  BillingDetailsFormValues,
  BillingPeriod,
  CardEntryValues,
  CheckoutStepKey,
  PaymentGateway,
  Plan,
} from './types';

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

type CheckoutFlowProps = {
  plan: Plan;
  billingPeriod: BillingPeriod;
  onBack: () => void;
  onComplete: () => void;
};

export default function CheckoutFlow({ plan, billingPeriod, onBack, onComplete }: CheckoutFlowProps) {
  const [step, setStep] = useTabsQueryState<CheckoutStepKey>('step', 'plan');
  const [details, setDetails] = useState<BillingDetailsFormValues>(EMPTY_DETAILS);
  const [detailsErrors, setDetailsErrors] = useState<DetailsFieldErrors>({});
  const [cardEntry, setCardEntry] = useState<CardEntryValues>(EMPTY_CARD_ENTRY);
  const [selectedGateway, setSelectedGateway] = useState<PaymentGateway>(
    PAYMENT_GATEWAYS.find(gateway => gateway.isDefault)?.gateway ?? 'PAYPAL',
  );
  const [session, setSession] = useState<CheckoutSessionResponse['data'] | null>(null);
  const [paymentError, setPaymentError] = useState<string | null>(null);

  const [createCheckoutSession, { isLoading: isCreatingCheckout }] =
    useCreateCheckoutSessionMutation();
  const [processPayment, { isLoading: isProcessingPayment }] =
    useProcessPaymentMutation();

  const stepIndex = CHECKOUT_STEP_TABS.findIndex(tab => tab.key === step);
  const isBusy = isCreatingCheckout || isProcessingPayment;

  /** Moves to a step by index after bounds checks. Plain navigation - no validation. */
  const goToStepIndex = (index: number) => {
    const target = CHECKOUT_STEP_TABS[index];
    if (!target || target.key === step) return;

    setStep(target.key);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  /**
   * Runs a step's validation. Returns `true` when the user may leave that
   * step in the forward direction; otherwise flags the errors and toasts.
   */
  const ensureStepValid = (stepKey: CheckoutStepKey): boolean => {
    if (stepKey === 'plan') {
      if (plan?.id) return true;

      toast.error('Select a plan to continue.');
      return false;
    }

    if (stepKey === 'details') {
      const errors = validateDetails(details);
      const firstError = firstDetailsError(errors);

      if (firstError) {
        setDetailsErrors(errors);
        toast.error(firstError);
        return false;
      }

      setDetailsErrors({});
      return true;
    }


    return true;
  };

  const handleNext = () => {
    if (isBusy) return;
    if (!ensureStepValid(step)) return;

    goToStepIndex(stepIndex + 1);
  };

  const handleBack = () => {
    if (isBusy) return;

    setPaymentError(null);
    goToStepIndex(stepIndex - 1);
  };


  const handleStepSelect = (key: CheckoutStepKey) => {
    const targetIndex = CHECKOUT_STEP_TABS.findIndex(tab => tab.key === key);
    if (targetIndex < 0 || targetIndex === stepIndex) return;

    if (isBusy) {
      toast.error('Please wait for the current action to finish.');
      return;
    }

    if (targetIndex < stepIndex) {
      setPaymentError(null);
      goToStepIndex(targetIndex);
      return;
    }

    for (let index = stepIndex; index < targetIndex; index += 1) {
      if (!ensureStepValid(CHECKOUT_STEP_TABS[index].key)) return;
    }

    goToStepIndex(targetIndex);
  };

  /** Keeps per-field errors in sync while the user fixes them. */
  const handleDetailsChange = (patch: Partial<BillingDetailsFormValues>) => {
    const nextDetails = { ...details, ...patch };
    setDetails(nextDetails);

    setDetailsErrors(prevErrors => {
      if (Object.keys(prevErrors).length === 0) return prevErrors;

      const nextErrors = { ...prevErrors };
      const changedFields = Object.keys(patch) as (keyof BillingDetailsFormValues)[];

      changedFields.forEach(field => {
        const message = validateDetailsField(field, nextDetails[field] ?? '');
        if (message) nextErrors[field] = message;
        else delete nextErrors[field];
      });

      return nextErrors;
    });
  };

  const billingCycle = plan.billingCycle as BillingCycle;

  const searchParams = useSearchParams();
  const payPalSubscriptionId = searchParams.get('subscription_id');

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, payPalSubscriptionId, plan.id, billingCycle, onComplete]);


  const handleProceedToCheckout = async () => {
    if (isBusy || !plan?.id) return;
    setPaymentError(null);

    const detailErrors = validateDetails(details);
    const firstDetailError = firstDetailsError(detailErrors);

    if (firstDetailError) {
      setDetailsErrors(detailErrors);
      toast.error(firstDetailError);
      setStep('details');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

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
        paymentGateway: selectedGateway,
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


  const handlePayNow = async () => {
    if (isBusy) return;

    if (!session) {
      toast.error('Your checkout session has expired. Please place the order again.');
      return;
    }

    setPaymentError(null);

    const [expiryMonth = '', expiryYear = ''] = cardEntry.expiry
      .split('/')
      .map(part => part.trim());

    // Card-entry guard: shared validators replace the old ad-hoc emptiness checks.
    const cardError = firstCardEntryError(validateCardEntry(cardEntry));
    if (cardError) {
      setPaymentError(cardError);
      toast.error(cardError);
      return;
    }

    try {
      await processPayment({
        planId: plan.id,
        subscriptionId: session.subscriptionId,
        cardHolderName: cardEntry.cardholderName.trim(),
        cardNumber: cardEntry.cardNumber.replace(/\s+/g, ''),
        expiryMonth,
        expiryYear,
        cvv: cardEntry.cvv.trim(),
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

      <TopTabs
        variant="stepper"
        tabs={CHECKOUT_STEP_TABS}
        activeKey={step}
        onChange={handleStepSelect}
      />

      {step === 'plan' && (
        <ChoosePlanStep
          plan={plan}
          billingPeriod={billingPeriod}
          onNext={handleNext}
          isBusy={isBusy}
        />
      )}

      {step === 'details' && (
        <DetailsStep
          plan={plan}
          billingPeriod={billingPeriod}
          values={details}
          errors={detailsErrors}
          onChange={handleDetailsChange}
          onBack={handleBack}
          onNext={handleNext}
          isBusy={isBusy}
        />
      )}

      {step === 'checkout' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.3fr_1fr]">
            <CheckoutStep
              plan={plan}
              gateways={PAYMENT_GATEWAYS}
              selectedGateway={selectedGateway}
              onSelectGateway={setSelectedGateway}
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

          <StepNavigation onBack={handleBack} backDisabled={isBusy} />
        </div>
      )}
    </div>
  );
}
