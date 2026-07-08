import React from "react";
import RoleDashboardShell from "@/src/sharedComponents/layouts/RoleDashboardShell";
import { getCarrierRouteConfig } from "@/src/lib/carrierRoutes";
import ToastProvider from "@/src/components/dispatcher/providers/ToastProvider";

export default function DispatcherDashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <RoleDashboardShell
      role="dispatcher"
      dashboardHref="/dispatcher/dashboard"
      placeholderTitle="Dispatcher Workspace Placeholder"
      implementedPaths={[
        '/dispatcher/dashboard/reports',
        '/dispatcher/dashboard/loads',
        '/dispatcher/dashboard/communications',
        getCarrierRouteConfig('dispatcher').listPath,
        '/dispatcher/dashboard/settings',
        '/dispatcher/dashboard/documents',
        '/dispatcher/dashboard/invoices',
        '/dispatcher/dashboard/statements',
        '/dispatcher/dashboard/drivers',
        '/dispatcher/dashboard/supports',
      ]}
    >
      {children}
      <ToastProvider />
    </RoleDashboardShell>
  );
}
