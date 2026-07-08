import type { FetchArgs } from "@reduxjs/toolkit/query/react";

const DEFAULT_META = {
  total: 0,
  page: 1,
  last_page: 1,
  limit: 10,
};

const DESIGN_MODE_MESSAGE =
  "API calls are disabled in design mode. Redux and RTK Query remain active for future integration.";

type ApiArgs = string | FetchArgs;

const getUrl = (args: ApiArgs) =>
  typeof args === "string" ? args : (args.url ?? "");

const getMethod = (args: ApiArgs) =>
  typeof args === "string" ? "GET" : (args.method ?? "GET").toUpperCase();

const getBody = (args: ApiArgs) =>
  typeof args === "string" ? undefined : args.body;

const buildSuccess = <T>(data: T, extra?: Record<string, unknown>) => ({
  success: true,
  message: DESIGN_MODE_MESSAGE,
  data,
  ...extra,
});

const buildPaginated = (data: unknown[] = [], meta = DEFAULT_META) =>
  buildSuccess(data, { meta });

export const buildDesignModeResponse = (args: ApiArgs) => {
  const url = getUrl(args);
  const method = getMethod(args);
  const body = getBody(args) as Record<string, unknown> | undefined;

  if (url === "/auth/login") {
    const email = String(body?.email ?? "").toLowerCase();
    const role = email.includes("super")
      ? "super-admin"
      : email.includes("dispatcher")
        ? "dispatcher"
        : "admin";

    return {
      success: true,
      message: "Signed in locally in design mode.",
      type: role,
      authorization: {
        access_token: `design-mode-${role}-token`,
        refresh_token: `design-mode-${role}-refresh-token`,
      },
    };
  }

  if (url.startsWith("/auth/")) {
    return {
      success: true,
      message: DESIGN_MODE_MESSAGE,
    };
  }

  if (url === "/admin/dashboard/states") {
    return buildSuccess({
      pending_director_applications: 0,
      total_completed_donations: 0,
      total_completed_subscriptions: 0,
    });
  }

  if (url === "/director/dashboard/stats") {
    return buildSuccess({
      total_notices: 0,
      total_condolances: 0,
      total_donations: 0,
    });
  }

  if (url === "/dispatcher/dashboard/stats") {
    return buildSuccess({
      total_jobs: 0,
      active_shipments: 0,
      completed_today: 0,
    });
  }

  if (url === "/super-admin/dashboard/stats") {
    return buildSuccess({
      total_admins: 0,
      total_dispatchers: 0,
      active_workspaces: 0,
    });
  }

  if (url.includes("/death-notice/graph")) {
    return buildSuccess({
      categories: [],
      series: [],
    });
  }

  if (url.includes("/notice-views/graph")) {
    return buildSuccess({
      total_views: 0,
      labels: [],
      this_week: [],
      last_week: [],
    });
  }

  if (url.includes("/notice-area/graph")) {
    return buildSuccess({
      labels: [],
      values: [],
    });
  }

  if (url.includes("recent")) {
    return buildPaginated();
  }

  if (method === "GET") {
    return buildSuccess({}, { meta: DEFAULT_META });
  }

  return {
    success: true,
    message: DESIGN_MODE_MESSAGE,
  };
};
