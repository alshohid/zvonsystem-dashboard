import type { ElementType } from "react";
import { AlertCircle, Clock, RefreshCw, TrendingDown, TrendingUp, Users } from "lucide-react";
import type { StatTile, StatTileId } from "./mockSuperAdminDashboard";

const STAT_ICON_BY_ID: Record<StatTileId, ElementType> = {
  "total-users": Users,
  "total-releases": RefreshCw,
  "releases-in-queue": Clock,
  "flagged-content": AlertCircle,
};

type StatTilesGridProps = {
  stats: StatTile[];
};

export default function StatTilesGrid({ stats }: StatTilesGridProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = STAT_ICON_BY_ID[stat.id];
        const TrendIcon = stat.trend.direction === "up" ? TrendingUp : TrendingDown;
        const trendColorClass =
          stat.trend.direction === "up" ? "text-success-600" : "text-error-600";

        return (
          <div
            key={stat.id}
            className="rounded-2xl border border-[#E7EBF7] bg-secondary p-5 shadow-[0_16px_40px_rgba(46,58,131,0.06)]"
          >
            <div className="flex items-start justify-between gap-3">
              <p className="text-xs font-medium uppercase tracking-[0.12em] text-[#98A2B3]">
                {stat.label}
              </p>
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-[#16A34A]">
                <Icon width={16} height={16} />
              </div>
            </div>

            <p className="mt-4 text-3xl font-semibold text-[#101828]">{stat.value}</p>

            <p className={`mt-2 inline-flex items-center gap-1 text-xs font-medium ${trendColorClass}`}>
              <TrendIcon size={14} />
              {stat.trend.label}
            </p>
          </div>
        );
      })}
    </div>
  );
}
