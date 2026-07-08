"use client";

import { UploadIcon } from "@/src/icons";
import React, { useRef, useState } from "react";
import { Upload } from "lucide-react";

type UploadDropzoneFieldProps = {
    label?: string;
    hint?: string; // e.g. "JPG or PNG (max 3MB)"
    description?: string;
    accept?: string; // "image/png,image/jpeg"
    maxSizeMb?: number;
    required?: boolean;
    error?: string;
    onFileChange?: (file: File | null) => void;
    className?: string;
    dropzoneClassName?: string;
    dropzoneBackgroundClassName?: string;
    dropzoneHoverBackgroundClassName?: string;
    resetSignal?: number | string;
};

export default function UploadDropzoneField({
    label,
    hint = "PNG, JPG up to 5Mb",
    description = "Click to upload or drag and drop",
    accept = "image/png,image/jpeg",
    maxSizeMb = 5,
    required = false,
    error,
    onFileChange,
    className = "",
    dropzoneClassName = "",
    dropzoneBackgroundClassName = "bg-[#F9FAFB]",
    dropzoneHoverBackgroundClassName = "hover:bg-[#F8FAFC]",
    resetSignal,
}: UploadDropzoneFieldProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [fileName, setFileName] = useState<string>('');

    React.useEffect(() => {
        setFileName("");
    }, [resetSignal]);

    const validateAndSet = (file: File | null) => {
        if (!file) {
            setFileName("");
            onFileChange?.(null);
            return;
        }

    const maxBytes = maxSizeMb * 1024 * 1024;
    if (file.size > maxBytes) {
      setFileName('');
      onFileChange?.(null);
      alert(`File too large. Max ${maxSizeMb}MB`);
      return;
    }

    setFileName(file.name);
    onFileChange?.(file);
  };

  const onPick = () => inputRef.current?.click();

  const onDrop: React.DragEventHandler<HTMLDivElement> = e => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0] ?? null;
    validateAndSet(file);
  };

    return (
        <div className={["w-full", className].join(" ")}>
            {label ? (
                <label className="text-[1rem] font-medium text-[#161721]">
                    {label} {required ? <span className="text-red-500">*</span> : null}
                </label>
            ) : null}

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={e => {
          const file = e.target.files?.[0] ?? null;
          validateAndSet(file);
          e.currentTarget.value = '';
        }}
      />

            <div
                onClick={onPick}
                onDragOver={(e) => e.preventDefault()}
                onDrop={onDrop}
                className={[
                    label ? "mt-2" : "",
                    "w-full cursor-pointer rounded-[16px]",
                    "border border-dashed border-[#98A2B3]",
                    "px-4 py-10 sm:px-6 sm:py-12",
                    "flex flex-col items-center justify-center gap-2 text-center",
                    "transition-colors duration-200 hover:border-[#667085]",
                    dropzoneBackgroundClassName,
                    dropzoneHoverBackgroundClassName,
                    dropzoneClassName,
                ].join(" ")}
            >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#EEF2F6] text-[#475467]">
                    <Upload size={20} strokeWidth={2.25} />
                </div>

                <div className="space-y-1">
                    <p className="text-[1rem] font-medium text-[#101828]">
                        {description}
                    </p>
                    <div className="text-sm text-[#98A2B3]">{hint}</div>
                </div>

                {fileName ? (
                    <div className="mt-1 text-sm font-medium text-[#344054]">
                        {fileName}
                    </div>
                ) : null}
            </div>

            {error ? <p className="mt-2 text-[12px] text-red-600">{error}</p> : null}
        </div>
    );
}
