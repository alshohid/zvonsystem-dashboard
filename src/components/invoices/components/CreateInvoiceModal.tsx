"use client";

import { useMemo, useState } from "react";
import { CalendarDays, X } from "lucide-react";
import { Input } from "../../ui/input";
import { Modal } from "../../ui/modal";
import SelectField from "../../ui/input/searchInput/SelectField";
import {
    CarrierOption,
    InvoiceFormValues,
    InvoiceLoadDetail,
    InvoicePricingPlan,
    InvoiceRecord,
} from "../invoiceTypes";
import {
    getInvoiceTotalDue,
    getSelectedRevenue,
} from "../invoiceUtils";
import InvoiceLoadDetailsSection from "./InvoiceLoadDetailsSection";
import InvoicePaymentCalculationSection from "./InvoicePaymentCalculationSection";

type CreateInvoiceModalProps = {
    isOpen: boolean;
    invoice?: InvoiceRecord | null;
    carrierOptions: CarrierOption[];
    loadDetailsByCarrier: Record<string, InvoiceLoadDetail[]>;
    pricingPlan: InvoicePricingPlan;
    onClose: () => void;
    onSave: (values: InvoiceFormValues) => void;
};

function getDateInputValue(value: string) {
    const trimmedValue = value.trim();

    if (!trimmedValue || trimmedValue === "-") {
        return "";
    }

    if (/^\d{4}-\d{2}-\d{2}$/.test(trimmedValue)) {
        return trimmedValue;
    }

    const slashDateMatch = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/.exec(trimmedValue);

    if (!slashDateMatch) {
        return "";
    }

    const [, month, day, year] = slashDateMatch;

    return year + "-" + month.padStart(2, "0") + "-" + day.padStart(2, "0");
}

function getInvoiceDateLabel(value: string) {
    const dateInputValue = getDateInputValue(value);

    if (!dateInputValue) {
        return "";
    }

    const [year, month, day] = dateInputValue.split("-");

    return month + "/" + day + "/" + year;
}

function DateTextField({
    id,
    label,
    value,
    min,
    max,
    onChange,
}: {
    id: string;
    label: string;
    value: string;
    min?: string;
    max?: string;
    onChange: (value: string) => void;
}) {
    return (
        <div>
            <label htmlFor={id} className="text-sm font-semibold text-[#101828]">
                {label}
            </label>
            <div className="relative mt-2">
                <Input
                    id={id}
                    type="date"
                    value={value}
                    min={min}
                    max={max}
                    onClick={(event) => {
                        try {
                            event.currentTarget.showPicker?.();
                        } catch {
                            event.currentTarget.focus();
                        }
                    }}
                    onChange={(event) => onChange(event.target.value)}
                    className="h-10 rounded-lg border-[#D7DDE8] bg-white pr-10 text-sm text-[#101828] shadow-none focus-visible:ring-0"
                />
                <CalendarDays className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#667085]" />
            </div>
        </div>
    );
}

