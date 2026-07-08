'use client';

import React from 'react';
import { ChevronDown } from 'lucide-react';
import { CarrierOption } from '../../../types/dispatcher/type';

interface CarrierSelectProps {
  value: string;
  options: CarrierOption[];
  onChange: (value: string) => void;
}

export default function CarrierSelect({
  value,
  options,
  onChange,
}: CarrierSelectProps) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className="h-[39px] w-full appearance-none rounded-[5px] border border-[#D9DCE3] bg-white px-3 pr-8 text-[16px] text-[#111827] outline-none"
      >
        {options.map(item => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>

      <ChevronDown
        size={15}
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#A0AEC0]"
      />
    </div>
  );
}
