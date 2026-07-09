'use client';

import Image from 'next/image';
import { CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import { GENRE_OPTIONS, COUNTRY_OPTIONS, MOCK_PROFILE } from './mockSettings';
import {
  PrefixedTextField,
  SelectField,
  SettingsFieldRow,
  TextAreaField,
  TextField,
} from './settingsFormControls';

export default function ProfileSettingsTab() {
  const [profile, setProfile] = useState(MOCK_PROFILE);

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[300px_1fr]">
      <div className="overflow-hidden rounded-2xl border border-[#E9EDF5] bg-white shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
        <div className="bg-gradient-to-b from-[#DCFCE7] to-white px-6 pb-6 pt-8 text-center">
          <div className="mx-auto h-20 w-20 overflow-hidden rounded-full border-4 border-white shadow-sm">
            <Image
              src={profile.avatarUrl}
              alt={profile.artistName}
              width={80}
              height={80}
              className="h-full w-full object-cover"
            />
          </div>

          <h3 className="mt-3 text-[15px] font-semibold text-[#101828]">{profile.artistName}</h3>
          <p className="text-xs text-[#98A2B3]">{profile.handle}</p>

          {profile.verified ? (
            <p className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-[#15803D]">
              <CheckCircle2 className="h-3.5 w-3.5" strokeWidth={2} />
              Verified Artist
            </p>
          ) : null}
        </div>

        <div className="px-6 pb-6">
          <button
            type="button"
            className="w-full rounded-xl border border-[#E5E7EB] py-2 text-sm font-medium text-[#344054] transition-colors hover:bg-[#F9FAFB]"
          >
            Change Photo
          </button>

          <div className="mt-5 space-y-3 border-t border-[#F0F2F7] pt-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-[#667085]">Total Releases</span>
              <span className="font-medium text-[#101828]">{profile.totalReleases}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-[#667085]">Member Since</span>
              <span className="font-medium text-[#101828]">{profile.memberSince}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-[#667085]">Streams (Total)</span>
              <span className="font-medium text-[#101828]">{profile.totalStreams}</span>
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
              value={profile.artistName}
              onChange={e => setProfile(p => ({ ...p, artistName: e.target.value }))}
            />
          </SettingsFieldRow>

          <SettingsFieldRow label="Username" description="Your unique @handle on Discovod.">
            <PrefixedTextField
              prefix="@"
              value={profile.username}
              onChange={e => setProfile(p => ({ ...p, username: e.target.value }))}
            />
          </SettingsFieldRow>

          <SettingsFieldRow
            label="Bio"
            description="Up to 300 characters. Shown on your public artist page."
          >
            <TextAreaField
              maxLength={300}
              value={profile.bio}
              onChange={e => setProfile(p => ({ ...p, bio: e.target.value }))}
            />
          </SettingsFieldRow>

          <SettingsFieldRow label="Genre" description="Your primary genre shown on your profile.">
            <SelectField
              value={profile.genre}
              onChange={e => setProfile(p => ({ ...p, genre: e.target.value }))}
            >
              <option value="">Select Genre</option>
              {GENRE_OPTIONS.map(genre => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </SelectField>
          </SettingsFieldRow>

          <SettingsFieldRow label="Website" description="Your official website or link in bio.">
            <TextField
              value={profile.website}
              onChange={e => setProfile(p => ({ ...p, website: e.target.value }))}
            />
          </SettingsFieldRow>

          <SettingsFieldRow
            label="Country"
            description="Used for royalty reporting and territory defaults."
          >
            <SelectField
              value={profile.country}
              onChange={e => setProfile(p => ({ ...p, country: e.target.value }))}
            >
              <option value="">Select Country</option>
              {COUNTRY_OPTIONS.map(country => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </SelectField>
          </SettingsFieldRow>
        </div>

        <div className="flex justify-end pt-5">
          <button
            type="button"
            className="rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-[#101828] transition-opacity hover:opacity-90"
          >
            Save Profile
          </button>
        </div>
      </div>
    </div>
  );
}
