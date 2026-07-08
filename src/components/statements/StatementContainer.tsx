"use client";

import { useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { DollarSign, Layers3, Plus } from "lucide-react";
import SearchInput from "../ui/input/searchInput/SearchInput";
import SelectField, { SelectOption } from "../ui/input/searchInput/SelectField";
import StatementMetricCard from "./components/StatementMetricCard";
import StatementPreviewModal from "./components/StatementPreviewModal";
import StatementsTable from "./components/StatementsTable";
import { dispatcherStatementDataset, STATEMENT_PAGE_SIZE } from "./statementMockData";
import {
    StatementDataset,
    StatementRecord,
    StatementSortValue,
    StatementStatusFilterValue,
} from "./statementTypes";
import {
    downloadStatementTextFile,
    formatStatementCurrency,
    parseStatementDate,
} from "./statementUtils";

type StatementContainerProps = {
    title?: string;
    dataset?: StatementDataset;
    generateHref?: string;
};

const statusFilterOptions: SelectOption[] = [
    { value: "all", label: "Status" },
    { value: "generated", label: "Generated" },
    { value: "draft", label: "Draft" },
    { value: "reviewed", label: "Reviewed" },
    { value: "downloaded", label: "Downloaded" },
];

const sortOptions: SelectOption[] = [
    { value: "newest", label: "Newest" },
    { value: "oldest", label: "Oldest" },
];

export default function StatementContainer({
    title = "Financial Statements",
    dataset = dispatcherStatementDataset,
    generateHref,
}: StatementContainerProps) {
    const router = useRouter();
    const pathname = usePathname();
    const [statements, setStatements] = useState<StatementRecord[]>(() => dataset.statements);
    const [query, setQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState<StatementStatusFilterValue>("all");
    const [sortOrder, setSortOrder] = useState<StatementSortValue>("newest");
    const [page, setPage] = useState(1);
    const [previewStatement, setPreviewStatement] = useState<StatementRecord | null>(null);

    const filteredStatements = useMemo(() => {
        const normalizedQuery = query.trim().toLowerCase();

        return [...statements]
            .filter((statement) => {
                if (statusFilter === "all") {
                    return true;
                }

                return statement.status.toLowerCase() === statusFilter;
            })
            .filter((statement) => {
                if (!normalizedQuery) {
                    return true;
                }

                return [
                    statement.statementNumber,
                    statement.recipientName,
                    statement.period,
                    statement.status,
                    String(statement.loads),
                    String(statement.revenue),
                ]
                    .join(" ")
                    .toLowerCase()
                    .includes(normalizedQuery);
            })
            .sort((firstStatement, secondStatement) => {
                const firstDate = parseStatementDate(firstStatement.createdAt);
                const secondDate = parseStatementDate(secondStatement.createdAt);

                return sortOrder === "newest" ? secondDate - firstDate : firstDate - secondDate;
            });
    }, [query, sortOrder, statements, statusFilter]);

    const hasActiveFilter = query.trim().length > 0 || statusFilter !== "all";
    const displayTotalItems = hasActiveFilter
        ? filteredStatements.length
        : dataset.reportedTotalItems ?? filteredStatements.length;
    const totalPages = Math.max(Math.ceil(filteredStatements.length / STATEMENT_PAGE_SIZE), 1);
    const currentPage = Math.min(page, totalPages);
    const paginatedStatements = filteredStatements.slice(
        (currentPage - 1) * STATEMENT_PAGE_SIZE,
        currentPage * STATEMENT_PAGE_SIZE,
    );

    const openGeneratePage = () => {
        const targetHref = generateHref ?? `${pathname.replace(/\/$/, "")}/generate`;
        router.push(`${targetHref}?step=1`);
    };

    const openEditModal = (statement: StatementRecord) => {
        router.push(
            `${generateHref ?? `${pathname.replace(/\/$/, "")}/generate`}?statementId=${statement.id}&step=1`,
        );
    };

    const handleDeleteStatement = (statementToDelete: StatementRecord) => {
        setStatements((currentStatements) =>
            currentStatements.filter((statement) => statement.id !== statementToDelete.id),
        );
    };

    const handleDownloadStatement = (statement: StatementRecord) => {
        const lines = [
            `Statement: ${statement.statementNumber}`,
            `Carrier/Driver: ${statement.recipientName}`,
            `Period: ${statement.period}`,
            `Loads: ${statement.loads}`,
            `Revenue: ${formatStatementCurrency(statement.revenue)}`,
            `Status: ${statement.status}`,
        ];

        downloadStatementTextFile(
            `${statement.statementNumber}.txt`,
            lines.join("\n"),
            "text/plain;charset=utf-8",
        );
    };

    return (
        <>
            <div className="space-y-5">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <h1 className="text-2xl font-semibold tracking-[-0.02em] text-[#101828] sm:text-[1.75rem]">
                        {title}
                    </h1>

                    <button
                        type="button"
                        onClick={openGeneratePage}
                        className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-[#2E3A83] px-5 text-sm font-semibold text-white transition hover:bg-[#25306F] sm:w-auto"
                    >
                        <Plus className="h-4 w-4" />
                        Generate Statement
                    </button>
                </div>

                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                    <StatementMetricCard
                        icon={DollarSign}
                        value={`$${dataset.summary.revenue}`}
                        label="My Revenue"
                        helperText={`${dataset.summary.billingPeriods} billing periods`}
                    />
                    <StatementMetricCard
                        icon={Layers3}
                        value={String(dataset.summary.totalLoads)}
                        label="Total Loads"
                    />
                </div>

                <section className="rounded-xl border border-[#E4E7EC] bg-white p-4 shadow-[0_1px_2px_rgba(16,24,40,0.04)] sm:p-5">
                    <div className="grid grid-cols-1 gap-3 lg:grid-cols-[minmax(0,1fr)_160px_160px]">
                        <SearchInput
                            value={query}
                            onChange={(event) => {
                                setQuery(event.target.value);
                                setPage(1);
                            }}
                            placeholder="Search..."
                            containerClassName="w-full"
                            inputClassName="h-11 rounded-lg border-[#D7DDE8] bg-[#F8FAFB] pl-11 pr-4 text-sm text-[#101828] shadow-none placeholder:text-[#98A2B3] focus:border-[#C9D3E0] focus:bg-white focus:ring-0"
                        />
                        <SelectField
                            options={statusFilterOptions}
                            value={statusFilter}
                            onChange={(value) => {
                                setStatusFilter(value as StatementStatusFilterValue);
                                setPage(1);
                            }}
                            wrapperClassName="w-full"
                            selectClassName="h-11 rounded-lg border-[#D7DDE8] bg-[#F8FAFB] pl-4 pr-10 text-sm text-[#101828] shadow-none focus:border-[#C9D3E0] focus:bg-white focus:ring-0"
                        />
                        <SelectField
                            options={sortOptions}
                            value={sortOrder}
                            onChange={(value) => {
                                setSortOrder(value as StatementSortValue);
                                setPage(1);
                            }}
                            wrapperClassName="w-full"
                            selectClassName="h-11 rounded-lg border-[#D7DDE8] bg-[#F8FAFB] pl-4 pr-10 text-sm text-[#101828] shadow-none focus:border-[#C9D3E0] focus:bg-white focus:ring-0"
                        />
                    </div>

                    <div className="mt-3">
                        <StatementsTable
                            statements={paginatedStatements}
                            currentPage={currentPage}
                            totalPages={totalPages}
                            totalItems={displayTotalItems}
                            onPageChange={setPage}
                            onView={setPreviewStatement}
                            onEdit={openEditModal}
                            onDownload={handleDownloadStatement}
                            onDelete={handleDeleteStatement}
                        />
                    </div>

                </section>
            </div>

            <StatementPreviewModal
                isOpen={Boolean(previewStatement)}
                statement={previewStatement}
                onClose={() => setPreviewStatement(null)}
                onDownload={handleDownloadStatement}
            />
        </>
    );
}
