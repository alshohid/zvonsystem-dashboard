'use client';

import Badge from '@/src/components/ui/badge/Badge';
import { CloudPaymentsIcon, PayPalIcon } from '@/src/icons';
import type { PaymentGateway, PaymentGatewayOption } from './types';

type PaymentMethodOptionProps = {
  gateway: PaymentGatewayOption;
  selected: boolean;
  onSelect: (gateway: PaymentGateway) => void;
};

export default function PaymentMethodOption({
  gateway,
  selected,
  onSelect,
}: PaymentMethodOptionProps) {
  const isPayPal = gateway.gateway === 'PAYPAL';

  return (
    <label
      className={[
        'relative flex w-full min-w-0 cursor-pointer items-start gap-3 rounded-2xl border bg-white p-4 transition-all',
        selected
          ? 'border-[#22C55E] shadow-[0_1px_4px_rgba(34,197,94,0.25),0_1px_2px_rgba(16,24,40,0.04)]'
          : 'border-[#E9EDF5] hover:border-[#D0D5DD] hover:bg-[#F9FAFB]',
      ].join(' ')}
    >
      <input
        type="radio"
        name="payment-gateway"
        value={gateway.gateway}
        checked={selected}
        onChange={() => onSelect(gateway.gateway)}
        className="sr-only"
      />

      <span
        className={[
          'mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2',
          selected ? 'border-[#22C55E] bg-[#22C55E]' : 'border-[#D0D5DD] bg-white',
        ].join(' ')}
      >
        {selected && <span className="h-2 w-2 rounded-full bg-white" />}
      </span>

      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <span className="flex min-w-0 items-center gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#F2F4F7]">
              {isPayPal ? (
                <PayPalIcon className="h-6 w-6" />
              ) : (
                <CloudPaymentsIcon className="h-6 w-6" />
              )}
            </span>
            <span className="min-w-0">
              <span className="block text-sm font-semibold text-[#101828]">
                {gateway.label}
              </span>
              <span className="mt-0.5 block text-[13px] leading-snug text-[#667085]">
                {gateway.description}
              </span>
            </span>
          </span>

          {gateway.isDefault && (
            <span className="shrink-0">
              <Badge variant="solid" color="success" size="sm">
                Default
              </Badge>
            </span>
          )}
        </div>
      </div>
    </label>
  );
}