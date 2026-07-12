'use client';

import { Clock, ShieldCheck, Zap } from 'lucide-react';

const TRUST_BADGES = [
  { icon: ShieldCheck, title: 'Secure Payment', subtitle: '256-bit SSL encryption' },
  { icon: Zap, title: 'Instant Access', subtitle: 'Start using immediately' },
  { icon: Clock, title: '14 Day Trial', subtitle: 'Full refund guarantee' },
];

export default function TrustBadgeRow() {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      {TRUST_BADGES.map(badge => (
        <div
          key={badge.title}
          className="flex items-center gap-3 rounded-xl border border-[#E9EDF5] bg-white p-4"
        >
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#101828] text-primary">
            <badge.icon size={16} />
          </div>
          <div>
            <p className="text-[13px] font-semibold text-[#101828]">{badge.title}</p>
            <p className="text-xs text-[#98A2B3]">{badge.subtitle}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
