"use client";

import { Bell } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { NotificationIcon } from "@/src/icons";

type HeaderNotification = {
  id: string;
  title: string;
  message: string;
  actionLabel: string;
  time: string;
  unread: boolean;
};

const INITIAL_NOTIFICATIONS: HeaderNotification[] = [
  {
    id: "notification-1",
    title: "New User Registration",
    message: "A new user registered as Driver",
    actionLabel: "View",
    time: "2m ago",
    unread: true,
  },
  {
    id: "notification-2",
    title: "CDL Expiration alert",
    message:
      "The CDL for driver John Doe has reached its expiration date. Please ensure renewal and upload the updated document.",
    actionLabel: "View Driver Profile",
    time: "2m ago",
    unread: false,
  },
  {
    id: "notification-3",
    title: "Document Verification (Driver)",
    message: "A new document submitted by John Doe is pending for your review.",
    actionLabel: "View",
    time: "2m ago",
    unread: false,
  },
  {
    id: "notification-4",
    title: "Document Verification (Dispatcher)",
    message:
      "A new document submitted by Rock Millar is pending for your review.",
    actionLabel: "View",
    time: "2m ago",
    unread: false,
  },
];

export default function NotificationDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const hasUnread = notifications.some((notification) => notification.unread);

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

  const markAllAsRead = () => {
    setNotifications((currentNotifications) =>
      currentNotifications.map((notification) => ({
        ...notification,
        unread: false,
      })),
    );
  };

  const markAsRead = (id: string) => {
    setNotifications((currentNotifications) =>
      currentNotifications.map((notification) =>
        notification.id === id
          ? {
            ...notification,
            unread: false,
          }
          : notification,
      ),
    );
  };

  return (
    <div ref={wrapperRef} className="relative">
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
          <span className="absolute right-[0.4rem] top-[0.38rem] h-2.5 w-2.5 rounded-full bg-[#EF4444] ring-2 ring-white" />
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
                onClick={markAllAsRead}
                disabled={!hasUnread}
                className="text-base text-[#98A2B3] underline-offset-2 transition hover:text-[#667085] hover:underline disabled:cursor-default disabled:text-[#D0D5DD] disabled:no-underline"
              >
                Mark all as read
              </button>
            </div>

            <ul className="min-h-0 overflow-y-auto pr-1 custom-scrollbar">
              {notifications.map((notification) => (
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
                          <span>{notification.time}</span>
                          {notification.unread && (
                            <span className="h-2.5 w-2.5 rounded-full bg-[#EF4444]" />
                          )}
                        </div>
                      </div>

                      <p className="mt-2 text-base leading-7 text-[#667085] sm:text-[1.0625rem]">
                        {notification.message}
                        <button
                          type="button"
                          onClick={() => markAsRead(notification.id)}
                          className="ml-1 inline whitespace-nowrap text-[#0D6EFD] underline-offset-2 transition hover:underline"
                        >
                          {notification.actionLabel}
                        </button>
                      </p>
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
