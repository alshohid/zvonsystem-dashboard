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
import type { IPlatformTrendItem } from "@/src/types/analyticsTypes";
import { DASHBOARD_COLORS } from "@/src/components/design/dashboard/dashboardTheme";
import { formatCompactNumber } from "@/src/components/design/dashboard/dashboardFormat";

type PlatformTrendChartProps = {
  data: IPlatformTrendItem[];
};

export default function PlatformTrendChart({ data }: PlatformTrendChartProps) {
  return (
    <section className="rounded-[24px] border border-[#E7EBF7] bg-white p-5 shadow-[0_18px_45px_rgba(46,58,131,0.06)] sm:p-6">
      <div>
        <h3 className="text-lg font-semibold text-[#101828]">Platform Trend</h3>
        <p className="mt-1 text-sm text-[#777980]">
          Release distribution across streaming platforms
        </p>
      </div>

      <div className="mt-6 h-[280px] ">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart className="remove_outline" accessibilityLayer={false} data={data} margin={{ top: 12, right: 8, left: -20, bottom: 0 }}>
            <defs >
              <linearGradient id="platformTrendFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={DASHBOARD_COLORS.streamAccent} stopOpacity={0.32} />
                <stop offset="95%" stopColor={DASHBOARD_COLORS.streamAccent} stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke={DASHBOARD_COLORS.line} strokeDasharray="4 4" />
            <XAxis
              dataKey="platform"
              axisLine={false}
              tickLine={false}
              tick={{ fill: DASHBOARD_COLORS.muted, fontSize: 12 }}
            />
            <YAxis
              allowDecimals={false}
              axisLine={false}
              tickLine={false}
              tick={{ fill: DASHBOARD_COLORS.muted, fontSize: 12 }}
              tickFormatter={(value) => formatCompactNumber(Number(value))}
            />
            <Tooltip
              contentStyle={{
                borderRadius: 16,
                borderColor: DASHBOARD_COLORS.line,
                boxShadow: "0 16px 40px rgba(46,58,131,0.12)",
              }}
              formatter={(value) => formatCompactNumber(Number(value))}
            />
            <Area
              type="monotone"
              dataKey="count"
              stroke={DASHBOARD_COLORS.streamAccent}
              strokeWidth={3}
              fill="url(#platformTrendFill)"

            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
