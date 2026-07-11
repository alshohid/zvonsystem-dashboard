export type StatTileId =
  | "total-users"
  | "total-releases"
  | "releases-in-queue"
  | "flagged-content";

export type StatTile = {
  id: StatTileId;
  label: string;
  value: string;
  trend: {
    direction: "up" | "down";
    label: string;
  };
};

export type PendingRelease = {
  id: string;
  title: string;
  artist: string;
  type: "Single" | "EP" | "Album";
  genre: string;
  trackCount: number;
  submittedDate: string;
  coverImage: string;
  artistAvatar: string;
  artistNote: string;
  checklist: string[];
};

export type ReviewOutcome = "approved" | "changes-requested" | "rejected";

export type ReviewedItem = {
  id: string;
  title: string;
  artist: string;
  type: string;
  outcome: ReviewOutcome;
  reviewedAt: string;
};

export type SuperAdminUser = {
  id: string;
  name: string;
  email: string;
  releaseCount: number;
  joinedDate: string;
  status: "active" | "suspended";
};

export const MOCK_STAT_TILES: StatTile[] = [
  {
    id: "total-users",
    label: "Total Users",
    value: "1,284",
    trend: { direction: "up", label: "+12 this week" },
  },
  {
    id: "total-releases",
    label: "Total Releases",
    value: "3,841",
    trend: { direction: "up", label: "+47 this week" },
  },
  {
    id: "releases-in-queue",
    label: "Releases In Queue",
    value: "23",
    trend: { direction: "up", label: "-5 reviewed today" },
  },
  {
    id: "flagged-content",
    label: "Flagged Content",
    value: "4",
    trend: { direction: "down", label: "+2 since yesterday" },
  },
];

export const MOCK_PENDING_RELEASES: PendingRelease[] = [
  {
    id: "afterglow-deluxe",
    title: "Afterglow (Deluxe)",
    artist: "Kiran Dey",
    type: "Album",
    genre: "Electronic",
    trackCount: 16,
    submittedDate: "Dec 10, 2024",
    coverImage: "/images/card_5.jpg",
    artistAvatar: "/images/user/user_01.png",
    artistNote: "Deluxe edition of the Oct release. 4 new bonus tracks added.",
    checklist: [
      "Cover art (3000x3000)",
      "Audio files (WAV/FLAC)",
      "ISRC codes assigned",
      "Release date set",
      "Metadata complete",
      "Platform selection",
    ],
  },
  {
    id: "ultraviolet",
    title: "Ultraviolet",
    artist: "ZARA LYRA",
    type: "Single",
    genre: "Pop",
    trackCount: 1,
    submittedDate: "Dec 9, 2024",
    coverImage: "/images/card_1.jpg",
    artistAvatar: "/images/user/user_02.png",
    artistNote: "Lead single ahead of the upcoming EP.",
    checklist: [
      "Cover art (3000x3000)",
      "Audio files (WAV/FLAC)",
      "ISRC codes assigned",
      "Release date set",
      "Metadata complete",
      "Platform selection",
    ],
  },
  {
    id: "basement-sessions-vol-2",
    title: "Basement Sessions Vol. 2",
    artist: "Marcus Webb",
    type: "EP",
    genre: "Hip-Hop",
    trackCount: 5,
    submittedDate: "Dec 8, 2024",
    coverImage: "/images/card_3.jpg",
    artistAvatar: "/images/user/user_03.png",
    artistNote: "Follow-up to the first Basement Sessions release.",
    checklist: [
      "Cover art (3000x3000)",
      "Audio files (WAV/FLAC)",
      "ISRC codes assigned",
      "Release date set",
      "Metadata complete",
      "Platform selection",
    ],
  },
  {
    id: "between-the-lines",
    title: "Between the Lines",
    artist: "Priya Nair",
    type: "Album",
    genre: "R&B",
    trackCount: 11,
    submittedDate: "Dec 7, 2024",
    coverImage: "/images/card_4.jpg",
    artistAvatar: "/images/user/user_04.png",
    artistNote: "Full-length debut album, three years in the making.",
    checklist: [
      "Cover art (3000x3000)",
      "Audio files (WAV/FLAC)",
      "ISRC codes assigned",
      "Release date set",
      "Metadata complete",
      "Platform selection",
    ],
  },
];

export const MOCK_REVIEWED_TODAY: ReviewedItem[] = [
  {
    id: "debut-single",
    title: "Debut Single",
    artist: "Leo Fontaine",
    type: "Single",
    outcome: "approved",
    reviewedAt: "2h ago",
  },
  {
    id: "ghost-frequency",
    title: "Ghost Frequency",
    artist: "Kiran Dey",
    type: "Single",
    outcome: "changes-requested",
    reviewedAt: "4h ago",
  },
  {
    id: "midnight-call",
    title: "Midnight Call",
    artist: "ZARA LYRA",
    type: "Single",
    outcome: "rejected",
    reviewedAt: "6h ago",
  },
];

export const MOCK_USERS: SuperAdminUser[] = [
  {
    id: "kiran-dey",
    name: "Kiran Dey",
    email: "kiran@discovod.com",
    releaseCount: 18,
    joinedDate: "Jan 2023",
    status: "active",
  },
  {
    id: "zara-lyra",
    name: "ZARA LYRA",
    email: "zara@email.com",
    releaseCount: 12,
    joinedDate: "Mar 2023",
    status: "active",
  },
  {
    id: "marcus-webb",
    name: "Marcus Webb",
    email: "marcus@email.com",
    releaseCount: 4,
    joinedDate: "Aug 2024",
    status: "active",
  },
  {
    id: "priya-nair",
    name: "Priya Nair",
    email: "priya@email.com",
    releaseCount: 27,
    joinedDate: "Nov 2022",
    status: "suspended",
  },
  {
    id: "leo-fontaine",
    name: "Leo Fontaine",
    email: "leo@email.com",
    releaseCount: 1,
    joinedDate: "Dec 2024",
    status: "active",
  },
];
