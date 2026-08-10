export const notificationConfig = {
  socketUrl: "",
  notificationsPage: "/notifications",
  pageLimit: 20,
  socketEventNames: [
    "notification:new",
    "notification:unread:updated",
  ],
};
