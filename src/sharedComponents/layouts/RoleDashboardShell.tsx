"use client";

import { usePathname } from "next/navigation";
import React from "react";
import DesignModePlaceholder from "@/src/components/design/DesignModePlaceholder";
import { useSidebar } from "@/src/context/SidebarContext";
import { env } from "@/src/lib/env";
import AppHeader from "@/src/layout/AppHeader";
import AppSidebar from "@/src/layout/AppSidebar";
import Backdrop from "@/src/layout/Backdrop";
import TourHost from "@/src/components/onboarding/TourHost";
import type { DashboardRole } from "@/src/lib/sidebarConfig";

type RoleDashboardShellProps = {
  children: React.ReactNode;
  role: DashboardRole;
  dashboardHref: string;
  placeholderTitle: string;
  implementedPaths?: string[];
};

export default function RoleDashboardShell({
  children,
  role,
  dashboardHref,
  placeholderTitle,
  implementedPaths = [],
}: RoleDashboardShellProps) {
  const { isExpanded, isMobileOpen } = useSidebar();
  const pathname = usePathname();

  const mainContentMargin = isMobileOpen
    ? "ml-0"
    : isExpanded
      ? "lg:ml-[17.5rem]"
      : "lg:ml-[5.5rem]";

  const isDashboardHome = pathname === dashboardHref;
  const isImplementedPath = implementedPaths.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`),
  );

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#FFFFFF]">
      <AppSidebar role={role} />
      <Backdrop />
      <TourHost role={role} />

      <div
        className={`flex-1 overflow-x-hidden transition-all duration-300 ease-in-out ${mainContentMargin}`}
      >
        <AppHeader />
        <div className="p-4 sm:p-6">
          {env.designMode && !isDashboardHome && !isImplementedPath ? (
            <DesignModePlaceholder
              title={placeholderTitle}
              dashboardHref={dashboardHref}
            />
          ) : (
            children
          )}
        </div>
      </div>
    </div>
  );
}
