"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { DASHBOARD_COLORS } from "@/src/components/design/dashboard/dashboardTheme";
import type { PlanDistributionSlice } from "./types";
import type { PricingPlanId } from "@/src/components/superAdmin/pricingManagement/types";

const PLAN_LABEL: Record<PricingPlanId, string> = {
  free: "Free",
  pro: "Pro",
  "pay-per-release": "Pay Per Release",
};

const PLAN_COLOR: Record<PricingPlanId, string> = {
  free: "#D0D5DD",
  pro: DASHBOARD_COLORS.streamAccent,
  "pay-per-release": "#3B82F6",
};

type PlanDistributionChartProps = {
  data: PlanDistributionSlice[];
};

export default function PlanDistributionChart({ data }: PlanDistributionChartProps) {
  return (
    <section className="rounded-[24px] border border-[#E7EBF7] bg-white p-5 shadow-[0_18px_45px_rgba(46,58,131,0.06)] sm:p-6">
      <h3 className="text-lg font-semibold text-[#101828]">Plan Distribution</h3>

      <div className="mt-4 h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="plan"
              innerRadius="62%"
              outerRadius="100%"
              paddingAngle={3}
              stroke="#FFFFFF"
              strokeWidth={2}
            >
              {data.map((slice) => (
                <Cell key={slice.plan} fill={PLAN_COLOR[slice.plan]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                borderRadius: 16,
                borderColor: DASHBOARD_COLORS.line,
                boxShadow: "0 16px 40px rgba(46,58,131,0.12)",
              }}
              formatter={(value, _name, item) => [
                `${value}%`,
                PLAN_LABEL[(item.payload as PlanDistributionSlice).plan],
              ]}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
        {data.map((slice) => (
          <div key={slice.plan} className="flex items-center gap-2 text-sm text-[#475467]">
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: PLAN_COLOR[slice.plan] }}
            />
            {PLAN_LABEL[slice.plan]}
          </div>
        ))}
      </div>
    </section>
  );
}
