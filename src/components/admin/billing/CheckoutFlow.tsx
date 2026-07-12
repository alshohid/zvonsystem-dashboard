'use client';

import { useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import TopTabs from '@/src/components/common/TopTabs';
import { useTabsQueryState } from '@/src/lib/helper/useTabsQueryState';
import ChoosePlanStep from './ChoosePlanStep';
import CheckoutStep from './CheckoutStep';
import DetailsStep from './DetailsStep';
import { CHECKOUT_STEP_TABS, MOCK_SAVED_CARDS } from './mockBillingData';
import type { BillingDetailsFormValues, BillingPeriod, CardEntryValues, CheckoutStepKey, Plan } from './types';
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

  const stepIndex = CHECKOUT_STEP_TABS.findIndex(s => s.key === step);
  const goToStep = (index: number) => {
    const target = CHECKOUT_STEP_TABS[index];
    if (target) setStep(target.key);
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
            savedCards={MOCK_SAVED_CARDS}
            selectedCardId={selectedCardId}
            onSelectCard={setSelectedCardId}
            cardEntry={cardEntry}
            onCardEntryChange={patch => setCardEntry(prev => ({ ...prev, ...patch }))}
            totalLabel={`$${plan.priceMonthly.toFixed(2)}`}
            onSubmit={onComplete}

          />
          <OrderSummaryCard plan={plan} billingPeriod={billingPeriod} />
        </div>
      )}
    </div>
  );
}
