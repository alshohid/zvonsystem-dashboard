/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";
import { useGetNotificationsOverviewQuery } from "@/src/redux/features/notifications/notificationsOverviewApi";
import {
  NotificationsError,
  NotificationsList,
  NotificationsPageHeader,
  NotificationsSkeleton,
} from "@/src/components/design/notifications";
import type { INotificationItem } from "@/src/types/notificationTypes";

export default function NotificationsContainer() {
  const { data, isLoading, isFetching, isError, refetch } =
    useGetNotificationsOverviewQuery();

  const [notifications, setNotifications] = useState<INotificationItem[]>([]);

  useEffect(() => {
    if (data) {
      setNotifications(data.data.notifications);
    }
  }, [data]);

  if (isLoading || (isFetching && !data)) {
    return <NotificationsSkeleton />;
  }

  if (isError || !data) {
    return <NotificationsError onRetry={refetch} />;
  }

  const unreadCount = notifications.filter((notification) => !notification.isRead).length;

  const handleMarkAllRead = () => {
    setNotifications((prev) =>
      prev.map((notification) => ({ ...notification, isRead: true })),
    );
  };

  return (
    <div className="space-y-6">
      <NotificationsPageHeader unreadCount={unreadCount} onMarkAllRead={handleMarkAllRead} />
      <NotificationsList notifications={notifications} />
    </div>
  );
}
