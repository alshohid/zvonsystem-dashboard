"use client";

import { LucideIcon } from "lucide-react";

type StatementMetricCardProps = {
    icon: LucideIcon;
    value: string;
    label: string;
    helperText?: string;
};

export default function StatementMetricCard({
    icon: Icon,
    value,
    label,
    helperText,
}: StatementMetricCardProps) {
    return (
        <div className="rounded-xl border border-[#E4E7EC] bg-white p-5 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
            <div className="flex items-center gap-4">
                <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#DCE1F1] text-[#1F255F]">
                    <Icon className="h-6 w-6" />
                </span>
                <div className="min-w-0">
                    <p className="text-2xl font-semibold leading-none text-[#101828]">{value}</p>
                    <p className="mt-1 text-sm font-medium text-[#475467]">{label}</p>
                    {helperText ? (
                        <p className="mt-0.5 text-xs text-[#98A2B3]">{helperText}</p>
                    ) : null}
                </div>
            </div>
        </div>
    );
}
