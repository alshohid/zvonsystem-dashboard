'use client';

import { CreditCard } from 'lucide-react';

type PaymentMethodSummaryProps = {
  onAddCard: () => void;
};

export default function PaymentMethodSummary({ onAddCard }: PaymentMethodSummaryProps) {
  return (
    <div className="rounded-2xl border border-[#E9EDF5] bg-white p-5 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
      <div className="flex items-center justify-between">
        <h3 className="text-[13px] font-semibold uppercase tracking-wide text-[#667085]">
          Payment Method
        </h3>
        <button
          type="button"
          onClick={onAddCard}
          className="text-[13px] font-semibold text-[#22C55E] hover:underline"
        >
          + Add card
        </button>
      </div>

      <div className="mt-3 flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#F2F4F7]">
          <CreditCard size={16} className="text-[#98A2B3]" />
        </div>
        <div>
          <p className="text-[13px] font-medium text-[#344054]">No payment method added</p>
          <p className="text-xs text-[#98A2B3]">Add a card to subscribe to Pro</p>
        </div>
      </div>
    </div>
  );
}
