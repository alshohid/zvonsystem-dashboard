"use client";

import { cn } from "@/src/lib/utils";

type FieldProps = {
    label?: string;
    required?: boolean;
    helperText?: string;
    error?: string;
    children: React.ReactNode;
    className?: string;
};

export default function Field({ label, required, helperText, error, children, className }: FieldProps) {
    return (
        <div className={cn("w-full flex flex-col gap-2", className)}>
            {label ? (
                <label className="text-xs text-white/60">
                    {label}{required ? <span className="text-red-400"> *</span> : null}
                </label>
            ) : null}

            {children}

            {error ? (
                <p className="text-xs text-red-400">{error}</p>
            ) : helperText ? (
                <p className="text-xs text-white/40">{helperText}</p>
            ) : null}
        </div>
    );
}
