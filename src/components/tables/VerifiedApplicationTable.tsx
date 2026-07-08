"use client";

import { getErrorMessage } from "@/src/lib/getErrorMessage";
import { useGetAllUndertakerForAdminVerificationQuery } from "@/src/redux/features/admin/udertakerVerification/undertakerVerification";
import { IAdminUserItem } from "@/src/types/adminVerificationForUndertakerTypes";
import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import StatusNotice from "../ui/StatusNotice";
import Pagination from "./Pagination";
import ReusableTable from "./ReusableTable";

const PAGE_SIZE = 10;
const tableHeader = [
    "Funeral House",
    "Email",
    "Primary Contact",
    "Business Phone",
    "Submitted On",
    "Verified On",
    "Status",
];

type StatusType = "Verified" | "Pending" | "Rejected";

const dateFormatter = new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
});

function StatusPill({ status }: { status: StatusType }) {
    const styles: Record<StatusType, string> = {
        Verified: "bg-[#D7F2E8] text-[#0F7A57]",
        Pending: "bg-[#FFE89A] text-[#7A5A00]",
        Rejected: "bg-[#F7B7BE] text-[#7A0F1D]",
    };

    const dotColors: Record<StatusType, string> = {
        Verified: "bg-[#0F7A57]",
        Pending: "bg-[#7A5A00]",
        Rejected: "bg-[#7A0F1D]",
    };

    return (
        <span
            className={[
                "inline-flex items-center gap-2 rounded-md px-3 py-1 text-[1rem] font-medium",
                styles[status],
            ].join(" ")}
        >
            {status}
            <span className={["h-2 w-2 rounded-full", dotColors[status]].join(" ")} />
        </span>
    );
}

const formatDate = (value?: string | null) => {
    if (!value) {
        return "-";
    }

    const parsedDate = new Date(value);

    if (Number.isNaN(parsedDate.getTime())) {
        return "-";
    }

    return dateFormatter.format(parsedDate);
};

const mapStatusLabel = (status: IAdminUserItem["approval_status"]): StatusType => {
    if (status === "approved") {
        return "Verified";
    }

    if (status === "rejected") {
        return "Rejected";
    }

    return "Pending";
};

export default function VerifiedApplicationTable() {
    const [currentPage, setCurrentPage] = useState(1);
    const router = useRouter();

    const {
        data: undertakerResponse,
        error,
        isLoading,
        isFetching,
    } = useGetAllUndertakerForAdminVerificationQuery({
        page: currentPage,
        limit: PAGE_SIZE,
        type: "director",
        approval_status: "approved",
    });

    const applications = undertakerResponse?.success ? undertakerResponse.data : [];
    const listErrorMessage = error
        ? getErrorMessage(error, "Failed to load verified undertaker applications.")
        : "";

    useEffect(() => {
        if (undertakerResponse?.lastPage && currentPage > undertakerResponse.lastPage) {
            setCurrentPage(undertakerResponse.lastPage);
        }
    }, [currentPage, undertakerResponse?.lastPage]);

    const rowRenderers: ((item: IAdminUserItem, index: number) => ReactNode)[] = [
        (item) => <span className="text-[1rem] text-gray-700">{item.name || "-"}</span>,
        (item) => <span className="text-[1rem] text-gray-700">{item.email || "-"}</span>,
        (item) => <span className="text-[1rem] text-gray-700">{item.primary_contact || "-"}</span>,
        (item) => <span className="text-[1rem] text-gray-700">{item.business_phone || "-"}</span>,
        (item) => <span className="text-[1rem] text-gray-700">{formatDate(item.created_at)}</span>,
        (item) => <span className="text-[1rem] text-gray-700">{formatDate(item.approved_at)}</span>,
        (item) => (
            <div className="relative flex justify-end">
                <StatusPill status={mapStatusLabel(item.approval_status)} />
            </div>
        ),
    ];

    const handlePageChange = (page: number) => {
        if (!undertakerResponse?.lastPage) {
            setCurrentPage(page);
            return;
        }

        setCurrentPage(Math.min(Math.max(page, 1), undertakerResponse.lastPage));
    };

    return (
        <section className="w-full">
            <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h3 className="text-[1rem] font-medium text-[#161721]">View Verified Applications</h3>
                    <p className="mt-1 text-[13px] text-[#667164]">Showing approved undertaker applications only.</p>
                </div>
            </div>

            {listErrorMessage ? (
                <StatusNotice
                    variant="error"
                    title="Unable To Load Verified Applications"
                    message={listErrorMessage}
                    className="mb-4"
                />
            ) : null}

            <div className="w-full overflow-x-auto">
                <ReusableTable<IAdminUserItem>
                    tableHeader={tableHeader}
                    items={applications}
                    rowRenderers={rowRenderers}
                    getRowKey={(row) => row.id}
                    minTableWidthPx={1180}
                    isLoading={isLoading && !undertakerResponse}
                    emptyText="No verified undertaker applications found."
                    onRowClick={(item) => router.push(`/admin/dashboard/undertaker-verification/${item.id}`)}
                    wrapperClassName="
            rounded-none border-0 bg-transparent shadow-none
            [&_tbody_tr:nth-child(even)]:bg-[#FAFAFA]
            [&_tbody_tr:nth-child(odd)]:bg-white
          "
                    headerCellClassName="
            bg-[#3F4A3B]
            px-4 py-3
            text-left
            text-[1rem] font-medium text-white/90
            first:rounded-l-[6px] last:rounded-r-[6px]
          "
                    bodyCellClassName="
            px-4 py-4
            text-left
            border-b border-black/5
          "
                />
            </div>

            <Pagination
                currentPage={undertakerResponse?.page ?? currentPage}
                totalPages={undertakerResponse?.lastPage ?? 1}
                totalItems={undertakerResponse?.total ?? applications.length}
                pageSize={undertakerResponse?.limit ?? PAGE_SIZE}
                itemLabel="verified applications"
                disabled={isFetching}
                onPageChange={handlePageChange}
            />
        </section>
    );
}
