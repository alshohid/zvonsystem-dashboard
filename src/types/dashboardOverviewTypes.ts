import type { IBaseResponse } from "@/src/types/dashboardTypes";

export type TrendDirection = "up" | "down";

export interface ITrend {
  direction: TrendDirection;
  label: string;
}

export interface ITopTrack {
  id: string;
  rank: number;
  title: string;
  releaseTitle: string;
  streams: number;
  duration: string;
  trend: ITrend;
}

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

export interface IAlbumTrack {
  id: string;
  title: string;
  audioUrl: string;
}

export interface IAlbumSpotlight {
  id: string;
  title: string;
  trackCount: number;
  countryCount: number;
  coverImageUrl?: string;
  previewAudioUrl?: string;
  tracks?: IAlbumTrack[];
}

export interface IArtistDashboardDto {
  stats: IArtistStatsDto;
  releaseStatusChart: IReleaseStatusChartDto[];
  byPlatform: IPlatformReleaseDto[];
  topTracks: IArtistTopTrackDto[];
  recentActivity: IArtistActivityDto[];
  upcomingReleases: IArtistUpcomingReleaseDto[];
  albumSpotlight?: IAlbumSpotlight[];
}

export interface IArtistDashboardResponse extends IBaseResponse {
  role: string;
  data: IArtistDashboardDto;
}

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
  albumSpotlight?: IAlbumSpotlight[];
}
