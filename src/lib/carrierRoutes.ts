import type { DashboardRole } from "./dashboardRoles";

export type CarrierRouteConfig = {
  role: DashboardRole;
  listPath: string;
  addPath: string;
  detailPath: (carrierId: string, tab?: string) => string;
};

const carrierBasePathByRole: Record<DashboardRole, string> = {
  dispatcher: "/dispatcher/dashboard/carriers",
  admin: "/admin/dashboard/carriers",
  "super-admin": "/super-admin/dashboard/carriers",
};

function withTab(path: string, tab?: string) {
  return tab ? `${path}?tab=${encodeURIComponent(tab)}` : path;
}

export function getCarrierRouteConfig(role: DashboardRole): CarrierRouteConfig {
  const listPath = carrierBasePathByRole[role];

  return {
    role,
    listPath,
    addPath: `${listPath}/add-carrier`,
    detailPath: (carrierId, tab) => withTab(`${listPath}/${carrierId}`, tab),
  };
}
