/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import { useEffect, useState } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import toast from 'react-hot-toast';
import Switch from '@/src/components/ui/switch/Switch';
import { getErrorMessage } from '@/src/lib/getErrorMessage';
import {
  useGetSettingsNotificationsQuery,
  useUpdateSettingsNotificationsMutation,
} from '@/src/redux/features/settings/settingsApi';
import { DEFAULT_NOTIFICATION_PREFS, NOTIFICATION_PREF_ITEMS, type NotificationPrefKey } from './mockSettings';

function NotificationsSettingsSkeleton() {
  const shimmer = 'animate-pulse bg-[#EEF1F7]';
  return (
    <div className="overflow-hidden rounded-2xl border border-[#E9EDF5] bg-white shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
      <div className="divide-y divide-[#F0F2F7] px-6">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="flex items-center justify-between gap-4 py-4">
            <div className="space-y-2">
              <div className={`${shimmer} h-4 w-40 rounded-md`} />
              <div className={`${shimmer} h-3 w-72 rounded-md`} />
            </div>
            <div className={`${shimmer} h-6 w-11 rounded-full`} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function NotificationsSettingsTab() {
  const { data, isLoading, isFetching, isError, error, refetch } =
    useGetSettingsNotificationsQuery();
  const [updateNotifications, { isLoading: isUpdating }] =
    useUpdateSettingsNotificationsMutation();

  const [prefs, setPrefs] = useState<Record<NotificationPrefKey, boolean>>(
    DEFAULT_NOTIFICATION_PREFS,
  );

  const notificationsData = data?.data?.data;

  useEffect(() => {
    if (notificationsData) {
      setPrefs({
        releaseStatusUpdates:
          notificationsData.releaseStatusUpdates ?? DEFAULT_NOTIFICATION_PREFS.releaseStatusUpdates,
        moderationFeedback:
          notificationsData.moderationFeedback ?? DEFAULT_NOTIFICATION_PREFS.moderationFeedback,
        releaseScheduled:
          notificationsData.releaseScheduled ?? DEFAULT_NOTIFICATION_PREFS.releaseScheduled,
        pushNotifications:
          notificationsData.pushNotifications ?? DEFAULT_NOTIFICATION_PREFS.pushNotifications,
        weeklyDigest:
          notificationsData.weeklyDigest ?? DEFAULT_NOTIFICATION_PREFS.weeklyDigest,
      });
    }
  }, [notificationsData]);

  const handleChange = async (key: NotificationPrefKey, value: boolean) => {
    const updatedPrefs = {
      ...prefs,
      [key]: value,
    };

    // Optimistically update the UI state
    setPrefs(updatedPrefs);

    try {
      await updateNotifications(updatedPrefs).unwrap();
      toast.success('Notification preferences updated.');
    } catch (updateError) {
      // Revert if mutation fails
      setPrefs(current => ({ ...current, [key]: !value }));
      toast.error(getErrorMessage(updateError, 'Could not update notification settings.'));
    }
  };

  if (isLoading || (isFetching && !notificationsData)) {
    return <NotificationsSettingsSkeleton />;
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-[#F2B7B7] bg-[#FFF1F1] p-10 text-center">
        <AlertTriangle size={28} className="text-[#DC2626]" />
        <p className="text-sm font-medium text-[#101828]">
          {getErrorMessage(error, 'Could not load notification settings.')}
        </p>
        <button
          type="button"
          onClick={() => refetch()}
          className="mt-1 inline-flex items-center gap-2 rounded-xl border border-[#D7DDF2] bg-white px-4 py-2 text-sm font-semibold text-[#2E3A83] transition hover:bg-[#F7F8FE]"
        >
          <RefreshCw size={14} />
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-[#E9EDF5] bg-white shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
      <div className="divide-y divide-[#F0F2F7] px-6">
        {NOTIFICATION_PREF_ITEMS.map(item => (
          <div key={item.key} className="flex items-center justify-between gap-4 py-4">
            <div className="min-w-0">
              <p className="text-sm font-semibold text-[#101828]">{item.title}</p>
              <p className="mt-1 text-xs leading-5 text-[#98A2B3]">{item.description}</p>
            </div>

            <div>
              <Switch
                disabled={isUpdating}
                checked={prefs[item.key]}
                onCheckedChange={value => handleChange(item.key, value)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
