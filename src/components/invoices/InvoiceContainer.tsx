"use client";

import { useMemo, useState } from "react";
import { Download, Plus } from "lucide-react";
import SearchInput from "../ui/input/searchInput/SearchInput";
import SelectField, { SelectOption } from "../ui/input/searchInput/SelectField";
import BillingCycleCard from "./components/BillingCycleCard";
import CreateInvoiceModal from "./components/CreateInvoiceModal";
import InvoicePreviewModal from "./components/InvoicePreviewModal";
import InvoicesTable from "./components/InvoicesTable";
import { dispatcherInvoiceDataset, INVOICE_PAGE_SIZE } from "./invoiceMockData";
import {
    InvoiceDataset,
    InvoiceFormValues,
    InvoiceRecord,
    InvoiceSortValue,
    InvoiceStatusFilterValue,
} from "./invoiceTypes";
import {
    formatCurrency,
    getInvoiceTotalDue,
    getSelectedRevenue,
    parseInvoiceDate,
} from "./invoiceUtils";

type InvoiceContainerProps = {
    title?: string;
    dataset?: InvoiceDataset;
};

const statusFilterOptions: SelectOption[] = [
    { value: "all", label: "Status" },
    { value: "paid", label: "Paid" },
    { value: "pending", label: "Pending" },
    { value: "overdue", label: "Overdue" },
    { value: "draft", label: "Draft" },
];

const sortOptions: SelectOption[] = [
    { value: "newest", label: "Newest" },
    { value: "oldest", label: "Oldest" },
];

function getTodayLabel() {
    return new Date().toISOString().slice(0, 10);
}

function quoteCsvValue(value: string | number) {
    return `"${String(value).replaceAll("\"", "\"\"")}"`;
}

function downloadTextFile(fileName: string, content: string, type: string) {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");

    anchor.href = url;
    anchor.download = fileName;
    anchor.click();
    URL.revokeObjectURL(url);
}

