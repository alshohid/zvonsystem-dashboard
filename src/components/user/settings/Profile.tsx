/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import TextInputField from "../../ui/input/TextInputField";
import UploadDropzoneField from "../../ui/input/UploadDropzoneField";
import Image from "next/image";
import { CameraIcon } from "lucide-react";

type ProfileFormValues = {
    funeralHomeName: string;
    businessRegNumber: string;
    primaryContactPerson: string;
    physicalAddress: string;
    primaryRegion: string;
    townsServed: string;
    businessPhone: string;
    email: string;
    vatTaxId: string;

    firstName: string;
    lastName: string;
    profileEmail: string;
};

const RowLabel = ({ children }: { children: React.ReactNode }) => (
    <p className="text-[1.125rem] font-medium text-[#111827]">{children}</p>
);

const RowValue = ({ children }: { children: React.ReactNode }) => (
    <p className="text-[1rem] text-[#777980]">{children}</p>
);

function EditButton({ onClick }: { onClick: () => void }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="text-[1rem] text-[#777980] hover:text-[#111827] transition"
        >
            Edit
        </button>
    );
}

export default function Profile() {
    const {
        register,
        setValue,
        watch,
        formState: { errors },
        handleSubmit,
    } = useForm<ProfileFormValues>({
        defaultValues: {
            funeralHomeName: "John Ryan’s Funeral Home",
            businessRegNumber: "1230 32423 12323",
            primaryContactPerson: "John Ryan",
            physicalAddress: "Old Town, 12/4 Medona Tower",
            primaryRegion: "United Kingdom",
            townsServed: "Old town",
            businessPhone: "99+ 143534284",
            email: "sample@gmail.com",
            vatTaxId: "123123 4325345 12312324",

            firstName: "John Ryan",
            lastName: "Ryan",
            profileEmail: "sample@gmail.com",
        },
        mode: "onChange",
    });

    const [editKey, setEditKey] = useState<keyof ProfileFormValues | null>(null);

    const onSubmit = (data: ProfileFormValues) => {
        console.log("Profile submit:", data);
    };

    const renderEditableRow = (
        label: string,
        field: keyof ProfileFormValues,
        placeholder?: string
    ) => {
        const isEditing = editKey === field;
        const value = watch(field) as string;

        return (
            <div className="flex items-start justify-between gap-4 border-b border-black/5 py-3">
                <div className="min-w-0">
                    <RowLabel>{label}</RowLabel>

                    {!isEditing ? (
                        <RowValue>{value || "-"}</RowValue>
                    ) : (
                        <div className="mt-2 w-full max-w-[420px]">
                            <TextInputField
                                placeholder={placeholder || ""}
                                {...register(field as any, { required: `${label} is required` })}
                                error={(errors as any)?.[field]?.message as string}
                                inputClassName="h-11 bg-white border-[#CFCFD6] text-[#161721] focus:border-[#8FA17E]"
                            />
                            <div className="mt-2 flex items-center gap-2">
                                <button
                                    type="button"
                                    onClick={() => setEditKey(null)}
                                    className="rounded-md border border-[#E9E9EA] px-3 py-1.5 text-[1rem] text-gray-700 hover:bg-gray-50"
                                >
                                    Done
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {!isEditing ? (
                    <EditButton onClick={() => setEditKey(field)} />
                ) : (
                    <button
                        type="button"
                        onClick={() => setEditKey(null)}
                        className="text-[1rem] text-gray-500 hover:text-gray-800"
                    >
                        Close
                    </button>
                )}
            </div>
        );
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            <div className="grid gap-6 lg:grid-cols-2">
                {/* LEFT PANEL */}
                <section className="rounded-[12px] border border-[#E9E9EA] bg-white p-4 sm:p-5">
                    {/* Upload */}
                    <div className="mb-4">
                        <UploadDropzoneField
                            label="Upload"
                            hint="JPG or PNG (max 3MB)"
                            maxSizeMb={3}
                            onFileChange={(file) => console.log("file uploaded:", file)}
                        />
                    </div>

                    {/* Details list */}
                    <div className="space-y-0">
                        {renderEditableRow("Funeral Home Name", "funeralHomeName")}
                        {renderEditableRow("Business Registration Number", "businessRegNumber")}
                        {renderEditableRow("Primary Contact Person", "primaryContactPerson")}
                        {renderEditableRow("Physical Address", "physicalAddress")}
                        {renderEditableRow("Primary Region", "primaryRegion")}
                        {renderEditableRow("Towns Served", "townsServed")}
                        {renderEditableRow("Business Phone", "businessPhone")}
                        {renderEditableRow("Email", "email")}
                        {renderEditableRow("VAT/Tax ID Number", "vatTaxId")}
                    </div>

                    {/* Save button */}
                    <button
                        type="submit"
                        className="
              mt-5
              w-full
              h-12
              rounded-[10px]
              bg-[linear-gradient(180deg,#394034_0%,#4F5747_100%)]
              text-white text-[13px] font-medium
              hover:opacity-90 transition
            "
                    >
                        Save Changes
                    </button>
                </section>

                {/* RIGHT PANEL */}
                <section className="rounded-[12px] bg-white p-4 sm:p-5">
                    <h2 className="text-[1.625rem] font-semibold text-[#111827]">
                        Basic Details
                    </h2>

                    {/* Avatar */}
                    <div className="mt-4 flex items-center gap-4">
                        <div className="relative">
                            <Image
                                src="/images/user/user_01.png"
                                alt="profile"
                                width={64}
                                height={64}
                                className="h-16 w-16 rounded-full object-cover border border-black/10"
                            />

                            <CameraIcon className="absolute bottom-0 right-0 h-5 w-5 rounded-full bg-[#7AC142] border-2 border-white" />
                        </div>
                    </div>

                    <div className="mt-5 space-y-0">
                        {renderEditableRow("First Name", "firstName")}
                        {renderEditableRow("Last Name", "lastName")}
                        {renderEditableRow("Email", "profileEmail")}
                    </div>
                </section>
            </div>
        </form>
    );
}