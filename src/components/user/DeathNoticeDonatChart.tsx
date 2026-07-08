/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Skeleton } from "@/src/components/ui/skeleton";
import { Pie, PieChart, Cell, ResponsiveContainer, Tooltip } from "recharts";

export type DeathNoticeSlice = {
    name: string;
    value: number;
    fill: string;
};

type Props = {
    title?: string;
    data?: DeathNoticeSlice[];
    className?: string;
    isLoading?: boolean;
};

function CustomTooltip({
    active,
    payload,
}: {
    active?: boolean;
    payload?: any[];
}) {
    if (!active || !payload?.length) {
        return null;
    }

    const point = payload[0];

    return (
        <div className="rounded-lg border border-[#E9E9EA] bg-white px-3 py-2 shadow-[0_10px_24px_rgba(0,0,0,0.10)]">
            <div className="text-[12px] font-medium text-gray-800">{point.name}</div>
            <div className="mt-1 flex items-center justify-between gap-4 text-[12px] text-gray-600">
                <span className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full" style={{ backgroundColor: point.payload.fill }} />
                    Notice share
                </span>
                <span className="font-semibold text-gray-900">{point.value}%</span>
            </div>
        </div>
    );
}

function LoadingState() {
    return (
        <div className="w-full">
            <Skeleton className="h-6 w-36 bg-[#E7ECE1]" />
            <div className="mt-5 grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:items-center">
                <Skeleton className="mx-auto aspect-square w-[220px] rounded-full bg-[#EFF3EB]" />
                <div className="space-y-4">
                    {Array.from({ length: 4 }).map((_, index) => (
                        <Skeleton key={`donut-legend-skeleton-${index}`} className="h-5 w-full bg-[#EFF3EB]" />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default function DeathNoticesDonutChart({
    title = "Death Notices",
    data = [],
    className = "",
    isLoading = false,
}: Props) {
    const hasData = data.length > 0;

    return (
        <section
            className={[
                "w-full rounded-[0.75rem] bg-[#F8F7F8] p-4 sm:p-6",
                className,
            ].join(" ")}
        >
            {isLoading ? (
                <LoadingState />
            ) : (
                <div className="w-full">
                    <h3 className="text-[18px] font-medium text-[#161721] sm:text-[20px]">
                        {title}
                    </h3>

                    {hasData ? (
                        <div className="mt-5 grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:items-center">
                            <div className="min-w-0">
                                <div className="mx-auto aspect-square w-[clamp(180px,45vw,280px)] max-w-full min-w-0">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Tooltip cursor={false} content={<CustomTooltip />} />
                                            <Pie
                                                data={data}
                                                dataKey="value"
                                                nameKey="name"
                                                innerRadius="45%"
                                                outerRadius="85%"
                                                startAngle={90}
                                                endAngle={-270}
                                                stroke="#F8F7F8"
                                                strokeWidth={6}
                                                paddingAngle={2}
                                            >
                                                {data.map((entry, index) => (
                                                    <Cell key={index} fill={entry.fill} />
                                                ))}
                                            </Pie>
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>

                            <div className="min-w-0 md:flex md:justify-end">
                                <ul className="w-full max-w-[320px] space-y-4">
                                    {data.map((item) => (
                                        <li
                                            key={item.name}
                                            className="flex items-center justify-between gap-4"
                                        >
                                            <div className="flex min-w-0 items-center gap-3">
                                                <span
                                                    className="h-2 w-2 shrink-0 rounded-full"
                                                    style={{ backgroundColor: item.fill }}
                                                    aria-hidden
                                                />
                                                <span className="truncate text-[16px] text-[#161721]">
                                                    {item.name}
                                                </span>
                                            </div>

                                            <span className="text-[16px] font-medium text-[#161721]">
                                                {item.value}%
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ) : (
                        <div className="mt-5 flex min-h-[280px] items-center justify-center rounded-[18px] border border-dashed border-[#D9DADC] bg-white px-4 text-center text-[14px] text-[#667164]">
                            No area distribution data is available for this period.
                        </div>
                    )}
                </div>
            )}
        </section>
    );
}
