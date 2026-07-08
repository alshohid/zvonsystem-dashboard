'use client';

import { useState } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import AnalyticsOverview from '@/src/components/dispatcher/AnalyticsOverview';
import CarrierReportTable from '@/src/components/dispatcher/CarrierReportTable';
import DriverPerformanceTable from '@/src/components/dispatcher/DriverPerformanceTable';
import EarningsSummary from '@/src/components/dispatcher/EarningsSummary';
import RevenuePlanChart from '@/src/components/dispatcher/RevenuePlanChart';
import RevenueTrendChart from '@/src/components/dispatcher/RevenueTrendChart';
import TopRevenueCarriers from '@/src/components/dispatcher/TopRevenueCarriers';
import { DateRangeType } from '@/src/types/dispatcher/type';
import TopTabs, { TabItem } from '@/src/components/common/TopTabs';
import {
  revenuePlanDataMap,
  revenueTrendDataMap,
  topRevenueCarriers,
} from './dummyData/data';


type TabType = 'carrier' | 'driver' | 'earnings';

const REPORT_TABS: TabItem<TabType>[] = [
  { key: 'carrier', label: 'By Carrier' },
  { key: 'driver', label: 'By Driver' },
  { key: 'earnings', label: 'Your Earnings' },
];



export default function ReportsPageMainComponent() {
  const [dateRange, setDateRange] = useState<DateRangeType>('30d');

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const activeTab = (searchParams.get('tab') as TabType) || 'carrier';
  const revenuePlanItems = revenuePlanDataMap[dateRange];
  const revenueTrendData = revenueTrendDataMap[dateRange];

  const handleTabChange = (key: TabType) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('tab', key);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <main className="min-h-screen space-y-6">
      <AnalyticsOverview
        dateRange={dateRange}
        onDateRangeChange={setDateRange}
      />

      <RevenueTrendChart chartData={revenueTrendData} />

      <section className="grid grid-cols-1 gap-4 lg:grid-cols-[3fr_9fr]">
        <RevenuePlanChart items={revenuePlanItems} />
        <TopRevenueCarriers carriers={topRevenueCarriers} />
      </section>

      <section className="space-y-4">
        <TopTabs
          tabs={REPORT_TABS}
          activeKey={activeTab}
          onChange={handleTabChange}
        />

        {activeTab === 'carrier' && <CarrierReportTable />}
        {activeTab === 'driver' && <DriverPerformanceTable />}
        {activeTab === 'earnings' && <EarningsSummary />}
      </section>
    </main>
  );
}
