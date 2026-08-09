import type { ApiBillingPeriod, ApiPlan } from "@/src/types/billingTypes";
import type {
  BillingPeriod,
  Plan,
  PlanFeature,
  PlanId,
} from "@/src/components/admin/billing/types";

/** Maps an API plan name to the `Plan.icon` key used by the pricing UI. */
const PLAN_ICON: Record<string, Plan["icon"]> = {
  FREE: "music",
  PRO: "zap",
  PRO_YEARLY: "zap",
  PAY_PER_RELEASE: "coin",
  LABEL: "building",
};

const PRICE = (value: number) =>
  value % 1 === 0
    ? String(Math.round(value))
    : value.toFixed(2);

const toBillingCycle = (billingPeriod: ApiBillingPeriod): string => {
  switch (billingPeriod) {
    case "monthly":
      return "MONTHLY";
    case "yearly":
      return "YEARLY";
    case "per_release":
      return "PER_RELEASE";
  }
};

/**
 * Maps an API plan name to the canonical, stable identifier the UI uses
 * for deduplication (e.g. `PRO` and `PRO_YEARLY` collapse to `pro`).
 */
const canonicalId = (planName: string): PlanId => {
  if (planName === "PRO" || planName === "PRO_YEARLY") return "pro";
  const lowered = planName.toLowerCase();
  if (lowered === "pay_per_release" || lowered === "pay per release")
    return "pay-per-release";
  return lowered as PlanId;
};

/**
 * When the billing toggle is on `monthly`, show the monthly-flavoured
 * variant of each plan (e.g. `PRO` @ $7.99).  When on `annual`, show the
 * yearly variant (e.g. `PRO_YEARLY` @ $95.88).  Plans without a variant
 * (`FREE`, `PAY_PER_RELEASE`, `LABEL`) are always returned.
 */
export const filterPlansForBillingPeriod = (
  plans: ApiPlan[],
  billingPeriod: BillingPeriod,
): ApiPlan[] => {
  const sorted = [...plans].sort((a, b) => a.sortOrder - b.sortOrder);

  return sorted.filter((plan) => {
    if (plan.name === "PRO") return billingPeriod === "monthly";
    if (plan.name === "PRO_YEARLY") return billingPeriod === "annual";
    return true;
  });
};

/**
 * Converts a raw API plan into the display `Plan` type consumed by
 * `PricingCard`, `ChoosePlanStep`, `OrderSummaryCard`, etc.
 */
export const mapApiPlanToDisplayPlan = (
  plan: ApiPlan,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- kept for a symmetrical signature; period filtering happens upstream
  _billingPeriod: BillingPeriod,
): Plan => {
  const isFree = plan.price === 0;
  const canonical = canonicalId(plan.name);

  let priceSuffix: string;
  let billedAsLabel: string | undefined;
  let discountBadge: string | undefined;

  if (plan.billingPeriod === "per_release") {
    priceSuffix = "/release";
  } else if (plan.billingPeriod === "yearly") {
    priceSuffix = "/yr";
    if (!isFree) {
      billedAsLabel = `Billed as $${PRICE(plan.price)}/year`;
      discountBadge = "-20%";
    }
  } else {
    // monthly
    priceSuffix = "/mo";
    if (canonical === "pro" && !isFree) {
      billedAsLabel = `Billed as $${PRICE(plan.price * 12)}/year`;
      discountBadge = "-20%";
    }
  }

  const features: PlanFeature[] = plan.features.map((label) => ({
    label,
    included: true,
  }));

  let ctaLabel: string;
  let ctaDisabled: boolean | undefined;

  if (isFree) {
    ctaLabel = "Current Plan";
    ctaDisabled = true;
  } else if (plan.isCurrentPlan) {
    ctaLabel = "Current Plan";
    ctaDisabled = true;
  } else if (canonical === "pay-per-release") {
    ctaLabel = "Choose Pay Per Release";
  } else if (canonical === "label") {
    ctaLabel = `Choose Label - $${PRICE(plan.price)}${priceSuffix}`;
  } else {
    ctaLabel = `Upgrade - $${PRICE(plan.price)}${priceSuffix}`;
  }

  return {
    id: plan.id,
    name: plan.displayName,
    icon: PLAN_ICON[plan.name] ?? "music",
    highlighted: canonical === "pro" && !isFree,
    tagline: plan.description,
    priceMonthly: plan.price,
    priceSuffix,
    billedAsLabel,
    discountBadge,
    features,
    ctaLabel,
    ctaDisabled,
    billingCycle: toBillingCycle(plan.billingPeriod) as Plan["billingCycle"],
    currency: plan.currency,
    isCurrentPlan: Boolean(plan.isCurrentPlan),
    isFree,
  };
};

/** Convenience: filter + map in one pass. */
export const mapApiPlansToDisplayPlans = (
  plans: ApiPlan[],
  billingPeriod: BillingPeriod,
): Plan[] =>
  filterPlansForBillingPeriod(plans, billingPeriod).map((plan) =>
    mapApiPlanToDisplayPlan(plan, billingPeriod),
  );