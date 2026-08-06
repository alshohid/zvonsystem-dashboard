import type { DashboardReleaseSummary } from "@/src/types/superAdminDashboardTypes";
import PendingApprovalListItem from "./PendingApprovalListItem";

type PendingApprovalListProps = {
  releases: DashboardReleaseSummary[];
  selectedId: string;
  onSelect: (id: string) => void;
};

export default function PendingApprovalList({
  releases,
  selectedId,
  onSelect,
}: PendingApprovalListProps) {
  if (releases.length === 0) {
    return (
      <p className="rounded-2xl border border-[#E9EDF5] bg-white p-6 text-center text-sm text-[#667085]">
        No pending approvals.
      </p>
    );
  }

  return (
    <div className="space-y-2">
      {releases.map((release) => (
        <PendingApprovalListItem
          key={release.id}
          release={release}
          selected={release.id === selectedId}
          onClick={() => onSelect(release.id)}
        />
      ))}
    </div>
  );
}
