// import { MoreHorizontal, Plus, Search } from 'lucide-react';
// import { useState } from 'react';
// import TablePagination from './TablePagination';
// import TruckDetailsModal from './TruckDetailsModal';
// import AddTruckSuccessModal from './carrier/AddTruckSuccessModal';
// import { AddTruckFormData } from '@/src/types/dispatcher/type';
// import AddTruckModal from './carrier/AddTruckModal';

// export default function TruckInfoTable() {
//   const truckRows = [
//     {
//       unitNumber: '32',
//       carrier: 'Truck Inc',
//       makeModel: 'Ford',
//       vin: '1312423413',
//       unitLabel: '101 or T-45',
//     },
//     {
//       unitNumber: '33',
//       carrier: 'J Travel LLC',
//       makeModel: 'Volvo',
//       vin: '124456345',
//       unitLabel: '101 or T-46',
//     },
//     {
//       unitNumber: '34',
//       carrier: 'Logic LTD',
//       makeModel: 'Scania',
//       vin: '-',
//       unitLabel: '101 or T-47',
//     },
//     {
//       unitNumber: '35',
//       carrier: 'Global Movers',
//       makeModel: 'Mercedes',
//       vin: '5678901234',
//       unitLabel: '101 or T-48',
//     },
//     {
//       unitNumber: '36',
//       carrier: 'Eco Transport',
//       makeModel: 'Iveco',
//       vin: '7890123456',
//       unitLabel: '101 or T-49',
//     },
//   ];

//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 5;

//   const totalPages = Math.ceil(truckRows.length / itemsPerPage);

//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const currentData = truckRows.slice(startIndex, startIndex + itemsPerPage);
//   const [open, setOpen] = useState(false);

//   const [isAddTruckOpen, setIsAddTruckOpen] = useState(false);
//   const [isSuccessOpen, setIsSuccessOpen] = useState(false);
//   const handleCreateTruck = async (data: AddTruckFormData) => {
//     console.log('Truck payload:', data);

//   };
//   return (
//     <>
//       <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
//         <h2 className="text-[20px] font-semibold text-[#111827]">All Truck</h2>

//         <button
//           onClick={() => setIsAddTruckOpen(true)}
//           className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-[#2F3E9E] px-4 text-sm font-medium text-white transition hover:opacity-95"
//         >
//           <Plus className="h-4 w-4" />
//           Add Truck
//         </button>
//       </div>

//       <div className="mb-4">
//         <div className="relative w-full">
//           <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9CA3AF]" />
//           <input
//             type="text"
//             placeholder="Search by name / MC No."
//             className="h-11 w-full rounded-xl border border-[#E5E7EB] bg-white pl-11 pr-4 text-sm text-[#111827] outline-none placeholder:text-[#9CA3AF] focus:border-[#C7D2FE]"
//           />
//         </div>
//       </div>
//       <div className="overflow-x-auto">
//         <table className="w-full border-separate border-spacing-0 text-sm">
//           <thead>
//             <tr className="text-left text-[16px] font-medium text-[#8B8FA3]">
//               <th className="border-b border-[#EEF0F5] px-4 py-3">
//                 Unit Number
//               </th>
//               <th className="border-b border-[#EEF0F5] px-4 py-3">Carrier</th>
//               <th className="border-b border-[#EEF0F5] px-4 py-3">
//                 Make/Model
//               </th>
//               <th className="border-b border-[#EEF0F5] px-4 py-3">VIN</th>
//               <th className="border-b border-[#EEF0F5] px-4 py-3">
//                 Unit Number
//               </th>
//               <th className="border-b border-[#EEF0F5] px-4 py-3">Action</th>
//             </tr>
//           </thead>

//           <tbody>
//             {currentData.map((row, index) => (
//               <tr key={index} className="text-[16px] text-[#111827]">
//                 <td className="border-b border-[#F3F4F6] px-4 py-4 font-medium text-[#4B5563]">
//                   {row.unitNumber}
//                 </td>

