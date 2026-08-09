'use client';

import type { ElementType } from 'react';
import { Building2, Coins, Music2, Zap } from 'lucide-react';
import Badge from '@/src/components/ui/badge/Badge';
import PricingFeatureList from './PricingFeatureList';
import type { Plan } from './types';

const PLAN_ICON: Record<Plan['icon'], ElementType> = {
  music: Music2,
  zap: Zap,
  coin: Coins,
  building: Building2,
};

type PricingCardProps = {
  plan: Plan;
  onSelect: (id: Plan['id']) => void;
};

export default function PricingCard({ plan, onSelect }: PricingCardProps) {
  const Icon = PLAN_ICON[plan.icon];

  return (
    <div
      className={[
        'flex flex-col gap-2.5 md:gap-4 rounded-2xl border p-2.5 md:p-5',
        plan.highlighted
          ? 'border-primary bg-[#EDFFE7]'
          : 'border-[#E9EDF5] bg-white shadow-[0_1px_2px_rgba(16,24,40,0.04)]',
      ].join(' ')}
    >
      <div
        className={[
          'flex h-9 w-9 items-center justify-center rounded-lg',
          plan.highlighted ? 'bg-[#101828] text-primary' : 'bg-[#F2F4F7] text-[#667085]',
        ].join(' ')}
      >
        <Icon size={16} className="size-5" />
      </div>

      <div>
        <h3 className="text-[15px] font-semibold text-[#101828]">{plan.name}</h3>
        <p className="mt-0.5 text-xs text-[#98A2B3]">{plan.tagline}</p>
      </div>

      <div className="flex items-end gap-1.5">
        <span className="text-3xl font-semibold text-[#101828]">
          ${plan.priceMonthly.toFixed(plan.priceMonthly % 1 === 0 ? 0 : 2)}
        </span>
        {plan.priceSuffix && (
          <span className="pb-1 text-sm text-[#98A2B3]">{plan.priceSuffix}</span>
        )}
        {plan.discountBadge && (
          <Badge variant="solid" color="dark" size="sm">
            {plan.discountBadge}
          </Badge>
        )}
      </div>
      {plan.billedAsLabel && (
        <p className="-mt-3 text-xs text-[#98A2B3]">{plan.billedAsLabel}</p>
      )}

      <PricingFeatureList features={plan.features} highlighted={plan.highlighted} />

      <button
        type="button"
        disabled={plan.ctaDisabled}
        onClick={() => onSelect(plan.id)}
        className={[
          'mt-auto rounded-md px-4 py-2.5 text-[1rem] font-medium bg-[#E9E9EA] transition-colors',
          plan.ctaDisabled
            ? 'cursor-not-allowed border border-[#E5E7EB]  text-[#98A2B3]'
            : plan.highlighted
              ? 'bg-primary text-[#101828] hover:opacity-90'
              : 'border border-[#D0D5DD] text-[#344054] hover:bg-[#F9FAFB]',
        ].join(' ')}
      >
        {plan.ctaLabel}
      </button>
    </div>
  );
}
