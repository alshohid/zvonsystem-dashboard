"use client";

import { useMemo } from "react";
import { usePathname } from "next/navigation";
import {
  Menu,
} from "lucide-react";
import NotificationDropdown from "@/src/components/header/NotificationDropdown";
import { useSidebar } from "@/src/context/SidebarContext";
import { buildCrumbs } from "@/src/lib/helper/breadcrumbs";
import { MessageIcon, RightGoingArrow } from "../icons";

const AppHeader = () => {
  const pathname = usePathname();
  const { toggleMobileSidebar } = useSidebar();

  const crumbs = useMemo(() => {
    const derivedCrumbs = buildCrumbs(pathname || "/");

    if (derivedCrumbs.length === 1 && derivedCrumbs[0] === "Home") {
      return ["Overview", "Dashboard"];
    }

    return ["Overview", ...derivedCrumbs];
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-[#E7EBF7] bg-[#FFFFFF] backdrop-blur">
      <div className="flex flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <button
            type="button"
            onClick={toggleMobileSidebar}
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-[#E3E8F7] text-[#344054] transition hover:bg-[#F8FAFF] lg:hidden"
            aria-label="Open sidebar"
          >
            <Menu size={20} />
          </button>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2 text-[1rem]">
              {crumbs.map((crumb, index) => (
                <div key={`${crumb}-${index}`} className="flex items-center gap-2">
                  <span
                    className={
                      index === crumbs.length - 1
                        ? "font-semibold text-[#101828]"
                        : "text-[#667085]"
                    }
                  >
                    {crumb}
                  </span>
                  {index !== crumbs.length - 1 && (
                    <span className="text-[#D0D5DD]">
                      <RightGoingArrow />
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#E3E8F7] text-[#2E3A83] transition hover:bg-[#F5F7FF]"
            aria-label="Messages"
          >
            <MessageIcon />
          </button>

          <NotificationDropdown />

          <div className="flex items-center gap-3 rounded-full border border-[#E7EBF7] bg-[#FBFCFF] px-2 py-1.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#DDE4FF] text-sm font-semibold text-[#2E3A83]">
              WR
            </div>
            <div className="hidden pr-2 sm:block">
              <p className="text-sm font-semibold text-[#101828]">Wisely Reed</p>
              <p className="text-xs text-[#667085]">Admin</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
