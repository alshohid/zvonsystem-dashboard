/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Skeleton } from "@/src/components/ui/skeleton";
import {
    Area,
    AreaChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
    Line,
} from "recharts";

type TrendPoint = {
    day: string;
    thisWeek: number;
    lastWeek: number;
};

type NoticeViewsTrendsChartProps = {
    title?: string;
    data: TrendPoint[];
    totalViews?: number;
    className?: string;
    isLoading?: boolean;
};

function DotLegend({
    label,
    color,
}: {
    label: string;
    color: string;
}) {
    return (
        <div className="flex items-center gap-2 text-[12px] text-gray-500">
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: color }} aria-hidden />
            <span>{label}</span>
        </div>
    );
}

function CustomTooltip({
    active,
    payload,
    label,
}: {
    active?: boolean;
    payload?: any[];
    label?: string;
}) {
    if (!active || !payload?.length) {
        return null;
    }

    const thisWeekPayload = payload.find((item) => item.dataKey === "thisWeek");
    const lastWeekPayload = payload.find((item) => item.dataKey === "lastWeek");

    return (
        <div className="rounded-lg border border-[#E9E9EA] bg-white px-3 py-2 shadow-[0_10px_24px_rgba(0,0,0,0.10)]">
            <div className="text-[12px] font-medium text-gray-700">{label}</div>
            <div className="mt-1 space-y-1">
                {thisWeekPayload ? (
                    <div className="flex items-center justify-between gap-4 text-[12px] text-gray-600">
                        <span className="flex items-center gap-2">
                            <span className="h-2 w-2 rounded-full bg-[#5B6A52]" />
                            This week
                        </span>
                        <span className="font-medium text-gray-900">{thisWeekPayload.value}</span>
                    </div>
                ) : null}
                {lastWeekPayload ? (
                    <div className="flex items-center justify-between gap-4 text-[12px] text-gray-600">
                        <span className="flex items-center gap-2">
                            <span className="h-2 w-2 rounded-full bg-[#9BAA8F]" />
                            Last week
                        </span>
                        <span className="font-medium text-gray-900">{lastWeekPayload.value}</span>
                    </div>
                ) : null}
            </div>
        </div>
    );
}

function ChartLoadingState() {
    return (
        <div className="w-full min-w-0">
            <div className="flex items-center justify-between gap-3">
                <div className="space-y-2">
                    <Skeleton className="h-5 w-48 bg-[#E7ECE1]" />
                    <Skeleton className="h-4 w-24 bg-[#EFF3EB]" />
                </div>
                <div className="flex items-center gap-4">
                    <Skeleton className="h-4 w-20 bg-[#EFF3EB]" />
                    <Skeleton className="h-4 w-20 bg-[#EFF3EB]" />
                </div>
            </div>
            <Skeleton className="mt-6 h-[260px] w-full rounded-[18px] bg-[#EFF3EB]" />
        </div>
    );
}

export default function NoticeViewsTrendsChart({
    title = "Total Views of Your Notices",
    data,
    totalViews = 0,
    className = "",
    isLoading = false,
}: NoticeViewsTrendsChartProps) {
    const thisWeekColor = "#5B6A52";
    const lastWeekColor = "#9BAA8F";
    const hasData = data.length > 0;

    return (
        <section
            className={[
                "flex w-full flex-col gap-4 rounded-[0.75rem] bg-[#F8F7F8] p-6",
                className,
            ].join(" ")}
        >
            {isLoading ? (
                <ChartLoadingState />
            ) : (
                <>
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h3 className="text-[1rem] font-medium text-[#161721] sm:text-[1.125rem]">
                                {title}
                            </h3>
                            <p className="mt-1 text-[13px] text-[#667164]">
                                {totalViews} total view{totalViews === 1 ? "" : "s"} recorded
                            </p>
                        </div>

                        <div className="flex items-center gap-6">
                            <DotLegend label="This week" color={thisWeekColor} />
                            <DotLegend label="Last week" color={lastWeekColor} />
                        </div>
                    </div>

                    {hasData ? (
                        <div className="h-[220px] w-full min-w-0 sm:h-[260px] md:h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={data} margin={{ top: 8, right: 10, left: 0, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="thisWeekFillViews" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor={thisWeekColor} stopOpacity={0.18} />
                                            <stop offset="100%" stopColor={thisWeekColor} stopOpacity={0} />
                                        </linearGradient>
                                    </defs>

                                    <CartesianGrid stroke="rgba(0,0,0,0.05)" vertical={false} />

                                    <XAxis
                                        dataKey="day"
                                        tick={{ fill: "rgba(0,0,0,0.45)", fontSize: 12 }}
                                        axisLine={false}
                                        tickLine={false}
                                    />

                                    <YAxis
                                        tick={{ fill: "rgba(0,0,0,0.35)", fontSize: 12 }}
                                        axisLine={false}
                                        tickLine={false}
                                        width={34}
                                        domain={[0, "dataMax + 2"]}
                                    />

                                    <Tooltip content={<CustomTooltip />} cursor={{ stroke: "rgba(0,0,0,0.08)" }} />

                                    <Area
                                        type="monotone"
                                        dataKey="thisWeek"
                                        stroke={thisWeekColor}
                                        strokeWidth={2}
                                        fill="url(#thisWeekFillViews)"
                                        fillOpacity={1}
                                        dot={false}
                                        activeDot={{ r: 4 }}
                                    />

                                    <Line
                                        type="monotone"
                                        dataKey="lastWeek"
                                        stroke={lastWeekColor}
                                        strokeWidth={2}
                                        strokeDasharray="4 4"
                                        dot={false}
                                        activeDot={{ r: 4 }}
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    ) : (
                        <div className="flex h-[260px] items-center justify-center rounded-[18px] border border-dashed border-[#D9DADC] bg-white text-center text-[14px] text-[#667164]">
                            No notice view data available for this period.
                        </div>
                    )}
                </>
            )}
        </section>
    );
}
