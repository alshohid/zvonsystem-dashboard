'use client';

import { useState } from 'react';
import { MOCK_MODERATION_SUBMISSIONS } from './mockModeration';
import ModerationTable from './ModerationTable';

export default function ModerationContainer() {
  const [submissions, setSubmissions] = useState(MOCK_MODERATION_SUBMISSIONS);

  const handleApprove = (id: string) => {
    setSubmissions(current => current.filter(submission => submission.id !== id));
  };

  const handleReject = (id: string) => {
    setSubmissions(current => current.filter(submission => submission.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#98A2B3]">
            Releases
          </p>
          <h1 className="mt-1 text-2xl font-semibold text-[#101828]">
            Moderation
          </h1>
        </div>

        <p className="text-sm text-[#667085]">
          {submissions.length} pending review{submissions.length === 1 ? '' : 's'}
        </p>
      </div>

      <ModerationTable
        submissions={submissions}
        onApprove={handleApprove}
        onReject={handleReject}
      />
    </div>
  );
}
