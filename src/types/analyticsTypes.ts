import type { IBaseResponse } from "@/src/types/dashboardTypes";

/**
 * Analytics overview (`GET /revenue/analytics/artist`) DTOs.
 *
 * These mirror the actual API response exactly:
 *
 * ```json
 * {
 *   "success": true,
 *   "data": {
 *     "stats": { "totalReleases": 24, "totalReleasesChange": 0, ... },
 *     "platformTrend": [ { "platform": "Spotify", "count": 15 }, ... ],
 *     "topCountries": [ { "country": "KZ", "count": 2 }, ... ],
 *     "trackPerformance": [ { "name", "releaseName", "change", "streams", "duration" }, ... ]
 *   }
 * }
 * ```
 */

/** The release status breakdown inside `stats.statusCounts`. */
export interface IAnalyticsStatusCounts {
  draft: number;
  inModeration: number;
  approved: number;
  live: number;
  scheduled: number;
  rejected: number;
}

/** The `stats` section – release-centric overview metrics. */
export interface IAnalyticsStats {
  totalReleases: number;
  totalReleasesChange: number;
  inProgress: number;
  totalPublished: number;
  activeReleases: number;
  todayPublished: number;
  weekPublished: number;
  monthPublished: number;
  statusCounts: IAnalyticsStatusCounts;
}

/** A single entry in the `platformTrend` list. */
export interface IPlatformTrendItem {
  platform: string;
  count: number;
}

/** A single entry in the `topCountries` list. */
export interface ITopCountry {
  country: string;
  count: number;
}

/** A single entry in the `trackPerformance` list. */
export interface ITrackPerformanceItem {
  name: string;
  releaseName: string;
  change: string;
  streams: string;
  duration: string;
}

export interface IAnalyticsOverviewData {
  stats: IAnalyticsStats;
  platformTrend: IPlatformTrendItem[];
  topCountries: ITopCountry[];
  trackPerformance: ITrackPerformanceItem[];
}

export interface IAnalyticsOverviewResponse extends IBaseResponse {
  data: IAnalyticsOverviewData;
}

