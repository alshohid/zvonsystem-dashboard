export const tourElementId = (path: string): string => {
  const normalized = path.replace(/^\/+|\/+$/g, "");

  if (!normalized) {
    return "nav-home";
  }

  return `nav-${normalized.replace(/\//g, "-")}`;
};

export const tourIds = {
  // Sidebar navigation (derived from routes) — stable even when Tailwind
  // classes change.
  adminDashboard: tourElementId("/admin/dashboard"),
  createRelease: tourElementId("/admin/dashboard/releases/create"),
  analytics: tourElementId("/admin/dashboard/analytics"),
  guideNav: tourElementId("/admin/dashboard/guide"),
  notificationsNav: tourElementId("/admin/dashboard/notifications"),
  billing: tourElementId("/admin/dashboard/billing"),
  settingsNav: tourElementId("/admin/dashboard/settings"),

  // Super admin sidebar.
  superAdminPanel: tourElementId("/super-admin/dashboard"),
  superAdminPricing: tourElementId("/super-admin/dashboard/pricing-management"),
  superAdminUserManagement: tourElementId(
    "/super-admin/dashboard/user-management",
  ),
  superAdminRevenue: tourElementId("/super-admin/dashboard/revenue-analytics"),

  // Header.
  headerNotifications: "header-notifications",
  headerUser: "header-user",

  // Page bodies.
  pageCreateRelease: "page-create-release",
  pageGuide: "page-guide",
  pageBilling: "page-billing",
  pageSettings: "page-settings",
  settingsTabNotifications: "settings-tab-notifications",
} as const;
