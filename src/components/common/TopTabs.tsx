
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
};

export default function TopTabs<T extends string>({
  tabs,
  activeKey,
  onChange,
  className = '',
  // Updated defaults to match your new design
  activeColorClassName = 'bg-[#2E3A83] text-white',
  inactiveColorClassName = 'text-[#3C4353] hover:bg-white',
}: TopTabsProps<T>) {
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



// "use client";

// export type TabItem<T extends string = string> = {
//     key: T;
//     label: string;
// };

// type TopTabsProps<T extends string> = {
//     tabs: TabItem<T>[];
//     activeKey: T;
//     onChange: (key: T) => void;

//     className?: string;
//     activeColorClassName?: string;
//     inactiveColorClassName?: string;
// };

// export default function TopTabs<T extends string>({
//     tabs,
//     activeKey,
//     onChange,
//     className = "",
//     activeColorClassName = "text-[#708161]",
//     inactiveColorClassName = "text-gray-500 hover:text-gray-700",
// }: TopTabsProps<T>) {
//     return (
//         <div className={`w-full border-b border-gray-200 ${className}`}>
//             <div className="flex items-center gap-6 px-3 sm:px-4">
//                 {tabs.map((t) => {
//                     const active = activeKey === t.key;

//                     return (
//                         <button
//                             key={t.key}
//                             type="button"
//                             onClick={() => onChange(t.key)}
//                             className={[
//                                 "relative py-3 text-[1rem] font-medium transition",
//                                 active ? activeColorClassName : inactiveColorClassName,
//                             ].join(" ")}
//                         >
//                             {t.label}
//                             {active && (
//                                 <span className="absolute left-0 right-0 -bottom-[1px] h-[2px] bg-[#708161]" />
//                             )}
//                         </button>
//                     );
//                 })}
//             </div>
//         </div>
//     );
// }
