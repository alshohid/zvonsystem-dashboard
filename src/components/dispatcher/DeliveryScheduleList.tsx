import { MoreHorizontal, Search, ChevronDown } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import TablePagination from './TablePagination';
import { DownCaretIcon } from '@/src/icons';
import GlobalDateFilter from './GlobalDateFilter';
import { DateRangeType } from '@/src/types/dispatcher/type';
import Link from 'next/link';
import DriverAvailabilityModal from './DriverAvailabilityModal';

export default function DeliveryScheduleList() {
  const scheduleRows = useMemo(
    () => [
      {
        loadId: 'RX-28471231',
        driverTruck: 'James Mad',
        routeFrom: 'Austin',
        routeTo: 'Texas',
        pickupDate: '04/04/2026',
        pickupTime: '08.26 AM',
        deliveryDate: '04/04/2026',
        deliveryTime: '08.26 AM',
        nextAvailable: '-',
        status: 'Booked',
      },
      {
        loadId: 'RX-2847444',
        driverTruck: 'James Mad',
        routeFrom: 'Austin',
        routeTo: 'Texas',
        pickupDate: '04/04/2026',
        pickupTime: '08.26 AM',
        deliveryDate: '04/04/2026',
        deliveryTime: '08.26 AM',
        nextAvailable: '-',
        status: 'Booked',
      },
      {
        loadId: 'RX-28479999',
        driverTruck: 'James Mad',
        routeFrom: 'Austin',
        routeTo: 'Texas',
        pickupDate: '04/04/2026',
        pickupTime: '08.26 AM',
        deliveryDate: '04/04/2026',
        deliveryTime: '08.26 AM',
        nextAvailable: '-',
        status: 'Booked',
      },
      {
        loadId: 'RX-284788',
        driverTruck: 'James Mad',
        routeFrom: 'Austin',
        routeTo: 'Texas',
        pickupDate: '04/04/2026',
        pickupTime: '08.26 AM',
        deliveryDate: '04/04/2026',
        deliveryTime: '08.26 AM',
        nextAvailable: '-',
        status: 'Available',
      },
      {
        loadId: 'RX-2847666',
        driverTruck: 'James Mad',
        routeFrom: 'Austin',
        routeTo: 'Texas',
        pickupDate: '04/04/2026',
        pickupTime: '08.26 AM',
        deliveryDate: '04/04/2026',
        deliveryTime: '08.26 AM',
        nextAvailable: '-',
        status: 'Booked',
      },
      {
        loadId: 'RX-28411',
        driverTruck: 'James Mad',
        routeFrom: 'Austin',
        routeTo: 'Texas',
        pickupDate: '04/04/2026',
        pickupTime: '08.26 AM',
        deliveryDate: '04/04/2026',
        deliveryTime: '08.26 AM',
        nextAvailable: '-',
        status: 'Available',
      },
      {
        loadId: 'RX-28413',
        driverTruck: 'James Mad',
        routeFrom: 'Austin',
        routeTo: 'Texas',
        pickupDate: '04/04/2026',
        pickupTime: '08.26 AM',
        deliveryDate: '04/04/2026',
        deliveryTime: '08.26 AM',
        nextAvailable: '-',
        status: 'Booked',
      },
      {
        loadId: 'RX-28415',
        driverTruck: 'James Mad',
        routeFrom: 'Austin',
        routeTo: 'Texas',
        pickupDate: '04/04/2026',
        pickupTime: '08.26 AM',
        deliveryDate: '04/04/2026',
        deliveryTime: '08.26 AM',
        nextAvailable: '-',
        status: 'Available',
      },
      {
        loadId: 'RX-2841645534',
        driverTruck: 'James Mad',
        routeFrom: 'Austin',
        routeTo: 'Texas',
        pickupDate: '04/04/2026',
        pickupTime: '08.26 AM',
        deliveryDate: '04/04/2026',
        deliveryTime: '08.26 AM',
        nextAvailable: '-',
        status: 'Booked',
      },
    ],
    [],
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState<DateRangeType>('30d');

  const filteredRows = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    return scheduleRows.filter(row => {
      if (!query) return true;

      return (
        row.loadId.toLowerCase().includes(query) ||
        row.driverTruck.toLowerCase().includes(query) ||
        row.routeFrom.toLowerCase().includes(query) ||
        row.routeTo.toLowerCase().includes(query) ||
        row.status.toLowerCase().includes(query)
      );
    });
  }, [scheduleRows, searchTerm]);

  const itemsPerPage = 5;
  const totalPages = Math.ceil(filteredRows.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = filteredRows.slice(startIndex, startIndex + itemsPerPage);
  const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [availabilityModalOpen, setAvailabilityModalOpen] = useState(false);
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpenMenuIndex(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  return (
    <>
      <div className="flex flex-col gap-3 py-2 md:flex-row md:items-center p-4">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#98A2B3]" />
          <input
            type="text"
            placeholder="Search by name / category / Id"
            value={searchTerm}
            onChange={e => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="h-11 w-full rounded-xl border border-[#E5E7EB] bg-white pl-11 pr-4 text-sm text-[#111827] outline-none placeholder:text-[#9CA3AF] focus:border-[#C7D2FE]"
          />
        </div>

        <GlobalDateFilter
          value={dateRange}
          onChange={val => {
            setDateRange(val);
            setCurrentPage(1);
          }}
        />
      </div>
      <div className="rounded-xl border border-[#EEF0F5] mx-4 my-2">
        <div className="overflow-x-auto">
          <table className="w-full border-separate border-spacing-0 text-sm">
            <thead>
              <tr className="text-left text-[1rem] font-medium text-[#8B8FA3]">
                <th className="border-b border-[#EEF0F5] px-4 py-3">Load ID</th>
                <th className="border-b border-[#EEF0F5] px-4 py-3">
                  Driver/Truck
                </th>
                <th className="border-b border-[#EEF0F5] px-4 py-3">Route</th>
                <th className="border-b border-[#EEF0F5] px-4 py-3">Pickup</th>
                <th className="border-b border-[#EEF0F5] px-4 py-3">
                  Delivery
                </th>
                <th className="border-b border-[#EEF0F5] px-4 py-3">
                  Next Available
                </th>
                <th className="border-b border-[#EEF0F5] px-4 py-3">Status</th>
                <th className="border-b border-[#EEF0F5] px-4 py-3"></th>
              </tr>
            </thead>

            <tbody>
              {currentData.map((row, index) => (
                <tr key={index} className="text-[1rem] text-[#111827]">
                  <td className="border-b border-[#F3F4F6] px-4 py-4 font-medium text-[#374151]">
                    {row.loadId}
                  </td>

                  <td className="border-b border-[#F3F4F6] px-4 py-4 text-[#374151]">
                    {row.driverTruck}
                  </td>

                  <td className="border-b border-[#F3F4F6] px-4 py-4">
                    <div className="space-y-1 text-[#374151]">
                      <p className="text-[12px]">
                        <span className="text-[#111827]">From:</span>{' '}
                        {row.routeFrom}
                      </p>
                      <p className="text-[12px]">
                        <span className="text-[#111827]">To:</span>{' '}
                        {row.routeTo}
                      </p>
                    </div>
                  </td>

                  <td className="border-b border-[#F3F4F6] px-4 py-4">
                    <div className="space-y-1">
                      <p className="text-[13px] font-medium text-[#374151]">
                        {row.pickupDate}
                      </p>
                      <p className="text-[12px] text-[#6B7280]">
                        {row.pickupTime}
                      </p>
                    </div>
                  </td>

                  <td className="border-b border-[#F3F4F6] px-4 py-4">
                    <div className="space-y-1">
                      <p className="text-[13px] font-medium text-[#374151]">
                        {row.deliveryDate}
                      </p>
                      <p className="text-[12px] text-[#6B7280]">
                        {row.deliveryTime}
                      </p>
                    </div>
                  </td>

                  <td className="border-b border-[#F3F4F6] px-4 py-4 text-[#374151]">
                    {row.nextAvailable}
                  </td>

                  <td className="border-b border-[#F3F4F6] px-4 py-4">
                    <span
                      className={`inline-flex rounded-full px-2 py-[2px] text-[11px] font-medium ${
                        row.status === 'Available'
                          ? 'border border-[#72D38B] bg-[#EAFBF0] text-[#22A447]'
                          : 'border border-[#F2B84B] bg-[#FFF6E6] text-[#D68A00]'
                      }`}
                    >
                      {row.status}
                    </span>
                  </td>

                  <td className="border-b border-[#F3F4F6] px-4 py-4 text-right">
                    <div
                      className="relative inline-block"
                      ref={openMenuIndex === index ? menuRef : null}
                    >
                      <button
                        className="inline-flex h-8 w-8 items-center justify-center rounded-md text-[#6B7280] transition hover:bg-[#F8FAFC]"
                        onClick={() =>
                          setOpenMenuIndex(prev =>
                            prev === index ? null : index,
                          )
                        }
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </button>

                      {openMenuIndex === index && (
                        <div className="absolute right-0 top-full z-30 mt-1 w-[150px] rounded-xl border border-[#E3E7EF] bg-white p-1 shadow-lg">
                          <button
                            className="flex w-full items-center rounded-lg px-3 py-2 text-left text-sm text-[#374151] transition hover:bg-[#F5F7FB]"
                            onClick={() => setAvailabilityModalOpen(true)}
                          >
                            Edit Schedule
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col gap-4 bg-white px-4 py-4 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-[#2C3342]">
            Showing {filteredRows.length === 0 ? 0 : startIndex + 1} to{' '}
            {Math.min(startIndex + itemsPerPage, filteredRows.length)} of{' '}
            {filteredRows.length} results
          </p>

          <TablePagination
            currentPage={currentPage}
            totalPages={Math.max(totalPages, 1)}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
      <DriverAvailabilityModal
        isOpen={availabilityModalOpen}
        onClose={() => setAvailabilityModalOpen(false)}
        onSuccess={() => {
          console.log('Availability updated successfully');
        }}
      />
    </>
  );
}
