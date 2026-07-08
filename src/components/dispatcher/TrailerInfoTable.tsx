// // import { DeleteIcon, Pencil, Plus, Search, Trash2 } from 'lucide-react';
// // import { useState } from 'react';
// // import TablePagination from './TablePagination';
// // import { EditOptionIcon, TrashBinIcon } from '@/src/icons';
// // import TrailerDetailsModal from './carrier/TrailerDetailsModal';
// // import { AddTrailerFormData } from '@/src/types/dispatcher/type';
// // import AddTrailerModal from './carrier/AddTrailerModal';
// // import AddTrailerSuccessModal from './carrier/AddTrailerSuccessModal';

// // export default function TrailerInfoTable() {
// //   const trailerRows = [
// //     {
// //       unitNumber: '423',
// //       carrier: 'Truck Inc',
// //       type: 'Cargo',
// //       vin: '1312423413',
// //       status: 'Active',
// //     },
// //     {
// //       unitNumber: '235',
// //       carrier: 'J Travel LLC',
// //       type: 'Dry Van',
// //       vin: '124456345',
// //       status: 'Active',
// //     },
// //     {
// //       unitNumber: '234',
// //       carrier: 'Logic LTD',
// //       type: 'Flatbed',
// //       vin: '-',
// //       status: 'Active',
// //     },
// //     {
// //       unitNumber: '567',
// //       carrier: 'Freight Solutions',
// //       type: 'Reefer',
// //       vin: '987654321',
// //       status: 'Active',
// //     },
// //     {
// //       unitNumber: '890',
// //       carrier: 'Rapid Transport Co.',
// //       type: 'Intermodal',
// //       vin: '1122334455',
// //       status: 'Inactive',
// //     },
// //     {
// //       unitNumber: '667',
// //       carrier: 'Freight Solutions',
// //       type: 'Reefer',
// //       vin: '987654321',
// //       status: 'Active',
// //     },
// //     {
// //       unitNumber: '3890',
// //       carrier: 'Rapid Transport Co.',
// //       type: 'Intermodal',
// //       vin: '1122334455',
// //       status: 'Inactive',
// //     },
// //     {
// //       unitNumber: '5890',
// //       carrier: 'Rapid Transport Co.',
// //       type: 'Intermodal',
// //       vin: '1122334455',
// //       status: 'Inactive',
// //     },
// //     {
// //       unitNumber: '6890',
// //       carrier: 'Rapid Transport Co.',
// //       type: 'Intermodal',
// //       vin: '1122334455',
// //       status: 'Inactive',
// //     },
// //   ];

// //   const [currentPage, setCurrentPage] = useState(1);
// //   const itemsPerPage = 5;

// //   const totalPages = Math.ceil(trailerRows.length / itemsPerPage);

// //   const startIndex = (currentPage - 1) * itemsPerPage;
// //   const currentData = trailerRows.slice(startIndex, startIndex + itemsPerPage);
// //   const [open, setOpen] = useState(false);

// //   const [isAddTrailerOpen, setIsAddTrailerOpen] = useState(false);
// //   const [isSuccessOpen, setIsSuccessOpen] = useState(false);

// //   const handleCreateTrailer = async (data: AddTrailerFormData) => {
// //     console.log('Trailer payload:', data);
// //   };

// //   return (
// //     <>
// //       <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
// //         <h2 className="text-[20px] font-semibold text-[#111827]">
// //           All Trailer
// //         </h2>

// //         <button
// //           onClick={() => setIsAddTrailerOpen(true)}
// //           className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-[#2F3E9E] px-4 text-sm font-medium text-white transition hover:opacity-95"
// //         >
// //           <Plus className="h-4 w-4" />
// //           Add Trailer
// //         </button>
// //       </div>

