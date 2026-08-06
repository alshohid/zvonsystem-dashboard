import type { AuthRole } from "@/src/types/auth";

export const authCookieNames = {
  token: "zvn_auth_token",
  refreshToken: "zvn_refresh_token",
  role: "zvn_auth_role",
} as const;

export const authRoutes = {
  home: "/",
  login: "/login",
  forgotPassword: "/forgot-password",
  resetPassword: "/reset-password",
  signUp: "/sign-up",
  // dispatcherDashboard: "/dispatcher/dashboard",
  adminDashboard: "/admin/dashboard",
  superAdminDashboard: "/super-admin/dashboard",
} as const;

export const normalizeAuthRole = (role?: string | null): AuthRole => {
  if (role === "CLIENT" || role === "ADMIN") {
    return role;
  }

  return null;
};

export const getDefaultRouteForRole = (role?: string | null) => {
  const normalizedRole = normalizeAuthRole(role);

  if (normalizedRole === "CLIENT") {
    return authRoutes.adminDashboard;
  }

  if (normalizedRole === "ADMIN") {
    return authRoutes.superAdminDashboard;
  }

  return authRoutes.login;
};

export const isAllowedRedirectForRole = (
  role: AuthRole,
  pathname?: string | null,
) => {
  if (!pathname || !pathname.startsWith("/")) {
    return false;
  }

  if (role === "ADMIN") {
    return pathname.startsWith("/super-admin/dashboard");
  }

  if (role === "CLIENT") {
    return pathname.startsWith("/admin/dashboard");
  }

  return false;
};

export const resolvePostLoginPath = (
  role: AuthRole,
  requestedPath?: string | null,
) => {
  if (isAllowedRedirectForRole(role, requestedPath)) {
    return requestedPath!;
  }

  return getDefaultRouteForRole(role);
};
