import { PRICING_PLAN_OPTIONS } from "./mockPricingManagementData";
import type { PricingPlanId } from "./types";

type PlanSelectorProps = {
  value: PricingPlanId;
  onChange: (plan: PricingPlanId) => void;
};

export default function PlanSelector({ value, onChange }: PlanSelectorProps) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      {PRICING_PLAN_OPTIONS.map(plan => {
        const selected = plan.id === value;

        return (
          <button
            key={plan.id}
            type="button"
            onClick={() => onChange(plan.id)}
            className={[
              "rounded-xl border p-3 text-left transition-colors",
              selected ? "border-primary bg-[#EFFEE6]" : "border-[#E5E7EB] hover:bg-[#F9FAFB]",
            ].join(" ")}
          >
            <p className="text-[13px] font-semibold text-[#101828]">{plan.name}</p>
            <p className="text-xs text-[#98A2B3]">{plan.priceLabel}</p>
          </button>
        );
      })}
    </div>
  );
}
