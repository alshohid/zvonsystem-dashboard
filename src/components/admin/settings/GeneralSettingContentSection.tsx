"use client";

import { useState } from "react";
import UploadDropzoneField from "@/src/components/ui/input/UploadDropzoneField";
import TextInputField from "@/src/components/ui/input/TextInputField";

type GeneralSettingsForm = {
    organizationName: string;
    companyDisplayName: string;
    phoneNumber: string;
    primaryDispatchEmail: string;
    businessAddress: string;
    website: string;
};

const initialSettings: GeneralSettingsForm = {
    organizationName: "",
    companyDisplayName: "",
    phoneNumber: "",
    primaryDispatchEmail: "",
    businessAddress: "",
    website: "",
};

const textFieldClassName =
    "h-12 rounded-[12px] border border-[#D0D5DD] bg-white px-4 text-[1rem] text-[#101828]! placeholder:text-[#98A2B3] focus:border-[#2E3A83] focus:ring-2 focus:ring-[#2E3A83]/10";

function FieldLabel({
    children,
    required = false,
}: {
    children: React.ReactNode;
    required?: boolean;
}) {
    return (
        <label className="mb-2 block text-[1rem] font-medium text-[#101828]">
            {children}
            {required ? <span className="text-[#D92D20]"> *</span> : null}
        </label>
    );
}

const GenereralSettingContentSection = () => {
    const [settings, setSettings] = useState<GeneralSettingsForm>(initialSettings);
    const [logoFile, setLogoFile] = useState<File | null>(null);
    const [uploadResetSignal, setUploadResetSignal] = useState(0);

    const handleFieldChange =
        (field: keyof GeneralSettingsForm) =>
            (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
                const { value } = event.target;
                setSettings((prev) => ({ ...prev, [field]: value }));
            };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("General settings:", settings, "logo:", logoFile);
    };

    const handleCancel = () => {
        setSettings(initialSettings);
        setLogoFile(null);
        setUploadResetSignal((prev) => prev + 1);
    };

    return (
        <form onSubmit={handleSubmit} className="w-full">
            <section className="rounded-[1.75rem] border border-[#E4E7EC] bg-white p-5 shadow-[0_1px_2px_rgba(16,24,40,0.04)] sm:p-6">
                <h2 className="text-[1.75rem] font-semibold tracking-[-0.03em] text-[#101828]">
                    Edit Your Organization
                </h2>

                <div className="mt-6">
                    <UploadDropzoneField
                        hint="PNG, JPG up to 5Mb (Will appear on invoice)"
                        description="Click to upload or drag and drop"
                        maxSizeMb={5}
                        onFileChange={setLogoFile}
                        dropzoneBackgroundClassName="bg-[#F9FAFB]"
                        dropzoneHoverBackgroundClassName="hover:bg-[#F2F4F7]"
                        resetSignal={uploadResetSignal}
                    />
                </div>

                <div className="mt-6 grid gap-5 md:grid-cols-2">
                    <TextInputField
                        label="Organization Name"
                        required
                        placeholder="Enter Broker Name"
                        value={settings.organizationName}
                        onChange={handleFieldChange("organizationName")}
                        inputClassName={textFieldClassName}
                    />

                    <TextInputField
                        label="Company Display Name"
                        placeholder="Enter Broker Reference Number"
                        value={settings.companyDisplayName}
                        onChange={handleFieldChange("companyDisplayName")}
                        inputClassName={textFieldClassName}
                    />

                    <TextInputField
                        label="Phone Number"
                        placeholder="Enter Broker Email"
                        value={settings.phoneNumber}
                        onChange={handleFieldChange("phoneNumber")}
                        inputClassName={textFieldClassName}
                    />

                    <TextInputField
                        label="Primary Dispatch Email"
                        placeholder="Enter Broker Phone Number"
                        value={settings.primaryDispatchEmail}
                        onChange={handleFieldChange("primaryDispatchEmail")}
                        inputClassName={textFieldClassName}
                    />
                </div>

                <div className="mt-5">
                    <FieldLabel>Business Address</FieldLabel>
                    <textarea
                        value={settings.businessAddress}
                        onChange={handleFieldChange("businessAddress")}
                        rows={4}
                        placeholder="123 Main Street, Suite 100, City, State 12345"
                        className="min-h-[116px] w-full rounded-[12px] border border-[#D0D5DD] bg-white px-4 py-3 text-[1rem] text-[#101828] outline-none transition focus:border-[#2E3A83] focus:ring-2 focus:ring-[#2E3A83]/10 placeholder:text-[#98A2B3]"
                    />
                </div>

                <div className="mt-5">
                    <TextInputField
                        label="Website"
                        placeholder="http://www.yourcomapany.com"
                        value={settings.website}
                        onChange={handleFieldChange("website")}
                        inputClassName={textFieldClassName}
                    />
                </div>

                <div className="mt-6 border-t border-[#EAECF0] pt-5">
                    <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="inline-flex h-12 items-center justify-center rounded-[14px] border border-[#D0D5DD] bg-white px-6 text-[1rem] font-semibold text-[#344054] transition hover:bg-[#F9FAFB] sm:min-w-[166px]"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="inline-flex h-12 items-center justify-center rounded-[14px] bg-[#2E3A83] px-6 text-[1rem] font-semibold text-white transition hover:bg-[#25306F] sm:min-w-[166px]"
                        >
                            Save Changes
                        </button>
                    </div>
                </div>
            </section>
        </form>
    );
};

export default GenereralSettingContentSection;
