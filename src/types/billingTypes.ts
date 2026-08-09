/**
 * Billing & subscription API types.
 *
 * These mirror the live /design-mode payloads returned by the backend
 * endpoints under `/subscription` and `/subscription-payment`.
 */

/** Billing period as returned by the subscription API. */
export type ApiBillingPeriod = "yearly" | "monthly" | "per_release";

/** A single subscription plan returned by `/subscription/plans`. */
export interface ApiPlan {
  id: string;
  name: string;
  displayName: string;
  description: string;
  price: number;
  currency: string;
  billingPeriod: ApiBillingPeriod;
  features: string[];
  maxReleasesPerYear: number | null;
  hasPriorityModeration: boolean;
  hasAdvancedAnalytics: boolean;
  hasSoundcloudDistribution: boolean;
  hasTidalDistribution: boolean;
  hasDedicatedSupport: boolean;
  earlyAccessFeatures: boolean;
  isActive: boolean;
  sortOrder: number;
  /** Present on the list endpoint but omitted by the single-plan endpoint. */
  isCurrentPlan?: boolean;
  releasesUsed?: number;
  releasesLimit?: number;
  releasesRemaining?: number;
}

export interface ApiPaginatedMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

/** GET `/subscription/plans` */
export interface PlansListResponse {
  success: boolean;
  message: string;
  data: ApiPlan[];
  meta: ApiPaginatedMeta;
}

/** GET `/subscription/plans/{id}` */
export interface PlanResponse {
  success: boolean;
  message: string;
  data: ApiPlan;
}

/** GET `/subscription/my-subscription` */
export interface ApiSubscription {
  planId: string;
  planName: string;
  planDisplayName: string;
  price: number;
  currency: string;
  billingPeriod: string;
  status: string;
  startDate: string;
  endDate: string;
  releasesUsed: number;
  releasesLimit: number;
  releasesRemaining: number;
  progressPercentage: number;
  features: string[];
  subscriptionId: string;
  autoRenew: boolean;
  createdAt: string;
  updatedAt: string;
  hasActiveSubscription: boolean;
  isFreePlan: boolean;
  paypalSubscriptionId: string;
}

export interface SubscriptionResponse {
  success: boolean;
  message: string;
  data: ApiSubscription;
}

/** POST `/subscription/cancel/{subscriptionId}` */
export interface CancelSubscriptionResponse {
  success: boolean;
  message: string;
  data: {
    subscriptionId: string;
    status: string;
    canceledAt: string;
  };
}

/** GET `/subscription/stats` */
export interface PlanStatsEntry {
  billingPeriod: string;
  count: number;
}

export interface PlanStats {
  totalPlans: number;
  plansByBillingPeriod: PlanStatsEntry[];
}

export interface PlanStatsResponse {
  success: boolean;
  message: string;
  data: PlanStats;
}

/** Billing cycle sent to the payment endpoints. */
export type BillingCycle = "MONTHLY" | "YEARLY" | "PER_RELEASE";

/** POST `/subscription-payment/create-checkout-session` */
export interface CreateCheckoutSessionRequest {
  planId: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  streetAddress: string;
  city: string;
  postalCode: string;
  country: string;
  billingCycle: BillingCycle;
}

export interface CheckoutPlanInfo {
  id: string;
  name: string;
  price: number;
  currency: string;
  billingCycle: string;
}

/**
 * The checkout-session response branches on whether the selected plan
 * is free or paid. All fields are optional so a single type covers both.
 */
export interface CheckoutSessionResponse {
  success: boolean;
  message: string;
  data: {
    subscriptionId: string;
    approveUrl?: string;
    isFree: boolean;
    isRepeatCustomer: boolean;
    requiresCardEntry: boolean;
    plan: CheckoutPlanInfo;
    alreadyActive?: boolean;
    paypalSubscriptionId?: string;
    subscription?: Record<string, unknown>;
  };
}

/** POST `/subscription-payment/process-payment` */
export interface ProcessPaymentRequest {
  planId: string;
  subscriptionId: string;
  cardHolderName: string;
  cardNumber: string;
  expiryMonth: string;
  expiryYear: string;
  cvv: string;
  billingCycle: BillingCycle;
  saveCard: boolean;
}

export interface ProcessPaymentResponse {
  success: boolean;
  message: string;
  data: {
    subscription: Record<string, unknown>;
    transaction: {
      id: string;
      amount: string;
      currency: string;
      status: string;
      paid_at: string;
      card_last_four: string;
      card_brand: string;
    };
    isRepeatCustomer: boolean;
    hasSavedCard: boolean;
    alreadyActive: boolean;
  };
}
