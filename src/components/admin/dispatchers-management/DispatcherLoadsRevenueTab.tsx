"use client";

import { useState } from "react";
import { Input } from "@/src/components/ui/input";
import DispatcherLoadCard from "./DispatcherLoadCard";
import type { DispatcherDetailsRecord } from "./dispatcherDetailsTypes";

type DispatcherLoadsRevenueTabProps = {
    dispatcher: DispatcherDetailsRecord;
};

export default function DispatcherLoadsRevenueTab({
    dispatcher,
}: DispatcherLoadsRevenueTabProps) {
    const [startDate, setStartDate] = useState("2025-06-22");
    const [endDate, setEndDate] = useState("2025-07-22");
    const displayStartDate = formatDisplayDate(startDate);
    const displayEndDate = formatDisplayDate(endDate);

    return (
        <section>
            <h2 className="mt-4 text-base font-semibold text-[#101828]">
                Total Completed Loads: {dispatcher.totalCompletedLoads}
            </h2>

            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <DateField
                    id="dispatcher-start-date"
                    label="Start Date"
                    value={startDate}
                    onChange={setStartDate}
                />
                <DateField
                    id="dispatcher-end-date"
                    label="End Date"
                    value={endDate}
                    onChange={setEndDate}
                />
            </div>

            <div className="mt-4 rounded-lg bg-[#F8FAFC] p-4 sm:p-5">
                <p className="text-sm text-[#344054]">
                    All completed loads from{" "}
                    <span className="font-semibold text-[#101828]">{displayStartDate}</span> -{" "}
                    <span className="font-semibold text-[#101828]">{displayEndDate}</span>
                </p>

                <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <SummaryCard value={String(dispatcher.totalCompletedLoads)} label="Total Loads" />
                    <SummaryCard value={dispatcher.totalMiles} label="Total Miles" />
                </div>

                <div className="mt-4 max-h-[430px] space-y-3 overflow-y-auto pr-1">
                    {dispatcher.loads.map((load) => (
                        <DispatcherLoadCard key={load.id} load={load} />
                    ))}
                </div>

                <div className="mt-4 divide-y divide-[#E4E7EC] rounded-md bg-white">
                    <TotalRow label="Total Revenue" value={dispatcher.totalRevenue} />
                    <TotalRow
                        label="Total Dispatcher Revenue"
                        value={dispatcher.totalDispatcherRevenue}
                    />
                </div>
            </div>
        </section>
    );
}

function formatDisplayDate(value: string) {
    if (!value) {
        return "Select date";
    }

    const [year, month, day] = value.split("-");

    if (!year || !month || !day) {
        return value;
    }

    return `${month}/${day}/${year}`;
}

function DateField({
    id,
    label,
    value,
    onChange,
}: {
    id: string;
    label: string;
    value: string;
    onChange: (value: string) => void;
}) {
    return (
        <div>
            <label htmlFor={id} className="text-sm font-medium text-[#101828]">
                {label}
            </label>
            <div className="relative mt-2">
                <Input
                    id={id}
                    type="date"
                    value={value}
                    onChange={(event) => onChange(event.target.value)}
                    className="h-10 rounded-md border-[#E4E7EC] bg-white px-3 text-sm text-[#101828] shadow-none outline-none focus:border-[#2E3A83] focus:ring-2 focus:ring-[#2E3A83]/10"
                />
            </div>
        </div>
    );
}

function SummaryCard({ value, label }: { value: string; label: string }) {
    return (
        <div className="rounded-lg border border-[#E4E7EC] bg-white px-4 py-5 text-center">
            <p className="text-lg font-semibold text-[#101828]">{value}</p>
            <p className="mt-1 text-sm text-[#667085]">{label}</p>
        </div>
    );
}

function TotalRow({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex items-center justify-between gap-4 px-4 py-4">
            <p className="text-sm font-semibold text-[#101828]">{label}</p>
            <p className="text-sm font-semibold text-[#006DFF]">{value}</p>
        </div>
    );
}
