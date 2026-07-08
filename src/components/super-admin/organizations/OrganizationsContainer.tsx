"use client";

import type { ChangeEvent } from "react";
import { useMemo, useState } from "react";
import { Plus } from "lucide-react";
import SearchInput from "@/src/components/ui/input/searchInput/SearchInput";
import CreateOrganizationModal from "./CreateOrganizationModal";
import OrganizationInformationModal from "./OrganizationInformationModal";
import OrganizationTable from "./OrganizationTable";
import {
    ORGANIZATIONS_PAGE_SIZE,
    organizationsMockData,
} from "./organizationMockData";
import type {
    CreateOrganizationFormValues,
    OrganizationRecord,
} from "./organizationTypes";

export default function OrganizationsContainer() {
    const [query, setQuery] = useState("");
    const [page, setPage] = useState(1);
    const [selectedOrganization, setSelectedOrganization] =
        useState<OrganizationRecord | null>(null);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    const filteredOrganizations = useMemo(() => {
        const normalizedQuery = query.trim().toLowerCase();

        return [...organizationsMockData]
            .filter((organization) => {
                if (!normalizedQuery) {
                    return true;
                }

                return [
                    organization.companyName,
                    organization.adminName,
                    organization.phoneNumber,
                    organization.adminEmail,
                    organization.businessAddress,
                    organization.status,
                ]
                    .join(" ")
                    .toLowerCase()
                    .includes(normalizedQuery);
            })
            .sort((firstOrganization, secondOrganization) => {
                const firstDate = new Date(firstOrganization.createdAt).getTime();
                const secondDate = new Date(secondOrganization.createdAt).getTime();

                return secondDate - firstDate;
            });
    }, [query]);

    const totalPages = Math.max(
        Math.ceil(filteredOrganizations.length / ORGANIZATIONS_PAGE_SIZE),
        1,
    );
    const currentPage = Math.min(page, totalPages);
    const paginatedOrganizations = filteredOrganizations.slice(
        (currentPage - 1) * ORGANIZATIONS_PAGE_SIZE,
        currentPage * ORGANIZATIONS_PAGE_SIZE,
    );

    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
        setPage(1);
    };

    const handleSubmitInvitation = (values: CreateOrganizationFormValues) => {
        console.log("Create organization invitation", values);
        setIsCreateModalOpen(false);
    };

    return (
        <>
            <section className="rounded-lg border border-[#D8DDE8] bg-white p-4 text-[#101828] sm:p-5">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <h1 className="text-xl font-semibold leading-7 text-[#101828]">
                        All Organization
                    </h1>

                    <button
                        type="button"
                        onClick={() => setIsCreateModalOpen(true)}
                        className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-[#2E3A83] px-5 text-sm font-semibold text-white transition hover:bg-[#25306F]"
                    >
                        <Plus className="h-4 w-4" />
                        Create an Organization
                    </button>
                </div>

                <div className="mt-4">
                    <SearchInput
                        value={query}
                        onChange={handleSearchChange}
                        placeholder="Search by name"
                        containerClassName="w-full"
                        inputClassName="h-11 rounded-md border-[#D7DDE8] bg-[#F8FAFB] pl-10 text-sm text-[#101828] shadow-none placeholder:text-[#98A2B3] focus:border-[#C9D3E0] focus:bg-white focus:ring-0"
                    />
                </div>

                <div className="mt-2">
                    <OrganizationTable
                        organizations={paginatedOrganizations}
                        currentPage={currentPage}
                        totalPages={totalPages}
                        totalItems={filteredOrganizations.length}
                        pageSize={ORGANIZATIONS_PAGE_SIZE}
                        onPageChange={setPage}
                        onViewOrganization={setSelectedOrganization}
                    />
                </div>
            </section>

            <OrganizationInformationModal
                isOpen={Boolean(selectedOrganization)}
                organization={selectedOrganization}
                onClose={() => setSelectedOrganization(null)}
            />

            {isCreateModalOpen ? (
                <CreateOrganizationModal
                    isOpen={isCreateModalOpen}
                    onClose={() => setIsCreateModalOpen(false)}
                    onSubmit={handleSubmitInvitation}
                />
            ) : null}
        </>
    );
}
