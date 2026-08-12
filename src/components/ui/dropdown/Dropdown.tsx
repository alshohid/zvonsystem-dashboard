"use client";
import type React from "react";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";

interface DropdownProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;

  className?: string;

  // ✅ parent override support
  bgClassName?: string;    // e.g. "bg-white dark:bg-[#5952FF]"
  textClassName?: string;  // e.g. "text-gray-800 dark:text-white"

  /**
   * When provided, the menu is rendered through a portal positioned at this
   * trigger element. This avoids the menu being clipped by ancestors that use
   * `overflow-hidden` / `overflow-x-auto` (e.g. inside tables).
   */
  anchorRef?: React.RefObject<HTMLElement | null>;

  /** Alignment of the menu relative to its anchor. */
  align?: "start" | "end";
}

export const Dropdown: React.FC<DropdownProps> = ({
  isOpen,
  onClose,
  children,
  className,

  // ✅ defaults
  bgClassName = "bg-white dark:bg-[#5952FF]",
  textClassName = "text-gray-800 dark:text-white",

  anchorRef,
  align = "end",
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [styles, setStyles] = useState<React.CSSProperties | null>(null);

  const reposition = useCallback(() => {
    const anchor = anchorRef?.current;
    if (!anchor) return;

    const anchorRect = anchor.getBoundingClientRect();
    const menuWidth = dropdownRef.current?.offsetWidth ?? 0;
    const left = align === "end" ? anchorRect.right - menuWidth : anchorRect.left;

    setStyles({
      position: "fixed",
      top: anchorRect.bottom + 8,
      left: Math.max(8, left),
      zIndex: 999999,
    });
  }, [anchorRef, align]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(target as Node) &&
        !target.closest(".dropdown-toggle")
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  useEffect(() => {
    if (!isOpen) return;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    reposition();
    window.addEventListener("resize", reposition);
    window.addEventListener("scroll", reposition, true);

    return () => {
      window.removeEventListener("resize", reposition);
      window.removeEventListener("scroll", reposition, true);
    };
  }, [isOpen, reposition]);

  // Runs before paint so the portaled menu is positioned without a visual flash.
  useLayoutEffect(() => {
    if (isOpen && anchorRef && dropdownRef.current) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      reposition();
    }
  }, [isOpen, anchorRef, children, reposition]);

  if (!isOpen) return null;

  if (anchorRef) {
    return createPortal(
      <div
        ref={dropdownRef}
        style={styles ?? undefined}
        className={cn(
          "fixed mt-2 rounded-xl border border-gray-200 shadow-theme-lg dark:border-gray-800",
          bgClassName,
          textClassName,
          className
        )}
      >
        {children}
      </div>,
      document.body
    );
  }

  return (
    <div
      ref={dropdownRef}
      className={cn(
        "absolute z-[999999] right-0 mt-2 rounded-xl border border-gray-200 shadow-theme-lg dark:border-gray-800",
        bgClassName,
        textClassName,
        className
      )}
    >
      {children}
    </div>
  );
};
