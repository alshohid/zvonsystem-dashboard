export const DASHBOARD_COLORS = {
  primary: "#2E3A83",
  primarySoft: "#CACEE2",
  line: "#D8E0FF",
  border: "#E7EBF7",
  muted: "#667085",
  heading: "#101828",
  success: "#16A34A",
  successSoft: "#ECFDF3",
  danger: "#DC2626",
  dangerSoft: "#FFF1F1",
  streamAccent: "#4CFC0F",
} as const;

export const PLATFORM_COLOR_MAP: Record<string, string> = {
  primary: DASHBOARD_COLORS.primary,
  danger: "#F04452",
  info: "#8FD3E8",
};

/** Colors used by the release-status donut chart, keyed by raw status label. */
export const RELEASE_STATUS_COLORS: Record<string, string> = {
  Draft: "#98A2B3",
  "In Moderation": "#F79009",
  Approved: "#2E90FA",
  Live: "#12B76A",
  Scheduled: "#00BCFF",
  Rejected: "#F04438",
};

/** Badge styles keyed by release status (title-case and snake/upper forms). */
export const UPCOMING_STATUS_CLASSES: Record<string, string> = {
  Draft: "border-[#98A2B34D] bg-[#98A2B30D] text-[#667085]",
  DRAFT: "border-[#98A2B34D] bg-[#98A2B30D] text-[#667085]",
  "In Moderation": "border-[#F9D59A] bg-[#FFF7E8] text-[#D97706]",
  IN_MODERATION: "border-[#F9D59A] bg-[#FFF7E8] text-[#D97706]",
  Approved: "border-[#2E90FA4D] bg-[#2E90FA0D] text-[#2E90FA]",
  APPROVED: "border-[#2E90FA4D] bg-[#2E90FA0D] text-[#2E90FA]",
  Live: "border-[#12B76A4D] bg-[#12B76A0D] text-[#12B76A]",
  LIVE: "border-[#12B76A4D] bg-[#12B76A0D] text-[#12B76A]",
  Scheduled: "border-[#00BCFF4D] bg-[#00BCFF0D] text-[#00BCFF]",
  SCHEDULED: "border-[#00BCFF4D] bg-[#00BCFF0D] text-[#00BCFF]",
  Rejected: "border-[#F044384D] bg-[#F044380D] text-[#F04438]",
  REJECTED: "border-[#F044384D] bg-[#F044380D] text-[#F04438]",
};
