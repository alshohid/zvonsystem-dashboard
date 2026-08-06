/* eslint-disable react-hooks/preserve-manual-memoization */
/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { AlertTriangle, CheckCircle2, Loader2, RefreshCw, User } from 'lucide-react';
import toast from 'react-hot-toast';
import {
  GENRE_OPTIONS,
  TERRITORY_REGIONS,
  getGenreLabel,
} from '@/src/components/admin/releases/releaseFormOptions';
import { resolveAvatarUrl } from '@/src/lib/env';
import { getErrorMessage } from '@/src/lib/getErrorMessage';
import {
  useGetAccountSettingsQuery,
  useGetProfileQuery,
  useUpdateProfileMutation,
  useUploadProfileAvatarMutation,
} from '@/src/redux/features/settings/settingsApi';
import type { ApiProfile } from '@/src/types/settingsTypes';
import type { ReleaseGenre } from '@/src/types/releaseTypes';
import { ProfileSettingsSkeleton } from './SettingsSkeletons';
import {
  PrefixedTextField,
  SelectField,
  SettingsFieldRow,
  TextAreaField,
  TextField,
} from './settingsFormControls';

type ProfileFormState = {
  name: string;
  username: string;
  bio: string;
  genre: string;
  website: string;
  country: string;
  location: string;
};

const toFormState = (profile: ApiProfile): ProfileFormState => ({
  name: profile.name ?? '',
  username: (profile.username ?? '').replace(/^@/, ''),
  bio: profile.bio ?? '',
  genre: profile.genre ?? '',
  website: profile.website ?? '',
  country: profile.country ?? '',
  location: profile.location ?? '',
});

const isValidWebsite = (value: string) => {
  const trimmed = value.trim();
  if (!trimmed) return true;
  try {
    const url = new URL(trimmed.includes('://') ? trimmed : `https://${trimmed}`);
    return Boolean(url.hostname);
  } catch {
    return false;
  }
};

const normalizeWebsite = (value: string) => {
  const trimmed = value.trim();
  if (!trimmed) return null;
  return trimmed.includes('://') ? trimmed : `https://${trimmed}`;
};

const COUNTRY_OPTIONS = TERRITORY_REGIONS.flatMap(region => region.countries)
  .filter(
    (country, index, list) =>
      list.findIndex(item => item.code === country.code) === index,
  )
  .sort((a, b) => a.label.localeCompare(b.label));

const formatMemberSince = (value: string | null | undefined) => {
  if (!value) return '—';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '—';
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
};

