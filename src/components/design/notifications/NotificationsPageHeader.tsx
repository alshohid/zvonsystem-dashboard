type NotificationsPageHeaderProps = {
  unreadCount: number;
  onMarkAllRead: () => void;
  onDeleteAll?: () => void;
  isDeletingAllNotifications: boolean;
  isMarkingAllRead: boolean;
};

export default function NotificationsPageHeader({
  unreadCount,
  onMarkAllRead,
  onDeleteAll,
  isDeletingAllNotifications,
  isMarkingAllRead,
}: NotificationsPageHeaderProps) {
  return (
    <div className="flex w-full flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <p className="text-xs font-medium uppercase tracking-[0.08em] text-[#98A2B3]">
          Inbox
        </p>
        <h1 className="mt-1 text-xl font-semibold text-[#101828] sm:text-2xl">
          Notifications
        </h1>
      </div>

      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        {unreadCount > 0 && (
          <span className="rounded-full bg-[#ECFDF3] px-3 py-1 text-xs font-semibold text-[#16A34A]">
            {unreadCount} unread
          </span>
        )}
        <button
          type="button"
          onClick={onMarkAllRead}
          disabled={isMarkingAllRead || unreadCount === 0}
          className="text-sm font-semibold text-[#16A34A] transition hover:text-[#128038] disabled:cursor-not-allowed disabled:opacity-40"
        >
          Mark all read
        </button>

        <button
          type="button"
          onClick={onDeleteAll}
          disabled={isDeletingAllNotifications}
          className="text-sm font-semibold text-[#EF4444] transition hover:text-[#DC2626] disabled:cursor-not-allowed disabled:opacity-40"
        >
          Delete all
        </button>

      </div>
    </div>
  );
}
