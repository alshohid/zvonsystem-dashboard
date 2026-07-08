"use client";
import React, { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;

  showCloseButton?: boolean;
  isFullscreen?: boolean;
  contentBgClassName?: string; // modal body bg
  textClassName?: string;      // modal text color
  overlayClassName?: string;   // backdrop bg
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  className,
  showCloseButton = true,
  isFullscreen = false,
  contentBgClassName = "bg-white dark:bg-gray-900",
  textClassName = "text-gray-800 dark:text-gray-100",
  overlayClassName = "bg-[#100F0F59] backdrop-blur-[2px]",
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    if (isOpen) document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const contentBaseClasses = isFullscreen
    ? "w-full h-full"
    : "relative w-full rounded-3xl";

  return (
    <div className="fixed inset-0 z-99999 flex items-center justify-center overflow-y-auto">
      {/* Overlay */}
      {!isFullscreen && (
        <div
          className={cn("fixed inset-0", overlayClassName)}
          onClick={onClose}
        />
      )}

      {/* Modal Content */}
      <div
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        className={cn(
          contentBaseClasses,
          contentBgClassName,
          textClassName,
          className
        )}
      >
        {showCloseButton && !isFullscreen && (
          <button
            onClick={onClose}
            className="absolute right-3 top-3 z-10 flex h-9.5 w-9.5 items-center justify-center rounded-full sm:right-6 sm:top-6 sm:h-11 sm:w-11 border"
          >
            ✕
          </button>
        )}

        <div>{children}</div>
      </div>
    </div>
  );
};
