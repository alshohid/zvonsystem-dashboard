import { TrendingDown, TrendingUp } from "lucide-react";
import type { ITrackPerformanceItem } from "@/src/types/analyticsTypes";
import { DASHBOARD_COLORS } from "@/src/components/design/dashboard/dashboardTheme";
import { formatCompactNumber } from "@/src/components/design/dashboard/dashboardFormat";

type TrackPerformanceCardProps = {
  tracks: ITrackPerformanceItem[];
  title?: string;
  onViewAll?: () => void;
};

type ChangeInfo = {
  direction: "up" | "down" | "flat";
  label: string;
};

function resolveChange(change?: string): ChangeInfo {
  const trimmed = change?.trim();
  if (!trimmed) return { direction: "flat", label: "0%" };
  if (trimmed.startsWith("-")) return { direction: "down", label: trimmed };
  if (trimmed === "0" || trimmed === "0%") return { direction: "flat", label: trimmed };
  return {
    direction: "up",
    label: trimmed.startsWith("+") ? trimmed : `+${trimmed}`,
  };
}

export default function TrackPerformanceCard({
  tracks,
  title = "Track Performance",
  onViewAll,
}: TrackPerformanceCardProps) {
  return (
    <section className="min-w-0 rounded-[24px] border border-[#E7EBF7] bg-white p-5 shadow-[0_18px_45px_rgba(46,58,131,0.06)] sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-lg font-semibold text-[#101828]">{title}</h3>
        {onViewAll && (
          <button
            type="button"
            onClick={onViewAll}
            className="text-sm font-semibold text-[#16A34A] transition hover:text-[#128038]"
          >
            View all
          </button>
        )}
      </div>

      <div className="mt-4 flex flex-col">
        {tracks.map((track, index) => {
          const { direction, label } = resolveChange(track.change);
          const TrendIcon =
            direction === "up" ? TrendingUp : direction === "down" ? TrendingDown : null;
          const trendColor =
            direction === "up"
              ? DASHBOARD_COLORS.success
              : direction === "down"
                ? DASHBOARD_COLORS.danger
                : DASHBOARD_COLORS.muted;

          return (
            <div
              key={`${index}-${track.name}`}
              className="flex flex-col gap-2 border-b border-[#F1F3F9] py-3.5 last:border-b-0 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
            >
              <div className="flex min-w-0 items-center gap-3">
                <span className="w-4 shrink-0 text-sm font-medium text-[#98A2B3]">
                  {index + 1}
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-[#101828]">{track.name}</p>
                  <p className="truncate text-xs text-[#98A2B3]">{track.releaseName}</p>
                </div>
              </div>

              <div className="flex shrink-0 items-center justify-between gap-4 pl-7 text-sm sm:justify-normal sm:pl-0">
                <span
                  className="inline-flex items-center gap-1 font-medium"
                  style={{ color: trendColor }}
                >
                  {TrendIcon && <TrendIcon size={14} />}
                  {label}
                </span>
                <span className="w-12 text-right text-[#475467]">
                  {formatCompactNumber(Number(track.streams))}
                </span>
                <span className="w-10 text-right text-[#98A2B3]">{track.duration}</span>
              </div>
            </div>
          );
        })}

        {tracks.length === 0 && (
          <p className="py-6 text-center text-sm text-[#667085]">No track data yet.</p>
        )}
      </div>
    </section>
  );
}
