export type DraftReleaseType = 'Single' | 'EP' | 'Album';

export type DraftRelease = {
  id: string;
  title: string;
  type: DraftReleaseType;
  lastEditedLabel: string;
  progress: number;
  missingFields: string[];
};

export const MOCK_DRAFT_RELEASES: DraftRelease[] = [
  {
    id: 'untitled-album-3',
    title: 'Untitled Album 3',
    type: 'Album',
    lastEditedLabel: 'Last edited 2h ago',
    progress: 60,
    missingFields: ['Track listing', 'ISRC codes'],
  },
  {
    id: 'midnight-protocol-remix',
    title: 'Midnight Protocol (Remix)',
    type: 'Single',
    lastEditedLabel: 'Last edited yesterday',
    progress: 85,
    missingFields: ['Cover art description'],
  },
  {
    id: 'collabs-ep',
    title: 'Collabs EP',
    type: 'EP',
    lastEditedLabel: 'Last edited 3 days ago',
    progress: 30,
    missingFields: ['Cover art', 'Track listing', 'Release Date', 'Credits'],
  },
];
