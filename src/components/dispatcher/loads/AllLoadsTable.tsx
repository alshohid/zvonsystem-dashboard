

'use client';
import React, { useState, } from 'react';
import { Search, MoreHorizontal } from 'lucide-react';

import TablePagination from '../TablePagination';
import { useRouter } from 'next/navigation';
import { Modal } from '@/src/components/ui/modal';
import { Trash2 } from 'lucide-react';
import FilterDropdown from './FilterDropdown';

const LOADS_DATA = [
  {
    id: '20241215-5-001',
    assignedTo: 'James Mad',
    rate: '$2,500',
    address: 'Los Angeles, CA',
    date: '2024-03-29',
    status: 'Delivered',
  },
  {
    id: '20241215-5-002',
    assignedTo: 'James Mad',
    rate: '$2,500',
    address: 'Seattle, WA',
    date: '2024-03-29',
    status: 'Assigned',
  },
  {
    id: '20241215-5-093',
    assignedTo: 'James Mad',
    rate: '$2,500',
    address: 'Miami, FL',
    date: '2024-03-29',
    status: 'Completed',
  },
  {
    id: '20241215-5-084',
    assignedTo: 'James Mad',
    rate: '$2,500',
    address: 'Portland, OR',
    date: '2024-03-29',
    status: 'Completed',
  },
  {
    id: '20241215-5-075',
    assignedTo: 'James Mad',
    rate: '$2,500',
    address: 'Charlotte, NC',
    date: '2024-03-29',
    status: 'Pickup',
  },
  {
    id: '20241215-5-073',
    assignedTo: 'James Mad',
    rate: '$2,500',
    address: 'Miami, FL',
    date: '2024-03-29',
    status: 'Completed',
  },
  {
    id: '20241215-5-064',
    assignedTo: 'James Mad',
    rate: '$2,500',
    address: 'Portland, OR',
    date: '2024-03-29',
    status: 'Completed',
  },
  {
    id: '20241215-5-065',
    assignedTo: 'James Mad',
    rate: '$2,500',
    address: 'Charlotte, NC',
    date: '2024-03-29',
    status: 'Pickup',
  },
  {
    id: '20241215-5-063',
    assignedTo: 'James Mad',
    rate: '$2,500',
    address: 'Miami, FL',
    date: '2024-03-29',
    status: 'Completed',
  },
  {
    id: '20241215-5-054',
    assignedTo: 'James Mad',
    rate: '$2,500',
    address: 'Portland, OR',
    date: '2024-03-29',
    status: 'Completed',
  },
  {
    id: '20241215-5-055',
    assignedTo: 'James Mad',
    rate: '$2,500',
    address: 'Charlotte, NC',
    date: '2024-03-29',
    status: 'Pickup',
  },
  {
    id: '20241215-5-033',
    assignedTo: 'James Mad',
    rate: '$2,500',
    address: 'Miami, FL',
    date: '2024-03-29',
    status: 'Completed',
  },
  {
    id: '20241215-5-034',
    assignedTo: 'James Mad',
    rate: '$2,500',
    address: 'Portland, OR',
    date: '2024-03-29',
    status: 'Completed',
  },
  {
    id: '20241215-5-035',
    assignedTo: 'James Mad',
    rate: '$2,500',
    address: 'Charlotte, NC',
    date: '2024-03-29',
    status: 'Pickup',
  },
  {
    id: '20241215-5-013',
    assignedTo: 'James Mad',
    rate: '$2,500',
    address: 'Miami, FL',
    date: '2024-03-29',
    status: 'Completed',
  },
  {
    id: '20241215-5-014',
    assignedTo: 'James Mad',
    rate: '$2,500',
    address: 'Portland, OR',
    date: '2024-03-29',
    status: 'Completed',
  },
  {
    id: '20241215-5-015',
    assignedTo: 'James Mad',
    rate: '$2,500',
    address: 'Charlotte, NC',
    date: '2024-03-29',
    status: 'Pickup',
  },
  {
    id: '20241215-5-023',
    assignedTo: 'James Mad',
    rate: '$2,500',
    address: 'Miami, FL',
    date: '2024-03-29',
    status: 'Completed',
  },
  {
    id: '20241215-5-024',
    assignedTo: 'James Mad',
    rate: '$2,500',
    address: 'Portland, OR',
    date: '2024-03-29',
    status: 'Completed',
  },
  {
    id: '20241215-5-025',
    assignedTo: 'James Mad',
    rate: '$2,500',
    address: 'Charlotte, NC',
    date: '2024-03-29',
    status: 'Pickup',
  },
];

const STATUS_OPTIONS = ['All', 'Delivered', 'Assigned', 'Completed', 'Pickup'];
const SORT_OPTIONS = ['Newest', 'Oldest'];

// Reusable dropdown component


