"use client"


import { useDeferredValue, useState } from "react";
import PerformanceSummaryCard from "@/src/components/admin/performance/PerformanceSummaryCard";
import DispatcherPerformanceTable, {
    type DispatcherPerformanceRecord,
} from "@/src/components/admin/performance/DispatcherPerformanceTable";
import ReusablePagination from "@/src/components/tables/ReusablePagination";
import {
    performanceData,
    revenuePlanDataMap,
    revenueTrendDataMap,
    topRevenueCarriers,
} from "../../dispatcher/dummyData/data";
import RevenuePlanChart from "../../dispatcher/RevenuePlanChart";
import TopRevenueCarriers from "../../dispatcher/TopRevenueCarriers";
import RevenueTrendChart from "../../dispatcher/RevenueTrendChart";
import SearchInput from "../../ui/input/searchInput/SearchInput";
import SelectField, {
    type SelectOption,
} from "../../ui/input/searchInput/SelectField";

const PAGE_SIZE = 6;

const monthOptions: SelectOption[] = [
    { value: "all", label: "All" },
    { value: "january", label: "January" },
    { value: "february", label: "February" },
    { value: "march", label: "March" },
    { value: "april", label: "April" },
    { value: "may", label: "May" },
    { value: "june", label: "June" },
    { value: "july", label: "July" },
    { value: "august", label: "August" },
    { value: "september", label: "September" },
    { value: "october", label: "October" },
    { value: "november", label: "November" },
    { value: "december", label: "December" },
];

const DISPATCHER_PERFORMANCE_RECORDS: DispatcherPerformanceRecord[] = [
    {
        id: "02",
        driverName: "James Clark",
        driverEmail: "yourmail@gmail.com",
        carrier: "Express Cargo Services",
        miles: 345,
        loads: 89,
        dispatchFee: "$895",
        month: "march",
        contact: "+32 123423",
        dotNo: "112321",
        mcNo: "S321",
        avgPerLoad: "$321",
    },
    {
        id: "03",
        driverName: "Rodrigue",
        driverEmail: "yourmail@gmail.com",
        carrier: "Express Cargo Services",
        miles: 345,
        loads: 78,
        dispatchFee: "$895",
        month: "march",
        contact: "+32 987123",
        dotNo: "112654",
        mcNo: "S322",
        avgPerLoad: "$305",
    },
    {
        id: "04",
        driverName: "Ronaldo",
        driverEmail: "yourmail@gmail.com",
        carrier: "Express Cargo Services",
        miles: 345,
        loads: 89,
        dispatchFee: "$895",
        month: "march",
        contact: "+32 765110",
        dotNo: "113875",
        mcNo: "S323",
        avgPerLoad: "$318",
    },
    {
        id: "05",
        driverName: "Sophia Turner",
        driverEmail: "yourmail@gmail.com",
        carrier: "Express Cargo Services",
        miles: 345,
        loads: 78,
        dispatchFee: "$895",
        month: "march",
        contact: "+32 334221",
        dotNo: "114327",
        mcNo: "S324",
        avgPerLoad: "$299",
    },
    {
        id: "06",
        driverName: "Liam Johnson",
        driverEmail: "yourmail@gmail.com",
        carrier: "Express Cargo Services",
        miles: 345,
        loads: 89,
        dispatchFee: "$895",
        month: "march",
        contact: "+32 119930",
        dotNo: "115438",
        mcNo: "S325",
        avgPerLoad: "$320",
    },
    {
        id: "07",
        driverName: "Olivia Smith",
        driverEmail: "yourmail@gmail.com",
        carrier: "Express Cargo Services",
        miles: 345,
        loads: 78,
        dispatchFee: "$895",
        month: "march",
        contact: "+32 220784",
        dotNo: "115902",
        mcNo: "S326",
        avgPerLoad: "$303",
    },
    {
        id: "08",
        driverName: "Noah Martinez",
        driverEmail: "dispatch@gmail.com",
        carrier: "Metro Dispatch Services",
        miles: 368,
        loads: 82,
        dispatchFee: "$910",
        month: "march",
        contact: "+32 448112",
        dotNo: "116210",
        mcNo: "M410",
        avgPerLoad: "$311",
    },
    {
        id: "09",
        driverName: "Emma Brown",
        driverEmail: "carrierdesk@gmail.com",
        carrier: "Swift Freight Solutions",
        miles: 332,
        loads: 75,
        dispatchFee: "$860",
        month: "march",
        contact: "+32 991200",
        dotNo: "116704",
        mcNo: "F210",
        avgPerLoad: "$287",
    },
    {
        id: "10",
        driverName: "Mason Hall",
        driverEmail: "mason@gmail.com",
        carrier: "Global Dispatch Solutions",
        miles: 358,
        loads: 84,
        dispatchFee: "$930",
        month: "april",
        contact: "+32 341120",
        dotNo: "117654",
        mcNo: "G111",
        avgPerLoad: "$324",
    },
    {
        id: "11",
        driverName: "Ava Wilson",
        driverEmail: "ava@gmail.com",
        carrier: "Metro Dispatch Services",
        miles: 326,
        loads: 71,
        dispatchFee: "$845",
        month: "april",
        contact: "+32 230901",
        dotNo: "118043",
        mcNo: "M412",
        avgPerLoad: "$281",
    },
    {
        id: "12",
        driverName: "Ethan Carter",
        driverEmail: "ethan@gmail.com",
        carrier: "Swift Freight Solutions",
        miles: 390,
        loads: 92,
        dispatchFee: "$980",
        month: "may",
        contact: "+32 402112",
        dotNo: "118510",
        mcNo: "F215",
        avgPerLoad: "$337",
    },
    {
        id: "13",
        driverName: "Mia Lopez",
        driverEmail: "mia@gmail.com",
        carrier: "Express Cargo Services",
        miles: 341,
        loads: 80,
        dispatchFee: "$888",
        month: "may",
        contact: "+32 550821",
        dotNo: "119004",
        mcNo: "S330",
        avgPerLoad: "$304",
    },
];

