import { NotificationType } from "@/src/types/notificationTypes";
import type { INotificationItem } from "@/src/types/notificationTypes";

export interface NotificationTypeConfig {
  label: string;
  icon: string;
  iconColor: string;
  iconBg: string;
}

export const NOTIFICATION_TYPE_CONFIG: Record<NotificationType, NotificationTypeConfig> = {
  [NotificationType.RELEASE_STATUS_UPDATE]: {
    label: "Release Update",
    icon: "Disc3",
    iconColor: "#3B82F6",
    iconBg: "#EFF6FF",
  },
  [NotificationType.MODERATION_FEEDBACK]: {
    label: "Moderation Feedback",
    icon: "CircleAlert",
    iconColor: "#F59E0B",
    iconBg: "#FFFBEB",
  },
  [NotificationType.RELEASE_SCHEDULED]: {
    label: "Release Scheduled",
    icon: "CalendarClock",
    iconColor: "#8B5CF6",
    iconBg: "#F5F3FF",
  },
  [NotificationType.PAYMENT_RECEIVED]: {
    label: "Payment Received",
    icon: "DollarSign",
    iconColor: "#10B981",
    iconBg: "#ECFDF5",
  },
  [NotificationType.SUBSCRIPTION_ACTIVATED]: {
    label: "Subscription Activated",
    icon: "CheckCircle2",
    iconColor: "#10B981",
    iconBg: "#ECFDF5",
  },
  [NotificationType.SUBSCRIPTION_CANCELLED]: {
    label: "Subscription Cancelled",
    icon: "XCircle",
    iconColor: "#EF4444",
    iconBg: "#FEF2F2",
  },
  [NotificationType.SUBSCRIPTION_EXPIRED]: {
    label: "Subscription Expired",
    icon: "Clock",
    iconColor: "#6B7280",
    iconBg: "#F9FAFB",
  },
  [NotificationType.SUBSCRIPTION_RENEWED]: {
    label: "Subscription Renewed",
    icon: "RefreshCw",
    iconColor: "#3B82F6",
    iconBg: "#EFF6FF",
  },
  [NotificationType.PAYMENT_FAILED]: {
    label: "Payment Failed",
    icon: "AlertTriangle",
    iconColor: "#EF4444",
    iconBg: "#FEF2F2",
  },
  [NotificationType.SYSTEM]: {
    label: "System",
    icon: "Settings",
    iconColor: "#6B7280",
    iconBg: "#F9FAFB",
  },
  [NotificationType.FEATURE_ANNOUNCEMENT]: {
    label: "Feature Announcement",
    icon: "Sparkles",
    iconColor: "#8B5CF6",
    iconBg: "#F5F3FF",
  },
  [NotificationType.WEEKLY_DIGEST]: {
    label: "Weekly Digest",
    icon: "Mail",
    iconColor: "#3B82F6",
    iconBg: "#EFF6FF",
  },
};

export const DEFAULT_NOTIFICATION_TYPE_CONFIG: NotificationTypeConfig = {
  label: "Notification",
  icon: "Bell",
  iconColor: "#344054",
  iconBg: "#F2F4F7",
};

export const getNotificationTypeConfig = (
  type: NotificationType,
): NotificationTypeConfig =>
  NOTIFICATION_TYPE_CONFIG[type] ?? DEFAULT_NOTIFICATION_TYPE_CONFIG;

export const NOTIFICATION_GROUP_ORDER: NotificationType[] = [
  NotificationType.RELEASE_STATUS_UPDATE,
  NotificationType.PAYMENT_RECEIVED,
  NotificationType.SUBSCRIPTION_ACTIVATED,
  NotificationType.SUBSCRIPTION_RENEWED,
  NotificationType.SUBSCRIPTION_CANCELLED,
  NotificationType.SUBSCRIPTION_EXPIRED,
  NotificationType.PAYMENT_FAILED,
  NotificationType.RELEASE_SCHEDULED,
  NotificationType.MODERATION_FEEDBACK,
  NotificationType.SYSTEM,
  NotificationType.FEATURE_ANNOUNCEMENT,
  NotificationType.WEEKLY_DIGEST,
];

export interface NotificationGroup {
  type: NotificationType;
  items: INotificationItem[];
  unread: number;
}

export const getNotificationGroups = (
  notifications: INotificationItem[],
): NotificationGroup[] => {
  const map = new Map<NotificationType, INotificationItem[]>();

  notifications.forEach((notification) => {
    const list = map.get(notification.type) ?? [];
    list.push(notification);
    map.set(notification.type, list);
  });

  const ordered: NotificationType[] = [];
  NOTIFICATION_GROUP_ORDER.forEach((type) => {
    if (map.has(type)) ordered.push(type);
  });
  Array.from(map.keys()).forEach((type) => {
    if (!ordered.includes(type)) ordered.push(type);
  });

  return ordered.map((type) => {
    const items = map.get(type) ?? [];
    return {
      type,
      items,
      unread: items.filter((item) => !item.isRead).length,
    };
  });
};

export const formatRelativeTime = (timestamp: string): string => {
  const date = new Date(timestamp);
  const deltaSeconds = Math.round((date.getTime() - Date.now()) / 1000);

  if (Number.isNaN(deltaSeconds)) {
    return "just now";
  }

  const units: Array<[Intl.RelativeTimeFormatUnit, number]> = [
    ["year", 60 * 60 * 24 * 365],
    ["month", 60 * 60 * 24 * 30],
    ["day", 60 * 60 * 24],
    ["hour", 60 * 60],
    ["minute", 60],
  ];

  for (const [unit, secondsInUnit] of units) {
    if (Math.abs(deltaSeconds) >= secondsInUnit) {
      return new Intl.RelativeTimeFormat(undefined, { numeric: "auto" }).format(
        Math.round(deltaSeconds / secondsInUnit),
        unit,
      );
    }
  }

  return "just now";
};
