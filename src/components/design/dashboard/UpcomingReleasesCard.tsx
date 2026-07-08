import { Disc3, Music2 } from "lucide-react";
import type { IUpcomingRelease } from "@/src/types/dashboardOverviewTypes";
import { UPCOMING_STATUS_CLASSES } from "@/src/components/design/dashboard/dashboardTheme";
import { formatReleaseDate } from "@/src/components/design/dashboard/dashboardFormat";

type UpcomingReleasesCardProps = {
  releases: IUpcomingRelease[];
};

export default function UpcomingReleasesCard({ releases }: UpcomingReleasesCardProps) {
  return (
    <section className="rounded-[24px] border border-[#E7EBF7] bg-white p-5 shadow-[0_18px_45px_rgba(46,58,131,0.06)] sm:p-6">
      <h3 className="text-lg font-semibold text-[#101828]">Upcoming Releases</h3>

      <div className="mt-4 flex flex-col divide-y divide-[#F1F3F9]">
        {releases.map((release) => {
          const ReleaseIcon = release.releaseType === "Album" ? Disc3 : Music2;

          return (
            <div key={release.id} className="flex items-center justify-between gap-4 py-4">
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#F7F3FE] text-[#2E3A83]">
                  <ReleaseIcon size={16} />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-[#101828]">{release.title}</p>
                  <p className="mt-0.5 text-xs text-[#98A2B3]">
                    {formatReleaseDate(release.releaseDate)} &middot; {release.releaseType}
                  </p>
                </div>
              </div>

              <span
                className={[
                  "shrink-0 rounded-xl border px-3 py-2 text-xs font-light",
                  UPCOMING_STATUS_CLASSES[release.status],
                ].join(" ")}
              >
                {release.status}
              </span>
            </div>
          );
        })}

        {releases.length === 0 && (
          <p className="py-6 text-center text-sm text-[#667085]">No upcoming releases.</p>
        )}
      </div>
    </section>
  );
}
