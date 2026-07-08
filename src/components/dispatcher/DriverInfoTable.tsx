

'use client';
import { MoreHorizontal, Plus, Search, Trash2 } from 'lucide-react';
import { useState } from 'react';

import TablePagination from './TablePagination';
import DriverDetailModal from './DriverDetailModal';
import AddDriverModal from './AddDiverModal';
import SubmissionDoneModal from './SubmissionDoneModal';
import ReusableTable from '../tables/ReusableTable';
import { EditIcon, EyeIcon } from '@/src/icons';

type DriverRow = {
  id: string;
  name: string;
  carrier: string;
  truckNo: string;
  trailerNo: string;
  contact: string;
  status: 'Active' | 'Deleted';
};

const TABLE_HEADERS = [
  'Name',
  'Carrier',
  'Truck',
  'Trailer',
  'Contact',
  'Status',
  'Action',
];
const ITEMS_PER_PAGE = 5;

const INITIAL_DRIVERS: DriverRow[] = [
  {
    id: '01',
    name: 'James Clark',
    carrier: 'Truck Inc',
    truckNo: '30',
    trailerNo: '124',
    contact: '+32 23234',
    status: 'Active',
  },
  {
    id: '02',
    name: 'Rodrigue',
    carrier: 'J Travel LLC',
    truckNo: '18',
    trailerNo: '214',
    contact: '+32 23234',
    status: 'Active',
  },
  {
    id: '03',
    name: 'Carlos',
    carrier: 'Logic LTD',
    truckNo: '15',
    trailerNo: '435',
    contact: '+32 23234',
    status: 'Active',
  },
  {
    id: '04',
    name: 'Ronaldo',
    carrier: 'Logic LTD',
    truckNo: '-',
    trailerNo: '-',
    contact: '+32 23234',
    status: 'Active',
  },
  {
    id: '05',
    name: 'Ronaldo',
    carrier: 'Logic LTD',
    truckNo: '-',
    trailerNo: '-',
    contact: '+32 23234',
    status: 'Active',
  },
  {
    id: '06',
    name: 'Ronaldo',
    carrier: 'Logic LTD',
    truckNo: '-',
    trailerNo: '-',
    contact: '+32 23234',
    status: 'Active',
  },
  {
    id: '07',
    name: 'Ronaldo',
    carrier: 'Logic LTD',
    truckNo: '-',
    trailerNo: '-',
    contact: '+32 23234',
    status: 'Active',
  },
  {
    id: '08',
    name: 'Ronaldo',
    carrier: 'Logic LTD',
    truckNo: '-',
    trailerNo: '-',
    contact: '+32 23234',
    status: 'Active',
  },
  {
    id: '09',
    name: 'Ronaldo',
    carrier: 'Logic LTD',
    truckNo: '-',
    trailerNo: '-',
    contact: '+32 23234',
    status: 'Active',
  },
  {
    id: '10',
    name: 'Ronaldo',
    carrier: 'Logic LTD',
    truckNo: '-',
    trailerNo: '-',
    contact: '+32 23234',
    status: 'Active',
  },
  {
    id: '11',
    name: 'Ronaldo',
    carrier: 'Logic LTD',
    truckNo: '-',
    trailerNo: '-',
    contact: '+32 23234',
    status: 'Active',
  },
];

