'use client';

import React from 'react';
import { ChevronDown } from 'lucide-react';

interface Option {
  label: string;
  value: string | number; // Changed to accept numbers
}

interface DropdownProps {
  value: string | number; // Changed to accept numbers
  onChange: (value: string) => void;
  options: Option[];
  placeholder: string;
}

const CustomDropdown = ({
  value,
  onChange,
  options,
  placeholder,
}: DropdownProps) => {
  return (
    <div className="relative w-full">
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full appearance-none bg-white border border-[#E5E7EB] text-[#111827] text-base rounded-[18px] px-4 py-3.5 outline-none focus:border-[#3E4EDD] transition-all cursor-pointer"
      >
        <option value="" disabled hidden>
          {placeholder}
        </option>
        {options.map(opt => (
          <option key={opt.value} value={opt.value} className="text-[#111827]">
            {opt.label}
          </option>
        ))}
      </select>

      <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
        <ChevronDown size={20} className="text-[#A0AEC0]" />
      </div>
    </div>
  );
};

export default CustomDropdown;
