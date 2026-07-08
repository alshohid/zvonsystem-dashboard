"use client";

import Label from "../../switch/Label";
import Select from "../../switch/Select";
import { ChevronDownIcon, DownCaretIcon } from "@/src/icons";

export type SelectOption = {
  value: string;
  label: string;
};

type SelectFieldProps = {
  label?: string;
  required?: boolean;
  options?: SelectOption[];
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  wrapperClassName?: string;
  labelClassName?: string;
  selectClassName?: string;
  iconClassName?: string;
  disabled?: boolean;
};

export default function SelectField({
  label,
  required = false,
  options,
  placeholder = "Select Option",
  value,
  onChange,
  wrapperClassName = "",
  labelClassName = "",
  selectClassName = "",
  iconClassName = "",
  disabled = false,

}: SelectFieldProps) {
  return (
    <div className={wrapperClassName}>
      {label ? (
        <Label className={labelClassName}>
          {label}
          {required ? <span className="ml-1 text-[#DC2626]">*</span> : null}
        </Label>
      ) : null}

      <div className="relative">
        <Select
          options={options}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={[
            "h-10 rounded-xl cursor-pointer border border-[#D8E2EE] bg-[#F8FAFB] px-3.5 py-0 pr-9 text-sm font-medium text-[#344054] shadow-none transition focus:border-[#F8FAFB] focus:outline-none focus:ring-0 disabled:cursor-not-allowed disabled:border-[#E4E7EC] disabled:bg-[#F8FAFC] disabled:text-[#98A2B3]",
            "dark:bg-[#0D0D12] dark:border-gray-700 dark:text-gray-300 dark:placeholder:text-gray-500",
            selectClassName,
          ]
            .filter(Boolean)
            .join(" ")}
        />

        <span
          className={[
            "pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-[#667085] dark:text-gray-400",
            iconClassName,
          ]
            .filter(Boolean)
            .join(" ")}
        >
          <DownCaretIcon />
        </span>
      </div>
    </div>
  );
}
