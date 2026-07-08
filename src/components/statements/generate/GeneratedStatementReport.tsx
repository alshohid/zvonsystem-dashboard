"use client";

import { Download } from "lucide-react";
import { StatementGenerationFormState, StatementLoadOption } from "../statementTypes";
import { formatStatementCurrency } from "../statementUtils";

type GeneratedStatementReportProps = {
    form: StatementGenerationFormState;
    selectedLoads: StatementLoadOption[];
    carrierName: string;
    driverName: string;
    onClose: () => void;
    onDownload: () => void;
};

export default function GeneratedStatementReport({
    form,
    selectedLoads,
    carrierName,
    driverName,
    onClose,
    onDownload,
}: GeneratedStatementReportProps) {
    const totalRevenue = selectedLoads.reduce((total, load) => total + load.amount, 0);
    const loadedMiles = selectedLoads.reduce((total, load) => total + load.loadedMiles, 0);
    const deadheadMiles = selectedLoads.reduce((total, load) => total + load.deadheadMiles, 0);
    const avgRate = selectedLoads.length > 0 ? totalRevenue / selectedLoads.length : 0;
    const dispatchFee = Math.round(totalRevenue * 0.1);
    const totalEarning = totalRevenue - dispatchFee;
    const recipientName = form.statementType === "driver" ? driverName : carrierName;

    return (
        <div className="mx-auto w-full max-w-[940px] rounded-[8px] bg-white shadow-[0_24px_80px_rgba(16,24,40,0.24)]">
            <header className="flex items-center justify-between gap-4 rounded-t-[8px] bg-[#252E78] px-5 py-4 text-white sm:px-7">
                <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded bg-white text-[9px] font-bold text-[#252E78]">
                        FT
                    </div>
                    <p className="text-base font-semibold">FleetOS</p>
                </div>
                <div className="text-right">
                    <h1 className="text-xl font-semibold leading-none">Weekly Statement</h1>
                    <p className="mt-1 text-xs text-white/80">
                        Week of {form.startDate} - {form.endDate}
                    </p>
                </div>
            </header>

            <div className="space-y-5 p-5 sm:p-7">
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                    {[
                        ["Total Revenue", formatStatementCurrency(totalRevenue), `${selectedLoads.length} drivers - ${selectedLoads.length} trucks`],
                        ["Loaded Miles", String(loadedMiles), "Avg 160 mi / driver"],
                        ["Deadhead Miles", String(deadheadMiles), "18.7% of total miles"],
                        ["Avg Rate / Mile", formatStatementCurrency(avgRate), "8 loads completed"],
                    ].map(([label, value, helper]) => (
                        <div key={label} className="rounded-lg border border-[#EAECF0] p-4">
                            <p className="text-xs font-medium text-[#667085]">{label}</p>
                            <p className="mt-2 text-xl font-semibold text-[#0B2F6B]">{value}</p>
                            <p className="mt-1 text-xs text-[#667085]">{helper}</p>
                        </div>
                    ))}
                </div>

                <section>
                    <h2 className="text-sm font-semibold text-[#101828]">Load Details</h2>
                    <p className="mt-2 text-xs text-[#667085]">
                        Completed Load of all Drivers from {form.startDate} - {form.endDate}
                    </p>

                    <div className="mt-4 overflow-hidden rounded-lg border border-[#EAECF0]">
                        <div className="flex items-center justify-between bg-[#252E78] px-4 py-3 text-white">
                            <div className="flex items-center gap-3">
                                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/15 text-xs font-semibold">
                                    {recipientName.slice(0, 2).toUpperCase()}
                                </span>
                                <div>
                                    <p className="text-sm font-semibold">{recipientName}</p>
                                    <p className="text-[11px] text-white/70">
                                        {form.statementType === "carrier" ? "Carrier statement" : "Driver statement"}
                                    </p>
                                </div>
                            </div>
                            <div className="grid grid-cols-3 gap-4 text-right text-[11px]">
                                <span>Loads {selectedLoads.length}</span>
                                <span>Dispatch Fee {formatStatementCurrency(dispatchFee)}</span>
                                <span>Net To Carrier {formatStatementCurrency(totalEarning)}</span>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="min-w-[760px] w-full border-separate border-spacing-0 text-left text-xs">
                                <thead>
                                    <tr className="bg-[#F8FAFC] text-[#667085]">
                                        <th className="px-4 py-3 font-medium">Load ID</th>
                                        <th className="px-4 py-3 font-medium">DH Miles</th>
                                        <th className="px-4 py-3 font-medium">Loaded Mi</th>
                                        <th className="px-4 py-3 font-medium">Date Range</th>
                                        <th className="px-4 py-3 font-medium">Route</th>
                                        <th className="px-4 py-3 text-right font-medium">Rate</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {selectedLoads.map((load) => (
                                        <tr key={load.id} className="even:bg-[#F8FAFC]">
                                            <td className="px-4 py-3 font-semibold text-[#101828]">{load.id}</td>
                                            <td className="px-4 py-3 text-[#101828]">{load.deadheadMiles} mi</td>
                                            <td className="px-4 py-3 text-[#101828]">{load.loadedMiles}</td>
                                            <td className="px-4 py-3 text-[#101828]">{load.dateRange}</td>
                                            <td className="px-4 py-3 text-[#101828]">{load.route}</td>
                                            <td className="px-4 py-3 text-right font-bold text-[#101828]">
                                                {formatStatementCurrency(load.rate)}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="grid grid-cols-2 gap-2 bg-[#EAF4FF] px-4 py-3 text-xs font-semibold text-[#101828] sm:grid-cols-5">
                            <span>Loaded Miles {loadedMiles} mi</span>
                            <span>Deadhead Miles {deadheadMiles} mi</span>
                            <span>Total Miles {loadedMiles + deadheadMiles} mi</span>
                            <span>Avg $/Mi {formatStatementCurrency(avgRate)}</span>
                            <span className="sm:text-right">Gross Earning {formatStatementCurrency(totalRevenue)}</span>
                        </div>
                    </div>
                </section>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div className="rounded-lg border border-[#EAECF0] p-4">
                        <p className="text-xs text-[#667085]">Dispatch Fee (10%)</p>
                        <p className="mt-2 text-xl font-semibold text-[#D92D20]">
                            -{formatStatementCurrency(dispatchFee)}
                        </p>
                    </div>
                    <div className="rounded-lg border border-[#EAECF0] p-4">
                        <p className="text-xs text-[#667085]">Total Earning</p>
                        <p className="mt-2 text-xl font-semibold text-[#101828]">
                            {formatStatementCurrency(totalEarning)}
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-3 border-t border-[#EAECF0] pt-5 sm:grid-cols-2 sm:justify-end">
                    <button
                        type="button"
                        onClick={onClose}
                        className="inline-flex h-11 items-center justify-center rounded-lg border border-[#D7DDE8] bg-white px-5 text-sm font-semibold text-[#2E3A83] transition hover:bg-[#F8FAFC]"
                    >
                        Close
                    </button>
                    <button
                        type="button"
                        onClick={onDownload}
                        className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#2E3A83] px-5 text-sm font-semibold text-white transition hover:bg-[#25306F]"
                    >
                        <Download className="h-4 w-4" />
                        Download
                    </button>
                </div>
            </div>
        </div>
    );
}
