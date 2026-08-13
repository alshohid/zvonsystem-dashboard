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
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 500,
      reconnectionDelayMax: 3000,
      timeout: 10000,
      auth: (setAuth) => {
        const token =
          typeof window !== "undefined"
            ? Cookies.get(authCookieNames.token)
            : undefined;
        setAuth(token ? { token } : {});
      },
    });

    socket.on("connect", () => {
      //   console.log(
      //     "[notification] socket connected",
      //     socket?.id ? `id=${socket.id}` : "",
      //   );
    });

    socket.on("disconnect", (reason) => {});

    socket.on("connect_error", (error) => {
      console.error("[notification] socket connect_error:", error);
    });
  }

  return socket;
};

export const disconnectNotificationSocket = () => {
  if (!socket) return;

  socket.removeAllListeners();
  socket.disconnect();
  socket = null;
};
