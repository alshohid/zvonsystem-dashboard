'use client';

import Link from 'next/link';
import { Disc3 } from 'lucide-react';
import { resolveMediaUrl } from '@/src/lib/env';
import type { ApiRelease } from '@/src/types/releaseTypes';
import ReleaseStatusBadge from './ReleaseStatusBadge';
import { getReleaseTypeLabel } from './releaseFormOptions';

type ReleaseCardProps = {
  release: ApiRelease;
  href: string;
};

export default function ReleaseCard({ release, href }: ReleaseCardProps) {

  const coverUrl = resolveMediaUrl(release?.cover_url?.path);
  const trackCount = release.tracks?.length ?? 0;
  const mainArtist =
    release.persons?.find(person => person.role === 'MAIN_ARTIST')?.name ??
    release.persons?.[0]?.name ??
    null;

  return (
    <Link
      href={href}
      className="group block overflow-hidden rounded-2xl border border-[#E9EDF5] bg-white shadow-[0_1px_2px_rgba(16,24,40,0.04)] transition-shadow hover:shadow-[0_4px_16px_rgba(16,24,40,0.10)]"
    >
      {coverUrl ? (
        <div
          className="aspect-square w-full bg-cover bg-center"
          style={{ backgroundImage: `url(${coverUrl})` }}
        />
      ) : (
        <div className="flex aspect-square w-full items-center justify-center bg-[linear-gradient(135deg,#4c1d95_0%,#7c3aed_45%,#1e1b4b_100%)]">
          <Disc3 className="h-10 w-10 text-white/70" strokeWidth={1.5} />
        </div>
      )}

      <div className="space-y-2 p-2 md:p-4">
        <h3 className="truncate text-[15px] font-semibold text-[#101828] group-hover:text-[#16A34A]">
          {release.name || 'Untitled release'}
        </h3>
        <p className="truncate text-xs text-[#98A2B3]">
          {getReleaseTypeLabel(release.type) || 'Release'} · {trackCount} track
          {trackCount === 1 ? '' : 's'}
          {mainArtist ? ` · ${mainArtist}` : ''}
        </p>

        <div className="flex flex-wrap gap-2 items-center justify-between pt-1">
          <ReleaseStatusBadge status={release.status} />
          <span className="text-[0.67rem] md:text-xs text-[#98A2B3]">
            {release.genre ? release.genre.replace(/_/g, ' ') : '—'}
          </span>
        </div>
      </div>
    </Link>
  );
}
