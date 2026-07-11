import { CheckCircle2, Clock, XCircle } from "lucide-react";
import Badge from "@/src/components/ui/badge/Badge";
import type { ReviewedItem, ReviewOutcome } from "./mockSuperAdminDashboard";

const OUTCOME_META: Record<
  ReviewOutcome,
  { icon: typeof CheckCircle2; badgeColor: "success" | "warning" | "error"; label: string }
> = {
  approved: { icon: CheckCircle2, badgeColor: "success", label: "Approved" },
  "changes-requested": { icon: Clock, badgeColor: "warning", label: "Changes Requested" },
  rejected: { icon: XCircle, badgeColor: "error", label: "Rejected" },
};

type ReviewedTodayListItemProps = {
  item: ReviewedItem;
};

export default function ReviewedTodayListItem({ item }: ReviewedTodayListItemProps) {
  const meta = OUTCOME_META[item.outcome];
  const Icon = meta.icon;

  return (
    <div className="flex items-center gap-3 py-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#101828]">
        <Icon className="h-5 w-5 text-white" />
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-[#101828]">{item.title}</p>
        <p className="truncate text-xs text-[#667085]">
          {item.artist} · {item.type}
        </p>
      </div>

      <div className="flex shrink-0 items-center gap-3">
        <Badge variant="light" color={meta.badgeColor} size="sm">
          {meta.label}
        </Badge>
        <span className="text-xs text-[#98A2B3]">{item.reviewedAt}</span>
      </div>
    </div>
  );
}
