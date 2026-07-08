"use client";

import React from "react";
import Link from "next/link";
import { ChevronDownIcon } from "@/src/icons/index";
import type { NavItem } from "@/src/lib/sidebarConfig";

interface SidebarMenuItemProps {
  item: NavItem;
  index: number;
  isActive: (path: string) => boolean;
  isExpanded: boolean;
  isMobile: boolean;
  openSubmenu: number | null;
  subMenuHeight: number;
  subMenuRef: (el: HTMLDivElement | null) => void;
  hoveredItem: string | null;
  onSubmenuToggle: (index: number) => void;
  onMouseEnter: (name: string) => void;
  onMouseLeave: () => void;
}

const ACTIVE_BG =
  "bg-[radial-gradient(211.1%_196.97%_at_32.92%_-67.57%,rgba(222,242,206,0.10)_24.04%,rgba(222,242,206,0.34)_100%)]";

const BASE_ITEM =
  // ✅ Figma padding/gap/radius
  "w-full flex items-center gap-[0.4375rem] px-[0.625rem] py-1 rounded-[0.75rem] " +
  "transition-colors text-[#FFFFFE]";

const HOVER_BG = "hover:bg-white/10";

const TOOLTIP =
  "absolute left-full ml-2 px-2 py-1 text-xs rounded-md whitespace-nowrap " +
  "bg-black/70 text-white shadow-lg pointer-events-none";

export const SidebarMenuItem: React.FC<SidebarMenuItemProps> = ({
  item,
  index,
  isActive,
  isExpanded,
  isMobile,
  openSubmenu,
  subMenuHeight,
  subMenuRef,
  hoveredItem,
  onSubmenuToggle,
  onMouseEnter,
  onMouseLeave,
}) => {
  const showTooltip = !isExpanded && !isMobile && hoveredItem === item.name;
  const showContent = isExpanded || isMobile;
  const isSubmenuOpen = openSubmenu === index;

  // helper to decide active bg
  const getItemClass = (active: boolean) =>
    [
      BASE_ITEM,
      active ? ACTIVE_BG : HOVER_BG,
      !isExpanded && !isMobile ? "justify-center" : "justify-start",
    ].join(" ");

  if (item.subItems?.length) {
    return (
      <div className="relative">
        <button
          type="button"
          onClick={() => onSubmenuToggle(index)}
          className={getItemClass(isSubmenuOpen)}
          onMouseEnter={() => onMouseEnter(item.name)}
          onMouseLeave={onMouseLeave}
        >
          <span className="shrink-0 relative">
            <IconWrap active={isSubmenuOpen}>{item.icon}</IconWrap>

            {showTooltip && (
              <div className={TOOLTIP}>
                {item.name}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full w-0 h-0 border-t-4 border-t-transparent border-r-4 border-r-black/70 border-b-4 border-b-transparent" />
              </div>
            )}
          </span>

          {showContent && (
            <>
              <span className="flex-1 text-left text-[1rem] font-medium">
                {item.name}
              </span>

              <ChevronDownIcon
                className={[
                  "w-4 h-4 transition-transform",
                  isSubmenuOpen ? "rotate-180" : "",
                ].join(" ")}
              />
            </>
          )}
        </button>

        {/* submenu */}
        {showContent && (
          <div
            ref={subMenuRef}
            className="overflow-hidden transition-[height] duration-300 ease-in-out"
            style={{ height: isSubmenuOpen ? `${subMenuHeight}px` : "0px" }}
          >
            <div className="pl-3 pt-1 space-y-1">
              {item.subItems.map((subItem) => {
                const subActive = isActive(subItem.path);

                return (
                  <Link
                    key={subItem.path}
                    href={subItem.path}
                    className={[
                      // slightly smaller indent items
                      "flex items-center gap-2 px-[0.625rem] py-1 rounded-[0.75rem] transition-colors",
                      "text-[#FFFFFE] text-[1rem]",
                      subActive ? ACTIVE_BG : "hover:bg-white/10",
                    ].join(" ")}
                  >
                    {subItem.icon && (
                      <span className="shrink-0 text-inherit">
                        {subItem.icon}
                      </span>
                    )}
                    <span className="font-normal">{subItem.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  }


  const active = isActive(item.path || "");

  return (
    <div className="relative">
      <Link
        href={item.path || "#"}
        className={getItemClass(active)}
        onMouseEnter={() => onMouseEnter(item.name)}
        onMouseLeave={onMouseLeave}
      >
        <span className="shrink-0 relative">
          <IconWrap active={active}>{item.icon}</IconWrap>

          {showTooltip && (
            <div className={TOOLTIP}>
              {item.name}
              <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full w-0 h-0 border-t-4 border-t-transparent border-r-4 border-r-black/70 border-b-4 border-b-transparent" />
            </div>
          )}
        </span>

        {showContent && <span className="text-[1rem] font-normal">{item.name}</span>}
      </Link>
    </div>
  );
};
// ✅ Force icons to follow text color
const IconWrap = ({ active, children }: { active: boolean; children: React.ReactNode }) => {
  return (
    <span
      className={[
        "shrink-0 inline-flex items-center justify-center",
        active ? "text-white" : "text-white/80",
        // ✅ make svg inherit currentColor
        "[&_svg]:fill-current [&_svg]:stroke-current",
        // if lucide icons (stroke based)
        "[&_svg]:text-current",
      ].join(" ")}
    >
      {children}
    </span>
  );
};