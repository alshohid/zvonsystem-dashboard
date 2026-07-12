'use client';

import { Download, Music2 } from 'lucide-react';
import Badge from '@/src/components/ui/badge/Badge';
import type { Invoice } from './types';

type InvoiceRowProps = {
  invoice: Invoice;
};

export default function InvoiceRow({ invoice }: InvoiceRowProps) {
  return (
    <div className="flex items-center gap-3 py-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#DCFCE7]">
        <Music2 size={14} className="text-[#22C55E]" />
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-[13px] font-semibold text-[#101828]">{invoice.planName}</p>
        <p className="truncate text-xs text-[#98A2B3]">
          {invoice.invoiceNumber} · {invoice.date}
        </p>
      </div>

      <div className="flex shrink-0 items-center gap-3">
        <span className="text-[13px] font-medium text-[#344054]">
          ${invoice.amount.toFixed(2)}
        </span>
        {invoice.isFree && (
          <Badge variant="light" color="success" size="sm">
            FREE
          </Badge>
        )}
        <button
          type="button"
          aria-label={`Download ${invoice.invoiceNumber}`}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-[#E5E7EB] text-[#667085] hover:bg-gray-50"
        >
          <Download size={14} />
        </button>
      </div>
    </div>
  );
}
