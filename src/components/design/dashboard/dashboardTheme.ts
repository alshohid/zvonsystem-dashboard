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

export const UPCOMING_STATUS_CLASSES: Record<string, string> = {
  Scheduled: "border-[#00BCFF4D] bg-[#00BCFF0D] text-[#00BCFF]",
  "In Review": "border-[#F9D59A] bg-[#FFF7E8] text-[#D97706]",
};
