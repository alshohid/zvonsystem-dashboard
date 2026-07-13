import type { ReactNode } from "react";

type ReadOnlyFieldProps = {
  label: string;
  value: ReactNode;
};

export default function ReadOnlyField({ label, value }: ReadOnlyFieldProps) {
  return (
    <div>
      <p className="text-xs font-medium text-[#667085]">{label}</p>
      <div className="mt-1.5 rounded-lg border border-[#E9E9EA] bg-[#F5F7FB] px-4 py-2.5 text-[13px] text-[#101828]">
        {value}
      </div>
    </div>
  );
}
