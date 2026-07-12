import type { TabItem } from '@/src/components/common/TopTabs';
import type { SelectOption } from '@/src/components/admin/releases/releaseFormOptions';
import type { CheckoutStepKey, Invoice, Plan, SavedCard } from './types';

export const CHECKOUT_STEP_TABS: TabItem<CheckoutStepKey>[] = [
  { key: 'plan', label: 'Choose Plan' },
  { key: 'details', label: 'Details' },
  { key: 'checkout', label: 'Checkout' },
];

export const MOCK_PLANS: Plan[] = [
  {
    id: 'free',
    name: 'Free',
    icon: 'music',
    highlighted: false,
    tagline: 'Try the platform with limited uploads',
    priceMonthly: 0,
    priceSuffix: '',
    features: [
      { label: 'Up to 3 releases per year', included: true },
      { label: 'All major streaming platforms', included: true },
      { label: 'Basic analytics dashboard', included: true },
      { label: 'Standard moderation queue', included: true },
      { label: 'Unlimited releases', included: false },
      { label: 'Priority moderation', included: false },
      { label: 'Advanced analytics', included: false },
    ],
    ctaLabel: 'Current Plan',
    ctaDisabled: true,
  },
  {
    id: 'pro',
    name: 'Pro',
    icon: 'zap',
    highlighted: true,
    tagline: 'For artists ready to grow their audience',
    priceMonthly: 7.99,
    priceSuffix: '/mo',
    billedAsLabel: 'Billed as $95.88/year',
    discountBadge: '-20%',
    features: [
      { label: 'Unlimited releases', included: true },
      { label: 'All major streaming platforms', included: true },
      { label: 'Advanced analytics & insights', included: true },
      { label: 'Priority moderation (faster approval)', included: true },
      { label: 'SoundCloud & Tidal distribution', included: true },
      { label: 'Early access to new features', included: true },
      { label: 'Dedicated artist support', included: true },
    ],
    ctaLabel: 'Upgrade - $7.99/mo',
  },
  {
    id: 'pay-per-release',
    name: 'Pay Per Release',
    icon: 'coin',
    highlighted: false,
    tagline: 'For artists who upload occasionally',
    priceMonthly: 2.99,
    priceSuffix: '/release',
    features: [
      { label: 'No monthly fee', included: true },
      { label: 'All major platforms', included: true },
      { label: 'Pay only when you release', included: true },
      { label: 'No long-term commitment', included: true },
      { label: 'Unlimited releases', included: false },
      { label: 'Priority moderation', included: false },
    ],
    ctaLabel: 'Choose Pay Per Release',
  },
];

export const MOCK_INVOICES: Invoice[] = [
  {
    id: 'inv-2024-03',
    planName: 'Free Plan',
    invoiceNumber: 'INV-2024-03',
    date: 'Dec 1, 2024',
    amount: 0,
    isFree: true,
  },
  {
    id: 'inv-2024-02',
    planName: 'Free Plan',
    invoiceNumber: 'INV-2024-02',
    date: 'Nov 1, 2024',
    amount: 0,
    isFree: true,
  },
  {
    id: 'inv-2024-01',
    planName: 'Free Plan',
    invoiceNumber: 'INV-2024-01',
    date: 'Oct 1, 2024',
    amount: 0,
    isFree: true,
  },
];

export const MOCK_SAVED_CARDS: SavedCard[] = [
  {
    id: 'card-visa',
    brand: 'visa',
    last4: '4532',
    holder: 'Sarah Johnson',
    expiry: '08/27',
    isDefault: true,
  },
  {
    id: 'card-mastercard',
    brand: 'mastercard',
    last4: '8901',
    holder: 'Sarah Johnson',
    expiry: '08/27',
    isDefault: false,
  },
];

export const COUNTRY_OPTIONS: SelectOption[] = [
  { value: 'us', label: 'United States' },
  { value: 'gb', label: 'United Kingdom' },
  { value: 'ca', label: 'Canada' },
  { value: 'gr', label: 'Greece' },
  { value: 'de', label: 'Germany' },
  { value: 'fr', label: 'France' },
  { value: 'au', label: 'Australia' },
  { value: 'in', label: 'India' },
];
