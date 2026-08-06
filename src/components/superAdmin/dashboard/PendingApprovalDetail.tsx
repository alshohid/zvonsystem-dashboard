"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Disc3,
  Info,
  Loader2,
  Pause,
  Play,
  X,
} from "lucide-react";
import { resolveMediaUrl } from "@/src/lib/env";
import { getErrorMessage } from "@/src/lib/getErrorMessage";
import { useGetReleaseByIdQuery } from "@/src/redux/features/releases/releasesApi";
import type { ApiRelease, ApiTrack } from "@/src/types/releaseTypes";
import type { DashboardReleaseSummary } from "@/src/types/superAdminDashboardTypes";
import {
  getGenreLabel,
  getReleaseTypeLabel,
} from "@/src/components/admin/releases/releaseFormOptions";
import {
  formatReleaseType,
  formatSubmittedDate,
} from "./types";

type PendingApprovalDetailProps = {
  summary: DashboardReleaseSummary;
  isUpdating?: boolean;
  onApprove: () => void;
  onReject: () => void;
};

const buildChecklist = (release: ApiRelease) => {
  const tracks = release.tracks ?? [];
  const hasAudio = tracks.some((track) => Boolean(track.audioUrl?.path));
  const hasIsrc = tracks.every((track) => Boolean(track.isrc?.trim()));

  return [
    {
      label: "Cover art",
      done: Boolean(release.cover_url?.path || release.cover_url_id),
    },
    {
      label: "Audio files",
      done: tracks.length > 0 && hasAudio,
    },
    {
      label: "ISRC codes assigned",
      done: tracks.length > 0 && hasIsrc,
    },
    {
      label: "Release date set",
      done: Boolean(release.release_date),
    },
    {
      label: "Metadata complete",
      done: Boolean(release.name && release.genre && release.type),
    },
    {
      label: "Platform selection",
      done:
        release.all_ad_platforms ||
        (release.selected_platforms?.length ?? 0) > 0,
    },
  ];
};

