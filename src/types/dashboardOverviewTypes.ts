import type { IBaseResponse } from "@/src/types/dashboardTypes";

// ---------------------------------------------------------------------------
// Shared primitives (analytics workspace depends on these — do not remove).
// ---------------------------------------------------------------------------

export type TrendDirection = "up" | "down";

export interface ITrend {
  direction: TrendDirection;
  label: string;
}

/** Top-track entry used by the analytics workspace (streams + trend based). */
export interface ITopTrack {
  id: string;
  rank: number;
  title: string;
  releaseTitle: string;
  streams: number;
  duration: string;
  trend: ITrend;
}

// ---------------------------------------------------------------------------
// Transport (DTO) layer — mirrors the `/dashboard/artist` response exactly.
// These types describe what the API actually sends; they are mapped into the
// view-model layer below before the UI consumes them.
// ---------------------------------------------------------------------------

export type ReleaseStatusLabel =
  | "Draft"
  | "In Moderation"
  | "Approved"
  | "Live"
  | "Scheduled"
  | "Rejected";

export interface IArtistStatsDto {
  totalReleases: number;
  inProgress: number;
  totalPublished: number;
  activeReleases: number;
}

export interface IReleaseStatusChartDto {
  status: ReleaseStatusLabel;
  count: number;
}

export interface IPlatformReleaseDto {
  platform: string;
  releases: number;
}

export interface IArtistTopTrackDto {
  id: string;
  name: string;
  releaseName: string;
  duration: string;
  audioUrl: string;
  coverUrl: string;
  status: string;
  createdAt: string;
}

export type ArtistActivityType =
  | "release_status_update"
  | "system"
  | "payment_received"
  | "release_scheduled"
  | "moderation_feedback";

export interface IArtistActivityDto {
  id: string;
  title: string;
  description: string;
  timeAgo: string;
  createdAt: string;
  type: ArtistActivityType;
}

export type ArtistUpcomingReleaseType = "SINGLE" | "EP" | "ALBUM";

export interface IArtistUpcomingReleaseDto {
  id: string;
  name: string;
  subtitle: string;
  type: ArtistUpcomingReleaseType;
  genre: string;
  status: string;
  artistName: string;
  trackCount: number;
  submittedAt: string;
  releaseDate: string;
  coverUrl: string;
  artistNote: string | null;
  completionPercentage: number;
  isTermsAgreed: boolean;
  selectedPlatforms: string[];
  upc: string;
  labelName: string;
}

export interface IArtistDashboardDto {
  stats: IArtistStatsDto;
  releaseStatusChart: IReleaseStatusChartDto[];
  byPlatform: IPlatformReleaseDto[];
  topTracks: IArtistTopTrackDto[];
  recentActivity: IArtistActivityDto[];
  upcomingReleases: IArtistUpcomingReleaseDto[];
}

export interface IArtistDashboardResponse extends IBaseResponse {
  role: string;
  data: IArtistDashboardDto;
}

// ---------------------------------------------------------------------------
// View-model layer — the normalized shape the dashboard UI depends on.
// Produced by DashboardOverviewMapper.fromDto(...).
// ---------------------------------------------------------------------------

export type DashboardStatId =
  | "total-releases"
  | "in-progress"
  | "total-published"
  | "active-releases";

export interface IDashboardStat {
  id: DashboardStatId;
  title: string;
  value: number;
}

export interface IReleaseStatusChartPoint {
  status: ReleaseStatusLabel;
  count: number;
}

export type PlatformColorToken = "primary" | "info" | "danger";

export interface IPlatformShare {
  id: string;
  platform: string;
  releases: number;
  colorToken: PlatformColorToken;
}

export interface IArtistTopTrack {
  id: string;
  name: string;
  releaseName: string;
  duration: string;
  audioUrl: string;
  coverUrl: string;
}

export interface IArtistActivityItem {
  id: string;
  kind: ArtistActivityType;
  title: string;
  description: string;
  timeAgo: string;
}

export interface IArtistUpcomingRelease {
  id: string;
  name: string;
  subtitle: string;
  type: ArtistUpcomingReleaseType;
  genre: string;
  status: string;
  artistName: string;
  trackCount: number;
  releaseDate: string;
  coverUrl: string;
  completionPercentage: number;
  selectedPlatforms: string[];
  labelName: string;
}

export interface IArtistDashboardViewModel {
  stats: IDashboardStat[];
  releaseStatusChart: IReleaseStatusChartPoint[];
  platformShares: IPlatformShare[];
  totalReleases: number;
  topTracks: IArtistTopTrack[];
  recentActivity: IArtistActivityItem[];
  upcomingReleases: IArtistUpcomingRelease[];
}
