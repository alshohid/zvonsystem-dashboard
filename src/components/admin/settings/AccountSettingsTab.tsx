'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AlertTriangle, Loader2, RefreshCw } from 'lucide-react';
import toast from 'react-hot-toast';
import { Modal } from '@/src/components/ui/modal';
import { getErrorMessage } from '@/src/lib/getErrorMessage';
import { authRoutes } from '@/src/lib/auth/config';
import { useAuth } from '@/src/redux/features/auth/hooks';
import {
  useChangePasswordMutation,
  useDeleteAccountMutation,
  useGetAccountSettingsQuery,
} from '@/src/redux/features/settings/settingsApi';
import { AccountSettingsSkeleton } from './SettingsSkeletons';
import { FIELD_INPUT_CLASSNAME, SettingsFieldRow, TextField } from './settingsFormControls';

export default function AccountSettingsTab() {
  const router = useRouter();
  const { logOut } = useAuth();
  const { data, isLoading, isFetching, isError, error, refetch } =
    useGetAccountSettingsQuery();
  const [changePassword, { isLoading: isChangingPassword }] =
    useChangePasswordMutation();
  const [deleteAccount, { isLoading: isDeleting }] = useDeleteAccountMutation();

  const account = data?.data;
  const [passwords, setPasswords] = useState({
    current: '',
    next: '',
    confirm: '',
  });
  const [deleteOpen, setDeleteOpen] = useState(false);

  useEffect(() => {
    setPasswords({ current: '', next: '', confirm: '' });
  }, [account?.id]);

  const handleChangePassword = async () => {
    if (!passwords.current || !passwords.next || !passwords.confirm) {
      toast.error('Fill in all password fields.');
      return;
    }

    if (passwords.next.length < 8) {
      toast.error('New password must be at least 8 characters.');
      return;
    }

    if (passwords.next !== passwords.confirm) {
      toast.error('New password and confirmation do not match.');
      return;
    }

    try {
      await changePassword({
        current_password: passwords.current,
        new_password: passwords.next,
        confirm_password: passwords.confirm,
      }).unwrap();
      setPasswords({ current: '', next: '', confirm: '' });
      toast.success('Password changed.');
    } catch (passwordError) {
      toast.error(
        getErrorMessage(passwordError, 'Could not change your password.'),
      );
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await deleteAccount().unwrap();
      setDeleteOpen(false);
      toast.success('Account deleted.');
      await logOut();
      router.replace(authRoutes.login);
    } catch (deleteError) {
      toast.error(
        getErrorMessage(deleteError, 'Could not delete your account.'),
      );
    }
  };

  if (isLoading || (isFetching && !account)) {
    return <AccountSettingsSkeleton />;
  }

  if (isError || !account) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-[#F2B7B7] bg-[#FFF1F1] p-10 text-center">
        <AlertTriangle size={28} className="text-[#DC2626]" />
        <p className="text-sm font-medium text-[#101828]">
          {getErrorMessage(error, 'Could not load account settings.')}
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
    <>
      <div className="rounded-2xl border border-[#E9EDF5] bg-white p-6 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
        <div className="divide-y divide-[#F0F2F7]">
          <SettingsFieldRow
            label="Email Address"
            description="Used for login and important notifications."
          >
            <TextField
              type="email"
              value={account.email ?? ''}
              readOnly
              className={[FIELD_INPUT_CLASSNAME, 'cursor-default bg-[#EEF1F7]'].join(
                ' ',
              )}
            />
          </SettingsFieldRow>

          <SettingsFieldRow
            label="Password"
            description="Use a strong password you haven't used elsewhere."
          >
            <div className="space-y-3">
              <TextField
                type="password"
                placeholder="Current password"
                autoComplete="current-password"
                value={passwords.current}
                onChange={e =>
                  setPasswords(prev => ({ ...prev, current: e.target.value }))
                }
              />
              <TextField
                type="password"
                placeholder="New password"
                autoComplete="new-password"
                value={passwords.next}
                onChange={e =>
                  setPasswords(prev => ({ ...prev, next: e.target.value }))
                }
              />
              <TextField
                type="password"
                placeholder="Confirm new password"
                autoComplete="new-password"
                value={passwords.confirm}
                onChange={e =>
                  setPasswords(prev => ({ ...prev, confirm: e.target.value }))
                }
              />
              <button
                type="button"
                disabled={isChangingPassword}
                onClick={handleChangePassword}
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-[#101828] transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isChangingPassword ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : null}
                {isChangingPassword ? 'Updating…' : 'Change Password'}
              </button>
            </div>
          </SettingsFieldRow>

          <div className="pt-5">
            <h3 className="text-sm font-semibold text-[#101828]">
              Delete Account
            </h3>
            <p className="mt-1 max-w-md text-xs leading-5 text-[#98A2B3]">
              Permanently removes your account and all associated data. This
              cannot be undone.
            </p>
            <button
              type="button"
              onClick={() => setDeleteOpen(true)}
              className="mt-4 rounded-xl border border-[#FECDD3] px-4 py-2 text-sm font-medium text-[#DC2626] transition-colors hover:bg-[#FEF2F2]"
            >
              Request Account Deletion
            </button>
          </div>
        </div>
      </div>

      <Modal
        isOpen={deleteOpen}
        onClose={() => !isDeleting && setDeleteOpen(false)}
        className="max-w-md p-6"
      >
        <h3 className="text-lg font-semibold text-[#101828]">Delete account?</h3>
        <p className="mt-2 text-sm text-[#667085]">
          This permanently deletes your account
          {account.email ? ` (${account.email})` : ''} and cannot be undone.
        </p>
        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            disabled={isDeleting}
            onClick={() => setDeleteOpen(false)}
            className="rounded-xl border border-[#E5E7EB] px-4 py-2 text-sm font-medium text-[#344054] transition hover:bg-[#F9FAFB] disabled:opacity-60"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={isDeleting}
            onClick={handleDeleteAccount}
            className="inline-flex items-center gap-2 rounded-xl bg-[#DC2626] px-4 py-2 text-sm font-medium text-white transition hover:opacity-90 disabled:opacity-60"
          >
            {isDeleting ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
            {isDeleting ? 'Deleting…' : 'Delete account'}
          </button>
        </div>
      </Modal>
    </>
  );
}
