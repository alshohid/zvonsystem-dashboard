"use client";

import { X } from "lucide-react";
import { Modal } from "@/src/components/ui/modal";
import type { OrganizationRecord } from "./organizationTypes";

type OrganizationInformationModalProps = {
    isOpen: boolean;
    organization: OrganizationRecord | null;
    onClose: () => void;
};

type InformationFieldProps = {
    label: string;
    value?: string;
};

function InformationField({ label, value }: InformationFieldProps) {
    return (
        <div className="border-b border-[#EEF0F5] pb-3">
            <p className="text-sm font-semibold text-[#101828]">{label}</p>
            <p className="mt-1 text-sm text-[#8A92A6]">{value || "N/A"}</p>
        </div>
    );
}

export default function OrganizationInformationModal({
    isOpen,
    organization,
    onClose,
}: OrganizationInformationModalProps) {
    if (!organization) {
        return null;
    }

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            showCloseButton={false}
            className="mx-4 my-6 w-full max-w-[1040px] rounded-lg border border-[#E4E7EC] bg-white p-5 shadow-[0_24px_80px_rgba(16,24,40,0.22)] sm:p-7"
            contentBgClassName="bg-white"
            textClassName="text-[#101828]"
            overlayClassName="bg-[rgba(16,24,40,0.28)] backdrop-blur-[4px]"
        >
            <div className="flex items-start justify-between gap-4">
                <h2 className="text-xl font-semibold leading-7 text-[#101828] sm:text-2xl">
                    Organization&apos;s Information
                </h2>

                <button
                    type="button"
                    onClick={onClose}
                    className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#E4E7EC] bg-white text-[#101828] transition hover:bg-[#F8FAFC]"
                    aria-label="Close organization information modal"
                >
                    <X className="h-4 w-4" />
                </button>
            </div>

            <div className="mt-5 grid grid-cols-1 gap-x-10 gap-y-4 md:grid-cols-2">
                <InformationField label="Admin Name" value={organization.adminName} />
                <InformationField label="Company Name" value={organization.companyName} />
                <InformationField label="Phone Number" value={organization.phoneNumber} />
                <InformationField
                    label="Admin Email Address"
                    value={organization.adminEmail}
                />
                <InformationField
                    label="Business Address"
                    value={organization.businessAddress}
                />
            </div>
        </Modal>
    );
}
