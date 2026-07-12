'use client';

import { Check, X } from 'lucide-react';
import type { PlanFeature } from './types';

type PricingFeatureListProps = {
  features: PlanFeature[];
  highlighted: boolean;
};

export default function PricingFeatureList({ features, highlighted }: PricingFeatureListProps) {
  return (
    <div
      className={[
        'space-y-2.5 rounded-xl p-4',
        highlighted ? 'bg-[#DEF9CE]' : 'bg-[#F5F7FB]',
      ].join(' ')}
    >
      <p className="text-xs font-semibold text-[#101828]">What&apos;s Included:</p>

      {features.map(feature => (
        <div
          key={feature.label}
          className={[
            'flex items-center gap-2 text-[13px]',
            feature.included ? 'text-[#344054]' : 'text-[#98A2B3]',
          ].join(' ')}
        >
          {feature.included ? (
            <Check size={14} className="shrink-0 text-[#22C55E]" />
          ) : (
            <X size={14} className="shrink-0 text-[#C4C7CE]" />
          )}
          {feature.label}
        </div>
      ))}
    </div>
  );
}
