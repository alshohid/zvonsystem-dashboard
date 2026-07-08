import { DateRangeType } from "@/src/types/dispatcher/type";
import { TopRevenueCarrierItem } from "../TopRevenueCarriers";
import { RevenuePlanChartItem } from "../RevenuePlanChart";
import { RevenueTrendChartData } from "../RevenueTrendChart";

export const revenuePlanDataMap: Record<DateRangeType, RevenuePlanChartItem[]> =
  {
    "7d": [
      { label: "Basic", value: 35, color: "#ffa4a6" },
      { label: "Pro", value: 45, color: "#7eceff" },
      { label: "Enterprise", value: 20, color: "#f29eff" },
    ],
    "30d": [
      { label: "Basic", value: 43, color: "#ffa4a6" },
      { label: "Pro", value: 42, color: "#7eceff" },
      { label: "Enterprise", value: 15, color: "#f29eff" },
    ],
    "60d": [
      { label: "Basic", value: 40, color: "#ffa4a6" },
      { label: "Pro", value: 38, color: "#7eceff" },
      { label: "Enterprise", value: 22, color: "#f29eff" },
    ],
  };

export const revenueTrendDataMap: Record<DateRangeType, RevenueTrendChartData> = {
  "7d": {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    values: [12000, 18000, 15000, 22000, 21000, 26000, 28000],
  },
  "30d": {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    values: [45000, 52000, 48000, 61000, 56000, 68000],
  },
  "60d": {
    labels: [
      "Week 1",
      "Week 2",
      "Week 3",
      "Week 4",
      "Week 5",
      "Week 6",
      "Week 7",
      "Week 8",
    ],
    values: [22000, 26000, 24000, 30000, 34000, 32000, 36000, 39000],
  },
};

export const topRevenueCarriers: TopRevenueCarrierItem[] = [
  {
    id: "express-cargo-services-1",
    rank: "#1",
    name: "Express Cargo Services",
    plan: "Basic",
    amount: "$599",
    amountSuffix: "month",
    metricLabel: "89 loads",
  },
  {
    id: "global-dispatch-solutions",
    rank: "#2",
    name: "Global Dispatch Solutions",
    plan: "Pro",
    amount: "$590",
    amountSuffix: "month",
    metricLabel: "89 loads",
  },
  {
    id: "swift-freight-solutions",
    rank: "#3",
    name: "Swift Freight Solutions",
    plan: "Basic",
    amount: "$499",
    amountSuffix: "month",
    metricLabel: "89 loads",
  },
  {
    id: "metro-dispatch-services",
    rank: "#4",
    name: "Metro Dispatch Services",
    plan: "Enterprise",
    amount: "$456",
    amountSuffix: "month",
    metricLabel: "89 loads",
  },
  {
    id: "express-cargo-services-2",
    rank: "#5",
    name: "Express Cargo Services",
    plan: "Basic",
    amount: "$400",
    amountSuffix: "month",
    metricLabel: "89 loads",
  },
];
export const cardData = [
  {
    title: "Total Carriers",
    value: "32",
    supportingText: "Avg 5 new carriers/month",
  },
  {
    title: "Total Dispatchers",
    value: "28",
    supportingText: "Avg 4 active shifts/day",
  },
  {
    title: "Monthly Revenue",
    value: "$48,000",
    supportingText: "Avg $8000/month",
  },
];
export const performanceData = [
  {
    title: "My Total Revenue (6 months)",
    value: "$48,000",
    supportingText: "Avg $8000/month",
  },
  {
    title: "Total Loads",
    value: "8,00",
    supportingText: "21.0% from last month",
    isPositive: true,
  },
  {
    title: "Carrier Revenue",
    value: "$3,100",
    supportingText: "This month",
  },
];
