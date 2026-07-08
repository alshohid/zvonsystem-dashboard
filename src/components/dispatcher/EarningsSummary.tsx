'use client';

import { InvoiceIcon } from '@/src/icons';
import { DollarSign } from 'lucide-react';

interface SmallEarningCardProps {
  amount: string;
  label: string;
}

interface BreakdownRowProps {
  label: string;
  value: string;
  bold?: boolean;
}

function SmallEarningCard({ amount, label }: SmallEarningCardProps) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-[#E6EAF2] bg-[#F8F9FC] px-4 py-9">
      <div className="flex h-12 w-12 items-center justify-center rounded-[8px] bg-[#C9CCE9] text-[#3C478F]">
        <InvoiceIcon size={8} />
      </div>
      <div>
        <p className="text-[22px] font-semibold leading-none text-[#1F2430]">
          {amount}
        </p>
        <p className="mt-1 text-xs text-[#8A94A6]">{label}</p>
      </div>
    </div>
  );
}

function BreakdownRow({ label, value, bold = false }: BreakdownRowProps) {
  return (
    <div
      className={`flex items-center justify-between border-b border-[#EEF1F6] py-3 ${
        bold ? 'font-semibold text-[#1F2430]' : 'text-[#6F7A8E]'
      }`}
    >
      <span className="text-sm">{label}</span>
      <span className="text-sm">{value}</span>
    </div>
  );
}

export default function EarningsSummary() {
  return (
    <section className="space-y-4">
      <div className="rounded-2xl border border-[#E6EAF2] bg-white p-4">
        <div className="flex items-start justify-between gap-4">
          <div className="py-4">
            <h3 className="text-[18px] font-semibold text-[#1F2430]">
              Your Dispatch Earnings
            </h3>
            <p className="mt-1 text-sm text-[#8A94A6] flex items-center gap-4">
              Based on 10% dispatch fee{' '}
              <span className="ml-2">
                <li className="list-disc">Last 30 Days</li>
              </span>
            </p>
          </div>

          <div className="w-full max-w-100">
            <SmallEarningCard amount="$3,000" label="Total invoiced Fee" />
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-[#E6EAF2] bg-white p-4">
        <h4 className="text-[24px] font-semibold text-[#1F2430]">
          Potential Earnings from Delivered Loads
        </h4>
        <p className="mt-1 text-md text-[#8A94A6]">
          Loads that have been delivered but not yet invoiced
        </p>

        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
          <SmallEarningCard amount="$10,000" label="Delivered Load Revenue" />
          <SmallEarningCard amount="$1,000" label="Potential Fee (10%)" />
        </div>
      </div>

      <div className="rounded-2xl border border-[#E6EAF2] bg-white p-4">
        <h4 className="mb-3 text-[16px] font-semibold text-[#1F2430]">
          Earning Breakdown
        </h4>

        <div>
          <BreakdownRow label="Dispatch Fee Rate" value="10%" />
          <BreakdownRow label="Total Fees Invoiced" value="$3,000" />
          <BreakdownRow label="Potential (Uninvoiced)" value="$1,000" />
          <BreakdownRow label="Total Expected Earnings" value="$4,000" bold />
        </div>
      </div>
    </section>
  );
}
