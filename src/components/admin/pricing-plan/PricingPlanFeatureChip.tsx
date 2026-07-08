type PricingPlanFeatureChipProps = {
    label: string;
};

export default function PricingPlanFeatureChip({
    label,
}: PricingPlanFeatureChipProps) {
    return (
        <span className="inline-flex min-h-7 items-center rounded-full border border-[#D8DDE7] bg-white px-3 text-xs leading-4 text-[#161721]">
            {label}
        </span>
    );
}
