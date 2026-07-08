"use client";

import { Eye } from "lucide-react";
import ReusablePagination from "@/src/components/tables/ReusablePagination";
import ReusableTable from "@/src/components/tables/ReusableTable";
import OrganizationStatusBadge from "./OrganizationStatusBadge";
import type { OrganizationRecord } from "./organizationTypes";

type OrganizationTableProps = {
    organizations: OrganizationRecord[];
    currentPage: number;
    totalPages: number;
    totalItems: number;
    pageSize: number;
    onPageChange: (page: number) => void;
    onViewOrganization: (organization: OrganizationRecord) => void;
};

const tableHeader = [
    "ID",
    "Company Name",
    "Admin Name",
    "Phone Number",
    "Admin Email Address",
    "Business Address",
    "Status",
    "",
];

function getInitials(value: string) {
    return value
        .split(/\s+/)
        .filter(Boolean)
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();
}

export default function OrganizationTable({
    organizations,
    currentPage,
    totalPages,
    totalItems,
    pageSize,
    onPageChange,
    onViewOrganization,
}: OrganizationTableProps) {
    return (
        <div className="overflow-hidden rounded-lg border border-[#E4E7EC] bg-white">
            <ReusableTable<OrganizationRecord>
                tableHeader={tableHeader}
                items={organizations}
                getRowKey={(organization) => organization.id}
                minTableWidthPx={980}
                wrapperClassName="rounded-none border-0 bg-transparent shadow-none"
                tableClassName="w-full border-separate border-spacing-0"
                tableHeaderClassName="border-b border-[#EAECF0] bg-[#F8FAFC]"
                tableBodyClassName="divide-y-0"
                headerCellClassName="border-b border-[#EAECF0] px-3 py-3 text-left text-[13px] font-medium leading-4 text-[#667085] [&_span]:!text-[13px] [&_span]:!font-medium"
                bodyCellClassName="border-b border-[#EAECF0] px-3 py-4 align-middle text-sm leading-5 text-[#101828]"
                rowClassName="bg-white transition hover:bg-[#FCFCFD]"
                emptyText="No organizations matched the current filters."
                emptyCellClassName="block px-5 py-16 text-center text-sm text-[#667085]"
                rowRenderers={[
                    (organization) => (
                        <span className="whitespace-nowrap text-[#344054]">
                            {organization.id}
                        </span>
                    ),
                    (organization) => (
                        <div className="flex min-w-[150px] items-center gap-3">
                            <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#EAECF0] text-[11px] font-medium text-[#344054]">
                                {getInitials(organization.companyName)}
                            </span>
                            <span className="max-w-[150px] whitespace-normal font-medium text-[#101828]">
                                {organization.companyName}
                            </span>
                        </div>
                    ),
                    (organization) => (
                        <span className="whitespace-nowrap text-[#101828]">
                            {organization.adminName}
                        </span>
                    ),
                    (organization) => (
                        <span className="whitespace-nowrap text-[#101828]">
                            {organization.phoneNumber}
                        </span>
                    ),
                    (organization) => (
                        <span className="block max-w-[150px] break-words text-[#101828]">
                            {organization.adminEmail}
                        </span>
                    ),
                    (organization) => (
                        <span className="block max-w-[150px] whitespace-normal text-[#101828]">
                            {organization.businessAddress}
                        </span>
                    ),
                    (organization) => <OrganizationStatusBadge status={organization.status} />,
                    (organization) => (
                        <div className="flex justify-end">
                            <button
                                type="button"
                                onClick={() => onViewOrganization(organization)}
                                className="inline-flex h-9 w-9 items-center justify-center rounded-full text-[#344054] transition hover:bg-[#F2F4F7] hover:text-[#2E3A83]"
                                aria-label={`View ${organization.companyName}`}
                            >
                                <Eye size={17} />
                            </button>
                        </div>
                    ),
                ]}
            />

            <ReusablePagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={totalItems}
                pageSize={pageSize}
                onPageChange={onPageChange}
                itemLabel="results"
                className="px-4 py-5"
            />
        </div>
    );
}
