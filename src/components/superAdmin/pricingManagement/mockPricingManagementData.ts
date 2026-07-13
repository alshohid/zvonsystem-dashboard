import type { SelectOption } from "@/src/components/admin/releases/releaseFormOptions";
import type {
  ArtistSubscription,
  PaymentControlStat,
  PricingInvoice,
  PricingPlanOption,
} from "./types";

export const PAYMENT_CONTROL_STATS: PaymentControlStat[] = [
  { id: "monthly-revenue", label: "Monthly Revenue", value: "$106.86" },
  { id: "active-pro-subs", label: "Active Pro Subs", value: "2" },
  { id: "total-artists", label: "Total Artists", value: "6" },
  { id: "paid-invoices", label: "Paid Invoices", value: "$114.86" },
];

export const PRICING_PLAN_OPTIONS: PricingPlanOption[] = [
  { id: "free", name: "Free", priceLabel: "$0/mo" },
  { id: "pro", name: "Pro", priceLabel: "$7.99/mo" },
  { id: "pay-per-release", name: "Pay Per Release", priceLabel: "$2.99/release" },
];

export const SUBSCRIPTION_STATUS_OPTIONS: SelectOption[] = [
  { value: "active", label: "Active" },
  { value: "cancelled", label: "Cancelled" },
  { value: "suspended", label: "Suspended" },
  { value: "trial", label: "Trial" },
];

export const BILLING_CYCLE_OPTIONS: SelectOption[] = [
  { value: "monthly", label: "Monthly" },
  { value: "annual", label: "Annual" },
];

export const MOCK_SUBSCRIPTIONS: ArtistSubscription[] = [
  {
    id: "kiran-dey",
    artistName: "Kiran Dey",
    email: "kiran@discovod.com",
    plan: "pro",
    status: "active",
    amount: 7.99,
    billingCycle: "monthly",
    releasesUsed: 18,
    startDate: "2025-01-15",
  },
  {
    id: "zara-lyra",
    artistName: "Zara Lyra",
    email: "zara@discovod.com",
    plan: "pro",
    status: "active",
    amount: 95.88,
    billingCycle: "annual",
    releasesUsed: 12,
    startDate: "2024-03-10",
  },
  {
    id: "marcus-webb",
    artistName: "Marcus Webb",
    email: "webb@discovod.com",
    plan: "free",
    status: "active",
    amount: 0,
    billingCycle: "monthly",
    releasesUsed: 2,
    startDate: "2025-06-01",
  },
  {
    id: "priya-nair",
    artistName: "Priya Nair",
    email: "nair@discovod.com",
    plan: "pay-per-release",
    status: "active",
    amount: 2.99,
    billingCycle: "monthly",
    releasesUsed: 27,
    startDate: "2023-11-20",
  },
  {
    id: "leo-fontaine",
    artistName: "Leo Fontaine",
    email: "leo@discovod.com",
    plan: "free",
    status: "active",
    amount: 0,
    billingCycle: "monthly",
    releasesUsed: 3,
    startDate: "2025-12-04",
  },
  {
    id: "sarah-johnson",
    artistName: "Sarah Johnson",
    email: "sarah@discovod.com",
    plan: "pro",
    status: "active",
    amount: 7.99,
    billingCycle: "monthly",
    releasesUsed: 8,
    startDate: "2025-04-22",
  },
];

export const MOCK_INVOICES: PricingInvoice[] = [
  {
    id: "psip-2026-009",
    invoiceNumber: "PSIP-2026-009",
    artistName: "Kiran Dey",
    email: "kiran@discovod.com",
    plan: "pro",
    amount: 7.99,
    date: "12/7/2026",
    status: "paid",
  },
  {
    id: "psip-2026-004",
    invoiceNumber: "PSIP-2026-004",
    artistName: "Zara Lyra",
    email: "zara@discovod.com",
    plan: "pro",
    amount: 5.88,
    date: "10/7/2026",
    status: "paid",
  },
  {
    id: "psip-2026-005",
    invoiceNumber: "PSIP-2026-005",
    artistName: "Marcus Webb",
    email: "webb@discovod.com",
    plan: "free",
    amount: 0,
    date: "11/6/2026",
    status: "paid",
  },
  {
    id: "psip-2026-006",
    invoiceNumber: "PSIP-2026-006",
    artistName: "Priya Nair",
    email: "nair@discovod.com",
    plan: "pay-per-release",
    amount: 2.99,
    date: "25/6/2026",
    status: "paid",
  },
  {
    id: "psip-2026-007",
    invoiceNumber: "PSIP-2026-007",
    artistName: "Leo Fontaine",
    email: "leo@discovod.com",
    plan: "free",
    amount: 0,
    date: "16/5/2026",
    status: "pay-per-release",
  },
  {
    id: "psip-2026-008",
    invoiceNumber: "PSIP-2026-008",
    artistName: "Sarah Johnson",
    email: "sarah@discovod.com",
    plan: "pay-per-release",
    amount: 7.99,
    date: "24/5/2026",
    status: "pending",
  },
];
