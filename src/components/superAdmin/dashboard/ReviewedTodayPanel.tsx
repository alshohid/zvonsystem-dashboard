import type { ReviewedItem } from "./types";
import ReviewedTodayListItem from "./ReviewedTodayListItem";

type ReviewedTodayPanelProps = {
  title: string;
  emptyMessage: string;
  items: ReviewedItem[];
  buildHref: (item: ReviewedItem) => string;
};

export default function ReviewedTodayPanel({
  title,
  emptyMessage,
  items,
  buildHref,
}: ReviewedTodayPanelProps) {
  return (
    <div className="rounded-2xl border border-[#E9EDF5] bg-white p-5">
      <h2 className="text-sm font-semibold text-[#101828]">{title}</h2>

      <div className="mt-2 divide-y divide-[#EEF2ED]">
        {items.map((item) => (
          <ReviewedTodayListItem
            key={item.id}
            item={item}
            href={buildHref(item)}
          />
        ))}

        {items.length === 0 ? (
          <p className="py-10 text-center text-sm text-[#667085]">
            {emptyMessage}
          </p>
        ) : null}
      </div>
    </div>
  );
}
