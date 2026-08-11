/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-function-type */

import { disconnectNotificationSocket, getNotificationSocket } from "../socket";

class NotificationService {
  private listeners: Map<string, Function[]> = new Map();
  private socketListenersAttached = false;

  private attachSocketListeners() {
    if (this.socketListenersAttached) return;

    const s = getNotificationSocket();
    if (!s) return;

    // s.onAny((event: string, ...args: any[]) => {
    //   console.log("[notification] event:", event, args);
    // });

    s.on("notification:new", (data: unknown) => {
      // console.log("[notification] new:", data);
      this.emit("notification:new", data);
    });

    s.on("notification:unread:updated", (data: unknown) => {
      // console.log("[notification] unread:", data);
      this.emit("notification:unread:updated", data);
    });

    this.socketListenersAttached = true;
  }

  connect() {
    const s = getNotificationSocket();
    if (!s) return;

    // Attach listeners only once per socket instance. If the underlying
    // socket was recreated after a disconnect, socketListenersAttached
    // was reset in disconnect(), so we re-register here.
    if (!this.socketListenersAttached) {
      this.attachSocketListeners();
    }
  }

  disconnect() {
    this.socketListenersAttached = false;
    disconnectNotificationSocket();
  }

  /**
   * Register event listener
   */
  on(event: string, callback: Function) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event)!.push(callback);
  }

  /**
   * Remove event listener
   */
  off(event: string, callback: Function) {
    if (this.listeners.has(event)) {
      const callbacks = this.listeners.get(event)!;
      const index = callbacks.indexOf(callback);
      if (index !== -1) {
        callbacks.splice(index, 1);
      }
    }
  }

  /**
   * Emit event to listeners
   */
  private emit(event: string, data: unknown) {
    if (this.listeners.has(event)) {
      this.listeners.get(event)!.forEach((callback) => {
        callback(data);
      });
    }
  }

  /**
   * Mark notification as read via socket
   */
  markAsRead(notificationId: string) {
    const s = getNotificationSocket();
    if (s) {
      s.emit("notification:read", { notificationId });
    }
  }

  /**
   * Mark all notifications as read via socket
   */
  markAllAsRead() {
    const s = getNotificationSocket();
    if (s) {
      s.emit("notification:read:all");
    }
  }
}

export const notificationService = new NotificationService();
