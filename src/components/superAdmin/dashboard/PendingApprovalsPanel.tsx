import type { PendingRelease } from "./mockSuperAdminDashboard";
import PendingApprovalList from "./PendingApprovalList";
import PendingApprovalDetail from "./PendingApprovalDetail";

type PendingApprovalsPanelProps = {
  releases: PendingRelease[];
  selectedId: string;
  onSelect: (id: string) => void;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
};

export default function PendingApprovalsPanel({
  releases,
  selectedId,
  onSelect,
  onApprove,
  onReject,
}: PendingApprovalsPanelProps) {
  const selectedRelease = releases.find((release) => release.id === selectedId);

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[2fr_3fr]">
      <PendingApprovalList releases={releases} selectedId={selectedId} onSelect={onSelect} />

      {selectedRelease ? (
        <PendingApprovalDetail
          release={selectedRelease}
          onApprove={() => onApprove(selectedRelease.id)}
          onReject={() => onReject(selectedRelease.id)}
        />
      ) : (
        <p className="rounded-2xl border border-[#E9EDF5] bg-white p-6 text-center text-sm text-[#667085]">
          Select a release to review.
        </p>
      )}
    </div>
  );
}
