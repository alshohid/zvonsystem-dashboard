import { Modal } from "@/src/components/ui/modal";
import InitialAvatar from "@/src/components/superAdmin/dashboard/InitialAvatar";
import ReadOnlyField from "@/src/components/superAdmin/common/ReadOnlyField";
import { InvoiceStatusBadge } from "./badges";
import type { InvoiceStatus } from "./types";
import type { Invoice } from "@/src/types/noticeTypes";

function toInvoiceStatus(status: string): InvoiceStatus {
  const normalized = status.toLowerCase();
  if (normalized === "paid") return "paid";
  if (normalized === "pending") return "pending";
  if (normalized === "pay-per-release" || normalized === "pay_per_release") {
    return "pay-per-release";
  }
  if (normalized === "draft") return "draft";
  return "cancelled";
}

type InvoiceDetailsModalProps = {
  invoice: Invoice | null;
  onClose: () => void;
  onEdit: (id: string) => void;
  isLoading?: boolean;
  error?: string | null;
};

export default function InvoiceDetailsModal({
  invoice,
  onClose,
  onEdit,
  isLoading = false,
  error = null,
}: InvoiceDetailsModalProps) {
  const amount = invoice
    ? `${invoice.currency ?? "USD"} ${Number(invoice.amount).toFixed(2)}`
    : "";

  const formatDate = (value: string | null | undefined) =>
    value ? new Date(value).toLocaleDateString("en-US") : "—";

  return (
    <Modal
      isOpen={!!invoice}
      onClose={onClose}
      className="w-full max-w-md p-0"
      contentBgClassName="bg-white"
      textClassName="text-[#101828]"
    >
      {invoice && (
        <div className="rounded-2xl p-6">
          <h3 className="text-[16px] font-semibold text-[#101828]">
            Invoice Details
          </h3>

          {error ? (
            <div className="mt-3 rounded-lg border border-[#FECDD3] bg-[#FEF2F2] px-4 py-3 text-[13px] leading-relaxed text-[#B42318]">
              {error}
            </div>
          ) : null}

          <div className="mt-4 flex items-center gap-3">
            <InitialAvatar name={invoice.artist_name} size={36} />
            <div className="min-w-0">
              <p className="truncate text-[14px] font-semibold text-[#101828]">
                {invoice.artist_name}
              </p>
              <p className="truncate text-xs text-[#98A2B3]">{invoice.email}</p>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-4">
            <ReadOnlyField label="Invoice Number" value={invoice.invoice_number} />
            <ReadOnlyField
              label="Status"
              value={<InvoiceStatusBadge status={toInvoiceStatus(invoice.status)} />}
            />
            <ReadOnlyField label="Amount" value={amount} />
            <ReadOnlyField
              label="Billing Date"
              value={formatDate(invoice.billing_date)}
            />
            <ReadOnlyField
              label="Paid Date"
              value={formatDate(invoice.paid_date)}
            />
            <ReadOnlyField
              label="Payment Method"
              value={<span className="capitalize">{invoice.payment_method || "—"}</span>}
            />
            <div className="col-span-2">
              <ReadOnlyField
                label="Description"
                value={invoice.description || "—"}
              />
            </div>
            <div className="col-span-2">
              <ReadOnlyField label="Notes" value={invoice.notes || "—"} />
            </div>
          </div>

          <button
            type="button"
            onClick={() => onEdit(invoice.id)}
            disabled={isLoading}
            className="mt-6 w-full rounded-xl bg-primary px-4 py-2.5 text-[13px] font-semibold text-[#101828] hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isLoading ? "Loading…" : "Edit Invoice"}
          </button>
        </div>
      )}
    </Modal>
  );
}