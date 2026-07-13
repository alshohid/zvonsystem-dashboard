'use client';

export type TableTab<T extends string> = {
  key: T;
  label: string;
};

type TableTabSwitchProps<T extends string> = {
  tabs: TableTab<T>[];
  activeKey: T;
  onChange: (key: T) => void;
};

export default function TableTabSwitch<T extends string>({
  tabs,
  activeKey,
  onChange,
}: TableTabSwitchProps<T>) {
  return (
    <div className="inline-flex items-center gap-1 rounded-md border border-[#E9EDF5] bg-white p-1.5 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
      {tabs.map(tab => {
        const active = tab.key === activeKey;

        return (
          <button
            key={tab.key}
            type="button"
            onClick={() => onChange(tab.key)}
            className={[
              'rounded-md px-4 py-2 text-sm font-semibold transition-colors',
              active ? 'bg-primary text-[#101828]' : 'text-[#667085] hover:text-[#101828]',
            ].join(' ')}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
