"use client";

import { useEffect } from "react";
import { useNotifications } from "@/src/context/NotificationContext";
import {
  NotificationsError,
  NotificationsList,
  NotificationsPageHeader,
  NotificationsSkeleton,
} from "@/src/components/design/notifications";

export default function NotificationsContainer() {
  const {
    notifications,
    unreadCount,
    isInitialLoading,
    isFetchingMore,
    isError,
    refresh,
    markRead,
    markAllRead,
    deleteNotification,
    deleteAllNotifications,
  } = useNotifications();

  // Fetch initial data from API when the page loads / refreshes.
  // After that, real-time socket events keep the list in sync via
  // NotificationContext.
  useEffect(() => {
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isInitialLoading || (isFetchingMore && notifications.length === 0)) {
    return <NotificationsSkeleton />;
  }

  if (isError) {
    return <NotificationsError onRetry={refresh} />;
  }

  return (
    <div className="space-y-6">
      <NotificationsPageHeader
        unreadCount={unreadCount}
        onMarkAllRead={markAllRead}
        onDeleteAll={deleteAllNotifications}
      />
      <NotificationsList
        notifications={notifications}
        grouped
        onMarkRead={markRead}
        onDelete={deleteNotification}
      />
    </div>
  );
}