export default function ProfileSettingsTab() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const {
    data,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useGetProfileQuery();
  const accountQuery = useGetAccountSettingsQuery();
  const [updateProfile, { isLoading: isSaving }] = useUpdateProfileMutation();
  const [uploadAvatar, { isLoading: isUploadingAvatar }] =
    useUploadProfileAvatarMutation();

  const profile = data?.data;
  const [form, setForm] = useState<ProfileFormState | null>(null);

  useEffect(() => {
    if (!profile) return;
    setForm(toFormState(profile));
  }, [profile]);

  const avatarUrl = useMemo(
    () => resolveAvatarUrl(profile?.avatar),
    [profile?.avatar],
  );

  const genreSelectValue = useMemo(() => {
    if (!form?.genre) return '';
    const match = GENRE_OPTIONS.find(
      option =>
        option.value === form.genre ||
        option.label.toLowerCase() === form.genre.toLowerCase(),
    );
    return match?.value ?? form.genre;
  }, [form?.genre]);

  const patchForm = (patch: Partial<ProfileFormState>) => {
    setForm(prev => (prev ? { ...prev, ...patch } : prev));
  };

  const handleSave = async () => {
    if (!form) return;

    if (!form.name.trim()) {
      toast.error('Artist name is required.');
      return;
    }

    if (!form.username.trim()) {
      toast.error('Username is required.');
      return;
    }

    if (!isValidWebsite(form.website)) {
      toast.error('Enter a valid website URL.');
      return;
    }

    try {
      await updateProfile({
        name: form.name.trim(),
        username: form.username.trim().replace(/^@/, ''),
        bio: form.bio.trim(),
        genre: form.genre ?? null,
        // Empty website must be JSON `null`, never `""`.
        website: normalizeWebsite(form.website),
        country: form.country ?? null,
        location: form.location.trim(),
      }).unwrap();
      toast.success('Profile saved.');
    } catch (saveError) {
      toast.error(getErrorMessage(saveError, 'Could not save your profile.'));
    }
  };

  const handleAvatarChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please choose an image file.');
      return;
    }

    const body = new FormData();
    body.append('avatar', file);

    try {
      await uploadAvatar(body).unwrap();
      toast.success('Photo updated.');
    } catch (uploadError) {
      toast.error(getErrorMessage(uploadError, 'Could not upload the photo.'));
    }
  };

  if (isLoading || (isFetching && !profile)) {
    return <ProfileSettingsSkeleton />;
  }

  if (isError || !profile || !form) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-[#F2B7B7] bg-[#FFF1F1] p-10 text-center">
        <AlertTriangle size={28} className="text-[#DC2626]" />
        <p className="text-sm font-medium text-[#101828]">
          {getErrorMessage(error, 'Could not load your profile.')}
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

  const displayName = form.name || profile.name || 'Artist';
  const handle = `@${form.username || profile.username || 'user'}`;
  const isVerified = Boolean(accountQuery.data?.data.email_verified_at);

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[300px_1fr]">
      <div className="overflow-hidden rounded-2xl border border-[#E9EDF5] bg-white shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
        <div className="bg-gradient-to-b from-[#DCFCE7] to-white px-6 pb-6 pt-8 text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center overflow-hidden rounded-full border-4 border-white bg-[#F2F4F7] shadow-sm">
            {avatarUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={avatarUrl}
                alt={displayName}
                className="h-full w-full object-cover"
              />
            ) : (
              <User className="h-8 w-8 text-[#98A2B3]" strokeWidth={1.5} />
            )}
          </div>

          <h3 className="mt-3 text-[15px] font-semibold text-[#101828]">
            {displayName}
          </h3>
          <p className="text-xs text-[#98A2B3]">{handle}</p>

          {isVerified ? (
            <p className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-[#15803D]">
              <CheckCircle2 className="h-3.5 w-3.5" strokeWidth={2} />
              Verified Artist
            </p>
          ) : null}
        </div>

        <div className="px-6 pb-6">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleAvatarChange}
          />
          <button
            type="button"
            disabled={isUploadingAvatar}
            onClick={() => fileInputRef.current?.click()}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[#E5E7EB] py-2 text-sm font-medium text-[#344054] transition-colors hover:bg-[#F9FAFB] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isUploadingAvatar ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : null}
            {isUploadingAvatar ? 'Uploading…' : 'Change Photo'}
          </button>

          <div className="mt-5 space-y-3 border-t border-[#F0F2F7] pt-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-[#667085]">Email</span>
              <span className="max-w-[55%] truncate font-medium text-[#101828]">
                {profile.email || '—'}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-[#667085]">Member Since</span>
              <span className="font-medium text-[#101828]">
                {formatMemberSince(accountQuery.data?.data.created_at)}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-[#E9EDF5] bg-white p-6 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
        <div className="divide-y divide-[#F0F2F7]">
          <SettingsFieldRow
            label="Artist Name"
            description="This appears on all your releases and your public profile."
          >
            <TextField
              value={form.name}
              onChange={e => patchForm({ name: e.target.value })}
            />
          </SettingsFieldRow>

          <SettingsFieldRow
            label="Username"
            description="Your unique @handle on Discovod."
          >
            <PrefixedTextField
              prefix="@"
              value={form.username}
              onChange={e =>
                patchForm({ username: e.target.value.replace(/^@/, '') })
              }
            />
          </SettingsFieldRow>

          <SettingsFieldRow
            label="Bio"
            description="Up to 300 characters. Shown on your public artist page."
          >
            <TextAreaField
              maxLength={300}
              value={form.bio}
              onChange={e => patchForm({ bio: e.target.value })}
            />
          </SettingsFieldRow>

          <SettingsFieldRow
            label="Genre"
            description="Your primary genre shown on your profile."
          >
            <SelectField
              value={genreSelectValue}
              onChange={e => patchForm({ genre: e.target.value })}
            >
              <option value="">Select Genre</option>
              {GENRE_OPTIONS.map(genre => (
                <option key={genre.value} value={genre.value}>
                  {genre.label}
                </option>
              ))}
              {genreSelectValue &&
              !GENRE_OPTIONS.some(option => option.value === genreSelectValue) ? (
                <option value={genreSelectValue}>
                  {getGenreLabel(genreSelectValue as ReleaseGenre) ||
                    genreSelectValue}
                </option>
              ) : null}
            </SelectField>
          </SettingsFieldRow>

          <SettingsFieldRow
            label="Website"
            description="Your official website or link in bio."
          >
            <TextField
              value={form.website}
              placeholder="https://example.com"
              onChange={e => patchForm({ website: e.target.value })}
            />
          </SettingsFieldRow>

          <SettingsFieldRow
            label="Country"
            description="Used for royalty reporting and territory defaults."
          >
            <SelectField
              value={form.country}
              onChange={e => patchForm({ country: e.target.value })}
            >
              <option value="">Select Country</option>
              {COUNTRY_OPTIONS.map(country => (
                <option key={country.code} value={country.code}>
                  {country.label}
                </option>
              ))}
              {form.country &&
              !COUNTRY_OPTIONS.some(country => country.code === form.country) ? (
                <option value={form.country}>{form.country}</option>
              ) : null}
            </SelectField>
          </SettingsFieldRow>

          <SettingsFieldRow
            label="Location"
            description="City or region shown on your public profile."
          >
            <TextField
              value={form.location}
              placeholder="Mumbai, India"
              onChange={e => patchForm({ location: e.target.value })}
            />
          </SettingsFieldRow>
        </div>

        <div className="flex justify-end pt-5">
          <button
            type="button"
            disabled={isSaving}
            onClick={handleSave}
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-[#101828] transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
            {isSaving ? 'Saving…' : 'Save Profile'}
          </button>
        </div>
      </div>
    </div>
  );
}
