import React, { InputHTMLAttributes, SelectHTMLAttributes } from 'react';
import { ChevronDown } from 'lucide-react';

// --- Interfaces ---

interface FieldBaseProps {
  label: string;
  required?: boolean;
}



// Select Props: Extends standard HTML select attributes
interface SelectFieldProps
  extends SelectHTMLAttributes<HTMLSelectElement>, FieldBaseProps {
  options?: { value: string; label: string }[];
  placeholder?: string;
}


export const SelectField: React.FC<SelectFieldProps> = ({
  label,
  required = false,
  placeholder,
  options = [],
  className = '',
  ...props
}) => {
  return (
    <div className="flex flex-col gap-2 w-full text-left">
      <label className="text-sm font-bold text-[#111827]">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <select
          {...props}
          className={`w-full h-12 px-4 bg-white border border-gray-200 rounded-xl outline-none appearance-none text-sm text-gray-600 focus:border-[#2B3674] transition-all ${className}`}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map(opt => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
          size={18}
        />
      </div>
    </div>
  );
};
