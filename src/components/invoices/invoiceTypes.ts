export type InvoiceStatus = "Paid" | "Pending" | "Overdue" | "Draft";
export type InvoiceStatusFilterValue = "all" | "paid" | "pending" | "overdue" | "draft";
export type InvoiceSortValue = "newest" | "oldest";

export type BillingCycleInfo = {
    title: string;
    cadence: string;
    dateRange: string;
    endsLabel: string;
    daysRemaining: number;
};

export type CarrierOption = {
    value: string;
    label: string;
};

export type InvoiceLoadDetail = {
    id: string;
    dateRange: string;
    route: string;
    assignedTo: string;
    amount: number;
};

export type InvoicePricingPlan = {
    name: string;
    billingCycle: string;
    billingDay: string;
    dispatchFeePercent: number;
    features: string[];
};

export type InvoiceRecord = {
    id: string;
    invoiceNumber: string;
    carrierId: string;
    carrierName: string;
    billingCycle: string;
    startDate: string;
    endDate: string;
    dateCreated: string;
    totalDue: number;
    status: InvoiceStatus;
    loads: InvoiceLoadDetail[];
    pricingPlan: InvoicePricingPlan;
    notes?: string;
};

export type InvoiceDataset = {
    billingCycle: BillingCycleInfo;
    invoices: InvoiceRecord[];
    carrierOptions: CarrierOption[];
    loadDetailsByCarrier: Record<string, InvoiceLoadDetail[]>;
    pricingPlan: InvoicePricingPlan;
};

export type InvoiceFormValues = {
    invoiceNumber: string;
    carrierId: string;
    startDate: string;
    endDate: string;
    notes: string;
};
