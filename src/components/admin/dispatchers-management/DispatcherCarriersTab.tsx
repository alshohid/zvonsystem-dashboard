"use client";

import { useMemo, useState } from "react";
import { Eye } from "lucide-react";
import ReusablePagination from "@/src/components/tables/ReusablePagination";
import ReusableTable from "@/src/components/tables/ReusableTable";
import SearchInput from "@/src/components/ui/input/searchInput/SearchInput";
import SelectField, {
    type SelectOption,
} from "@/src/components/ui/input/searchInput/SelectField";
import CarrierProfileDetailModal from "./CarrierProfileDetailModal";
import type { DispatcherCarrierRecord } from "./dispatcherDetailsTypes";

type DispatcherCarriersTabProps = {
    carriers: DispatcherCarrierRecord[];
    onViewCarrier?: (carrier: DispatcherCarrierRecord) => void;
};

type CarrierSortValue = "newest" | "oldest";

const CARRIER_PAGE_SIZE = 8;
const tableHeader = ["ID", "Carriers", "DBA Name", "MC No.", "Pricing Plan", "Contact", ""];
const sortOptions: SelectOption[] = [
    { value: "newest", label: "Newest" },
    { value: "oldest", label: "Oldest" },
];

export default function DispatcherCarriersTab({
    carriers,
    onViewCarrier,
}: DispatcherCarriersTabProps) {
    const [query, setQuery] = useState("");
    const [sortOrder, setSortOrder] = useState<CarrierSortValue>("newest");
    const [page, setPage] = useState(1);
    const [selectedCarrier, setSelectedCarrier] = useState<DispatcherCarrierRecord | null>(null);

    const filteredCarriers = useMemo(() => {
        const normalizedQuery = query.trim().toLowerCase();

        return [...carriers]
            .filter((carrier) => {
                if (!normalizedQuery) {
                    return true;
                }

                return [
                    carrier.id,
                    carrier.name,
                    carrier.dbaName,
                    carrier.mcNumber,
                    carrier.pricingPlan,
                    carrier.contact,
                ]
                    .join(" ")
                    .toLowerCase()
                    .includes(normalizedQuery);
            })
            .sort((firstCarrier, secondCarrier) => {
                const firstTime = new Date(firstCarrier.createdAt).getTime();
                const secondTime = new Date(secondCarrier.createdAt).getTime();

                return sortOrder === "newest" ? secondTime - firstTime : firstTime - secondTime;
            });
    }, [carriers, query, sortOrder]);

    const totalPages = Math.max(Math.ceil(filteredCarriers.length / CARRIER_PAGE_SIZE), 1);
    const currentPage = Math.min(page, totalPages);
    const paginatedCarriers = filteredCarriers.slice(
        (currentPage - 1) * CARRIER_PAGE_SIZE,
        currentPage * CARRIER_PAGE_SIZE,
    );

    const handleViewCarrier = (carrier: DispatcherCarrierRecord) => {
        setSelectedCarrier(carrier);
        onViewCarrier?.(carrier);
    };

    return (
        <>
            <section>
                <h2 className="text-xl font-semibold leading-7 text-[#101828]">
                    Total Carriers: {carriers.length}
                </h2>

                <div className="mt-4 overflow-hidden rounded-lg border border-[#E4E7EC] bg-white">
                    <div className="grid grid-cols-1 gap-2 border-b border-[#E4E7EC] p-2 sm:grid-cols-[minmax(0,1fr)_140px]">
                        <SearchInput
                            value={query}
                            onChange={(event) => {
                                setQuery(event.target.value);
                                setPage(1);
                            }}
                            placeholder="Search by name / MC No."
                            containerClassName="w-full"
                            inputClassName="h-12 rounded-none border-0 border-r-[#E4E7EC] bg-[#F8FAFB] pl-12 text-sm shadow-none placeholder:text-[#8A92A6] focus:border-0 focus:bg-white focus:ring-0 sm:border-r"
                        />

                        <SelectField
                            value={sortOrder}
                            options={sortOptions}
                            onChange={(value) => {
                                setSortOrder(value as CarrierSortValue);
                                setPage(1);
                            }}
                            wrapperClassName="w-full"
                            selectClassName="h-12 rounded-none border-0 bg-white pl-4 pr-9 text-sm font-semibold text-[#161721] shadow-none focus:border-0 focus:bg-white focus:ring-0"
                        />
                    </div>

                    <ReusableTable<DispatcherCarrierRecord>
                        tableHeader={tableHeader}
                        items={paginatedCarriers}
                        getRowKey={(carrier) => carrier.id}
                        minTableWidthPx={930}
                        wrapperClassName="rounded-none border-0 bg-transparent shadow-none"
                        tableClassName="w-full border-separate border-spacing-0"
                        tableBodyClassName="divide-y-0"
                        rowClassName="bg-white transition hover:bg-[#FCFCFD]"
                        headerCellClassName="border-b border-[#EAECF0] bg-[#F8FAFC] px-4 py-4 text-left text-sm font-medium text-[#667085]"
                        bodyCellClassName="border-b border-[#EAECF0] px-4 py-5 align-middle text-sm leading-5 text-[#101828]"
                        emptyText="No carriers matched the current search."
                        emptyCellClassName="block px-5 py-14 text-center text-sm text-[#667085]"
                        rowRenderers={[
                            (carrier) => <span>{carrier.id}</span>,
                            (carrier) => (
                                <div className="flex min-w-0 items-center gap-3">
                                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#E9EAEC] text-xs font-medium text-[#344054]">
                                        {carrier.initials}
                                    </span>
                                    <span className="min-w-0 truncate font-medium text-[#101828]">
                                        {carrier.name}
                                    </span>
                                </div>
                            ),
                            (carrier) => <span className="whitespace-nowrap">{carrier.dbaName}</span>,
                            (carrier) => <span>{carrier.mcNumber}</span>,
                            (carrier) => <span className="whitespace-nowrap">{carrier.pricingPlan}</span>,
                            (carrier) => <span className="whitespace-nowrap">{carrier.contact}</span>,
                            (carrier) => (
                                <div className="flex justify-end">
                                    <button
                                        type="button"
                                        onClick={() => handleViewCarrier(carrier)}
                                        className="inline-flex h-9 w-9 items-center justify-center rounded-full text-[#344054] transition hover:bg-[#F2F4F7]"
                                        aria-label={`View carrier ${carrier.name}`}
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
                        totalItems={filteredCarriers.length}
                        pageSize={CARRIER_PAGE_SIZE}
                        onPageChange={setPage}
                        itemLabel="results"
                    />
                </div>
            </section>

            <CarrierProfileDetailModal
                isOpen={Boolean(selectedCarrier)}
                carrier={selectedCarrier}
                onClose={() => setSelectedCarrier(null)}
            />
        </>
    );
}
