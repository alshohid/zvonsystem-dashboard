// 'use client';

// import { Eye } from 'lucide-react';
// import SearchInput from './SearchInput';
// import TablePagination from './TablePagination';
// import { useState } from 'react';

// const carriers = [
//   {
//     initials: 'JM',
//     name: 'Truck Inc',
//     code: 'RX-2847',
//     mc: '24234',
//     loads: 30,
//     revenue: '$6700',
//     miles: 234,
//   },
//   {
//     initials: 'JM',
//     name: 'RoadRush LTD',
//     code: 'RX-2847',
//     mc: '12331',
//     loads: 22,
//     revenue: '$5600',
//     miles: 200,
//   },
//   {
//     initials: 'JM',
//     name: 'Truck Inc',
//     code: 'RX-2847',
//     mc: '24234',
//     loads: 30,
//     revenue: '$6700',
//     miles: 234,
//   },
//   {
//     initials: 'JM',
//     name: 'RoadRush LTD',
//     code: 'RX-2847',
//     mc: '12331',
//     loads: 22,
//     revenue: '$5600',
//     miles: 200,
//   },
//   {
//     initials: 'JM',
//     name: 'Truck Inc',
//     code: 'RX-2847',
//     mc: '24234',
//     loads: 30,
//     revenue: '$6700',
//     miles: 234,
//   },
//   {
//     initials: 'JM',
//     name: 'RoadRush LTD',
//     code: 'RX-2847',
//     mc: '12331',
//     loads: 22,
//     revenue: '$5600',
//     miles: 200,
//   },
//   {
//     initials: 'JM',
//     name: 'Truck Inc',
//     code: 'RX-2847',
//     mc: '24234',
//     loads: 30,
//     revenue: '$6700',
//     miles: 234,
//   },
//   {
//     initials: 'JM',
//     name: 'RoadRush LTD',
//     code: 'RX-2847',
//     mc: '12331',
//     loads: 22,
//     revenue: '$5600',
//     miles: 200,
//   },
//   {
//     initials: 'JM',
//     name: 'J Travel LLC',
//     code: 'RX-2847',
//     mc: '42353',
//     loads: 18,
//     revenue: '$4380',
//     miles: 170,
//   },
//   {
//     initials: 'JM',
//     name: 'Logic LTD',
//     code: 'RX-2847',
//     mc: '85532',
//     loads: 15,
//     revenue: '$3250',
//     miles: 109,
//   },
// ];

// export default function CarrierReportTable() {
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 5; // Set to 2 to see it in action with your mock data

//   const totalPages = Math.ceil(carriers.length / itemsPerPage);

//   // Calculate the slice of data to display
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const currentData = carriers.slice(startIndex, startIndex + itemsPerPage);

//   return (
//     <section className="rounded-2xl border border-[#E6EAF2] bg-white p-4 md:p-5">
//       <h3 className="text-[18px] font-semibold text-[#1F2430] mb-4">
//         All Carrier’s Report
//       </h3>

//       <div className="mb-4">
//         <SearchInput placeholder="Search by name / MC No." />
//       </div>

//       <div className="overflow-x-auto rounded-xl border border-[#E6EAF2]">
//         <table className="min-w-full">
//           <thead className="bg-[#F3F5F9]">
//             <tr className="text-left text-sm text-[#75809A]">
//               <th className="px-4 py-4 font-medium">Carriers</th>
//               <th className="px-4 py-4 font-medium">MC No.</th>
//               <th className="px-4 py-4 font-medium">Loads</th>
//               <th className="px-4 py-4 font-medium">Revenue</th>
//               <th className="px-4 py-4 font-medium">Miles</th>
//               <th className="px-4 py-4 text-right"></th>
//             </tr>
//           </thead>

//           <tbody>
//             {currentData.map((item, index) => (
//               <tr
//                 key={index}
//                 className="border-t border-[#E9EDF5] text-sm text-[#1F2430]"
//               >

