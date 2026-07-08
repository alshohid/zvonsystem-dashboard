
'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { DocumentsTab } from '@/src/components/dispatcher/loads/DocumentsTab';
import { TrackLoadTab } from '@/src/components/dispatcher/loads/TrackLoadTab';
import { DetailsTab } from '@/src/components/dispatcher/loads/DetailsTab';

export type LoadTabKey = 'details' | 'documents' | 'track-load';

export type DocumentItem = {
  id: string;
  name: string;
  size: string;
  uploadedAt: string;
  tag: string;
};

export type TimelineItem = {
  id: string;
  title: string;
  dateTime: string;
  completed: boolean;
  actionLabel?: string;
  actionDisabled?: boolean;
};

export type LoadFormData = {
  carrier: string;
  loadNumber: string;
  brokerName: string;
  brokerReferenceNumber: string;
  brokerEmail: string;
  brokerPhone: string;
  pickupCompanyName: string;
  pickupDate: string;
  pickupAddress: string;
  deliveryCompanyName: string;
  deliveryDate: string;
  deliveryTime: string;
  deliveryTimeType: 'AM' | 'PM';
  deliveryAddress: string;
  driver: string;
  truck: string;
  trailer: string;
  ratePerMile: string;
  totalMiles: string;
  deadheadMiles: string;
  loadedMiles: string;
  additionalNotes: string;
};

export const TABS: { key: LoadTabKey; label: string }[] = [
  { key: 'details', label: 'Details' },
  { key: 'documents', label: 'Documents' },
  { key: 'track-load', label: 'Track Load' },
];

export const MOCK_LOAD: LoadFormData = {
  carrier: 'Moon Delta LTD',
  loadNumber: 'RF-K243',
  brokerName: 'John Doe',
  brokerReferenceNumber: '53423',
  brokerEmail: 'yourmail@gmail.com',
  brokerPhone: '+9968632',
  pickupCompanyName: 'RF logistics',
  pickupDate: '23/04/2025',
  pickupAddress: 'Houston USA, 12 A Lane',
  deliveryCompanyName: 'RF logistics',
  deliveryDate: '23/04/2026',
  deliveryTime: '09:00',
  deliveryTimeType: 'AM',
  deliveryAddress: 'Houston USA, 12 A Lane',
  driver: 'John Doe',
  truck: 'RF-345',
  trailer: 'RF-345',
  ratePerMile: '2.5',
  totalMiles: '300',
  deadheadMiles: '30',
  loadedMiles: '270',
  additionalNotes:
    '',
};

export const INITIAL_TIMELINE: TimelineItem[] = [
  { id: 'assigned', title: 'Assigned', dateTime: '12 Feb 2025 — 09:00', completed: true, actionLabel: 'Done', actionDisabled: true },
  { id: 'pickup', title: 'Pickup', dateTime: '12 Feb 2025 — 09:00', completed: true, actionLabel: 'Done', actionDisabled: true },
  { id: 'delivered', title: 'Delivered', dateTime: '12 Feb 2025 — 09:00', completed: true, actionLabel: 'Mark Done', actionDisabled: false },
  { id: 'completed', title: 'Completed', dateTime: '12 Feb 2025 — 09:00', completed: false, actionLabel: 'Done', actionDisabled: true },
];

// ── Inline Tab Bar (matches screenshot style) ──────────────────────
function TabBar({
  tabs,
  activeKey,
  onChange,
}: {
  tabs: { key: LoadTabKey; label: string }[];
  activeKey: LoadTabKey;
  onChange: (key: LoadTabKey) => void;
}) {
  return (
    <div className="flex border-b border-[#E5E7EB]">
      {tabs.map(tab => {
        const isActive = tab.key === activeKey;
        return (
          <button
            key={tab.key}
            onClick={() => onChange(tab.key)}
            className={`relative mr-6 pb-3 pt-1 text-sm font-semibold transition-colors ${
              isActive
                ? 'text-[#2E3A83]'
                : 'text-[#9CA3AF] hover:text-[#6B7280]'
            }`}
          >
            {tab.label}
            {/* Active underline */}
            {isActive && (
              <span className="absolute bottom-0 left-0 h-[2px] w-full rounded-full bg-[#2E3A83]" />
            )}
          </button>
        );
      })}
    </div>
  );
}

