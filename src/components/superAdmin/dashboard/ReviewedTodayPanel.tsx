import type { ReviewedItem } from "./mockSuperAdminDashboard";
import ReviewedTodayListItem from "./ReviewedTodayListItem";

type ReviewedTodayPanelProps = {
  items: ReviewedItem[];
};

export default function ReviewedTodayPanel({ items }: ReviewedTodayPanelProps) {
  return (
    <div className="rounded-2xl border border-[#E9EDF5] bg-white p-5">
      <h2 className="text-sm font-semibold text-[#101828]">Reviewed Today</h2>

      <div className="mt-2 divide-y divide-[#EEF2ED]">
        {items.map((item) => (
          <ReviewedTodayListItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
