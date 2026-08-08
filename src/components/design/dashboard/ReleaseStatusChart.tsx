"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import type { IReleaseStatusChartPoint } from "@/src/types/dashboardOverviewTypes";
import {
  DASHBOARD_COLORS,
  RELEASE_STATUS_COLORS,
} from "@/src/components/design/dashboard/dashboardTheme";

type ReleaseStatusChartProps = {
  data: IReleaseStatusChartPoint[];
};

export default function ReleaseStatusChart({ data }: ReleaseStatusChartProps) {
  const total = data.reduce((sum, point) => sum + point.count, 0);

  return (
    <section className="rounded-[24px] border border-[#E7EBF7] bg-white p-5 shadow-[0_18px_45px_rgba(46,58,131,0.06)] sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-[#101828]">Release Status</h3>
          <p className="mt-1 text-sm text-[#777980]">Distribution pipeline</p>
        </div>
        <span className="text-sm font-medium text-[#51608C]">{total} total</span>
      </div>

      <div className="mt-4 grid items-center gap-4 sm:grid-cols-[auto_1fr]">
        <div className="mx-auto h-[200px] w-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="count"
                nameKey="status"
                innerRadius={58}
                outerRadius={88}
                paddingAngle={2}
                strokeWidth={0}
              >
                {data.map((point) => (
                  <Cell
                    key={point.status}
                    fill={RELEASE_STATUS_COLORS[point.status] ?? DASHBOARD_COLORS.muted}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  borderRadius: 16,
                  borderColor: DASHBOARD_COLORS.line,
                  boxShadow: "0 16px 40px rgba(46,58,131,0.12)",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <ul className="flex flex-col gap-2.5">
          {data.map((point) => (
            <li key={point.status} className="flex items-center justify-between gap-3 text-sm">
              <span className="inline-flex items-center gap-2 font-medium text-[#344054]">
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{
                    backgroundColor:
                      RELEASE_STATUS_COLORS[point.status] ?? DASHBOARD_COLORS.muted,
                  }}
                />
                {point.status}
              </span>
              <span className="text-[#667085]">{point.count}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}