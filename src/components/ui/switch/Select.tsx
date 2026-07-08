import React, { useState } from "react";

interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  options?: Option[];
  placeholder?: string;
  onChange?: (value: string) => void;
  className?: string;
  defaultValue?: string;
  value?: string;
  disabled?: boolean;
}

const Select: React.FC<SelectProps> = ({
  options = [],
  placeholder = "Select an option",
  onChange,
  className = "",
  defaultValue = "",
  value,
  disabled = false,
}) => {
  // Manage the selected value (for uncontrolled mode)
  const [internalValue, setInternalValue] = useState<string>(defaultValue);

  // Use controlled value if provided, otherwise use internal state
  const selectedValue = value !== undefined ? value : internalValue;
  const isControlled = value !== undefined;

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = e.target.value;
    if (!isControlled) {
      setInternalValue(newValue);
    }
    onChange?.(newValue); // Trigger parent handler
  };

  return (
    <select
      className={`h-11 w-full appearance-none rounded-lg border border-gray-300 px-4 py-2.5 pr-11 text-sm shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-[#0D0D12] dark:text-gray-300 dark:placeholder:text-gray-500 dark:focus:border-brand-800 ${selectedValue
        ? "text-gray-800 dark:text-white"
        : "text-gray-400 dark:text-gray-500"
        } ${className}`}
      value={selectedValue}
      onChange={handleChange}
      disabled={disabled}
    >
      {/* Placeholder option */}
      <option
        value=""
        disabled
        className="text-gray-700 dark:bg-[#0D0D12] dark:text-gray-400"
      >
        {placeholder}
      </option>
      {/* Map over options */}
      {options?.map((option) => (
        <option
          key={option.value}
          value={option.value}
          className="text-gray-700 dark:bg-[#0D0D12] dark:text-gray-400"
        >
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Select;
