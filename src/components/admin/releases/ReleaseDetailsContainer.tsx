'use client';

import { useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ArrowLeft, Disc3, Loader2, Pause, Play } from 'lucide-react';
import { resolveMediaUrl } from '@/src/lib/env';
import { getErrorMessage } from '@/src/lib/getErrorMessage';
import {
  useGetAllReleasesQuery,
  useGetReleaseByIdQuery,
} from '@/src/redux/features/releases/releasesApi';
import type { ApiRelease, ApiTrack } from '@/src/types/releaseTypes';
import ReleaseStatusBadge from './ReleaseStatusBadge';
import {
  getCountryLabel,
  getGenreLabel,
  getPersonRoleLabel,
  getReleaseTypeLabel,
  getTrackVersionLabel,
} from './releaseFormOptions';
import Image from 'next/image';

const ALL_RELEASES_PAGE_SIZE = 12;

const formatDate = (value: string | null) => {
  if (!value) return '—';
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? '—'
    : date.toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      });
};

const formatMonthYear = (value: string | null) => {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? null
    : date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
};

type ReleaseDetailsContainerProps = {
  releaseId: string;
  backPath?: string;
};

export default function ReleaseDetailsContainer({
  releaseId,
  backPath = '/admin/dashboard/releases',
}: ReleaseDetailsContainerProps) {
  const searchParams = useSearchParams();
  const fromAllReleases = searchParams.get('from') === 'all';

  // `GET /releases/:id` only serves the signed-in artist's own releases, so a
  // release opened from All Releases is read back out of the list query.
  const listQuery = useGetAllReleasesQuery(
    {
      page: Math.max(Number(searchParams.get('page')) || 1, 1),
      limit: ALL_RELEASES_PAGE_SIZE,
      search: searchParams.get('search') || undefined,
    },
    { skip: !fromAllReleases },
  );

  const releaseFromList = listQuery.data?.data.find(
    item => item.id === releaseId,
  );

  const shouldFetchOwned =
    !fromAllReleases || (listQuery.isSuccess && !releaseFromList);

  const ownedQuery = useGetReleaseByIdQuery(releaseId, {
    skip: !shouldFetchOwned,
  });

  const release = releaseFromList ?? ownedQuery.data?.data;
  const isLoading =
    (fromAllReleases && listQuery.isLoading) ||
    (shouldFetchOwned && ownedQuery.isLoading);
  const error = ownedQuery.error ?? listQuery.error;

  const backLink = (
    <Link
      href={backPath}
      className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#98A2B3] transition hover:text-[#101828]"
    >
      <ArrowLeft className="h-4 w-4" />
      Releases
    </Link>
  );

  if (isLoading) {
    return (
      <div className="space-y-6">
        {backLink}
        <div className="flex items-center justify-center gap-2 rounded-2xl border border-[#E9EDF5] bg-white py-20 text-sm text-[#667085]">
          <Loader2 className="h-4 w-4 animate-spin" />
          Loading release…
        </div>
      </div>
    );
  }

  if (!release) {
    return (
      <div className="space-y-6">
        {backLink}
        <div className="rounded-2xl border border-[#FECDD3] bg-[#FEF2F2] py-16 text-center">
          <p className="text-sm font-medium text-[#B42318]">
            {getErrorMessage(error, 'This release could not be found.')}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {backLink}
      <ReleaseHero release={release} />

      {release.moderator_message ? (
        <div className="rounded-2xl border border-[#FDE68A] bg-[#FFFBEB] px-5 py-4">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#B45309]">
            Moderator note
          </p>
          <p className="mt-1 text-sm text-[#92400E]">
            {release.moderator_message}
          </p>
        </div>
      ) : null}

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <ReleaseDetailsCard release={release} />
        <DistributionCard release={release} />
      </div>

      <TracksCard tracks={release.tracks ?? []} />
    </div>
  );
}

function ReleaseHero({ release }: { release: ApiRelease }) {
  const coverUrl = resolveMediaUrl(release?.cover_url?.path);
  const trackCount = release.tracks?.length ?? 0;
  const releasedOn = formatMonthYear(release.release_date);

  const artists = (release.persons ?? [])
    .filter(person => person.role === 'MAIN_ARTIST')
    .map(person => person.name)
    .filter(Boolean);
  const artistLine =
    artists.length > 0
      ? artists.join(', ')
      : (release?.persons?.[0]?.name ?? release?.label_name);

  const stats = [
    `${trackCount} track${trackCount === 1 ? '' : 's'}`,
    getGenreLabel(release.genre),
    release.label_name,
    releasedOn ? `Released ${releasedOn}` : null,
  ].filter(Boolean) as string[];

  return (
    <div className="flex flex-col gap-6 sm:flex-row">
      {coverUrl ? (
        <Image
          src={coverUrl}
          alt={release.name ?? 'Release cover'}
          width={192}
          height={192}
          unoptimized
          className="h-48 w-48 shrink-0 rounded-xl object-cover"
        />
      ) : (
        <div className="flex h-48 w-48 shrink-0 items-center justify-center rounded-xl bg-[linear-gradient(135deg,#4c1d95_0%,#7c3aed_45%,#1e1b4b_100%)]">
          <Disc3 className="h-12 w-12 text-white/70" strokeWidth={1.5} />
        </div>
      )}

      <div className="flex flex-col justify-center gap-2">
        <div className="flex flex-wrap items-center gap-2 text-sm text-[#667085]">
          <span>{getReleaseTypeLabel(release.type) || 'Release'}</span>
          <ReleaseStatusBadge status={release.status} />
        </div>

        <h1 className="text-3xl font-semibold text-[#101828]">
          {release.name || 'Untitled release'}
        </h1>

        {release.subtitle ? (
          <p className="text-sm text-[#667085]">{release.subtitle}</p>
        ) : null}

        {artistLine ? (
          <p className="text-lg text-[#475467]">
            <span className="text-[#98A2B3]">By </span>
            {artistLine}
          </p>
        ) : null}

        <div className="mt-2 flex flex-wrap gap-x-8 gap-y-2 text-sm text-[#667085]">
          {stats.map(stat => (
            <span key={stat}>{stat}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-6 border-b border-[#F2F4F7] py-2.5 last:border-b-0">
      <span className="text-sm text-[#98A2B3]">{label}</span>
      <span className="max-w-[60%] text-right text-sm font-medium text-[#101828]">
        {value}
      </span>
    </div>
  );
}

function Card({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-[#E9EDF5] bg-white">
      <header className="border-b border-[#E9EDF5] px-5 py-4">
        <h2 className="text-sm font-semibold text-[#101828]">{title}</h2>
      </header>
      <div className="px-5 py-3">{children}</div>
    </section>
  );
}

function ReleaseDetailsCard({ release }: { release: ApiRelease }) {
  const credits = (release.persons ?? [])
    .map(person =>
      [person.name, getPersonRoleLabel(person.role)]
        .filter(Boolean)
        .join(' — '),
    )
    .filter(Boolean);

  return (
    <Card title="Release details">
      <InfoRow label="Type" value={getReleaseTypeLabel(release.type) || '—'} />
      <InfoRow label="Genre" value={getGenreLabel(release.genre) || '—'} />
      <InfoRow label="Label" value={release.label_name || '—'} />
      <InfoRow label="UPC" value={release.upc || '—'} />
      <InfoRow label="Release date" value={formatDate(release.release_date)} />
      {release.is_previously_released ? (
        <InfoRow
          label="Originally released"
          value={formatDate(release.original_release_date)}
        />
      ) : null}
      <InfoRow
        label="Credits"
        value={credits.length > 0 ? credits.join(', ') : '—'}
      />
    </Card>
  );
}

function DistributionCard({ release }: { release: ApiRelease }) {
  const territoryValue = useMemo(() => {
    if (release.territory_scope === 'ALL') return 'All countries';
    if (release.territory_scope === 'CIS') return 'CIS countries';

    const countries = release.selected_countries ?? [];
    if (countries.length === 0) return '—';
    if (countries.length > 6) {
      return `${countries.slice(0, 6).map(getCountryLabel).join(', ')} +${countries.length - 6} more`;
    }
    return countries.map(getCountryLabel).join(', ');
  }, [release.territory_scope, release.selected_countries]);

  const platforms = release.all_ad_platforms
    ? 'All ad platforms'
    : release.selected_platforms?.length
      ? `${release.selected_platforms.length} selected`
      : '—';

  const links = [
    { label: 'Spotify', url: release.spotify },
    { label: 'Apple Music', url: release.apple_music },
    { label: 'Yandex Music', url: release.yandex_music },
    { label: 'VK Music', url: release.vk_music },
    ...(release.sound_cloud ?? []).map(url => ({ label: 'SoundCloud', url })),
  ].filter(link => link.url && /^https?:\/\//i.test(link.url));

  return (
    <Card title="Distribution">
      <InfoRow label="Platforms" value={platforms} />
      <InfoRow label="Territories" value={territoryValue} />
      {release.selected_platforms?.length && !release.all_ad_platforms ? (
        <div className="border-b border-[#F2F4F7] py-3 last:border-b-0">
          <p className="mb-2 text-sm text-[#98A2B3]">Stores</p>
          <div className="flex flex-wrap gap-1.5">
            {release.selected_platforms.map(platform => (
              <span
                key={platform}
                className="rounded-md bg-[#F2F4F7] px-2 py-0.5 text-xs text-[#475467]"
              >
                {platform}
              </span>
            ))}
          </div>
        </div>
      ) : null}
      {links.length > 0 ? (
        <div className="py-3">
          <p className="mb-2 text-sm text-[#98A2B3]">Artist profiles</p>
          <div className="flex flex-wrap gap-3">
            {links.map(link => (
              <a
                key={`${link.label}-${link.url}`}
                href={link.url as string}
                target="_blank"
                rel="noreferrer"
                className="text-sm font-medium text-[#16A34A] hover:underline"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      ) : null}
    </Card>
  );
}

function TracksCard({ tracks }: { tracks: ApiTrack[] }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playingTrackId, setPlayingTrackId] = useState<string | null>(null);

  const sortedTracks = useMemo(
    () => [...tracks].sort((a, b) => (a.trackNo ?? 0) - (b.trackNo ?? 0)),
    [tracks],
  );

  const togglePlay = (track: ApiTrack, url: string) => {
    const audio = audioRef.current;
    if (!audio) return;

    if (playingTrackId === track.id) {
      audio.pause();
      setPlayingTrackId(null);
      return;
    }

    audio.src = url;
    void audio.play();
    setPlayingTrackId(track.id);
  };

  return (
    <section className="rounded-2xl border border-[#E9EDF5] bg-white">
      <header className="flex items-center justify-between border-b border-[#E9EDF5] px-5 py-4">
        <h2 className="text-sm font-semibold text-[#101828]">Tracks</h2>
        <span className="text-xs text-[#98A2B3]">
          {sortedTracks.length} total
        </span>
      </header>

      {sortedTracks.length === 0 ? (
        <p className="px-5 py-10 text-center text-sm text-[#98A2B3]">
          No tracks have been added to this release.
        </p>
      ) : (
        <ul>
          {sortedTracks.map((track, index) => {
            const audioUrl = resolveMediaUrl(track.audioUrl?.path);
            const isPlaying = playingTrackId === track.id;

            return (
              <li
                key={track.id}
                className="flex items-center gap-4 border-b border-[#F2F4F7] px-5 py-3 last:border-b-0 hover:bg-[#FAFBFC]"
              >
                <span className="w-5 shrink-0 text-xs text-[#98A2B3]">
                  {track.trackNo ?? index + 1}
                </span>

                {audioUrl ? (
                  <button
                    type="button"
                    onClick={() => togglePlay(track, audioUrl)}
                    aria-label={isPlaying ? 'Pause track' : 'Play track'}
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#101828] text-white transition hover:bg-[#16A34A]"
                  >
                    {isPlaying ? (
                      <Pause className="h-3 w-3" fill="currentColor" />
                    ) : (
                      <Play className="ml-0.5 h-3 w-3" fill="currentColor" />
                    )}
                  </button>
                ) : (
                  <span className="h-7 w-7 shrink-0" />
                )}

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-[#101828]">
                    {track.name || 'Untitled track'}
                  </p>
                  <p className="truncate text-xs text-[#98A2B3]">
                    {[track.subtitle, track.language, track.isrc]
                      .filter(Boolean)
                      .join(' · ') || '—'}
                  </p>
                </div>

                <span className="shrink-0 text-xs text-[#98A2B3]">
                  {getTrackVersionLabel(track.version) || '—'}
                </span>
              </li>
            );
          })}
        </ul>
      )}

      <audio ref={audioRef} onEnded={() => setPlayingTrackId(null)} hidden />
    </section>
  );
}
