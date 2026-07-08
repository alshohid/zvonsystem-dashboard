import React, { InputHTMLAttributes, SelectHTMLAttributes } from 'react';
import { ChevronDown } from 'lucide-react';

// --- Interfaces ---

interface FieldBaseProps {
  label: string;
  required?: boolean;
}

// Input Props: Extends standard HTML input attributes to allow value, onChange, etc.
interface InputFieldProps
  extends InputHTMLAttributes<HTMLInputElement>, FieldBaseProps {
  name: string; // Made explicit for state mapping
}



export const InputField: React.FC<InputFieldProps> = ({
  label,
  required = false,
  className = '',
  ...props
}) => {
  return (
    <div className="flex flex-col gap-2 w-full text-left">
      <label className="text-sm font-bold text-[#111827]">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        {...props}
        className={`w-full h-12 px-4 bg-white border border-gray-200 rounded-xl outline-none focus:border-[#2B3674] text-sm text-gray-600 transition-all ${className}`}
      />
    </div>
  );
};


