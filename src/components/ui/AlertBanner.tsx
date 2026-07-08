"use client";

import { WarningIcon } from "@/src/icons";

type AlertBannerProps = {
    message: string;
    className?: string;
};

export default function AlertBanner({ message, className = "" }: AlertBannerProps) {
    return (
        <div
            className={[
                "w-full",
                "flex items-center gap-6",
                "p-6",
                "rounded-xl",
                "border border-[#FFC0C0]",
                "bg-[#FFF9F9]",
                className,
            ].join(" ")}
            role="alert"
        >
            <span className="inline-flex items-center justify-center rounded-full bg-[#FFC0C0] text-[#B42318] shrink-0">
                <WarningIcon />
            </span>
            <p className="text-[14px] text-gray-600">{message}</p>
        </div>
    );
}