export type OrganizationStatus = "Active" | "Inactive";

export type OrganizationRecord = {
    id: string;
    companyName: string;
    adminName: string;
    phoneNumber: string;
    adminEmail: string;
    businessAddress: string;
    status: OrganizationStatus;
    createdAt: string;
};

export type CreateOrganizationFormValues = {
    companyName: string;
    adminName: string;
    adminEmail: string;
    temporaryPassword: string;
};
