
'use client';
import { ClockIcon, Globe, HomeIcon, MoneyIcon, PeopleIcon, TotalLoadsIcon, TrackIcon, Trailers } from '@/src/icons';



const cardData = [
  {label:'Delivery Schedule', value:'30', Icon:<ClockIcon/>},
  { label: 'Total Carriers', value: '32', Icon: <HomeIcon/> },
  { label: 'Total Drivers', value: '28', Icon: <PeopleIcon/>},
  { label: 'Total Trucks', value: '26', Icon: <TrackIcon/> },
];
const cardData2 = [
  { label: 'Trailers', value: '32', Icon: <Trailers /> },
  { label: 'Loads In Transit', value: '32', Icon: <Globe /> },
  { label: 'Active Loads', value: '32', Icon: <TotalLoadsIcon /> },
];

function StatCard({
  label,
  value,
  Icon,
}: {
  label: string;
  value: string;
  Icon: React.ReactNode;
}) {
  return (
    <div className="flex flex-1 items-center gap-4 rounded-[12px] border border-[#e8ecf4] bg-white px-6 py-12">
      <div className="flex h-15 w-15 rounded-[8px] shrink-0 items-center justify-center rounded-xl bg-[#cacee2]">
        {Icon}
      </div>
      <div className="flex flex-col items-start">
        <p className="text-[32px] font-bold leading-tight text-[#101828]">
          {value}
        </p>
        <p className=" text-[16px] text-[#6b7280]">{label}</p>
      </div>
    </div>
  );
}

export function StatsCards() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap gap-3 ">
        {cardData.map(c => (
          <StatCard key={c.label} {...c} />
        ))}
      </div>
      <div className="flex flex-col md:flex-row w-full gap-3">
        {cardData2.map(c => (
          <div key={c.label} className="flex md:w-full ">
            <StatCard {...c} />
          </div>
        ))}
      </div>
    </div>
  );
}
