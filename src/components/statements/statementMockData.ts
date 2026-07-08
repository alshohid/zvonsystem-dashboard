import { StatementDataset, StatementRecord, StatementStatus } from "./statementTypes";

export const STATEMENT_PAGE_SIZE = 8;

const recipientOptions = [
    { value: "abc-transport", label: "ABC Transport Inc.", type: "carrier" as const },
    { value: "john-doe", label: "John Doe", type: "driver" as const },
    { value: "national-freight", label: "National Freight Co.", type: "carrier" as const },
    { value: "andrew-carter", label: "Andrew P. Carter", type: "driver" as const },
];

const loadOptions = [
    {
        id: "LD-2024-001",
        route: "Dallas, TX -> Chicago, IL",
        dateRange: "2024-03-01 - 2024-03-03",
        amount: 2500,
        loadedMiles: 932,
        deadheadMiles: 62,
        rate: 2500,
        assignedTo: "Kathryn Murphy",
    },
    {
        id: "LD-2024-002",
        route: "Houston, TX -> Atlanta, GA",
        dateRange: "2024-03-05 - 2024-03-07",
        amount: 2800,
        loadedMiles: 181,
        deadheadMiles: 62,
        rate: 2800,
        assignedTo: "Kathryn Murphy",
    },
    {
        id: "LD-2024-003",
        route: "Miami, FL -> New York, NY",
        dateRange: "2024-03-10 - 2024-03-12",
        amount: 3200,
        loadedMiles: 176,
        deadheadMiles: 62,
        rate: 3200,
        assignedTo: "John Doe",
    },
    {
        id: "LD-2024-004",
        route: "Dallas, TX -> Chicago, IL",
        dateRange: "2024-03-14 - 2024-03-16",
        amount: 2200,
        loadedMiles: 176,
        deadheadMiles: 62,
        rate: 2200,
        assignedTo: "Andrew P. Carter",
    },
];

const baseStatements: StatementRecord[] = [
    {
        id: "stm-001",
        statementNumber: "STM-2024-001",
        recipientId: "abc-transport",
        recipientName: "ABC Transport Inc.",
        recipientType: "carrier",
        period: "06/22/2025 - 07/22/2025",
        loads: 24,
        revenue: 2250,
        status: "Generated",
        createdAt: "2024-03-29",
    },
    {
        id: "stm-002",
        statementNumber: "STM-2024-002",
        recipientId: "john-doe",
        recipientName: "John Doe",
        recipientType: "driver",
        period: "06/22/2025 - 07/22/2025",
        loads: 43,
        revenue: 2250,
        status: "Reviewed",
        createdAt: "2024-03-28",
    },
    {
        id: "stm-003",
        statementNumber: "STM-2024-003",
        recipientId: "national-freight",
        recipientName: "National Freight Co.",
        recipientType: "carrier",
        period: "06/22/2025 - 07/22/2025",
        loads: 23,
        revenue: 2250,
        status: "Draft",
        createdAt: "2024-03-27",
    },
    {
        id: "stm-004",
        statementNumber: "STM-2024-004",
        recipientId: "andrew-carter",
        recipientName: "Andrew P. Carter",
        recipientType: "driver",
        period: "06/22/2025 - 07/22/2025",
        loads: 12,
        revenue: 2250,
        status: "Downloaded",
        createdAt: "2024-03-26",
    },
    {
        id: "stm-005",
        statementNumber: "STM-2024-005",
        recipientId: "abc-transport",
        recipientName: "ABC Transport Inc.",
        recipientType: "carrier",
        period: "06/22/2025 - 07/22/2025",
        loads: 33,
        revenue: 2250,
        status: "Generated",
        createdAt: "2024-03-25",
    },
    {
        id: "stm-006",
        statementNumber: "STM-2024-006",
        recipientId: "john-doe",
        recipientName: "John Doe",
        recipientType: "driver",
        period: "06/15/2025 - 06/21/2025",
        loads: 28,
        revenue: 2140,
        status: "Generated",
        createdAt: "2024-03-24",
    },
    {
        id: "stm-007",
        statementNumber: "STM-2024-007",
        recipientId: "national-freight",
        recipientName: "National Freight Co.",
        recipientType: "carrier",
        period: "06/15/2025 - 06/21/2025",
        loads: 19,
        revenue: 1980,
        status: "Draft",
        createdAt: "2024-03-23",
    },
    {
        id: "stm-008",
        statementNumber: "STM-2024-008",
        recipientId: "andrew-carter",
        recipientName: "Andrew P. Carter",
        recipientType: "driver",
        period: "06/15/2025 - 06/21/2025",
        loads: 37,
        revenue: 2890,
        status: "Reviewed",
        createdAt: "2024-03-22",
    },
];

const statusCycle: StatementStatus[] = ["Generated", "Reviewed", "Draft", "Downloaded"];

function createStatementPageData(total = 40) {
    return Array.from({ length: total }, (_, index) => {
        const base = baseStatements[index % baseStatements.length];
        const sequence = index + 1;

        return {
            ...base,
            id: `stm-generated-${sequence}`,
            statementNumber: `STM-2024-${String(sequence).padStart(3, "0")}`,
            loads: base.loads + (index % 6),
            revenue: base.revenue + (index % 5) * 120,
            status: statusCycle[index % statusCycle.length],
            createdAt: `2024-03-${String(29 - (index % 20)).padStart(2, "0")}`,
        };
    });
}

export const dispatcherStatementDataset: StatementDataset = {
    summary: {
        revenue: 2340,
        billingPeriods: 0,
        totalLoads: 457,
    },
    statements: createStatementPageData(),
    recipientOptions,
    loadOptions,
    reportedTotalItems: 473,
};

export const adminStatementDataset: StatementDataset = {
    ...dispatcherStatementDataset,
    summary: {
        revenue: 8240,
        billingPeriods: 3,
        totalLoads: 1280,
    },
};

export const superAdminStatementDataset: StatementDataset = {
    ...dispatcherStatementDataset,
    summary: {
        revenue: 18240,
        billingPeriods: 7,
        totalLoads: 3420,
    },
};
