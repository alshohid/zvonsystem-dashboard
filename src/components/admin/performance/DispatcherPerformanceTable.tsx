"use client";

import { useState } from "react";
import { Eye } from "lucide-react";
import { useModal } from "@/src/hooks/useModal";
import ReusableTable from "@/src/components/tables/ReusableTable";
import DispatcherPerformanceDetailsModal from "@/src/components/admin/performance/DispatcherPerformanceDetailsModal";

export type DispatcherPerformanceRecord = {
  id: string;
  driverName: string;
  driverEmail: string;
  carrier: string;
  miles: number;
  loads: number;
  dispatchFee: string;
  month: string;
  contact: string;
  dotNo: string;
  mcNo: string;
  avgPerLoad: string;
};

type DispatcherPerformanceTableProps = {
  items: DispatcherPerformanceRecord[];
  emptyText?: string;
};

const tableHeader = [
  "ID",
  "Driver",
  "Carrier",
  "Miles",
  "Loads",
  "Dispatch Fee",
  "Action",
];

export default function DispatcherPerformanceTable({
  items,
  emptyText = "No dispatcher performance records matched the current filters.",
}: DispatcherPerformanceTableProps) {
  const [selectedRecord, setSelectedRecord] =
    useState<DispatcherPerformanceRecord | null>(null);
  const { isOpen, openModal, closeModal } = useModal(false);

  const handleOpenDetails = (record: DispatcherPerformanceRecord) => {
    setSelectedRecord(record);
    openModal();
  };

  const handleCloseDetails = () => {
    closeModal();
    setSelectedRecord(null);
  };

  return (
    <>
      <ReusableTable<DispatcherPerformanceRecord>
        tableHeader={tableHeader}
        items={items}
        getRowKey={(record) => `${record.month}-${record.id}-${record.driverEmail}`}
        minTableWidthPx={980}
        wrapperClassName="rounded-none border-0 bg-transparent shadow-none"
        tableClassName="w-full border-separate border-spacing-0"
        tableBodyClassName="divide-y-0"
        rowClassName="bg-white transition hover:bg-[#FCFCFD]"
        headerCellClassName="border-b border-[#EAECF0] bg-[#F8FAFC] px-4 py-3 text-left text-[1rem] leading-5 font-medium text-[#667085] first:rounded-tl-[10px] last:rounded-tr-[10px]"
        bodyCellClassName="border-b border-[#EAECF0] px-4 py-4 align-middle text-[1rem] leading-5 text-[#101828]"
        emptyText={emptyText}
        emptyCellClassName="block px-5 py-16 text-center text-sm text-[#667085]"
        rowRenderers={[
          (record) => <span>{record.id}</span>,
          (record) => (
            <div>
              <p className="font-medium text-[#101828]">{record.driverName}</p>
              <p className="mt-1 text-sm text-[#667085]">{record.driverEmail}</p>
            </div>
          ),
          (record) => <span>{record.carrier}</span>,
          (record) => <span>{record.miles}</span>,
          (record) => <span>{record.loads}</span>,
          (record) => <span className="font-medium text-[#101828]">{record.dispatchFee}</span>,
          (record) => (
            <div className="flex justify-center">
              <button
                type="button"
                onClick={() => handleOpenDetails(record)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full text-[#344054] transition hover:bg-[#F2F4F7]"
                aria-label={`View performance for ${record.driverName}`}
              >
                <Eye size={18} />
              </button>
            </div>
          ),
        ]}
      />

      <DispatcherPerformanceDetailsModal
        isOpen={isOpen}
        onClose={handleCloseDetails}
        data={selectedRecord}
      />
    </>
  );
}
