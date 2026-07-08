"use client";

import { Download, FileText, Pencil, X } from "lucide-react";
import { Modal } from "@/src/components/ui/modal";
import type {
    CarrierDocumentRecord,
    DispatcherCarrierRecord,
} from "./dispatcherDetailsTypes";

type CarrierProfileDetailModalProps = {
    isOpen: boolean;
    carrier: DispatcherCarrierRecord | null;
    onClose: () => void;
};

export default function CarrierProfileDetailModal({
    isOpen,
    carrier,
    onClose,
}: CarrierProfileDetailModalProps) {
    if (!carrier) {
        return null;
    }

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            className="mx-3 my-5 max-h-[calc(100vh-2rem)] w-full max-w-[720px] overflow-y-auto rounded-lg border border-[#E4E7EC] bg-white p-4 shadow-[0_24px_80px_rgba(16,24,40,0.24)] sm:mx-4 sm:p-5"
            contentBgClassName="bg-white"
            textClassName="text-[#101828]"
            overlayClassName="bg-[rgba(16,24,40,0.28)] backdrop-blur-[4px]"
            showCloseButton={false}
        >
            <div className="flex items-start justify-between gap-4">
                <h2 className="text-xl font-semibold leading-7 text-[#101828]">
                    Carrier&apos;s Profile Detail #ID_{carrier.id}
                </h2>

                <button
                    type="button"
                    onClick={onClose}
                    className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#E4E7EC] bg-white text-[#101828] transition hover:bg-[#F8FAFC]"
                    aria-label="Close carrier profile modal"
                >
                    <X className="h-4 w-4" />
                </button>
            </div>

            <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-[190px_minmax(0,1fr)]">
                <CarrierProfileCard carrier={carrier} />
                <CarrierProfileFields carrier={carrier} />
            </div>

            <section className="mt-6">
                <h3 className="text-xl font-semibold leading-7 text-[#101828]">
                    Carrier&apos;s Documents
                </h3>

                <div className="mt-4 grid grid-cols-1 gap-x-4 gap-y-3 md:grid-cols-2">
                    {carrier.documents.map((document) => (
                        <CarrierDocumentItem key={document.id} document={document} />
                    ))}
                </div>
            </section>
        </Modal>
    );
}

function CarrierProfileCard({ carrier }: { carrier: DispatcherCarrierRecord }) {
    return (
        <aside className="rounded-md bg-[#F8FAFC] p-4">
            <div className="flex justify-end">
                <button
                    type="button"
                    className="inline-flex h-7 w-7 items-center justify-center rounded-md text-[#667085] transition hover:bg-white"
                    aria-label="Edit carrier profile"
                >
                    <Pencil className="h-4 w-4" />
                </button>
            </div>

            <div className="mt-2 flex flex-col items-center text-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#D9DDEA] text-sm font-semibold text-[#101828]">
                    {carrier.initials}
                </span>
                <h3 className="mt-4 text-sm font-semibold text-[#101828]">{carrier.name}</h3>
            </div>

            <div className="mt-6 space-y-4">
                <ProfileInfo label="Email" value={carrier.email ?? "delta@gmail.com"} />
                <ProfileInfo label="Contact" value={carrier.contact} />
                <ProfileInfo label="Address" value={carrier.address} />
            </div>
        </aside>
    );
}

function ProfileInfo({ label, value }: { label: string; value: string }) {
    return (
        <div>
            <p className="text-sm font-semibold text-[#101828]">{label}</p>
            <p className="mt-1 break-words text-xs text-[#667085]">{value}</p>
        </div>
    );
}

function CarrierProfileFields({ carrier }: { carrier: DispatcherCarrierRecord }) {
    const profileRows = [
        { label: "DBA Name", value: carrier.dbaName },
        { label: "MC No.", value: carrier.mcNumber },
        { label: "DOT No.", value: carrier.dotNumber },
    ];

    return (
        <div className="space-y-4">
            {profileRows.map((row) => (
                <EditableProfileField key={row.label} label={row.label} value={row.value} />
            ))}

            <div>
                <div className="flex items-center justify-between gap-3">
                    <div>
                        <p className="text-sm font-semibold text-[#101828]">Pricing Plan</p>
                    </div>
                    <button
                        type="button"
                        className="inline-flex h-7 w-7 items-center justify-center rounded-md text-[#667085] transition hover:bg-[#F8FAFC]"
                        aria-label="Edit pricing plan"
                    >
                        <Pencil className="h-4 w-4" />
                    </button>
                </div>
                <select
                    value={carrier.pricingPlan}
                    onChange={() => undefined}
                    className="mt-2 h-10 w-full rounded-md border border-[#E4E7EC] bg-white px-3 text-sm text-[#101828] outline-none focus:border-[#2E3A83] focus:ring-2 focus:ring-[#2E3A83]/10"
                >
                    <option value={carrier.pricingPlan}>{carrier.pricingPlan}</option>
                    <option value="Advance Plan">Advance Plan</option>
                </select>
            </div>
        </div>
    );
}

function EditableProfileField({ label, value }: { label: string; value: string }) {
    return (
        <div className="border-b border-[#E4E7EC] pb-3">
            <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                    <p className="text-sm font-semibold text-[#101828]">{label}</p>
                    <p className="mt-1 break-words text-xs text-[#667085]">{value}</p>
                </div>
                <button
                    type="button"
                    className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-[#667085] transition hover:bg-[#F8FAFC]"
                    aria-label={`Edit ${label}`}
                >
                    <Pencil className="h-4 w-4" />
                </button>
            </div>
        </div>
    );
}

function CarrierDocumentItem({ document }: { document: CarrierDocumentRecord }) {
    return (
        <div>
            <p className="text-sm font-semibold text-[#101828]">
                {document.label}{" "}
                {document.required ? <span className="text-[#E02D3C]">*</span> : null}
            </p>

            <div className="mt-1 flex min-w-0 items-center gap-3 rounded-md bg-[#F8FAFC] px-3 py-2">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-[#D8DDE8] bg-white text-[#667085]">
                    <FileText className="h-4 w-4" />
                </span>
                <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-semibold text-[#101828]">
                        {document.fileName}
                    </p>
                    <p className="mt-0.5 truncate text-[11px] text-[#667085]">
                        {document.meta}
                    </p>
                </div>
                <button
                    type="button"
                    className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-[#667085] transition hover:bg-white"
                    aria-label={`Download ${document.fileName}`}
                >
                    <Download className="h-4 w-4" />
                </button>
            </div>
        </div>
    );
}
