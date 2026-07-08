"use client";

import { useGetDashboardOverviewQuery } from "@/src/redux/features/dashboard/dashboardOverviewApi";
import {
  DashboardOverviewError,
  DashboardOverviewSkeleton,
  GreetingHeader,
  LatestAlbumCard,
  PlatformBreakdownCard,
  RecentActivityCard,
  StreamingPerformanceChart,
  SummaryStatsGrid,
  TopTracksCard,
  UpcomingReleasesCard,
} from "@/src/components/design/dashboard";

export default function DesignDashboard() {
  const { data, isLoading, isFetching, isError, refetch } =
    useGetDashboardOverviewQuery();

  if (isLoading || (isFetching && !data)) {
    return <DashboardOverviewSkeleton />;
  }

  if (isError || !data) {
    return <DashboardOverviewError onRetry={refetch} />;
  }

  const overview = data.data;


  return (
    <div className="space-y-6">
      <GreetingHeader ownerName={overview.ownerName} />

      <SummaryStatsGrid stats={overview.summaryStats} />

      <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <StreamingPerformanceChart data={overview.streamingPerformance} />
        <PlatformBreakdownCard
          shares={overview.platformShares}
          totalStreams={overview.totalPlatformStreams}
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <TopTracksCard tracks={overview.topTracks} />

        <div className="flex min-w-0 flex-col gap-6">
          <LatestAlbumCard album={overview.albumSpotlight} />
          <RecentActivityCard items={overview.recentActivity} />
        </div>
      </div>

      <UpcomingReleasesCard releases={overview.upcomingReleases} />
    </div>
  );
}
