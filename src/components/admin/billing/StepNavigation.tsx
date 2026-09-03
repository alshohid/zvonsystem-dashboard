'use client';

import { ArrowLeft, ArrowRight, Loader2 } from 'lucide-react';

type StepNavigationProps = {
  onBack?: () => void;
  onNext?: () => void;
  backLabel?: string;
  nextLabel?: string;
  backDisabled?: boolean;
  nextDisabled?: boolean;
  isBusy?: boolean;
};

export default function StepNavigation({
  onBack,
  onNext,
  backLabel = 'Previous',
  nextLabel = 'Next',
  backDisabled = false,
  nextDisabled = false,
  isBusy = false,
}: StepNavigationProps) {
  const isBackDisabled = !onBack || isBusy || backDisabled;
  const isNextDisabled = isBusy || nextDisabled;

  return (
    <div className="flex flex-col gap-3 border-t border-[#E9EDF5] pt-5 sm:flex-row sm:items-center sm:justify-between">
      <button
        type="button"
        onClick={onBack}
        disabled={isBackDisabled}
        title={!onBack ? 'You are on the first step' : undefined}
        className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-[#D0D5DD] px-5 py-2.5 text-[13px] font-semibold text-[#344054] transition-colors hover:bg-[#F9FAFB] disabled:cursor-not-allowed disabled:opacity-50"
      >
        <ArrowLeft size={16} />
        {backLabel}
      </button>

      {onNext && (
        <button
          type="button"
          onClick={onNext}
          disabled={isNextDisabled}
          className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-primary px-6 py-2.5 text-[13px] font-semibold text-[#101828] transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isBusy ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              {nextLabel}
            </>
          ) : (
            <>
              {nextLabel}
              <ArrowRight size={16} />
            </>
          )}
        </button>
      )}
    </div>
  );
}
