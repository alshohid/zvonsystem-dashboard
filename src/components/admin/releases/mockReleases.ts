export type ReleaseStatus = "live" | "scheduled" | "in-review";

export type ReleaseSummaryCard = {
  id: string;
  title: string;
  type: "Single" | "EP" | "Album";
  trackCount: number;
  status: ReleaseStatus;
  plays: string;
  coverGradient: string;
  cardImage: string;
};

export const RELEASE_STATUS_LABELS: Record<ReleaseStatus, string> = {
  live: "Live",
  scheduled: "Scheduled",
  "in-review": "In Review",
};

export const MOCK_RELEASES: ReleaseSummaryCard[] = [
  {
    id: "afterglow",
    title: "Afterglow",
    type: "Album",
    trackCount: 12,
    status: "live",
    plays: "6.1M",
    coverGradient:
      "linear-gradient(135deg, #4c1d95 0%, #7c3aed 45%, #1e1b4b 100%)",
    cardImage: "/images/card_6.png",
  },
  {
    id: "frequency",
    title: "Frequency",
    type: "Album",
    trackCount: 10,
    status: "live",
    plays: "4.3M",
    coverGradient:
      "linear-gradient(135deg, #78350f 0%, #b45309 45%, #1c1917 100%)",
    cardImage: "/images/card_2.jpg",
  },
  {
    id: "neon-mirage",
    title: "Neon Mirage",
    type: "Single",
    trackCount: 1,
    status: "live",
    plays: "4.2M",
    coverGradient:
      "linear-gradient(135deg, #0f172a 0%, #0891b2 55%, #22d3ee 100%)",
    cardImage: "/images/card_1.jpg",
  },
  {
    id: "ghost-frequency",
    title: "Ghost Frequency",
    type: "Single",
    trackCount: 1,
    status: "scheduled",
    plays: "4.2M",
    coverGradient:
      "linear-gradient(135deg, #0f172a 0%, #334155 55%, #64748b 100%)",
    cardImage: "/images/card_3.jpg",
  },
  {
    id: "lost-frequencies",
    title: "Lost Frequencies",
    type: "EP",
    trackCount: 5,
    status: "live",
    plays: "2.2M",
    coverGradient:
      "linear-gradient(135deg, #0f172a 0%, #7f1d1d 55%, #4c0519 100%)",
    cardImage: "/images/card_4.jpg",
  },
  {
    id: "afterglow-deluxe",
    title: "Afterglow (Deluxe)",
    type: "Album",
    trackCount: 16,
    status: "in-review",
    plays: "—",
    coverGradient:
      "linear-gradient(135deg, #ea580c 0%, #f97316 45%, #fb923c 100%)",
    cardImage: "/images/card_5.jpg",
  },
];
