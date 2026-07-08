export type DispatcherDetailTab = "dispatcher-info" | "carriers" | "loads-revenue";

export type DispatcherCarrierRecord = {
    id: string;
    name: string;
    initials: string;
    dbaName: string;
    mcNumber: string;
    dotNumber: string;
    pricingPlan: string;
    contact: string;
    address: string;
    createdAt: string;
    email?: string;
    phone?: string;
    activeLoads: number;
    totalRevenue: string;
    documents: CarrierDocumentRecord[];
};

export type CarrierDocumentRecord = {
    id: string;
    label: string;
    fileName: string;
    meta: string;
    required?: boolean;
};

export type DispatcherLoadRecord = {
    id: string;
    loadNumber: string;
    dateRange: string;
    route: string;
    assignedTo: string;
    assignedToPhone: string;
    carrier: string;
    dispatchFeePercentage: string;
    miles: string;
    dispatcherEarning: string;
    revenue: string;
};

export type DispatcherDetailsRecord = {
    id: string;
    name: string;
    role: string;
    email: string;
    phone: string;
    address: string;
    status: "Active" | "Suspended";
    avatarUrl: string;
    joinedAt: string;
    totalCarriers: number;
    totalCompletedLoads: number;
    totalMiles: string;
    totalRevenue: string;
    totalDispatcherRevenue: string;
    carriers: DispatcherCarrierRecord[];
    loads: DispatcherLoadRecord[];
};