// //       <div className="mb-4">
// //         <div className="relative w-full">
// //           <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9CA3AF]" />
// //           <input
// //             type="text"
// //             placeholder="Search by name / MC No."
// //             className="h-11 w-full rounded-xl border border-[#E5E7EB] bg-white pl-11 pr-4 text-sm text-[#111827] outline-none placeholder:text-[#9CA3AF] focus:border-[#C7D2FE]"
// //           />
// //         </div>
// //       </div>
// //       <div className="overflow-x-auto">
// //         <table className="w-full border-separate border-spacing-0 text-sm">
// //           <thead>
// //             <tr className="text-left text-[16px] font-medium text-[#8B8FA3]">
// //               <th className="border-b border-[#EEF0F5] px-4 py-3">
// //                 Unit Number
// //               </th>
// //               <th className="border-b border-[#EEF0F5] px-4 py-3">Carrier</th>
// //               <th className="border-b border-[#EEF0F5] px-4 py-3">Type</th>
// //               <th className="border-b border-[#EEF0F5] px-4 py-3">VIN</th>
// //               <th className="border-b border-[#EEF0F5] px-4 py-3">Status</th>
// //               <th className="border-b border-[#EEF0F5] px-4 py-3">Action</th>
// //             </tr>
// //           </thead>

// //           <tbody>
// //             {currentData.map((row, index) => (
// //               <tr key={index} className="text-[16px] text-[#111827]">
// //                 <td className="border-b border-[#F3F4F6] px-4 py-4 font-medium text-[#4B5563]">
// //                   {row.unitNumber}
// //                 </td>

// //                 <td className="border-b border-[#F3F4F6] px-4 py-4 text-[#4B5563]">
// //                   {row.carrier}
// //                 </td>

// //                 <td className="border-b border-[#F3F4F6] px-4 py-4 text-[#4B5563]">
// //                   {row.type}
// //                 </td>

// //                 <td className="border-b border-[#F3F4F6] px-4 py-4 text-[#4B5563]">
// //                   {row.vin}
// //                 </td>

// //                 <td className="border-b border-[#F3F4F6] px-4 py-4">
// //                   <span
// //                     className={`inline-flex rounded-full px-2 py-[2px] text-[11px] font-medium ${
// //                       row.status === 'Active'
// //                         ? 'border border-[#7AD389] bg-[#EAFBF0] text-[#22A447]'
// //                         : 'border border-[#A7E3B4] bg-[#F1FFF5] text-[#4FAE68]'
// //                     }`}
// //                   >
// //                     {row.status}
// //                   </span>
// //                 </td>

// //                 <td className="border-b border-[#F3F4F6] px-4 py-4">
// //                   <div className="flex items-center gap-3">
// //                     <button
// //                       onClick={() => setOpen(true)}
// //                       className="inline-flex h-8 w-8 items-center justify-center rounded-md text-[#344054] transition hover:bg-[#F8FAFC]"
// //                     >
// //                       <EditOptionIcon />
// //                     </button>
// //                     <button className="inline-flex h-8 w-8 items-center justify-center rounded-md text-[#FF5A5F] transition hover:bg-[#FFF5F5]">
// //                       <TrashBinIcon />
// //                     </button>
// //                   </div>
// //                 </td>
// //               </tr>
// //             ))}
// //           </tbody>
// //         </table>
// //         <div className="flex flex-col gap-4 bg-white px-4 py-4 md:flex-row md:items-center md:justify-between">
// //           <p className="text-sm text-[#2C3342]">
// //             Showing {startIndex + 1} to{' '}
// //             {Math.min(startIndex + itemsPerPage, trailerRows.length)} of{' '}
// //             {trailerRows.length} results
// //           </p>
// //           <TablePagination
// //             currentPage={currentPage}
// //             totalPages={totalPages}
// //             onPageChange={setCurrentPage}
// //           />
// //         </div>
// //       </div>

// //       <TrailerDetailsModal
// //         isOpen={open}
// //         onClose={() => setOpen(false)}
// //         data={{
// //           carrier: 'Ronaldo',
// //           unitNumber: 'T06-45',
// //           plateNumber: '',
// //           type: 'Logic LTD',
// //           plateState: '',
// //         }}
// //         onSave={updatedData => {
// //           console.log('Updated trailer data:', updatedData);
// //         }}
// //       />

// //       <AddTrailerModal
// //         isOpen={isAddTrailerOpen}
// //         onClose={() => setIsAddTrailerOpen(false)}
// //         onSuccess={() => setIsSuccessOpen(true)}
// //         onSubmit={handleCreateTrailer}
// //       />

// //       <AddTrailerSuccessModal
// //         isOpen={isSuccessOpen}
// //         onClose={() => setIsSuccessOpen(false)}
// //       />
// //     </>
// //   );
// // }