//                 <td className="px-4 py-4">
//                   <div className="flex items-center gap-3">
//                     <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#EEEEF1] text-[11px] font-semibold text-[#4B4B4B]">
//                       {item.initials}
//                     </div>
//                     <div>
//                       <p className="font-medium">{item.name}</p>
//                       <p className="text-xs text-[#8A94A6]">{item.code}</p>
//                     </div>
//                   </div>
//                 </td>
//                 <td className="px-4 py-4">{item.mc}</td>
//                 <td className="px-4 py-4">{item.loads}</td>
//                 <td className="px-4 py-4">{item.revenue}</td>
//                 <td className="px-4 py-4">{item.miles}</td>
//                 <td className="px-4 py-4 text-right">
//                   <button className="text-[#49526A]">
//                     <Eye size={17} />
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between px-4 py-4 bg-white">
//           <p className="text-sm text-[#2C3342]">
//             Showing {" "} {startIndex + 1}{" "} to {" "}
//             {Math.min(startIndex + itemsPerPage, carriers.length)}{" "} of {" "}
//             {carriers.length} {" "} results
//           </p>
//           <TablePagination
//             currentPage={currentPage}
//             totalPages={totalPages}
//             onPageChange={setCurrentPage}
//           />
//         </div>
//       </div>
//     </section>
//   );
// }

'use client';

import { Eye } from 'lucide-react';
import { useState } from 'react';
import SearchInput from './SearchInput';
import TablePagination from './TablePagination';
import CarrierReportDetailsModal from './CarrierReportDetailsModal';
import { useModal } from '@/src/hooks/useModal';


interface CarrierItem {
  id: string;
  initials: string;
  name: string;
  code: string;
  mc: string;
  loads: number;
  revenue: string;
  miles: number;
}

interface CarrierDetailsData {
  totalLoads: number;
  totalRevenue: string;
  totalMiles: number;
  avgRatePerLoad: string;
  avgRatePerMile: string;
  drivers: {
    id: string;
    initials: string;
    name: string;
    loads: number;
    revenue: string;
    miles: number;
    ratePerMile: string;
  }[];
  trucks: {
    id: string;
    truckNo: string;
    loads: number;
    miles: number;
  }[];
}

const carriers: CarrierItem[] = [
  {
    id: '1',
    initials: 'JM',
    name: 'Truck Inc',
    code: 'RX-2847',
    mc: '24234',
    loads: 30,
    revenue: '$6700',
    miles: 234,
  },
  {
    id: '2',
    initials: 'JM',
    name: 'RoadRush LTD',
    code: 'RX-2847',
    mc: '12331',
    loads: 22,
    revenue: '$5600',
    miles: 200,
  },
  {
    id: '3',
    initials: 'JM',
    name: 'Truck Inc',
    code: 'RX-2847',
    mc: '24234',
    loads: 30,
    revenue: '$6700',
    miles: 234,
  },
  {
    id: '4',
    initials: 'JM',
    name: 'RoadRush LTD',
    code: 'RX-2847',
    mc: '12331',
    loads: 22,
    revenue: '$5600',
    miles: 200,
  },
  {
    id: '3',
    initials: 'JM',
    name: 'Truck Inc',
    code: 'RX-2847',
    mc: '24234',
    loads: 30,
    revenue: '$6700',
    miles: 234,
  },
  {
    id: '4',
    initials: 'JM',
    name: 'RoadRush LTD',
    code: 'RX-2847',
    mc: '12331',
    loads: 22,
    revenue: '$5600',
    miles: 200,
  },
  {
    id: '3',
    initials: 'JM',
    name: 'Truck Inc',
    code: 'RX-2847',
    mc: '24234',
    loads: 30,
    revenue: '$6700',
    miles: 234,
  },
  {
    id: '4',
    initials: 'JM',
    name: 'RoadRush LTD',
    code: 'RX-2847',
    mc: '12331',
    loads: 22,
    revenue: '$5600',
    miles: 200,
  },
  {
    id: '3',
    initials: 'JM',
    name: 'Truck Inc',
    code: 'RX-2847',
    mc: '24234',
    loads: 30,
    revenue: '$6700',
    miles: 234,
  },
  {
    id: '4',
    initials: 'JM',
    name: 'RoadRush LTD',
    code: 'RX-2847',
    mc: '12331',
    loads: 22,
    revenue: '$5600',
    miles: 200,
  },
  {
    id: '5',
    initials: 'JM',
    name: 'Truck Inc',
    code: 'RX-2847',
    mc: '24234',
    loads: 30,
    revenue: '$6700',
    miles: 234,
  },
  {
    id: '6',
    initials: 'JM',
    name: 'RoadRush LTD',
    code: 'RX-2847',
    mc: '12331',
    loads: 22,
    revenue: '$5600',
    miles: 200,
  },
  {
    id: '7',
    initials: 'JM',
    name: 'Truck Inc',
    code: 'RX-2847',
    mc: '24234',
    loads: 30,
    revenue: '$6700',
    miles: 234,
  },
  {
    id: '8',
    initials: 'JM',
    name: 'RoadRush LTD',
    code: 'RX-2847',
    mc: '12331',
    loads: 22,
    revenue: '$5600',
    miles: 200,
  },
  {
    id: '9',
    initials: 'JM',
    name: 'J Travel LLC',
    code: 'RX-2847',
    mc: '42353',
    loads: 18,
    revenue: '$4380',
    miles: 170,
  },
  {
    id: '10',
    initials: 'JM',
    name: 'Logic LTD',
    code: 'RX-2847',
    mc: '85532',
    loads: 15,
    revenue: '$3250',
    miles: 109,
  },
];

