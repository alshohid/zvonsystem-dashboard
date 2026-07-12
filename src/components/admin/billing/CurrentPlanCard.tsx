'use client';

import { Music2 } from 'lucide-react';

type CurrentPlanCardProps = {
  planName: string;
  releasesRemainingLabel: string;
  usedFraction: number;
  usedLabel: string;
  onUpgrade: () => void;
};

export default function CurrentPlanCard({
  planName,
  releasesRemainingLabel,
  usedFraction,
  usedLabel,
  onUpgrade,
}: CurrentPlanCardProps) {
  const usedPercent = Math.round(Math.min(1, Math.max(0, usedFraction)) * 100);

  return (
    <div className="rounded-2xl border border-[#E9EDF5] bg-white p-5 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#F2F4F7]">
            <Music2 size={18} className="text-[#667085]" />
          </div>
          <div>
            <p className="text-xs font-light uppercase tracking-[0.14em] text-[#777980]">
              Current Plan
            </p>
            <h2 className="text-[1rem] font-semibold text-[#101828]">{planName}</h2>
            <p className="text-xs text-[#98A2B3]">{releasesRemainingLabel}</p>
          </div>
        </div>

        <button
          type="button"
          onClick={onUpgrade}
          className="rounded-full bg-primary px-5 py-2 text-[13px] font-medium text-[#101828] hover:opacity-90"
        >
          Upgrade to Pro
        </button>
      </div>

      <div className="mt-4 flex items-center gap-3">
        <div className="h-1.5 max-w-2xl w-full flex-1 overflow-hidden rounded-full bg-[#EAECF0]">
          <div
            className="h-full rounded-full bg-primary"
            style={{ width: `${usedPercent}%` }}
          />
        </div>
        <span className="shrink-0 text-xs text-[#98A2B3]">{usedLabel}</span>
      </div>
    </div>
  );
}
