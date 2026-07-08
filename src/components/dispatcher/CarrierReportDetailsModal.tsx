'use client';

import { Modal } from "../ui/modal";



interface DriverItem {
  id: string;
  initials: string;
  name: string;
  loads: number;
  revenue: string;
  miles: number;
  ratePerMile: string;
}

interface TruckItem {
  id: string;
  truckNo: string;
  loads: number;
  miles: number;
}

interface CarrierDetailsData {
  totalLoads: number;
  totalRevenue: string;
  totalMiles: number;
  avgRatePerLoad: string;
  avgRatePerMile: string;
  drivers: DriverItem[];
  trucks: TruckItem[];
}

interface CarrierReportDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: CarrierDetailsData | null;
}

function StatCard({ value, label }: { value: string | number; label: string }) {
  return (
    <div className="rounded-xl border border-[#E6EAF2] bg-[#F8F9FC] p-4">
      <p className="text-[24px] font-semibold leading-none text-[#1F2430]">
        {value}
      </p>
      <p className="mt-2 text-sm text-[#8A94A6]">{label}</p>
    </div>
  );
}

export default function CarrierReportDetailsModal({
  isOpen,
  onClose,
  data,
}: CarrierReportDetailsModalProps) {
  if (!data) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="mx-4 w-full max-w-215 rounded-3xl border border-[#E6EAF2] bg-white p-5 shadow-[0_20px_60px_rgba(0,0,0,0.12)] md:p-6"
      contentBgClassName="bg-white"
      textClassName="text-[#1F2430]"
      overlayClassName="bg-[rgba(16,15,15,0.35)] backdrop-blur-[6px]"
      showCloseButton
    >
      <div className="space-y-5">
        <div className="pr-10">
          <h2 className="text-[18px] font-semibold text-[#1F2430]">
            Carrier Report Details
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
          <StatCard value={data.totalLoads} label="Total Loads" />
          <StatCard value={data.totalRevenue} label="Total Revenue" />
          <StatCard value={data.totalMiles} label="Total Miles" />
          <StatCard value={data.avgRatePerLoad} label="Avg Rate/Load" />
          <StatCard value={data.avgRatePerMile} label="Avg Rate/Mile" />
        </div>

        <div>
          <h3 className="mb-2 text-sm font-semibold text-[#1F2430]">
            Drivers ({data.drivers.length})
          </h3>

          <div className="overflow-hidden rounded-xl border border-[#E6EAF2]">
            <table className="min-w-full">
              <thead className="bg-[#F3F5F9]">
                <tr className="text-left text-sm text-[#75809A]">
                  <th className="px-4 py-3 font-medium">Driver</th>
                  <th className="px-4 py-3 font-medium">Loads</th>
                  <th className="px-4 py-3 font-medium">Revenue</th>
                  <th className="px-4 py-3 font-medium">Miles</th>
                  <th className="px-4 py-3 font-medium">$/Mile</th>
                </tr>
              </thead>

              <tbody>
                {data.drivers.map(driver => (
                  <tr
                    key={driver.id}
                    className="border-t border-[#E9EDF5] text-sm text-[#1F2430]"
                  >
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#EEEEF1] text-[10px] font-semibold text-[#4B4B4B]">
                          {driver.initials}
                        </div>
                        <p className="font-medium">{driver.name}</p>
                      </div>
                    </td>
                    <td className="px-4 py-4">{driver.loads}</td>
                    <td className="px-4 py-4">{driver.revenue}</td>
                    <td className="px-4 py-4">{driver.miles}</td>
                    <td className="px-4 py-4">{driver.ratePerMile}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h3 className="mb-2 text-sm font-semibold text-[#1F2430]">
            Truck ({data.trucks.length})
          </h3>

          <div className="overflow-hidden rounded-xl border border-[#E6EAF2]">
            <table className="min-w-full">
              <thead className="bg-[#F3F5F9]">
                <tr className="text-left text-sm text-[#75809A]">
                  <th className="px-4 py-3 font-medium">Truck</th>
                  <th className="px-4 py-3 font-medium">Loads</th>
                  <th className="px-4 py-3 font-medium">Miles</th>
                </tr>
              </thead>

              <tbody>
                {data.trucks.map(truck => (
                  <tr
                    key={truck.id}
                    className="border-t border-[#E9EDF5] text-sm text-[#1F2430]"
                  >
                    <td className="px-4 py-4">{truck.truckNo}</td>
                    <td className="px-4 py-4">{truck.loads}</td>
                    <td className="px-4 py-4">{truck.miles}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Modal>
  );
}
