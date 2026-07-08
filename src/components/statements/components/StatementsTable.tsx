"use client";

import ReusablePagination from "../../tables/ReusablePagination";
import ReusableTable from "../../tables/ReusableTable";
import { STATEMENT_PAGE_SIZE } from "../statementMockData";
import { StatementRecord } from "../statementTypes";
import { formatStatementCurrency } from "../statementUtils";
import StatementActionMenu from "./StatementActionMenu";
import StatementNumberCell from "./StatementNumberCell";

type StatementsTableProps = {
    statements: StatementRecord[];
    currentPage: number;
    totalPages: number;
    totalItems: number;
    onPageChange: (page: number) => void;
    onView: (statement: StatementRecord) => void;
    onEdit: (statement: StatementRecord) => void;
    onDownload: (statement: StatementRecord) => void;
    onDelete: (statement: StatementRecord) => void;
};

const tableHeader = ["Statement", "Carrier/Driver", "Period", "Loads", "Revenue", ""];

export default function StatementsTable({
    statements,
    currentPage,
    totalPages,
    totalItems,
    onPageChange,
    onView,
    onEdit,
    onDownload,
    onDelete,
}: StatementsTableProps) {
    return (
        <div className="overflow-hidden rounded-[12px] border border-[#E4E7EC] bg-white">
            <ReusableTable<StatementRecord>
                tableHeader={tableHeader}
                items={statements}
                getRowKey={(statement) => statement.id}
                minTableWidthPx={900}
                wrapperClassName="rounded-none border-0 bg-transparent shadow-none"
                tableClassName="w-full border-separate border-spacing-0"
                tableBodyClassName="divide-y-0"
                rowClassName="bg-white transition hover:bg-[#FCFCFD]"
                headerCellClassName="border-b border-[#EAECF0] bg-[#F8FAFC] px-4 py-3 text-left text-[13px] font-medium text-[#667085] last:text-right"
                bodyCellClassName="border-b border-[#EAECF0] px-4 py-4 align-middle text-sm leading-5 text-[#101828] last:text-right"
                emptyText="No statements matched the current filters."
                emptyCellClassName="block px-5 py-16 text-center text-sm text-[#667085]"
                rowRenderers={[
                    (statement) => <StatementNumberCell statementNumber={statement.statementNumber} />,
                    (statement) => <span className="font-medium text-[#344054]">{statement.recipientName}</span>,
                    (statement) => <span className="whitespace-nowrap text-[#101828]">{statement.period}</span>,
                    (statement) => <span className="font-semibold text-[#344054]">{statement.loads}</span>,
                    (statement) => (
                        <span className="font-semibold text-[#101828]">
                            {formatStatementCurrency(statement.revenue)}
                        </span>
                    ),
                    (statement) => (
                        <div className="flex justify-end">
                            <StatementActionMenu
                                statement={statement}
                                onView={onView}
                                onEdit={onEdit}
                                onDownload={onDownload}
                                onDelete={onDelete}
                            />
                        </div>
                    ),
                ]}
            />

            <ReusablePagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={totalItems}
                pageSize={STATEMENT_PAGE_SIZE}
                onPageChange={onPageChange}
                itemLabel="results"
            />
        </div>
    );
}
