'use client';

import TopTabs, { TabItem } from '@/src/components/common/TopTabs';
import { useTabsQueryState } from '@/src/lib/helper/useTabsQueryState';
import { MOCK_RELEASES, type ReleaseStatus } from './mockReleases';
import ReleaseCard from './ReleaseCard';

type FilterKey = 'all' | ReleaseStatus;

const FILTER_TABS: TabItem<FilterKey>[] = [
  { key: 'all', label: 'All' },
  { key: 'live', label: 'Live' },
  { key: 'scheduled', label: 'Scheduled' },
  { key: 'in-review', label: 'In Review' },
];

export default function YourReleasesContainer() {
  const [filter, setFilter] = useTabsQueryState<FilterKey>('filter', 'all');

  const releases =
    filter === 'all'
      ? MOCK_RELEASES
      : MOCK_RELEASES.filter(release => release.status === filter);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#98A2B3]">
            Releases
          </p>
          <h1 className="mt-1 text-2xl font-semibold text-[#101828]">
            Your Releases
          </h1>
        </div>

        <TopTabs variant="pills" tabs={FILTER_TABS} activeKey={filter} onChange={setFilter} />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {releases.map(release => (
          <ReleaseCard key={release.id} release={release} />
        ))}
      </div>

      {releases.length === 0 ? (
        <p className="py-10 text-center text-sm text-[#98A2B3]">
          No releases match this filter yet.
        </p>
      ) : null}
    </div>
  );
}
