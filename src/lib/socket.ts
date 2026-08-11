import { io, type Socket } from "socket.io-client";
import Cookies from "js-cookie";
import { notificationConfig } from "./notification";
import { authCookieNames } from "@/src/lib/auth/config";

let socket: Socket | null = null;

/**
 * Returns the singleton notification socket, creating it if needed.
 *
 * Socket.IO v4 defaults to infinite reconnection attempts, which causes
 * a tight connect/disconnect loop when the server rejects auth or drops
 * the connection. We cap attempts and add backoff so the client settles.
 */
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

    socket.on("disconnect", (reason) => {
      //   console.log("[notification] socket disconnected:", reason);
    });

    socket.on("connect_error", (error) => {
      console.error("[notification] socket connect_error:", error);
    });
  }

  return socket;
};

/**
 * Tears down the singleton notification socket and resets the module-level
 * reference so a subsequent call to getNotificationSocket() starts fresh.
 */
export const disconnectNotificationSocket = () => {
  if (!socket) return;

  // Remove all listeners before disconnecting so stale callbacks cannot
  // trigger against a freshly created socket after reconnect.
  socket.removeAllListeners();
  socket.disconnect();
  socket = null;
};
