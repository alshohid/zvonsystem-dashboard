import type { ReleaseStatus } from '@/src/types/releaseTypes';

const STATUS_META: Record<ReleaseStatus, { label: string; className: string }> = {
  DRAFT: {
    label: 'Draft',
    className: 'border border-[#E5E7EB] bg-[#F9FAFB] text-[#475467]',
  },
  IN_MODERATION: {
    label: 'In Moderation',
    className: 'border border-[#FDE68A] bg-[#FEF3C7] text-[#B45309]',
  },
  APPROVED: {
    label: 'Approved',
    className: 'border border-[#BBF7D0] bg-[#DCFCE7] text-[#15803D]',
  },
  LIVE: {
    label: 'Live',
    className: 'border border-[#BBF7D0] bg-[#DCFCE7] text-[#15803D]',
  },
  SCHEDULED: {
    label: 'Scheduled',
    className: 'border border-[#BFDBFE] bg-[#EFF6FF] text-[#1D4ED8]',
  },
  REJECTED: {
    label: 'Changes Required',
    className: 'border border-[#FECACA] bg-[#FEE2E2] text-[#DC2626]',
  },
};

export const getReleaseStatusLabel = (status: ReleaseStatus) =>
  STATUS_META[status]?.label ?? status;

export default function ReleaseStatusBadge({
  status,
}: {
  status: ReleaseStatus;
}) {
  const meta = STATUS_META[status] ?? STATUS_META.DRAFT;

  return (
    <span
      className={[
        'inline-block rounded-md px-2 py-0.5 text-xs font-medium',
        meta.className,
      ].join(' ')}
    >
      {meta.label}
    </span>
  );
}
