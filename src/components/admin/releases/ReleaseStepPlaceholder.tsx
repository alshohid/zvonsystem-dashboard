'use client';

import { ArrowRight } from 'lucide-react';

type ReleaseStepPlaceholderProps = {
  title: string;
  description?: string;
  onBack: () => void;
  onNext?: () => void;
  nextLabel?: string;
};

export default function ReleaseStepPlaceholder({
  title,
  description = 'This step will be wired up once the design is ready.',
  onBack,
  onNext,
  nextLabel = 'Next',
}: ReleaseStepPlaceholderProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-[15px] font-semibold text-[#101828]">{title}</h2>
        <p className="mt-1 text-[13px] text-[#98A2B3]">{description}</p>
      </div>

      <div className="flex items-center justify-between border-t border-[#E5E7EB] pt-5">
        <button
          type="button"
          onClick={onBack}
          className="text-[13px] font-medium text-[#344054] hover:text-[#101828]"
        >
          &lt; Back
        </button>

        {onNext ? (
          <button
            type="button"
            onClick={onNext}
            className="inline-flex items-center gap-1.5 rounded-xl bg-[#22C55E] px-6 py-2.5 text-[13px] font-semibold text-white hover:bg-[#16A34A]"
          >
            {nextLabel} <ArrowRight size={16} />
          </button>
        ) : null}
      </div>
    </div>
  );
}
