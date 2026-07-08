"use client";
import React from "react";


interface SidebarHeaderProps {
  isExpanded: boolean;
  isMobile: boolean;
  subtitle: string;
  onToggle: () => void;
}

export const SidebarHeader: React.FC<SidebarHeaderProps> = ({
  isExpanded,
  isMobile,
  subtitle,
  onToggle,
}) => {
  return (
    <div className="w-full">
      <div className="flex w-full items-start justify-between">
        <div className="flex flex-col gap-2">
          {/* ✅ Logo text like Figma */}
          <div
            className="text-[#FFFFFE]  font-bold leading-none cursor-pointer"
            onClick={onToggle}
          >
            LOGO
          </div>

          {(isExpanded || isMobile) && (
            <p className="text-[#FFFFFE]/70 text-xs">{subtitle}</p>
          )}
        </div>

        {/* Toggle */}
        <button
          onClick={onToggle}
          className="mt-1 text-[#FFFFFE]/80 hover:text-[#FFFFFE] transition-colors"
          aria-label="Toggle Sidebar"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`transition-transform duration-300 ${!isExpanded ? "rotate-180 cursor-pointer" : "cursor-pointer"}`}
          >
            <path
              d="M20 17.44V6.56C20 5.14615 18.8539 4 17.44 4H6.56C5.14615 4 4 5.14615 4 6.56V17.44C4 18.8539 5.14615 20 6.56 20H17.44C18.8539 20 20 18.8539 20 17.44Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M8 8L8 16"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M15 9L12 12L15 15"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>


  );
};
