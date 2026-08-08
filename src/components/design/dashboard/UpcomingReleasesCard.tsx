import Image from "next/image";
import { resolveMediaUrl } from "@/src/lib/env";
import type { IArtistUpcomingRelease } from "@/src/types/dashboardOverviewTypes";
import { UPCOMING_STATUS_CLASSES } from "@/src/components/design/dashboard/dashboardTheme";
import { formatReleaseDate } from "@/src/components/design/dashboard/dashboardFormat";

type UpcomingReleasesCardProps = {
  releases: IArtistUpcomingRelease[];
};

export default function UpcomingReleasesCard({ releases }: UpcomingReleasesCardProps) {
  return (
    <section className="rounded-[24px] border border-[#E7EBF7] bg-white p-5 shadow-[0_18px_45px_rgba(46,58,131,0.06)] sm:p-6">
      <h3 className="text-lg font-semibold text-[#101828]">Upcoming Releases</h3>

      <div className="mt-4 flex flex-col divide-y divide-[#F1F3F9]">
        {releases.map((release) => {
          return (
            <div key={release.id} className="flex items-center gap-4 py-4">
              <Image
                src={resolveMediaUrl(release.coverUrl) || "/images/album-thumbnail.png"}
                alt={release.name}
                width={44}
                height={44}
                className="h-11 w-11 shrink-0 rounded-lg object-cover"
                unoptimized
              />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-[#101828]">{release.name}</p>
                <p className="mt-0.5 truncate text-xs text-[#98A2B3]">
                  {release.subtitle && `${release.subtitle} · `}
                  {release.trackCount} track{release.trackCount > 1 ? "s" : ""} ·{" "}
                  {formatReleaseDate(release.releaseDate)}
                </p>
                <div className="mt-2 h-1.5 w-full max-w-[220px] overflow-hidden rounded-full bg-[#F1F3F9]">
                  <div
                    className="h-full rounded-full bg-primary"
                    style={{ width: `${release.completionPercentage}%` }}
                  />
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
