import Image from "next/image";
import { resolveMediaUrl } from "@/src/lib/env";
import type { IArtistTopTrack } from "@/src/types/dashboardOverviewTypes";

type TopTracksCardProps = {
  tracks: IArtistTopTrack[];
  title?: string;
};

export default function TopTracksCard({
  tracks,
  title = "Top Tracks",
}: TopTracksCardProps) {
  return (
    <section className="min-w-0 rounded-[24px] border border-[#E7EBF7] bg-white p-5 shadow-[0_18px_45px_rgba(46,58,131,0.06)] sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-lg font-semibold text-[#101828]">{title}</h3>
        <span className="text-sm text-[#98A2B3]">{tracks.length} tracks</span>
      </div>

      <div className="mt-4 flex flex-col">
        {tracks.map((track, index) => (
          <div
            key={track.id}
            className="flex items-center gap-3 border-b border-[#F1F3F9] py-3 last:border-b-0"
          >
            <span className="w-4 shrink-0 text-sm font-medium text-[#98A2B3]">
              {index + 1}
            </span>
            <Image
              src={resolveMediaUrl(track.coverUrl) || "/images/album-thumbnail.png"}
              alt={track.name}
              width={40}
              height={40}
              className="h-10 w-10 shrink-0 rounded-lg object-cover"
              unoptimized
            />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-[#101828]">{track.name}</p>
              <p className="truncate text-xs text-[#98A2B3]">{track.releaseName}</p>
            </div>
            <span className="shrink-0 text-xs text-[#98A2B3]">{track.duration}</span>
          </div>
        ))}

        {tracks.length === 0 && (
          <p className="py-6 text-center text-sm text-[#667085]">No track data yet.</p>
        )}
      </div>
    </section>
  );
}
