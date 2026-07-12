'use client';

import InvoiceRow from './InvoiceRow';
import type { Invoice } from './types';

type InvoiceHistoryListProps = {
  invoices: Invoice[];
};

export default function InvoiceHistoryList({ invoices }: InvoiceHistoryListProps) {
  return (
    <div className="rounded-2xl border border-[#E9EDF5] bg-white p-5 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
      <div className="flex items-center justify-between">
        <h3 className="text-[13px] font-semibold uppercase tracking-wide text-[#667085]">
          Invoice History
        </h3>
        <button type="button" className="text-[13px] font-medium text-[#667085] hover:text-[#101828]">
          Export all
        </button>
      </div>

      <div className="divide-y divide-[#EEF2ED]">
        {invoices.map(invoice => (
          <InvoiceRow key={invoice.id} invoice={invoice} />
        ))}
      </div>
    </div>
  );
}
