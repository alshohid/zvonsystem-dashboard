'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import TopTabs, { TabItem } from '@/src/components/common/TopTabs';
import { DownCaretIcon, EditIconNew } from '@/src/icons';
import type { DashboardRole } from '@/src/lib/sidebarConfig';
import DriverInfoTable from '../DriverInfoTable';
import TruckInfoTable from '../TruckInfoTable';
import TrailerInfoTable from '../TrailerInfoTable';
import { CarrierPacket } from './CarrierPacket';


type CarrierDetailTabType =
  | 'overview'
  | 'drivers'
  | 'trucks'
  | 'trailers'
  | 'carrier-packet';

const CARRIER_DETAIL_TABS: TabItem<CarrierDetailTabType>[] = [
  { key: 'overview', label: 'Overview' },
  { key: 'drivers', label: 'Drivers' },
  { key: 'trucks', label: 'Trucks' },
  { key: 'trailers', label: 'Trailers' },
  { key: 'carrier-packet', label: 'Carrier Packet' },
];

type CarrierProfileDetailMainComponentProps = {
  role?: DashboardRole;
};

export default function CarrierProfileDetailMainComponent({
  role = 'dispatcher',
}: CarrierProfileDetailMainComponentProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const activeTab =
    (searchParams.get('tab') as CarrierDetailTabType) || 'overview';

  const handleTabChange = (key: CarrierDetailTabType) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('tab', key);

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <main className="min-h-screen bg-white" data-carrier-role={role}>
      <section className="space-y-4">
        <h1 className="text-[22px] font-semibold text-[#111827]">
          Carrier&apos;s Profile Detail #ID_02
        </h1>

        <TopTabs
          tabs={CARRIER_DETAIL_TABS}
          activeKey={activeTab}
          onChange={handleTabChange}
        />

        {activeTab === 'overview' && <CarrierOverview />}

        {activeTab === 'drivers' && (
          <div className="rounded-2xl border border-[#E9EDF5] bg-white p-4">
            <DriverInfoTable />
          </div>
        )}

        {activeTab === 'trucks' && (
          <div className="rounded-2xl border border-[#E9EDF5] bg-white p-4">
            <TruckInfoTable />
          </div>
        )}

        {activeTab === 'trailers' && (
          <div className="rounded-2xl border border-[#E9EDF5] bg-white p-4">
            <TrailerInfoTable />
          </div>
        )}

        {activeTab === 'carrier-packet' && <CarrierPacket />}
      </section>
    </main>
  );
}

function CarrierOverview() {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[270px_1fr]">
      <aside className="relative rounded-[8px] bg-[#F4F6F8] p-5">
        <button type="button" className="absolute right-4 top-4 text-[#2F3E9E]">
          <EditIconNew />
        </button>

        <div className="flex flex-col items-center pt-8">
          <div className="flex h-[70px] w-[70px] items-center justify-center rounded-full bg-[#DADCF3] text-[16px] font-semibold text-[#111827]">
            MD
          </div>

          <h2 className="mt-4 text-center text-[16px] font-medium text-[#111827]">
            Mason Delta LTD
          </h2>
        </div>

        <div className="mt-8 space-y-5">
          <ProfileInfoItem label="Email" value="delta@gmail.com" />
          <ProfileInfoItem label="Contact" value="+880 12342334" />
          <ProfileInfoItem label="Address" value="4234 Mustang GT" />
        </div>
      </aside>

      <div className="space-y-0">
        <OverviewEditableRow label="Dispatch Fee" value="2.5%" />
        <OverviewEditableRow label="DBA Name" value="Delta LTD" />
        <OverviewEditableRow label="MC No." value="1232342" />
        <OverviewEditableRow label="DOT No." value="112321" />
        <OverviewEditableRow label="Factoring Service" value="RTS Financial" />

        <div className="grid grid-cols-[1fr_28px] items-end gap-4  border-[#E5E7EB] py-3">
          <div>
            <h3 className="text-[14px] font-semibold text-[#111827]">
              Pricing Plan
            </h3>

            <div className="relative mt-2">
              <select
                defaultValue="Advance Plan"
                className="h-10 w-full appearance-none rounded-[6px] border border-[#E5E7EB] bg-white px-3 pr-10 text-[13px] text-[#111827] outline-none focus:border-[#C7D2FE]"
              >
                <option>Basic Plan</option>
                <option>Pro Plan</option>
                <option>Advance Plan</option>
              </select>

              <DownCaretIcon className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#98A2B3]" />
            </div>
          </div>

          <button type="button" className="mb-2 text-[#2F3E9E]">
            <EditIconNew />
          </button>
        </div>
      </div>
    </div>
  );
}

function ProfileInfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <h4 className="text-[13px] font-semibold text-[#111827]">{label}</h4>
      <p className="mt-1 text-[13px] text-[#667085]">{value}</p>
    </div>
  );
}

function OverviewEditableRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="grid grid-cols-[1fr_28px] items-center gap-4 border-b border-[#E5E7EB] py-3">
      <div>
        <h3 className="text-[14px] font-semibold text-[#111827]">{label}</h3>
        <p className="mt-1 text-[13px] text-[#667085]">{value}</p>
      </div>

      <button type="button" className="text-[#2F3E9E]">
        <EditIconNew />
      </button>
    </div>
  );
}
