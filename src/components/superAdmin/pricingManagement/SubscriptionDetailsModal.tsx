import { Modal } from "@/src/components/ui/modal";
import InitialAvatar from "@/src/components/superAdmin/dashboard/InitialAvatar";
import ReadOnlyField from "@/src/components/superAdmin/common/ReadOnlyField";
import { PlanBadge, SubscriptionStatusBadge } from "./badges";
import type { ArtistSubscription } from "./types";

type SubscriptionDetailsModalProps = {
  subscription: ArtistSubscription | null;
  onClose: () => void;
  onEdit: (id: string) => void;
};

export default function SubscriptionDetailsModal({
  subscription,
  onClose,
  onEdit,
}: SubscriptionDetailsModalProps) {
  return (
    <Modal
      isOpen={!!subscription}
      onClose={onClose}
      className="w-full max-w-md p-0"
      contentBgClassName="bg-white"
      textClassName="text-[#101828]"
    >
      {subscription && (
        <div className="rounded-2xl p-6">
          <h3 className="text-[16px] font-semibold text-[#101828]">Subscription Details</h3>

          <div className="mt-4 flex items-center gap-3">
            <InitialAvatar name={subscription.artistName} size={36} />
            <div className="min-w-0">
              <p className="truncate text-[14px] font-semibold text-[#101828]">
                {subscription.artistName}
              </p>
              <p className="truncate text-xs text-[#98A2B3]">{subscription.email}</p>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-4">
            <ReadOnlyField label="Plan" value={<PlanBadge plan={subscription.plan} />} />
            <ReadOnlyField
              label="Status"
              value={<SubscriptionStatusBadge status={subscription.status} />}
            />
            <ReadOnlyField label="Amount" value={`$${subscription.amount.toFixed(2)}`} />
            <ReadOnlyField
              label="Billing Cycle"
              value={<span className="capitalize">{subscription.billingCycle}</span>}
            />
            <ReadOnlyField label="Releases Used" value={subscription.releasesUsed} />
            <ReadOnlyField label="Start Date" value={subscription.startDate} />
          </div>

          <button
            type="button"
            onClick={() => onEdit(subscription.id)}
            className="mt-6 w-full rounded-xl bg-primary px-4 py-2.5 text-[13px] font-semibold text-[#101828] hover:opacity-90"
          >
            Edit Subscription
          </button>
        </div>
      )}
    </Modal>
  );
}
