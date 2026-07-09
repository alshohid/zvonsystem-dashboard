'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { MOCK_CHANGE_ISSUES } from './mockChanges';
import ChangeIssueCard from './ChangeIssueCard';

export default function ChangesContainer() {
  const router = useRouter();
  const [issues, setIssues] = useState(MOCK_CHANGE_ISSUES);

  const handlePreview = (id: string) => {
    router.push(`/admin/dashboard/releases/create?draft=${id}`);
  };

  const handleFixNow = (id: string) => {
    router.push(`/admin/dashboard/releases/create?draft=${id}`);
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

      {issues.length > 0 ? (
        <div className="space-y-4">
          {issues.map(issue => (
            <ChangeIssueCard
              key={issue.id}
              issue={issue}
              onPreview={handlePreview}
              onFixNow={handleFixNow}
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
