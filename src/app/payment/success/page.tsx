'use client';

import { Suspense, useEffect, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { CheckCircle2, Loader2 } from 'lucide-react';
import { useGetMySubscriptionQuery } from '@/src/redux/features/subscription/subscriptionApi';

const POLL_INTERVAL_MS = 1500;
const MAX_POLLS = 8;
const REDIRECT_DELAY_MS = 2500;


function PaymentSuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const subscriptionId = searchParams.get('subscription_id') ?? undefined;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const baToken = searchParams.get('ba_token') ?? undefined;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const token = searchParams.get('token') ?? undefined;

  const { refetch } = useGetMySubscriptionQuery();
  const [confirmed, setConfirmed] = useState(false);
  const pollCountRef = useRef(0);
  const confirmedRef = useRef(false);

  useEffect(() => {
    let cancelled = false;

    const stop = () => {
      if (!cancelled) {
        confirmedRef.current = true;
        setConfirmed(true);
      }
    };

    const poll = async () => {
      if (cancelled || confirmedRef.current) return;
      pollCountRef.current += 1;

      try {
        await refetch();
      } catch {
        // Ignore transient polling failures – confirm after max attempts.
      }

      if (pollCountRef.current >= MAX_POLLS) {
        stop();
      }
    };

    // Start polling immediately and keep going at a fixed interval.
    poll();
    const interval = window.setInterval(poll, POLL_INTERVAL_MS);

    return () => {
      cancelled = true;
      window.clearInterval(interval);
    };
  }, [refetch]);

  // Auto-redirect once the subscription has been confirmed.
  useEffect(() => {
    if (!confirmed) return;

    const timeout = window.setTimeout(() => {
      router.replace('/admin/dashboard');
    }, REDIRECT_DELAY_MS);

    return () => window.clearTimeout(timeout);
  }, [confirmed, router]);

  const handleGoToDashboard = () => {
    router.replace('/admin/dashboard');
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-10">
      <div className="w-full max-w-md rounded-2xl border border-[#E9EDF5] bg-white px-6 py-12 text-center shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
        {!confirmed ? (
          <>
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#F2F4F7]">
              <Loader2 size={24} className="animate-spin text-[#667085]" />
            </div>
            <h1 className="mt-6 text-xl font-bold text-[#101828]">
              Confirming your subscription…
            </h1>
            <p className="mt-2 text-sm text-[#667085]">
              We&apos;re verifying your payment
              {subscriptionId ? ` (ref ${subscriptionId})` : ''}. This should
              only take a few seconds.
            </p>
          </>
        ) : (
          <>
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#DCFCE7]">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white">
                <CheckCircle2 size={20} />
              </div>
            </div>
            <h1 className="mt-6 text-xl font-bold text-[#101828]">
              Payment Successful!
            </h1>
            <p className="mt-2 text-sm text-[#667085]">
              Your subscription is now active. Taking you to your dashboard…
            </p>
            <button
              type="button"
              onClick={handleGoToDashboard}
              className="mt-6 w-full rounded-xl bg-primary px-6 py-3 text-[13px] font-semibold text-[#101828] hover:opacity-90"
            >
              Go to Dashboard
            </button>
          </>
        )}
      </div>
    </main>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={null}>
      <PaymentSuccessContent />
    </Suspense>
  );
}