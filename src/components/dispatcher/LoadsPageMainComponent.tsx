'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Search, ChevronDown } from 'lucide-react';
import TopTabs, { TabItem } from '@/src/components/common/TopTabs';

import { ActiveLoads } from './ActiveLoads';
import DeliveryScheduleList from './DeliveryScheduleList';

type LoadTabType = 'active-loads' | 'delivery-schedule';

const LOAD_TABS: TabItem<LoadTabType>[] = [
  { key: 'active-loads', label: 'Active Loads' },
  { key: 'delivery-schedule', label: 'Delivery Schedule' },
];

export default function LoadsPageMainComponent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const activeTab = (searchParams.get('tab') as LoadTabType) || 'active-loads';

  const handleTabChange = (key: LoadTabType) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('tab', key);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <main className="">
      <section className="space-y-4">
        <TopTabs
          tabs={LOAD_TABS}
          activeKey={activeTab}
          onChange={handleTabChange}
        />

        <div className="rounded-2xl border border-[#E9EDF5] bg-white p-2 shadow-[0_1px_2px_rgba(16,24,40,0.04)] ">
          

          {activeTab === 'active-loads' && <ActiveLoads/>}
          {activeTab === 'delivery-schedule' && <DeliveryScheduleList />}
        </div>
      </section>
    </main>
  );
}
