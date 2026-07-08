import type { IBaseResponse } from "@/src/types/dashboardTypes";
import type { ITopTrack, ITrend } from "@/src/types/dashboardOverviewTypes";

export type AnalyticsStatId =
  | "total-streams"
  | "avg-daily-streams"
  | "save-rate"
  | "skip-rate";

export interface IAnalyticsSummaryStat {
  id: AnalyticsStatId;
  title: string;
  value: string;
  trend: ITrend;
}

export interface IStreamTrendPoint {
  month: string;
  streams: number;
}

export interface ITopCountry {
  id: string;
  country: string;
  streams: number;
}

export type ITrackPerformanceItem = ITopTrack;

export interface IAnalyticsOverviewData {
  summaryStats: IAnalyticsSummaryStat[];
  streamTrend: IStreamTrendPoint[];
  topCountries: ITopCountry[];
  trackPerformance: ITrackPerformanceItem[];
}

export interface IAnalyticsOverviewResponse extends IBaseResponse {
  data: IAnalyticsOverviewData;
}
