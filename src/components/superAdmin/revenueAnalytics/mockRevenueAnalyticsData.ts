import type {
  PlanDistributionSlice,
  RevenueGrowthPoint,
  RevenueStat,
  TopArtistByRevenue,
  UserGrowthPoint,
} from "./types";

export const REVENUE_STATS: RevenueStat[] = [
  {
    id: "total-streams",
    label: "Total Streams",
    value: "$101.86",
    trend: { direction: "up", label: "+12% vs last month" },
  },
  {
    id: "total-revenue",
    label: "Total Revenue",
    value: "$118.85",
    trend: { direction: "up", label: "+2% vs last month" },
  },
  {
    id: "active-subs",
    label: "Active Subs",
    value: "4",
    trend: { direction: "up", label: "+4% vs last month" },
  },
  {
    id: "arpu",
    label: "ARPU",
    value: "$25.46",
    trend: { direction: "down", label: "-2% vs last month" },
  },
];

export const REVENUE_GROWTH_DATA: RevenueGrowthPoint[] = [
  { month: "Jan", streams: 2100 },
  { month: "Feb", streams: 2600 },
  { month: "Mar", streams: 2900 },
  { month: "Apr", streams: 3400 },
  { month: "May", streams: 3200 },
  { month: "Jun", streams: 3900 },
  { month: "Jul", streams: 4500 },
  { month: "Aug", streams: 4800 },
  { month: "Sep", streams: 4600 },
  { month: "Oct", streams: 5900 },
  { month: "Nov", streams: 6900 },
];

export const USER_GROWTH_DATA: UserGrowthPoint[] = [
  { month: "Jul", users: 920 },
  { month: "Aug", users: 985 },
  { month: "Sep", users: 1040 },
  { month: "Oct", users: 1150 },
  { month: "Nov", users: 1225 },
  { month: "Dec", users: 1310 },
  { month: "Jan", users: 1405 },
];

export const PLAN_DISTRIBUTION_DATA: PlanDistributionSlice[] = [
  { plan: "free", value: 46 },
  { plan: "pro", value: 39 },
  { plan: "pay-per-release", value: 15 },
];

export const TOP_ARTISTS_BY_REVENUE: TopArtistByRevenue[] = [
  { id: "roberto-mangan", artistName: "Roberto Mangan", plan: "pro", releases: 18, revenue: 95.88 },
  { id: "zara-lyra", artistName: "Zara Lyra", plan: "pro", releases: 12, revenue: 55.88 },
  { id: "marcus-webb", artistName: "Marcus Webb", plan: "pro", releases: 27, revenue: 75.88 },
  { id: "priya-nair", artistName: "Priya Nair", plan: "free", releases: 2, revenue: 0 },
  { id: "leo-fontaine", artistName: "Leo Fontaine", plan: "pay-per-release", releases: 8, revenue: 65.88 },
];
