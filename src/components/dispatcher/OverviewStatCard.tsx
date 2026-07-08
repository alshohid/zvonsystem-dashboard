import { ReactNode } from 'react';

interface OverviewStatCardProps {
  icon: ReactNode;
  value: string;
  label: string;
}

export default function OverviewStatCard({
  icon,
  value,
  label,
}: OverviewStatCardProps) {
  return (
    <div className="flex min-h-[106px] items-center gap-4 rounded-[12px] border border-[#E6EAF2] bg-[#F8F9FC] px-6 py-16">
      <div className="flex h-12 w-12 items-center justify-center rounded-[8px] bg-[#C9CCE9] text-[#3C478F]">
        {icon}
      </div>

      <div>
        <h3 className="text-[28px] font-semibold leading-none text-[#1F2430]">
          {value}
        </h3>
        <p className="mt-1 text-sm text-[#8A94A6]">{label}</p>
      </div>
    </div>
  );
}
