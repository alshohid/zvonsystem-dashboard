import { TrendingUp } from "lucide-react";

interface PerformanceSummaryCardProps {
  title: string;
  value: string;
  supportingText: string;
  isPositive?: boolean;
}

export default function PerformanceSummaryCard({
  title,
  value,
  supportingText,
  isPositive = false,
}: PerformanceSummaryCardProps) {
  return (
    <div className="rounded-xl border border-[#E5E7EB] bg-[#F8FAFB] px-5 py-6 shadow-sm transition-all duration-200 hover:shadow-md">
      <div className="flex h-full flex-col justify-between space-y-6">
        <div className="space-y-1">
          <h3 className="text-[15px] font-medium text-[#6B7280]">{title}</h3>
          <p className="text-[38px] font-bold leading-none tracking-[-0.02em] text-[#111827]">
            {value}
          </p>
        </div>

        <div>
          {isPositive ? (
            <div className="flex items-center gap-2 text-sm font-medium text-[#16A34A]">
              <TrendingUp size={14} />
              <span>{supportingText}</span>
            </div>
          ) : (
            <p className="text-sm text-[#9CA3AF]">{supportingText}</p>
          )}
        </div>
      </div>
    </div>
  );
}