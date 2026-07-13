import type { InvoiceStatus, PricingPlanId, SubscriptionStatus } from "./types";

const PLAN_LABEL: Record<PricingPlanId, string> = {
  free: "Free",
  pro: "Pro",
  "pay-per-release": "Pay Per Release",
};

const PLAN_BADGE_CLASSNAME: Record<PricingPlanId, string> = {
  free: "border border-[#E5E7EB] bg-[#F9FAFB] text-[#667085]",
  pro: "border border-[#BBF7D0] bg-[#F0FDF4] text-[#15803D]",
  "pay-per-release": "border border-[#BFDBFE] bg-[#EFF6FF] text-[#1D4ED8]",
};

export function PlanBadge({ plan }: { plan: PricingPlanId }) {
  return (
    <span
      className={[
        "inline-block rounded-md px-2 py-0.5 text-xs font-medium",
        PLAN_BADGE_CLASSNAME[plan],
      ].join(" ")}
    >
      {PLAN_LABEL[plan]}
    </span>
  );
}

const SUBSCRIPTION_STATUS_LABEL: Record<SubscriptionStatus, string> = {
  active: "Active",
  cancelled: "Cancelled",
  suspended: "Suspended",
  trial: "Trial",
};

const SUBSCRIPTION_STATUS_CLASSNAME: Record<SubscriptionStatus, string> = {
  active: "border border-[#BBF7D0] bg-[#F0FDF4] text-[#15803D]",
  cancelled: "border border-[#FECACA] bg-[#FEF2F2] text-[#DC2626]",
  suspended: "border border-[#FDE68A] bg-[#FFFBEB] text-[#B45309]",
  trial: "border border-[#BFDBFE] bg-[#EFF6FF] text-[#1D4ED8]",
};

export function SubscriptionStatusBadge({ status }: { status: SubscriptionStatus }) {
  return (
    <span
      className={[
        "inline-block rounded-md px-2 py-0.5 text-xs font-medium",
        SUBSCRIPTION_STATUS_CLASSNAME[status],
      ].join(" ")}
    >
      {SUBSCRIPTION_STATUS_LABEL[status]}
    </span>
  );
}

const INVOICE_STATUS_LABEL: Record<InvoiceStatus, string> = {
  paid: "Paid",
  pending: "Pending",
  "pay-per-release": "Pay Per Release",
};

const INVOICE_STATUS_CLASSNAME: Record<InvoiceStatus, string> = {
  paid: "border border-[#BBF7D0] bg-[#F0FDF4] text-[#15803D]",
  pending: "border border-[#FDE68A] bg-[#FFFBEB] text-[#B45309]",
  "pay-per-release": "border border-[#E9D5FF] bg-[#FAF5FF] text-[#7C3AED]",
};

export function InvoiceStatusBadge({ status }: { status: InvoiceStatus }) {
  return (
    <span
      className={[
        "inline-block rounded-md px-2 py-0.5 text-xs font-medium",
        INVOICE_STATUS_CLASSNAME[status],
      ].join(" ")}
    >
      {INVOICE_STATUS_LABEL[status]}
    </span>
  );
}
