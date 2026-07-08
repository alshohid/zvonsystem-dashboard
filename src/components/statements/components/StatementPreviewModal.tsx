"use client";

import { Download, X } from "lucide-react";
import { Modal } from "../../ui/modal";
import { StatementRecord } from "../statementTypes";
import { formatStatementCurrency } from "../statementUtils";

type StatementPreviewModalProps = {
    isOpen: boolean;
    statement: StatementRecord | null;
    onClose: () => void;
    onDownload: (statement: StatementRecord) => void;
};

export default function StatementPreviewModal({
    isOpen,
    statement,
    onClose,
    onDownload,
}: StatementPreviewModalProps) {
    if (!statement) {
        return null;
    }

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            showCloseButton={false}
            className="mx-4 max-w-[720px] rounded-[14px] border border-[#E4E7EC] shadow-[0_24px_80px_rgba(16,24,40,0.22)]"
            overlayClassName="bg-[#10182866] backdrop-blur-[3px]"
        >
            <div className="bg-white p-5 sm:p-7">
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <p className="text-sm font-medium text-[#667085]">Statement Preview</p>
                        <h2 className="mt-1 text-2xl font-semibold tracking-[-0.02em] text-[#101828]">
                            {statement.statementNumber}
                        </h2>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#E4E7EC] text-[#101828] transition hover:bg-[#F8FAFC]"
                        aria-label="Close statement preview"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {[
                        ["Carrier / Driver", statement.recipientName],
                        ["Period", statement.period],
                        ["Loads", String(statement.loads)],
                        ["Revenue", formatStatementCurrency(statement.revenue)],
                        ["Status", statement.status],
                        ["Created", statement.createdAt],
                    ].map(([label, value]) => (
                        <div key={label} className="rounded-lg border border-[#EAECF0] bg-[#F8FAFC] p-4">
                            <p className="text-xs font-medium text-[#667085]">{label}</p>
                            <p className="mt-1 text-sm font-semibold text-[#101828]">{value}</p>
                        </div>
                    ))}
                </div>

                <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <button
                        type="button"
                        onClick={onClose}
                        className="inline-flex h-11 items-center justify-center rounded-lg border border-[#D7DDE8] bg-white px-5 text-sm font-semibold text-[#2E3A83] transition hover:bg-[#F8FAFC]"
                    >
                        Close
                    </button>
                    <button
                        type="button"
                        onClick={() => onDownload(statement)}
                        className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#2E3A83] px-5 text-sm font-semibold text-white transition hover:bg-[#25306F]"
                    >
                        <Download className="h-4 w-4" />
                        Download
                    </button>
                </div>
            </div>
        </Modal>
    );
}
