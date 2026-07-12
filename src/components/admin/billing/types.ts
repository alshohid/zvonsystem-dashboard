export type BillingPeriod = 'monthly' | 'annual';

export type PlanId = 'free' | 'pro' | 'pay-per-release';

export type PlanFeature = {
  label: string;
  included: boolean;
};

export type Plan = {
  id: PlanId;
  name: string;
  icon: 'music' | 'zap' | 'coin';
  highlighted: boolean;
  tagline: string;
  priceMonthly: number;
  priceSuffix: string;
  billedAsLabel?: string;
  discountBadge?: string;
  features: PlanFeature[];
  ctaLabel: string;
  ctaDisabled?: boolean;
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
