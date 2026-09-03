'use client';

import type { ElementType } from 'react';
import { Building2, Coins, Music2, Zap } from 'lucide-react';
import OrderSummaryCard from './OrderSummaryCard';
import PricingFeatureList from './PricingFeatureList';
import StepNavigation from './StepNavigation';
import TrustBadgeRow from './TrustBadgeRow';
import type { BillingPeriod, Plan } from './types';

const PLAN_ICON: Record<Plan['icon'], ElementType> = {
  music: Music2,
  zap: Zap,
  coin: Coins,
  building: Building2,
};

type ChoosePlanStepProps = {
  plan: Plan;
  billingPeriod: BillingPeriod;
  onNext: () => void;
  isBusy?: boolean;
};

export default function ChoosePlanStep({
  plan,
  billingPeriod,
  onNext,
  isBusy = false,
}: ChoosePlanStepProps) {
  const Icon = PLAN_ICON[plan.icon];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.3fr_1fr]">
        <div className="rounded-2xl border border-primary bg-[#EFFEE6] p-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#101828] text-primary">
            <Icon size={18} />
          </div>
          <h2 className="mt-3 text-xl font-semibold text-[#101828]">{plan.name} Plan</h2>
          <p className="mt-1 text-sm text-[#667085]">{plan.tagline}</p>

          <div className="mt-4">
            <PricingFeatureList features={plan.features} highlighted={plan.highlighted} />
          </div>
        </div>

        <OrderSummaryCard
          plan={plan}
          billingPeriod={billingPeriod}
          ctaLabel={plan.ctaLabel}
          onCta={onNext}
        />
      </div>

      <TrustBadgeRow />

      {/* First step: no previous button, "Next" is the validated continue action. */}
      <StepNavigation onNext={onNext} nextLabel="Continue to Details" isBusy={isBusy} />
    </div>
  );
}
