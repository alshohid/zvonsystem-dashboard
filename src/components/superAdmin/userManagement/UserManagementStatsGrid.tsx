import { User } from "lucide-react";
import type { UserManagementStat } from "./types";

type UserManagementStatsGridProps = {
  stats: UserManagementStat[];
};

export default function UserManagementStatsGrid({ stats }: UserManagementStatsGridProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat, index) => {
        const isAlt = index % 2 === 1;

        return (
          <div
            key={stat.id}
            className="rounded-2xl border border-[#E9EDF5] bg-white p-5 shadow-[0_1px_2px_rgba(16,24,40,0.04)]"
          >
            <div className="flex items-start justify-between gap-3">
              <div
                className={[
                  "flex h-9 w-9 items-center justify-center rounded-lg",
                  isAlt ? "bg-[#101828] text-primary" : "bg-primary text-black",
                ].join(" ")}
              >
                <User size={16} />
              </div>
            </div>

            <p className="mt-4 text-3xl font-semibold text-[#101828]">{stat.value}</p>
            <p className="mt-1 text-xs font-medium uppercase tracking-[0.12em] text-[#98A2B3]">
              {stat.label}
            </p>
          </div>
        );
      })}
    </div>
  );
}
