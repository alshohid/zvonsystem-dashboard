'use client';

import { Modal } from "../ui/modal";



interface DriverDetailsData {
  id: string;
  revenue: string;
  loads: number;
  miles: number;
  driverName: string;
  email: string;
  contact: string;
  carrier: string;
  dotNo: string;
  mcNo: string;
}

interface DriverPerformanceDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: DriverDetailsData | null;
}

function StatCard({ value, label }: { value: string | number; label: string }) {
  return (
    <div className="flex min-h-[216px] flex-col items-center justify-center rounded-xl bg-[#F3F5F9] px-4 py-5 text-center">
      <p className="text-[32px] font-semibold leading-none text-[#1F2430]">
        {value}
      </p>
      <p className="mt-3 text-sm text-[#8A94A6]">{label}</p>
    </div>
  );
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-b border-[#EEF1F6] py-3">
      <p className="text-sm font-medium text-[#1F2430]">{label}</p>
      <p className="mt-1 text-sm text-[#8A94A6]">{value}</p>
    </div>
  );
}

export default function DriverPerformanceDetailsModal({
  isOpen,
  onClose,
  data,
}: DriverPerformanceDetailsModalProps) {
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
            Driver’s Performance Detail #ID_{data.id}
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <StatCard value={data.revenue} label="Revenue" />
          <StatCard value={data.loads} label="Loads" />
          <StatCard value={data.miles} label="Miles" />
        </div>

        <div className="grid grid-cols-1 gap-x-8 sm:grid-cols-2">
          <div>
            <InfoItem label="Driver Name" value={data.driverName} />
            <InfoItem label="Email Address" value={data.email} />
            <InfoItem label="Contact" value={data.contact} />
          </div>

          <div>
            <InfoItem label="Carriers" value={data.carrier} />
            <InfoItem label="DOT No." value={data.dotNo} />
            <InfoItem label="MC No." value={data.mcNo} />
          </div>
        </div>
      </div>
    </Modal>
  );
}