export default function CreateInvoiceModal({
    isOpen,
    invoice,
    carrierOptions,
    loadDetailsByCarrier,
    pricingPlan,
    onClose,
    onSave,
}: CreateInvoiceModalProps) {
    const [invoiceNumber, setInvoiceNumber] = useState(invoice?.invoiceNumber ?? "INV-2024-001");
    const [carrierId, setCarrierId] = useState(invoice?.carrierId ?? "");
    const [startDate, setStartDate] = useState(() => getDateInputValue(invoice?.startDate ?? ""));
    const [endDate, setEndDate] = useState(() => getDateInputValue(invoice?.endDate ?? ""));
    const [notes, setNotes] = useState(invoice?.notes ?? "");

    const selectedLoads = useMemo(
        () => (carrierId ? loadDetailsByCarrier[carrierId] ?? [] : []),
        [carrierId, loadDetailsByCarrier],
    );
    const selectedRevenue = getSelectedRevenue(selectedLoads);
    const totalDue = getInvoiceTotalDue(selectedLoads, pricingPlan);
    const hasCarrier = Boolean(carrierId);
    const canSave = invoiceNumber.trim().length > 0 && hasCarrier;
    const startDateLabel = getInvoiceDateLabel(startDate);
    const endDateLabel = getInvoiceDateLabel(endDate);

    const handleSave = () => {
        if (!canSave) {
            return;
        }

        onSave({
            invoiceNumber: invoiceNumber.trim(),
            carrierId,
            startDate: startDateLabel,
            endDate: endDateLabel,
            notes: notes.trim(),
        });
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            showCloseButton={false}
            className="mx-4 max-h-[92vh] max-w-[980px] overflow-y-auto rounded-[14px] border border-[#E4E7EC] shadow-[0_24px_80px_rgba(16,24,40,0.22)]"
            overlayClassName="bg-[#10182866] backdrop-blur-[3px]"
        >
            <div className="p-5 sm:p-7">
                <div className="flex items-start justify-between gap-4">
                    <h2 className="text-2xl font-semibold tracking-[-0.02em] text-[#101828]">
                        {invoice ? "Edit Invoice" : "Create Invoice"}
                    </h2>
                    <button
                        type="button"
                        onClick={onClose}
                        className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#E4E7EC] text-[#101828] transition hover:bg-[#F8FAFC]"
                        aria-label="Close create invoice modal"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                        <label htmlFor="invoice-number" className="text-sm font-semibold text-[#101828]">
                            Invoice Number <span className="text-[#DC2626]">*</span>
                        </label>
                        <Input
                            id="invoice-number"
                            value={invoiceNumber}
                            onChange={(event) => setInvoiceNumber(event.target.value)}
                            placeholder="INV-2024-001"
                            className="mt-2 h-10 rounded-lg border-[#D7DDE8] bg-white text-sm text-[#101828] shadow-none placeholder:text-[#98A2B3] focus-visible:ring-0"
                        />
                    </div>

                    <SelectField
                        label="Carrier"
                        required
                        options={carrierOptions}
                        placeholder="Select Carrier"
                        value={carrierId}
                        onChange={setCarrierId}
                        labelClassName="text-sm font-semibold text-[#101828]"
                        selectClassName="h-10 rounded-lg border-[#D7DDE8] bg-white px-3 text-sm text-[#101828] shadow-none focus:border-[#C9D3E0] focus:bg-white focus:ring-0"
                    />

                    <DateTextField
                        id="invoice-start-date"
                        label="Start Date"
                        value={startDate}
                        max={endDate || undefined}
                        onChange={setStartDate}
                    />
                    <DateTextField
                        id="invoice-end-date"
                        label="End Date"
                        value={endDate}
                        min={startDate || undefined}
                        onChange={setEndDate}
                    />
                </div>

                <div className="mt-5 space-y-5">
                    <InvoiceLoadDetailsSection
                        loads={selectedLoads}
                        hasCarrier={hasCarrier}
                        startDate={startDateLabel}
                        endDate={endDateLabel}
                    />

                    <InvoicePaymentCalculationSection
                        pricingPlan={pricingPlan}
                        selectedRevenue={selectedRevenue}
                        totalDue={totalDue}
                        hasCarrier={hasCarrier}
                    />

                    <div>
                        <label htmlFor="invoice-notes" className="text-sm font-semibold text-[#101828]">
                            Notes / Terms
                        </label>
                        <textarea
                            id="invoice-notes"
                            value={notes}
                            onChange={(event) => setNotes(event.target.value)}
                            placeholder="Payment terms, special instructions, etc."
                            rows={3}
                            className="mt-2 w-full resize-none rounded-lg border border-[#D7DDE8] bg-white px-3 py-2 text-sm text-[#101828] outline-none placeholder:text-[#98A2B3] focus:border-[#C9D3E0]"
                        />
                    </div>
                </div>

                <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:justify-end">
                    <button
                        type="button"
                        onClick={onClose}
                        className="inline-flex h-11 items-center justify-center rounded-lg border border-[#D7DDE8] bg-white px-5 text-sm font-semibold text-[#2E3A83] transition hover:bg-[#F8FAFC]"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={handleSave}
                        disabled={!canSave}
                        className="inline-flex h-11 items-center justify-center rounded-lg bg-[#2E3A83] px-5 text-sm font-semibold text-white transition hover:bg-[#25306F] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        Save
                    </button>
                </div>
            </div>
        </Modal>
    );
}
