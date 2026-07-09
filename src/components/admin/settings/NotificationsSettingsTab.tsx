'use client';

import { useState } from 'react';
import Switch from '@/src/components/ui/switch/Switch';
import { DEFAULT_NOTIFICATION_PREFS, NOTIFICATION_PREF_ITEMS, type NotificationPrefKey } from './mockSettings';

export default function NotificationsSettingsTab() {
  const [prefs, setPrefs] = useState<Record<NotificationPrefKey, boolean>>(
    DEFAULT_NOTIFICATION_PREFS,
  );

  const handleChange = (key: NotificationPrefKey, value: boolean) => {
    setPrefs(current => ({ ...current, [key]: value }));
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-[#E9EDF5] bg-white shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
      <div className="divide-y divide-[#F0F2F7] px-6">
        {NOTIFICATION_PREF_ITEMS.map(item => (
          <div key={item.key} className="flex items-center justify-between gap-4 py-4">
            <div className="min-w-0">
              <p className="text-sm font-semibold text-[#101828]">{item.title}</p>
              <p className="mt-1 text-xs leading-5 text-[#98A2B3]">{item.description}</p>
            </div>

            <Switch
              checked={prefs[item.key]}
              onCheckedChange={value => handleChange(item.key, value)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