export function AllLoadsTable() {
  const router = useRouter();
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedSort, setSelectedSort] = useState('Newest');
  const [deleteTarget, setDeleteTarget] = useState<
    (typeof LOADS_DATA)[0] | null
  >(null);
  const [loads, setLoads] = useState(LOADS_DATA);

  const itemsPerPage = 5;

  // Filter by status
  const filteredData = loads
    .filter(l => selectedStatus === 'All' || l.status === selectedStatus)
    .sort((a, b) =>
      selectedSort === 'Newest'
        ? new Date(b.date).getTime() - new Date(a.date).getTime()
        : new Date(a.date).getTime() - new Date(b.date).getTime(),
    );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const safePage = Math.min(currentPage, Math.max(totalPages, 1));
  const startIndex = (safePage - 1) * itemsPerPage;
  const currentData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  const handleViewLoad = (id: string) => {
    router.push(`/dispatcher/dashboard/loads/${id}?tab=details`);
  };
  const handleEditLoad = (id: string) => {
    router.push(`/dispatcher/dashboard/loads/${id}?tab=details&edit=true`);
  };
  const handleConfirmDelete = () => {
    if (!deleteTarget) return;
    setLoads(prev => prev.filter(l => l.id !== deleteTarget.id));
    setDeleteTarget(null);
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Delivered':
        return 'bg-green-50 text-green-600 border-green-200';
      case 'Assigned':
        return 'bg-orange-50 text-orange-400 border-orange-200';
      case 'Completed':
        return 'bg-green-50 text-green-500 border-green-100';
      case 'Pickup':
        return 'bg-yellow-50 text-yellow-600 border-yellow-200';
      default:
        return 'bg-gray-50 text-gray-600 border-gray-200';
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-[24px] font-bold text-gray-900">All Created Loads</h2>
        <button
          onClick={() => router.push('/dispatcher/dashboard/loads/new-loads')}
          className="bg-[#2B3674] text-white px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-[#1e2756] transition-all"
        >
          + Add New Load
        </button>
      </div>

      <div className="flex flex-wrap gap-3 mb-6">
        <div className="relative flex-1 min-w-[300px]">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Search by name / category / Id"
            className="w-full h-12 pl-11 pr-4 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:border-indigo-500 text-sm"
          />
        </div>

        {/* ── Status Filter ── */}
        <FilterDropdown
          label="Status"
          options={STATUS_OPTIONS}
          selected={selectedStatus}
          onSelect={val => {
            setSelectedStatus(val);
            setCurrentPage(1);
          }}
        />

        {/* ── Sort Filter ── */}
        <FilterDropdown
          label="Newest"
          options={SORT_OPTIONS}
          selected={selectedSort}
          onSelect={val => {
            setSelectedSort(val);
            setCurrentPage(1);
          }}
        />
      </div>

      <div className="overflow-x-auto border rounded-2xl">
        <table className="w-full text-[1rem] text-left">
          <thead className="text-gray-400 font-medium border-b border-gray-200">
            <tr>
              <th className="px-4 py-3">Load Number</th>
              <th className="px-4 py-3">Assigned To</th>
              <th className="px-4 py-3">Rate/Mile ($)</th>
              <th className="px-4 py-3">Delivery Address</th>
              <th className="px-4 py-3">Pickup Date</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentData.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="px-4 py-8 text-center text-sm text-gray-400"
                >
                  No loads found
                </td>
              </tr>
            ) : (
              currentData.map((load, index) => (
                <tr
                  key={load.id}
                  className="border-b border-gray-200 hover:bg-gray-50/50"
                >
                  <td className="px-4 py-4 font-medium text-gray-600">
                    {load.id}
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-500">
                        JM
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">
                          {load.assignedTo}
                        </p>
                        <p className="text-[10px] text-gray-400">RX-2847</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 font-semibold text-gray-900">
                    {load.rate}
                  </td>
                  <td className="px-4 py-4 text-gray-600">{load.address}</td>
                  <td className="px-4 py-4 text-gray-600">{load.date}</td>
                  <td className="px-4 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-[11px] font-bold border ${getStatusStyle(load.status)}`}
                    >
                      {load.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 relative">
                    <button
                      onClick={() =>
                        setActiveDropdown(
                          activeDropdown === index ? null : index,
                        )
                      }
                      className="p-1"
                    >
                      <MoreHorizontal className="h-5 w-5 text-gray-400" />
                    </button>
                    {activeDropdown === index && (
                      <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-100 shadow-xl rounded-xl z-10 py-2">
                        <button
                          onClick={() => {
                            handleViewLoad(load.id);
                            setActiveDropdown(null);
                          }}
                          className="w-full px-4 py-2 text-left hover:bg-gray-50 text-sm"
                        >
                          View Load
                        </button>
                        <button
                          onClick={() => {
                            handleEditLoad(load.id);
                            setActiveDropdown(null);
                          }}
                          className="w-full px-4 py-2 text-left hover:bg-gray-50 text-sm"
                        >
                          Edit Load
                        </button>
                        <button
                          onClick={() => {
                            setDeleteTarget(load);
                            setActiveDropdown(null);
                          }}
                          className="w-full px-4 py-2 text-left hover:bg-red-50 text-red-500 text-sm"
                        >
                          Delete Load
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col gap-4 bg-white px-4 py-4 md:flex-row md:items-center md:justify-between">
        <p className="text-sm text-[#2C3342]">
          Showing {filteredData.length === 0 ? 0 : startIndex + 1} to{' '}
          {Math.min(startIndex + itemsPerPage, filteredData.length)} of{' '}
          {filteredData.length} results
        </p>
        <TablePagination
          currentPage={safePage}
          totalPages={Math.max(totalPages, 1)}
          onPageChange={setCurrentPage}
        />
      </div>

      {/* ── Confirm Delete Modal ── */}
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
            Delete Load?
          </h3>
          <p className="mb-6 text-sm text-gray-500">
            Are you sure you want to delete load{' '}
            <span className="font-semibold text-gray-900">
              {deleteTarget?.id}
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
              onClick={handleConfirmDelete}
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