export default function SuperAdminPerformanceContainer() {
    const [query, setQuery] = useState("");
    const [selectedMonth, setSelectedMonth] = useState("march");
    const [page, setPage] = useState(1);
    const deferredQuery = useDeferredValue(query);

    const revenuePlanItems = revenuePlanDataMap['30d'];
    const revenueTrendData = revenueTrendDataMap['30d'];
    const normalizedQuery = deferredQuery.trim().toLowerCase();

    const filteredPerformanceRecords = DISPATCHER_PERFORMANCE_RECORDS.filter((record) => {
        const matchesQuery =
            normalizedQuery.length === 0 ||
            record.driverName.toLowerCase().includes(normalizedQuery) ||
            record.driverEmail.toLowerCase().includes(normalizedQuery) ||
            record.carrier.toLowerCase().includes(normalizedQuery);

        const matchesMonth =
            selectedMonth === "all" || record.month === selectedMonth;

        return matchesQuery && matchesMonth;
    });

    const totalPages = Math.max(
        1,
        Math.ceil(filteredPerformanceRecords.length / PAGE_SIZE),
    );
    const currentPage = Math.min(page, totalPages);
    const paginatedPerformanceRecords = filteredPerformanceRecords.slice(
        (currentPage - 1) * PAGE_SIZE,
        currentPage * PAGE_SIZE,
    );

    return (
        <section className="space-y-6">
            <h2 className="text-[2rem] font-semibold text-[#111827]">Performance</h2>

            <div className="grid gap-4 md:grid-cols-3 xl:grid-cols-3">
                {performanceData.map((item) => (
                    <PerformanceSummaryCard
                        key={item.title}
                        title={item.title}
                        value={item.value}
                        supportingText={item.supportingText}
                        isPositive={item.isPositive}
                    />
                ))}
            </div>
            <div>
                <RevenueTrendChart chartData={revenueTrendData} />
            </div>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-[3fr_9fr]" >
                <RevenuePlanChart items={revenuePlanItems} />
                <TopRevenueCarriers carriers={topRevenueCarriers} />
            </div>
            <section className="rounded-2xl border border-[#E4E7EC] bg-white p-4 shadow-[0_1px_2px_rgba(16,24,40,0.04)] sm:p-5">
                <div className="flex flex-col gap-4">
                    <div>
                        <h2 className="text-[1.75rem] font-semibold tracking-[-0.03em] text-[#101828]">
                            All Dispatcher’s Performance
                        </h2>
                    </div>

                    <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
                        <SearchInput
                            value={query}
                            onChange={(event) => {
                                setQuery(event.target.value);
                                setPage(1);
                            }}
                            placeholder="Search..."
                            containerClassName="w-full lg:flex-1"
                            inputClassName="h-10 rounded-xl border-[#D8E2EE] bg-[#F8FAFB] pl-11 pr-4 text-sm text-[#101828] shadow-none placeholder:text-[#98A2B3] focus:border-[#C9D3E0] focus:bg-[#F8FAFB] focus:ring-0"
                        />

                        <SelectField
                            value={selectedMonth}
                            onChange={(value) => {
                                setSelectedMonth(value);
                                setPage(1);
                            }}
                            options={monthOptions}
                            placeholder="March"
                            wrapperClassName="w-full sm:w-[116px]"
                            selectClassName="bg-[#FCFCFD]"
                        />
                    </div>
                </div>
                <div className="mt-4 overflow-hidden rounded-[12px] border border-[#E4E7EC] bg-white">
                    <DispatcherPerformanceTable items={paginatedPerformanceRecords} />

                    <ReusablePagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        totalItems={filteredPerformanceRecords.length}
                        pageSize={PAGE_SIZE}
                        itemLabel="results"
                        onPageChange={setPage}
                    />
                </div>
            </section>

        </section>
    );
}
