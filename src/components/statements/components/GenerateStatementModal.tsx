"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { Input } from "../../ui/input";
import { Modal } from "../../ui/modal";
import SelectField, { SelectOption } from "../../ui/input/searchInput/SelectField";
import {
    StatementFormValues,
    StatementRecipientOption,
    StatementRecord,
    StatementStatus,
} from "../statementTypes";

type GenerateStatementModalProps = {
    isOpen: boolean;
    statement?: StatementRecord | null;
    defaultStatementNumber?: string;
    recipientOptions: StatementRecipientOption[];
    onClose: () => void;
    onSave: (values: StatementFormValues) => void;
};

const statusOptions: SelectOption[] = [
    { value: "Generated", label: "Generated" },
    { value: "Draft", label: "Draft" },
    { value: "Reviewed", label: "Reviewed" },
    { value: "Downloaded", label: "Downloaded" },
];

export default function GenerateStatementModal({
    isOpen,
    statement,
    defaultStatementNumber,
    recipientOptions,
    onClose,
    onSave,
}: GenerateStatementModalProps) {
    const [statementNumber, setStatementNumber] = useState(
        statement?.statementNumber ?? defaultStatementNumber ?? "STM-2024-001",
    );
    const [recipientId, setRecipientId] = useState(statement?.recipientId ?? "");
    const [period, setPeriod] = useState(statement?.period ?? "06/22/2025 - 07/22/2025");
    const [loads, setLoads] = useState(String(statement?.loads ?? 24));
    const [revenue, setRevenue] = useState(String(statement?.revenue ?? 2250));
    const [status, setStatus] = useState<StatementStatus>(statement?.status ?? "Generated");
    const canSave = statementNumber.trim().length > 0 && recipientId.trim().length > 0;

    const handleSave = () => {
        if (!canSave) {
            return;
        }

        onSave({
            statementNumber: statementNumber.trim(),
            recipientId,
            period: period.trim(),
            loads: Number(loads) || 0,
            revenue: Number(revenue) || 0,
            status,
        });
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            showCloseButton={false}
            className="mx-4 max-h-[92vh] max-w-[760px] overflow-y-auto rounded-[14px] border border-[#E4E7EC] shadow-[0_24px_80px_rgba(16,24,40,0.22)]"
            overlayClassName="bg-[#10182866] backdrop-blur-[3px]"
        >
            <div className="p-5 sm:p-7">
                <div className="flex items-start justify-between gap-4">
                    <h2 className="text-2xl font-semibold tracking-[-0.02em] text-[#101828]">
                        {statement ? "Edit Statement" : "Generate Statement"}
                    </h2>
                    <button
                        type="button"
                        onClick={onClose}
                        className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#E4E7EC] text-[#101828] transition hover:bg-[#F8FAFC]"
                        aria-label="Close statement modal"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                        <label htmlFor="statement-number" className="text-sm font-semibold text-[#101828]">
                            Statement Number <span className="text-[#DC2626]">*</span>
                        </label>
                        <Input
                            id="statement-number"
                            value={statementNumber}
                            onChange={(event) => setStatementNumber(event.target.value)}
                            placeholder="STM-2024-001"
                            className="mt-2 h-11 rounded-lg border-[#D7DDE8] bg-white text-sm text-[#101828] shadow-none placeholder:text-[#98A2B3] focus-visible:ring-0"
                        />
                    </div>

                    <SelectField
                        label="Carrier / Driver"
                        required
                        options={recipientOptions}
                        placeholder="Select carrier or driver"
                        value={recipientId}
                        onChange={setRecipientId}
                        labelClassName="text-sm font-semibold text-[#101828]"
                        selectClassName="h-11 rounded-lg border-[#D7DDE8] bg-white px-3 text-sm text-[#101828] shadow-none focus:border-[#C9D3E0] focus:bg-white focus:ring-0"
                    />

                    <div className="md:col-span-2">
                        <label htmlFor="statement-period" className="text-sm font-semibold text-[#101828]">
                            Period
                        </label>
                        <Input
                            id="statement-period"
                            value={period}
                            onChange={(event) => setPeriod(event.target.value)}
                            placeholder="06/22/2025 - 07/22/2025"
                            className="mt-2 h-11 rounded-lg border-[#D7DDE8] bg-white text-sm text-[#101828] shadow-none placeholder:text-[#98A2B3] focus-visible:ring-0"
                        />
                    </div>

                    <div>
                        <label htmlFor="statement-loads" className="text-sm font-semibold text-[#101828]">
                            Loads
                        </label>
                        <Input
                            id="statement-loads"
                            type="number"
                            min={0}
                            value={loads}
                            onChange={(event) => setLoads(event.target.value)}
                            className="mt-2 h-11 rounded-lg border-[#D7DDE8] bg-white text-sm text-[#101828] shadow-none focus-visible:ring-0"
                        />
                    </div>

                    <div>
                        <label htmlFor="statement-revenue" className="text-sm font-semibold text-[#101828]">
                            Revenue
                        </label>
                        <Input
                            id="statement-revenue"
                            type="number"
                            min={0}
                            value={revenue}
                            onChange={(event) => setRevenue(event.target.value)}
                            className="mt-2 h-11 rounded-lg border-[#D7DDE8] bg-white text-sm text-[#101828] shadow-none focus-visible:ring-0"
                        />
                    </div>

                    <div className="md:col-span-2">
                        <SelectField
                            label="Status"
                            options={statusOptions}
                            value={status}
                            onChange={(value) => setStatus(value as StatementStatus)}
                            labelClassName="text-sm font-semibold text-[#101828]"
                            selectClassName="h-11 rounded-lg border-[#D7DDE8] bg-white px-3 text-sm text-[#101828] shadow-none focus:border-[#C9D3E0] focus:bg-white focus:ring-0"
                        />
                    </div>
                </div>

                <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2">
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
