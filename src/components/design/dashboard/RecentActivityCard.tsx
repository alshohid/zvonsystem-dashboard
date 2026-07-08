
import { ActivityTrendIcon } from "@/src/icons";
import type { IRecentActivityItem } from "@/src/types/dashboardOverviewTypes";



type RecentActivityCardProps = {
  items: IRecentActivityItem[];
};

export default function RecentActivityCard({ items }: RecentActivityCardProps) {
  return (
    <section className="rounded-[24px] border border-[#E7EBF7] bg-white p-5 shadow-[0_18px_45px_rgba(46,58,131,0.06)] sm:p-6">
      <h3 className="text-lg font-semibold text-[#101828]">Recent Activity</h3>

      <div className="mt-4 flex flex-col">
        {items.map((item) => {


          return (
            <div
              key={item.id}
              className="flex items-start gap-3 border-b border-[#F1F3F9] py-3 last:border-b-0"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#101828] text-white">
                <ActivityTrendIcon className="text-white" />
              </div>
              <div className="min-w-0">
                <p className="text-sm text-[#344054]">{item.message}</p>
                <p className="mt-0.5 text-xs text-[#98A2B3]">{item.occurredAgo}</p>
              </div>
            </div>
          );
        })}

        {items.length === 0 && (
          <p className="py-6 text-center text-sm text-[#667085]">No recent activity.</p>
        )}
      </div>
    </section>
  );
}
