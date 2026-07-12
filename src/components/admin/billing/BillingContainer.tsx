'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import TopTabs from '@/src/components/common/TopTabs';
import CheckoutFlow from './CheckoutFlow';
import CurrentPlanCard from './CurrentPlanCard';
import InvoiceHistoryList from './InvoiceHistoryList';
import { CHECKOUT_STEP_TABS, MOCK_INVOICES, MOCK_PLANS } from './mockBillingData';
import PaymentMethodSummary from './PaymentMethodSummary';
import PaymentSuccessScreen from './PaymentSuccessScreen';
import PlanBillingToggle from './PlanBillingToggle';
import PricingCard from './PricingCard';
import type { BillingPeriod, PlanId } from './types';

type BillingView = 'landing' | 'checkout' | 'success';

export default function BillingContainer() {
  const router = useRouter();
  const [view, setView] = useState<BillingView>('landing');
  const [selectedPlanId, setSelectedPlanId] = useState<PlanId | null>(null);
  const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>('monthly');

  const selectedPlan = MOCK_PLANS.find(plan => plan.id === selectedPlanId);

  const handleSelectPlan = (id: PlanId) => {
    setSelectedPlanId(id);
    setView('checkout');
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#98A2B3]">
          General
        </p>
        <h1 className="mt-1 text-2xl font-semibold text-[#101828]">Billing &amp; Plans</h1>
      </div>

      {view === 'success' && (
        <PaymentSuccessScreen onGoToDashboard={() => router.push('/admin/dashboard')} />
      )}

      {view === 'checkout' && selectedPlan && (
        <CheckoutFlow
          plan={selectedPlan}
          billingPeriod={billingPeriod}
          onBack={() => setView('landing')}
          onComplete={() => setView('success')}
        />
      )}

      {view === 'landing' && (
        <>
          <CurrentPlanCard
            planName="Free Plan"
            releasesRemainingLabel="2 of 3 free releases remaining"
            usedFraction={1 / 3}
            usedLabel="1/3 used"
            onUpgrade={() => handleSelectPlan('pro')}
          />

          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-[15px] font-semibold text-[#101828]">Plans</h2>
            <PlanBillingToggle value={billingPeriod} onChange={setBillingPeriod} />
          </div>

          <TopTabs variant="stepper" tabs={CHECKOUT_STEP_TABS} activeKey="plan" onChange={() => {}} />

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {MOCK_PLANS.map(plan => (
              <PricingCard key={plan.id} plan={plan} onSelect={handleSelectPlan} />
            ))}
          </div>

          <PaymentMethodSummary onAddCard={() => handleSelectPlan('pro')} />

          <InvoiceHistoryList invoices={MOCK_INVOICES} />
        </>
      )}
    </div>
  );
}
