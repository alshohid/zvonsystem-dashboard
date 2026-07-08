"use client";

import { TrendingDown, TrendingUp } from "lucide-react";
import type { ISummaryStat, SummaryStatId } from "@/src/types/dashboardOverviewTypes";
import { DASHBOARD_COLORS } from "@/src/components/design/dashboard/dashboardTheme";
import {
  HeadPhoneIcon,
  ProgressIcon,
  PublishedIcon,
  ReleaseIcon,
} from "@/src/icons";

// Card icons are a fixed, UI-only concern — never sourced from the API response.
const STAT_ICON_BY_ID: Record<SummaryStatId, typeof HeadPhoneIcon> = {
  "total-streams": HeadPhoneIcon,
  "in-progress": ProgressIcon,
  "total-published": PublishedIcon,
  "active-releases": ReleaseIcon,
};

type SummaryStatsGridProps = {
  stats: ISummaryStat[];
};

export default function SummaryStatsGrid({ stats }: SummaryStatsGridProps) {
  return (
    <div className="grid gap-4 md:gap-8 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = STAT_ICON_BY_ID[stat.id];
        const TrendIcon = stat.trend.direction === "up" ? TrendingUp : TrendingDown;
        const trendColor =
          stat.trend.direction === "up" ? DASHBOARD_COLORS.success : DASHBOARD_COLORS.danger;

        return (
          <div
            key={stat.id}
            className="rounded-2xl border border-[#E7EBF7] bg-secondary p-5 shadow-[0_16px_40px_rgba(46,58,131,0.06)]"
          >
            <div className="flex items-start justify-between gap-3">
              <p className="text-xs font-extralight uppercase tracking-[0.12em] text-[#98A2B3]">
                {stat.title}
              </p>
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-[#16A34A]">
                <Icon width={16} height={16} />
              </div>
            </div>

            <p className="mt-4 text-3xl font-semibold text-[#101828]">{stat.value}</p>

            <p
              className="mt-2 inline-flex items-center gap-1 text-xs font-medium"
              style={{ color: trendColor }}
            >
              <TrendIcon size={14} />
              {stat.trend.label}
            </p>
          </div>
        );
      })}
    </div>
  );
}
