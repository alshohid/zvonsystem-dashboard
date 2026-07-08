import type { IPlatformShare } from "@/src/types/dashboardOverviewTypes";
import { PLATFORM_COLOR_MAP } from "@/src/components/design/dashboard/dashboardTheme";
import { formatCompactNumber } from "@/src/components/design/dashboard/dashboardFormat";

type PlatformBreakdownCardProps = {
  shares: IPlatformShare[];
  totalStreams: number;
};

export default function PlatformBreakdownCard({
  shares,
  totalStreams,
}: PlatformBreakdownCardProps) {
  const maxStreams = Math.max(...shares.map((share) => share.streams), 1);

  return (
    <section className="rounded-[24px] border border-[#E7EBF7] bg-white p-5 shadow-[0_18px_45px_rgba(46,58,131,0.06)] sm:p-6">
      <div>
        <h3 className="text-lg font-semibold text-[#101828]">By Platform</h3>
        <p className="mt-1 text-sm text-[#667085]">All-time streams</p>
      </div>

      <div className="mt-6 flex flex-col gap-4">
        {shares.map((share) => (
          <div key={share.id}>
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-[#344054]">{share.platform}</span>
              <span className="text-[#667085]">{formatCompactNumber(share.streams)}</span>
            </div>
            <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-[#F1F3F9]">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${(share.streams / maxStreams) * 100}%`,
                  backgroundColor: PLATFORM_COLOR_MAP[share.colorToken],
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-[#EEF1F7] pt-4">
        <span className="text-sm font-medium text-[#667085]">Total</span>
        <span className="text-sm font-semibold text-[#101828]">
          {formatCompactNumber(totalStreams)}
        </span>
      </div>
    </section>
  );
}
