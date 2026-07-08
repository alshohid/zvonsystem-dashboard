'use client';

type TabType = 'carrier' | 'driver' | 'earnings';

interface ReportTabsProps {
  activeTab: TabType;
  onChange: (tab: TabType) => void;
}

export default function ReportTabs({ activeTab, onChange }: ReportTabsProps) {
  const tabs: { key: TabType; label: string }[] = [
    { key: 'carrier', label: 'By Carrier' },
    { key: 'driver', label: 'By Driver' },
    { key: 'earnings', label: 'Your Earnings' },
  ];

  return (
    <div className="flex w-full rounded-2xl border border-[#E6EAF2] bg-[#F7F8FC] p-1">
      {tabs.map(tab => {
        const isActive = activeTab === tab.key;

        return (
          <button
            key={tab.key}
            onClick={() => onChange(tab.key)}
            className={`flex-1 rounded-xl px-4 py-3 text-sm font-medium transition ${
              isActive
                ? 'bg-[#313E8C] text-white'
                : 'text-[#3C4353] hover:bg-white'
            }`}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
