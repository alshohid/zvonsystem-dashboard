export enum NotificationType {
  // Release related
  RELEASE_STATUS_UPDATE = "RELEASE_STATUS_UPDATE",
  MODERATION_FEEDBACK = "MODERATION_FEEDBACK",
  RELEASE_SCHEDULED = "RELEASE_SCHEDULED",

  // Subscription & Payment related
  PAYMENT_RECEIVED = "PAYMENT_RECEIVED",
  SUBSCRIPTION_ACTIVATED = "SUBSCRIPTION_ACTIVATED",
  SUBSCRIPTION_CANCELLED = "SUBSCRIPTION_CANCELLED",
  SUBSCRIPTION_EXPIRED = "SUBSCRIPTION_EXPIRED",
  SUBSCRIPTION_RENEWED = "SUBSCRIPTION_RENEWED",
  PAYMENT_FAILED = "PAYMENT_FAILED",

  // System
  SYSTEM = "SYSTEM",

  // Feature related
  FEATURE_ANNOUNCEMENT = "FEATURE_ANNOUNCEMENT",
  WEEKLY_DIGEST = "WEEKLY_DIGEST",
}

export interface INotificationData {
  [key: string]: unknown;
}

export interface INotificationItem {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  data: INotificationData;
  isRead: boolean;
  readAt: string | null;
  createdAt: string;
}

export interface INotificationsMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  unreadCount: number;
}

export interface INotificationsResponse {
  success: boolean;
  message: string;
  data: INotificationItem[];
  meta: INotificationsMeta;
}

export interface INotificationUnreadCountResponse {
  success: boolean;
  data: { unreadCount: number };
}