export default function DriverInfoTable() {
  const [driverRows, setDriverRows] = useState<DriverRow[]>(INITIAL_DRIVERS);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDriver, setSelectedDriver] = useState<DriverRow | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  // Filter rows by search query
  const filteredRows = driverRows.filter(
    row =>
      row.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.carrier.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const totalPages = Math.max(
    Math.ceil(filteredRows.length / ITEMS_PER_PAGE),
    1,
  );
  const safePage = Math.min(currentPage, totalPages);
  const startIndex = (safePage - 1) * ITEMS_PER_PAGE;
  const currentData = filteredRows.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  const handleOpenDetail = (row: DriverRow) => {
    setSelectedDriver(row);
    setIsModalOpen(true);
  };

  const handleAddDriverSuccess = () => {
    setIsAddModalOpen(false);
    setIsSuccessModalOpen(true);
  };

  const handleDelete = (id: string) => {
    setDriverRows(prev => prev.filter(d => d.id !== id));
    setIsModalOpen(false);
    setSelectedDriver(null);
  };

  const handleSave = (updated: DriverRow) => {
    setDriverRows(prev => prev.map(d => (d.id === updated.id ? updated : d)));
  };

  // ── Row renderers ────────────────────────────────────────────
  const rowRenderers = [
    // Name
    (row: DriverRow) => (
      <span className="font-medium text-[#1F2937]">{row.name}</span>
    ),

    // Carrier
    (row: DriverRow) => <span className="text-[#4B5563]">{row.carrier}</span>,

    // Truck No.
    (row: DriverRow) => <span className="text-[#4B5563]">{row.truckNo}</span>,

    // Trailer No.
    (row: DriverRow) => <span className="text-[#4B5563]">{row.trailerNo}</span>,

    // Contact
    (row: DriverRow) => <span className="text-[#4B5563]">{row.contact}</span>,

    // Status badge
    (row: DriverRow) => (
      <span
        className={`inline-flex rounded-full border px-2 py-0.5 text-[11px] font-medium ${
          row.status === 'Active'
            ? 'border-[#7AD389] bg-[#EAFBF0] text-[#22A447]'
            : 'border-[#FCA5A5] bg-[#FEF2F2] text-[#DC2626]'
        }`}
      >
        {row.status}
      </span>
    ),

    
    // Action dropdown
    (row: DriverRow) => (
      <div className="relative flex justify-self-auto">
        <button
          type="button"
          onClick={e => {
            e.stopPropagation();
            setOpenDropdownId(openDropdownId === row.id ? null : row.id);
          }}
          className="inline-flex h-8 w-8 items-center justify-center rounded-md text-[#6B7280] transition hover:bg-[#F8FAFC]"
        >
          <MoreHorizontal className="h-4 w-4" />
        </button>

        {openDropdownId === row.id && (
          <div className="absolute right-0 top-10 z-10 w-36 rounded-md border bg-white shadow-lg">
            <button
              className="flex items-center gap-2 w-full px-4 py-2 text-left hover:bg-gray-50"
              onClick={() => handleOpenDetail(row)}
            >
              View
            </button>
            <button
              className="flex items-center gap-2 w-full px-4 py-2 text-left hover:bg-gray-50"
              onClick={() => handleOpenDetail(row)}
            >
              Edit
            </button>
            <button
              className="flex items-center gap-2 w-full px-4 py-2 text-left text-red-600 hover:bg-gray-50"
              onClick={() => handleDelete(row.id)}
            >
              Delete
            </button>
          </div>
        )}
      </div>
    ),
  ];

  return (
    <>
      {/* Header */}
      <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <h2 className="text-[20px] font-semibold text-[#111827]">
          All Drivers
        </h2>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-[#2F3E9E] px-4 text-sm font-medium text-white transition hover:opacity-95"
        >
          <Plus className="h-4 w-4" />
          Add Driver
        </button>
      </div>

      {/* Search */}
      <div className="mb-4">
        <div className="relative w-full">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9CA3AF]" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => {
              setSearchQuery(e.target.value);
              setCurrentPage(1); // reset to page 1 on new search
            }}
            placeholder="Search by name / carrier"
            className="h-11 w-full rounded-xl border border-[#E5E7EB] bg-white pl-11 pr-4 text-sm text-[#111827] outline-none placeholder:text-[#9CA3AF] focus:border-[#C7D2FE]"
          />
        </div>
      </div>

      {/* Table + Pagination unified card */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <ReusableTable<DriverRow>
          tableHeader={TABLE_HEADERS}
          items={currentData}
          rowRenderers={rowRenderers}
          getRowKey={row => row.id}
          minTableWidthPx={800}
          emptyText="No drivers found"
          wrapperClassName="border-0 rounded-none"
        />

        {/* Pagination footer */}
        <div className="flex flex-col gap-4 border-t border-gray-100 bg-white px-4 py-4 dark:border-white/[0.05] dark:bg-transparent md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-[#2C3342]">
            Showing {filteredRows.length === 0 ? 0 : startIndex + 1} to{' '}
            {Math.min(startIndex + ITEMS_PER_PAGE, filteredRows.length)} of{' '}
            {filteredRows.length} results
          </p>
          <TablePagination
            currentPage={safePage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>

      {/* Modals */}
      {selectedDriver && (
        <DriverDetailModal
          open={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedDriver(null);
          }}
          driver={selectedDriver}
          onDelete={id => handleDelete(id)}
          onSave={updated => handleSave(updated)}
        />
      )}

      <AddDriverModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSuccess={handleAddDriverSuccess}
      />

      <SubmissionDoneModal
        open={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
      />
    </>
  );
}