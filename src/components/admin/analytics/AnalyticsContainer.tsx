"use client";

import { useGetAnalyticsOverviewQuery } from "@/src/redux/features/analytics/analyticsOverviewApi";
import {
    AnalyticsError,
    AnalyticsPageHeader,
    AnalyticsSkeleton,
    AnalyticsSummaryGrid,
    PlatformTrendChart,
    TopCountriesCard,
    TrackPerformanceCard,
} from "@/src/components/design/analytics";

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

            <AnalyticsSummaryGrid stats={overview.stats} />

            <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
                <PlatformTrendChart data={overview.platformTrend} />
                <TopCountriesCard countries={overview.topCountries} />
            </div>

            <TrackPerformanceCard
                title="Track Performance"
                tracks={overview.trackPerformance}
            />
        </div>
    );
}
