export type PricingPlanId = "free" | "pro" | "pay-per-release";

export type SubscriptionStatus = "active" | "cancelled" | "suspended" | "trial";

export type BillingCycle = "monthly" | "annual";

export type InvoiceStatus =
  | "paid"
  | "pending"
  | "pay-per-release"
  | "draft"
  | "cancelled";

export type ArtistSubscription = {
  id: string;
  artistName: string;
  email: string;
  plan: PricingPlanId;
  status: SubscriptionStatus;
  amount: number;
  billingCycle: BillingCycle;
  releasesUsed: number;
  startDate: string;
};

export type PricingInvoice = {
  id: string;
  invoiceNumber: string;
  artistName: string;
  email: string;
  plan?: PricingPlanId;
  amount: number;
  date: string;
  status: InvoiceStatus;
  paymentMethod?: string;
  description?: string;
};

export type PaymentControlStatId =
  | "total-revenue"
  | "total-invoices"
  | "active-pro-subs"
  | "paid-invoices"
  | "pending-invoices";

export type PaymentControlStat = {
  id: PaymentControlStatId;
  label: string;
  value: string;
};

export type PricingPlanOption = {
  id: PricingPlanId;
  name: string;
  priceLabel: string;
};

export type SubscriptionEditValues = {
  plan: PricingPlanId;
  status: SubscriptionStatus;
  billingCycle: BillingCycle;
  amount: string;
  releasesUsed: string;
};

export type CreateInvoiceValues = {
  artistName: string;
  email: string;
  amount: string;
  status: string;
  billingDate: string;
  description: string;
  currency: string;
  paymentMethod: string;
};
