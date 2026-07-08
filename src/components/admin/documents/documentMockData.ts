import {
    DocumentColumn,
    DocumentRecord,
    RequestDocumentItem,
    TabKey,
    UserInformationItem,
} from "./documentTypes";

export const PAGE_SIZE = 8;

export const adminDocumentColumns: DocumentColumn[] = [
    { key: "carrier", label: "Carrier" },
    { key: "dispatcher", label: "Dispatcher" },
    { key: "type", label: "Type" },
    { key: "document", label: "Document" },
    { key: "date", label: "Date" },
    { key: "status", label: "Status" },
    { key: "actions", label: "" },
];

export const dispatcherDocumentColumns: DocumentColumn[] = [
    { key: "loadNumber", label: "Load Number" },
    { key: "type", label: "Type" },
    { key: "document", label: "Document" },
    { key: "date", label: "Date" },
    { key: "status", label: "Status" },
    { key: "actions", label: "" },
];

export const carrierDocuments: DocumentRecord[] = [
    {
        id: "carrier-001",
        carrier: "Swift Freight Solutions",
        dispatcher: "John Doe",
        type: "Carrier Contract",
        document: "POD.pdf",
        date: "2024-03-29",
        status: "Approved",
    },
    {
        id: "carrier-002",
        carrier: "Swift Freight Solutions",
        dispatcher: "John Doe",
        type: "Limited Power of Attorney",
        document: "BOL - Bill of Lading",
        date: "2024-03-29",
        status: "Pending",
    },
    {
        id: "carrier-003",
        carrier: "Swift Freight Solutions",
        dispatcher: "John Doe",
        type: "Notice of Assignment",
        document: "Rate_Confirmation.PDF",
        date: "2024-03-29",
        status: "Approved",
    },
    {
        id: "carrier-004",
        carrier: "Swift Freight Solutions",
        dispatcher: "John Doe",
        type: "Scale Ticket",
        document: "Scale_Ticket.PDF",
        date: "2024-03-29",
        status: "Pending",
    },
    {
        id: "carrier-005",
        carrier: "Swift Freight Solutions",
        dispatcher: "John Doe",
        type: "Inspection Report",
        document: "Inspection_Report.PDF",
        date: "2024-03-29",
        status: "Rejected",
    },
    {
        id: "carrier-006",
        carrier: "Northline Logistics",
        dispatcher: "Maya Chen",
        type: "W-9 Form",
        document: "W9_Northline.pdf",
        date: "2024-03-25",
        status: "Approved",
    },
    {
        id: "carrier-007",
        carrier: "Blue Ridge Haulers",
        dispatcher: "Ethan Clark",
        type: "Insurance Certificate",
        document: "Certificate_Insurance.pdf",
        date: "2024-03-18",
        status: "Pending",
    },
    {
        id: "carrier-008",
        carrier: "Atlas Cargo Group",
        dispatcher: "Sophia Lee",
        type: "Carrier Packet",
        document: "Carrier_Packet.pdf",
        date: "2024-03-12",
        status: "Approved",
    },
    {
        id: "carrier-009",
        carrier: "Prime Route Transport",
        dispatcher: "Daniel Kim",
        type: "Factoring Notice",
        document: "Factoring_Notice.pdf",
        date: "2024-02-27",
        status: "Rejected",
    },
    {
        id: "carrier-010",
        carrier: "Harbor Lane Freight",
        dispatcher: "Ava Morgan",
        type: "Dispatch Agreement",
        document: "Dispatch_Agreement.pdf",
        date: "2024-02-20",
        status: "Approved",
    },
];

export const driverOnboardingDocuments: DocumentRecord[] = [
    {
        id: "driver-001",
        carrier: "Swift Freight Solutions",
        dispatcher: "John Doe",
        type: "CDL License",
        document: "CDL_License.pdf",
        date: "2024-04-03",
        status: "Approved",
    },
    {
        id: "driver-002",
        carrier: "Northline Logistics",
        dispatcher: "Maya Chen",
        type: "Medical Card",
        document: "Medical_Card.pdf",
        date: "2024-04-01",
        status: "Pending",
    },
    {
        id: "driver-003",
        carrier: "Blue Ridge Haulers",
        dispatcher: "Ethan Clark",
        type: "Driver Application",
        document: "Driver_Application.pdf",
        date: "2024-03-30",
        status: "Approved",
    },
    {
        id: "driver-004",
        carrier: "Atlas Cargo Group",
        dispatcher: "Sophia Lee",
        type: "MVR Report",
        document: "MVR_Report.pdf",
        date: "2024-03-28",
        status: "Rejected",
    },
    {
        id: "driver-005",
        carrier: "Prime Route Transport",
        dispatcher: "Daniel Kim",
        type: "Drug Test Result",
        document: "Drug_Test_Result.pdf",
        date: "2024-03-22",
        status: "Pending",
    },
    {
        id: "driver-006",
        carrier: "Harbor Lane Freight",
        dispatcher: "Ava Morgan",
        type: "Employment Verification",
        document: "Employment_Verification.pdf",
        date: "2024-03-16",
        status: "Approved",
    },
    {
        id: "driver-007",
        carrier: "Summit Roadways",
        dispatcher: "Noah Patel",
        type: "Safety Certificate",
        document: "Safety_Certificate.pdf",
        date: "2024-03-09",
        status: "Pending",
    },
    {
        id: "driver-008",
        carrier: "Metro Line Freight",
        dispatcher: "Lily Brooks",
        type: "I-9 Form",
        document: "I9_Form.pdf",
        date: "2024-03-01",
        status: "Approved",
    },
    {
        id: "driver-009",
        carrier: "Canyon State Carriers",
        dispatcher: "Owen Rivera",
        type: "Road Test Certificate",
        document: "Road_Test_Certificate.pdf",
        date: "2024-02-23",
        status: "Rejected",
    },
];

