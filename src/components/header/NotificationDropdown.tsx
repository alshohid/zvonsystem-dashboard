"use client";

import { Bell, CheckCheck, Trash2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNotifications } from "@/src/context/NotificationContext";
import { NotificationIcon } from "@/src/icons";
import { formatRelativeTime } from "@/src/lib/notification/helpers";
import { useRouter } from "next/navigation";


export default function NotificationDropdown({ role }: { role: "ADMIN" | "CLIENT" | undefined }) {

  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const {
    notifications,
    unreadCount,
    markRead,
    markAllRead,
    deleteNotification,
  } = useNotifications();

  const displayNotifications = notifications;
  const hasUnread = unreadCount > 0;


  useEffect(() => {
    if (!isOpen) {
      return;
    }
    const handlePointerDown = (event: MouseEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  const handleMarkAsRead = async (id: string) => {
    await markRead(id);
  };

  const handleMarkAllRead = async () => {
    await markAllRead();
  };

  const handleDelete = async (id: string) => {
    await deleteNotification(id);
  };

  return (
    <div ref={wrapperRef} className="relative ">
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        className={[
          "relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#E3E8F7] text-[#2E3A83] transition",
          isOpen ? "bg-[#F5F7FF]" : "bg-white hover:bg-[#F5F7FF]",
        ].join(" ")}
        aria-label="Notifications"
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        aria-controls="app-header-notifications"
      >
        {hasUnread && (
          <span className="absolute -right-1 -top-1 flex min-h-5 min-w-5 items-center justify-center rounded-full bg-[#EF4444] px-1 text-[11px] font-semibold leading-none text-white ring-2 ring-white">
            {unreadCount > 99 ? "99+" : unreadCount ?? 0}
          </span>
        )}
        <NotificationIcon />
      </button>

      {isOpen && (
        <div
          id="app-header-notifications"
          role="dialog"
          aria-label="Notifications"
          className="fixed left-2 right-2 top-19 z-[70] overflow-hidden rounded-xl border border-[#EAECF0] bg-white shadow-[0_24px_56px_rgba(16,24,40,0.16)] sm:left-4 sm:right-4 md:absolute md:left-auto md:right-0 md:top-full md:mt-3 md:w-[min(31.25rem,calc(100vw-2rem))]"
        >
          <div className="flex max-h-[min(36.4375rem,calc(100dvh-5.5rem))] flex-col px-4 py-5 sm:px-4 sm:py-8">
            <div className="mb-6 flex items-center justify-between gap-4 border-b border-[#EAECF0] pb-5">
              <h2 className="text-[1.25rem] font-semibold tracking-[-0.02em] text-[#101828]">
                Notification
              </h2>

              <button
                type="button"
                onClick={handleMarkAllRead}
                disabled={!hasUnread}
                className="text-base text-[#98A2B3] underline-offset-2 transition hover:text-[#667085] hover:underline disabled:cursor-default disabled:text-[#D0D5DD] disabled:no-underline"
              >
                Mark all as read
              </button>
            </div>

            <ul className="min-h-0 overflow-y-auto pr-1 custom-scrollbar">
              {displayNotifications.map((notification) => (
                <li
                  key={notification.id}
                  className="border-b border-[#EAECF0] py-5 last:border-b-0 last:pb-0 first:pt-0 sm:py-6"
                >
                  <article className="flex items-start gap-4">
                    <span className="mt-0.5 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#EAECF0] bg-white text-[#98A2B3] sm:h-12 sm:w-12">
                      <Bell size={19} strokeWidth={1.8} />
                    </span>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <h3 className="pr-3 text-[1rem] font-semibold leading-7 text-[#4B5563] sm:text-[1rem]">
                          {notification.title}
                        </h3>

                        <div className="ml-auto flex shrink-0 items-center gap-2 text-sm text-[#98A2B3]">
                          <span>{formatRelativeTime(notification.createdAt)}</span>
                          {!notification.isRead && (
                            <span className="h-2.5 w-2.5 rounded-full bg-[#EF4444]" />
                          )}
                        </div>
                      </div>

                      <p className="mt-2 text-base leading-7 text-[#667085] sm:text-[1.0625rem]">
                        {notification.message}
                        <span className="ml-2 inline-flex items-center gap-1">
                          {!notification.isRead && (
                            <button
                              type="button"
                              onClick={() => handleMarkAsRead(notification.id)}
                              className="inline whitespace-nowrap text-[#0D6EFD] underline-offset-2 transition hover:underline"
                              title="Mark as read"
                            >
                              <CheckCheck size={14} />
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => handleDelete(notification.id)}
                            className="inline text-[#EF4444] transition hover:text-[#DC2626]"
                            title="Delete"
                          >
                            <Trash2 size={14} />
                          </button>
                        </span>
                      </p>
                    </div>
                  </article>
                </li>
              ))}

              {displayNotifications.length === 0 && (
                <li className="py-8 text-center text-sm text-[#667085]">
                  No notifications yet.
                </li>
              )}
            </ul>

            {notifications?.length > 7 && (
              <div className="mt-4 border-t border-[#EAECF0] pt-4 text-center">
                {role === "CLIENT" && (
                  <button
                    type="button"
                    onClick={() => router.push("/admin/dashboard/notifications")}
                    className="text-sm font-medium text-[#3B82F6] hover:underline"
                  >
                    View all notifications
                  </button>
                )}
                {role === "ADMIN" && (
                  <button
                    type="button"
                    onClick={() => router.push("/super-admin/dashboard/notifications")}
                    className="text-sm font-medium text-[#3B82F6] hover:underline"
                  >
                    View all notifications
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
