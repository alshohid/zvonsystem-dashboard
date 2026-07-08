"use client";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalItems?: number;
  pageSize?: number;
  itemLabel?: string;
  disabled?: boolean;
  className?: string;
};

const buildPageItems = (currentPage: number, totalPages: number) => {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  if (currentPage <= 3) {
    return [1, 2, 3, 4, "...", totalPages];
  }

  if (currentPage >= totalPages - 2) {
    return [1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
  }

  return [
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    totalPages,
  ];
};

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  pageSize,
  itemLabel = "items",
  disabled = false,
  className = "",
}: PaginationProps) {
  const safeTotalPages = Math.max(totalPages, 1);
  const safeCurrentPage = Math.min(Math.max(currentPage, 1), safeTotalPages);
  const pageItems = buildPageItems(safeCurrentPage, safeTotalPages);

  const hasCountSummary =
    typeof totalItems === "number" &&
    typeof pageSize === "number" &&
    totalItems > 0 &&
    pageSize > 0;
  const startItem = hasCountSummary ? (safeCurrentPage - 1) * pageSize + 1 : null;
  const endItem =
    hasCountSummary ? Math.min(safeCurrentPage * pageSize, totalItems) : null;

  return (
    <div
      className={`mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-[#ECF0E6] pt-4 ${className}`}
    >
      <div className="text-[12px] text-[#667164]">
        {typeof totalItems === "number" && totalItems === 0
          ? `No ${itemLabel} found`
          : typeof startItem === "number" && typeof endItem === "number"
          ? `Showing ${startItem}-${endItem} of ${totalItems} ${itemLabel}`
          : `Page ${safeCurrentPage} of ${safeTotalPages}`}
      </div>

      <div className="flex flex-wrap items-center justify-end gap-2">
        <button
          type="button"
          onClick={() => onPageChange(safeCurrentPage - 1)}
          disabled={disabled || safeCurrentPage === 1}
          className="inline-flex h-10 items-center justify-center rounded-[10px] border border-[#D6E2CB] bg-[#EEF5E7] px-4 text-[12px] font-medium text-[#3F4A3B] transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Previous
        </button>

        <div className="flex flex-wrap items-center gap-2">
          {pageItems.map((pageItem, index) =>
            pageItem === "..." ? (
              <span key={`ellipsis-${index}`} className="px-2 text-sm text-[#9AA592]">
                ...
              </span>
            ) : (
              <button
                key={pageItem}
                type="button"
                onClick={() => onPageChange(pageItem as number)}
                disabled={disabled}
                className={[
                  "flex h-10 w-10 items-center justify-center rounded-[10px] text-[12px] font-medium transition",
                  safeCurrentPage === pageItem
                    ? "bg-[#3F4A3B] text-white shadow-[0_10px_20px_rgba(63,74,59,0.14)]"
                    : "border border-transparent text-[#55614F] hover:bg-[#F1F6EB]",
                ].join(" ")}
              >
                {pageItem}
              </button>
            ),
          )}
        </div>

        <button
          type="button"
          onClick={() => onPageChange(safeCurrentPage + 1)}
          disabled={disabled || safeCurrentPage === safeTotalPages}
          className="inline-flex h-10 items-center justify-center rounded-[10px] bg-[#3F4A3B] px-4 text-[12px] font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
