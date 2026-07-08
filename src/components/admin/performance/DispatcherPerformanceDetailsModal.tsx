"use client";

import { Modal } from "@/src/components/ui/modal";

interface DispatcherPerformanceDetailsData {
  id: string;
  driverName: string;
  driverEmail: string;
  carrier: string;
  miles: number;
  loads: number;
  dispatchFee: string;
  contact: string;
  dotNo: string;
  mcNo: string;
  avgPerLoad: string;
}

type DispatcherPerformanceDetailsModalProps = {
  isOpen: boolean;
  onClose: () => void;
  data: DispatcherPerformanceDetailsData | null;
};

function StatCard({ value, label }: { value: string | number; label: string }) {
  return (
    <div className="rounded-xl bg-[#F3F6FA] px-4 py-4 text-center">
      <p className="text-[1.75rem] font-semibold leading-none text-[#101828]">
        {value}
      </p>
      <p className="mt-2 text-xs font-medium text-[#98A2B3]">{label}</p>
    </div>
  );
}

function InfoItem({
  label,
  value,
  isLast = false,
}: {
  label: string;
  value: string;
  isLast?: boolean;
}) {
  return (
    <div className={isLast ? "py-3" : "border-b border-[#EAECF0] py-3"}>
      <p className="text-[1rem] font-medium text-[#101828]">{label}</p>
      <p className="mt-1 text-sm text-[#98A2B3]">{value}</p>
    </div>
  );
}

export default function DispatcherPerformanceDetailsModal({
  isOpen,
  onClose,
  data,
}: DispatcherPerformanceDetailsModalProps) {
  if (!data) {
    return null;
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="mx-4 w-full max-w-[760px] rounded-[1.5rem] border border-[#E4E7EC] bg-white p-5 shadow-[0_20px_60px_rgba(16,24,40,0.14)] sm:p-6"
      contentBgClassName="bg-white"
      textClassName="text-[#101828]"
      overlayClassName="bg-[rgba(16,24,40,0.28)] backdrop-blur-[4px]"
      showCloseButton
    >
      <div className="space-y-5">
        <div className="pr-12">
          <h2 className="text-[1.75rem] font-semibold tracking-[-0.03em] text-[#101828]">
            Dispatcher&apos;s Performance Detail #ID_{data.id}
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <StatCard value={data.dispatchFee} label="Total Dispatch Fee" />
          <StatCard value={data.loads} label="Loads" />
          <StatCard value={data.miles} label="Miles" />
        </div>

        <div className="grid grid-cols-1 gap-x-8 sm:grid-cols-2">
          <div>
            <InfoItem label="Driver Name" value={data.driverName} />
            <InfoItem label="Email Address" value={data.driverEmail} />
            <InfoItem label="Contact" value={data.contact} />
            <InfoItem label="Avg $/Load" value={data.avgPerLoad} isLast />
          </div>

          <div>
            <InfoItem label="Carriers" value={data.carrier} />
            <InfoItem label="DOT No." value={data.dotNo} />
            <InfoItem label="MC No." value={data.mcNo} isLast />
          </div>
        </div>
      </div>
    </Modal>
  );
}
