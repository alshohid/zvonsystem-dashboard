'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Plus, Search } from 'lucide-react';
import CarrierInfoTable from './CarrierInfoTable';
import { getCarrierRouteConfig } from '@/src/lib/carrierRoutes';
import type { DashboardRole } from '@/src/lib/sidebarConfig';

type CarrierTabType = 'carrier-info' | 'drivers' | 'trucks' | 'trailers';

type CarriersPageMainComponentProps = {
  role?: DashboardRole;
};

export default function CarriersPageMainComponent({
  role = 'dispatcher',
}: CarriersPageMainComponentProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const carrierRoutes = getCarrierRouteConfig(role);

  const activeTab =
    (searchParams.get('tab') as CarrierTabType) || 'carrier-info';

  const handleAddCarrier = () => {
    router.push(carrierRoutes.addPath);
  };

  const handleOpenCarrier = (carrierId: string) => {
    router.push(carrierRoutes.detailPath(carrierId, 'overview'));
  };

  return (
    <main className="min-h-screen">
      <section className="space-y-4">
        <div className="rounded-2xl border border-[#E9EDF5] bg-white p-4 shadow-[0_1px_2px_rgba(16,24,40,0.04)] md:p-5">
          {activeTab === 'carrier-info' ? (
            <>
              <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <h2 className="text-[20px] font-semibold text-[#111827]">
                  All Carrier
                </h2>

                <button
                  type="button"
                  onClick={handleAddCarrier}
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-[#2F3E9E] px-4 text-sm font-medium text-white transition hover:opacity-95"
                >
                  <Plus className="h-4 w-4" />
                  Add Carrier
                </button>
              </div>

              <div className="mb-4">
                <div className="relative w-full">
                  <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9CA3AF]" />
                  <input
                    type="text"
                    placeholder="Search by name / MC No."
                    className="h-11 w-full rounded-xl border border-[#E5E7EB] bg-white pl-11 pr-4 text-sm text-[#111827] outline-none placeholder:text-[#9CA3AF] focus:border-[#C7D2FE]"
                  />
                </div>
              </div>

              <div className="rounded-xl border border-[#EEF0F5]">
                <CarrierInfoTable
                  onEditCarrier={handleOpenCarrier}
                  onViewCarrier={handleOpenCarrier}
                />
              </div>
            </>
          ) : null}
        </div>
      </section>
    </main>
  );
}
