"use client";

import React from "react";
import { Input } from "@/src/components/ui/input";
import { cn } from "@/src/lib/utils";
import FormFieldInput from "./FormFieldInput";

type TextInputFieldProps = {
    label?: string;
    required?: boolean;
    error?: string;
    helperText?: string;
    inputClassName?: string;
} & React.ComponentProps<"input">;

export default function TextInputField({
    label,
    required,
    error,
    helperText,
    className,
    inputClassName,
    ...props
}: TextInputFieldProps) {
    return (
        <FormFieldInput
            label={label}
            required={required}
            error={error}
            helperText={helperText}
            className={className}
        >
            <Input
                {...props}
                className={cn(
                    "h-12 w-full rounded-[10px] border border-[#CFCFD6] bg-white px-4 text-[13px] text-[#161721]! placeholder:text-[#A1A1AA] outline-none",
                    "focus:border-[#8FA17E] focus:ring-2 focus:ring-[#8FA17E]/15",
                    inputClassName
                )}
            />
        </FormFieldInput>
    );
}