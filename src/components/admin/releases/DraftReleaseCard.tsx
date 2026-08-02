'use client';

import { formatDistanceToNow } from 'date-fns';
import { FileText, Loader2 } from 'lucide-react';
import { resolveMediaUrl } from '@/src/lib/env';
import type { ApiRelease } from '@/src/types/releaseTypes';
import { getReleaseTypeLabel } from './releaseFormOptions';
import { getMissingFields } from './releaseFormState';

function getProgressBarColor(progress: number) {
  if (progress >= 80) return 'bg-[#22C55E]';
  if (progress >= 50) return 'bg-[#F59E0B]';
  return 'bg-[#F43F5E]';
}

function formatLastEdited(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'Recently edited';

  return `Last edited ${formatDistanceToNow(date, { addSuffix: true })}`;
}

type DraftReleaseCardProps = {
  release: ApiRelease;
  onDiscard: (release: ApiRelease) => void;
  onContinue: (release: ApiRelease) => void;
  isDiscarding?: boolean;
};

export default function DraftReleaseCard({
  release,
  onDiscard,
  onContinue,
  isDiscarding = false,
}: DraftReleaseCardProps) {
  const progress = release.completion_percentage ?? 0;
  const missingFields = getMissingFields(release);
  const coverUrl = resolveMediaUrl(release.cover_url?.path);

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-[#E9EDF5] bg-white p-4 shadow-[0_1px_2px_rgba(16,24,40,0.04)] sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:p-5">
      <div className="flex min-w-0 flex-1 items-start gap-3 sm:items-center sm:gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#F2F4F7]">
          {coverUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={coverUrl}
              alt=""
              className="h-full w-full object-cover"
            />
          ) : (
            <FileText className="h-5 w-5 text-[#98A2B3]" strokeWidth={1.75} />
          )}
        </div>

        <div className="min-w-0 space-y-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="truncate text-[15px] font-semibold text-[#101828]">
              {release.name || 'Untitled release'}
            </h3>
            {release.type ? (
              <span className="rounded-md bg-[#F3E8FF] px-2 py-0.5 text-xs font-medium text-[#7C3AED]">
                {getReleaseTypeLabel(release.type)}
              </span>
            ) : null}
          </div>

          <p className="text-xs text-[#98A2B3]">
            {formatLastEdited(release.updated_at)}
          </p>

          <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
            {missingFields.map(field => (
              <span
                key={field}
                className="rounded-md border border-[#FFB90033] bg-[#FFB9000D] px-2 py-0.5 text-xs font-medium text-[#B45309]"
              >
                {field}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end sm:justify-center sm:gap-2">
        <div className="flex items-center gap-2 sm:w-32 sm:justify-end">
          <span className="text-xs font-medium text-[#667085]">{progress}%</span>
          <div className="h-1.5 w-20 overflow-hidden rounded-full bg-[#EAECF0]">
            <div
              className={['h-full rounded-full', getProgressBarColor(progress)].join(' ')}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={() => onDiscard(release)}
            disabled={isDiscarding}
            className="inline-flex items-center gap-1.5 rounded-xl border border-[#E5E7EB] px-4 py-2 text-sm font-medium text-[#344054] transition-colors hover:border-[#D0D5DD] hover:bg-[#F9FAFB] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isDiscarding ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
            Discard
          </button>
          <button
            type="button"
            onClick={() => onContinue(release)}
            className="rounded-xl bg-primary px-4 py-2 text-sm font-medium transition-colors hover:bg-[#16A34A]"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
