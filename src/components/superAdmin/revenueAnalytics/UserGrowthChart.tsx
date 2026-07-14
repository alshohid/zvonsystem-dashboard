"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { DASHBOARD_COLORS } from "@/src/components/design/dashboard/dashboardTheme";
import { formatCompactNumber } from "@/src/components/design/dashboard/dashboardFormat";
import type { UserGrowthPoint } from "./types";

type UserGrowthChartProps = {
  data: UserGrowthPoint[];
};

export default function UserGrowthChart({ data }: UserGrowthChartProps) {
  return (
    <section className="rounded-[24px] border border-[#E7EBF7] bg-white p-5 shadow-[0_18px_45px_rgba(46,58,131,0.06)] sm:p-6">
      <h3 className="text-lg font-semibold text-[#101828]">User Growth</h3>

      <div className="mt-6 h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 12, right: 8, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="userGrowthFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#4CFC0F" />
                <stop offset="100%" stopColor="#00CF0E" />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke={DASHBOARD_COLORS.line} strokeDasharray="4 4" />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: DASHBOARD_COLORS.muted, fontSize: 12 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: DASHBOARD_COLORS.muted, fontSize: 12 }}
              tickFormatter={(value) => formatCompactNumber(Number(value))}
            />
            <Tooltip
              cursor={{ fill: DASHBOARD_COLORS.successSoft }}
              contentStyle={{
                borderRadius: 16,
                borderColor: DASHBOARD_COLORS.line,
                boxShadow: "0 16px 40px rgba(46,58,131,0.12)",
              }}
              formatter={(value) => formatCompactNumber(Number(value))}
            />
            <Bar dataKey="users" fill="url(#userGrowthFill)" radius={[4, 4, 0, 0]} maxBarSize={44} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
