'use client';

import { useState, useRef, useEffect } from 'react';
import { DateRangeOption, DateRangeType } from '@/src/types/dispatcher/type';
import { DownCaretIcon } from '@/src/icons';


interface GlobalDateFilterProps {
  value: DateRangeType;
  onChange: (value: DateRangeType) => void;
}

const options: DateRangeOption[] = [
  { label: 'Last 7 Days', value: '7d' },
  { label: 'Last 30 Days', value: '30d' },
  { label: 'Last 60 Days', value: '60d' },
];

export default function GlobalDateFilter({
  value,
  onChange,
}: GlobalDateFilterProps) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const selectedLabel =
    options.find(item => item.value === value)?.label || 'Last 30 Days';

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={wrapperRef}>
      <button
        type="button"
        onClick={() => setOpen(prev => !prev)}
        className="inline-flex min-w-[150px] items-center justify-between gap-2 rounded-xl border border-[#E3E7EF] bg-[#F7F8FC] px-4 py-2.5 text-sm font-medium text-[#3C4353] transition hover:bg-white"
      >
        <DownCaretIcon
          size={16}
          className={`text-[#7E8798] transition ${open ? 'rotate-180' : ''}`}
        />
        <span>{selectedLabel}</span>
      </button>

      {open && (
        <div className="absolute right-0 top-full z-20 mt-2 w-full rounded-xl border border-[#E3E7EF] bg-white p-1 shadow-lg">
          {options.map(option => {
            const isActive = option.value === value;

            return (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onChange(option.value);
                  setOpen(false);
                }}
                className={`flex w-full items-center rounded-lg px-3 py-2 text-left text-sm transition ${
                  isActive
                    ? 'bg-[#313E8C] text-white'
                    : 'text-[#3C4353] hover:bg-[#F5F7FB]'
                }`}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
