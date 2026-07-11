import { ChevronRight } from "lucide-react";
import type { PendingRelease } from "./mockSuperAdminDashboard";

type PendingApprovalListItemProps = {
  release: PendingRelease;
  selected: boolean;
  onClick: () => void;
};

export default function PendingApprovalListItem({
  release,
  selected,
  onClick,
}: PendingApprovalListItemProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "flex w-full items-center gap-3 rounded-2xl border px-4 py-3 text-left transition-colors",
        selected ? "border-primary bg-[#E7FCE4]" : "border-[#E9E9EA] bg-white hover:bg-gray-50",
      ].join(" ")}
    >
      <div
        className="h-12 w-12 shrink-0 rounded-lg bg-cover bg-center"
        style={{ backgroundImage: `url(${release.coverImage})` }}
      />

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-[#101828]">{release.title}</p>
        <p className="truncate text-xs text-[#667085]">
          {release.artist} · {release.type}
        </p>
        <p className="text-xs text-[#777980] font-bold">{release.submittedDate}</p>
      </div>

      <ChevronRight className="h-4 w-4 shrink-0 text-[#98A2B3]" />
    </button>
  );
}
