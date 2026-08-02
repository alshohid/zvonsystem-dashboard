'use client';

import { format } from 'date-fns';
import { Check, Loader2, X } from 'lucide-react';
import type { ApiRelease } from '@/src/types/releaseTypes';
import ReleaseStatusBadge from './ReleaseStatusBadge';
import { getReleaseTypeLabel } from './releaseFormOptions';

const TYPE_BADGE_CLASSNAME = 'bg-[#F3E8FF] text-[#7C3AED]';

function formatSubmittedDate(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? '—' : format(date, 'MMM d, yyyy');
}

type ModerationTableProps = {
  submissions: ApiRelease[];
  canModerate: boolean;
  pendingId: string | null;
  onApprove: (release: ApiRelease) => void;
  onReject: (release: ApiRelease) => void;
  emptyMessage?: string;
};

export default function ModerationTable({
  submissions,
  canModerate,
  pendingId,
  onApprove,
  onReject,
  emptyMessage = 'No submissions waiting for review.',
}: ModerationTableProps) {
  const headers = [
    'Release',
    'Type',
    'Submitted',
    'Status',
    ...(canModerate ? ['Actions'] : []),
  ];

  return (
    <div className="overflow-hidden rounded-2xl border border-[#E9EDF5] bg-white shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-[720px] border-collapse">
          <thead>
            <tr className="bg-[#F2F4F8]">
              {headers.map(header => (
                <th
                  key={header}
                  className="px-5 py-3 text-left text-[13px] font-medium text-[#475467]"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {submissions.map(submission => (
              <tr
                key={submission.id}
                className="border-t border-[#F0F2F7] transition-colors hover:bg-[#FAFBFC]"
              >
                <td className="px-5 py-4 text-[14px] font-medium text-[#101828]">
                  {submission.name || 'Untitled release'}
                </td>

                <td className="px-5 py-4">
                  {submission.type ? (
                    <span
                      className={[
                        'rounded-md px-2 py-0.5 text-xs font-medium',
                        TYPE_BADGE_CLASSNAME,
                      ].join(' ')}
                    >
                      {getReleaseTypeLabel(submission.type)}
                    </span>
                  ) : (
                    <span className="text-[13px] text-[#98A2B3]">—</span>
                  )}
                </td>

                <td className="px-5 py-4 text-[14px] text-[#475467]">
                  {formatSubmittedDate(submission.updated_at)}
                </td>

                <td className="px-5 py-4">
                  <ReleaseStatusBadge status={submission.status} />
                </td>

                {canModerate ? (
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      {pendingId === submission.id ? (
                        <Loader2 className="h-4 w-4 animate-spin text-[#98A2B3]" />
                      ) : (
                        <>
                          <button
                            type="button"
                            onClick={() => onApprove(submission)}
                            aria-label={`Approve ${submission.name ?? 'release'}`}
                            className="flex h-8 w-8 items-center justify-center rounded-full border border-[#BBF7D0] bg-[#F0FDF4] text-[#16A34A] transition-colors hover:bg-[#DCFCE7]"
                          >
                            <Check className="h-4 w-4" strokeWidth={2.25} />
                          </button>
                          <button
                            type="button"
                            onClick={() => onReject(submission)}
                            aria-label={`Reject ${submission.name ?? 'release'}`}
                            className="flex h-8 w-8 items-center justify-center rounded-full border border-[#FECACA] bg-[#FEF2F2] text-[#DC2626] transition-colors hover:bg-[#FEE2E2]"
                          >
                            <X className="h-4 w-4" strokeWidth={2.25} />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                ) : null}
              </tr>
            ))}

            {submissions.length === 0 ? (
              <tr>
                <td
                  colSpan={headers.length}
                  className="px-5 py-12 text-center text-sm text-[#98A2B3]"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}
