'use client';

import { useState } from 'react';
import { MOCK_ACCOUNT } from './mockSettings';
import { FIELD_INPUT_CLASSNAME, SettingsFieldRow, TextField } from './settingsFormControls';

export default function AccountSettingsTab() {
  const [email, setEmail] = useState(MOCK_ACCOUNT.email);
  const [passwords, setPasswords] = useState({ current: '', next: '', confirm: '' });

  return (
    <div className="rounded-2xl border border-[#E9EDF5] bg-white p-6 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
      <div className="divide-y divide-[#F0F2F7]">
        <SettingsFieldRow
          label="Email Address"
          description="Used for login and important notifications."
        >
          <div className="flex items-center gap-2">
            <TextField
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className={[FIELD_INPUT_CLASSNAME, 'flex-1'].join(' ')}
            />
            <button
              type="button"
              className="shrink-0 rounded-lg border border-[#E5E7EB] px-4 py-3 text-sm font-medium text-[#344054] transition-colors hover:bg-[#F9FAFB]"
            >
              Update
            </button>
          </div>
        </SettingsFieldRow>

        <SettingsFieldRow
          label="Password"
          description="Use a strong password you haven't used elsewhere."
        >
          <div className="space-y-3">
            <TextField
              type="password"
              placeholder="Current password"
              value={passwords.current}
              onChange={e => setPasswords(p => ({ ...p, current: e.target.value }))}
            />
            <TextField
              type="password"
              placeholder="New password"
              value={passwords.next}
              onChange={e => setPasswords(p => ({ ...p, next: e.target.value }))}
            />
            <TextField
              type="password"
              placeholder="Confirm new password"
              value={passwords.confirm}
              onChange={e => setPasswords(p => ({ ...p, confirm: e.target.value }))}
            />
            <button
              type="button"
              className="rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-[#101828] transition-opacity hover:opacity-90"
            >
              Change Password
            </button>
          </div>
        </SettingsFieldRow>

        <div className="pt-5">
          <h3 className="text-sm font-semibold text-[#101828]">Delete Account</h3>
          <p className="mt-1 max-w-md text-xs leading-5 text-[#98A2B3]">
            Permanently removes your account and all associated data. This cannot be undone.
          </p>
          <button
            type="button"
            className="mt-4 rounded-xl border border-[#FECDD3] px-4 py-2 text-sm font-medium text-[#DC2626] transition-colors hover:bg-[#FEF2F2]"
          >
            Request Account Deletion
          </button>
        </div>
      </div>
    </div>
  );
}
