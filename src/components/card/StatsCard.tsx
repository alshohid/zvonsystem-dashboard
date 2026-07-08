"use client";

import { Skeleton } from "@/src/components/ui/skeleton";

interface StatsCardProps {
    topLabel?: string;     // e.g. "This Month"
    value: string | number; // e.g. "£ 90,000"
    title: string;         // e.g. "Total Donation"
    className?: string;
    isLoading?: boolean;
}

export default function StatsCard({
    topLabel = "This Month",
    value,
    title,
    className = "",
    isLoading = false,
}: StatsCardProps) {
    return (
        <div
            className={[
                // ✅ FIGMA layout
                "flex flex-col items-start gap-1",
                "p-6", // 1.5rem
                "rounded-[0.75rem]",
                "bg-[#F8F7F8]",
                "w-full",
                className,
            ].join(" ")}
        >
            {isLoading ? (
                <>
                    <Skeleton className="h-4 w-24 bg-[#E8E5E8]" />
                    <div className="h-px w-full bg-black/5 my-1" />
                    <Skeleton className="h-10 w-36 rounded-[10px] bg-[#DED9DE]" />
                    <Skeleton className="mt-2 h-6 w-44 bg-[#E8E5E8]" />
                </>
            ) : (
                <>
                    {/* Top label */}
                    <p className="text-[14px] sm:text-[15px] text-gray-500">{topLabel}</p>

                    {/* Divider */}
                    <div className="h-px w-full bg-black/5 my-1" />

                    {/* Value */}
                    <div className="text-[32px] sm:text-[40px] font-medium tracking-tight text-[#111827] leading-none">
                        {value}
                    </div>

                    {/* Title */}
                    <p className="mt-1 text-[18px] sm:text-[20px] font-normal text-[#111827]">
                        {title}
                    </p>
                </>
            )}
        </div>
    );
}