export default function ViewLoadPage() {
  const router = useRouter();
  const params = useParams<{ loadId: string }>();
  const searchParams = useSearchParams();

  const activeTabFromUrl = searchParams.get('tab') as LoadTabKey | null;
  const [activeTab, setActiveTab] = useState<LoadTabKey>(
    activeTabFromUrl && TABS.some(t => t.key === activeTabFromUrl)
      ? activeTabFromUrl
      : 'details',
  );

  const [formData, setFormData] = useState<LoadFormData>(MOCK_LOAD);
  const [showUploadBox, setShowUploadBox] = useState(false);
  const [timeline, setTimeline] = useState<TimelineItem[]>(INITIAL_TIMELINE);
  const [isSaved, setIsSaved] = useState(false);

  const loadId = useMemo(() => {
    return Array.isArray(params?.loadId) ? params.loadId[0] : params?.loadId;
  }, [params]);

  useEffect(() => {
    if (
      activeTabFromUrl &&
      TABS.some(t => t.key === activeTabFromUrl) &&
      activeTabFromUrl !== activeTab
    ) {
      setActiveTab(activeTabFromUrl);
    }
  }, [activeTabFromUrl]);

  const handleTabChange = (key: LoadTabKey) => {
    setActiveTab(key);
    const query = new URLSearchParams(searchParams.toString());
    query.set('tab', key);
    router.replace(`/dispatcher/dashboard/loads/${loadId}?${query.toString()}`, { scroll: false });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setIsSaved(false);
  };

  // ── Date field helper — renders a native date input styled as calendar picker
  const handleDateChange = (field: keyof LoadFormData, value: string) => {
    // Convert yyyy-mm-dd (native date input) → dd/mm/yyyy for storage
    if (value) {
      const [y, m, d] = value.split('-');
      setFormData(prev => ({ ...prev, [field]: `${d}/${m}/${y}` }));
    } else {
      setFormData(prev => ({ ...prev, [field]: '' }));
    }
    setIsSaved(false);
  };

  // Convert dd/mm/yyyy → yyyy-mm-dd for the native input value
  const toInputDate = (ddmmyyyy: string) => {
    if (!ddmmyyyy) return '';
    const parts = ddmmyyyy.split('/');
    if (parts.length !== 3) return '';
    return `${parts[2]}-${parts[1]}-${parts[0]}`;
  };

  const handleSave = () => {
    // Replace with your API call
    console.log('Saving load:', formData);
    setIsSaved(true);
  };

  const handleDeliveredDone = () => {
    setTimeline(prev =>
      prev.map(item => {
        if (item.id === 'delivered') return { ...item, actionLabel: 'Done', actionDisabled: true };
        if (item.id === 'completed') return { ...item, completed: true, actionDisabled: true };
        return item;
      }),
    );
  };

  const pageTitle =
    activeTab === 'documents'
      ? `Load Documents #${loadId}`
      : activeTab === 'track-load'
        ? `Track Load #${loadId}`
        : `Load Details #${loadId}`;

  return (
    <div className="w-full rounded-2xl border border-[#E7EAF3] bg-white p-4 sm:p-6">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between gap-4">
        <h1 className="text-[22px] font-bold text-[#111827]">{pageTitle}</h1>

        {/* Only show Add New on documents tab */}
        {activeTab === 'documents' && (
          <button
            type="button"
            onClick={() => setShowUploadBox(prev => !prev)}
            className="inline-flex items-center gap-2 rounded-xl bg-[#2E3A83] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#26306d]"
          >
            <span className="text-base leading-none">+</span> Add New
          </button>
        )}
      </div>

      {/* ── Tab Bar (matches screenshot) ── */}
      <div className="mb-6">
        <TabBar tabs={TABS} activeKey={activeTab} onChange={handleTabChange} />
      </div>

      {/* ── Details Tab ── */}
{activeTab === 'details' && (
  <div>
    <DetailsTab
      formData={formData}
      onChange={handleInputChange}
      onSave={handleSave}
    />
    <div className="mt-8 flex justify-end gap-3">
      <button
        type="button"
        onClick={() => setFormData(MOCK_LOAD)}
        className="h-11 rounded-xl border border-[#E5E7EB] bg-[#F9FAFB] px-6 text-sm font-semibold text-[#374151] transition hover:bg-gray-100"
      >
        Reset
      </button>
      <button
        type="button"
        onClick={handleSave}
        className="h-11 rounded-xl bg-[#2E3A83] px-8 text-sm font-semibold text-white transition hover:bg-[#26306d]"
      >
        {isSaved ? '✓ Saved' : 'Save Changes'}
      </button>
    </div>
  </div>
)}

{/* ── Documents Tab ── */}
{activeTab === 'documents' && (
  <DocumentsTab showUploadBox={showUploadBox} />  
)}

      {/* ── Track Load Tab ── */}
      {activeTab === 'track-load' && (
        <TrackLoadTab
          timeline={timeline}
          onDeliveredDone={handleDeliveredDone}
        />
      )}
    </div>
  );
}







