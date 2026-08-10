import { Bell } from "lucide-react";
import type { INotificationItem, NotificationType } from "@/src/types/notificationTypes";
import { getNotificationTypeConfig } from "@/src/lib/notification/helpers";

type NotificationsListProps = {
  notifications: INotificationItem[];
};

export default function NotificationsList({ notifications }: NotificationsListProps) {
  return (
    <section className="rounded-[24px] border border-[#E7EBF7] bg-white shadow-[0_18px_45px_rgba(46,58,131,0.06)]">
      {notifications?.map((notification) => {
        const config = getNotificationTypeConfig(notification.type as NotificationType);
        const isUnread = !notification.isRead;

        return (
          <div
            key={notification.id}
            className="flex items-start gap-4 border-b border-[#F1F3F9] px-5 py-5 last:border-b-0 sm:px-6"
          >
            <span
              className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${isUnread ? "bg-[#3B82F6]" : "bg-transparent"
                }`}
            />

            <div
              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${isUnread ? "bg-[#101828] text-[#16A34A]" : "bg-[#F1F3F9] text-[#98A2B3]"
                }`}
            >
              <Bell size={16} />
            </div>

            <div className="min-w-0 flex-1">
              <p
                className={`text-sm ${isUnread ? "font-semibold text-[#101828]" : "font-medium text-[#98A2B3]"
                  }`}
              >
                {notification.title}
              </p>
              <p
                className={`mt-1 text-sm ${isUnread ? "text-[#667085]" : "text-[#C0C5D0]"}`}
              >
                {notification.message}
              </p>
            </div>

            <span className="shrink-0 whitespace-nowrap text-xs text-[#98A2B3]">
              {new Date(notification.createdAt).toLocaleDateString()}
            </span>
          </div>
        );
      })}

      {notifications?.length === 0 && (
        <p className="p-6 text-center text-sm text-[#667085]">No notifications yet.</p>
      )}
    </section>
  );
}
