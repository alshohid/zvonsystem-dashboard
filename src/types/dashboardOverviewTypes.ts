import type { IBaseResponse } from "@/src/types/dashboardTypes";

export type TrendDirection = "up" | "down";

export interface ITrend {
  direction: TrendDirection;
  label: string;
}

export type SummaryStatId =
  | "total-streams"
  | "in-progress"
  | "total-published"
  | "active-releases";

export interface ISummaryStat {
  id: SummaryStatId;
  title: string;
  value: string;
  trend: ITrend;
}

export interface IStreamingPerformancePoint {
  month: string;
  streams: number;
}

export interface IPlatformShare {
  id: string;
  platform: string;
  streams: number;
  colorToken: "primary" | "danger" | "info";
}

export type TrackTrendDirection = TrendDirection;

export interface ITopTrack {
  id: string;
  rank: number;
  title: string;
  releaseTitle: string;
  streams: number;
  duration: string;
  trend: ITrend;
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

export type ActivityKind =
  | "milestone"
  | "audience"
  | "playlist"
  | "royalty"
  | "collaboration";

export interface IRecentActivityItem {
  id: string;
  kind: ActivityKind;
  message: string;
  occurredAgo: string;
}

export type UpcomingReleaseStatus = "Scheduled" | "In Review";

export interface IUpcomingRelease {
  id: string;
  title: string;
  releaseType: "Single" | "Album" | "EP";
  releaseDate: string;
  status: UpcomingReleaseStatus;
}

export interface IDashboardOverviewData {
  ownerName: string;
  summaryStats: ISummaryStat[];
  streamingPerformance: IStreamingPerformancePoint[];
  platformShares: IPlatformShare[];
  totalPlatformStreams: number;
  topTracks: ITopTrack[];
  albumSpotlight: IAlbumSpotlight;
  recentActivity: IRecentActivityItem[];
  upcomingReleases: IUpcomingRelease[];
}

export interface IDashboardOverviewResponse extends IBaseResponse {
  data: IDashboardOverviewData;
}