//                 <td className="border-b border-[#F3F4F6] px-4 py-4 text-[#4B5563]">
//                   {row.carrier}
//                 </td>

//                 <td className="border-b border-[#F3F4F6] px-4 py-4 text-[#4B5563]">
//                   {row.makeModel}
//                 </td>

//                 <td className="border-b border-[#F3F4F6] px-4 py-4 text-[#4B5563]">
//                   {row.vin}
//                 </td>

//                 <td className="border-b border-[#F3F4F6] px-4 py-4 text-[#4B5563]">
//                   {row.unitLabel}
//                 </td>

//                 <td className="border-b border-[#F3F4F6] px-4 py-4">
//                   <button
//                     onClick={() => setOpen(true)}
//                     className="inline-flex h-8 w-8 items-center justify-center rounded-md text-[#6B7280] transition hover:bg-[#F8FAFC]"
//                   >
//                     <MoreHorizontal className="h-4 w-4" />
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//         <div className="flex flex-col gap-4 bg-white px-4 py-4 md:flex-row md:items-center md:justify-between">
//           <p className="text-sm text-[#2C3342]">
//             Showing {startIndex + 1} to{' '}
//             {Math.min(startIndex + itemsPerPage, truckRows.length)} of{' '}
//             {truckRows.length} results
//           </p>
//           <TablePagination
//             currentPage={currentPage}
//             totalPages={totalPages}
//             onPageChange={setCurrentPage}
//           />
//         </div>
//       </div>

//       <TruckDetailsModal
//         isOpen={open}
//         onClose={() => setOpen(false)}
//         data={{
//           carrier: 'Ronaldo',
//           unitNumber: '101 or T-45',
//           truckType: 'Logic LTD',
//           modalMake: '+32 23234',
//           licensePlate: '',
//           vin: '',
//         }}
//         onEdit={field => {
//           console.log('Edit clicked:', field);
//         }}
//       />

//       <AddTruckModal
//         isOpen={isAddTruckOpen}
//         onClose={() => setIsAddTruckOpen(false)}
//         onSuccess={() => setIsSuccessOpen(true)}
//         onSubmit={handleCreateTruck}
//       />

//       <AddTruckSuccessModal
//         isOpen={isSuccessOpen}
//         onClose={() => setIsSuccessOpen(false)}
//       />
//     </>
//   );
// }

import { MoreHorizontal, Plus, Search } from 'lucide-react';
import { useState } from 'react';

import TablePagination from './TablePagination';
import TruckDetailsModal from './TruckDetailsModal';
import AddTruckSuccessModal from './carrier/AddTruckSuccessModal';
import AddTruckModal from './carrier/AddTruckModal';
import { AddTruckFormData } from '@/src/types/dispatcher/type';
import ReusableTable from '../tables/ReusableTable';

type TruckRow = {
  id: string;
  unitNumber: string;
  carrier: string;
  makeModel: string;
  vin: string;
  unitLabel: string;
};

const TABLE_HEADERS = [
  'Unit Number',
  'Carrier',
  'Make/Model',
  'VIN',
  'Unit Label',
  'Action',
];
const ITEMS_PER_PAGE = 5;

const INITIAL_TRUCKS: TruckRow[] = [
  {
    id: '1',
    unitNumber: '32',
    carrier: 'Truck Inc',
    makeModel: 'Ford',
    vin: '1312423413',
    unitLabel: '101 or T-45',
  },
  {
    id: '2',
    unitNumber: '33',
    carrier: 'J Travel LLC',
    makeModel: 'Volvo',
    vin: '124456345',
    unitLabel: '101 or T-46',
  },
  {
    id: '3',
    unitNumber: '34',
    carrier: 'Logic LTD',
    makeModel: 'Scania',
    vin: '-',
    unitLabel: '101 or T-47',
  },
  {
    id: '4',
    unitNumber: '35',
    carrier: 'Global Movers',
    makeModel: 'Mercedes',
    vin: '5678901234',
    unitLabel: '101 or T-48',
  },
  {
    id: '5',
    unitNumber: '36',
    carrier: 'Eco Transport',
    makeModel: 'Iveco',
    vin: '7890123456',
    unitLabel: '101 or T-49',
  },
];

