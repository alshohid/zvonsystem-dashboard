'use client';

import { LogOut } from 'lucide-react';

type PaymentSuccessScreenProps = {
  onGoToDashboard: () => void;
};

export default function PaymentSuccessScreen({ onGoToDashboard }: PaymentSuccessScreenProps) {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-[#E9EDF5] bg-white px-6 py-16 text-center shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#DCFCE7]">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white">
          <LogOut size={20} />
        </div>
      </div>

      <h2 className="mt-6 text-xl font-bold text-[#101828]">Payment Successful!</h2>
      <p className="mt-2 max-w-sm text-sm text-[#667085]">
        Your subscription is now active. You have full access to all features included in your
        plan.
      </p>

      <button
        type="button"
        onClick={onGoToDashboard}
        className="mt-6 rounded-xl bg-primary px-6 py-3 text-[13px] font-semibold text-[#101828] hover:opacity-90"
      >
        Go to Dashboard
      </button>
    </div>
  );
}
