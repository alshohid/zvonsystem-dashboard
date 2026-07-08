"use client";

import ReusablePagination from "../../tables/ReusablePagination";
import ReusableTable from "../../tables/ReusableTable";
import { INVOICE_PAGE_SIZE } from "../invoiceMockData";
import { InvoiceRecord } from "../invoiceTypes";
import { formatCurrency } from "../invoiceUtils";
import InvoiceActionMenu from "./InvoiceActionMenu";
import InvoiceNumberCell from "./InvoiceNumberCell";

type InvoicesTableProps = {
    invoices: InvoiceRecord[];
    currentPage: number;
    totalPages: number;
    totalItems: number;
    onPageChange: (page: number) => void;
    onView: (invoice: InvoiceRecord) => void;
    onEdit: (invoice: InvoiceRecord) => void;
    onDownload: (invoice: InvoiceRecord) => void;
    onDelete: (invoice: InvoiceRecord) => void;
};

const tableHeader = ["Invoice", "Carrier", "Billing Cycle", "Date Created", "Total Due", ""];

export default function InvoicesTable({
    invoices,
    currentPage,
    totalPages,
    totalItems,
    onPageChange,
    onView,
    onEdit,
    onDownload,
    onDelete,
}: InvoicesTableProps) {
    return (
        <div className="overflow-hidden rounded-[12px] border border-[#E4E7EC] bg-white">
            <ReusableTable<InvoiceRecord>
                tableHeader={tableHeader}
                items={invoices}
                getRowKey={(invoice) => invoice.id}
                minTableWidthPx={920}
                wrapperClassName="rounded-none border-0 bg-transparent shadow-none"
                tableClassName="w-full border-separate border-spacing-0"
                tableBodyClassName="divide-y-0"
                rowClassName="bg-white transition hover:bg-[#FCFCFD]"
                headerCellClassName="border-b border-[#EAECF0] bg-[#F8FAFC] px-4 py-3 text-left text-[13px] font-medium text-[#667085] last:text-right"
                bodyCellClassName="border-b border-[#EAECF0] px-4 py-4 align-middle text-sm leading-5 text-[#101828] last:text-right"
                emptyText="No invoices matched the current filters."
                emptyCellClassName="block px-5 py-16 text-center text-sm text-[#667085]"
                rowRenderers={[
                    (invoice) => <InvoiceNumberCell invoiceNumber={invoice.invoiceNumber} />,
                    (invoice) => <span className="font-medium text-[#344054]">{invoice.carrierName}</span>,
                    (invoice) => <span className="whitespace-nowrap text-[#101828]">{invoice.billingCycle}</span>,
                    (invoice) => <span className="whitespace-nowrap text-[#344054]">{invoice.dateCreated}</span>,
                    (invoice) => <span className="font-semibold text-[#101828]">{formatCurrency(invoice.totalDue)}</span>,
                    (invoice) => (
                        <div className="flex justify-end">
                            <InvoiceActionMenu
                                invoice={invoice}
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
                pageSize={INVOICE_PAGE_SIZE}
                onPageChange={onPageChange}
                itemLabel="results"
            />
        </div>
    );
}
