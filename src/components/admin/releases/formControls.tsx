'use client';

// Figma spec: bg #F5F7FB, border #E9E9EA, radius 0.5rem, padding 0.75rem/1rem.
// No fixed height/width so the field stays fluid at any viewport.
export const FIELD_INPUT_CLASSNAME =
  'h-auto w-full rounded-lg border-[#E9E9EA] bg-[#F5F7FB] px-4 py-3';

export function GreenCheckbox({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2.5">
      <input
        type="checkbox"
        checked={checked}
        onChange={e => onChange(e.target.checked)}
        className="h-4 w-4 shrink-0 cursor-pointer appearance-none rounded-[4px] border border-[#D0D5DD] bg-white checked:border-[#22C55E] checked:bg-[#22C55E]"
        style={{
          backgroundImage: checked
            ? 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 16 16%22 fill=%22white%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cpath d=%22M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 1 1-1.06-1.06L12.72 4.22a.75.75 0 0 1 1.06 0Z%22/%3E%3Cpath d=%22M2.22 9.28a.75.75 0 0 0 0 1.06l2.25 2.25a.75.75 0 1 0 1.06-1.06L3.28 9.28a.75.75 0 0 0-1.06 0Z%22/%3E%3C/svg%3E")'
            : 'none',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />
      <span className="text-[13px] text-[#344054]">{label}</span>
    </label>
  );
}

export function GreenRadioOption({
  name,
  value,
  label,
  checked,
  onChange,
}: {
  name: string;
  value: string;
  label: string;
  checked: boolean;
  onChange: (value: string) => void;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2 text-[13px] text-[#344054]">
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={() => onChange(value)}
        className="sr-only"
      />
      <span
        className={[
          'flex h-4 w-4 shrink-0 items-center justify-center rounded-full border',
          checked ? 'border-[#22C55E] bg-[#22C55E]' : 'border-[#D0D5DD] bg-white',
        ].join(' ')}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-white" />
      </span>
      {label}
    </label>
  );
}
