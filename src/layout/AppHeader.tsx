"use client";

import { useMemo } from "react";
import { usePathname } from "next/navigation";
import {
  Menu,
} from "lucide-react";
import NotificationDropdown from "@/src/components/header/NotificationDropdown";
import { useSidebar } from "@/src/context/SidebarContext";
import { buildCrumbs } from "@/src/lib/helper/breadcrumbs";
import { RightGoingArrow } from "../icons";
import { useGetMeQuery } from "../redux/features/auth/authapi";
import { getInitials } from "../lib/nameHandling";

const AppHeader = () => {
  const pathname = usePathname();
  const { toggleMobileSidebar } = useSidebar();
  const { data: userInfo, isLoading } = useGetMeQuery()
  const user = userInfo?.data;

  const role = user?.type;
  const initials = user?.name ? getInitials(user.name) : "Name";

  const crumbs = useMemo(() => {
    const derivedCrumbs = buildCrumbs(pathname || "/");

    if (derivedCrumbs.length === 1 && derivedCrumbs[0] === "Home") {
      return ["Overview", "Dashboard"];
    }

    return ["Overview", ...derivedCrumbs];
  }, [pathname]);
  if (isLoading) {
    return <div> Loading...</div>;
  }
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
          <div data-tour="header-notifications">
            <NotificationDropdown role={role} />
          </div>

          <div
            data-tour="header-user"
            className="flex items-center gap-3 rounded-full border border-[#E7EBF7] bg-[#FBFCFF] px-2 py-1.5"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#EDFFE7] text-sm font-semibold text-[#2E3A83]">
              {initials}
            </div>

            <div className="hidden pr-2 sm:block">
              <p className="text-sm font-semibold text-[#101828]">
                {user?.name ?? ""}
              </p>

              <p className="text-xs text-[#667085]">
                {role}
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
