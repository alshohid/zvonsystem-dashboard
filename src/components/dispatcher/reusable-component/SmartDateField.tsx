import { CalendarDays } from "lucide-react";

export default function SmartDateField({
  label,
  value,
  isEditing,
  onChange,
  border = false,
}: {
  label: string;
  value: string;
  isEditing: boolean;
  onChange: (v: string) => void;
  border?: boolean;
}) {
  return (
    <div
      className={`space-y-1 ${border ? 'border-b border-gray-100 pb-2' : ''}`}
    >
      <p className="text-[11px] font-bold text-gray-400 uppercase tracking-tight">
        {label}
      </p>
      {isEditing ? (
        <div className="relative">
          <CalendarDays
            className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500"
            size={16}
          />
          <input
            type="text" // Use "date" in real app for native picker, text is safer for stylized placeholders
            placeholder="MM/DD/YYYY"
            value={value}
            onChange={e => onChange(e.target.value)}
            className="w-full text-sm font-medium text-gray-800 bg-white border border-blue-200 rounded-md py-1.5 pl-9 pr-3 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
          />
        </div>
      ) : (
        <p className="text-sm font-semibold text-gray-800 truncate">
          {value || '—'}
        </p>
      )}
    </div>
  );
}
