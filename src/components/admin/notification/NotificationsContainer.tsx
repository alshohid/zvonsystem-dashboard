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
    hasMore,
    isInitialLoading,
    isDeletingAllNotifications,
    isDeletingNotification,
    isMarkingAllRead,
    isMarkingRead,
    isFetchingMore,
    isError,
    refresh,
    loadMore,
    markRead,
    markAllRead,
    deleteNotification,
    deleteAllNotifications,
  } = useNotifications();


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
        isDeletingAllNotifications={isDeletingAllNotifications}
        isMarkingAllRead={isMarkingAllRead}
      />
      <NotificationsList
        notifications={notifications}
        grouped
        onMarkRead={markRead}
        onDelete={deleteNotification}
        hasMore={hasMore}
        isLoadingMore={isFetchingMore}
        onLoadMore={loadMore}
        isDeletingNotification={isDeletingNotification}
        isMarkingRead={isMarkingRead}
      />
    </div>
  );
}
