'use client';

import { useEffect, useState } from 'react';
import TopTabs, { TabItem } from '@/src/components/common/TopTabs';
import SearchInput from '@/src/components/ui/input/searchInput/SearchInput';
import { useDebouncedValue } from '@/src/lib/helper/useDebouncedValue';
import { useQueryParams } from '@/src/lib/helper/useQueryState';
import { useGetMyReleasesQuery } from '@/src/redux/features/releases/releasesApi';
import type { ReleaseStatus } from '@/src/types/releaseTypes';
import ReleaseGridSection from './ReleaseGridSection';

type FilterKey = 'all' | 'live' | 'scheduled' | 'in-review';

const FILTER_TABS: TabItem<FilterKey>[] = [
  { key: 'all', label: 'All' },
  { key: 'live', label: 'Live' },
  { key: 'scheduled', label: 'Scheduled' },
  { key: 'in-review', label: 'In Review' },
];

const FILTER_STATUS: Record<FilterKey, ReleaseStatus | undefined> = {
  all: undefined,
  live: 'LIVE',
  scheduled: 'SCHEDULED',
  'in-review': 'IN_MODERATION',
};

const PAGE_SIZE = 12;

export default function YourReleasesContainer({
  detailsBasePath = '/admin/dashboard/releases',
}: {
  detailsBasePath?: string;
}) {
  const { get, setMany } = useQueryParams();

  const filterParam = get('filter', 'all');
  const filter: FilterKey =
    filterParam in FILTER_STATUS ? (filterParam as FilterKey) : 'all';
  const page = Math.max(Number(get('page', '1')) || 1, 1);
  const search = get('search');

  const [searchInput, setSearchInput] = useState(search);
  const debouncedSearch = useDebouncedValue(searchInput);

  useEffect(() => {
    if (debouncedSearch === search) return;
    setMany({ search: debouncedSearch, page: '1' });
  }, [debouncedSearch, search, setMany]);

  const { data, isLoading, isFetching, isError, error } = useGetMyReleasesQuery({
    status: FILTER_STATUS[filter],
    search: search || undefined,
    page,
    limit: PAGE_SIZE,
  });

  const releases = data?.data ?? [];
  const meta = data?.meta;

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

        <TopTabs
          variant="pills"
          tabs={FILTER_TABS}
          activeKey={filter}
          onChange={next => setMany({ filter: next, page: '1' })}
        />
      </div>

      <SearchInput
        value={searchInput}
        onChange={event => setSearchInput(event.target.value)}
        placeholder="Search by release name or UPC"
        containerClassName="max-w-md"
      />

      <ReleaseGridSection
        releases={releases}
        isLoading={isLoading}
        isFetching={isFetching}
        isError={isError}
        error={error}
        page={page}
        pageSize={PAGE_SIZE}
        totalItems={meta?.total ?? releases.length}
        totalPages={meta?.totalPages ?? 1}
        onPageChange={next => setMany({ page: String(next) })}
        buildHref={release => `${detailsBasePath}/${release.id}`}
        emptyTitle={search ? 'No matching releases' : 'No releases yet'}
        emptyMessage={
          search
            ? 'Try a different release name or UPC.'
            : 'Releases you submit will appear here once they are created.'
        }
      />
    </div>
  );
}
