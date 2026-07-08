"use client";

import { usePathname } from "next/navigation";
import { useSidebar } from "@/src/context/SidebarContext";
import DesignModePlaceholder from "@/src/components/design/DesignModePlaceholder";
import { env } from "@/src/lib/env";
import AppHeader from "@/src/layout/AppHeader";
import AppSidebar from "@/src/layout/AppSidebar";
import Backdrop from "@/src/layout/Backdrop";
import React from "react";

export default function AdminDashboardShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isExpanded, isMobileOpen } = useSidebar();
  const pathname = usePathname();

  const mainContentMargin = isMobileOpen
    ? "ml-0"
    : isExpanded
      ? "lg:ml-[17.5rem]"
      : "lg:ml-[5.5rem]";

  const isDashboardHome = pathname === "/admin/dashboard";

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#F5F7FB]">
      <AppSidebar role="admin" />
      <Backdrop />

      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${mainContentMargin} overflow-x-hidden`}
      >
        <AppHeader />
        <div className="p-4 sm:p-6">
          {env.designMode && !isDashboardHome ? (
            <DesignModePlaceholder
              title="Page Ready For Rebuild"
              dashboardHref="/admin/dashboard"
            />
          ) : (
            children
          )}
        </div>
      </div>
    </div>
  );
}
