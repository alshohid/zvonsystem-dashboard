import type { PricingPlanId } from "@/src/components/superAdmin/pricingManagement/types";

export type RevenueStatId = "total-streams" | "total-revenue" | "active-subs" | "arpu";

export type RevenueStat = {
  id: RevenueStatId;
  label: string;
  value: string;
  trend: {
    direction: "up" | "down";
    label: string;
  };
};

export type RevenueGrowthPoint = {
  month: string;
  streams: number;
};

export type UserGrowthPoint = {
  month: string;
  users: number;
};

export type PlanDistributionSlice = {
  plan: PricingPlanId;
  value: number;
};

export type TopArtistByRevenue = {
  id: string;
  artistName: string;
  plan: PricingPlanId;
  releases: number;
  revenue: number;
};
