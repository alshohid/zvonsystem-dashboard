import React from "react";
import RoleDashboardShell from "@/src/sharedComponents/layouts/RoleDashboardShell";


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
        "/admin/dashboard/releases/create",
        "/admin/dashboard/releases/your-releases",
        "/admin/dashboard/releases/moderation",
        "/admin/dashboard/releases/drafts",
        "/admin/dashboard/releases/changes",
        "/admin/dashboard/releases",
        "/admin/dashboard/performance",
        "/admin/dashboard/notifications",
        "/admin/dashboard/settings",

      ]}
    >
      {children}
    </RoleDashboardShell>
  );
}