// import { Plus, Search } from 'lucide-react';
// import { useState } from 'react';
// import TablePagination from './TablePagination';
// import { EditOptionIcon, TrashBinIcon } from '@/src/icons';
// import TrailerDetailsModal from './carrier/TrailerDetailsModal';
// import { AddTrailerFormData } from '@/src/types/dispatcher/type';
// import AddTrailerModal from './carrier/AddTrailerModal';
// import AddTrailerSuccessModal from './carrier/AddTrailerSuccessModal';
// import { Modal } from '../ui/modal';

// type TrailerRow = {
//   unitNumber: string;
//   carrier: string;
//   type: string;
//   vin: string;
//   status: string;
// };

// export default function TrailerInfoTable() {
//   const [trailerRows, setTrailerRows] = useState<TrailerRow[]>([
//     {
//       unitNumber: '423',
//       carrier: 'Truck Inc',
//       type: 'Cargo',
//       vin: '1312423413',
//       status: 'Active',
//     },
//     {
//       unitNumber: '235',
//       carrier: 'J Travel LLC',
//       type: 'Dry Van',
//       vin: '124456345',
//       status: 'Active',
//     },
//     {
//       unitNumber: '234',
//       carrier: 'Logic LTD',
//       type: 'Flatbed',
//       vin: '-',
//       status: 'Active',
//     },
//     {
//       unitNumber: '567',
//       carrier: 'Freight Solutions',
//       type: 'Reefer',
//       vin: '987654321',
//       status: 'Active',
//     },
//     {
//       unitNumber: '890',
//       carrier: 'Rapid Transport Co.',
//       type: 'Intermodal',
//       vin: '1122334455',
//       status: 'Inactive',
//     },
//     {
//       unitNumber: '667',
//       carrier: 'Freight Solutions',
//       type: 'Reefer',
//       vin: '987654321',
//       status: 'Active',
//     },
//     {
//       unitNumber: '3890',
//       carrier: 'Rapid Transport Co.',
//       type: 'Intermodal',
//       vin: '1122334455',
//       status: 'Inactive',
//     },
//     {
//       unitNumber: '5890',
//       carrier: 'Rapid Transport Co.',
//       type: 'Intermodal',
//       vin: '1122334455',
//       status: 'Inactive',
//     },
//     {
//       unitNumber: '6890',
//       carrier: 'Rapid Transport Co.',
//       type: 'Intermodal',
//       vin: '1122334455',
//       status: 'Inactive',
//     },
//   ]);

//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 5;
//   const totalPages = Math.ceil(trailerRows.length / itemsPerPage);
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const safePage = Math.min(currentPage, Math.max(totalPages, 1));
//   const currentData = trailerRows.slice(startIndex, startIndex + itemsPerPage);

//   const [open, setOpen] = useState(false);
//   const [selectedTrailer, setSelectedTrailer] = useState<TrailerRow | null>(
//     null,
//   );

//   // Delete confirm modal state
//   const [deleteTarget, setDeleteTarget] = useState<TrailerRow | null>(null);
//   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

//   const [isAddTrailerOpen, setIsAddTrailerOpen] = useState(false);
//   const [isSuccessOpen, setIsSuccessOpen] = useState(false);

//   const handleCreateTrailer = async (data: AddTrailerFormData) => {
//     console.log('Trailer payload:', data);
//   };

//   const openDeleteModal = (row: TrailerRow) => {
//     setDeleteTarget(row);
//     setIsDeleteModalOpen(true);
//   };

//   const handleConfirmDelete = () => {
//     if (!deleteTarget) return;
//     setTrailerRows(prev =>
//       prev.filter(r => r.unitNumber !== deleteTarget.unitNumber),
//     );
//     setIsDeleteModalOpen(false);
//     setDeleteTarget(null);
//   };

