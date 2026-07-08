import { authRoutes } from "@/src/lib/auth/config";

export const routes = {
  login: authRoutes.login,
  forgotPassword: authRoutes.forgotPassword,
  dispatcherDashboard: authRoutes.dispatcherDashboard,
  adminDashboard: authRoutes.adminDashboard,
  superAdminDashboard: authRoutes.superAdminDashboard,
};
