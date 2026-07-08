"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Globe2, Music2, Pause, Play } from "lucide-react";
import type { IAlbumSpotlight } from "@/src/types/dashboardOverviewTypes";

type LatestAlbumCardProps = {
  album: IAlbumSpotlight;
};

export default function LatestAlbumCard({ album }: LatestAlbumCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleTogglePlay = () => {
    const audio = audioRef.current;

    if (!audio) {
      setIsPlaying((playing) => !playing);
      return;
    }

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(() => undefined);
    }
  };

  return (
    <section className="relative h-64 min-w-0 overflow-hidden rounded-[24px] border border-[#E7EBF7] shadow-[0_18px_45px_rgba(46,58,131,0.06)]">
      <Image
        src={album.coverImageUrl ?? "/images/album-thumbnail.png"}
        alt={album.title}
        fill
        sizes="(min-width: 1280px) 32vw, 100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-black/10" />

      <div className="relative flex h-full flex-col justify-end p-5 pr-20 sm:p-6 sm:pr-24">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/70">
          Latest Album
        </p>
        <h3 className="mt-2 truncate text-2xl font-bold text-primary">{album.title}</h3>

        <div className="mt-3 flex items-center gap-4 text-sm text-white/85">
          <span className="inline-flex items-center gap-1.5">
            <Music2 size={14} />
            {album.trackCount} tracks
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Globe2 size={14} />
            {album.countryCount} countries
          </span>
        </div>
      </div>

      <button
        type="button"
        onClick={handleTogglePlay}
        aria-label={isPlaying ? `Pause ${album.title}` : `Play ${album.title}`}
        aria-pressed={isPlaying}
        className="absolute bottom-5 right-5 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[0_10px_24px_rgba(76,252,15,0.45)] transition hover:brightness-95 sm:bottom-6 sm:right-6"
      >
        {isPlaying ? (
          <Pause size={20} fill="currentColor" />
        ) : (
          <Play size={20} fill="currentColor" className="ml-0.5" />
        )}
      </button>

      {album.previewAudioUrl && (
        <audio
          ref={audioRef}
          src={album.previewAudioUrl}
          onEnded={() => setIsPlaying(false)}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />
      )}
    </section>
  );
}
