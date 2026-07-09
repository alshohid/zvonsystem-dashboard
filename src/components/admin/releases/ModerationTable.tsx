import { Check, X } from 'lucide-react';
import { type ModerationPriority, type ModerationReleaseType } from './mockModeration';

const TYPE_BADGE_CLASSNAME = 'bg-[#F3E8FF] text-[#7C3AED]';

const PRIORITY_BADGE_CLASSNAMES: Record<ModerationPriority, string> = {
  High: 'border border-[#FECACA] bg-[#FEE2E2] text-[#DC2626]',
  Medium: 'border border-[#FDE68A] bg-[#FEF3C7] text-[#B45309]',
  Low: 'border border-[#BBF7D0] bg-[#DCFCE7] text-[#15803D]',
};

const TABLE_HEADERS = ['Release', 'Type', 'Submitted', 'Priority', 'Actions'];

export type ModerationTableRow = {
  id: string;
  releaseTitle: string;
  type: ModerationReleaseType;
  submittedLabel: string;
  priority: ModerationPriority;
};

type ModerationTableProps = {
  submissions: ModerationTableRow[];
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
};

export default function ModerationTable({
  submissions,
  onApprove,
  onReject,
}: ModerationTableProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-[#E9EDF5] bg-white shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-[720px] border-collapse">
          <thead>
            <tr className="bg-[#F2F4F8]">
              {TABLE_HEADERS.map(header => (
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
                  {submission.releaseTitle}
                </td>

                <td className="px-5 py-4">
                  <span
                    className={[
                      'rounded-md px-2 py-0.5 text-xs font-medium',
                      TYPE_BADGE_CLASSNAME,
                    ].join(' ')}
                  >
                    {submission.type}
                  </span>
                </td>

                <td className="px-5 py-4 text-[14px] text-[#475467]">
                  {submission.submittedLabel}
                </td>

                <td className="px-5 py-4">
                  <span
                    className={[
                      'rounded-md px-2 py-0.5 text-xs font-medium',
                      PRIORITY_BADGE_CLASSNAMES[submission.priority],
                    ].join(' ')}
                  >
                    {submission.priority}
                  </span>
                </td>

                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => onApprove(submission.id)}
                      aria-label={`Approve ${submission.releaseTitle}`}
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-[#BBF7D0] bg-[#F0FDF4] text-[#16A34A] transition-colors hover:bg-[#DCFCE7]"
                    >
                      <Check className="h-4 w-4" strokeWidth={2.25} />
                    </button>
                    <button
                      type="button"
                      onClick={() => onReject(submission.id)}
                      aria-label={`Reject ${submission.releaseTitle}`}
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-[#FECACA] bg-[#FEF2F2] text-[#DC2626] transition-colors hover:bg-[#FEE2E2]"
                    >
                      <X className="h-4 w-4" strokeWidth={2.25} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {submissions.length === 0 ? (
              <tr>
                <td colSpan={TABLE_HEADERS.length} className="px-5 py-12 text-center text-sm text-[#98A2B3]">
                  No submissions waiting for review.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}
