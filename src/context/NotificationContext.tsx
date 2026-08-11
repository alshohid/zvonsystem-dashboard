/* eslint-disable react-hooks/refs */
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
import { notificationService } from "@/src/lib/notification";
import {
  useGetNotificationsOverviewQuery,
  useLazyGetNotificationsOverviewQuery,
  useNotificationUnreadCountQuery,
  useDeleteNotificationMutation,
  useDeleteAllNotificationsMutation,
  useMarkNotificationReadMutation,
  useMarkAllNotificationsReadMutation,
} from "@/src/redux/features/notifications/notificationsOverviewApi";
import type { NotificationType, INotificationItem } from "@/src/types/notificationTypes";
import { getErrorMessage } from "../lib/getErrorMessage";



interface NotificationContextValue {
  notifications: INotificationItem[];
  unreadCount: number;
  total: number;
  hasMore: boolean;
  isInitialLoading: boolean;
  isFetchingMore: boolean;
  isError: boolean;
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
  const [hasMore, setHasMore] = useState(false);
  const pageRef = useRef(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const { isAuthenticated } = useAuth();

  const {
    data,
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useGetNotificationsOverviewQuery({
    page: 1,
    limit: 10,
  }, {
    skip: !isAuthenticated,
  });

  const [triggerLoadMore] = useLazyGetNotificationsOverviewQuery();

  const {
    data: unreadCountData,
    refetch: refetchUnreadCount,
  } = useNotificationUnreadCountQuery();

  console.log(unreadCountData, "unreadCountData")
  const refetchUnreadCountRef = useRef(refetchUnreadCount);

  useEffect(() => {
    refetchUnreadCountRef.current = refetchUnreadCount;
  }, [refetchUnreadCount]);

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
      setHasMore(data.meta.page < data.meta.totalPages);
    }
  }, [data]);

  const unreadCountValue = unreadCountData?.data?.unreadCount ?? 0;

  useEffect(() => {
    setUnreadCount(unreadCountValue);
  }, [unreadCountValue]);

  const refresh = useCallback(async () => {
    await refetch();
    await refetchUnreadCountRef.current();
  }, [refetch]);

  const loadMore = useCallback(async () => {
    if (isLoadingMore || !hasMore) {
      return;
    }

    const nextPage = pageRef.current + 1;

    setIsLoadingMore(true);
    try {
      const result = await triggerLoadMore({
        page: nextPage,
        limit: 20,
      }).unwrap();

      if (result?.success && result.data) {
        const newNotifications: INotificationItem[] = result.data.map(
          (item: INotificationItem) => ({
            ...item,
            isRead: item.isRead,
          }),
        );

        setNotifications((current) => [...current, ...newNotifications]);
        pageRef.current = result.meta.page;
        setHasMore(result.meta.page < result.meta.totalPages);
        setTotal(result.meta.total);
      }
    } catch (error) {
      getErrorMessage(error, "Failed to load more notifications.");
    } finally {
      setIsLoadingMore(false);
    }
  }, [isLoadingMore, hasMore, refetch]);

  useEffect(() => {
    if (isAuthenticated) {
      notificationService.connect();
    }

    return () => {
      notificationService.disconnect();
    };
  }, [isAuthenticated]);

  useEffect(() => {
    const handleNewNotification = (payload: unknown) => {
      const raw = (payload as Record<string, unknown> | null | undefined)?.notification as
        | Record<string, unknown>
        | undefined;
      const type = (raw?.type as string) || "SYSTEM";
      const title = (raw?.title as string) || "New notification";
      const message = (raw?.message as string) || title;
      const rawId = (raw?.id as string) || `socket-${Date.now()}-${Math.random()}`;
      const createdAt = (raw?.createdAt as string) || new Date().toISOString();

      const notification: INotificationItem = {
        id: rawId,
        type: type as NotificationType,
        title,
        message,
        data: (raw?.data as INotificationItem["data"]) || {},
        isRead: false,
        readAt: null,
        createdAt,
      };

      setNotifications((current) => [notification, ...current]);
      setTotal((current) => current + 1);
      setUnreadCount((current) => current + 1);
      refetchUnreadCountRef.current();
    };

    const handleUnreadUpdated = (payload: unknown) => {
      const raw = payload as Record<string, unknown>;
      const count = typeof raw.unreadCount === "number" ? raw.unreadCount : undefined;
      if (count !== undefined) {
        setUnreadCount(count);
      }
      refetchUnreadCountRef.current();
    };

    notificationService.on("notification:new", handleNewNotification);
    notificationService.on("notification:unread:updated", handleUnreadUpdated);

    return () => {
      notificationService.off("notification:new", handleNewNotification);
      notificationService.off("notification:unread:updated", handleUnreadUpdated);
    };
  }, []);

  const markRead = useCallback(
    async (id: string) => {
      try {
        await markNotificationRead(id).unwrap();
      } catch (error) {
        getErrorMessage(error);
      }
    },
    [markNotificationRead],
  );

  const markAllRead = useCallback(async () => {
    try {
      await markAllNotificationsRead().unwrap();
    } catch (error) {
      getErrorMessage(error);
    }
  }, [markAllNotificationsRead]);

  const handleDeleteNotification = useCallback(
    async (id: string) => {
      try {
        await deleteNotification(id).unwrap();
      } catch (error) {
        getErrorMessage(error);
      }
    },
    [deleteNotification],
  );

  const handleDeleteAllNotifications = useCallback(async () => {
    try {
      await deleteAllNotifications().unwrap();
    } catch (error) {
      getErrorMessage(error);
    }
  }, [deleteAllNotifications]);

  const value = useMemo<NotificationContextValue>(
    () => ({
      notifications,
      unreadCount,
      total,
      hasMore,
      isInitialLoading: isLoading,
      isFetchingMore: isFetching || isLoadingMore,
      isError,
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
      isLoadingMore,
      isError,
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
