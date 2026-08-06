/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import { useEffect, useState } from 'react';
import { AlertTriangle, Loader2, RefreshCw } from 'lucide-react';
import toast from 'react-hot-toast';
import { getErrorMessage } from '@/src/lib/getErrorMessage';
import {
  useGetSettingsRegionQuery,
  useUpdateSettingsRegionMutation,
} from '@/src/redux/features/settings/settingsApi';
import { COUNTRY_OPTIONS, LANGUAGE_OPTIONS } from './mockSettings';
import { SelectField } from './settingsFormControls';

function RegionSettingsSkeleton() {
  const shimmer = 'animate-pulse bg-[#EEF1F7]';
  return (
    <div className="rounded-2xl border border-[#E9EDF5] bg-white p-6 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
      <div className={`${shimmer} h-5 w-40 rounded-md`} />
      <div className={`${shimmer} mt-2 h-3.5 w-64 rounded-md`} />

      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <div className={`${shimmer} h-4 w-20 rounded-md`} />
          <div className={`${shimmer} h-11 w-full rounded-lg`} />
        </div>
        <div className="space-y-2">
          <div className={`${shimmer} h-4 w-20 rounded-md`} />
          <div className={`${shimmer} h-11 w-full rounded-lg`} />
        </div>
      </div>

      <div className="mt-6 flex justify-end border-t border-[#F0F2F7] pt-5">
        <div className={`${shimmer} h-10 w-28 rounded-xl`} />
      </div>
    </div>
  );
}

export default function RegionSettingsTab() {
  const { data, isLoading, isFetching, isError, error, refetch } = useGetSettingsRegionQuery();
  const [updateRegion, { isLoading: isSaving }] = useUpdateSettingsRegionMutation();

  const [country, setCountry] = useState('');
  const [language, setLanguage] = useState('English');

  const region = data?.data;

  useEffect(() => {
    if (region) {
      setCountry(region.country || '');
      setLanguage(region.language || 'English');
    }
  }, [region]);

  const handleSave = async () => {
    try {
      await updateRegion({
        country,
        language,
      }).unwrap();
      toast.success('Region settings saved.');
    } catch (saveError) {
      toast.error(getErrorMessage(saveError, 'Could not save region settings.'));
    }
  };

  if (isLoading || (isFetching && !region)) {
    return <RegionSettingsSkeleton />;
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-[#F2B7B7] bg-[#FFF1F1] p-10 text-center">
        <AlertTriangle size={28} className="text-[#DC2626]" />
        <p className="text-sm font-medium text-[#101828]">
          {getErrorMessage(error, 'Could not load region settings.')}
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
    <div className="rounded-2xl border border-[#E9EDF5] bg-white p-6 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
      <h3 className="text-[15px] font-semibold text-[#101828]">Region &amp; Language</h3>
      <p className="mt-1 text-xs text-[#98A2B3]">Set your country and language preferences</p>

      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <p className="mb-2 text-sm font-medium text-[#101828]">Country</p>
          <SelectField value={country} onChange={e => setCountry(e.target.value)}>
            <option value="">Select Country</option>
            {COUNTRY_OPTIONS.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </SelectField>
        </div>

        <div>
          <p className="mb-2 text-sm font-medium text-[#101828]">Language</p>
          <SelectField value={language} onChange={e => setLanguage(e.target.value)}>
            {LANGUAGE_OPTIONS.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </SelectField>
        </div>
      </div>

      <div className="mt-6 flex justify-end border-t border-[#F0F2F7] pt-5">
        <button
          type="button"
          disabled={isSaving}
          onClick={handleSave}
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-[#101828] transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          {isSaving ? 'Saving…' : 'Save Region'}
        </button>
      </div>
    </div>
  );
}
