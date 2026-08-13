import { NextRequest, NextResponse } from "next/server";
import { env } from "@/src/lib/env";
import {
  authCookieNames,
  authRoutes,
  getDefaultRouteForRole,
  normalizeAuthRole,
} from "@/src/lib/auth/config";

const buildLoginRedirect = (request: NextRequest) => {
  const loginUrl = new URL(authRoutes.login, request.url);
  const redirectTo = `${request.nextUrl.pathname}${request.nextUrl.search}`;

  if (redirectTo !== authRoutes.home) {
    loginUrl.searchParams.set("redirect", redirectTo);
  }

  return loginUrl;
};

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (env.designMode) {
    return NextResponse.next();
  }

  const token = request.cookies.get(authCookieNames.token)?.value;
  const role = normalizeAuthRole(
    request.cookies.get(authCookieNames.role)?.value,
  );

  const isAuthenticated = Boolean(token && role);
  const defaultAuthenticatedRoute = getDefaultRouteForRole(role);

  const isAuthPage =
    pathname === authRoutes.login ||
    pathname === authRoutes.forgotPassword ||
    pathname === authRoutes.signUp;

  const isAdminRoute = pathname.startsWith(authRoutes.adminDashboard);
  const isSuperAdminRoute = pathname.startsWith(authRoutes.superAdminDashboard);

  if (pathname === authRoutes.home) {
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL(authRoutes.login, request.url));
    }

    return NextResponse.redirect(
      new URL(defaultAuthenticatedRoute, request.url),
    );
  }

  if (isAuthPage) {
    if (isAuthenticated) {
      return NextResponse.redirect(
        new URL(defaultAuthenticatedRoute, request.url),
      );
    }

    return NextResponse.next();
  }

  if (isAdminRoute) {
    if (!isAuthenticated) {
      return NextResponse.redirect(buildLoginRedirect(request));
    }

    if (role !== "CLIENT") {
      return NextResponse.redirect(
        new URL(defaultAuthenticatedRoute, request.url),
      );
    }

    return NextResponse.next();
  }

  if (isSuperAdminRoute) {
    if (!isAuthenticated) {
      return NextResponse.redirect(buildLoginRedirect(request));
    }

    if (role !== "ADMIN") {
      return NextResponse.redirect(
        new URL(defaultAuthenticatedRoute, request.url),
      );
    }

    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/login",
    "/sign-up",
    "/forgot-password",
    "/dispatcher/dashboard/:path*",
    "/admin/dashboard/:path*",
    "/super-admin/dashboard/:path*",
  ],
};
