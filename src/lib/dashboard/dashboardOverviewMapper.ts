import type {
  DashboardStatId,
  IArtistActivityDto,
  IArtistActivityItem,
  IArtistDashboardDto,
  IArtistDashboardViewModel,
  IArtistStatsDto,
  IArtistTopTrack,
  IArtistTopTrackDto,
  IArtistUpcomingRelease,
  IArtistUpcomingReleaseDto,
  IDashboardStat,
  IPlatformReleaseDto,
  IPlatformShare,
  IReleaseStatusChartDto,
  IReleaseStatusChartPoint,
  PlatformColorToken,
} from "@/src/types/dashboardOverviewTypes";

/**
 * Mapping metadata for the four summary stat cards. Kept local to this class
 * (Single Responsibility: conversion concerns live only here) and ordered so
 * cards render in a stable, meaningful order.
 */
const STAT_META: Array<{
  key: keyof IArtistStatsDto;
  id: DashboardStatId;
  title: string;
}> = [
  { key: "totalReleases", id: "total-releases", title: "Total Releases" },
  { key: "inProgress", id: "in-progress", title: "In Progress" },
  { key: "totalPublished", id: "total-published", title: "Total Published" },
  { key: "activeReleases", id: "active-releases", title: "Active Releases" },
];

const PLATFORM_COLOR_CYCLE: PlatformColorToken[] = [
  "primary",
  "info",
  "danger",
];

/**
 * Converts the raw `/dashboard/artist` transport payload into the normalized
 * view-model the dashboard UI renders. Keeping this transformation behind a
 * single class means the component never depends on the wire format
 * (Dependency Inversion) and new sections can be added without editing
 * existing code (Open/Closed).
 */
export class DashboardOverviewMapper {
  private constructor() {
    // Static mapping utility — not meant to be instantiated.
  }

  static fromDto(dto: IArtistDashboardDto): IArtistDashboardViewModel {
    return {
      stats: this.mapStats(dto.stats),
      releaseStatusChart: this.mapReleaseStatusChart(dto.releaseStatusChart),
      platformShares: this.mapPlatformShares(dto.byPlatform),
      totalReleases: this.extractTotalReleases(dto.byPlatform),
      topTracks: this.mapTopTracks(dto.topTracks),
      recentActivity: this.mapActivity(dto.recentActivity),
      upcomingReleases: this.mapUpcomingReleases(dto.upcomingReleases),
    };
  }

  private static mapStats(stats: IArtistStatsDto): IDashboardStat[] {
    return STAT_META.map(({ key, id, title }) => ({
      id,
      title,
      value: stats[key],
    }));
  }

  private static mapReleaseStatusChart(
    items: IReleaseStatusChartDto[],
  ): IReleaseStatusChartPoint[] {
    return items.map(({ status, count }) => ({ status, count }));
  }

  private static mapPlatformShares(
    items: IPlatformReleaseDto[],
  ): IPlatformShare[] {
    return items
      .filter(({ platform }) => platform.toLowerCase() !== "total")
      .map(({ platform, releases }, index) => ({
        id: `platform-${index}`,
        platform,
        releases,
        colorToken:
          PLATFORM_COLOR_CYCLE[index % PLATFORM_COLOR_CYCLE.length],
      }));
  }

  private static extractTotalReleases(
    items: IPlatformReleaseDto[],
  ): number {
    const total = items.find(
      ({ platform }) => platform.toLowerCase() === "total",
    );
    return total?.releases ?? 0;
  }

  private static mapTopTracks(items: IArtistTopTrackDto[]): IArtistTopTrack[] {
    return items.map(({ id, name, releaseName, duration, audioUrl, coverUrl }) => ({
      id,
      name,
      releaseName,
      duration,
      audioUrl,
      coverUrl,
    }));
  }

  private static mapActivity(
    items: IArtistActivityDto[],
  ): IArtistActivityItem[] {
    return items.map(
      ({ id, type, title, description, timeAgo }) => ({
        id,
        kind: type,
        title,
        description,
        timeAgo,
      }),
    );
  }

  private static mapUpcomingReleases(
    items: IArtistUpcomingReleaseDto[],
  ): IArtistUpcomingRelease[] {
    return items.map(
      ({
        id,
        name,
        subtitle,
        type,
        genre,
        status,
        artistName,
        trackCount,
        releaseDate,
        coverUrl,
        completionPercentage,
        selectedPlatforms,
        labelName,
      }) => ({
        id,
        name,
        subtitle,
        type,
        genre,
        status,
        artistName,
        trackCount,
        releaseDate,
        coverUrl,
        completionPercentage,
        selectedPlatforms,
        labelName,
      }),
    );
  }
}
