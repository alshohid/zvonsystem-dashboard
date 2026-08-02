'use client';

import { useRouter } from 'next/navigation';
import { CheckCircle2, Loader2 } from 'lucide-react';
import { getErrorMessage } from '@/src/lib/getErrorMessage';
import { useGetMyReleasesQuery } from '@/src/redux/features/releases/releasesApi';
import type { ApiRelease } from '@/src/types/releaseTypes';
import ChangeIssueCard from './ChangeIssueCard';
import { clearFormSession } from './releaseFormState';

const PAGE_SIZE = 50;

type ChangesContainerProps = {
  createPath?: string;
};

export default function ChangesContainer({
  createPath = '/admin/dashboard/releases/create',
}: ChangesContainerProps) {
  const router = useRouter();

  const { data, isLoading, isError, error } = useGetMyReleasesQuery({
    status: 'REJECTED',
    limit: PAGE_SIZE,
  });

  const issues = data?.data ?? [];

  const openRelease = (release: ApiRelease) => {
    clearFormSession();
    router.push(`${createPath}?id=${release.id}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#98A2B3]">
            Releases
          </p>
          <h1 className="mt-1 text-2xl font-semibold text-[#101828]">
            Changes Required
          </h1>
        </div>

        <span className="w-fit rounded-lg bg-[#FEE2E2] px-3 py-1 text-sm font-medium text-[#DC2626]">
          {issues.length} issue{issues.length === 1 ? '' : 's'}
        </span>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center gap-2 rounded-2xl border border-[#E9EDF5] bg-white py-16 text-sm text-[#667085]">
          <Loader2 className="h-4 w-4 animate-spin" />
          Loading releases…
        </div>
      ) : isError ? (
        <div className="rounded-2xl border border-[#FECDD3] bg-[#FEF2F2] py-12 text-center">
          <p className="text-sm font-medium text-[#B42318]">
            {getErrorMessage(error, 'Releases could not be loaded.')}
          </p>
        </div>
      ) : issues.length > 0 ? (
        <div className="space-y-4">
          {issues.map(issue => (
            <ChangeIssueCard
              key={issue.id}
              release={issue}
              onPreview={openRelease}
              onFixNow={openRelease}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-[#E9EDF5] bg-white py-16 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#DCFCE7]">
            <CheckCircle2 className="h-6 w-6 text-[#15803D]" strokeWidth={1.75} />
          </div>
          <p className="text-sm font-medium text-[#101828]">No changes required</p>
          <p className="text-sm text-[#98A2B3]">
            All releases are passing validation checks.
          </p>
        </div>
      )}
    </div>
  );
}
