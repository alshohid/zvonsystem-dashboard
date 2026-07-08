'use client';
import GlobalDateFilter from './GlobalDateFilter';
import { DateRangeType } from '@/src/types/dispatcher/type';
import SectionTitle from './SectionTitle';
import OverviewStatCard from './OverviewStatCard';
import { CircleIcon, DollarIcon, TotalLoadsIcon } from '@/src/icons';


interface AnalyticsOverviewProps {
  dateRange: DateRangeType;
  onDateRangeChange: (value: DateRangeType) => void;
}

export default function AnalyticsOverview({
  dateRange,
  onDateRangeChange,
}: AnalyticsOverviewProps) {
  return (
    <section className="space-y-5">
      <div className="flex items-center justify-between gap-4">
        <SectionTitle title="Reports & Analytics" />
        <GlobalDateFilter value={dateRange} onChange={onDateRangeChange} />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <OverviewStatCard
          icon={<TotalLoadsIcon size='8'/>}
          value="20"
          label="Total Loads"
        />
        <OverviewStatCard
          icon={<DollarIcon size='8'/>}
          value="$40,000"
          label="Total Revenue"
        />
        <OverviewStatCard
          icon={<CircleIcon size={8} />}
          value="100%"
          label="Delivered"
        />
      </div>
    </section>
  );
}
