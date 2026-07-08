import { Pencil, Trash2 } from "lucide-react";
import PricingPlanFeatureChip from "./PricingPlanFeatureChip";
import type { PricingPlanRecord } from "./pricingPlanTypes";

type PricingPlanCardProps = {
    plan: PricingPlanRecord;
    onEdit?: (plan: PricingPlanRecord) => void;
    onDelete?: (plan: PricingPlanRecord) => void;
};

export default function PricingPlanCard({
    plan,
    onEdit,
    onDelete,
}: PricingPlanCardProps) {
    return (
        <article className="rounded-lg border border-[#DCE2EA] bg-[#F8FAFC] p-4 sm:p-5">
            <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-base font-semibold leading-6 text-[#161721]">
                            {plan.name}
                        </h3>
                        <span className="inline-flex h-6 items-center rounded-full border border-[#23B45D] bg-[#EFFFF5] px-2.5 text-sm leading-4 text-[#039855]">
                            {plan.status === "active" ? "Active" : "Inactive"}
                        </span>
                    </div>
                </div>

                <div className="flex shrink-0 items-center gap-3">
                    <button
                        type="button"
                        aria-label={`Delete ${plan.name}`}
                        onClick={() => onDelete?.(plan)}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-md text-[#F04438] transition hover:bg-[#FEE4E2] focus:outline-none focus:ring-2 focus:ring-[#F04438]/20"
                    >
                        <Trash2 className="h-4 w-4" />
                    </button>
                    <button
                        type="button"
                        aria-label={`Edit ${plan.name}`}
                        onClick={() => onEdit?.(plan)}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-md text-[#161721] transition hover:bg-[#EEF2FF] focus:outline-none focus:ring-2 focus:ring-[#2E3A83]/20"
                    >
                        <Pencil className="h-4 w-4" />
                    </button>
                </div>
            </div>

            <div className="mt-4 space-y-4">
                <div>
                    <h4 className="text-base font-semibold leading-6 text-[#161721]">
                        Description
                    </h4>
                    <p className="mt-1 break-words text-sm leading-5 text-[#8A92A6]">
                        {plan.description}
                    </p>
                </div>

                <div>
                    <h4 className="text-base font-semibold leading-6 text-[#161721]">
                        Dispatch Fee (%)
                    </h4>
                    <p className="mt-1 text-sm leading-5 text-[#8A92A6]">
                        {plan.dispatchFeePercentage}% Dispatch Fee
                    </p>
                </div>

                <div>
                    <h4 className="text-base font-semibold leading-6 text-[#161721]">
                        Included Features:
                    </h4>
                    <div className="mt-2 flex flex-wrap gap-2">
                        {plan.features.map((feature) => (
                            <PricingPlanFeatureChip
                                key={`${plan.id}-${feature}`}
                                label={feature}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </article>
    );
}
