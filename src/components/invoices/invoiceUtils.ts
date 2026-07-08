import { InvoiceLoadDetail, InvoicePricingPlan } from "./invoiceTypes";

export function formatCurrency(amount: number) {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
    }).format(amount);
}

export function getSelectedRevenue(loads: InvoiceLoadDetail[]) {
    return loads.reduce((total, load) => total + load.amount, 0);
}

export function getInvoiceTotalDue(
    loads: InvoiceLoadDetail[],
    pricingPlan: InvoicePricingPlan,
) {
    const selectedRevenue = getSelectedRevenue(loads);
    const dispatchFee = selectedRevenue * (pricingPlan.dispatchFeePercent / 100);

    return Math.max(selectedRevenue - dispatchFee, 0);
}

export function parseInvoiceDate(value: string) {
    if (!value || value === "-") {
        return 0;
    }

    const parsed = new Date(value).getTime();
    return Number.isNaN(parsed) ? 0 : parsed;
}
