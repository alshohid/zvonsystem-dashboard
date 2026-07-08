"use client";

import { CheckCircle2 } from "lucide-react";
import { StatementGenerationFormState, StatementLoadOption } from "../statementTypes";
import { formatStatementCurrency } from "../statementUtils";

type StatementReviewStepProps = {
    form: StatementGenerationFormState;
    selectedLoads: StatementLoadOption[];
    carrierName: string;
    driverName: string;
};

export default function StatementReviewStep({
    form,
    selectedLoads,
    carrierName,
    driverName,
}: StatementReviewStepProps) {
    const selectedRevenue = selectedLoads.reduce((total, load) => total + load.amount, 0);
    const recipientLabel = form.statementType === "driver" ? driverName : carrierName;

    return (
        <div className="space-y-5">
            <div className="text-center">
                <span className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#E4E7EC] text-[#252E78]">
                    <CheckCircle2 className="h-6 w-6" />
                </span>
                <h2 className="mt-3 text-xl font-semibold text-[#101828]">
                    Review Statement Details
                </h2>
                <p className="mt-1 text-sm text-[#667085]">Please review before generating</p>
            </div>

            <div className="rounded-lg bg-[#F8FAFC] p-4">
                <div className="grid grid-cols-[1fr_auto] gap-4 py-2 text-sm">
                    <p className="text-[#667085]">Statement Type</p>
                    <p className="font-semibold text-[#101828]">
                        {form.statementType === "carrier" ? "Carrier" : "Driver"}
                    </p>
                </div>
                <div className="grid grid-cols-[1fr_auto] gap-4 py-2 text-sm">
                    <p className="text-[#667085]">
                        {form.statementType === "carrier" ? "Carrier" : "Driver"}
                    </p>
                    <p className="text-right font-semibold text-[#101828]">{recipientLabel}</p>
                </div>
                <div className="grid grid-cols-[1fr_auto] gap-4 py-2 text-sm">
                    <p className="text-[#667085]">Period</p>
                    <p className="text-right font-semibold text-[#101828]">
                        {form.startDate} - {form.endDate}
                    </p>
                </div>
            </div>

            <div className="rounded-lg border border-[#BBD7FF] bg-[#EFF6FF] p-4">
                <h3 className="text-base font-semibold text-[#2563EB]">Summary</h3>
                <div className="mt-4 flex items-center justify-between text-sm">
                    <p className="text-[#2563EB]">Total Loads</p>
                    <p className="font-bold text-[#2563EB]">{selectedLoads.length}</p>
                </div>
                <div className="mt-3 flex items-center justify-between text-sm">
                    <p className="text-[#2563EB]">Total Revenue</p>
                    <p className="text-xl font-bold text-[#2563EB]">
                        {formatStatementCurrency(selectedRevenue)}
                    </p>
                </div>
            </div>
        </div>
    );
}
