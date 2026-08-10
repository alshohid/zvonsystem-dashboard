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
import type { INotificationItem, INotificationsResponse } from "@/src/types/notificationTypes";

export default function NotificationsContainer() {
  const { data, isLoading, isFetching, isError, refetch } =
    useGetNotificationsOverviewQuery();

  const [notifications, setNotifications] = useState<INotificationItem[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  console.log(data, 'data');
  useEffect(() => {
    if (data) {
      const mappedNotifications: INotificationItem[] = data.data?.map((item) => ({
        ...item,
        isRead: item.isRead,
      }));
      setNotifications(mappedNotifications);
      setUnreadCount(data.meta.unreadCount);
    }
  }, [data]);

  if (isLoading || (isFetching && !data)) {
    return <NotificationsSkeleton />;
  }

  if (isError || !data) {
    return <NotificationsError onRetry={refetch} />;
  }

  const handleMarkAllRead = () => {
    setNotifications((prev) =>
      prev.map((notification) => ({ ...notification, isRead: true, readAt: new Date().toISOString() })),
    );
    setUnreadCount(0);
  };

  return (
    <div className="space-y-6">
      <NotificationsPageHeader unreadCount={unreadCount} onMarkAllRead={handleMarkAllRead} />
      <NotificationsList notifications={notifications} />
    </div>
  );
}
