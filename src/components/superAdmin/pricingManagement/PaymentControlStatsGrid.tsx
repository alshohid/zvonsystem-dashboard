import type { ElementType } from "react";
import {
  Clock,
  CreditCard,
  DollarSign,
  FileText,
  TrendingUp,
} from "lucide-react";
import type { PaymentControlStat, PaymentControlStatId } from "./types";

const STAT_ICON_BY_ID: Record<PaymentControlStatId, ElementType> = {
  "total-revenue": DollarSign,
  "total-invoices": FileText,
  "active-pro-subs": CreditCard,
  "paid-invoices": TrendingUp,
  "pending-invoices": Clock,
};

type PaymentControlStatsGridProps = {
  stats: PaymentControlStat[];
};

export default function PaymentControlStatsGrid({ stats }: PaymentControlStatsGridProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map(stat => {
        const Icon = STAT_ICON_BY_ID[stat.id];

        return (
          <div
            key={stat.id}
            className="rounded-2xl border border-[#E9EDF5] bg-secondary p-5 shadow-[0_1px_2px_rgba(16,24,40,0.04)]"
          >
            <div className="flex items-start justify-between gap-3">
              <p className="text-xs font-medium uppercase tracking-[0.12em] text-[#98A2B3]">
                {stat.label}
              </p>
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-black">
                <Icon size={16} />
              </div>
            </div>

            <p className="mt-4 text-3xl font-semibold text-[#101828]">{stat.value}</p>
          </div>
        );
      })}
    </div>
  );
}
