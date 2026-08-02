'use client';

import { format } from 'date-fns';
import { Eye, Info, XCircle } from 'lucide-react';
import type { ApiRelease } from '@/src/types/releaseTypes';
import { getReleaseTypeLabel } from './releaseFormOptions';
import { getMissingFields } from './releaseFormState';

function formatReviewedDate(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? '—' : format(date, 'MMM d, yyyy');
}

type ChangeIssueCardProps = {
  release: ApiRelease;
  onPreview: (release: ApiRelease) => void;
  onFixNow: (release: ApiRelease) => void;
};

export default function ChangeIssueCard({
  release,
  onPreview,
  onFixNow,
}: ChangeIssueCardProps) {
  const missingFields = getMissingFields(release);
  const description =
    release.moderator_message?.trim() ||
    (missingFields.length > 0
      ? `Incomplete: ${missingFields.join(', ')}`
      : 'The moderation team asked for changes on this release.');

  return (
    <div className="overflow-hidden rounded-2xl border border-[#FECDD3] bg-white shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
      <div className="flex items-center gap-1.5 bg-[#FEF2F2] px-5 py-2">
        <XCircle className="h-4 w-4 text-[#DC2626]" strokeWidth={2} />
        <span className="text-xs font-semibold uppercase tracking-[0.08em] text-[#DC2626]">
          Changes Required
        </span>
      </div>

      <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0 space-y-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-[15px] font-semibold text-[#101828]">
              {release.name || 'Untitled release'}
            </h3>
            {release.type ? (
              <span className="rounded-md bg-[#F3E8FF] px-2 py-0.5 text-xs font-medium text-[#7C3AED]">
                {getReleaseTypeLabel(release.type)}
              </span>
            ) : null}
          </div>

          <p className="flex items-start gap-1.5 text-sm text-[#667085]">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-[#98A2B3]" strokeWidth={1.75} />
            <span>{description}</span>
          </p>
          <p className="text-xs text-[#98A2B3]">
            {formatReviewedDate(release.updated_at)}
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={() => onPreview(release)}
            className="flex items-center gap-1.5 rounded-xl border border-[#E5E7EB] px-4 py-2 text-sm font-medium text-[#344054] transition-colors hover:border-[#D0D5DD] hover:bg-[#F9FAFB]"
          >
            <Eye className="h-4 w-4" strokeWidth={1.75} />
            Preview
          </button>
          <button
            type="button"
            onClick={() => onFixNow(release)}
            className="rounded-xl bg-primary px-4 py-2 text-sm font-medium text-[#101828] transition-opacity hover:opacity-90"
          >
            Fix Now
          </button>
        </div>
      </div>
    </div>
  );
}
