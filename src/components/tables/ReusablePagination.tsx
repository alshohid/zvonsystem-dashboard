"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

type ReusablePaginationProps = {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  itemLabel?: string;
  className?: string;
  /** Lets a page theme the selected page button without forking the component. */
  activeClassName?: string;
};

type PageToken = number | "ellipsis-left" | "ellipsis-right";

function getVisiblePages(totalPages: number, currentPage: number): PageToken[] {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  if (currentPage <= 3) {
    return [1, 2, 3, "ellipsis-right", totalPages];
  }

  if (currentPage >= totalPages - 2) {
    return [1, "ellipsis-left", totalPages - 2, totalPages - 1, totalPages];
  }

  return [
    1,
    "ellipsis-left",
    currentPage,
    "ellipsis-right",
    totalPages,
  ];
}

export default function ReusablePagination({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
  itemLabel = "results",
  className = "",
  activeClassName = "border-[#2E3A83] bg-[#2E3A83] text-white",
}: ReusablePaginationProps) {
  const safeTotalPages = Math.max(totalPages, 1);
  const safeCurrentPage = Math.min(Math.max(currentPage, 1), safeTotalPages);
  const startIndex = totalItems === 0 ? 0 : (safeCurrentPage - 1) * pageSize + 1;
  const endIndex = Math.min(safeCurrentPage * pageSize, totalItems);
  const visiblePages = getVisiblePages(safeTotalPages, safeCurrentPage);

  return (
    <div
      className={`flex flex-col gap-4 border-t border-[#EAECF0] bg-white px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5 ${className}`}
    >
      <p className="text-sm text-[#344054]">
        Showing {startIndex} to {endIndex} of {totalItems} {itemLabel}
      </p>

      <div className="flex items-center gap-1.5 self-end sm:self-auto">
        <button
          type="button"
          onClick={() => onPageChange(Math.max(1, safeCurrentPage - 1))}
          className="inline-flex h-8 min-w-8 items-center justify-center rounded-[8px] border border-[#D0D5DD] bg-white px-2 text-sm font-medium text-[#344054] transition hover:bg-[#F9FAFB] disabled:cursor-not-allowed disabled:opacity-50"
          disabled={safeCurrentPage === 1}
        >
          <ChevronLeft size={15} />
        </button>

        {visiblePages.map((pageToken, index) =>
          typeof pageToken === "number" ? (
            <button
              key={pageToken}
              type="button"
              onClick={() => onPageChange(pageToken)}
              className={[
                "inline-flex h-8 min-w-8 items-center justify-center rounded-[8px] border px-2 text-sm font-medium transition",
                pageToken === safeCurrentPage
                  ? activeClassName
                  : "border-[#D0D5DD] bg-white text-[#344054] hover:bg-[#F9FAFB]",
              ].join(" ")}
            >
              {pageToken}
            </button>
          ) : (
            <span
              key={`${pageToken}-${index}`}
              className="inline-flex h-8 min-w-8 items-center justify-center text-sm text-[#98A2B3]"
            >
              ...
            </span>
          ),
        )}

        <button
          type="button"
          onClick={() => onPageChange(Math.min(safeTotalPages, safeCurrentPage + 1))}
          className="inline-flex h-8 min-w-8 items-center justify-center rounded-[8px] border border-[#D0D5DD] bg-white px-2 text-sm font-medium text-[#344054] transition hover:bg-[#F9FAFB] disabled:cursor-not-allowed disabled:opacity-50"
          disabled={safeCurrentPage === safeTotalPages}
        >
          <ChevronRight size={15} />
        </button>
      </div>
    </div>
  );
}
