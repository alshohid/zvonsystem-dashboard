import InitialAvatar from "@/src/components/superAdmin/dashboard/InitialAvatar";
import InvoiceActionsMenu from "./InvoiceActionsMenu";
import { InvoiceStatusBadge } from "./badges";
import type { PricingInvoice } from "./types";

const TABLE_HEADERS = [
  "Invoice",
  "Artist",
  "Payment",
  "Amount",
  "Date",
  "Status",
  "Actions",
];

type InvoiceTableProps = {
  invoices: PricingInvoice[];
  onViewDetails: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onMarkAsPaid: (id: string) => void;
  isLoading?: boolean;
};

export default function InvoiceTable({
  invoices,
  onViewDetails,
  onEdit,
  onDelete,
  onMarkAsPaid,
  isLoading = false,
}: InvoiceTableProps) {
  return (
    <div
      className={[
        "overflow-hidden rounded-2xl border border-[#E9EDF5] bg-white shadow-[0_1px_2px_rgba(16,24,40,0.04)]",
        isLoading ? "opacity-60" : "",
      ].join(" ")}
    >
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

                <td className="px-5 py-4 text-[13px] capitalize text-[#475467]">
                  {invoice.paymentMethod || "—"}
                </td>

                <td className="px-5 py-4 text-[14px] text-[#344054]">
                  ${invoice.amount.toFixed(2)}
                </td>

                <td className="px-5 py-4 text-[14px] text-[#475467]">{invoice.date}</td>

                <td className="px-5 py-4">
                  <InvoiceStatusBadge status={invoice.status} />
                </td>

                <td className="px-5 py-4 ">
                  <InvoiceActionsMenu
                    isPaid={invoice.status === "paid"}
                    onViewDetails={() => onViewDetails(invoice.id)}
                    onEdit={() => onEdit(invoice.id)}
                    onDelete={() => onDelete(invoice.id)}
                    onMarkAsPaid={() => onMarkAsPaid(invoice.id)}
                  />
                </td>
              </tr>
            ))}

            {invoices.length === 0 && !isLoading ? (
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