export default function InvoiceContainer({
    title = "Invoices",
    dataset = dispatcherInvoiceDataset,
}: InvoiceContainerProps) {
    const [invoices, setInvoices] = useState<InvoiceRecord[]>(() => dataset.invoices);
    const [query, setQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState<InvoiceStatusFilterValue>("all");
    const [sortOrder, setSortOrder] = useState<InvoiceSortValue>("newest");
    const [page, setPage] = useState(1);
    const [isCreateInvoiceOpen, setIsCreateInvoiceOpen] = useState(false);
    const [editingInvoice, setEditingInvoice] = useState<InvoiceRecord | null>(null);
    const [previewInvoice, setPreviewInvoice] = useState<InvoiceRecord | null>(null);

    const filteredInvoices = useMemo(() => {
        const normalizedQuery = query.trim().toLowerCase();

        return [...invoices]
            .filter((invoice) => {
                if (statusFilter === "all") {
                    return true;
                }

                return invoice.status.toLowerCase() === statusFilter;
            })
            .filter((invoice) => {
                if (!normalizedQuery) {
                    return true;
                }

                return [
                    invoice.invoiceNumber,
                    invoice.carrierName,
                    invoice.billingCycle,
                    invoice.dateCreated,
                    invoice.status,
                    String(invoice.totalDue),
                ]
                    .join(" ")
                    .toLowerCase()
                    .includes(normalizedQuery);
            })
            .sort((firstInvoice, secondInvoice) => {
                const firstDate = parseInvoiceDate(firstInvoice.dateCreated);
                const secondDate = parseInvoiceDate(secondInvoice.dateCreated);

                return sortOrder === "newest" ? secondDate - firstDate : firstDate - secondDate;
            });
    }, [invoices, query, sortOrder, statusFilter]);

    const totalPages = Math.max(Math.ceil(filteredInvoices.length / INVOICE_PAGE_SIZE), 1);
    const currentPage = Math.min(page, totalPages);
    const paginatedInvoices = filteredInvoices.slice(
        (currentPage - 1) * INVOICE_PAGE_SIZE,
        currentPage * INVOICE_PAGE_SIZE,
    );

    const openCreateInvoiceModal = () => {
        setEditingInvoice(null);
        setIsCreateInvoiceOpen(true);
    };

    const openEditInvoiceModal = (invoice: InvoiceRecord) => {
        setEditingInvoice(invoice);
        setIsCreateInvoiceOpen(true);
    };

    const closeCreateInvoiceModal = () => {
        setIsCreateInvoiceOpen(false);
        setEditingInvoice(null);
    };

    const handleSaveInvoice = (values: InvoiceFormValues) => {
        const carrier = dataset.carrierOptions.find((option) => option.value === values.carrierId);
        const loads = dataset.loadDetailsByCarrier[values.carrierId] ?? [];
        const billingCycle = values.startDate && values.endDate
            ? `${values.startDate} - ${values.endDate}`
            : dataset.billingCycle.dateRange;
        const nextInvoice: InvoiceRecord = {
            id: editingInvoice?.id ?? `invoice-${Date.now()}`,
            invoiceNumber: values.invoiceNumber,
            carrierId: values.carrierId,
            carrierName: carrier?.label ?? "Unknown Carrier",
            billingCycle,
            startDate: values.startDate,
            endDate: values.endDate,
            dateCreated: editingInvoice?.dateCreated ?? getTodayLabel(),
            totalDue: getInvoiceTotalDue(loads, dataset.pricingPlan),
            status: editingInvoice?.status ?? "Draft",
            loads,
            pricingPlan: dataset.pricingPlan,
            notes: values.notes || "N/A",
        };

        setInvoices((currentInvoices) =>
            editingInvoice
                ? currentInvoices.map((invoice) =>
                    invoice.id === editingInvoice.id ? nextInvoice : invoice,
                )
                : [nextInvoice, ...currentInvoices],
        );
        setPage(1);
        closeCreateInvoiceModal();
    };

    const handleViewInvoice = (invoice: InvoiceRecord) => {
        setPreviewInvoice(invoice);
    };

    const handleDownloadInvoice = (invoice: InvoiceRecord) => {
        const selectedRevenue = getSelectedRevenue(invoice.loads);
        const lines = [
            `Invoice: ${invoice.invoiceNumber}`,
            `Carrier: ${invoice.carrierName}`,
            `Billing Cycle: ${invoice.billingCycle}`,
            `Date Created: ${invoice.dateCreated}`,
            `Total Selected Revenue: ${formatCurrency(selectedRevenue)}`,
            `Total Due: ${formatCurrency(getInvoiceTotalDue(invoice.loads, invoice.pricingPlan))}`,
            "",
            "Loads",
            ...invoice.loads.map((load) =>
                [
                    load.id,
                    load.dateRange,
                    load.route,
                    load.assignedTo,
                    formatCurrency(load.amount),
                ].join(" | "),
            ),
        ];

        downloadTextFile(`${invoice.invoiceNumber}.txt`, lines.join("\n"), "text/plain;charset=utf-8");
    };

    const handleDeleteInvoice = (invoiceToDelete: InvoiceRecord) => {
        setInvoices((currentInvoices) =>
            currentInvoices.filter((invoice) => invoice.id !== invoiceToDelete.id),
        );
    };

    const handleExport = () => {
        const rows = [
            ["Invoice", "Carrier", "Billing Cycle", "Date Created", "Status", "Total Due"],
            ...filteredInvoices.map((invoice) => [
                invoice.invoiceNumber,
                invoice.carrierName,
                invoice.billingCycle,
                invoice.dateCreated,
                invoice.status,
                invoice.totalDue,
            ]),
        ];
        const csv = rows
            .map((row) => row.map((value) => quoteCsvValue(value)).join(","))
            .join("\n");

        downloadTextFile("invoices.csv", csv, "text/csv;charset=utf-8");
    };

    return (
        <>
            <div className="space-y-5">
                <BillingCycleCard billingCycle={dataset.billingCycle} />

                <section className="rounded-xl border border-[#E4E7EC] bg-white p-4 shadow-[0_1px_2px_rgba(16,24,40,0.04)] sm:p-5">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        <h1 className="text-2xl font-semibold tracking-[-0.02em] text-[#101828] sm:text-[1.75rem]">
                            {title}
                        </h1>

                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                            <button
                                type="button"
                                onClick={handleExport}
                                className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-[#D7DDE8] bg-white px-5 text-sm font-semibold text-[#101828] transition hover:bg-[#F8FAFC]"
                            >
                                <Download className="h-4 w-4" />
                                Export
                            </button>
                            <button
                                type="button"
                                onClick={openCreateInvoiceModal}
                                className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#2E3A83] px-5 text-sm font-semibold text-white transition hover:bg-[#25306F]"
                            >
                                <Plus className="h-4 w-4" />
                                New Invoice
                            </button>
                        </div>
                    </div>

                    <div className="mt-5 grid grid-cols-1 gap-3 lg:grid-cols-[minmax(0,1fr)_160px_160px]">
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
                                setStatusFilter(value as InvoiceStatusFilterValue);
                                setPage(1);
                            }}
                            wrapperClassName="w-full"
                            selectClassName="h-11 rounded-lg border-[#D7DDE8] bg-[#F8FAFB] pl-4 pr-10 text-sm text-[#101828] shadow-none focus:border-[#C9D3E0] focus:bg-white focus:ring-0"
                        />
                        <SelectField
                            options={sortOptions}
                            value={sortOrder}
                            onChange={(value) => {
                                setSortOrder(value as InvoiceSortValue);
                                setPage(1);
                            }}
                            wrapperClassName="w-full"
                            selectClassName="h-11 rounded-lg border-[#D7DDE8] bg-[#F8FAFB] pl-4 pr-10 text-sm text-[#101828] shadow-none focus:border-[#C9D3E0] focus:bg-white focus:ring-0"
                        />
                    </div>

                    <div className="mt-3">
                        <InvoicesTable
                            invoices={paginatedInvoices}
                            currentPage={currentPage}
                            totalPages={totalPages}
                            totalItems={filteredInvoices.length}
                            onPageChange={setPage}
                            onView={handleViewInvoice}
                            onEdit={openEditInvoiceModal}
                            onDownload={handleDownloadInvoice}
                            onDelete={handleDeleteInvoice}
                        />
                    </div>
                </section>
            </div>

            {isCreateInvoiceOpen ? (
                <CreateInvoiceModal
                    key={editingInvoice?.id ?? "new-invoice"}
                    isOpen={isCreateInvoiceOpen}
                    invoice={editingInvoice}
                    carrierOptions={dataset.carrierOptions}
                    loadDetailsByCarrier={dataset.loadDetailsByCarrier}
                    pricingPlan={dataset.pricingPlan}
                    onClose={closeCreateInvoiceModal}
                    onSave={handleSaveInvoice}
                />
            ) : null}

            <InvoicePreviewModal
                isOpen={Boolean(previewInvoice)}
                invoice={previewInvoice}
                onClose={() => setPreviewInvoice(null)}
                onDownload={handleDownloadInvoice}
            />
        </>
    );
}
