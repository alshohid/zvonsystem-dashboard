"use client";

import { Clock3 } from "lucide-react";
import { BillingCycleInfo } from "../invoiceTypes";

type BillingCycleCardProps = {
    billingCycle: BillingCycleInfo;
};

export default function BillingCycleCard({ billingCycle }: BillingCycleCardProps) {
    return (
        <section className="rounded-xl border border-[#E4E7EC] bg-[#F8FAFB] px-4 py-4 shadow-[0_1px_2px_rgba(16,24,40,0.04)] sm:px-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4">
                    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#DCE1F1] text-[#2E3A83]">
                        <Clock3 className="h-5 w-5" />
                    </span>

                    <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                            <h3 className="text-base font-semibold text-[#101828]">
                                {billingCycle.title}
                            </h3>
                            <span className="rounded-full bg-[#EEF4FF] px-2 py-0.5 text-[11px] font-medium text-[#2563EB]">
                                {billingCycle.cadence}
                            </span>
                        </div>
                        <p className="mt-1 text-sm text-[#475467]">{billingCycle.dateRange}</p>
                    </div>
                </div>

                <div className="sm:text-right">
                    <p className="text-sm text-[#667085]">{billingCycle.endsLabel}</p>
                    <p className="mt-1 text-2xl font-semibold text-[#2563EB]">
                        {billingCycle.daysRemaining} days
                    </p>
                </div>
            </div>
        </section>
    );
}
