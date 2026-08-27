'use client';


import FormFieldInput from '@/src/components/ui/input/FormFieldInput';
import type { SelectOption } from './releaseFormOptions';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/src/sharedComponents/shared/ui/select';

type ReleaseSelectFieldProps = {
  label?: string;
  required?: boolean;
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  helperText?: string;
  error?: string;
  className?: string;
};

export default function ReleaseSelectField({
  label,
  required,
  value,
  onChange,
  options,
  placeholder = 'Select',
  helperText,
  error,
  className,
}: ReleaseSelectFieldProps) {
  return (
    <FormFieldInput
      label={label}
      required={required}
      error={error}
      helperText={helperText}
      className={className}
    >
      <Select value={value || undefined} onValueChange={onChange}>
        <SelectTrigger className="h-auto! w-full rounded-lg border border-[#E9E9EA] bg-[#F5F7FB] px-4 py-3 text-[13px] text-[#161721] data-[placeholder]:text-[#A1A1AA] focus:border-[#8FA17E] focus:ring-2 focus:ring-[#8FA17E]/15">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent
          position="popper"
          className="max-h-72 w-[var(--radix-select-trigger-width)] rounded-xl border border-[#E5E7EB] bg-white p-1 shadow-lg"
        >
          {options.map(o => (
            <SelectItem
              key={o.value}
              value={o.value}
              className="cursor-pointer rounded-lg px-3 py-2.5 text-[13px] text-[#344054] focus:bg-[#DCFCE7] focus:text-[#101828] data-[state=checked]:bg-[#DCFCE7] data-[state=checked]:font-medium data-[state=checked]:text-[#101828]"
            >
              {o.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </FormFieldInput>
  );
}
