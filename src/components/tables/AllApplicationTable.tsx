"use client";

import { getErrorMessage } from "@/src/lib/getErrorMessage";
import { useGetAllUndertakerForAdminVerificationQuery } from "@/src/redux/features/admin/udertakerVerification/undertakerVerification";
import { IAdminUserItem } from "@/src/types/adminVerificationForUndertakerTypes";
import { ReactNode, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import SelectField, { SelectOption } from "../ui/input/searchInput/SelectField";
import StatusNotice from "../ui/StatusNotice";
import Pagination from "./Pagination";
import ReusableTable from "./ReusableTable";

const PAGE_SIZE = 10;
const tableHeader = ["Funeral House", "Region", "Submitted Date", "Attachment", "Action"];
const statusFilterOptions: SelectOption[] = [
    { label: "All Status", value: "all" },
    { label: "Pending", value: "pending" },
    { label: "Approved", value: "approved" },
    { label: "Rejected", value: "rejected" },
];

type ApprovalFilterValue = "all" | "pending" | "approved" | "rejected";

const dateFormatter = new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
});

function DotsIcon() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
                d="M12 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm7 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM5 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
                fill="currentColor"
            />
        </svg>
    );
}

function AttachmentBadge({ count, href }: { count: number; href?: string | null }) {
    const label = `${count} file${count === 1 ? "" : "s"}`;

    if (!href) {
        return (
            <span className="inline-flex items-center justify-center rounded bg-[#E9EEF5] px-2.5 py-1 text-[11px] font-semibold text-[#3F4A3B]">
                {label}
            </span>
        );
    }

    return (
        <a
            href={encodeURI(href)}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded bg-[#E9EEF5] px-2.5 py-1 text-[11px] font-semibold text-[#3F4A3B] transition hover:opacity-80"
        >
            {label}
        </a>
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

export default function AllApplicationTable() {
    const [statusFilter, setStatusFilter] = useState<ApprovalFilterValue>("all");
    const [currentPage, setCurrentPage] = useState(1);
    const [openId, setOpenId] = useState<string | null>(null);
    const menuRef = useRef<HTMLDivElement | null>(null);
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
        ...(statusFilter !== "all" ? { approval_status: statusFilter } : {}),
    });

    const applications = undertakerResponse?.success ? undertakerResponse.data : [];
    const listErrorMessage = error
        ? getErrorMessage(error, "Failed to load undertaker applications.")
        : "";

    useEffect(() => {
        setCurrentPage(1);
    }, [statusFilter]);

    useEffect(() => {
        if (undertakerResponse?.lastPage && currentPage > undertakerResponse.lastPage) {
            setCurrentPage(undertakerResponse.lastPage);
        }
    }, [currentPage, undertakerResponse?.lastPage]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (!menuRef.current) {
                return;
            }

            if (!menuRef.current.contains(event.target as Node)) {
                setOpenId(null);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const rowRenderers: ((item: IAdminUserItem, index: number) => ReactNode)[] = [
        (item) => <span className="text-[1rem] text-gray-700">{item.name || "-"}</span>,
        (item) => (
            <span className="block max-w-[300px] text-[1rem] leading-6 text-gray-700">
                {item.address || "-"}
            </span>
        ),
        (item) => <span className="text-[1rem] text-gray-700">{formatDate(item.created_at)}</span>,
        (item) => {
            const attachmentCount = item.exercise_documents?.length ?? 0;
            const attachmentHref = item.exercise_documents_url?.[0];

            return attachmentCount > 0 ? (
                <AttachmentBadge count={attachmentCount} href={attachmentHref} />
            ) : (
                <span className="text-[1rem] text-gray-500">N/A</span>
            );
        },
        (item) => (
            <div className="relative flex justify-center">
                <button
                    type="button"
                    onClick={() => setOpenId((previous) => (previous === item.id ? null : item.id))}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-md text-gray-700 transition hover:bg-gray-100"
                    aria-label="Row actions"
                >
                    <DotsIcon />
                </button>

                {openId === item.id ? (
                    <div
                        ref={menuRef}
                        className="absolute right-0 top-10 z-[50] w-[160px] overflow-hidden rounded-lg border border-[#E9E9EA] bg-white shadow-[0_11px_30px_rgba(0,0,0,0.16)]"
                    >
                        <button
                            type="button"
                            onClick={() => {
                                setOpenId(null);
                                router.push(`/admin/dashboard/undertaker-verification/${item.id}`);
                            }}
                            className="w-full px-4 py-2 text-left text-[12px] text-gray-700 hover:bg-gray-50"
                        >
                            View Detail
                        </button>
                    </div>
                ) : null}
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
            <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h3 className="text-[1rem] font-medium text-[#161721]">View All Applications</h3>

                <div className="w-full sm:w-[180px]">
                    <SelectField
                        options={statusFilterOptions}
                        placeholder="All Status"
                        value={statusFilter}
                        onChange={(value) => setStatusFilter((value || "all") as ApprovalFilterValue)}
                        selectClassName="
              h-10 !py-2
              bg-[#E7F2DD] border-[#E7F2DD]
              text-[#3F4A3B]
              focus:border-[#C3D4B3]
            "
                    />
                </div>
            </div>

            {listErrorMessage ? (
                <StatusNotice
                    variant="error"
                    title="Unable To Load Applications"
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
                    minTableWidthPx={980}
                    isLoading={isLoading && !undertakerResponse}
                    emptyText="No undertaker applications found."
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
                itemLabel="applications"
                disabled={isFetching}
                onPageChange={handlePageChange}
            />
        </section>
    );
}
