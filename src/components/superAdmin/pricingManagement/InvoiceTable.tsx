import { Download } from "lucide-react";
import InitialAvatar from "@/src/components/superAdmin/dashboard/InitialAvatar";
import { InvoiceStatusBadge, PlanBadge } from "./badges";
import type { PricingInvoice } from "./types";

const TABLE_HEADERS = ["Invoice", "Artist", "Plan", "Amount", "Date", "Status", "Actions"];

type InvoiceTableProps = {
  invoices: PricingInvoice[];
};

export default function InvoiceTable({ invoices }: InvoiceTableProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-[#E9EDF5] bg-white shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-[820px] border-collapse">
          <thead>
            <tr className="bg-[#F2F4F8]">
              {TABLE_HEADERS.map(header => (
                <th
                  key={header}
                  className="px-5 py-3 text-left text-[13px] font-medium text-[#475467]"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {invoices.map(invoice => (
              <tr
                key={invoice.id}
                className="border-t border-[#F0F2F7] transition-colors hover:bg-[#FAFBFC]"
              >
                <td className="px-5 py-4 text-[14px] font-medium text-[#101828]">
                  {invoice.invoiceNumber}
                </td>

                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <InitialAvatar name={invoice.artistName} size={32} />
                    <div className="min-w-0">
                      <p className="truncate text-[14px] font-medium text-[#101828]">
                        {invoice.artistName}
                      </p>
                      <p className="truncate text-xs text-[#98A2B3]">{invoice.email}</p>
                    </div>
                  </div>
                </td>

                <td className="px-5 py-4">
                  <PlanBadge plan={invoice.plan} />
                </td>

                <td className="px-5 py-4 text-[14px] text-[#344054]">
                  ${invoice.amount.toFixed(2)}
                </td>

                <td className="px-5 py-4 text-[14px] text-[#475467]">{invoice.date}</td>

                <td className="px-5 py-4">
                  <InvoiceStatusBadge status={invoice.status} />
                </td>

                <td className="px-5 py-4">
                  <button
                    type="button"
                    aria-label={`Download ${invoice.invoiceNumber}`}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-[#E5E7EB] text-[#667085] hover:bg-gray-50"
                  >
                    <Download size={14} />
                  </button>
                </td>
              </tr>
            ))}

            {invoices.length === 0 ? (
              <tr>
                <td colSpan={TABLE_HEADERS.length} className="px-5 py-12 text-center text-sm text-[#98A2B3]">
                  No invoices match your search.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}
