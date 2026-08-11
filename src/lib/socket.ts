import { io, type Socket } from "socket.io-client";
import Cookies from "js-cookie";
import { notificationConfig } from "./notification";
import { authCookieNames } from "@/src/lib/auth/config";

let socket: Socket | null = null;

export const getNotificationSocket = () => {
  if (!notificationConfig.socketUrl) {
    return null;
  }

  if (!socket) {
    socket = io(notificationConfig.socketUrl, {
      withCredentials: true,
      transports: ["websocket", "polling"],
      auth: (setAuth) => {
        const token =
          (typeof window !== "undefined"
            ? Cookies.get(authCookieNames.token)
            : undefined) ?? "";
        setAuth(token ? { token } : {});
      },
    });
  }

  return socket;
};
export const disconnectNotificationSocket = () => {
  if (!socket) return;

  socket.disconnect();
  socket = null;
};
