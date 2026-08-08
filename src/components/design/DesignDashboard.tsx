"use client";

import { useGetDashboardOverviewQuery } from "@/src/redux/features/dashboard/dashboardOverviewApi";
import {
  DashboardOverviewError,
  DashboardOverviewSkeleton,
  GreetingHeader,
  LatestAlbumCard,
  PlatformBreakdownCard,
  RecentActivityCard,
  ReleaseStatusChart,
  SummaryStatsGrid,
  TopTracksCard,
  UpcomingReleasesCard,
} from "@/src/components/design/dashboard";

export default function ArtistDashboardDashboard() {
  const { data, isLoading, isFetching, isError, refetch } =
    useGetDashboardOverviewQuery();

  if (isLoading || (isFetching && !data)) {
    return <DashboardOverviewSkeleton />;
  }

  if (isError || !data) {
    return <DashboardOverviewError onRetry={refetch} />;
  }

  const overview = data;

  return (
    <div className="space-y-6">
      <GreetingHeader ownerName="Artist" />

      <SummaryStatsGrid stats={overview.stats} />

      <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <ReleaseStatusChart data={overview.releaseStatusChart} />
        <PlatformBreakdownCard
          shares={overview.platformShares}
          totalReleases={overview.totalReleases}
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <TopTracksCard tracks={overview.topTracks} />

        <div className="flex min-w-0 flex-col gap-6">
          {overview.albumSpotlight && (
            <LatestAlbumCard album={overview.albumSpotlight} />
          )}
          <RecentActivityCard items={overview.recentActivity} />
        </div>
      </div>

      <UpcomingReleasesCard releases={overview.upcomingReleases} />
    </div>
  );
}
