"use client";

import { Skeleton } from "@/src/components/ui/skeleton";
import { PaginationMeta } from "@/src/types/dashboardTypes";
import { IDirectorRecentNoticeItem } from "@/src/types/undertaker/dashboardTypes";
import Pagination from "../tables/Pagination";

type AllArbutaryNoticeTableProps = {
    items?: IDirectorRecentNoticeItem[];
    meta?: PaginationMeta;
    isLoading?: boolean;
    isFetching?: boolean;
    onPageChange?: (page: number) => void;
    onSeeAll?: () => void;
};

const tableHeader = [
    "Deceased Person",
    "Town",
    "Country / Region",
    "Date Published",
];

const dateFormatter = new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
});

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

const toTitleCase = (value?: string | null) => {
    if (!value) {
        return "-";
    }

    return value
        .split("-")
        .flatMap((part) => part.split(" "))
        .filter(Boolean)
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
        .join(" ");
};

const getDisplayName = (item: IDirectorRecentNoticeItem) => {
    const fullName = [item.first_name, item.surname].filter(Boolean).join(" ").trim();

    if (item.nee?.trim()) {
        return `${fullName} (nee ${item.nee.trim()})`;
    }

    return fullName || "Unnamed notice";
};

function TableLoadingState() {
    return (
        <>
            {Array.from({ length: 5 }).map((_, index) => (
                <tr key={`notice-skeleton-${index}`} className={index % 2 === 1 ? "bg-[#FAFAFA]" : "bg-white"}>
                    {tableHeader.map((header) => (
                        <td key={`${header}-${index}`} className="px-4 py-4">
                            <Skeleton className="h-4 w-full max-w-[180px] bg-[#EEF2E8]" />
                        </td>
                    ))}
                </tr>
            ))}
        </>
    );
}

export default function AllArbutaryNoticeTable({
    items = [],
    meta,
    isLoading = false,
    isFetching = false,
    onPageChange,
    onSeeAll,
}: AllArbutaryNoticeTableProps) {
    const totalPages = Math.max(meta?.last_page ?? 1, 1);
    const currentPage = Math.min(Math.max(meta?.page ?? 1, 1), totalPages);
    const pageSize = meta?.limit ?? (items.length > 0 ? items.length : 1);

    return (
        <section
            className="
        w-full
        flex flex-col items-start gap-4
        p-6
        rounded-[0.75rem]
        border border-[#E9E9EA]
        bg-white
      "
        >
            <div className="w-full flex items-center justify-between gap-3">
                <div>
                    <h3 className="text-[1.625rem] font-medium text-[#161721]">
                        All Obituary Notices
                    </h3>
                    <p className="mt-1 text-[13px] text-[#667164]">
                        {meta?.total ?? items.length} notice{(meta?.total ?? items.length) === 1 ? "" : "s"} found
                    </p>
                </div>

                <button
                    type="button"
                    onClick={onSeeAll}
                    disabled={!onSeeAll}
                    className="
            rounded-lg border border-[#E9E9EA] bg-white
            px-3 py-2 text-[12px] font-medium text-gray-700
            transition hover:bg-gray-50
            disabled:cursor-not-allowed disabled:opacity-60
          "
                >
                    See All Notices
                </button>
            </div>

            <div className="w-full overflow-x-auto">
                <table className="w-full min-w-[720px] border-separate border-spacing-0">
                    <thead>
                        <tr className="bg-[#3F4A3B]">
                            {tableHeader.map((header) => (
                                <th
                                    key={header}
                                    className="
                    px-4 py-3 text-left
                    text-[1rem] font-medium text-white/90
                    first:rounded-l-[6px] last:rounded-r-[6px]
                  "
                                >
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody>
                        {isLoading ? (
                            <TableLoadingState />
                        ) : items.length > 0 ? (
                            items.map((item, index) => (
                                <tr key={item.id} className={index % 2 === 1 ? "bg-[#FAFAFA]" : "bg-white"}>
                                    <td className="px-4 py-4 text-[1rem] text-gray-700">
                                        {getDisplayName(item)}
                                    </td>
                                    <td className="px-4 py-4 text-[1rem] text-gray-700">
                                        {toTitleCase(item.town)}
                                    </td>
                                    <td className="px-4 py-4 text-[1rem] text-gray-700">
                                        {toTitleCase(item.country)}
                                    </td>
                                    <td className="px-4 py-4 text-[1rem] text-gray-700">
                                        {formatDate(item.created_at)}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={tableHeader.length} className="px-4 py-10 text-center text-[14px] text-[#667164]">
                                    No obituary notices found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className="w-full">
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    totalItems={meta?.total ?? items.length}
                    pageSize={pageSize}
                    itemLabel="notices"
                    disabled={isFetching || !onPageChange}
                    onPageChange={(page) => onPageChange?.(page)}
                    className="mt-0 border-t-0 pt-0"
                />
            </div>
        </section>
    );
}
