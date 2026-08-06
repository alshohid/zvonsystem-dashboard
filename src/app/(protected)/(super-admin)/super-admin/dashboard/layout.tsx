import React from "react";
import RoleDashboardShell from "@/src/sharedComponents/layouts/RoleDashboardShell";

export default function SuperAdminDashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <RoleDashboardShell
      role="super-admin"
      dashboardHref="/super-admin/dashboard"
      placeholderTitle="Super Admin Workspace Placeholder"
      implementedPaths={[
        "/super-admin/dashboard",
        "/super-admin/dashboard/user-management",
        "/super-admin/dashboard/settings",
        "/super-admin/dashboard/invoices",
        "/super-admin/dashboard/pricing-plan",
        "/super-admin/dashboard/pricing-management",
        "/super-admin/dashboard/revenue-analytics",
      ]}
    >
      {children}
    </RoleDashboardShell>
  );
}