const carrierDetailsMap: Record<string, CarrierDetailsData> = {
  '1': {
    totalLoads: 20,
    totalRevenue: '$3242.00',
    totalMiles: 3000,
    avgRatePerLoad: '$4666',
    avgRatePerMile: '$78',
    drivers: [
      {
        id: 'd1',
        initials: 'JM',
        name: 'James Mack',
        loads: 30,
        revenue: '$6700',
        miles: 234,
        ratePerMile: '$2000.00',
      },
      {
        id: 'd2',
        initials: 'RD',
        name: 'Rod Dies',
        loads: 22,
        revenue: '$5600',
        miles: 200,
        ratePerMile: '$12420.00',
      },
    ],
    trucks: [
      {
        id: 't1',
        truckNo: '24',
        loads: 22,
        miles: 200,
      },
    ],
  },
  '2': {
    totalLoads: 18,
    totalRevenue: '$2890.00',
    totalMiles: 2400,
    avgRatePerLoad: '$4100',
    avgRatePerMile: '$69',
    drivers: [
      {
        id: 'd3',
        initials: 'RA',
        name: 'Ralph Adams',
        loads: 18,
        revenue: '$4200',
        miles: 210,
        ratePerMile: '$1500.00',
      },
    ],
    trucks: [
      {
        id: 't2',
        truckNo: '18',
        loads: 18,
        miles: 210,
      },
    ],
  },
};

export default function CarrierReportTable() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedCarrier, setSelectedCarrier] =
    useState<CarrierDetailsData | null>(null);
  const { isOpen, openModal, closeModal } = useModal(false);

  const itemsPerPage = 5;
  const totalPages = Math.ceil(carriers.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = carriers.slice(startIndex, startIndex + itemsPerPage);

  const handleOpenDetails = (carrierId: string) => {
    const details = carrierDetailsMap[carrierId] ?? {
      totalLoads: 0,
      totalRevenue: '$0.00',
      totalMiles: 0,
      avgRatePerLoad: '$0',
      avgRatePerMile: '$0',
      drivers: [],
      trucks: [],
    };

    setSelectedCarrier(details);
    openModal();
  };

  const handleCloseDetails = () => {
    closeModal();
    setSelectedCarrier(null);
  };

  return (
    <>
      <section className="rounded-2xl border border-[#E6EAF2] bg-white p-4 md:p-5">
        <h3 className="mb-4 text-[18px] font-semibold text-[#1F2430]">
          All Carrier’s Report
        </h3>

        <div className="mb-4">
          <SearchInput placeholder="Search by name / MC No." />
        </div>

        <div className="overflow-x-auto rounded-xl border border-[#E6EAF2]">
          <table className="min-w-full">
            <thead className="bg-[#F3F5F9]">
              <tr className="text-left text-[1rem] text-[#75809A]">
                <th className="px-4 py-4 font-medium">Carriers</th>
                <th className="px-4 py-4 font-medium">MC No.</th>
                <th className="px-4 py-4 font-medium">Loads</th>
                <th className="px-4 py-4 font-medium">Revenue</th>
                <th className="px-4 py-4 font-medium">Miles</th>
                <th className="px-4 py-4 text-right"></th>
              </tr>
            </thead>

            <tbody>
              {currentData.map(item => (
                <tr
                  key={item.id}
                  className="border-t border-[#E9EDF5] text-[1rem] text-[#1F2430]"
                >
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#EEEEF1] text-[11px] font-semibold text-[#4B4B4B]">
                        {item.initials}
                      </div>
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-xs text-[#8A94A6]">{item.code}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">{item.mc}</td>
                  <td className="px-4 py-4">{item.loads}</td>
                  <td className="px-4 py-4">{item.revenue}</td>
                  <td className="px-4 py-4">{item.miles}</td>
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
              {Math.min(startIndex + itemsPerPage, carriers.length)} of{' '}
              {carriers.length} results
            </p>

            <TablePagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      </section>

      <CarrierReportDetailsModal
        isOpen={isOpen}
        onClose={handleCloseDetails}
        data={selectedCarrier}
      />
    </>
  );
}