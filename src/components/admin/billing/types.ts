export type BillingPeriod = 'monthly' | 'annual';

/**
 * Plan identifier.  Originally a closed union (`'free' | 'pro' | …`) but the
 * subscription API returns UUID strings, so the type is now `string`.
 */
export type PlanId = string;

export type PlanFeature = {
  label: string;
  included: boolean;
};

export type Plan = {
  id: PlanId;
  name: string;
  icon: 'music' | 'zap' | 'coin' | 'building';
  highlighted: boolean;
  tagline: string;
  priceMonthly: number;
  priceSuffix: string;
  billedAsLabel?: string;
  discountBadge?: string;
  features: PlanFeature[];
  ctaLabel: string;
  ctaDisabled?: boolean;
  /** Uppercase billing cycle sent to the payment API (`"MONTHLY"`, `"YEARLY"`, `"PER_RELEASE"`). */
  billingCycle: string;
  /** Currency code from the API (e.g. `"USD"`). */
  currency: string;
  /** Mirrors the API `isCurrentPlan` flag – used to render "Current Plan". */
  isCurrentPlan: boolean;
  /** Convenience: `price === 0`. */
  isFree: boolean;
};

export type Invoice = {
  id: string;
  planName: string;
  invoiceNumber: string;
  date: string;
  amount: number;
  isFree: boolean;
};

export type CardBrand = 'visa' | 'mastercard';

export type SavedCard = {
  id: string;
  brand: CardBrand;
  last4: string;
  holder: string;
  expiry: string;
  isDefault: boolean;
};

export type CheckoutStepKey = 'plan' | 'details' | 'checkout';

export type BillingDetailsFormValues = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  street: string;
  city: string;
  postalCode: string;
  country: string;
};

export type CardEntryValues = {
  cardNumber: string;
  cardholderName: string;
  expiry: string;
  cvv: string;
};
