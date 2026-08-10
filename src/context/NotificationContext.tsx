/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useAuth } from "@/src/redux/features/auth/hooks";
import {
  getNotificationSocket,
  disconnectNotificationSocket,
  notificationService,
} from "@/src/lib/notification";
import { notificationConfig } from "@/src/lib/notification/config";
import {
  useGetNotificationsOverviewQuery,
  useNotificationUnreadCountQuery,
  useDeleteNotificationMutation,
  useDeleteAllNotificationsMutation,
  useMarkNotificationReadMutation,
  useMarkAllNotificationsReadMutation,
} from "@/src/redux/features/notifications/notificationsOverviewApi";
import type { NotificationType, INotificationItem } from "@/src/types/notificationTypes";

const PAGE_SIZE = notificationConfig.pageLimit;

interface NotificationContextValue {
  notifications: INotificationItem[];
  unreadCount: number;
  total: number;
  hasMore: boolean;
  isInitialLoading: boolean;
  isFetchingMore: boolean;
  refresh: () => Promise<void>;
  loadMore: () => Promise<void>;
  markRead: (id: string) => Promise<void>;
  markAllRead: () => Promise<void>;
  deleteNotification: (id: string) => Promise<void>;
  deleteAllNotifications: () => Promise<void>;
}

const NotificationContext = createContext<NotificationContextValue | null>(
  null,
);

export const useNotifications = () => {
  const context = useContext(NotificationContext);

  if (!context) {
    throw new Error("useNotifications must be used inside NotificationProvider");
  }

  return context;
};

export function NotificationProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [notifications, setNotifications] = useState<INotificationItem[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [total, setTotal] = useState(0);
  const pageRef = useRef(1);

  const { token } = useAuth();

  const {
    data,
    isLoading,
    isFetching,
    refetch,
  } = useGetNotificationsOverviewQuery();

  const {
    data: unreadCountData = 0,
    refetch: refetchUnreadCount,
  } = useNotificationUnreadCountQuery();

  const [markNotificationRead] = useMarkNotificationReadMutation();
  const [markAllNotificationsRead] = useMarkAllNotificationsReadMutation();
  const [deleteNotification] = useDeleteNotificationMutation();
  const [deleteAllNotifications] = useDeleteAllNotificationsMutation();

  useEffect(() => {
    if (data) {
      const mappedNotifications: INotificationItem[] = data.data?.map((item) => ({
        ...item,
        isRead: item.isRead,
      })) || [];
      setNotifications(mappedNotifications);
      setTotal(data.meta.total);
      pageRef.current = data.meta.page;
    }
  }, [data]);

  useEffect(() => {
    setUnreadCount(unreadCountData);
  }, [unreadCountData]);

  const refresh = useCallback(async () => {
    await refetch();
    await refetchUnreadCount();
  }, [refetch, refetchUnreadCount]);

  const loadMore = useCallback(async () => {
    // Pagination is handled by the Redux query
    // This is a placeholder for future infinite scroll implementation
    console.log("Load more notifications");
  }, []);

  useEffect(() => {
    // Connect to socket for real-time notifications via cookie-based auth
    if (token) {
      notificationService.connect();
    }

    return () => {
      notificationService.disconnect();
    };
  }, [token]);

  useEffect(() => {
    const handleNewNotification = (payload: unknown) => {
      const raw = payload as Record<string, unknown>;
      const type = (raw.type as string) || "SYSTEM";
      const title = (raw.title as string) || "New notification";
      const message = (raw.message as string) || title;
      const rawId = (raw.id as string) || `socket-${Date.now()}-${Math.random()}`;
      const createdAt = (raw.createdAt as string) || new Date().toISOString();

      const notification: INotificationItem = {
        id: rawId,
        type: type as NotificationType,
        title,
        message,
        data: (raw.data as INotificationItem["data"]) || {},
        isRead: false,
        readAt: null,
        createdAt,
      };

      setNotifications((current) => [notification, ...current]);
      setTotal((current) => current + 1);
      setUnreadCount((current) => current + 1);
      refetchUnreadCount();
    };

    const handleUnreadUpdated = (payload: unknown) => {
      const raw = payload as Record<string, unknown>;
      const count = typeof raw.count === "number" ? raw.count : undefined;
      if (count !== undefined) {
        setUnreadCount(count);
      }
      refetchUnreadCount();
    };

    notificationService.on("notification:new", handleNewNotification);
    notificationService.on("notification:unread:updated", handleUnreadUpdated);

    return () => {
      notificationService.off("notification:new", handleNewNotification);
      notificationService.off("notification:unread:updated", handleUnreadUpdated);
    };
  }, [refetchUnreadCount]);

  const markRead = useCallback(
    async (id: string) => {
      await markNotificationRead(id).unwrap();
    },
    [markNotificationRead],
  );

  const markAllRead = useCallback(async () => {
    await markAllNotificationsRead().unwrap();
  }, [markAllNotificationsRead]);

  const handleDeleteNotification = useCallback(
    async (id: string) => {
      await deleteNotification(id).unwrap();
    },
    [deleteNotification],
  );

  const handleDeleteAllNotifications = useCallback(async () => {
    await deleteAllNotifications().unwrap();
  }, [deleteAllNotifications]);

  const hasMore = false; // Simplified for now

  const value = useMemo<NotificationContextValue>(
    () => ({
      notifications,
      unreadCount,
      total,
      hasMore,
      isInitialLoading: isLoading,
      isFetchingMore: isFetching,
      refresh,
      loadMore,
      markRead,
      markAllRead,
      deleteNotification: handleDeleteNotification,
      deleteAllNotifications: handleDeleteAllNotifications,
    }),
    [
      hasMore,
      isFetching,
      isLoading,
      loadMore,
      markAllRead,
      markRead,
      handleDeleteNotification,
      handleDeleteAllNotifications,
      notifications,
      refresh,
      total,
      unreadCount,
    ],
  );

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
}
