"use client";

import { cn } from "@/lib/utils";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
    hasError?: boolean;
};

export default function TextInput({ className, hasError, ...props }: Props) {
    return (
        <input
            {...props}
            className={cn(
                "w-full h-11 rounded-lg border bg-[#0B111B] px-4 text-sm text-white outline-none transition",
                hasError ? "border-red-500" : "border-[#26344B] focus:border-[#5B5CFF] focus:ring-2 focus:ring-[#5B5CFF]/15",
                className
            )}
        />
    );
}
