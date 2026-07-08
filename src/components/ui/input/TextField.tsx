"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import Field from "./Field";

type Props = {
    label?: string;
    required?: boolean;
    error?: string;
    helperText?: string;
    leftIcon?: React.ReactNode;
    rightSlot?: React.ReactNode;
    inputClassName?: string;
    containerClassName?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const TextField = forwardRef<HTMLInputElement, Props>(function TextField(
    { label, required, error, helperText, leftIcon, rightSlot, className, inputClassName, containerClassName, ...rest },
    ref
) {
    return (
        <Field label={label} required={required} error={error} helperText={helperText} className={className}>
            <div className={cn("w-full flex items-center gap-2 rounded-[10px] border bg-transparent px-5 py-3 transition", error ? "border-red-500/80" : "border-[#5B5A64]", "focus-within:border-[#5B5CFF] focus-within:ring-2 focus-within:ring-[#5B5CFF]/15", containerClassName)}>
                {leftIcon ? <span className="text-white/40 shrink-0">{leftIcon}</span> : null}

                <input
                    ref={ref}
                    {...rest}
                    className={cn(
                        "w-full bg-transparent text-sm text-white placeholder:text-white/25 outline-none",
                        inputClassName
                    )}
                />

                {rightSlot ? <span className="shrink-0 text-white/40">{rightSlot}</span> : null}
            </div>
        </Field>
    );
});

export default TextField;
