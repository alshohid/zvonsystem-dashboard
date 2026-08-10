"use client";

import type { ElementType } from "react";
import { TrendingDown, TrendingUp } from "lucide-react";
import type { IAnalyticsStats } from "@/src/types/analyticsTypes";
import { DASHBOARD_COLORS } from "@/src/components/design/dashboard/dashboardTheme";
import {
  HeadPhoneIcon,
  ProgressIcon,
  PublishedIcon,
  ReleaseIcon,
} from "@/src/icons";

// Card icons are a fixed, UI-only concern — never sourced from the API response.
type SummaryStatCard = {
  id: string;
  title: string;
  value: string;
  /** Only `totalReleases` ships a change delta from the API. */
  change?: number;
  Icon: ElementType;
};

const buildSummaryStatCards = (stats: IAnalyticsStats): SummaryStatCard[] => [
  {
    id: "total-releases",
    title: "Total Releases",
    value: String(stats.totalReleases),
    change: stats.totalReleasesChange,
    Icon: ReleaseIcon,
  },
  {
    id: "in-progress",
    title: "In Progress",
    value: String(stats.inProgress),
    Icon: ProgressIcon,
  },
  {
    id: "total-published",
    title: "Total Published",
    value: String(stats.totalPublished),
    Icon: PublishedIcon,
  },
  {
    id: "active-releases",
    title: "Active Releases",
    value: String(stats.activeReleases),
    Icon: HeadPhoneIcon,
  },
];

type AnalyticsSummaryGridProps = {
  stats: IAnalyticsStats;
};

export default function AnalyticsSummaryGrid({ stats }: AnalyticsSummaryGridProps) {
  const cards = buildSummaryStatCards(stats);

  return (
    <div className="grid gap-4 md:gap-8 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((stat) => {
        const Icon = stat.Icon;
        const hasChange = typeof stat.change === "number";

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

            {hasChange && (
              <p
                className="mt-2 inline-flex items-center gap-1 text-xs font-medium"
                style={{
                  color:
                    stat.change! >= 0
                      ? DASHBOARD_COLORS.success
                      : DASHBOARD_COLORS.danger,
                }}
              >
                {stat.change! >= 0 ? (
                  <TrendingUp size={14} />
                ) : (
                  <TrendingDown size={14} />
                )}
                {`${stat.change! > 0 ? "+" : ""}${stat.change}%`}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}


