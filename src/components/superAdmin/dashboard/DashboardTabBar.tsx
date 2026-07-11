export type DashboardTab<T extends string> = {
  key: T;
  label: string;
  count?: number;
};

type DashboardTabBarProps<T extends string> = {
  tabs: DashboardTab<T>[];
  activeKey: T;
  onChange: (key: T) => void;
};

export default function DashboardTabBar<T extends string>({
  tabs,
  activeKey,
  onChange,
}: DashboardTabBarProps<T>) {
  return (
    <div className="flex flex-wrap items-center gap-1">
      {tabs.map((tab) => {
        const active = tab.key === activeKey;

        return (
          <button
            key={tab.key}
            type="button"
            onClick={() => onChange(tab.key)}
            className={[
              "flex items-center gap-1.5 rounded-md px-4 py-3 text-sm font-bold transition-colors",
              active ? "bg-[#C8FEB5] text-[#1D1F2C]" : "text-[#667085] hover:text-[#101828]",
            ].join(" ")}
          >
            {tab.label}
            {typeof tab.count === "number" && (
              <span className="rounded-sm bg-black px-2 py-0.5 text-[10px] font-bold text-primary">
                {tab.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