export const dispatcherLoadDocuments: DocumentRecord[] = [
    {
        id: "load-001",
        loadNumber: "20241215-001",
        carrier: "Swift Freight Solutions",
        dispatcher: "John Doe",
        type: "POD - Proof of Delivery",
        document: "POD.pdf",
        date: "2024-03-29",
        status: "Approved",
    },
    {
        id: "load-002",
        loadNumber: "20241215-002",
        carrier: "Swift Freight Solutions",
        dispatcher: "John Doe",
        type: "BOL - Bill of Lading",
        document: "BOL - Bill of Lading",
        date: "2024-03-29",
        status: "Pending",
    },
    {
        id: "load-003",
        loadNumber: "20241215-003",
        carrier: "Swift Freight Solutions",
        dispatcher: "John Doe",
        type: "Rate Confirmation",
        document: "Rate_Confirmation.PDF",
        date: "2024-03-29",
        status: "Approved",
    },
    {
        id: "load-004",
        loadNumber: "20241215-004",
        carrier: "Swift Freight Solutions",
        dispatcher: "John Doe",
        type: "Scale Ticket",
        document: "Scale_Ticket.PDF",
        date: "2024-03-29",
        status: "Pending",
    },
    {
        id: "load-005",
        loadNumber: "20241215-005",
        carrier: "Swift Freight Solutions",
        dispatcher: "John Doe",
        type: "Inspection Report",
        document: "Inspection_Report.PDF",
        date: "2024-03-29",
        status: "Rejected",
    },
    {
        id: "load-006",
        loadNumber: "20241215-006",
        carrier: "Northline Logistics",
        dispatcher: "Maya Chen",
        type: "Fuel Receipt",
        document: "Fuel_Receipt.pdf",
        date: "2024-03-27",
        status: "Approved",
    },
    {
        id: "load-007",
        loadNumber: "20241215-007",
        carrier: "Blue Ridge Haulers",
        dispatcher: "Ethan Clark",
        type: "Lumper Receipt",
        document: "Lumper_Receipt.pdf",
        date: "2024-03-24",
        status: "Pending",
    },
    {
        id: "load-008",
        loadNumber: "20241215-008",
        carrier: "Atlas Cargo Group",
        dispatcher: "Sophia Lee",
        type: "Detention Request",
        document: "Detention_Request.pdf",
        date: "2024-03-21",
        status: "Approved",
    },
];

export const dispatcherCarrierDocuments: DocumentRecord[] = [
    {
        id: "dispatcher-carrier-001",
        carrier: "Swift Freight Solutions",
        dispatcher: "John Doe",
        type: "Carrier Contract",
        document: "Carrier_Contract.pdf",
        date: "2024-03-29",
        status: "Approved",
    },
    {
        id: "dispatcher-carrier-002",
        carrier: "Swift Freight Solutions",
        dispatcher: "John Doe",
        type: "Certificate of Insurance",
        document: "Certificate_Insurance.pdf",
        date: "2024-03-29",
        status: "Pending",
    },
    {
        id: "dispatcher-carrier-003",
        carrier: "Northline Logistics",
        dispatcher: "Maya Chen",
        type: "MC Authority",
        document: "MC_Authority.pdf",
        date: "2024-03-25",
        status: "Approved",
    },
    {
        id: "dispatcher-carrier-004",
        carrier: "Blue Ridge Haulers",
        dispatcher: "Ethan Clark",
        type: "W-9",
        document: "W9.pdf",
        date: "2024-03-18",
        status: "Pending",
    },
    {
        id: "dispatcher-carrier-005",
        carrier: "Atlas Cargo Group",
        dispatcher: "Sophia Lee",
        type: "Trucker Intake Survey",
        document: "Trucker_Intake_Survey.pdf",
        date: "2024-03-12",
        status: "Rejected",
    },
];

export const adminDocumentsByTab: Partial<Record<TabKey, DocumentRecord[]>> = {
    "carrier-documents": carrierDocuments,
    "driver-onboarding": driverOnboardingDocuments,
};

export const dispatcherDocumentsByTab: Partial<Record<TabKey, DocumentRecord[]>> = {
    "load-documents": dispatcherLoadDocuments,
    "carrier-documents": dispatcherCarrierDocuments,
};

export const requestDocumentOptions: RequestDocumentItem[] = [
    {
        id: "notice-of-assignment",
        label: "Notice of Assignment",
        required: true,
        selected: true,
    },
    {
        id: "void-check",
        label: "Void Check",
        required: true,
    },
];

export function getDocumentsByTab(tab: string) {
    return adminDocumentsByTab[tab as TabKey] ?? carrierDocuments;
}

export function getUserInformationItems(
    document: DocumentRecord,
    userType: string,
): UserInformationItem[] {
    return [
        { label: "User type", value: userType },
        { label: "Full Name", value: document.dispatcher },
        { label: "Carrier", value: document.carrier },
        { label: "MC Number", value: "MC123456" },
        { label: "DOT Number", value: document.carrier },
    ];
}
