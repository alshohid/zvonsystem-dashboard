"use client";

import React from "react";
import { DownCaretIcon } from "@/src/icons";
import { useEffect, useRef, useState } from "react";

export default function FilterDropdown({
  label,
  options,
  selected,
  onSelect,
}: {
  label: string;
  options: string[];
  selected: string;
  onSelect: (val: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(prev => !prev)}
        className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl text-sm font-semibold text-gray-600 bg-white transition hover:bg-gray-50 h-12"
      >
        {selected === 'All' || selected === label ? label : selected}
        <DownCaretIcon className={`transition ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute left-0 top-full z-30 mt-2 w-40 rounded-xl border border-gray-100 bg-white p-1 shadow-lg">
          {options.map(option => {
            const isActive = selected === option;
            return (
              <button
                key={option}
                onClick={() => {
                  onSelect(option);
                  setOpen(false);
                }}
                className={`flex w-full items-center rounded-lg px-3 py-2 text-left text-sm transition ${
                  isActive
                    ? 'bg-[#2B3674] text-white font-semibold'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {option}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}