'use client';

import { useMemo, useState } from 'react';
import { CalendarDays } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/src/sharedComponents/shared/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/src/sharedComponents/shared/ui/select';



type ExpiryDatePickerProps = {
  /** The selected expiry as `MM/YY` (e.g. `"12/29"`). */
  value: string;
  /** Called with the new `MM/YY` string whenever the month or year changes. */
  onChange: (value: string) => void;
  placeholder?: string;
  inputClassName?: string;
};

const MONTH_OPTIONS = [
  { value: '01', label: '01 - January' },
  { value: '02', label: '02 - February' },
  { value: '03', label: '03 - March' },
  { value: '04', label: '04 - April' },
  { value: '05', label: '05 - May' },
  { value: '06', label: '06 - June' },
  { value: '07', label: '07 - July' },
  { value: '08', label: '08 - August' },
  { value: '09', label: '09 - September' },
  { value: '10', label: '10 - October' },
  { value: '11', label: '11 - November' },
  { value: '12', label: '12 - December' },
];

const SELECT_TRIGGER_CLASSNAME =
  'h-11 w-full rounded-lg border-[#E9E9EA] bg-[#F5F7FB] px-3 text-[13px] text-[#161721] data-[placeholder]:text-[#A1A1AA] focus:border-[#8FA17E] focus:ring-2 focus:ring-[#8FA17E]/15';

const DEFAULT_FIELD_CLASS =
  'h-auto w-full rounded-lg border-[#E9E9EA] bg-[#F5F7FB] px-4 py-3';

export default function ExpiryDatePicker({
  value,
  onChange,
  placeholder = 'MM/YY',
  inputClassName,
}: ExpiryDatePickerProps) {
  const [open, setOpen] = useState(false);
  const currentYear = new Date().getFullYear();

  const [valueMonth = '', valueYear = ''] = value
    .split('/')
    .map(part => part.trim());

  const yearOptions = useMemo(() => {
    const options: { value: string; label: string }[] = [];
    for (let y = currentYear; y <= currentYear + 15; y++) {
      options.push({
        label: String(y),
        value: String(y).slice(-2).padStart(2, '0'),
      });
    }
    return options;
  }, [currentYear]);

  const handleMonth = (month: string) => {
    if (month) onChange(valueYear ? `${month}/${valueYear}` : month);
    else onChange(valueYear ? `/${valueYear}` : '');
  };

  const handleYear = (year: string) => {
    if (year) onChange(valueMonth ? `${valueMonth}/${year}` : year);
    else onChange(valueMonth ? `${valueMonth}/` : '');
  };

  const hasValue = Boolean(valueMonth && valueYear);

  const fieldClass = `flex w-full cursor-pointer items-center justify-between gap-2 text-[13px] outline-none transition focus:border-[#8FA17E] focus:ring-2 focus:ring-[#8FA17E]/15 ${hasValue ? 'text-[#161721]' : 'text-[#A1A1AA]'
    } ${inputClassName ?? DEFAULT_FIELD_CLASS}`;

  return (
    <div className="flex w-full flex-col gap-1.5">
      <label className="text-[1rem] font-medium text-[#161721]">
        Expiry Date
      </label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger className={fieldClass}>
          <span>{hasValue ? `${valueMonth}/${valueYear}` : placeholder}</span>
          <CalendarDays size={16} className="shrink-0 text-[#98A2B3]" />
        </PopoverTrigger>

        <PopoverContent align="start" sideOffset={8} className="w-[19rem] p-4">
          <p className="mb-3 text-[13px] font-semibold text-[#101828]">
            Expiry Date
          </p>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <span className="text-[12px] font-medium text-[#667085]">Month</span>
              <Select value={valueMonth || undefined} onValueChange={handleMonth}>
                <SelectTrigger className={SELECT_TRIGGER_CLASSNAME}>
                  <SelectValue placeholder="Month" />
                </SelectTrigger>
                <SelectContent
                  position="popper"
                  className="max-h-56 w-[var(--radix-select-trigger-width)]"
                >
                  {MONTH_OPTIONS.map(option => (
                    <SelectItem
                      key={option.value}
                      value={option.value}
                      className="cursor-pointer text-[13px]"
                    >
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-[12px] font-medium text-[#667085]">Year</span>
              <Select value={valueYear || undefined} onValueChange={handleYear}>
                <SelectTrigger className={SELECT_TRIGGER_CLASSNAME}>
                  <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent
                  position="popper"
                  className="max-h-56 w-[var(--radix-select-trigger-width)]"
                >
                  {yearOptions.map(option => (
                    <SelectItem
                      key={option.value}
                      value={option.value}
                      className="cursor-pointer text-[13px]"
                    >
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