//   return (
//     <>
//       <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
//         <h2 className="text-[20px] font-semibold text-[#111827]">
//           All Trailer
//         </h2>
//         <button
//           onClick={() => setIsAddTrailerOpen(true)}
//           className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-[#2F3E9E] px-4 text-sm font-medium text-white transition hover:opacity-95"
//         >
//           <Plus className="h-4 w-4" />
//           Add Trailer
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
//               <th className="border-b border-[#EEF0F5] px-4 py-3">Type</th>
//               <th className="border-b border-[#EEF0F5] px-4 py-3">VIN</th>
//               <th className="border-b border-[#EEF0F5] px-4 py-3">Status</th>
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
//                   {row.type}
//                 </td>
//                 <td className="border-b border-[#F3F4F6] px-4 py-4 text-[#4B5563]">
//                   {row.vin}
//                 </td>
//                 <td className="border-b border-[#F3F4F6] px-4 py-4">
//                   <span
//                     className={`inline-flex rounded-full px-2 py-[2px] text-[11px] font-medium ${
//                       row.status === 'Active'
//                         ? 'border border-[#7AD389] bg-[#EAFBF0] text-[#22A447]'
//                         : 'border border-[#A7E3B4] bg-[#F1FFF5] text-[#4FAE68]'
//                     }`}
//                   >
//                     {row.status}
//                   </span>
//                 </td>
//                 <td className="border-b border-[#F3F4F6] px-4 py-4">
//                   <div className="flex items-center gap-3">
//                     <button
//                       onClick={() => {
//                         setSelectedTrailer(row);
//                         setOpen(true);
//                       }}
//                       className="inline-flex h-8 w-8 items-center justify-center rounded-md text-[#344054] transition hover:bg-[#F8FAFC]"
//                     >
//                       <EditOptionIcon />
//                     </button>
//                     <button
//                       onClick={() => openDeleteModal(row)}
//                       className="inline-flex h-8 w-8 items-center justify-center rounded-md text-[#FF5A5F] transition hover:bg-[#FFF5F5]"
//                     >
//                       <TrashBinIcon />
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         <div className="flex flex-col gap-4 bg-white px-4 py-4 md:flex-row md:items-center md:justify-between">
//           <p className="text-sm text-[#2C3342]">
//             Showing {trailerRows.length === 0 ? 0 : startIndex + 1} to{' '}
//             {Math.min(startIndex + itemsPerPage, trailerRows.length)} of{' '}
//             {trailerRows.length} results
//           </p>
//           <TablePagination
//             currentPage={safePage}
//             totalPages={Math.max(totalPages, 1)}
//             onPageChange={setCurrentPage}
//           />
//         </div>
//       </div>

//       {/* ── Confirm Delete Modal ── */}
//       <Modal
//         isOpen={isDeleteModalOpen}
//         onClose={() => setIsDeleteModalOpen(false)}
//         showCloseButton={false}
//         className="max-w-[420px]"
//       >
//         <div className="p-8 text-center">
//           {/* Icon */}
//           <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#FFF0F0]">
//             <TrashBinIcon />
//           </div>

//           <h3 className="mb-2 text-[18px] font-semibold text-[#111827]">
//             Delete Trailer?
//           </h3>
//           <p className="mb-6 text-sm text-[#6B7280]">
//             Are you sure you want to delete trailer{' '}
//             <span className="font-semibold text-[#111827]">
//               #{deleteTarget?.unitNumber}
//             </span>
//             ? This action cannot be undone.
//           </p>

//           <div className="flex gap-3">
//             <button
//               onClick={() => setIsDeleteModalOpen(false)}
//               className="h-11 w-full rounded-xl border border-[#E5E7EB] bg-[#F9FAFB] text-sm font-medium text-[#374151] transition hover:bg-gray-100"
//             >
//               Cancel
//             </button>
//             <button
//               onClick={handleConfirmDelete}
//               className="h-11 w-full rounded-xl bg-[#FF5A5F] text-sm font-medium text-white transition hover:opacity-90"
//             >
//               Yes, Delete
//             </button>
//           </div>
//         </div>
//       </Modal>

//       <TrailerDetailsModal
//         isOpen={open}
//         onClose={() => setOpen(false)}
//         data={{
//           carrier: selectedTrailer?.carrier ?? '',
//           unitNumber: selectedTrailer?.unitNumber ?? '',
//           plateNumber: '',
//           type: selectedTrailer?.type ?? '',
//           plateState: '',
//         }}
//         onSave={updatedData => {
//           console.log('Updated trailer data:', updatedData);
//         }}
//       />

//       <AddTrailerModal
//         isOpen={isAddTrailerOpen}
//         onClose={() => setIsAddTrailerOpen(false)}
//         onSuccess={() => setIsSuccessOpen(true)}
//         onSubmit={handleCreateTrailer}
//       />

