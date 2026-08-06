import { ChevronRight, Disc3 } from "lucide-react";
import { resolveMediaUrl } from "@/src/lib/env";
import type { DashboardReleaseSummary } from "@/src/types/superAdminDashboardTypes";
import { formatReleaseType, formatSubmittedDate } from "./types";

type PendingApprovalListItemProps = {
  release: DashboardReleaseSummary;
  selected: boolean;
  onClick: () => void;
};

export default function PendingApprovalListItem({
  release,
  selected,
  onClick,
}: PendingApprovalListItemProps) {
  const coverUrl = resolveMediaUrl(release.coverUrl);

  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "flex w-full items-center gap-3 rounded-2xl border px-4 py-3 text-left transition-colors",
        selected
          ? "border-primary bg-[#E7FCE4]"
          : "border-[#E9E9EA] bg-white hover:bg-gray-50",
      ].join(" ")}
    >
      {coverUrl ? (
        <div
          className="h-12 w-12 shrink-0 rounded-lg bg-cover bg-center"
          style={{ backgroundImage: `url(${coverUrl})` }}
        />
      ) : (
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#F2F4F7]">
          <Disc3 className="h-5 w-5 text-[#98A2B3]" strokeWidth={1.5} />
        </div>
      )}

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-[#101828]">
          {release.name}
        </p>
        <p className="truncate text-xs text-[#667085]">
          {release.artistName} · {formatReleaseType(release.type)}
        </p>
        <p className="text-xs font-bold text-[#777980]">
          {formatSubmittedDate(release.submittedAt)}
        </p>
      </div>

      <ChevronRight className="h-4 w-4 shrink-0 text-[#98A2B3]" />
    </button>
  );
}
