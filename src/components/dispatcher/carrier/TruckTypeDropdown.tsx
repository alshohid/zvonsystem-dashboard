'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ChevronDown, Plus, Trash2, X } from 'lucide-react';
import { TruckTypeOption } from '../../../types/dispatcher/type';

interface TruckTypeDropdownProps {
  value: string;
  options: TruckTypeOption[];
  onChange: (value: string) => void;
}

export default function TruckTypeDropdown({
  value,
  options,
  onChange,
}: TruckTypeDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [localOptions, setLocalOptions] = useState<TruckTypeOption[]>(options);
  const [newType, setNewType] = useState('');
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setLocalOptions(options);
  }, [options]);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  const selectedLabel = useMemo(() => {
    return localOptions.find(item => item.label === value)?.label || value;
  }, [localOptions, value]);

  const handleDelete = (id: string, event: React.MouseEvent) => {
    event.stopPropagation();

    const deletedItem = localOptions.find(item => item.id === id);
    const updatedOptions = localOptions.filter(item => item.id !== id);

    setLocalOptions(updatedOptions);

    if (deletedItem?.label === value) {
      onChange('');
    }
  };

  const handleAddType = () => {
    const trimmedValue = newType.trim();
    if (!trimmedValue) return;

    const exists = localOptions.some(
      item => item.label.toLowerCase() === trimmedValue.toLowerCase(),
    );

    if (exists) {
      setNewType('');
      return;
    }

    const newOption: TruckTypeOption = {
      id: Date.now().toString(),
      label: trimmedValue,
    };

    setLocalOptions(prev => [...prev, newOption]);
    onChange(trimmedValue);
    setNewType('');
  };

  return (
    <div ref={wrapperRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(prev => !prev)}
        className="flex h-[39px] w-full items-center justify-between rounded-[5px] border border-[#D9DCE3] bg-white px-3 text-left text-[16px] text-[#111827]"
      >
        <span className={selectedLabel ? 'text-[#111827]' : 'text-[#A0AEC0]'}>
          {selectedLabel || 'Select Truck Type'}
        </span>
        <ChevronDown size={15} className="text-[#A0AEC0]" />
      </button>

      {isOpen && (
        <div className="absolute left-0 top-[calc(100%+6px)] z-50 w-full rounded-[8px] border border-[#E5E7EB] bg-white p-1.5 shadow-[0px_12px_35px_rgba(15,23,42,0.12)]">
          <div className="rounded-[6px] bg-[#F7F7F8] px-3 py-2 text-center text-[11px] font-semibold text-[#111827]">
            Select Truck Type
          </div>

          <div className="mt-1 max-h-[168px] overflow-y-auto">
            {localOptions.map(item => {
              const isDanger = item.label === 'Delete Freight Van?';

              return (
                <div
                  key={item.id}
                  onClick={() => {
                    onChange(item.label);
                    setIsOpen(false);
                  }}
                  className={`flex min-h-[34px] cursor-pointer items-center justify-between rounded-[6px] px-3 py-2 text-[12px] transition ${
                    isDanger
                      ? 'bg-[#FFE9EC] text-[#E11D48]'
                      : 'text-[#111827] hover:bg-[#F8F9FB]'
                  }`}
                >
                  <div className="flex flex-col">
                    <span>{item.label}</span>
                    {isDanger && (
                      <span className="text-[10px] text-[#F87171]">
                        This will be removed from everywhere.
                      </span>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={event => handleDelete(item.id, event)}
                    className={`ml-3 shrink-0 ${
                      isDanger ? 'text-[#E11D48]' : 'text-[#9CA3AF]'
                    }`}
                  >
                    {isDanger ? <X size={12} /> : <Trash2 size={12} />}
                  </button>
                </div>
              );
            })}
          </div>

          <div className="mt-1 rounded-[6px] bg-[#F7F8FA] px-3 py-2">
            <div className="flex items-center gap-2">
              <Plus size={12} className="text-[#9CA3AF]" />
              <input
                value={newType}
                onChange={e => setNewType(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    handleAddType();
                  }
                }}
                placeholder="Add New Truck Type"
                className="w-full bg-transparent text-[12px] text-[#111827] outline-none placeholder:text-[#9CA3AF]"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
