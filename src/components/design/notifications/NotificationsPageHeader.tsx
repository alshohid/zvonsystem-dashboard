type NotificationsPageHeaderProps = {
  unreadCount: number;
  onMarkAllRead: () => void;
  onDeleteAll?: () => void;
};

export default function NotificationsPageHeader({
  unreadCount,
  onMarkAllRead,
  onDeleteAll,
}: NotificationsPageHeaderProps) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        <p className="text-xs font-medium uppercase tracking-[0.08em] text-[#98A2B3]">
          Inbox
        </p>
        <h1 className="mt-1 text-2xl font-semibold text-[#101828]">
          Notifications
        </h1>
      </div>

      <div className="flex items-center gap-3">
        {unreadCount > 0 && (
          <span className="rounded-full bg-[#ECFDF3] px-3 py-1 text-xs font-semibold text-[#16A34A]">
            {unreadCount} unread
          </span>
        )}
        <button
          type="button"
          onClick={onMarkAllRead}
          disabled={unreadCount === 0}
          className="text-sm font-semibold text-[#16A34A] transition hover:text-[#128038] disabled:cursor-not-allowed disabled:opacity-40"
        >
          Mark all read
        </button>
        {onDeleteAll && (
          <button
            type="button"
            onClick={onDeleteAll}
            disabled={unreadCount === 0}
            className="text-sm font-semibold text-[#EF4444] transition hover:text-[#DC2626] disabled:cursor-not-allowed disabled:opacity-40"
          >
            Delete all
          </button>
        )}
      </div>
    </div>
  );
}
