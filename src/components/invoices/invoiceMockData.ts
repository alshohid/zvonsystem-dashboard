import { InvoiceDataset, InvoiceLoadDetail, InvoicePricingPlan, InvoiceRecord } from "./invoiceTypes";
import { getInvoiceTotalDue } from "./invoiceUtils";

export const INVOICE_PAGE_SIZE = 8;

const defaultPricingPlan: InvoicePricingPlan = {
    name: "Pro Plan",
    billingCycle: "Weekly",
    billingDay: "Monday",
    dispatchFeePercent: 10,
    features: [
        "Driver Recruiting",
        "Permits & IFTA Filing",
        "Financial Metrics",
    ],
};

const abcLoads: InvoiceLoadDetail[] = [
    {
        id: "LD-2024-001",
        dateRange: "2024-03-01 - 2024-03-03",
        route: "Dallas, TX -> Chicago, IL",
        assignedTo: "Kathryn Murphy (34245)",
        amount: 2500,
    },
    {
        id: "LD-2024-002",
        dateRange: "2024-03-01 - 2024-03-03",
        route: "Dallas, TX -> Chicago, IL",
        assignedTo: "Kathryn Murphy (34245)",
        amount: 2800,
    },
    {
        id: "LD-2024-003",
        dateRange: "2024-03-01 - 2024-03-03",
        route: "Dallas, TX -> Chicago, IL",
        assignedTo: "Kathryn Murphy (34245)",
        amount: 2800,
    },
    {
        id: "LD-2024-004",
        dateRange: "2024-03-01 - 2024-03-03",
        route: "Dallas, TX -> Chicago, IL",
        assignedTo: "Kathryn Murphy (34245)",
        amount: 2600,
    },
];

const swiftLoads: InvoiceLoadDetail[] = [
    {
        id: "LD-2024-021",
        dateRange: "2024-03-05 - 2024-03-07",
        route: "Atlanta, GA -> Newark, NJ",
        assignedTo: "Robert Fox (34218)",
        amount: 2400,
    },
    {
        id: "LD-2024-022",
        dateRange: "2024-03-08 - 2024-03-10",
        route: "Newark, NJ -> Boston, MA",
        assignedTo: "Robert Fox (34218)",
        amount: 2600,
    },
    {
        id: "LD-2024-023",
        dateRange: "2024-03-11 - 2024-03-12",
        route: "Boston, MA -> Richmond, VA",
        assignedTo: "Theresa Webb (33701)",
        amount: 2100,
    },
];

const nationalLoads: InvoiceLoadDetail[] = [
    {
        id: "LD-2024-031",
        dateRange: "2024-03-03 - 2024-03-04",
        route: "Phoenix, AZ -> Denver, CO",
        assignedTo: "Darrell Steward (34102)",
        amount: 3100,
    },
    {
        id: "LD-2024-032",
        dateRange: "2024-03-06 - 2024-03-09",
        route: "Denver, CO -> Omaha, NE",
        assignedTo: "Darrell Steward (34102)",
        amount: 2750,
    },
];

const carrierOptions = [
    { value: "abc-transport", label: "ABC Transport Inc." },
    { value: "swift-logistics", label: "Swift Logistics LLC" },
    { value: "national-freight", label: "National Freight Co." },
];

const loadDetailsByCarrier = {
    "abc-transport": abcLoads,
    "swift-logistics": swiftLoads,
    "national-freight": nationalLoads,
};

function createInvoice(
    id: string,
    invoiceNumber: string,
    carrierId: keyof typeof loadDetailsByCarrier,
    dateCreated: string,
    status: InvoiceRecord["status"],
    totalDueOverride?: number,
): InvoiceRecord {
    const carrierName = carrierOptions.find((carrier) => carrier.value === carrierId)?.label ?? "";
    const loads = loadDetailsByCarrier[carrierId];

    return {
        id,
        invoiceNumber,
        carrierId,
        carrierName,
        billingCycle: "06/22/2025 - 07/22/2025",
        startDate: "06/22/2025",
        endDate: "07/22/2025",
        dateCreated,
        totalDue: totalDueOverride ?? getInvoiceTotalDue(loads, defaultPricingPlan),
        status,
        loads,
        pricingPlan: defaultPricingPlan,
        notes: "N/A",
    };
}

export const dispatcherInvoiceDataset: InvoiceDataset = {
    billingCycle: {
        title: "Current Billing Cycle",
        cadence: "Weekly",
        dateRange: "Mar 30 - Apr 5, 2026",
        endsLabel: "Ends in",
        daysRemaining: 6,
    },
    invoices: [
        createInvoice("dispatcher-inv-001", "INV-2024-001", "abc-transport", "2024-03-29", "Pending", 2250),
        createInvoice("dispatcher-inv-002", "INV-2024-002", "swift-logistics", "-", "Pending", 2250),
        createInvoice("dispatcher-inv-003", "INV-2024-003", "national-freight", "2024-03-29", "Paid", 2250),
        createInvoice("dispatcher-inv-004", "INV-2024-004", "swift-logistics", "2024-03-29", "Draft", 2250),
        createInvoice("dispatcher-inv-005", "INV-2024-005", "abc-transport", "2024-03-29", "Overdue", 2250),
        createInvoice("dispatcher-inv-006", "INV-2024-006", "national-freight", "2024-03-27", "Paid", 3225),
        createInvoice("dispatcher-inv-007", "INV-2024-007", "swift-logistics", "2024-03-24", "Pending", 2130),
        createInvoice("dispatcher-inv-008", "INV-2024-008", "abc-transport", "2024-03-21", "Paid", 9630),
    ],
    carrierOptions,
    loadDetailsByCarrier,
    pricingPlan: defaultPricingPlan,
};

export const adminInvoiceDataset: InvoiceDataset = {
    ...dispatcherInvoiceDataset,
    invoices: [
        createInvoice("admin-inv-001", "ADM-INV-001", "abc-transport", "2024-03-29", "Paid", 9630),
        createInvoice("admin-inv-002", "ADM-INV-002", "swift-logistics", "2024-03-27", "Pending", 6390),
        createInvoice("admin-inv-003", "ADM-INV-003", "national-freight", "2024-03-24", "Overdue", 5265),
    ],
};

export const superAdminInvoiceDataset: InvoiceDataset = {
    ...dispatcherInvoiceDataset,
    invoices: [
        createInvoice("super-admin-inv-001", "SA-INV-001", "abc-transport", "2024-03-29", "Paid", 9630),
        createInvoice("super-admin-inv-002", "SA-INV-002", "swift-logistics", "2024-03-26", "Pending", 6390),
        createInvoice("super-admin-inv-003", "SA-INV-003", "national-freight", "2024-03-22", "Draft", 5265),
    ],
};
