'use client';

import { useState } from 'react';
import { COUNTRY_OPTIONS, LANGUAGE_OPTIONS } from './mockSettings';
import { SelectField } from './settingsFormControls';

export default function RegionSettingsTab() {
  const [country, setCountry] = useState('');
  const [language, setLanguage] = useState('English');

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
    </div>
  );
}
