'use client';
import { useState, useMemo } from 'react';
import {
  Search,
  ChevronLeft,
  ChevronRight,
 
} from 'lucide-react';
import { DownCaretIcon, PickUpIcon } from '@/src/icons';

type LoadStatus = 'Pickup' | 'Delivered';

type Load = {
  id: string;
  date: string;
  pickupAddr: string;
  delivAddr: string;
  miles: number;
  pay: number;
  status: LoadStatus;
};

const loadsData: Load[] = [
  {
    id: 'RX-2847',
    date: '07/25/2025 at 3:20 PM',
    pickupAddr: '2201 Airway Blvd, TN 3398',
    delivAddr: '3900 rd, Atlanta, GA 30380',
    miles: 247,
    pay: 880,
    status: 'Pickup',
  },
  {
    id: 'RX-2847',
    date: '07/28/2025 at 3:20 PM',
    pickupAddr: '2201 Airway Blvd, TN 3398',
    delivAddr: '3900 rd, Atlanta, GA 30380',
    miles: 247,
    pay: 880,
    status: 'Pickup',
  },
  {
    id: 'RX-2847',
    date: '07/31/2026 at 3:20 PM',
    pickupAddr: '2201 Airway Blvd, TN 3398',
    delivAddr: '3900 rd, Atlanta, GA 30380',
    miles: 247,
    pay: 880,
    status: 'Delivered',
  },
  {
    id: 'RX-1920',
    date: '08/02/2026 at 1:00 PM',
    pickupAddr: '500 Commerce St, Dallas TX',
    delivAddr: '1200 Peach St, Atlanta GA',
    miles: 920,
    pay: 1250,
    status: 'Pickup',
  },
  {
    id: 'RX-3301',
    date: '08/05/2026 at 9:00 AM',
    pickupAddr: '77 Freight Ave, Memphis TN',
    delivAddr: '88 Harbor Dr, Savannah GA',
    miles: 512,
    pay: 760,
    status: 'Delivered',
  },
];

const PAGE_SIZE = 3;

const badgeClass: Record<LoadStatus, string> = {
  Delivered: 'border-green-200 bg-green-50 text-green-700',
  Pickup: 'border-[#C48600] bg-[#EFD739]/20 text-[#C48600]',
};

export function ActiveLoads() {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<'All' | LoadStatus>('All');
  const [sort, setSort] = useState<'Newest' | 'Oldest'>('Newest');
  const [page, setPage] = useState(1);

  const [openSort, setOpenSort] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const filtered = useMemo(() => {
    let d = [...loadsData];

    if (query.trim()) {
      d = d.filter(l => l.id.toLowerCase().includes(query.toLowerCase()));
    }

    if (filter !== 'All') {
      d = d.filter(l => l.status === filter);
    }

    d.sort((a, b) =>
      sort === 'Newest'
        ? new Date(b.date).getTime() - new Date(a.date).getTime()
        : new Date(a.date).getTime() - new Date(b.date).getTime(),
    );

    return d;
  }, [query, filter, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const cp = Math.min(page, totalPages);
  const items = filtered.slice((cp - 1) * PAGE_SIZE, cp * PAGE_SIZE);

  const start = filtered.length === 0 ? 0 : (cp - 1) * PAGE_SIZE + 1;
  const end = Math.min(cp * PAGE_SIZE, filtered.length);

  return (
    <>
      <div className="overflow-hidden rounded-2xl  bg-white">
        {/* header */}
        <div className=" border-[#f1f3f9] p-4">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#98A2B3]" />
            <input
              type="text"
              placeholder="Search by Id"
              value={searchTerm}
              onChange={e => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="h-11 w-full rounded-xl border border-[#E5E7EB] bg-white pl-11 pr-4 text-sm text-[#111827] outline-none placeholder:text-[#9CA3AF] focus:border-[#C7D2FE]"
            />
          </div>
        </div>

        {/* list */}
        {items.map((load, i) => (
          <div
            key={i}
            className="rounded-xl border border-[#E5E7EB] bg-[#F9FAFB] p-4 mx-4 mb-3 "
          >
            {/* top */}
            <div className="flex items-start justify-between">
              <div>
                <h4 className="font-semibold text-[#111827] text-sm">
                  {load.id}
                </h4>
                <p className="text-xs text-[#9CA3AF]">Date: {load.date}</p>
              </div>

              <span
                className={`rounded-full border px-2.5 py-1 text-sm font-medium ${badgeClass[load.status]}`}
              >
                {load.status}
              </span>
            </div>

            {/* route section */}
            <div className="mt-4 flex items-center">
              {/* icon */}
              <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-white border">
                <PickUpIcon />
              </div>

              {/* pickup */}
              <div className="flex gap-4 justify-start mb-4">
                <div className="flex-1 border-r pr-4">
                  <p className="text-sm font-medium text-[#111827]">Pickup</p>
                  <p className="text-xs text-[#6B7280]">{load.pickupAddr}</p>
                </div>

                {/* delivery */}
                <div className="flex-1 pl-4 px-4">
                  <p className="text-sm font-medium text-[#111827]">Delivery</p>
                  <p className="text-xs text-[#6B7280] flex-1">
                    {load.delivAddr}
                  </p>
                </div>
              </div>
            </div>
            <hr />

            {/* bottom */}
            <div className="mt-4 flex items-center gap-2 text-xs text-[#374151] font-medium">
              <span>{load.miles} Miles</span>
              <span className="h-1 w-1 rounded-full bg-gray-300"></span>
              <span>${load.pay} Pay</span>
            </div>
          </div>
        ))}

        {/* pagination */}
        <div className="flex items-center justify-between border-t px-5 py-3">
          <p className="text-xs text-[#6b7280]">
            Showing {start} to {end} of {filtered.length} results
          </p>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              className="flex h-8 w-8 items-center justify-center rounded-lg border"
            >
              <ChevronLeft size={14} />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
              <button
                key={n}
                onClick={() => setPage(n)}
                className={`h-8 min-w-[32px] rounded-lg border ${
                  n === cp ? 'bg-[#2E3A83] text-white' : ''
                }`}
              >
                {n}
              </button>
            ))}

            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              className="flex h-8 w-8 items-center justify-center rounded-lg border"
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
