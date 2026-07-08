"use client";

import { useGetAnalyticsOverviewQuery } from "@/src/redux/features/analytics/analyticsOverviewApi";
import {
  AnalyticsError,
  AnalyticsPageHeader,
  AnalyticsSkeleton,
  AnalyticsSummaryGrid,
  StreamTrendChart,
  TopCountriesCard,
} from "@/src/components/design/analytics";
import { TopTracksCard } from "@/src/components/design/dashboard";

export default function AnalyticsContainer() {
  const { data, isLoading, isFetching, isError, refetch } =
    useGetAnalyticsOverviewQuery();

  if (isLoading || (isFetching && !data)) {
    return <AnalyticsSkeleton />;
  }

  if (isError || !data) {
    return <AnalyticsError onRetry={refetch} />;
  }

  const overview = data.data;

  return (
    <div className="space-y-6">
      <AnalyticsPageHeader />

      <AnalyticsSummaryGrid stats={overview.summaryStats} />

      <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <StreamTrendChart data={overview.streamTrend} />
        <TopCountriesCard countries={overview.topCountries} />
      </div>

      <TopTracksCard title="Track Performance" tracks={overview.trackPerformance} />
    </div>
  );
}
