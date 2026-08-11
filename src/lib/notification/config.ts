import { env } from "@/src/lib/env";

export const notificationConfig = {
  socketUrl: `${env.socketUrl}`,
  notificationsPage: "/notifications",
  pageLimit: 20,
  socketEventNames: ["notification:new", "notification:unread:updated"],
};
