'use client';

import { useMemo, useState } from 'react';
import { Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { getErrorMessage } from '@/src/lib/getErrorMessage';
import { useAuth } from '@/src/redux/features/auth/hooks';
import {
  useGetMyReleasesQuery,
  useUpdateReleaseStatusMutation,
} from '@/src/redux/features/releases/releasesApi';
import type { ApiRelease, ReleaseStatus } from '@/src/types/releaseTypes';
import ModerationTable from './ModerationTable';

const PAGE_SIZE = 50;

export default function ModerationContainer() {
  const { role } = useAuth();
  const canModerate = role === 'ADMIN';
  const [pendingId, setPendingId] = useState<string | null>(null);

  const inModeration = useGetMyReleasesQuery({
    status: 'IN_MODERATION',
    limit: PAGE_SIZE,
  });

  // A submitted release with a future release date is stored as SCHEDULED, so
  // it still belongs in this queue.
  const scheduled = useGetMyReleasesQuery({
    status: 'SCHEDULED',
    limit: PAGE_SIZE,
  });

  const [updateStatus] = useUpdateReleaseStatusMutation();

  const isLoading = inModeration.isLoading || scheduled.isLoading;
  const isError = inModeration.isError || scheduled.isError;
  const error = inModeration.error ?? scheduled.error;

  const submissions = useMemo(() => {
    const combined = [
      ...(inModeration.data?.data ?? []),
      ...(scheduled.data?.data ?? []),
    ];

    return combined.sort(
      (a, b) =>
        new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime(),
    );
  }, [inModeration.data, scheduled.data]);

  const changeStatus = async (release: ApiRelease, status: ReleaseStatus) => {
    setPendingId(release.id);

    try {
      await updateStatus({ id: release.id, status }).unwrap();
      toast.success(
        status === 'APPROVED' ? 'Release approved.' : 'Release rejected.',
      );
    } catch (statusError) {
      toast.error(getErrorMessage(statusError, 'Could not update the status.'));
    } finally {
      setPendingId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#98A2B3]">
            Releases
          </p>
          <h1 className="mt-1 text-2xl font-semibold text-[#101828]">Moderation</h1>
        </div>

        <p className="text-sm text-[#667085]">
          {submissions.length} pending review{submissions.length === 1 ? '' : 's'}
        </p>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center gap-2 rounded-2xl border border-[#E9EDF5] bg-white py-16 text-sm text-[#667085]">
          <Loader2 className="h-4 w-4 animate-spin" />
          Loading submissions…
        </div>
      ) : isError ? (
        <div className="rounded-2xl border border-[#FECDD3] bg-[#FEF2F2] py-12 text-center">
          <p className="text-sm font-medium text-[#B42318]">
            {getErrorMessage(error, 'Submissions could not be loaded.')}
          </p>
        </div>
      ) : (
        <ModerationTable
          submissions={submissions}
          canModerate={canModerate}
          pendingId={pendingId}
          onApprove={release => changeStatus(release, 'APPROVED')}
          onReject={release => changeStatus(release, 'REJECTED')}
          emptyMessage="Nothing is waiting for review right now."
        />
      )}
    </div>
  );
}
