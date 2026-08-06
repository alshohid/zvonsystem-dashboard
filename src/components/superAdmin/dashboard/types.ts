export type StatTileId =
  | "total-artists"
  | "total-releases"
  | "releases-in-queue"
  | "approved-today";

export type StatTile = {
  id: StatTileId;
  label: string;
  value: string;
  trend?: {
    direction: "up" | "down";
    label: string;
  };
};

export type ReviewOutcome = "approved" | "rejected";

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
  avatar: string | null;
  status: "active" | "suspended";
};

export const formatSubmittedDate = (value: string | null | undefined) => {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

export const formatRelativeTime = (value: string | null | undefined) => {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";

  const diffMs = Date.now() - date.getTime();
  const minutes = Math.round(diffMs / 60000);
  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.round(hours / 24);
  if (days < 7) return `${days}d ago`;
  return formatSubmittedDate(value);
};

export const formatReleaseType = (type: string | null | undefined) => {
  if (!type) return "Release";
  return type.charAt(0) + type.slice(1).toLowerCase();
};
