'use client';
import { CompleteIcon, PendingIcon, TotalLoadsIcon } from '@/src/icons';
import { FireExtinguisherIcon, PersonStandingIcon } from 'lucide-react';
import React from 'react';


interface StatCardProps {
  label: string;
  value: string;
  Icon: React.ReactNode;
  iconBg: string;
}

function StatCard({ label, value, Icon, iconBg }: StatCardProps) {
  return (
    <div className="flex flex-1 items-center gap-4 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      <div
        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${iconBg}`}
      >
        {Icon}
      </div>
      <div className="flex flex-col">
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        <p className="text-[1rem] font-medium text-gray-400">{label}</p>
      </div>
    </div>
  );
}

export function StatsCards() {
  const stats = [
    {
      label: 'Total Loads',
      value: '34',
      Icon: <TotalLoadsIcon />,
      iconBg: 'bg-indigo-50 text-indigo-600',
    },
    {
      label: 'Pending',
      value: '4',
      Icon: <PendingIcon />,
      iconBg: 'bg-[#fef9c2] text-yellow-600',
    },
    {
      label: 'Completed',
      value: '20',
      Icon: <CompleteIcon />,
      iconBg: 'bg-[#dcfce7] text-green-600',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {stats.map(stat => (
        <StatCard key={stat.label} {...stat} />
      ))}
    </div>
  );
}
