import { FileText } from 'lucide-react';
import { type DraftRelease, type DraftReleaseType } from './mockDrafts';

const TYPE_BADGE_CLASSNAMES: Record<DraftReleaseType, string> = {
  Single: 'bg-[#F3E8FF] text-[#7C3AED]',
  EP: 'bg-[#F3E8FF] text-[#7C3AED]',
  Album: 'bg-[#F3E8FF] text-[#7C3AED]',
};

function getProgressBarColor(progress: number) {
  if (progress >= 80) return 'bg-[#22C55E]';
  if (progress >= 50) return 'bg-[#F59E0B]';
  return 'bg-[#F43F5E]';
}

type DraftReleaseCardProps = {
  release: DraftRelease;
  onDiscard: (id: string) => void;
  onContinue: (id: string) => void;
};

export default function DraftReleaseCard({
  release,
  onDiscard,
  onContinue,
}: DraftReleaseCardProps) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-[#E9EDF5] bg-white p-4 shadow-[0_1px_2px_rgba(16,24,40,0.04)] sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:p-5">
      <div className="flex min-w-0 flex-1 items-start gap-3 sm:items-center sm:gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#F2F4F7]">
          <FileText className="h-5 w-5 text-[#98A2B3]" strokeWidth={1.75} />
        </div>

        <div className="min-w-0 space-y-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="truncate text-[15px] font-semibold text-[#101828]">
              {release.title}
            </h3>
            <span
              className={[
                'rounded-md px-2 py-0.5 text-xs font-medium',
                TYPE_BADGE_CLASSNAMES[release.type],
              ].join(' ')}
            >
              {release.type}
            </span>
          </div>

          <p className="text-xs text-[#98A2B3]">{release.lastEditedLabel}</p>

          <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
            {release.missingFields.map(field => (
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
          <span className="text-xs font-medium text-[#667085]">{release.progress}%</span>
          <div className="h-1.5 w-20 overflow-hidden rounded-full bg-[#EAECF0]">
            <div
              className={['h-full rounded-full', getProgressBarColor(release.progress)].join(' ')}
              style={{ width: `${release.progress}%` }}
            />
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={() => onDiscard(release.id)}
            className="rounded-xl border border-[#E5E7EB] px-4 py-2 text-sm font-medium text-[#344054] transition-colors hover:border-[#D0D5DD] hover:bg-[#F9FAFB]"
          >
            Discard
          </button>
          <button
            type="button"
            onClick={() => onContinue(release.id)}
            className="rounded-xl bg-primary px-4 py-2 text-sm font-medium  transition-colors hover:bg-[#16A34A]"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
