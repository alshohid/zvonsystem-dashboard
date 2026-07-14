import {
  PLAN_DISTRIBUTION_DATA,
  REVENUE_GROWTH_DATA,
  REVENUE_STATS,
  TOP_ARTISTS_BY_REVENUE,
  USER_GROWTH_DATA,
} from "./mockRevenueAnalyticsData";
import PlanDistributionChart from "./PlanDistributionChart";
import RevenueGrowthChart from "./RevenueGrowthChart";
import RevenueStatsGrid from "./RevenueStatsGrid";
import TopArtistsByRevenueTable from "./TopArtistsByRevenueTable";
import UserGrowthChart from "./UserGrowthChart";

export default function RevenueAnalyticsContainer() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#98A2B3]">Admin</p>
        <h1 className="mt-1 text-2xl font-semibold text-[#101828]">Revenue Analytics</h1>
      </div>

      <RevenueStatsGrid stats={REVENUE_STATS} />

      <RevenueGrowthChart data={REVENUE_GROWTH_DATA} />

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <UserGrowthChart data={USER_GROWTH_DATA} />
        <PlanDistributionChart data={PLAN_DISTRIBUTION_DATA} />
      </div>

      <TopArtistsByRevenueTable artists={TOP_ARTISTS_BY_REVENUE} />
    </div>
  );
}
