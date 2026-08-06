"use client";

import { AlertTriangle, RefreshCw } from "lucide-react";
import { useGetRevenueAnalyticsQuery } from "@/src/redux/features/revenue/revenueAnalyticsApi";
import { mapRevenueAnalytics } from "@/src/types/revenueAnalyticsTypes";
import PlanDistributionChart from "./PlanDistributionChart";
import RevenueAnalyticsSkeleton from "./RevenueAnalyticsSkeleton";
import RevenueGrowthChart from "./RevenueGrowthChart";
import RevenueStatsGrid from "./RevenueStatsGrid";
import TopArtistsByRevenueTable from "./TopArtistsByRevenueTable";
import UserGrowthChart from "./UserGrowthChart";

export default function RevenueAnalyticsContainer() {
  const { data, isLoading, isFetching, isError, refetch } =
    useGetRevenueAnalyticsQuery();

  if (isLoading || (isFetching && !data)) {
    return <RevenueAnalyticsSkeleton />;
  }

  if (isError || !data?.data) {
    return (
      <div className="space-y-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#98A2B3]">
            Admin
          </p>
          <h1 className="mt-1 text-2xl font-semibold text-[#101828]">
            Revenue Analytics
          </h1>
        </div>

        <div className="flex flex-col items-center justify-center gap-3 rounded-[24px] border border-[#F2B7B7] bg-[#FFF1F1] p-10 text-center">
          <AlertTriangle size={28} className="text-[#DC2626]" />
          <p className="text-sm font-medium text-[#101828]">
            Couldn&apos;t load revenue analytics.
          </p>
          <button
            type="button"
            onClick={() => refetch()}
            className="mt-1 inline-flex items-center gap-2 rounded-xl border border-[#D7DDF2] bg-white px-4 py-2 text-sm font-semibold text-[#2E3A83] transition hover:bg-[#F7F8FE]"
          >
            <RefreshCw size={14} />
            Retry
          </button>
        </div>
      </div>
    );
  }

  const view = mapRevenueAnalytics(data.data);

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#98A2B3]">
          Admin
        </p>
        <h1 className="mt-1 text-2xl font-semibold text-[#101828]">
          Revenue Analytics
        </h1>
      </div>

      <RevenueStatsGrid stats={view.stats} />

      <RevenueGrowthChart data={view.revenueGrowth} />

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <UserGrowthChart data={view.userGrowth} />
        <PlanDistributionChart data={view.planDistribution} />
      </div>

      <TopArtistsByRevenueTable artists={view.topArtists} />
    </div>
  );
}
