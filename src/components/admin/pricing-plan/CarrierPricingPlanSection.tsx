import { Plus } from "lucide-react";
import PricingPlanCard from "./PricingPlanCard";
import type { PricingPlanRecord } from "./pricingPlanTypes";

type CarrierPricingPlanSectionProps = {
    plans: PricingPlanRecord[];
    onCreatePlan?: () => void;
    onEditPlan?: (plan: PricingPlanRecord) => void;
    onDeletePlan?: (plan: PricingPlanRecord) => void;
};

export default function CarrierPricingPlanSection({
    plans,
    onCreatePlan,
    onEditPlan,
    onDeletePlan,
}: CarrierPricingPlanSectionProps) {
    return (
        <section>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-xl font-semibold leading-7 text-[#161721]">
                    Carrier Pricing Plan
                </h2>

                <button
                    type="button"
                    onClick={onCreatePlan}
                    className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-md bg-[#2E3A83] px-4 text-sm font-semibold text-white transition hover:bg-[#25306F] focus:outline-none focus:ring-2 focus:ring-[#2E3A83]/25 sm:w-auto"
                >
                    <Plus className="h-4 w-4" />
                    Create Plan
                </button>
            </div>

            <div className="mt-3 space-y-3">
                {plans.map((plan) => (
                    <PricingPlanCard
                        key={plan.id}
                        plan={plan}
                        onEdit={onEditPlan}
                        onDelete={onDeletePlan}
                    />
                ))}
            </div>
        </section>
    );
}
