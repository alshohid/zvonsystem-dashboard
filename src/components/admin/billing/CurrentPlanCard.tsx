'use client';

import { Music2 } from 'lucide-react';
import type { ApiSubscription } from '@/src/types/billingTypes';

type CurrentPlanCardProps = {
  subscription?: ApiSubscription;
  isLoading?: boolean;
  onUpgrade: () => void;
  onCancel: () => void;
  isCancelling?: boolean;
};

export default function CurrentPlanCard({
  subscription,
  isLoading = false,
  onUpgrade,
  onCancel,
  isCancelling = false,
}: CurrentPlanCardProps) {
  if (isLoading && !subscription) {
    return (
      <div className="rounded-2xl border border-[#E9EDF5] bg-white p-5 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
        <div className="h-5 w-44 animate-pulse rounded bg-[#F2F4F7]" />
        <div className="mt-4 h-2 w-full max-w-2xl animate-pulse rounded-full bg-[#F2F4F7]" />
      </div>
    );
  }

  const isFree = subscription
    ? subscription.isFreePlan || subscription.price === 0
    : true;
  const planName = subscription?.planDisplayName ?? 'Free Plan';

  const releasesLimit = subscription?.releasesLimit ?? 3;
  const releasesUsed = subscription?.releasesUsed ?? 0;
  const releasesRemaining = subscription?.releasesRemaining ?? Math.max(releasesLimit - releasesUsed, 0);
  const progressPercentage =
    subscription?.progressPercentage ??
    Math.round(
      Math.min(
        1,
        Math.max(0, releasesLimit > 0 ? releasesUsed / releasesLimit : 0),
      ) * 100,
    );

  const renewsOn = subscription?.endDate
    ? new Date(subscription.endDate).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : '';

  return (
    <div className="rounded-2xl border border-[#E9EDF5] bg-white p-5 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#F2F4F7]">
            <Music2 size={18} className="text-[#667085]" />
          </div>
          <div>
            <p className="text-xs font-light uppercase tracking-[0.14em] text-[#777980]">
              Current Plan
            </p>
            <h2 className="text-[1rem] font-semibold text-[#101828]">{planName}</h2>
            {isFree ? (
              <p className="text-xs text-[#98A2B3]">
                {releasesRemaining} of {releasesLimit} free releases remaining
              </p>
            ) : (
              <p className="text-xs text-[#98A2B3]">
                {subscription?.autoRenew ? 'Auto-renews' : 'Renews'} on {renewsOn}
              </p>
            )}
          </div>
        </div>

        {isFree ? (
          <button
            type="button"
            onClick={onUpgrade}
            className="rounded-full bg-primary px-5 py-2 text-[13px] font-medium text-[#101828] hover:opacity-90"
          >
            Upgrade to Pro
          </button>
        ) : (
          <button
            type="button"
            disabled={isCancelling}
            onClick={onCancel}
            className="rounded-full border border-[#FDA29B] px-5 py-2 text-[13px] font-medium text-[#B42318] hover:bg-[#FEF3F2] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isCancelling ? 'Cancelling…' : 'Cancel Subscription'}
          </button>
        )}
      </div>

      {isFree && (
        <div className="mt-4 flex items-center gap-3">
          <div className="h-1.5 max-w-2xl w-full flex-1 overflow-hidden rounded-full bg-[#EAECF0]">
            <div
              className="h-full rounded-full bg-primary"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <span className="shrink-0 text-xs text-[#98A2B3]">
            {releasesUsed}/{releasesLimit} used
          </span>
        </div>
      )}
    </div>
  );
}
