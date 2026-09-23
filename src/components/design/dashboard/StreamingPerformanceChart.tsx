"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { IStreamingPerformancePoint } from "@/src/types/dashboardOverviewTypes";
import { formatCompactNumber } from "@/src/components/design/dashboard/dashboardFormat";

type StreamingPerformanceChartProps = {
  data?: IStreamingPerformancePoint[];
};

export default function StreamingPerformanceChart({
  data = [],
}: StreamingPerformanceChartProps) {
  // Determine subtitle range e.g. "Jan – Dec 2026"
  const firstItem = data[0];
  const lastItem = data[data.length - 1];
  const dateRangeSubtitle =
    firstItem && lastItem
      ? `${firstItem.month} – ${lastItem.month} ${lastItem.year}`
      : "Jan – Dec 2026";

  return (
    <section className="flex flex-col justify-between rounded-[24px] border border-[#E7EBF7] bg-white p-5 shadow-[0_18px_45px_rgba(46,58,131,0.06)] sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-[#101828]">
            Streaming Performance
          </h3>
          <p className="mt-1 text-sm text-[#777980]">{dateRangeSubtitle}</p>
        </div>

        <div className="flex items-center gap-2 text-sm text-[#667085]">
          <span className="h-[2px] w-3.5 rounded-full bg-[#22C55E]" />
          <span>Streams</span>
        </div>
      </div>

      <div className="mt-6 h-[220px] w-full sm:h-[240px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: -15, bottom: 0 }}
          >
            <defs>
              <linearGradient id="streamingGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22C55E" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#22C55E" stopOpacity={0.01} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke="#F1F3F9" />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#667085", fontSize: 12 }}
              dy={6}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#667085", fontSize: 12 }}
              tickFormatter={(val) => (val === 0 ? "0" : formatCompactNumber(val))}
            />
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  const point = payload[0].payload as IStreamingPerformancePoint;
                  return (
                    <div className="rounded-xl border border-[#E7EBF7] bg-white p-3 shadow-lg">
                      <p className="text-xs font-semibold text-[#101828]">
                        {label} {point.year}
                      </p>
                      <p className="mt-1 text-sm font-medium text-[#22C55E]">
                        {point.streamsFormatted
                          ? `${point.streamsFormatted} streams`
                          : `${formatCompactNumber(point.streams)} streams`}
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Area
              type="monotone"
              dataKey="streams"
              stroke="#22C55E"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#streamingGradient)"
              activeDot={{
                r: 5,
                fill: "#22C55E",
                stroke: "#FFFFFF",
                strokeWidth: 2,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
