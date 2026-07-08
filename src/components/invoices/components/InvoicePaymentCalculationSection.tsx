"use client";

import { InvoicePricingPlan } from "../invoiceTypes";
import { formatCurrency } from "../invoiceUtils";

type InvoicePaymentCalculationSectionProps = {
    pricingPlan: InvoicePricingPlan;
    selectedRevenue: number;
    totalDue: number;
    hasCarrier: boolean;
};

export default function InvoicePaymentCalculationSection({
    pricingPlan,
    selectedRevenue,
    totalDue,
    hasCarrier,
}: InvoicePaymentCalculationSectionProps) {
    return (
        <section className="rounded-xl bg-[#F8FAFC] p-4">
            <h3 className="text-sm font-semibold text-[#101828]">Payment Calculation</h3>

            {hasCarrier ? (
                <div className="mt-4">
                    <p className="text-sm font-semibold text-[#101828]">{pricingPlan.name}</p>

                    <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
                        <div>
                            <p className="text-xs font-semibold text-[#344054]">Billing Cycle</p>
                            <p className="mt-1 text-xs text-[#667085]">{pricingPlan.billingCycle}</p>
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-[#344054]">Billing Day</p>
                            <p className="mt-1 text-xs text-[#667085]">{pricingPlan.billingDay}</p>
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-[#344054]">Dispatch Fee (%)</p>
                            <p className="mt-1 text-xs text-[#667085]">
                                {pricingPlan.dispatchFeePercent}% Dispatch Fee
                            </p>
                        </div>
                    </div>

                    <div className="mt-4">
                        <p className="text-xs font-semibold text-[#344054]">Included Features:</p>
                        <div className="mt-2 flex flex-wrap gap-2">
                            {pricingPlan.features.map((feature) => (
                                <span
                                    key={feature}
                                    className="rounded-full border border-[#D0D5DD] bg-white px-3 py-1 text-xs font-medium text-[#344054]"
                                >
                                    {feature}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="mt-4 flex items-start justify-between gap-4">
                        <div>
                            <p className="text-xs font-semibold text-[#101828]">Dispatch Fee % (Deduction)</p>
                            <p className="mt-1 text-[11px] text-[#2563EB]">
                                Amount to deduct from load rate for your dispatch services
                            </p>
                        </div>
                        <p className="text-xs font-semibold text-[#2563EB]">
                            {pricingPlan.dispatchFeePercent}% default
                        </p>
                    </div>
                </div>
            ) : (
                <div className="mt-4">
                    <label className="text-xs font-semibold text-[#344054]" htmlFor="invoice-pricing-plan">
                        Pricing Plan
                    </label>
                    <input
                        id="invoice-pricing-plan"
                        value={pricingPlan.name}
                        readOnly
                        className="mt-2 h-10 w-full rounded-lg border border-[#D7DDE8] bg-white px-3 text-sm text-[#667085] outline-none"
                    />
                </div>
            )}

            <div className="mt-4">
                <label className="text-xs font-semibold text-[#344054]" htmlFor="invoice-total-due">
                    Total Due
                </label>
                <input
                    id="invoice-total-due"
                    value={formatCurrency(hasCarrier ? totalDue : selectedRevenue)}
                    readOnly
                    className="mt-2 h-10 w-full rounded-lg border border-[#D7DDE8] bg-white px-3 text-sm text-[#101828] outline-none"
                />
                <p className="mt-2 text-[11px] text-[#2563EB]">
                    Calculated automatically: Total Selected Revenue - Dispatch Fee
                </p>
            </div>
        </section>
    );
}
