'use client';

import Badge from '@/src/components/ui/badge/Badge';
import type { BillingPeriod } from './types';

type PlanBillingToggleProps = {
  value: BillingPeriod;
  onChange: (value: BillingPeriod) => void;
};

export default function PlanBillingToggle({ value, onChange }: PlanBillingToggleProps) {
  return (
    <div className="inline-flex items-center gap-1 rounded-full border border-[#E5E7EB] bg-white p-1">
      <button
        type="button"
        onClick={() => onChange('monthly')}
        className={[
          'rounded-full px-3 py-1.5 text-xs font-medium transition-colors',
          value === 'monthly' ? 'bg-primary text-[#101828]' : 'text-[#667085]',
        ].join(' ')}
      >
        Monthly
      </button>
      <button
        type="button"
        onClick={() => onChange('annual')}
        className={[
          'flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors',
          value === 'annual' ? 'bg-primary text-[#101828]' : 'text-[#667085]',
        ].join(' ')}
      >
        Annual
        <Badge variant="solid" color="dark" size="sm">
          Save 20%
        </Badge>
      </button>
    </div>
  );
}
