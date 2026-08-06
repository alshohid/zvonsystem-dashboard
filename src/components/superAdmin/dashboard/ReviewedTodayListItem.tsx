import Link from "next/link";
import { CheckCircle2, ChevronRight, XCircle } from "lucide-react";
import Badge from "@/src/components/ui/badge/Badge";
import type { ReviewedItem, ReviewOutcome } from "./types";

const OUTCOME_META: Record<
  ReviewOutcome,
  {
    icon: typeof CheckCircle2;
    badgeColor: "success" | "error";
    label: string;
  }
> = {
  approved: {
    icon: CheckCircle2,
    badgeColor: "success",
    label: "Approved",
  },
  rejected: {
    icon: XCircle,
    badgeColor: "error",
    label: "Rejected",
  },
};

type ReviewedTodayListItemProps = {
  item: ReviewedItem;
  href: string;
};

export default function ReviewedTodayListItem({
  item,
  href,
}: ReviewedTodayListItemProps) {
  const meta = OUTCOME_META[item.outcome];
  const Icon = meta.icon;

  return (
    <Link
      href={href}
      className="flex items-center gap-3 py-3 transition-colors hover:bg-[#FAFBFC]"
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#101828]">
        <Icon className="h-5 w-5 text-white" />
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-[#101828]">
          {item.title}
        </p>
        <p className="truncate text-xs text-[#667085]">
          {item.artist} · {item.type}
        </p>
      </div>

      <div className="flex shrink-0 items-center gap-3">
        <Badge variant="light" color={meta.badgeColor} size="sm">
          {meta.label}
        </Badge>
        <span className="text-xs text-[#98A2B3]">{item.reviewedAt}</span>
        <ChevronRight className="h-4 w-4 text-[#98A2B3]" />
      </div>
    </Link>
  );
}
