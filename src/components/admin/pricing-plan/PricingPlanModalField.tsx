import type { ReactNode } from "react";

type PricingPlanModalFieldProps = {
    label: string;
    htmlFor: string;
    children: ReactNode;
};

export default function PricingPlanModalField({
    label,
    htmlFor,
    children,
}: PricingPlanModalFieldProps) {
    return (
        <div>
            <label
                htmlFor={htmlFor}
                className="mb-2 block text-sm font-medium leading-5 text-[#161721]"
            >
                {label}
            </label>
            {children}
        </div>
    );
}
