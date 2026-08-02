'use client';

import { ArrowRight, Loader2, Save } from 'lucide-react';

type StepFooterProps = {
  onBack: () => void;
  onSaveDraft: () => void;
  onNext: () => void;
  isSaving: boolean;
  nextLabel?: string;
  nextDisabled?: boolean;
};

export default function StepFooter({
  onBack,
  onSaveDraft,
  onNext,
  isSaving,
  nextLabel = 'Next',
  nextDisabled = false,
}: StepFooterProps) {
  return (
    <div className="flex flex-col gap-3 border-t border-[#E5E7EB] pt-5 sm:flex-row sm:items-center sm:justify-between">
      <button
        type="button"
        onClick={onBack}
        className="text-left text-[13px] font-medium text-[#344054] hover:text-[#101828]"
      >
        &lt; Back
      </button>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onSaveDraft}
          disabled={isSaving}
          className="inline-flex items-center gap-1.5 rounded-xl border border-[#D0D5DD] px-5 py-2.5 text-[13px] font-semibold text-[#344054] transition-colors hover:bg-[#F9FAFB] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSaving ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <Save size={16} />
          )}
          Save Draft
        </button>

        <button
          type="button"
          onClick={onNext}
          disabled={nextDisabled || isSaving}
          className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-6 py-2.5 text-[13px] font-semibold text-black hover:bg-[#16A34A] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {nextLabel} <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
