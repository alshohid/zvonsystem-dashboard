import type { IBaseResponse } from "@/src/types/dashboardTypes";

export type NotificationKind =
  | "milestone"
  | "follower"
  | "playlist"
  | "royalty"
  | "changes"
  | "collaboration";

export interface INotificationItem {
  id: string;
  kind: NotificationKind;
  title: string;
  message: string;
  occurredAgo: string;
  isRead: boolean;
}

export interface INotificationsOverviewData {
  notifications: INotificationItem[];
}

export interface INotificationsOverviewResponse extends IBaseResponse {
  data: INotificationsOverviewData;
}
