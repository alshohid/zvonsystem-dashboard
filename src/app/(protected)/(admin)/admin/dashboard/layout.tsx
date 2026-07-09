import React from "react";
import RoleDashboardShell from "@/src/sharedComponents/layouts/RoleDashboardShell";
import { getCarrierRouteConfig } from "@/src/lib/carrierRoutes";

export default function AdminDashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <RoleDashboardShell
      role="admin"
      dashboardHref="/admin/dashboard"
      placeholderTitle="Admin Workspace Placeholder"
      implementedPaths={[
        "/admin/dashboard/user-management",
        "/admin/dashboard/dispatchers",
        "/admin/dashboard/analytics",
        "/admin/dashboard/guide",
        "/admin/dashboard/support",
        "/admin/dashboard/performance",
        "/admin/dashboard/notifications",
        "/admin/dashboard/settings",
        "/admin/dashboard/documents",
        "/admin/dashboard/invoices",
        "/admin/dashboard/statements",
        "/admin/dashboard/pricing-plan",
        getCarrierRouteConfig('admin').listPath
      ]}
    >
      {children}
    </RoleDashboardShell>
  );
}