//       <AddTrailerSuccessModal
//         isOpen={isSuccessOpen}
//         onClose={() => setIsSuccessOpen(false)}
//       />
//     </>
//   );
// }

import { Plus, Search } from 'lucide-react';
import { useState } from 'react';

import TablePagination from './TablePagination';
import { EditOptionIcon, TrashBinIcon } from '@/src/icons';
import TrailerDetailsModal from './carrier/TrailerDetailsModal';
import AddTrailerModal from './carrier/AddTrailerModal';
import AddTrailerSuccessModal from './carrier/AddTrailerSuccessModal';
import { Modal } from '../ui/modal';
import { AddTrailerFormData } from '@/src/types/dispatcher/type';
import ReusableTable from '../tables/ReusableTable';

type TrailerRow = {
  id: string;
  unitNumber: string;
  carrier: string;
  type: string;
  vin: string;
  status: string;
};

const TABLE_HEADERS = [
  'Unit Number',
  'Carrier',
  'Type',
  'VIN',
  'Status',
  'Action',
];
const ITEMS_PER_PAGE = 5;

const INITIAL_TRAILERS: TrailerRow[] = [
  {
    id: '1',
    unitNumber: '423',
    carrier: 'Truck Inc',
    type: 'Cargo',
    vin: '1312423413',
    status: 'Active',
  },
  {
    id: '2',
    unitNumber: '235',
    carrier: 'J Travel LLC',
    type: 'Dry Van',
    vin: '124456345',
    status: 'Active',
  },
  {
    id: '3',
    unitNumber: '234',
    carrier: 'Logic LTD',
    type: 'Flatbed',
    vin: '-',
    status: 'Active',
  },
  {
    id: '4',
    unitNumber: '567',
    carrier: 'Freight Solutions',
    type: 'Reefer',
    vin: '987654321',
    status: 'Active',
  },
  {
    id: '5',
    unitNumber: '890',
    carrier: 'Rapid Transport Co.',
    type: 'Intermodal',
    vin: '1122334455',
    status: 'Inactive',
  },
  {
    id: '6',
    unitNumber: '667',
    carrier: 'Freight Solutions',
    type: 'Reefer',
    vin: '987654321',
    status: 'Active',
  },
  {
    id: '7',
    unitNumber: '3890',
    carrier: 'Rapid Transport Co.',
    type: 'Intermodal',
    vin: '1122334455',
    status: 'Inactive',
  },
  {
    id: '8',
    unitNumber: '5890',
    carrier: 'Rapid Transport Co.',
    type: 'Intermodal',
    vin: '1122334455',
    status: 'Inactive',
  },
  {
    id: '9',
    unitNumber: '6890',
    carrier: 'Rapid Transport Co.',
    type: 'Intermodal',
    vin: '1122334455',
    status: 'Inactive',
  },
];

