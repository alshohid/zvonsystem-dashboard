'use client';

import type { BillingPeriod, Plan } from './types';

type OrderSummaryCardProps = {
  plan: Plan;
  billingPeriod: BillingPeriod;
  ctaLabel?: string;
  onCta?: () => void;
};

export default function OrderSummaryCard({
  plan,
  billingPeriod,
  ctaLabel,
  onCta,
}: OrderSummaryCardProps) {
  const price = plan.priceMonthly.toFixed(plan.priceMonthly % 1 === 0 ? 0 : 2);

  return (
    <div className="h-fit rounded-2xl border border-[#E9EDF5] bg-white p-5 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#98A2B3]">
        Order Summary
      </p>
      <p className="mt-2 text-2xl font-bold text-[#101828]">
        ${price}
        {plan.priceSuffix && <span className="text-sm font-normal text-[#98A2B3]">{plan.priceSuffix}</span>}
      </p>

      <div className="mt-4 space-y-2 border-t border-[#EEF2ED] pt-4 text-[13px]">
        <div className="flex items-center justify-between text-[#667085]">
          <span>{plan.name} Plan</span>
          <span>${price}{plan.priceSuffix}</span>
        </div>
        <div className="flex items-center justify-between text-[#667085]">
          <span>Billing Cycle</span>
          <span className="capitalize">{billingPeriod}</span>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between border-t border-[#EEF2ED] pt-3">
        <span className="text-[13px] font-semibold text-[#101828]">Total</span>
        <span className="text-[15px] font-bold text-[#101828]">${price}</span>
      </div>

      {ctaLabel && onCta && (
        <>
          <button
            type="button"
            onClick={onCta}
            className="mt-4 w-full rounded-xl bg-primary px-4 py-3 text-[13px] font-semibold text-[#101828] hover:opacity-90"
          >
            {ctaLabel}
          </button>
          <p className="mt-2 text-center text-xs text-[#98A2B3]">
            Cancel anytime · no hidden fees
          </p>
        </>
      )}
    </div>
  );
}
