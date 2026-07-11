"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Globe2, Music2, Pause, Play } from "lucide-react";
import type { IAlbumSpotlight } from "@/src/types/dashboardOverviewTypes";

type LatestAlbumCardProps = {
  album: IAlbumSpotlight;
};

export default function LatestAlbumCard({ album }: LatestAlbumCardProps) {
  const tracks = album.tracks?.length
    ? album.tracks
    : album.previewAudioUrl
      ? [{ id: album.id, title: album.title, audioUrl: album.previewAudioUrl }]
      : [];

  const [trackIndex, setTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const skipAutoPlayRef = useRef(true);

  const currentTrack = tracks[trackIndex];
  const hasMultipleTracks = tracks.length > 1;

  useEffect(() => {
    skipAutoPlayRef.current = true;
    setTrackIndex(0);
  }, [album.id]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentTrack) return;

    if (skipAutoPlayRef.current) {
      skipAutoPlayRef.current = false;
      return;
    }

    audio.load();
    audio.play().catch(() => undefined);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trackIndex]);

  const handleTogglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(() => undefined);
    }
  };

  const handlePrevious = () => {
    setTrackIndex((current) => (current - 1 + tracks.length) % tracks.length);
  };

  const handleNext = () => {
    setTrackIndex((current) => (current + 1) % tracks.length);
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

      {hasMultipleTracks && (
        <div className="absolute right-5 top-5 flex items-center gap-2 sm:right-6 sm:top-6">
          <button
            type="button"
            onClick={handlePrevious}
            aria-label="Previous track"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15 text-white transition hover:bg-white/25 active:scale-90 active:bg-primary"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next track"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15 text-white transition hover:bg-white/25 active:scale-90 active:bg-primary"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      )}

      <div className="pointer-events-none relative flex h-full flex-col justify-end p-5 pr-20 sm:p-6 sm:pr-24">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/70">
          Latest Album
        </p>
        <h3 className="mt-2 truncate text-2xl font-bold text-primary">{album.title}</h3>

        {currentTrack && (
          <p className="mt-1 truncate text-sm text-white/80">
            {hasMultipleTracks ? `${trackIndex + 1}/${tracks.length} · ` : ""}
            {currentTrack.title}
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

      {currentTrack && (
        <button
          type="button"
          onClick={handleTogglePlay}
          aria-label={isPlaying ? `Pause ${currentTrack.title}` : `Play ${currentTrack.title}`}
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

      {currentTrack && (
        <audio
          ref={audioRef}
          src={currentTrack.audioUrl}
          onEnded={hasMultipleTracks ? handleNext : () => setIsPlaying(false)}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />
      )}
    </section>
  );
}
