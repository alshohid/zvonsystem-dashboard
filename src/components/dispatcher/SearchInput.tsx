'use client';

import { Search } from 'lucide-react';

export default function SearchInput({ placeholder = 'Search...' }) {
  return (
    <div className="relative w-full">
      <Search
        size={16}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8A94A6]"
      />
      <input
        type="text"
        placeholder={placeholder}
        className="h-11 w-full rounded-xl border border-[#E1E6EF] bg-[#F8F9FC] pl-11 pr-4 text-sm text-[#1F2430] outline-none placeholder:text-[#9AA3B3] focus:border-[#C9D2E3]"
      />
    </div>
  );
}
