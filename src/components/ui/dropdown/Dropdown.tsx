"use client";
import type React from "react";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface DropdownProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;

  className?: string;

  // ✅ parent override support
  bgClassName?: string;    // e.g. "bg-white dark:bg-[#5952FF]"
  textClassName?: string;  // e.g. "text-gray-800 dark:text-white"
}

export const Dropdown: React.FC<DropdownProps> = ({
  isOpen,
  onClose,
  children,
  className,

  // ✅ defaults
  bgClassName = "bg-white dark:bg-[#5952FF]",
  textClassName = "text-gray-800 dark:text-white",
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  if (!isOpen) return null;

  return (
    <div
      ref={dropdownRef}
      className={cn(
        "absolute z-40 right-0 mt-2 rounded-xl border border-gray-200 shadow-theme-lg dark:border-gray-800",
        bgClassName,
        textClassName,
        className
      )}
    >
      {children}
    </div>
  );
};
