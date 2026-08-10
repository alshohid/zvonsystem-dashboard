import type { PricingPlanId } from "@/src/components/superAdmin/pricingManagement/types";
import type {
  PlanDistributionSlice,
  RevenueGrowthPoint,
  RevenueStat,
  TopArtistByRevenue,
  UserGrowthPoint,
} from "@/src/components/superAdmin/revenueAnalytics/types";

export type RevenueAnalyticsStats = {
  totalReleases: number;
  totalReleasesChange: number;
  totalRevenue: number;
  totalRevenueChange: number;
  activeSubs: number;
  activeSubsChange: number;
  arpu: number;
  arpuChange: number;
};

export type ApiRevenueGrowthPoint = {
  month: string;
  revenue: number;
};

export type ApiUserGrowthPoint = {
  month: string;
  users: number;
};

export type ApiPlanDistributionSlice = {
  plan: string;
  count: number;
  percentage: number;
};

export type ApiTopArtistByRevenue = {
  artistId: string;
  artistName: string;
  plan: string;
  releases: number;
  revenue: number;
};

export type RevenueAnalyticsData = {
  stats: RevenueAnalyticsStats;
  revenueGrowth: ApiRevenueGrowthPoint[];
  userGrowth: ApiUserGrowthPoint[];
  planDistribution: ApiPlanDistributionSlice[];
  topArtists: ApiTopArtistByRevenue[];
};

export type RevenueAnalyticsResponse = {
  success: boolean;
  data: RevenueAnalyticsData;
};

export type RevenueAnalyticsViewModel = {
  stats: RevenueStat[];
  revenueGrowth: RevenueGrowthPoint[];
  userGrowth: UserGrowthPoint[];
  planDistribution: PlanDistributionSlice[];
  topArtists: TopArtistByRevenue[];
};

const formatCurrency = (value: number) =>
  `${value.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

const formatChangeLabel = (change: number) => {
  const signed = `${change > 0 ? "+" : ""}${change}%`;
  return `${signed} vs last month`;
};

const toTrend = (change: number): RevenueStat["trend"] => ({
  direction: change < 0 ? "down" : "up",
  label: formatChangeLabel(change),
});

export const normalizePlanId = (plan: string): PricingPlanId => {
  const normalized = plan
    .trim()
    .toLowerCase()
    .replace(/[\s_]+/g, "-");

  if (normalized === "pro") return "pro";
  if (
    normalized === "pay-per-release" ||
    normalized === "payperrelease" ||
    normalized === "ppr"
  ) {
    return "pay-per-release";
  }

  return "free";
};

export function mapRevenueAnalytics(
  data: RevenueAnalyticsData,
): RevenueAnalyticsViewModel {
  const { stats } = data;

  return {
    stats: [
      {
        id: "total-releases",
        label: "Total Releases",
        value: formatCurrency(stats.totalReleases),
        trend: toTrend(stats.totalReleasesChange),
      },
      {
        id: "total-revenue",
        label: "Total Revenue",
        value: formatCurrency(stats.totalRevenue),
        trend: toTrend(stats.totalRevenueChange),
      },
      {
        id: "active-subs",
        label: "Active Subs",
        value: String(stats.activeSubs),
        trend: toTrend(stats.activeSubsChange),
      },
      {
        id: "arpu",
        label: "ARPU",
        value: formatCurrency(stats.arpu),
        trend: toTrend(stats.arpuChange),
      },
    ],
    revenueGrowth: data.revenueGrowth.map((point) => ({
      month: point.month,
      revenue: point.revenue,
    })),
    userGrowth: data.userGrowth,
    planDistribution: data.planDistribution.map((slice) => ({
      plan: normalizePlanId(slice.plan),
      value: slice.percentage,
    })),
    topArtists: data.topArtists.map((artist) => ({
      id: artist.artistId,
      artistName: artist.artistName,
      plan: normalizePlanId(artist.plan),
      releases: artist.releases,
      revenue: artist.revenue,
    })),
  };
}
