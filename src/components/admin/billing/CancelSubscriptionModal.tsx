'use client';

import { Loader2 } from 'lucide-react';
import { Modal } from '@/src/components/ui/modal';
import type { ApiSubscription } from '@/src/types/billingTypes';

type CancelSubscriptionModalProps = {
  subscription?: ApiSubscription;
  isOpen: boolean;
  isCancelling: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export default function CancelSubscriptionModal({
  subscription,
  isOpen,
  isCancelling,
  onClose,
  onConfirm,
}: CancelSubscriptionModalProps) {
  const planName = subscription?.planDisplayName ?? 'your plan';
  const renewsOn = subscription?.endDate
    ? new Date(subscription.endDate).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : 'the end of your billing period';

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-md p-6">
      <h3 className="text-lg font-semibold text-[#101828]">
        Cancel subscription?
      </h3>
      <p className="mt-2 text-sm text-[#667085]">
        You&apos;re about to cancel the{' '}
        <span className="font-medium text-[#101828]">{planName}</span> plan.
        You&apos;ll keep access until {renewsOn}, and it won&apos;t renew
        afterwards.
      </p>
      <div className="mt-6 flex justify-end gap-3">
        <button
          type="button"
          disabled={isCancelling}
          onClick={onClose}
          className="rounded-xl border border-[#E5E7EB] px-4 py-2 text-sm font-medium text-[#344054] transition hover:bg-[#F9FAFB] disabled:opacity-60"
        >
          Keep Subscription
        </button>
        <button
          type="button"
          disabled={isCancelling}
          onClick={onConfirm}
          className="inline-flex items-center gap-2 rounded-xl bg-[#DC2626] px-4 py-2 text-sm font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isCancelling ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          {isCancelling ? 'Cancelling…' : 'Yes, Cancel Subscription'}
        </button>
      </div>
    </Modal>
  );
}