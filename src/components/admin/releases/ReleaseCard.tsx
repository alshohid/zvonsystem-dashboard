import {
  RELEASE_STATUS_LABELS,
  type ReleaseSummaryCard,
  type ReleaseStatus,
} from './mockReleases';

const STATUS_BADGE_CLASSNAMES: Record<ReleaseStatus, string> = {
  live: 'bg-[#DCFCE7] text-[#15803D]',
  scheduled: 'bg-[#DBEAFE] text-[#1D4ED8]',
  'in-review': 'bg-[#FEF3C7] text-[#B45309]',
};

export default function ReleaseCard({ release }: { release: ReleaseSummaryCard }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-[#E9EDF5] bg-white shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
      <div
        className="aspect-square w-full bg-cover bg-center"
        style={{ backgroundImage: `url(${release.cardImage})` }}

      />

      <div className="space-y-2 p-4">
        <h3 className="truncate text-[15px] font-semibold text-[#101828]">
          {release.title}
        </h3>
        <p className="text-xs text-[#98A2B3]">
          {release.type} · {release.trackCount} track{release.trackCount === 1 ? '' : 's'}
        </p>

        <div className="flex items-center justify-between pt-1">
          <span
            className={[
              'rounded-md px-2 py-0.5 text-xs font-medium',
              STATUS_BADGE_CLASSNAMES[release.status],
            ].join(' ')}
          >
            {RELEASE_STATUS_LABELS[release.status]}
          </span>
          <span className="text-xs text-[#98A2B3]">{release.plays}</span>
        </div>
      </div>
    </div>
  );
}
