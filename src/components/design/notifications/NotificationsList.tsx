import { Bell, CheckCheck, ChevronDown, Trash2 } from "lucide-react";
import type { INotificationItem, NotificationType } from "@/src/types/notificationTypes";
import { getNotificationTypeConfig, getNotificationGroups } from "@/src/lib/notification/helpers";

type NotificationsListProps = {
  notifications: INotificationItem[];
  grouped?: boolean;
  onMarkRead?: (id: string) => void;
  onDelete?: (id: string) => void;
  hasMore?: boolean;
  isLoadingMore?: boolean;
  onLoadMore?: () => void;
  isDeletingNotification: boolean;
  isMarkingRead: boolean;
};

function NotificationItem({
  notification,
  onMarkRead,
  onDelete,
  isDeletingNotification,
  isMarkingRead,
}: {
  notification: INotificationItem;
  onMarkRead?: (id: string) => void;
  onDelete?: (id: string) => void;
  isDeletingNotification: boolean;
  isMarkingRead: boolean;
}) {
  const isUnread = !notification.isRead;

  return (
    <div
      className={`flex items-start gap-4 border-b border-[#F1F3F9] px-5 py-5 last:border-b-0 sm:px-6 ${isUnread ? "" : "opacity-75"
        }`}
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

      <div className="flex shrink-0 items-center gap-2">
        <span className="whitespace-nowrap text-xs text-[#98A2B3]">
          {new Date(notification.createdAt).toLocaleDateString()}
        </span>
        {isUnread && onMarkRead && (
          <button
            type="button"
            onClick={() => onMarkRead(notification.id)}
            disabled={isMarkingRead}
            title="Mark as read"
            className="inline-flex h-7 w-7 items-center justify-center rounded-md text-[#16A34A] transition hover:bg-[#ECFDF3]"
          >
            <CheckCheck size={14} />
          </button>
        )}
        {onDelete && (
          <button
            type="button"
            onClick={() => onDelete(notification.id)}
            disabled={isDeletingNotification}
            title="Delete notification"
            className="inline-flex h-7 w-7 items-center justify-center rounded-md text-[#EF4444] transition hover:bg-[#FEF2F2]"
          >
            <Trash2 size={14} />
          </button>
        )}
      </div>
    </div>
  );
}

function GroupHeader({ type }: { type: NotificationType }) {
  const config = getNotificationTypeConfig(type);

  return (
    <div className="flex items-center gap-3 border-b border-[#F1F3F9] px-5 py-3 sm:px-6">
      <span
        className="flex h-7 w-7 items-center justify-center rounded-md text-xs font-bold"
        style={{ backgroundColor: config.iconBg, color: config.iconColor }}
      >
        {config.label.charAt(0)}
      </span>
      <span className="text-xs font-semibold uppercase tracking-wider text-[#667085]">
        {config.label}
      </span>
    </div>
  );
}

export default function NotificationsList({
  notifications,
  grouped,
  onMarkRead,
  onDelete,
  hasMore,
  isLoadingMore,
  onLoadMore,
  isDeletingNotification,
  isMarkingRead,
}: NotificationsListProps) {
  const renderItems = () => {
    if (grouped) {
      const groups = getNotificationGroups(notifications);

      return groups.map((group) => (
        <div key={group.type}>
          <GroupHeader type={group.type} />
          {group.items.map((notification) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
              onMarkRead={onMarkRead}
              onDelete={onDelete}
              isDeletingNotification={isDeletingNotification}
              isMarkingRead={isMarkingRead}
            />
          ))}
        </div>
      ));
    }

    return notifications?.map((notification) => (
      <NotificationItem
        key={notification.id}
        notification={notification}
        onMarkRead={onMarkRead}
        onDelete={onDelete}
        isDeletingNotification={isDeletingNotification}
        isMarkingRead={isMarkingRead}
      />
    ));
  };

  return (
    <div className="rounded-[24px] border border-[#E7EBF7] bg-white shadow-[0_18px_45px_rgba(46,58,131,0.06)]">
      {notifications?.length === 0 ? (
        <p className="p-6 text-center text-sm text-[#667085]">
          No notifications yet.
        </p>
      ) : (
        <div>{renderItems()}</div>
      )}

      {hasMore && onLoadMore && (
        <div className="border-t border-[#F1F3F9] px-5 py-4 text-center sm:px-6">
          <button
            type="button"
            onClick={onLoadMore}
            disabled={isLoadingMore}
            className="inline-flex items-center gap-2 rounded-xl border border-[#E7EBF7] bg-white px-4 py-2 text-sm font-semibold text-[#2E3A83] transition hover:bg-[#F5F7FF] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoadingMore ? (
              "Loading..."
            ) : (
              <>
                Load more
                <ChevronDown size={16} />
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
