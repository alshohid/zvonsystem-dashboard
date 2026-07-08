"use client";

import { Package } from "lucide-react";
import { InvoiceLoadDetail } from "../invoiceTypes";
import { formatCurrency, getSelectedRevenue } from "../invoiceUtils";

type InvoiceLoadDetailsSectionProps = {
    loads: InvoiceLoadDetail[];
    hasCarrier: boolean;
    startDate: string;
    endDate: string;
};

export default function InvoiceLoadDetailsSection({
    loads,
    hasCarrier,
    startDate,
    endDate,
}: InvoiceLoadDetailsSectionProps) {
    const selectedRevenue = getSelectedRevenue(loads);

    return (
        <section className="rounded-xl bg-[#F8FAFC] p-4">
            <div>
                <h3 className="text-sm font-semibold text-[#101828]">Load Details</h3>
                <p className="mt-1 text-xs text-[#344054]">
                    Completed Load of all Drivers from{" "}
                    <span className="font-semibold text-[#101828]">
                        {startDate && endDate ? `${startDate} - ${endDate}` : "MM/DD/YYYY - MM/DD/YYYY"}
                    </span>
                </p>
            </div>

            {hasCarrier ? (
                <div className="mt-4 max-h-[260px] overflow-y-auto rounded-lg border border-[#EAECF0] bg-white">
                    {loads.map((load) => (
                        <div
                            key={load.id}
                            className="grid grid-cols-1 gap-2 border-b border-[#EAECF0] px-4 py-3 last:border-b-0 sm:grid-cols-[1.2fr_1.4fr_1.6fr_0.8fr]"
                        >
                            <div>
                                <p className="text-xs font-semibold text-[#101828]">{load.id}</p>
                                <p className="mt-1 text-[11px] text-[#667085]">{load.dateRange}</p>
                            </div>
                            <p className="text-xs font-medium text-[#101828]">{load.route}</p>
                            <div>
                                <p className="text-[11px] text-[#667085]">Assigned to</p>
                                <p className="text-xs font-semibold text-[#101828]">{load.assignedTo}</p>
                            </div>
                            <p className="text-right text-xs font-bold text-[#101828]">
                                {formatCurrency(load.amount)}
                            </p>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="mt-4 flex min-h-[230px] flex-col items-center justify-center rounded-lg border border-[#E4E7EC] bg-white px-4 text-center">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#EEF4FF] text-[#2563EB]">
                        <Package className="h-6 w-6" />
                    </span>
                    <p className="mt-4 text-sm text-[#667085]">Select Carrier to see load information here</p>
                </div>
            )}

            <div className="mt-4 flex items-center justify-between gap-4">
                <p className="text-sm font-semibold text-[#101828]">Total Selected Revenue</p>
                <p className="text-sm font-bold text-[#2563EB]">{formatCurrency(selectedRevenue)}</p>
            </div>
        </section>
    );
}
