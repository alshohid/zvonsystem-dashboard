'use client';

import OrderSummaryCard from './OrderSummaryCard';
import PaymentDetailsForm from './PaymentDetailsForm';
import StepNavigation from './StepNavigation';
import type { DetailsFieldErrors } from './checkoutValidation';
import type { BillingDetailsFormValues, BillingPeriod, Plan } from './types';

type DetailsStepProps = {
  plan: Plan;
  billingPeriod: BillingPeriod;
  values: BillingDetailsFormValues;
  /** Per-field validation messages – only populated after a failed "Next". */
  errors: DetailsFieldErrors;
  onChange: (patch: Partial<BillingDetailsFormValues>) => void;
  onBack: () => void;
  onNext: () => void;
  isBusy?: boolean;
};

export default function DetailsStep({
  plan,
  billingPeriod,
  values,
  errors,
  onChange,
  onBack,
  onNext,
  isBusy = false,
}: DetailsStepProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.3fr_1fr]">
        <PaymentDetailsForm values={values} errors={errors} onChange={onChange} />
        <OrderSummaryCard plan={plan} billingPeriod={billingPeriod} />
      </div>

      <StepNavigation
        onBack={onBack}
        onNext={onNext}
        nextLabel="Continue to Payment"
        isBusy={isBusy}
      />
    </div>
  );
}
