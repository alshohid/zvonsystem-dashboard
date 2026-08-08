"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Globe2, Music2, Pause, Play } from "lucide-react";
import { resolveMediaUrl } from "@/src/lib/env";
import type { IAlbumSpotlight } from "@/src/types/dashboardOverviewTypes";

type LatestAlbumCardProps = {
  albums: IAlbumSpotlight[];
};

export default function LatestAlbumCard({ albums }: LatestAlbumCardProps) {
  const [albumIndex, setAlbumIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const hasMultipleAlbums = albums.length > 1;
  const album = albums[albumIndex] ?? albums[0];

  const togglePlayback = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(() => undefined);
    }
  };

  const goToAlbum = (direction: number) => {
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
    }
    setIsPlaying(false);
    setAlbumIndex((current) => (current + direction + albums.length) % albums.length);
  };

  if (!album) {
    return null;
  }

  // Prefer the album preview; fall back to its first track.
  const audioSrc = album.previewAudioUrl ?? album.tracks?.[0]?.audioUrl;
  const resolvedAudio = audioSrc ? resolveMediaUrl(audioSrc) : null;
  const resolvedCover =
    resolveMediaUrl(album.coverImageUrl) ?? "/images/album-thumbnail.png";
  const leadingTrack = album.tracks?.[0];
  const extraTrackCount = album.tracks ? Math.max(album.tracks.length - 1, 0) : 0;

  return (
    <section className="relative h-64 min-w-0 overflow-hidden rounded-[24px] border border-[#E7EBF7] shadow-[0_18px_45px_rgba(46,58,131,0.06)]">
      <Image
        src={resolvedCover}
        alt={album.title}
        fill
        sizes="(min-width: 1280px) 32vw, 100vw"
        className="object-cover"
        unoptimized
      />
      <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-black/10" />

      {hasMultipleAlbums && (
        <div className="absolute right-5 top-5 flex items-center gap-2 sm:right-6 sm:top-6">
          <button
            type="button"
            onClick={() => goToAlbum(-1)}
            aria-label="Previous album"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15 text-white transition hover:bg-white/25 active:scale-90 active:bg-primary"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            type="button"
            onClick={() => goToAlbum(1)}
            aria-label="Next album"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15 text-white transition hover:bg-white/25 active:scale-90 active:bg-primary"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      )}

      <div className="pointer-events-none relative flex h-full flex-col justify-end p-5 pr-20 sm:p-6 sm:pr-24">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/70">
          Latest Album{hasMultipleAlbums ? `  ${albumIndex + 1}/${albums.length}` : ""}
        </p>
        <h3 className="mt-2 truncate text-2xl font-bold text-primary">{album.title}</h3>

        {leadingTrack && (
          <p className="mt-1 truncate text-sm text-white/80">
            {leadingTrack.title}
            {extraTrackCount > 0 ? ` +${extraTrackCount} more` : ""}
          </p>
        )}

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

      {resolvedAudio && (
        <button
          type="button"
          onClick={togglePlayback}
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
      )}

      {resolvedAudio && (
        <audio
          ref={audioRef}
          src={resolvedAudio}
          preload="none"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={() => setIsPlaying(false)}
        />
      )}
    </section>
  );
}
