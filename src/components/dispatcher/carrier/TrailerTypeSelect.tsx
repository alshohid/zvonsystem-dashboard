'use client';

import React from 'react';
import { ChevronDown } from 'lucide-react';
import { TrailerTypeOption } from '../../../types/dispatcher/type';

interface TrailerTypeSelectProps {
  value: string;
  options: TrailerTypeOption[];
  onChange: (value: string) => void;
}

export default function TrailerTypeSelect({
  value,
  options,
  onChange,
}: TrailerTypeSelectProps) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className="h-[39px] w-full appearance-none rounded-[5px] border border-[#D9DCE3] bg-white px-3 pr-8 text-[16px] text-[#111827] outline-none"
      >
        {options.map(item => (
          <option key={item.id} value={item.label}>
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
