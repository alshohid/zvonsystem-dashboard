
'use client';

export type TabItem<T extends string = string> = {
  key: T;
  label: string;
};

type TopTabsProps<T extends string> = {
  tabs: TabItem<T>[];
  activeKey: T;
  onChange: (key: T) => void;

  className?: string;
  activeColorClassName?: string;
  inactiveColorClassName?: string;
  /** 'segmented' (default) renders the pill switcher. 'stepper' renders a numbered progress stepper. 'pills' renders individually-bordered filter buttons. */
  variant?: 'segmented' | 'stepper' | 'pills';
};

export default function TopTabs<T extends string>({
  tabs,
  activeKey,
  onChange,
  className = '',
  // Updated defaults to match your new design
  activeColorClassName = 'bg-primary text-white',
  inactiveColorClassName = 'text-[#3C4353] hover:bg-white',
  variant = 'segmented',
}: TopTabsProps<T>) {
  if (variant === 'stepper') {
    const activeIndex = tabs.findIndex(t => t.key === activeKey);

    return (
      <div className={`w-full ${className}`}>
        <div className="flex w-full items-center">
          {tabs.map((t, index) => {
            const isActive = index === activeIndex;
            const isCompleted = activeIndex >= 0 && index < activeIndex;
            const isLast = index === tabs.length - 1;

            return (
              <div key={t.key} className="flex flex-1 items-center last:flex-none">
                <button
                  type="button"
                  onClick={() => onChange(t.key)}
                  className="flex min-w-0 items-center gap-1.5 sm:gap-2"
                  title={t.label}
                >
                  <span
                    className={[
                      'flex h-5 w-5 shrink-0 items-center justify-center rounded-md text-[11px] font-semibold transition-colors sm:h-6 sm:w-6 sm:text-xs',
                      isActive
                        ? 'border-2 border-primary text-[#101828]'
                        : isCompleted
                          ? 'bg-primary text-white'
                          : 'border border-[#3cd117] text-[#98A2B3]',
                    ].join(' ')}
                  >
                    {isCompleted ? '✓' : index + 1}
                  </span>
                  <span
                    className={[
                      'hidden truncate text-[13px] sm:inline sm:text-sm',
                      isActive
                        ? 'font-semibold text-[#101828]'
                        : isCompleted
                          ? 'font-medium text-[#101828]'
                          : 'text-[#98A2B3]',
                    ].join(' ')}
                  >
                    {t.label}
                  </span>
                </button>

                {!isLast && (
                  <span
                    className={[
                      'mx-1.5 h-px flex-1 sm:mx-3',
                      isCompleted ? 'bg-primary' : 'bg-[#E5E7EB]',
                    ].join(' ')}
                  />
                )}
              </div>
            );
          })}
        </div>

        {activeIndex >= 0 && (
          <p className="mt-2 truncate text-xs font-medium text-[#101828] sm:hidden">
            Step {activeIndex + 1} of {tabs.length}: {tabs[activeIndex].label}
          </p>
        )}
      </div>
    );
  }

  if (variant === 'pills') {
    return (
      <div className={`flex flex-wrap items-center gap-2 ${className}`}>
        {tabs.map(t => {
          const active = activeKey === t.key;

          return (
            <button
              key={t.key}
              type="button"
              onClick={() => onChange(t.key)}
              className={[
                'rounded-lg border px-3 py-1.5 text-[13px] font-medium transition-colors',
                active
                  ? 'border-[#22C55E] text-[#22C55E]'
                  : 'border-[#E5E7EB] text-[#667085] hover:border-[#D0D5DD] hover:text-[#344054]',
              ].join(' ')}
            >
              {t.label}
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div
      className={`flex w-full rounded-2xl border border-[#E6EAF2] bg-[#F7F8FC] p-1 ${className}`}
    >
      {tabs.map(t => {
        const active = activeKey === t.key;

        return (
          <button
            key={t.key}
            type="button"
            onClick={() => onChange(t.key)}
            className={[
              'min-w-0 basis-0 flex-1 rounded-xl px-2 py-2 text-[10px] font-medium leading-tight transition-all duration-200 sm:px-3 sm:py-2.5 sm:text-xs md:px-4 md:py-3 md:text-[1rem] lg:text-[1.25rem]',
              active ? activeColorClassName : inactiveColorClassName,
            ].join(' ')}
            title={t.label}
          >
            <span className="block truncate">{t.label}</span>
          </button>
        );
      })}
    </div>
  );
}
