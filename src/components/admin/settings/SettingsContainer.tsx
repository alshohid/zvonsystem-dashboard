'use client';

import { Globe, Settings as SettingsIcon, User, Bell } from 'lucide-react';
import { useTabsQueryState } from '@/src/lib/helper/useTabsQueryState';
import ProfileSettingsTab from './ProfileSettingsTab';
import AccountSettingsTab from './AccountSettingsTab';
import NotificationsSettingsTab from './NotificationsSettingsTab';
import RegionSettingsTab from './RegionSettingsTab';

type SettingsTabKey = 'profile' | 'account' | 'notifications' | 'region';

const SETTINGS_TABS: { key: SettingsTabKey; label: string; icon: typeof User }[] = [
    { key: 'profile', label: 'Profile', icon: User },
    { key: 'account', label: 'Account', icon: SettingsIcon },
    { key: 'notifications', label: 'Notifications', icon: Bell },
    { key: 'region', label: 'Region', icon: Globe },
];

export default function SettingsContainer() {
    const [tab, setTab] = useTabsQueryState<SettingsTabKey>('tab', 'profile');

    return (
        <div className="space-y-6" data-tour="page-settings">
            <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#98A2B3]">
                    General
                </p>
                <h1 className="mt-1 text-2xl font-semibold text-[#101828]">Settings</h1>
            </div>

            <div className="flex flex-wrap items-center gap-1.5">
                {SETTINGS_TABS.map(({ key, label, icon: Icon }) => {
                    const active = tab === key;

                    return (
                        <button
                            key={key}
                            type="button"
                            onClick={() => setTab(key)}
                            className={[
                                'flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors',
                                active ? 'bg-primary text-[#101828]' : 'text-[#667085] hover:text-[#344054]',
                            ].join(' ')}
                        >
                            <Icon className="h-4 w-4" strokeWidth={1.75} />
                            {label}
                        </button>
                    );
                })}
            </div>

            {tab === 'profile' && <ProfileSettingsTab />}
            {tab === 'account' && <AccountSettingsTab />}
            {tab === 'notifications' && <NotificationsSettingsTab />}
            {tab === 'region' && <RegionSettingsTab />}
        </div>
    );
}
