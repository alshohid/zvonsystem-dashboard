'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FileX, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { Modal } from '@/src/components/ui/modal';
import { getErrorMessage } from '@/src/lib/getErrorMessage';
import {
  useDeleteReleaseMutation,
  useGetMyReleasesQuery,
} from '@/src/redux/features/releases/releasesApi';
import type { ApiRelease } from '@/src/types/releaseTypes';
import DraftReleaseCard from './DraftReleaseCard';
import { clearFormSession } from './releaseFormState';

const PAGE_SIZE = 20;

type DraftReleasesContainerProps = {
  createPath?: string;
};

export default function DraftReleasesContainer({
  createPath = '/admin/dashboard/releases/create',
}: DraftReleasesContainerProps) {
  const router = useRouter();
  const [pendingDiscard, setPendingDiscard] = useState<ApiRelease | null>(null);

  const { data, isLoading, isError, error } = useGetMyReleasesQuery({
    status: 'DRAFT',
    limit: PAGE_SIZE,
  });

  const [deleteRelease, { isLoading: isDeleting }] = useDeleteReleaseMutation();

  const drafts = data?.data ?? [];
  const total = data?.meta?.total ?? drafts.length;

  const handleContinue = (release: ApiRelease) => {
    // The wizard reads the release from the API, so stale session state must go.
    clearFormSession();
    router.push(`${createPath}?id=${release.id}`);
  };

  const handleConfirmDiscard = async () => {
    if (!pendingDiscard) return;

    try {
      await deleteRelease(pendingDiscard.id).unwrap();
      toast.success('Draft discarded.');
      setPendingDiscard(null);
    } catch (discardError) {
      toast.error(getErrorMessage(discardError, 'Could not discard the draft.'));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#98A2B3]">
            Releases
          </p>
          <h1 className="mt-1 text-2xl font-semibold text-[#101828]">
            Continue A Draft
          </h1>
        </div>

        <p className="text-sm text-[#667085]">
          {total} incomplete release{total === 1 ? '' : 's'}
        </p>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center gap-2 rounded-2xl border border-[#E9EDF5] bg-white py-16 text-sm text-[#667085]">
          <Loader2 className="h-4 w-4 animate-spin" />
          Loading drafts…
        </div>
      ) : isError ? (
        <div className="rounded-2xl border border-[#FECDD3] bg-[#FEF2F2] py-12 text-center">
          <p className="text-sm font-medium text-[#B42318]">
            {getErrorMessage(error, 'Drafts could not be loaded.')}
          </p>
        </div>
      ) : drafts.length > 0 ? (
        <div className="space-y-4">
          {drafts.map(draft => (
            <DraftReleaseCard
              key={draft.id}
              release={draft}
              onDiscard={setPendingDiscard}
              onContinue={handleContinue}
              isDiscarding={isDeleting && pendingDiscard?.id === draft.id}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-[#E9EDF5] bg-white py-16 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F2F4F7]">
            <FileX className="h-6 w-6 text-[#98A2B3]" strokeWidth={1.75} />
          </div>
          <p className="text-sm font-medium text-[#101828]">No drafts in progress</p>
          <p className="text-sm text-[#98A2B3]">
            Releases you start creating will be saved here automatically.
          </p>
          <button
            type="button"
            onClick={() => {
              clearFormSession();
              router.push(createPath);
            }}
            className="mt-1 rounded-xl bg-primary px-4 py-2 text-sm font-medium text-black hover:bg-[#16A34A]"
          >
            Create a release
          </button>
        </div>
      )}

      <Modal
        isOpen={Boolean(pendingDiscard)}
        onClose={() => setPendingDiscard(null)}
        className="max-w-[420px] p-0"
        contentBgClassName="bg-white"
        textClassName="text-[#111827]"
        showCloseButton={false}
      >
        <div className="rounded-2xl p-6">
          <h3 className="text-[16px] font-semibold text-[#101828]">Discard draft?</h3>
          <p className="mt-3 text-[13px] leading-5 text-[#475467]">
            &quot;{pendingDiscard?.name || 'This draft'}&quot; and everything uploaded
            with it will be deleted permanently.
          </p>

          <div className="mt-6 flex items-center gap-3">
            <button
              type="button"
              onClick={() => setPendingDiscard(null)}
              disabled={isDeleting}
              className="flex-1 rounded-xl bg-[#F2F4F7] px-4 py-2.5 text-[13px] font-semibold text-[#344054] hover:bg-[#E4E7EC] disabled:opacity-60"
            >
              Keep it
            </button>
            <button
              type="button"
              onClick={handleConfirmDiscard}
              disabled={isDeleting}
              className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-[#DC2626] px-4 py-2.5 text-[13px] font-semibold text-white hover:bg-[#B91C1C] disabled:opacity-60"
            >
              {isDeleting ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              Discard
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
