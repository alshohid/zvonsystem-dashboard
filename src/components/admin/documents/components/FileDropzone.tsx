"use client";

import { ChangeEvent, DragEvent, useRef, useState } from "react";
import { Upload } from "lucide-react";

type FileDropzoneProps = {
    file: File | null;
    onFileChange: (file: File | null) => void;
    accept?: string;
    title?: string;
    helperText?: string;
    maxSizeMb?: number;
    className?: string;
};

export default function FileDropzone({
    file,
    onFileChange,
    accept = "image/png,image/jpeg",
    title = "Click to upload or drag and drop",
    helperText = "PNG, JPG up to 5Mb",
    maxSizeMb = 5,
    className = "",
}: FileDropzoneProps) {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [error, setError] = useState("");

    const validateAndSetFile = (selectedFile?: File) => {
        if (!selectedFile) {
            return;
        }

        if (!accept.split(",").includes(selectedFile.type)) {
            setError("Please upload a PNG or JPG file.");
            return;
        }

        if (selectedFile.size > maxSizeMb * 1024 * 1024) {
            setError(`File must be ${maxSizeMb}Mb or less.`);
            return;
        }

        setError("");
        onFileChange(selectedFile);
    };

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        validateAndSetFile(event.target.files?.[0]);
        event.target.value = "";
    };

    const handleDrop = (event: DragEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setIsDragging(false);
        validateAndSetFile(event.dataTransfer.files?.[0]);
    };

    return (
        <div className={className}>
            <input
                ref={inputRef}
                type="file"
                accept={accept}
                onChange={handleInputChange}
                className="hidden"
            />

            <button
                type="button"
                onClick={() => inputRef.current?.click()}
                onDragEnter={(event) => {
                    event.preventDefault();
                    setIsDragging(true);
                }}
                onDragOver={(event) => event.preventDefault()}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                className={[
                    "flex min-h-[164px] w-full flex-col items-center justify-center rounded-xl border border-dashed px-4 text-center transition",
                    isDragging
                        ? "border-[#2E3A83] bg-[#F5F7FF]"
                        : "border-[#D8DDE8] bg-white hover:bg-[#F8FAFC]",
                ].join(" ")}
            >
                <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#F2F4F7] text-[#667085]">
                    <Upload className="h-6 w-6" />
                </span>
                <span className="mt-4 text-base font-medium text-[#202532]">
                    {file ? file.name : title}
                </span>
                <span className="mt-1 text-sm text-[#667085]">{helperText}</span>
            </button>

            {error ? (
                <p className="mt-2 text-sm font-medium text-[#D92D20]">{error}</p>
            ) : null}
        </div>
    );
}
