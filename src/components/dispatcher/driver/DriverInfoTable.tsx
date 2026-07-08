
'use client';
import React, { useState, useRef, useEffect } from 'react';
import { MoreHorizontal, Search, Edit2, Eye, Trash2 } from 'lucide-react';

import DriverDetailModal from './DriverDetailModal';
import TablePagination from '../TablePagination';
import { Modal } from '../../ui/modal';
import { Driver } from '@/src/types/driver/type';
import ReusableTable from '../../tables/ReusableTable';

const ITEMS_PER_PAGE = 5;

const DRIVER_DATA: Driver[] = [
  {
    id: '02',
    name: 'James Clark',
    carrier: 'Truck Inc',
    truckNo: '30',
    trailerNo: '6700',
    contact: '+32 23234',
    status: 'Active',
  },
  {
    id: '03',
    name: 'Rodrique',
    carrier: 'J Travel LLC',
    truckNo: '18',
    trailerNo: '4380',
    contact: '+32 23234',
    status: 'Active',
  },
  {
    id: '04',
    name: 'Ronaldo',
    carrier: 'Logic LTD',
    truckNo: '15',
    trailerNo: '3250',
    contact: '+32 23234',
    status: 'Deleted',
  },
  {
    id: '05',
    name: 'Rodrique',
    carrier: 'J Travel LLC',
    truckNo: '18',
    trailerNo: '4380',
    contact: '+32 23234',
    status: 'Active',
  },
  {
    id: '06',
    name: 'Ronaldo',
    carrier: 'Logic LTD',
    truckNo: '15',
    trailerNo: '3250',
    contact: '+32 23234',
    status: 'Deleted',
  },
  {
    id: '07',
    name: 'Rodrique',
    carrier: 'J Travel LLC',
    truckNo: '18',
    trailerNo: '4380',
    contact: '+32 23234',
    status: 'Active',
  },
  {
    id: '08',
    name: 'Ronaldo',
    carrier: 'Logic LTD',
    truckNo: '15',
    trailerNo: '3250',
    contact: '+32 23234',
    status: 'Deleted',
  },
  {
    id: '09',
    name: 'Rodrique',
    carrier: 'J Travel LLC',
    truckNo: '18',
    trailerNo: '4380',
    contact: '+32 23234',
    status: 'Active',
  },
  {
    id: '17',
    name: 'Ronaldo',
    carrier: 'Logic LTD',
    truckNo: '15',
    trailerNo: '3250',
    contact: '+32 23234',
    status: 'Deleted',
  },
  {
    id: '11',
    name: 'Ronaldo',
    carrier: 'Logic LTD',
    truckNo: '15',
    trailerNo: '3250',
    contact: '+32 23234',
    status: 'Deleted',
  },
  {
    id: '16',
    name: 'Ronaldo',
    carrier: 'Logic LTD',
    truckNo: '15',
    trailerNo: '3250',
    contact: '+32 23234',
    status: 'Deleted',
  },
];

const TABLE_HEADERS = [
  'ID',
  'Name',
  'Carrier',
  'Truck',
  'Trailer',
  'Contact',
  'Status',
  'Action',
];

