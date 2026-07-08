"use client";

import { Download } from "lucide-react";
import { Modal } from "../../ui/modal";
import { InvoiceRecord } from "../invoiceTypes";
import {
    formatCurrency,
    getInvoiceTotalDue,
    getSelectedRevenue,
} from "../invoiceUtils";

type InvoicePreviewModalProps = {
    isOpen: boolean;
    invoice: InvoiceRecord | null;
    onClose: () => void;
    onDownload: (invoice: InvoiceRecord) => void;
};

export default function InvoicePreviewModal({
    isOpen,
    invoice,
    onClose,
    onDownload,
}: InvoicePreviewModalProps) {
    if (!invoice) {
        return null;
    }

    const selectedRevenue = getSelectedRevenue(invoice.loads);
    const totalDue = getInvoiceTotalDue(invoice.loads, invoice.pricingPlan);

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            showCloseButton={false}
            className="mx-4 max-h-[92vh] max-w-[960px] overflow-y-auto rounded-[8px] shadow-[0_24px_80px_rgba(16,24,40,0.28)]"
            overlayClassName="bg-[#10182866] backdrop-blur-[3px]"
        >
            <div className="bg-white">
                <header className="flex items-center justify-between gap-4 rounded-t-[8px] bg-[#252E78] px-5 py-5 text-white sm:px-8">
                    <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded bg-white text-[9px] font-bold text-[#252E78]">
                            FT
                        </div>
                        <p className="text-lg font-semibold">FleetOS</p>
                    </div>
                    <div className="text-right">
                        <h2 className="text-2xl font-semibold leading-none">INVOICE</h2>
                        <p className="mt-1 text-sm text-white/80">{invoice.invoiceNumber}</p>
                    </div>
                </header>

                <div className="grid grid-cols-2 border-b border-[#EAECF0] bg-[#F8FAFC] sm:grid-cols-4">
                    {[
                        ["Invoice Number", invoice.invoiceNumber],
                        ["Carrier", invoice.carrierName],
                        ["Start Date", invoice.startDate],
                        ["End Date", invoice.endDate],
                    ].map(([label, value]) => (
                        <div key={label} className="border-r border-[#EAECF0] px-5 py-4 last:border-r-0">
                            <p className="text-xs text-[#667085]">{label}</p>
                            <p className="mt-1 text-sm font-semibold text-[#101828]">{value}</p>
                        </div>
                    ))}
                </div>

                <div className="space-y-7 px-5 py-6 sm:px-8">
                    <section>
                        <h3 className="text-sm font-semibold text-[#101828]">Load Details</h3>
                        <p className="mt-2 text-xs text-[#667085]">
                            Completed Load of all Drivers from {invoice.startDate} - {invoice.endDate}
                        </p>

                        <div className="mt-5 overflow-x-auto">
                            <table className="min-w-[760px] w-full border-separate border-spacing-0 text-left">
                                <thead>
                                    <tr className="bg-[#F8FAFC] text-xs font-medium text-[#667085]">
                                        <th className="px-4 py-3">Load ID</th>
                                        <th className="px-4 py-3">Date Range</th>
                                        <th className="px-4 py-3">Route</th>
                                        <th className="px-4 py-3">Assigned To</th>
                                        <th className="px-4 py-3 text-right">Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {invoice.loads.map((load) => (
                                        <tr key={load.id} className="border-b border-[#EAECF0] text-sm">
                                            <td className="border-b border-[#EAECF0] px-4 py-4 font-semibold text-[#101828]">
                                                {load.id}
                                            </td>
                                            <td className="border-b border-[#EAECF0] px-4 py-4 text-[#101828]">
                                                {load.dateRange}
                                            </td>
                                            <td className="border-b border-[#EAECF0] px-4 py-4 text-[#101828]">
                                                {load.route}
                                            </td>
                                            <td className="border-b border-[#EAECF0] px-4 py-4 text-[#101828]">
                                                <span className="block text-xs text-[#667085]">Assigned to</span>
                                                {load.assignedTo}
                                            </td>
                                            <td className="border-b border-[#EAECF0] px-4 py-4 text-right font-bold text-[#101828]">
                                                {formatCurrency(load.amount)}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>

                    <section className="flex items-center justify-between rounded-lg bg-[#EAF4FF] px-5 py-4">
                        <p className="text-lg font-semibold text-[#101828]">Total Selected Revenue</p>
                        <p className="text-lg font-bold text-[#2563EB]">{formatCurrency(selectedRevenue)}</p>
                    </section>

                    <section>
                        <h3 className="text-sm font-semibold text-[#101828]">Payment Calculation</h3>
                        <div className="mt-4 flex items-start justify-between gap-4 border-t border-[#EAECF0] pt-4">
                            <div>
                                <p className="text-base font-semibold text-[#101828]">Dispatch Fee % (Deduction)</p>
                                <p className="mt-1 text-xs text-[#667085]">{invoice.pricingPlan.name}</p>
                            </div>
                            <p className="text-sm font-semibold text-[#2563EB]">
                                {invoice.pricingPlan.dispatchFeePercent}% default
                            </p>
                        </div>
                        <div className="mt-4 flex items-center justify-between rounded-lg border border-[#D7DDE8] px-5 py-4">
                            <p className="text-sm font-semibold text-[#344054]">Total Due</p>
                            <p className="text-lg font-bold text-[#101828]">{formatCurrency(totalDue)}</p>
                        </div>
                        <p className="mt-2 text-[11px] text-[#2563EB]">
                            Calculated automatically: Total Selected Revenue - Dispatch Fee
                        </p>
                    </section>

                    <section>
                        <h3 className="text-sm font-semibold text-[#101828]">Notes / Terms</h3>
                        <p className="mt-3 text-sm text-[#101828]">{invoice.notes || "N/A"}</p>
                    </section>

                    <div className="grid grid-cols-1 gap-3 border-t border-[#EAECF0] pt-4 sm:grid-cols-[1fr_1fr] sm:justify-end">
                        <button
                            type="button"
                            onClick={onClose}
                            className="inline-flex h-11 items-center justify-center rounded-lg border border-[#D7DDE8] bg-white px-5 text-sm font-semibold text-[#2E3A83] transition hover:bg-[#F8FAFC]"
                        >
                            Close
                        </button>
                        <button
                            type="button"
                            onClick={() => onDownload(invoice)}
                            className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#2E3A83] px-5 text-sm font-semibold text-white transition hover:bg-[#25306F]"
                        >
                            <Download className="h-4 w-4" />
                            Download
                        </button>
                    </div>
                </div>
            </div>
        </Modal>
    );
}
