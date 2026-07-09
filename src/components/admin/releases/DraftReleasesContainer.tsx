'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FileX } from 'lucide-react';
import { MOCK_DRAFT_RELEASES } from './mockDrafts';
import DraftReleaseCard from './DraftReleaseCard';

export default function DraftReleasesContainer() {
  const router = useRouter();
  const [drafts, setDrafts] = useState(MOCK_DRAFT_RELEASES);

  const handleDiscard = (id: string) => {
    setDrafts(current => current.filter(draft => draft.id !== id));
  };

  const handleContinue = () => {
    router.push('/admin/dashboard/releases/create');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#98A2B3]">
            Releases
          </p>
          <h1 className="mt-1 text-2xl font-semibold text-[#101828]">
            Create New Release
          </h1>
        </div>

        <p className="text-sm text-[#667085]">
          {drafts.length} incomplete release{drafts.length === 1 ? '' : 's'}
        </p>
      </div>

      {drafts.length > 0 ? (
        <div className="space-y-4">
          {drafts.map(draft => (
            <DraftReleaseCard
              key={draft.id}
              release={draft}
              onDiscard={handleDiscard}
              onContinue={handleContinue}
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
        </div>
      )}
    </div>
  );
}