export default function DriverInfoTable() {
  const [drivers, setDrivers] = useState<Driver[]>(DRIVER_DATA);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Driver | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Filter by search
  const filteredDrivers = drivers.filter(
    d =>
      d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.carrier.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.id.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const totalPages = Math.max(
    Math.ceil(filteredDrivers.length / ITEMS_PER_PAGE),
    1,
  );
  const safePage = Math.min(currentPage, totalPages);
  const startIndex = (safePage - 1) * ITEMS_PER_PAGE;
  const currentData = filteredDrivers.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  const openDetails = (driver: Driver) => {
    setSelectedDriver(driver);
    setIsDetailOpen(true);
    setActiveDropdown(null);
  };

  const handleDelete = (id: string) => {
    setDrivers(prev => prev.filter(d => d.id !== id));
    setDeleteTarget(null);
    setActiveDropdown(null);
  };

  // ── Row renderers ────────────────────────────────────────────
  const rowRenderers = [
    // ID
    (driver: Driver) => <span className="text-gray-500">{driver.id}</span>,

    // Name
    (driver: Driver) => (
      <span className="font-semibold text-gray-900">{driver.name}</span>
    ),

    // Carrier
    (driver: Driver) => <span className="text-gray-600">{driver.carrier}</span>,

    // Truck No.
    (driver: Driver) => <span className="text-gray-600">{driver.truckNo}</span>,

    // Trailer No.
    (driver: Driver) => (
      <span className="text-gray-600">{driver.trailerNo}</span>
    ),

    // Contact
    (driver: Driver) => <span className="text-gray-600">{driver.contact}</span>,

    // Status badge
    (driver: Driver) => (
      <span
        className={`rounded-full border px-3 py-1 text-[11px] font-bold ${
          driver.status === 'Active'
            ? 'border-green-200 bg-green-50 text-green-600'
            : 'border-red-100 bg-red-50 text-red-400'
        }`}
      >
        {driver.status}
      </span>
    ),

    // Action dropdown
    (driver: Driver) => (
      <div className="relative">
        <button
          onClick={e => {
            e.stopPropagation();
            setActiveDropdown(activeDropdown === driver.id ? null : driver.id);
          }}
          className={`rounded-md p-1 transition-colors ${
            activeDropdown === driver.id ? 'bg-gray-100' : 'hover:bg-gray-100'
          }`}
        >
          <MoreHorizontal className="h-5 w-5 text-gray-400" />
        </button>

        {activeDropdown === driver.id && (
          <div
            ref={dropdownRef}
            className="absolute right-4 top-8 z-50 w-36 animate-in fade-in zoom-in rounded-xl border border-gray-100 bg-white py-2 shadow-xl duration-100"
          >
            <button
              onClick={() => openDetails(driver)}
              className="flex w-full items-center gap-3 px-4 py-2 text-left text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              <Eye size={16} className="text-gray-400" /> View
            </button>
            <button
              onClick={() => openDetails(driver)}
              className="flex w-full items-center gap-3 px-4 py-2 text-left text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              <Edit2 size={16} className="text-gray-400" /> Edit
            </button>
            <div className="my-1 border-t border-gray-50" />
            <button
              onClick={() => {
                setDeleteTarget(driver);
                setActiveDropdown(null);
              }}
              className="flex w-full items-center gap-3 px-4 py-2 text-left text-sm font-medium text-red-500 hover:bg-red-50"
            >
              <Trash2 size={16} /> Delete
            </button>
          </div>
        )}
      </div>
    ),
  ];

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-bold text-gray-900">All Drivers</h2>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={e => {
            setSearchQuery(e.target.value);
            setCurrentPage(1);
          }}
          placeholder="Search by name / carrier / ID"
          className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 pl-11 pr-4 text-sm outline-none transition-all focus:border-indigo-500"
        />
      </div>

      {/* Table + Pagination unified card */}
      <div className="overflow-hidden rounded-xl border border-gray-200">
        <ReusableTable<Driver>
          tableHeader={TABLE_HEADERS}
          items={currentData}
          rowRenderers={rowRenderers}
          getRowKey={row => row.id}
          minTableWidthPx={800}
          emptyText="No drivers found"
          wrapperClassName="border-0 rounded-none"
          rowClassName="border-b border-gray-200 hover:bg-gray-50/50 transition-colors"
        />

        {/* Pagination footer */}
        <div className="flex flex-col gap-4 border-t border-gray-100 bg-white px-4 py-4 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-[#2C3342]">
            Showing {filteredDrivers.length === 0 ? 0 : startIndex + 1} to{' '}
            {Math.min(startIndex + ITEMS_PER_PAGE, filteredDrivers.length)} of{' '}
            {filteredDrivers.length} results
          </p>
          <TablePagination
            currentPage={safePage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>

      {/* Detail Modal */}
      {selectedDriver && (
        <DriverDetailModal
          open={isDetailOpen}
          onClose={() => {
            setIsDetailOpen(false);
            setSelectedDriver(null);
          }}
          driver={selectedDriver}
        />
      )}

      {/* Delete Confirm Modal */}
      <Modal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        showCloseButton={false}
        className="max-w-[420px]"
      >
        <div className="p-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-50">
            <Trash2 className="h-6 w-6 text-red-500" />
          </div>
          <h3 className="mb-2 text-[18px] font-semibold text-gray-900">
            Delete Driver?
          </h3>
          <p className="mb-6 text-sm text-gray-500">
            Are you sure you want to delete{' '}
            <span className="font-semibold text-gray-900">
              {deleteTarget?.name}
            </span>
            ? This action cannot be undone.
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => setDeleteTarget(null)}
              className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              onClick={() => deleteTarget && handleDelete(deleteTarget.id)}
              className="h-11 w-full rounded-xl bg-red-500 text-sm font-medium text-white transition hover:opacity-90"
            >
              Yes, Delete
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}