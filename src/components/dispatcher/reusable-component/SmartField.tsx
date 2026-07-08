 export default function SmartField({
  label,
  value,
  isEditing,
  onChange,
  icon: IconComponent,
  border = false,
}: {
  label: string;
  value: string  | undefined;
  isEditing: boolean;
  onChange: (v: string) => void;
  icon?: React.ElementType;
  border?: boolean;
}) {
  return (
    <div
      className={`space-y-1 ${border ? 'border-b border-gray-100 pb-2' : ''}`}
    >
      <p className="text-[16px] font-semibold text-[#030304] uppercase tracking-tight">
        {label}
      </p>
      {isEditing ? (
        <div className="relative">
          {IconComponent && (
            <IconComponent
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={16}
            />
          )}
          <input
            type="text"
            value={value}
            onChange={e => onChange(e.target.value)}
            className={`w-full text-sm font-medium text-[#777980] bg-white border border-blue-200 rounded-md py-1.5 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all ${
              IconComponent ? 'pl-9 pr-3' : 'px-3'
            }`}
          />
        </div>
      ) : (
        <div className="flex items-center gap-2">
          {IconComponent && (
            <IconComponent className="text-gray-400" size={16} />
          )}
          <p className="text-sm font-semibold text-[#777980] truncate">
            {value || '—'}
          </p>
        </div>
      )}
    </div>
  );
}
