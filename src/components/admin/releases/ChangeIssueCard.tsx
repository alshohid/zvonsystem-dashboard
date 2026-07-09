import { Eye, Info, XCircle } from 'lucide-react';
import { type ChangeIssue, type ChangeSeverity } from './mockChanges';

const SEVERITY_STYLES: Record<
  ChangeSeverity,
  { border: string; headerBg: string; headerText: string; label: string }
> = {
  error: {
    border: 'border-[#FECDD3]',
    headerBg: 'bg-[#FEF2F2]',
    headerText: 'text-[#DC2626]',
    label: 'Error',
  },
  warning: {
    border: 'border-[#FDE68A]',
    headerBg: 'bg-[#FFFBEB]',
    headerText: 'text-[#D97706]',
    label: 'Warning',
  },
};

type ChangeIssueCardProps = {
  issue: ChangeIssue;
  onPreview: (id: string) => void;
  onFixNow: (id: string) => void;
};

export default function ChangeIssueCard({ issue, onPreview, onFixNow }: ChangeIssueCardProps) {
  const styles = SEVERITY_STYLES[issue.severity];

  return (
    <div
      className={[
        'overflow-hidden rounded-2xl border bg-white shadow-[0_1px_2px_rgba(16,24,40,0.04)]',
        styles.border,
      ].join(' ')}
    >
      <div className={['flex items-center gap-1.5 px-5 py-2', styles.headerBg].join(' ')}>
        <XCircle className={['h-4 w-4', styles.headerText].join(' ')} strokeWidth={2} />
        <span
          className={[
            'text-xs font-semibold uppercase tracking-[0.08em]',
            styles.headerText,
          ].join(' ')}
        >
          {styles.label}
        </span>
      </div>

      <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0 space-y-1.5">
          <h3 className="text-[15px] font-semibold text-[#101828]">{issue.releaseTitle}</h3>
          <p className="flex items-start gap-1.5 text-sm text-[#667085]">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-[#98A2B3]" strokeWidth={1.75} />
            <span>{issue.description}</span>
          </p>
          <p className="text-xs text-[#98A2B3]">{issue.dateLabel}</p>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={() => onPreview(issue.id)}
            className="flex items-center gap-1.5 rounded-xl border border-[#E5E7EB] px-4 py-2 text-sm font-medium text-[#344054] transition-colors hover:border-[#D0D5DD] hover:bg-[#F9FAFB]"
          >
            <Eye className="h-4 w-4" strokeWidth={1.75} />
            Preview
          </button>
          <button
            type="button"
            onClick={() => onFixNow(issue.id)}
            className="rounded-xl bg-primary px-4 py-2 text-sm font-medium text-[#101828] transition-opacity hover:opacity-90"
          >
            Fix Now
          </button>
        </div>
      </div>
    </div>
  );
}
