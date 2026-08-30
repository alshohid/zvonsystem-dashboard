'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import TopTabs from '@/src/components/common/TopTabs';
import { useQueryState } from '@/src/lib/helper/useQueryState';
import { useTabsQueryState } from '@/src/lib/helper/useTabsQueryState';
import CancelSubscriptionModal from './CancelSubscriptionModal';
import CheckoutFlow from './CheckoutFlow';
import CurrentPlanCard from './CurrentPlanCard';
import InvoiceHistoryList from './InvoiceHistoryList';
import { CHECKOUT_STEP_TABS, MOCK_INVOICES } from './mockBillingData';
import { getErrorMessage } from '@/src/lib/getErrorMessage';
import {
  mapApiPlanToDisplayPlan,
  mapApiPlansToDisplayPlans,
} from '@/src/lib/billing/billingMapper';
import {
  useCancelSubscriptionMutation,
  useGetMySubscriptionQuery,
  useGetPlansQuery,
} from '@/src/redux/features/subscription/subscriptionApi';
// import PaymentMethodSummary from './PaymentMethodSummary';
import PaymentSuccessScreen from './PaymentSuccessScreen';
import PlanBillingToggle from './PlanBillingToggle';
import PricingCard from './PricingCard';
import type { BillingPeriod, PlanId } from './types';

type BillingView = 'landing' | 'checkout' | 'success';

export default function BillingContainer() {
  const router = useRouter();
  const [view, setView] = useTabsQueryState<BillingView>('view', 'landing');
  const [planParam, setPlanParam] = useQueryState('plan', '');
  const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>('monthly');
  const [cancelModalOpen, setCancelModalOpen] = useState(false);

  const {
    data: plansData,
    isLoading: isPlansLoading,
    isError: isPlansError,
    refetch: refetchPlans,
  } = useGetPlansQuery();

  const {
    data: subscriptionData,
    isLoading: isSubscriptionLoading,
  } = useGetMySubscriptionQuery();

  const [cancelSubscription, { isLoading: isCancelling }] =
    useCancelSubscriptionMutation();

  const subscription = subscriptionData?.data;
  const apiPlans = plansData?.data ?? [];
  const plans = mapApiPlansToDisplayPlans(apiPlans, billingPeriod);

  const selectedPlan =
    plans.find(plan => plan.id === planParam) ??
    (planParam
      ? (() => {
        const apiPlan =
          apiPlans.find(plan => plan.id === planParam) ??
          apiPlans.find(plan => plan.name === planParam.toUpperCase());
        return apiPlan ? mapApiPlanToDisplayPlan(apiPlan, billingPeriod) : null;
      })()
      : null);

  const effectiveView: BillingView =
    view === 'success' ? 'success' : selectedPlan ? 'checkout' : 'landing';

  const handleSelectPlan = (id: PlanId) => {
    setPlanParam(id);
  };

  const handleUpgrade = () => {
    const proPlan =
      plans.find(
        plan => plan.name.toLowerCase().startsWith('pro') && !plan.isCurrentPlan,
      ) ??
      plans.find(plan => plan.name.toLowerCase().startsWith('pro'));
    if (proPlan) setPlanParam(proPlan.id);
  };

  const openCancelModal = () => {
    setCancelModalOpen(true);
  };

  const confirmCancelSubscription = async () => {
    if (!subscription?.subscriptionId) return;

    try {
      await cancelSubscription(subscription.subscriptionId).unwrap();
      setCancelModalOpen(false);
      toast.success('Your subscription has been cancelled.');
    } catch (err) {
      toast.error(
        getErrorMessage(err, 'Failed to cancel subscription. Please try again.'),
      );
    }
  };

  return (
    <div className="space-y-6" data-tour="page-billing">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#98A2B3]">
          General
        </p>
        <h1 className="mt-1 text-2xl font-semibold text-[#101828]">Billing &amp; Plans</h1>
      </div>

      {effectiveView === 'success' && (
        <PaymentSuccessScreen
          onGoToDashboard={() => router.push('/admin/dashboard')}
        />
      )}

      {effectiveView === 'checkout' && selectedPlan && (
        <CheckoutFlow
          plan={selectedPlan}
          billingPeriod={billingPeriod}
          onBack={() => setPlanParam('')}
          onComplete={() => setView('success')}
        />
      )}

      {effectiveView === 'landing' && (
        <>
          <CurrentPlanCard
            subscription={subscription}
            isLoading={isSubscriptionLoading}
            onUpgrade={handleUpgrade}
            onCancel={openCancelModal}
            isCancelling={isCancelling}
          />

          <CancelSubscriptionModal
            subscription={subscription}
            isOpen={cancelModalOpen}
            isCancelling={isCancelling}
            onClose={() => !isCancelling && setCancelModalOpen(false)}
            onConfirm={confirmCancelSubscription}
          />

          <TopTabs variant="stepper" tabs={CHECKOUT_STEP_TABS} activeKey="plan" onChange={() => { }} />

          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-[1rem] font-semibold text-[#101828]">Plans</h2>
            <PlanBillingToggle value={billingPeriod} onChange={setBillingPeriod} />
          </div>

          {isPlansLoading ? (
            <div className="grid grid-cols-1 gap-4 md:gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {[0, 1, 2].map(index => (
                <div
                  key={index}
                  className="h-72 animate-pulse rounded-2xl border border-[#E9EDF5] bg-white p-5"
                />
              ))}
            </div>
          ) : isPlansError ? (
            <div className="rounded-2xl border border-[#FECDCA] bg-[#FEF3F2] p-5 text-sm text-[#B42318]">
              <p className="font-medium">Couldn&apos;t load plans</p>
              <p className="mt-1">Please try again in a moment.</p>
              <button
                type="button"
                onClick={refetchPlans}
                className="mt-3 rounded-md border border-[#FECDCA] px-3 py-1.5 text-xs font-medium hover:bg-[#FECDCA]/40"
              >
                Retry
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 md:gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {plans.map(plan => (
                <PricingCard key={plan.id} plan={plan} onSelect={handleSelectPlan} />
              ))}
            </div>
          )}

          {/* <PaymentMethodSummary onAddCard={handleUpgrade} /> */}

          <InvoiceHistoryList invoices={MOCK_INVOICES} />
        </>
      )}
    </div>
  );
}
