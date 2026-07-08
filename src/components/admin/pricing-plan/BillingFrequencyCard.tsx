import type {
    BillingFrequency,
    BillingFrequencyOption,
} from "./pricingPlanTypes";

type BillingFrequencyCardProps = {
    option: BillingFrequencyOption;
    isSelected: boolean;
    onSelect: (frequency: BillingFrequency) => void;
};

export default function BillingFrequencyCard({
    option,
    isSelected,
    onSelect,
}: BillingFrequencyCardProps) {
    return (
        <button
            type="button"
            aria-pressed={isSelected}
            onClick={() => onSelect(option.value)}
            className={[
                "flex min-h-[112px] flex-col items-center justify-center rounded-xl border bg-white px-5 py-6 text-center transition sm:min-h-[124px]",
                "focus:outline-none focus:ring-2 focus:ring-[#2E3A83]/25",
                isSelected
                    ? "border-[#2E3A83] shadow-[0_0_0_1px_#2E3A83]"
                    : "border-[#E4E7EC] hover:border-[#B8C0D6]",
            ].join(" ")}
        >
            <span className="block text-2xl font-semibold leading-8 text-[#161721]">
                {option.label}
            </span>
            <span className="mt-1 block text-base leading-6 text-[#8A92A6] sm:text-lg">
                {option.description}
            </span>
        </button>
    );
}
