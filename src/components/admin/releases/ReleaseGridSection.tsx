'use client';

import { Disc3, Loader2 } from 'lucide-react';
import ReusablePagination from '@/src/components/tables/ReusablePagination';
import { getErrorMessage } from '@/src/lib/getErrorMessage';
import type { ApiRelease } from '@/src/types/releaseTypes';
import ReleaseCard from './ReleaseCard';

const PAGINATION_ACTIVE_CLASSNAME =
  'border-[#22C55E] bg-[#22C55E] text-white';

type ReleaseGridSectionProps = {
  releases: ApiRelease[];
  isLoading: boolean;
  isFetching: boolean;
  isError: boolean;
  error: unknown;
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  buildHref: (release: ApiRelease) => string;
  emptyTitle: string;
  emptyMessage: string;
};

export default function ReleaseGridSection({
  releases,
  isLoading,
  isFetching,
  isError,
  error,
  page,
  pageSize,
  totalItems,
  totalPages,
  onPageChange,
  buildHref,
  emptyTitle,
  emptyMessage,
}: ReleaseGridSectionProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center gap-2 rounded-2xl border border-[#E9EDF5] bg-white py-16 text-sm text-[#667085]">
        <Loader2 className="h-4 w-4 animate-spin" />
        Loading releases…
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-2xl border border-[#FECDD3] bg-[#FEF2F2] py-12 text-center">
        <p className="text-sm font-medium text-[#B42318]">
          {getErrorMessage(error, 'Releases could not be loaded.')}
        </p>
      </div>
    );
  }

  if (releases.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-[#E9EDF5] bg-white py-16 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F2F4F7]">
          <Disc3 className="h-6 w-6 text-[#98A2B3]" strokeWidth={1.75} />
        </div>
        <p className="text-sm font-medium text-[#101828]">{emptyTitle}</p>
        <p className="max-w-md text-sm text-[#98A2B3]">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div
        className={[
          'grid grid-cols-1 gap-5 transition-opacity sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
          isFetching ? 'opacity-60' : '',
        ].join(' ')}
      >
        {releases.map(release => (
          <ReleaseCard
            key={release.id}
            release={release}
            href={buildHref(release)}
          />
        ))}
      </div>

      {totalPages > 1 ? (
        <ReusablePagination
          currentPage={page}
          totalPages={totalPages}
          totalItems={totalItems}
          pageSize={pageSize}
          onPageChange={onPageChange}
          itemLabel="releases"
          activeClassName={PAGINATION_ACTIVE_CLASSNAME}
          className="rounded-2xl border border-[#E9EDF5]"
        />
      ) : null}
    </div>
  );
}
