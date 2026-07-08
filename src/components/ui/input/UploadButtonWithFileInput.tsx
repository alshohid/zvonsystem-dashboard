/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useRef } from "react";
import { UploadCloud } from "lucide-react";
import FileInput from "./FileInput";

type Props = {
    onFileChange?: (file: File | null) => void;
};

export default function UploadButtonWithFileInput({ onFileChange }: Props) {
    const fileRef = useRef<HTMLInputElement | null>(null);

    return (
        <div>
            {/* Hidden File Input (reusable) */}
            <FileInput
                ref={fileRef as any}
                className="hidden"
                onChange={(e) => {
                    const file = e.target.files?.[0] ?? null;
                    onFileChange?.(file);

                    // same file select করলে onChange fire নাও হতে পারে, তাই reset:
                    e.target.value = "";
                }}
            />

            {/* Upload Button */}
            <button
                type="button"
                onClick={() => fileRef.current?.click()}
                className="relative inline-flex items-center justify-center gap-2 rounded-lg border border-[#44444A] bg-[#5B5A64] px-4 py-2 text-xs font-semibold text-white shadow-[inset_0_0_0_1.8px_rgba(255,255,255,0.25)] before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-b before:from-white/12 before:to-transparent"
            >
                <UploadCloud className="h-4 w-4 relative z-10" />
                <span className="relative z-10">Upload New</span>
            </button>
        </div>
    );
}