export default function PendingApprovalDetail({
  summary,
  isUpdating = false,
  onApprove,
  onReject,
}: PendingApprovalDetailProps) {
  const { data, isLoading, isError, error } = useGetReleaseByIdQuery(summary.id);
  const release = data?.data;

  const coverUrl =
    resolveMediaUrl(release?.cover_url?.path ?? release?.cover_url?.full_url) ??
    resolveMediaUrl(summary.coverUrl);

  const tracks = useMemo(
    () =>
      [...(release?.tracks ?? [])].sort(
        (a, b) => (a.trackNo ?? 0) - (b.trackNo ?? 0),
      ),
    [release?.tracks],
  );

  const checklist = release ? buildChecklist(release) : [];

  return (
    <div className="space-y-5 rounded-2xl border border-[#E9EDF5] bg-white p-5">
      <div
        className="relative h-56 w-full overflow-hidden rounded-2xl bg-[#101828] bg-cover bg-center sm:h-72"
        style={coverUrl ? { backgroundImage: `url(${coverUrl})` } : undefined}
      >
        {!coverUrl ? (
          <div className="absolute inset-0 flex items-center justify-center bg-[linear-gradient(135deg,#4c1d95_0%,#7c3aed_45%,#1e1b4b_100%)]">
            <Disc3 className="h-12 w-12 text-white/70" strokeWidth={1.5} />
          </div>
        ) : null}

        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5">
          <div className="min-w-0">
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-white/80">
              {release
                ? [
                    getGenreLabel(release.genre),
                    getReleaseTypeLabel(release.type),
                  ]
                    .filter(Boolean)
                    .join(" · ") || formatReleaseType(summary.type)
                : formatReleaseType(summary.type)}
            </p>
            <h2 className="truncate text-2xl font-bold text-white sm:text-3xl">
              {release?.name || summary.name}
            </h2>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center gap-2 py-10 text-sm text-[#667085]">
          <Loader2 className="h-4 w-4 animate-spin" />
          Loading release details…
        </div>
      ) : isError || !release ? (
        <div className="rounded-xl border border-[#FECDD3] bg-[#FEF2F2] px-4 py-6 text-center text-sm text-[#B42318]">
          {getErrorMessage(error, "Could not load this release.")}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-3 gap-4 border-b border-[#EEF2ED] pb-5">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.1em] text-[#98A2B3]">
                Artist
              </p>
              <p className="mt-1 text-sm font-semibold text-[#101828]">
                {summary.artistName}
              </p>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.1em] text-[#98A2B3]">
                Tracks
              </p>
              <p className="mt-1 text-sm font-semibold text-[#101828]">
                {tracks.length || summary.trackCount}
              </p>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.1em] text-[#98A2B3]">
                Submitted
              </p>
              <p className="mt-1 text-sm font-semibold text-[#101828]">
                {formatSubmittedDate(summary.submittedAt)}
              </p>
            </div>
          </div>

          <div className="border-b border-[#EEF2ED] pb-5">
            <p className="text-xs font-medium uppercase tracking-[0.1em] text-[#98A2B3]">
              Artist Note
            </p>
            <p className="mt-2 text-sm text-[#344054]">
              {summary.artistNote ||
                release.moderator_message ||
                "No note from the artist."}
            </p>
          </div>

          <TrackPlayer tracks={tracks} />

          <div className="border-b border-[#EEF2ED] pb-5">
            <p className="text-xs font-medium uppercase tracking-[0.1em] text-[#98A2B3]">
              Submission Checklist
            </p>
            <div className="mt-3 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2">
              {checklist.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-2 text-sm text-[#344054]"
                >
                  <CheckCircle2
                    className={[
                      "h-4 w-4 shrink-0",
                      item.done ? "text-success-600" : "text-[#D0D5DD]",
                    ].join(" ")}
                  />
                  {item.label}
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <button
          type="button"
          onClick={onApprove}
          disabled={isUpdating || isLoading || !release}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 text-sm font-semibold text-[#101828] transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 sm:flex-1"
        >
          {isUpdating ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Check className="h-4 w-4" />
          )}
          Approve Release
        </button>

        <button
          type="button"
          onClick={onReject}
          disabled={isUpdating || isLoading || !release}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-error-500 py-3 text-sm font-semibold text-error-600 transition-colors hover:bg-error-50 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto sm:px-6"
        >
          <X className="h-4 w-4" />
          Reject
        </button>

        <button
          type="button"
          className="flex h-11 w-11 shrink-0 items-center justify-center self-center rounded-full border border-[#E5E7EB] text-[#667085] transition-colors hover:bg-gray-50 sm:self-auto"
          aria-label="More information"
        >
          <Info className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

function TrackPlayer({ tracks }: { tracks: ApiTrack[] }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const playableTracks = useMemo(
    () =>
      tracks.map((track) => ({
        track,
        url: resolveMediaUrl(track.audioUrl?.path ?? track.audioUrl?.full_url),
      })),
    [tracks],
  );

  const active = playableTracks[activeIndex] ?? null;
  const hasPrev = activeIndex > 0;
  const hasNext = activeIndex < playableTracks.length - 1;

  useEffect(() => {
    setActiveIndex(0);
    setIsPlaying(false);
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      audio.removeAttribute("src");
      audio.load();
    }
  }, [tracks]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!active?.url) {
      audio.pause();
      audio.removeAttribute("src");
      audio.load();
      return;
    }

    const nextSrc = new URL(active.url, window.location.origin).href;
    if (audio.src !== nextSrc) {
      audio.src = active.url;
    }

    if (isPlaying) {
      void audio.play().catch(() => setIsPlaying(false));
    } else {
      audio.pause();
    }
  }, [active?.url, activeIndex, isPlaying]);

  const togglePlay = () => {
    if (!active?.url) return;
    setIsPlaying((current) => !current);
  };

  const goPrev = () => {
    if (!hasPrev) return;
    setActiveIndex((index) => index - 1);
    setIsPlaying(true);
  };

  const goNext = () => {
    if (!hasNext) return;
    setActiveIndex((index) => index + 1);
    setIsPlaying(true);
  };

  if (tracks.length === 0) {
    return (
      <div className="border-b border-[#EEF2ED] pb-5">
        <p className="text-xs font-medium uppercase tracking-[0.1em] text-[#98A2B3]">
          Tracks
        </p>
        <p className="mt-2 text-sm text-[#98A2B3]">No tracks on this release.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 border-b border-[#EEF2ED] pb-5">
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs font-medium uppercase tracking-[0.1em] text-[#98A2B3]">
          Listen
        </p>
        <span className="text-xs text-[#98A2B3]">
          {activeIndex + 1} / {playableTracks.length}
        </span>
      </div>

      <div className="flex items-center gap-3 rounded-2xl border border-[#E9EDF5] bg-[#F9FAFB] px-4 py-3">
        <button
          type="button"
          onClick={goPrev}
          disabled={!hasPrev}
          aria-label="Previous track"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-[#E5E7EB] bg-white text-[#344054] transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        <button
          type="button"
          onClick={togglePlay}
          disabled={!active?.url}
          aria-label={isPlaying ? "Pause" : "Play"}
          className="flex h-11 w-11 items-center justify-center rounded-full bg-[#101828] text-white transition hover:bg-[#16A34A] disabled:cursor-not-allowed disabled:opacity-40"
        >
          {isPlaying ? (
            <Pause className="h-4 w-4" fill="currentColor" />
          ) : (
            <Play className="ml-0.5 h-4 w-4" fill="currentColor" />
          )}
        </button>

        <button
          type="button"
          onClick={goNext}
          disabled={!hasNext}
          aria-label="Next track"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-[#E5E7EB] bg-white text-[#344054] transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronRight className="h-4 w-4" />
        </button>

        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-[#101828]">
            {active?.track.name || "Untitled track"}
          </p>
          <p className="truncate text-xs text-[#98A2B3]">
            {active?.url
              ? active.track.subtitle || `Track ${active.track.trackNo}`
              : "No audio uploaded for this track"}
          </p>
        </div>
      </div>

      <ul className="space-y-1">
        {playableTracks.map(({ track, url }, index) => {
          const isActive = index === activeIndex;

          return (
            <li key={track.id}>
              <button
                type="button"
                onClick={() => {
                  setActiveIndex(index);
                  if (url) setIsPlaying(true);
                }}
                className={[
                  "flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left transition",
                  isActive ? "bg-[#E7FCE4]" : "hover:bg-[#F9FAFB]",
                ].join(" ")}
              >
                <span className="w-5 text-xs text-[#98A2B3]">
                  {track.trackNo ?? index + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-[#101828]">
                    {track.name || "Untitled track"}
                  </p>
                </div>
                {!url ? (
                  <span className="text-[11px] text-[#98A2B3]">No audio</span>
                ) : isActive && isPlaying ? (
                  <Pause className="h-3.5 w-3.5 text-[#16A34A]" />
                ) : (
                  <Play className="h-3.5 w-3.5 text-[#98A2B3]" />
                )}
              </button>
            </li>
          );
        })}
      </ul>

      <audio
        ref={audioRef}
        onEnded={() => {
          if (hasNext) {
            setActiveIndex((index) => index + 1);
            setIsPlaying(true);
          } else {
            setIsPlaying(false);
          }
        }}
        hidden
      />
    </div>
  );
}
