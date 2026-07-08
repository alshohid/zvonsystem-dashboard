'use client';

import { useState } from 'react';
import { Eye, ChevronDown } from 'lucide-react';
import SearchInput from './SearchInput';
import TablePagination from './TablePagination';

import DriverPerformanceDetailsModal from './DriverPerformanceDetailsModal';
import { useModal } from '@/src/hooks/useModal';
import SelectField from '../ui/input/searchInput/SelectField';
import { monthOptions } from '../admin/performance/PerformanceContainer';

interface DriverItem {
  id: string;
  name: string;
  email: string;
  carrier: string;
  miles: number;
  loads: number;
  avg: string;
}

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

const drivers: DriverItem[] = [
  {
    id: '02',
    name: 'James Clark',
    email: 'yourmail@gmail.com',
    carrier: 'Express Cargo Services',
    miles: 345,
    loads: 89,
    avg: '$89',
  },
  {
    id: '03',
    name: 'Rodrigo',
    email: 'yourmail@gmail.com',
    carrier: 'Express Cargo Services',
    miles: 345,
    loads: 78,
    avg: '$89',
  },
  {
    id: '04',
    name: 'Ronaldo',
    email: 'yourmail@gmail.com',
    carrier: 'Express Cargo Services',
    miles: 345,
    loads: 89,
    avg: '$89',
  },
  {
    id: '05',
    name: 'Sophia Turner',
    email: 'yourmail@gmail.com',
    carrier: 'Express Cargo Services',
    miles: 345,
    loads: 78,
    avg: '$89',
  },
  {
    id: '06',
    name: 'Liam Johnson',
    email: 'yourmail@gmail.com',
    carrier: 'Express Cargo Services',
    miles: 345,
    loads: 99,
    avg: '$89',
  },
  {
    id: '07',
    name: 'Liam Johnson',
    email: 'yourmail@gmail.com',
    carrier: 'Express Cargo Services',
    miles: 345,
    loads: 99,
    avg: '$89',
  },
  {
    id: '08',
    name: 'Liam Johnson',
    email: 'yourmail@gmail.com',
    carrier: 'Express Cargo Services',
    miles: 345,
    loads: 99,
    avg: '$89',
  },
  {
    id: '09',
    name: 'Liam Johnson',
    email: 'yourmail@gmail.com',
    carrier: 'Express Cargo Services',
    miles: 345,
    loads: 99,
    avg: '$89',
  },
  {
    id: '10',
    name: 'Liam Johnson',
    email: 'yourmail@gmail.com',
    carrier: 'Express Cargo Services',
    miles: 345,
    loads: 99,
    avg: '$89',
  },
];

const driverDetailsMap: Record<string, DriverDetailsData> = {
  '02': {
    id: '02',
    revenue: '$447',
    loads: 47,
    miles: 560,
    driverName: 'James Clark',
    email: 'yourmail@gmail.com',
    contact: '+32 123423',
    carrier: 'James Clark',
    dotNo: '112321',
    mcNo: '112321',
  },
  '03': {
    id: '03',
    revenue: '$389',
    loads: 39,
    miles: 430,
    driverName: 'Rodrigo',
    email: 'yourmail@gmail.com',
    contact: '+32 555123',
    carrier: 'Express Cargo Services',
    dotNo: '223344',
    mcNo: '556677',
  },
  '04': {
    id: '04',
    revenue: '$520',
    loads: 58,
    miles: 610,
    driverName: 'Ronaldo',
    email: 'yourmail@gmail.com',
    contact: '+32 111222',
    carrier: 'Express Cargo Services',
    dotNo: '778899',
    mcNo: '445566',
  },
  '05': {
    id: '05',
    revenue: '$410',
    loads: 42,
    miles: 500,
    driverName: 'Sophia Turner',
    email: 'yourmail@gmail.com',
    contact: '+32 888999',
    carrier: 'Express Cargo Services',
    dotNo: '998877',
    mcNo: '332211',
  },
  '06': {
    id: '06',
    revenue: '$610',
    loads: 63,
    miles: 700,
    driverName: 'Liam Johnson',
    email: 'yourmail@gmail.com',
    contact: '+32 777444',
    carrier: 'Express Cargo Services',
    dotNo: '665544',
    mcNo: '221133',
  },
  '07': {
    id: '07',
    revenue: '$610',
    loads: 63,
    miles: 700,
    driverName: 'Liam Johnson',
    email: 'yourmail@gmail.com',
    contact: '+32 777444',
    carrier: 'Express Cargo Services',
    dotNo: '665544',
    mcNo: '221133',
  },
  '08': {
    id: '08',
    revenue: '$610',
    loads: 63,
    miles: 700,
    driverName: 'Liam Johnson',
    email: 'yourmail@gmail.com',
    contact: '+32 777444',
    carrier: 'Express Cargo Services',
    dotNo: '665544',
    mcNo: '221133',
  },
  '09': {
    id: '09',
    revenue: '$610',
    loads: 63,
    miles: 700,
    driverName: 'Liam Johnson',
    email: 'yourmail@gmail.com',
    contact: '+32 777444',
    carrier: 'Express Cargo Services',
    dotNo: '665544',
    mcNo: '221133',
  },
  '10': {
    id: '10',
    revenue: '$610',
    loads: 63,
    miles: 700,
    driverName: 'Liam Johnson',
    email: 'yourmail@gmail.com',
    contact: '+32 777444',
    carrier: 'Express Cargo Services',
    dotNo: '665544',
    mcNo: '221133',
  },
};

