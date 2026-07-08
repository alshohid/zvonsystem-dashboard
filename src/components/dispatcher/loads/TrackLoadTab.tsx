import { TimelineItem } from "@/src/app/(protected)/(dispatcher)/dispatcher/dashboard/loads/[loadId]/page";
import { Check } from "lucide-react";

export function TrackLoadTab({
  timeline,
  onDeliveredDone,
}: {
  timeline: TimelineItem[];
  onDeliveredDone: () => void;
}) {
  return (
    <div className="rounded-2xl border border-[#EAECEF] bg-white p-4 sm:p-6">
      <h3 className="mb-4 text-[18px] font-semibold text-[#111827]">
        Tracking Timeline
      </h3>

      <div className="rounded-2xl border border-[#ECEEF3] p-4 sm:p-6">
        <div className="space-y-8">
          {timeline.map((item, index) => {
            const isLast = index === timeline.length - 1;

            return (
              <div
                key={item.id}
                className="relative flex items-start justify-between gap-4"
              >
                <div className="relative flex gap-4">
                  <div className="relative flex flex-col items-center">
                    <div
                      className={[
                        'z-10 mt-1 h-3 w-3 rounded-full border',
                        item.completed
                          ? 'border-[#2E3A83] bg-[#2E3A83]'
                          : 'border-[#C9D1E1] bg-white',
                      ].join(' ')}
                    />
                    {!isLast && (
                      <div className="absolute top-4 h-[72px] w-px bg-[#E4E7EC]" />
                    )}
                  </div>

                  <div>
                    <p
                      className={[
                        'text-[16px] font-medium',
                        item.completed ? 'text-[#111827]' : 'text-[#D0D5DD]',
                      ].join(' ')}
                    >
                      {item.title}
                    </p>
                    <p
                      className={[
                        'mt-1 text-xs',
                        item.completed ? 'text-[#98A2B3]' : 'text-[#D0D5DD]',
                      ].join(' ')}
                    >
                      {item.title === 'Completed'
                        ? 'upload documents to mark completed'
                        : item.dateTime}
                    </p>
                    {item.title === 'Completed' && (
                      <p className="text-xs text-[#D0D5DD]">{item.dateTime}</p>
                    )}
                  </div>
                </div>

                <button
                  type="button"
                  disabled={item.actionDisabled}
                  onClick={
                    item.id === 'delivered' ? onDeliveredDone : undefined
                  }
                  className={[
                    'inline-flex min-w-[96px] items-center justify-center rounded-xl px-4 py-2 text-xs font-semibold transition',
                    item.actionDisabled
                      ? 'bg-[#EEF2F6] text-[#98A2B3] cursor-not-allowed'
                      : 'bg-[#2E3A83] text-white hover:bg-[#26306d]',
                  ].join(' ')}
                >
                  <Check size={14} className="mr-1.5" />
                  {item.actionLabel}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
