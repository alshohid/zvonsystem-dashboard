"use client";

import type { FormEvent, ReactNode } from "react";
import { useState } from "react";
import { Eye, EyeOff, Mail } from "lucide-react";
import { Modal } from "@/src/components/ui/modal";
import type { CreateOrganizationFormValues } from "./organizationTypes";

type CreateOrganizationModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (values: CreateOrganizationFormValues) => void;
};

const emptyFormValues: CreateOrganizationFormValues = {
    companyName: "",
    adminName: "",
    adminEmail: "",
    temporaryPassword: "",
};

type TextFieldProps = {
    id: string;
    label: string;
    value: string;
    placeholder: string;
    type?: string;
    autoComplete?: string;
    rightElement?: ReactNode;
    onChange: (value: string) => void;
};

function TextField({
    id,
    label,
    value,
    placeholder,
    type = "text",
    autoComplete,
    rightElement,
    onChange,
}: TextFieldProps) {
    return (
        <div>
            <label htmlFor={id} className="text-sm font-semibold text-[#101828]">
                {label}
            </label>
            <div className="relative mt-2">
                <input
                    id={id}
                    type={type}
                    value={value}
                    autoComplete={autoComplete}
                    onChange={(event) => onChange(event.target.value)}
                    placeholder={placeholder}
                    className={[
                        "h-10 w-full rounded-md border border-[#D8DDE8] bg-white px-3 text-sm text-[#101828] outline-none",
                        "placeholder:text-[#8A92A6] focus:border-[#2E3A83] focus:ring-2 focus:ring-[#2E3A83]/10",
                        rightElement ? "pr-11" : "",
                    ].join(" ")}
                />
                {rightElement ? (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        {rightElement}
                    </div>
                ) : null}
            </div>
        </div>
    );
}

export default function CreateOrganizationModal({
    isOpen,
    onClose,
    onSubmit,
}: CreateOrganizationModalProps) {
    const [formValues, setFormValues] =
        useState<CreateOrganizationFormValues>(emptyFormValues);
    const [showPassword, setShowPassword] = useState(false);

    const updateField = <Key extends keyof CreateOrganizationFormValues>(
        key: Key,
        value: CreateOrganizationFormValues[Key],
    ) => {
        setFormValues((currentValues) => ({
            ...currentValues,
            [key]: value,
        }));
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSubmit({
            companyName: formValues.companyName.trim(),
            adminName: formValues.adminName.trim(),
            adminEmail: formValues.adminEmail.trim(),
            temporaryPassword: formValues.temporaryPassword,
        });
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            showCloseButton={false}
            className="mx-4 my-6 w-full max-w-[760px] rounded-lg border border-[#E4E7EC] bg-white p-5 shadow-[0_24px_80px_rgba(16,24,40,0.24)] sm:p-6"
            contentBgClassName="bg-white"
            textClassName="text-[#101828]"
            overlayClassName="bg-[rgba(16,24,40,0.28)] backdrop-blur-[4px]"
        >
            <form onSubmit={handleSubmit}>
                <div className="text-center">
                    <h2 className="text-xl font-semibold leading-7 text-[#101828] sm:text-2xl">
                        Create &amp; Invite an Organization
                    </h2>
                    <p className="mt-1 text-sm text-[#667085]">
                        Invite an organization via their email address to sell the platform.
                    </p>
                </div>

                <div className="mt-5 rounded-lg border border-[#D8DDE8] bg-[#F1F4FC] px-3 py-3 text-sm leading-6 text-[#344054] sm:px-4">
                    <p className="font-semibold text-[#101828]">Note:</p>
                    <p className="mt-1">
                        This will generate an independent, isolated workspace. For data
                        security, you will not have access to view or manage this
                        organization&apos;s data once their account is activated.
                    </p>
                </div>

                <div className="mt-5 space-y-3">
                    <TextField
                        id="organization-company-name"
                        label="Organization / Company Name"
                        value={formValues.companyName}
                        placeholder="Owner's name"
                        onChange={(value) => updateField("companyName", value)}
                    />

                    <TextField
                        id="organization-admin-name"
                        label="Admin Name"
                        value={formValues.adminName}
                        placeholder="Admin Name"
                        onChange={(value) => updateField("adminName", value)}
                    />

                    <TextField
                        id="organization-admin-email"
                        label="Admin Email Address"
                        type="email"
                        autoComplete="email"
                        value={formValues.adminEmail}
                        placeholder="User's email Address"
                        onChange={(value) => updateField("adminEmail", value)}
                    />

                    <TextField
                        id="organization-temporary-password"
                        label="Temporary Password"
                        type={showPassword ? "text" : "password"}
                        autoComplete="new-password"
                        value={formValues.temporaryPassword}
                        placeholder="Set password"
                        onChange={(value) => updateField("temporaryPassword", value)}
                        rightElement={
                            <button
                                type="button"
                                onClick={() => setShowPassword((currentValue) => !currentValue)}
                                className="inline-flex h-6 w-6 items-center justify-center text-[#8A92A6] transition hover:text-[#2E3A83]"
                                aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                                {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                            </button>
                        }
                    />
                </div>

                <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <button
                        type="button"
                        onClick={onClose}
                        className="inline-flex h-11 items-center justify-center rounded-md border border-[#D8DDE8] bg-white px-5 text-sm font-semibold text-[#101828] transition hover:bg-[#F8FAFC]"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-[#2E3A83] px-5 text-sm font-semibold text-white transition hover:bg-[#25306F]"
                    >
                        <Mail className="h-4 w-4" />
                        Send Invitation
                    </button>
                </div>
            </form>
        </Modal>
    );
}
