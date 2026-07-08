"use client";

import { Eye, Plus } from "lucide-react";
import SearchInput from "@/src/components/ui/input/searchInput/SearchInput";
import ReusablePagination from "@/src/components/tables/ReusablePagination";
import ReusableTable from "@/src/components/tables/ReusableTable";

export type DispatcherStatus = "Active" | "Suspended";

export type DispatcherRecord = {
    id: string;
    name: string;
    email: string;
    carriers: number;
    revenue: string;
    status: DispatcherStatus;
};

export type DispatchersTableProps = {
    items: DispatcherRecord[];
    query: string;
    onQueryChange: (value: string) => void;
    currentPage: number;
    totalPages: number;
    totalItems: number;
    pageSize: number;
    onPageChange: (page: number) => void;
    onAddDispatcher: () => void;
    onViewDispatcher: (dispatcher: DispatcherRecord) => void;
};

const tableHeader = ["ID", "Name", "Email", "Carriers", "Revenue", "Status", "Action"];

const statusBadgeClasses: Record<DispatcherStatus, string> = {
    Active: "border-[#22C55E] bg-[#F0FDF4] text-[#16A34A]",
    Suspended: "border-[#F87171] bg-[#FFF1F2] text-[#DC2626]",
};

function StatusBadge({ status }: { status: DispatcherStatus }) {
    return (
        <span
            className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium leading-none ${statusBadgeClasses[status]}`}
        >
            {status}
        </span>
    );
}

export default function DispatchersTable({
    items,
    query,
    onQueryChange,
    currentPage,
    totalPages,
    totalItems,
    pageSize,
    onPageChange,
    onAddDispatcher,
    onViewDispatcher,
}: DispatchersTableProps) {
    return (
        <section className="rounded-[1.5rem] border border-[#E4E7EC] bg-white p-4 shadow-[0_1px_2px_rgba(16,24,40,0.04)] sm:p-5">
            <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <h2 className="text-[1.75rem] font-semibold tracking-[-0.03em] text-[#101828]">
                        All Dispatchers
                    </h2>

                    <button
                        type="button"
                        onClick={onAddDispatcher}
                        className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-[0.9rem] bg-[#2E3A83] px-5 text-base font-semibold text-white transition hover:bg-[#25306F] sm:w-auto"
                    >
                        <Plus size={18} />
                        Add Dispatcher
                    </button>
                </div>

                <SearchInput
                    value={query}
                    onChange={(event) => onQueryChange(event.target.value)}
                    placeholder="Search by name"
                    containerClassName="w-full"
                    inputClassName="h-12 rounded-xl border-[#D7DDE8] bg-[#F8FAFB] pl-11 pr-4 text-sm text-[#101828] shadow-none placeholder:text-[#98A2B3] focus:border-[#C9D3E0] focus:bg-white focus:ring-0"
                />
            </div>

            <div className="mt-4 overflow-hidden rounded-[12px] border border-[#E4E7EC] bg-white">
                <ReusableTable<DispatcherRecord>
                    tableHeader={tableHeader}
                    items={items}
                    getRowKey={(dispatcher) => dispatcher.id}
                    minTableWidthPx={920}
                    wrapperClassName="rounded-none border-0 bg-transparent shadow-none"
                    tableClassName="w-full border-separate border-spacing-0"
                    tableBodyClassName="divide-y-0"
                    rowClassName="bg-white transition hover:bg-[#FCFCFD]"
                    headerCellClassName="border-b border-[#EAECF0] bg-[#F8FAFC] px-4 py-3 text-left text-[1rem] leading-5 font-medium text-[#667085] first:rounded-tl-[10px] last:rounded-tr-[10px]"
                    bodyCellClassName="border-b border-[#EAECF0] px-4 py-5 align-middle text-[1rem] leading-5 text-[#101828]"
                    emptyText="No dispatchers matched the current search."
                    emptyCellClassName="block px-5 py-14 text-center text-sm text-[#667085]"
                    rowRenderers={[
                        (dispatcher) => <span>{dispatcher.id}</span>,
                        (dispatcher) => (
                            <span className="font-medium text-[#101828]">{dispatcher.name}</span>
                        ),
                        (dispatcher) => <span>{dispatcher.email}</span>,
                        (dispatcher) => <span>{dispatcher.carriers}</span>,
                        (dispatcher) => <span>{dispatcher.revenue}</span>,
                        (dispatcher) => <StatusBadge status={dispatcher.status} />,
                        (dispatcher) => (
                            <div className="flex justify-center">
                                <button
                                    type="button"
                                    onClick={() => onViewDispatcher(dispatcher)}
                                    className="inline-flex h-9 w-9 items-center justify-center rounded-full text-[#344054] transition hover:bg-[#F2F4F7]"
                                    aria-label={`View dispatcher ${dispatcher.name}`}
                                >
                                    <Eye size={18} />
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
                />
            </div>
        </section>
    );
}