export default function DriverPerformanceTable() {

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(drivers.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = drivers.slice(startIndex, startIndex + itemsPerPage);
  const [selectedDriver, setSelectedDriver] =
    useState<DriverDetailsData | null>(null);
  const { isOpen, openModal, closeModal } = useModal(false);

  const handleOpenDetails = (driverId: string) => {
    const details = driverDetailsMap[driverId] ?? {
      id: driverId,
      revenue: '$0',
      loads: 0,
      miles: 0,
      driverName: 'N/A',
      email: 'N/A',
      contact: 'N/A',
      carrier: 'N/A',
      dotNo: 'N/A',
      mcNo: 'N/A',
    };

    setSelectedDriver(details);
    openModal();
  };

  const handleCloseDetails = () => {
    closeModal();
    setSelectedDriver(null);
  };

  return (
    <>
      <section className="rounded-2xl border border-[#E6EAF2] bg-white p-4 md:p-5">
        <h3 className="mb-4 text-[18px] font-semibold text-[#1F2430]">
          All Driver’s Performance
        </h3>

        <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center">
          <div className="flex-1">
            <SearchInput placeholder="Search..." />
          </div>

          <SelectField
            // value={selectedMonth}
            onChange={value => {
               console.log(value)
            }}
           
            options={monthOptions}
            placeholder="March"
            wrapperClassName="w-full sm:w-[116px]"
            selectClassName="bg-[#FCFCFD]"
           
          />
        </div>

        <div className="overflow-x-auto rounded-xl border border-[#E6EAF2]">
          <table className="min-w-full">
            <thead className="bg-[#F3F5F9]">
              <tr className="text-left text-[1rem] text-[#75809A]">
                <th className="px-4 py-4 font-medium">ID</th>
                <th className="px-4 py-4 font-medium">Driver</th>
                <th className="px-4 py-4 font-medium">Carrier</th>
                <th className="px-4 py-4 font-medium">Miles</th>
                <th className="px-4 py-4 font-medium">Loads</th>
                <th className="px-4 py-4 font-medium">Avg $/Miles</th>
                <th className="px-4 py-4 font-medium text-right">Action</th>
              </tr>
            </thead>

            <tbody>
              {currentData.map(item => (
                <tr
                  key={item.id}
                  className="border-t border-[#E9EDF5] text-[1rem] text-[#1F2430]"
                >
                  <td className="px-4 py-4">{item.id}</td>
                  <td className="px-4 py-4">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-xs text-[#8A94A6]">{item.email}</p>
                    </div>
                  </td>
                  <td className="px-4 py-4">{item.carrier}</td>
                  <td className="px-4 py-4">{item.miles}</td>
                  <td className="px-4 py-4">{item.loads}</td>
                  <td className="px-4 py-4">{item.avg}</td>
                  <td className="px-4 py-4 text-right">
                    <button
                      type="button"
                      onClick={() => handleOpenDetails(item.id)}
                      className="text-[#49526A] transition hover:text-[#313E8C]"
                    >
                      <Eye size={17} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex flex-col gap-4 bg-white px-4 py-4 md:flex-row md:items-center md:justify-between">
            <p className="text-sm text-[#2C3342]">
              Showing {startIndex + 1} to{' '}
              {Math.min(startIndex + itemsPerPage, drivers.length)} of{' '}
              {drivers.length} results
            </p>
            <TablePagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      </section>

      <DriverPerformanceDetailsModal
        isOpen={isOpen}
        onClose={handleCloseDetails}
        data={selectedDriver}
      />
    </>
  );
}
