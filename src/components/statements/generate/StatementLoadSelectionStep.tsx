"use client";

import { Check, Layers3 } from "lucide-react";
import { StatementLoadOption } from "../statementTypes";
import { formatStatementCurrency } from "../statementUtils";

type StatementLoadSelectionStepProps = {
    loads: StatementLoadOption[];
    selectedLoadIds: string[];
    error?: string;
    onSelectAll: () => void;
    onClearAll: () => void;
    onToggleLoad: (loadId: string) => void;
};

export default function StatementLoadSelectionStep({
    loads,
    selectedLoadIds,
    error,
    onSelectAll,
    onClearAll,
    onToggleLoad,
}: StatementLoadSelectionStepProps) {
    const selectedLoads = loads.filter((load) => selectedLoadIds.includes(load.id));
    const selectedRevenue = selectedLoads.reduce((total, load) => total + load.amount, 0);

    return (
        <div className="space-y-5">
            <div className="text-center">
                <span className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#E4E7EC] text-[#252E78]">
                    <Layers3 className="h-6 w-6" />
                </span>
                <h2 className="mt-3 text-xl font-semibold text-[#101828]">Select Loads</h2>
                <p className="mt-1 text-sm text-[#667085]">
                    {selectedLoadIds.length} of {loads.length} loads selected
                </p>
            </div>

            <div className="flex items-center justify-between gap-3">
                <button
                    type="button"
                    onClick={onSelectAll}
                    className="inline-flex h-8 items-center justify-center rounded-md border border-[#D7DDE8] bg-white px-3 text-sm font-medium text-[#101828] transition hover:bg-[#F8FAFC]"
                >
                    Select All
                </button>
                <button
                    type="button"
                    onClick={onClearAll}
                    className="inline-flex h-8 items-center justify-center rounded-md border border-[#D7DDE8] bg-white px-3 text-sm font-medium text-[#101828] transition hover:bg-[#F8FAFC]"
                >
                    Clear All
                </button>
            </div>

            <div
                className={[
                    "max-h-[280px] overflow-y-auto rounded-lg border bg-white",
                    error ? "border-[#F04438]" : "border-[#EAECF0]",
                ].join(" ")}
            >
                {loads.map((load) => {
                    const isSelected = selectedLoadIds.includes(load.id);

                    return (
                        <button
                            key={load.id}
                            type="button"
                            onClick={() => onToggleLoad(load.id)}
                            className="grid w-full grid-cols-[auto_minmax(0,1fr)_auto] gap-3 border-b border-[#EAECF0] px-4 py-3 text-left last:border-b-0 hover:bg-[#F8FAFC]"
                        >
                            <span
                                className={[
                                    "mt-1 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border",
                                    isSelected
                                        ? "border-[#252E78] bg-[#252E78] text-white"
                                        : "border-[#D0D5DD] bg-white text-transparent",
                                ].join(" ")}
                            >
                                <Check className="h-3.5 w-3.5" />
                            </span>
                            <span className="min-w-0">
                                <span className="block text-base font-semibold text-[#101828]">
                                    {load.id}
                                </span>
                                <span className="mt-1 block text-sm text-[#344054]">{load.route}</span>
                                <span className="mt-1 block text-sm text-[#667085]">{load.dateRange}</span>
                            </span>
                            <span className="mt-1 whitespace-nowrap text-base font-bold text-[#101828]">
                                {formatStatementCurrency(load.amount)}
                            </span>
                        </button>
                    );
                })}
            </div>
            {error ? <p className="text-sm text-[#D92D20]">{error}</p> : null}

            <div className="flex items-center justify-between rounded-lg bg-[#F8FAFC] px-4 py-5">
                <p className="text-sm font-semibold text-[#101828]">Total Selected Revenue</p>
                <p className="text-xl font-semibold text-[#2563EB]">
                    {formatStatementCurrency(selectedRevenue)}
                </p>
            </div>
        </div>
    );
}
