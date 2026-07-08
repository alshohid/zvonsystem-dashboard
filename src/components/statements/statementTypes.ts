export type StatementStatus = "Generated" | "Draft" | "Reviewed" | "Downloaded";
export type StatementStatusFilterValue = "all" | "generated" | "draft" | "reviewed" | "downloaded";
export type StatementSortValue = "newest" | "oldest";

export type StatementSummary = {
    revenue: number;
    billingPeriods: number;
    totalLoads: number;
};

export type StatementRecipientOption = {
    value: string;
    label: string;
    type: "carrier" | "driver";
};

export type StatementRecord = {
    id: string;
    statementNumber: string;
    recipientId: string;
    recipientName: string;
    recipientType: "carrier" | "driver";
    period: string;
    loads: number;
    revenue: number;
    status: StatementStatus;
    createdAt: string;
};

export type StatementLoadOption = {
    id: string;
    route: string;
    dateRange: string;
    amount: number;
    loadedMiles: number;
    deadheadMiles: number;
    rate: number;
    assignedTo: string;
};

export type StatementDataset = {
    summary: StatementSummary;
    statements: StatementRecord[];
    recipientOptions: StatementRecipientOption[];
    loadOptions: StatementLoadOption[];
    reportedTotalItems?: number;
};

export type StatementFormValues = {
    statementNumber: string;
    recipientId: string;
    period: string;
    loads: number;
    revenue: number;
    status: StatementStatus;
};

export type StatementType = "carrier" | "driver";

export type StatementGenerationFormState = {
    statementType: StatementType;
    carrierId: string;
    driverId: string;
    startDate: string;
    endDate: string;
    selectedLoadIds: string[];
};

export type StatementGenerationStep = 1 | 2 | 3 | 4;