export default function TruckInfoTable() {
  const [truckRows, setTruckRows] = useState<TruckRow[]>(INITIAL_TRUCKS);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTruck, setSelectedTruck] = useState<TruckRow | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isAddTruckOpen, setIsAddTruckOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);

  // Filter by search query
  const filteredRows = truckRows.filter(
    row =>
      row.carrier.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.unitNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.makeModel.toLowerCase().includes(searchQuery.toLowerCase()),
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

  const handleOpenDetail = (row: TruckRow) => {
    setSelectedTruck(row);
    setIsDetailOpen(true);
  };

  const handleCreateTruck = async (data: AddTruckFormData) => {
    console.log('Truck payload:', data);
    // TODO: push new truck into truckRows after API call
  };

  // ── Row renderers ────────────────────────────────────────────
  const rowRenderers = [
    // Unit Number
    (row: TruckRow) => (
      <span className="font-medium text-[#4B5563]">{row.unitNumber}</span>
    ),

    // Carrier
    (row: TruckRow) => <span className="text-[#4B5563]">{row.carrier}</span>,

    // Make/Model
    (row: TruckRow) => <span className="text-[#4B5563]">{row.makeModel}</span>,

    // VIN
    (row: TruckRow) => <span className="text-[#4B5563]">{row.vin}</span>,

    // Unit Label
    (row: TruckRow) => <span className="text-[#4B5563]">{row.unitLabel}</span>,

    // Action button
    (row: TruckRow) => (
      <button
        onClick={e => {
          e.stopPropagation();
          handleOpenDetail(row);
        }}
        className="inline-flex h-8 w-8 items-center justify-center rounded-md text-[#6B7280] transition hover:bg-[#F8FAFC]"
      >
        <MoreHorizontal className="h-4 w-4" />
      </button>
    ),
  ];

  return (
    <>
      {/* Header */}
      <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <h2 className="text-[20px] font-semibold text-[#111827]">All Trucks</h2>
        <button
          onClick={() => setIsAddTruckOpen(true)}
          className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-[#2F3E9E] px-4 text-sm font-medium text-white transition hover:opacity-95"
        >
          <Plus className="h-4 w-4" />
          Add Truck
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
              setCurrentPage(1);
            }}
            placeholder="Search by carrier / unit / model"
            className="h-11 w-full rounded-xl border border-[#E5E7EB] bg-white pl-11 pr-4 text-sm text-[#111827] outline-none placeholder:text-[#9CA3AF] focus:border-[#C7D2FE]"
          />
        </div>
      </div>

      {/* Table + Pagination unified card */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <ReusableTable<TruckRow>
          tableHeader={TABLE_HEADERS}
          items={currentData}
          rowRenderers={rowRenderers}
          getRowKey={row => row.id}
          minTableWidthPx={800}
          emptyText="No trucks found"
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

      {/* Detail Modal — only rendered when a truck is selected */}
      {selectedTruck && (
        <TruckDetailsModal
          isOpen={isDetailOpen}
          onClose={() => {
            setIsDetailOpen(false);
            setSelectedTruck(null);
          }}
          data={{
            carrier: selectedTruck.carrier,
            unitNumber: selectedTruck.unitLabel,
            truckType: selectedTruck.makeModel,
            modalMake: selectedTruck.makeModel,
            licensePlate: '',
            vin: selectedTruck.vin,
          }}
          onEdit={field => {
            console.log('Edit clicked:', field);
          }}
        />
      )}

      <AddTruckModal
        isOpen={isAddTruckOpen}
        onClose={() => setIsAddTruckOpen(false)}
        onSuccess={() => setIsSuccessOpen(true)}
        onSubmit={handleCreateTruck}
      />

      <AddTruckSuccessModal
        isOpen={isSuccessOpen}
        onClose={() => setIsSuccessOpen(false)}
      />
    </>
  );
}