export default function TrailerInfoTable() {
  const [trailerRows, setTrailerRows] =
    useState<TrailerRow[]>(INITIAL_TRAILERS);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const [selectedTrailer, setSelectedTrailer] = useState<TrailerRow | null>(
    null,
  );
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const [deleteTarget, setDeleteTarget] = useState<TrailerRow | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [isAddTrailerOpen, setIsAddTrailerOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);

  // Filter rows by search query
  const filteredRows = trailerRows.filter(
    row =>
      row.unitNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.carrier.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.type.toLowerCase().includes(searchQuery.toLowerCase()),
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

  const handleCreateTrailer = async (data: AddTrailerFormData) => {
    console.log('Trailer payload:', data);
  };

  const handleConfirmDelete = () => {
    if (!deleteTarget) return;
    setTrailerRows(prev => prev.filter(r => r.id !== deleteTarget.id));
    setIsDeleteModalOpen(false);
    setDeleteTarget(null);
  };

  // ── Row renderers ────────────────────────────────────────────
  const rowRenderers = [
    // Unit Number
    (row: TrailerRow) => (
      <span className="font-medium text-[#4B5563]">{row.unitNumber}</span>
    ),

    // Carrier
    (row: TrailerRow) => <span className="text-[#4B5563]">{row.carrier}</span>,

    // Type
    (row: TrailerRow) => <span className="text-[#4B5563]">{row.type}</span>,

    // VIN
    (row: TrailerRow) => <span className="text-[#4B5563]">{row.vin}</span>,

    // Status badge
    (row: TrailerRow) => (
      <span
        className={`inline-flex rounded-full px-2 py-[2px] text-[11px] font-medium ${
          row.status === 'Active'
            ? 'border border-[#7AD389] bg-[#EAFBF0] text-[#22A447]'
            : 'border border-[#FCA5A5] bg-[#FEF2F2] text-[#DC2626]'
        }`}
      >
        {row.status}
      </span>
    ),

    // Action buttons (edit + delete)
    (row: TrailerRow) => (
      <div className="flex items-center gap-3">
        <button
          onClick={e => {
            e.stopPropagation();
            setSelectedTrailer(row);
            setIsDetailOpen(true);
          }}
          className="inline-flex h-8 w-8 items-center justify-center rounded-md text-[#344054] transition hover:bg-[#F8FAFC]"
        >
          <EditOptionIcon />
        </button>
        <button
          onClick={e => {
            e.stopPropagation();
            setDeleteTarget(row);
            setIsDeleteModalOpen(true);
          }}
          className="inline-flex h-8 w-8 items-center justify-center rounded-md text-[#FF5A5F] transition hover:bg-[#FFF5F5]"
        >
          <TrashBinIcon />
        </button>
      </div>
    ),
  ];

  return (
    <>
      {/* Header */}
      <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <h2 className="text-[20px] font-semibold text-[#111827]">
          All Trailers
        </h2>
        <button
          onClick={() => setIsAddTrailerOpen(true)}
          className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-[#2F3E9E] px-4 text-sm font-medium text-white transition hover:opacity-95"
        >
          <Plus className="h-4 w-4" />
          Add Trailer
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
            placeholder="Search by unit / carrier / type"
            className="h-11 w-full rounded-xl border border-[#E5E7EB] bg-white pl-11 pr-4 text-sm text-[#111827] outline-none placeholder:text-[#9CA3AF] focus:border-[#C7D2FE]"
          />
        </div>
      </div>

      {/* Table + Pagination unified card */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <ReusableTable<TrailerRow>
          tableHeader={TABLE_HEADERS}
          items={currentData}
          rowRenderers={rowRenderers}
          getRowKey={row => row.id}
          minTableWidthPx={800}
          emptyText="No trailers found"
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

      {/* Confirm Delete Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        showCloseButton={false}
        className="max-w-[420px]"
      >
        <div className="p-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#FFF0F0]">
            <TrashBinIcon />
          </div>
          <h3 className="mb-2 text-[18px] font-semibold text-[#111827]">
            Delete Trailer?
          </h3>
          <p className="mb-6 text-sm text-[#6B7280]">
            Are you sure you want to delete trailer{' '}
            <span className="font-semibold text-[#111827]">
              #{deleteTarget?.unitNumber}
            </span>
            ? This action cannot be undone.
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => setIsDeleteModalOpen(false)}
              className="h-11 w-full rounded-xl border border-[#E5E7EB] bg-[#F9FAFB] text-sm font-medium text-[#374151] transition hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirmDelete}
              className="h-11 w-full rounded-xl bg-[#FF5A5F] text-sm font-medium text-white transition hover:opacity-90"
            >
              Yes, Delete
            </button>
          </div>
        </div>
      </Modal>

      {/* Detail / Edit Modal — only mounts when a trailer is selected */}
      {selectedTrailer && (
        <TrailerDetailsModal
          isOpen={isDetailOpen}
          onClose={() => {
            setIsDetailOpen(false);
            setSelectedTrailer(null);
          }}
          data={{
            carrier: selectedTrailer.carrier,
            unitNumber: selectedTrailer.unitNumber,
            plateNumber: '',
            type: selectedTrailer.type,
            plateState: '',
          }}
          onSave={updatedData => {
            console.log('Updated trailer data:', updatedData);
          }}
        />
      )}

      <AddTrailerModal
        isOpen={isAddTrailerOpen}
        onClose={() => setIsAddTrailerOpen(false)}
        onSuccess={() => setIsSuccessOpen(true)}
        onSubmit={handleCreateTrailer}
      />

      <AddTrailerSuccessModal
        isOpen={isSuccessOpen}
        onClose={() => setIsSuccessOpen(false)}
      />
    </>
  );
}