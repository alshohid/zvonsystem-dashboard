import InitialAvatar from "@/src/components/superAdmin/dashboard/InitialAvatar";
import { PlanBadge, SubscriptionStatusBadge } from "./badges";
import ReviewActionsMenu from "./ReviewActionsMenu";
import type { ArtistSubscription } from "./types";

const TABLE_HEADERS = [
  "Artist",
  "Plan",
  "Status",
  "Amount",
  "Billing Cycle",
  "Releases",
  "Actions",
];

type SubscriptionTableProps = {
  subscriptions: ArtistSubscription[];
  onViewDetails: (id: string) => void;
  onEditPlan: (id: string) => void;
  isLoading?: boolean;
};

export default function SubscriptionTable({
  subscriptions,
  onViewDetails,
  onEditPlan,
  isLoading = false,
}: SubscriptionTableProps) {
  return (
    <div
      className={[
        'overflow-hidden rounded-2xl border border-[#E9EDF5] bg-white shadow-[0_1px_2px_rgba(16,24,40,0.04)]',
        isLoading ? 'opacity-60' : '',
      ].join(' ')}
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
            {subscriptions.map(subscription => (
              <tr
                key={subscription.id}
                className="border-t border-[#F0F2F7] transition-colors hover:bg-[#FAFBFC]"
              >
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <InitialAvatar name={subscription.artistName} size={32} />
                    <div className="min-w-0">
                      <p className="truncate text-[14px] font-medium text-[#101828]">
                        {subscription.artistName}
                      </p>
                      <p className="truncate text-xs text-[#98A2B3]">{subscription.email}</p>
                    </div>
                  </div>
                </td>

                <td className="px-5 py-4">
                  <PlanBadge plan={subscription.plan} />
                </td>

                <td className="px-5 py-4">
                  <SubscriptionStatusBadge status={subscription.status} />
                </td>

                <td className="px-5 py-4 text-[14px] text-[#344054]">
                  ${subscription.amount.toFixed(2)}
                </td>

                <td className="px-5 py-4 text-[14px] capitalize text-[#475467]">
                  {subscription.billingCycle}
                </td>

                <td className="px-5 py-4 text-[14px] text-[#475467]">
                  {subscription.releasesUsed}
                </td>

                <td className="px-5 py-4">
                  <ReviewActionsMenu
                    onViewDetails={() => onViewDetails(subscription.id)}
                    onEditPlan={() => onEditPlan(subscription.id)}
                  />
                </td>
              </tr>
            ))}

            {subscriptions.length === 0 && !isLoading ? (
              <tr>
                <td colSpan={TABLE_HEADERS.length} className="px-5 py-12 text-center text-sm text-[#98A2B3]">
                  No subscriptions match your search.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}
