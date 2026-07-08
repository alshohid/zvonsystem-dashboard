import type {
    PricingPlanFeatureOption,
    PricingPlanFormValues,
    PricingPlanRecord,
} from "./pricingPlanTypes";

export const emptyPricingPlanFormValues: PricingPlanFormValues = {
    name: "",
    description: "",
    dispatchFeePercentage: "",
    billingDay: "Monday",
    billingCycle: "weekly",
    freeTrialEnabled: true,
    trialDuration: "14 Days",
    featureIds: ["load-dispatching"],
};

export function createPricingPlanFormValues(
    plan?: PricingPlanRecord | null,
): PricingPlanFormValues {
    if (!plan) {
        return emptyPricingPlanFormValues;
    }

    return {
        name: plan.name,
        description: plan.description,
        dispatchFeePercentage: plan.dispatchFeePercentage,
        billingDay: plan.billingDay,
        billingCycle: plan.billingCycle,
        freeTrialEnabled: plan.freeTrialEnabled ?? true,
        trialDuration: plan.trialDuration ?? "14 Days",
        featureIds: plan.featureIds,
    };
}

export function getPricingPlanFeatureLabels(
    featureIds: string[],
    featureOptions: PricingPlanFeatureOption[],
) {
    const featureMap = new Map(
        featureOptions.map((feature) => [feature.id, feature.label]),
    );

    return featureIds
        .map((featureId) => featureMap.get(featureId))
        .filter((feature): feature is string => Boolean(feature));
}

export function buildPricingPlanRecord({
    formValues,
    featureOptions,
    existingPlan,
}: {
    formValues: PricingPlanFormValues;
    featureOptions: PricingPlanFeatureOption[];
    existingPlan?: PricingPlanRecord | null;
}): PricingPlanRecord {
    return {
        id: existingPlan?.id ?? `pricing-plan-${Date.now()}`,
        status: existingPlan?.status ?? "active",
        name: formValues.name.trim(),
        description: formValues.description.trim(),
        dispatchFeePercentage: formValues.dispatchFeePercentage.trim(),
        billingDay: formValues.billingDay,
        billingCycle: formValues.billingCycle,
        freeTrialEnabled: formValues.freeTrialEnabled,
        trialDuration: formValues.trialDuration,
        featureIds: formValues.featureIds,
        features: getPricingPlanFeatureLabels(formValues.featureIds, featureOptions),
    };
}
