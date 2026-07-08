import { DownCaretIcon } from "@/src/icons";

export function Field({
  label,
  name,
  value,
  isEditing,
  onChange,
  type = 'text',
  options = [],
  hint,
  rightIcon,
}: {
  label: string;
  name: string;
  value: string;
  isEditing: boolean;
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => void;
  type?: 'text' | 'select';
  options?: string[];
  hint?: string;
  rightIcon?: React.ReactNode;
}) {
  return (
    <div className="w-full">
      <label
        className="mb-2 block text-xs font-medium text-[#344054]"
        dangerouslySetInnerHTML={{ __html: label }}
      />
      <div className="relative">
        {isEditing ? (
          type === 'select' ? (
            <select
              name={name}
              value={value}
              onChange={onChange}
              className="h-11 w-full appearance-none rounded-xl border border-[#E5E7EB] bg-white px-3 pr-10 text-sm text-[#111827] outline-none transition focus:border-[#2E3A83] cursor-pointer"
            >
              {options.map(option => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          ) : (
            <input
              name={name}
              value={value}
              onChange={onChange}
              className="h-11 w-full rounded-xl border border-[#E5E7EB] bg-white px-3 pr-10 text-sm text-[#111827] outline-none transition focus:border-[#2E3A83]"
            />
          )
        ) : (
          <div className="h-11 w-full rounded-xl border border-[#E5E7EB] bg-white px-3 text-sm text-[#111827] flex items-center pr-10">
            {value}
          </div>
        )}

        {rightIcon && (
          <span className=" absolute right-3 top-1/2 -translate-y-1/2 text-[#98A2B3]">
            {rightIcon}
          </span>
        )}

        {type === 'select' && !rightIcon && (
          <span className="pointer-events-none cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 text-[#98A2B3]">
            <DownCaretIcon/>
          </span>
        )}
      </div>

      {hint && <p className="mt-1 text-[11px] text-[#98A2B3]">{hint}</p>}
    </div>
  );
}
