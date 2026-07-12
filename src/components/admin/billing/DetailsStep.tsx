'use client';

import OrderSummaryCard from './OrderSummaryCard';
import PaymentDetailsForm from './PaymentDetailsForm';
import type { BillingDetailsFormValues, BillingPeriod, Plan } from './types';

type DetailsStepProps = {
  plan: Plan;
  billingPeriod: BillingPeriod;
  values: BillingDetailsFormValues;
  onChange: (patch: Partial<BillingDetailsFormValues>) => void;
  onNext: () => void;
};

export default function DetailsStep({
  plan,
  billingPeriod,
  values,
  onChange,
  onNext,
}: DetailsStepProps) {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.3fr_1fr]">
      <PaymentDetailsForm values={values} onChange={onChange} onSubmit={onNext} />
      <OrderSummaryCard plan={plan} billingPeriod={billingPeriod} />
    </div>
  );
}
