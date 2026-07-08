"use client";

import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { authCookieNames, normalizeAuthRole } from "@/src/lib/auth/config";
import type { AuthRole } from "@/src/types/auth";
import type { RootState } from "@/src/redux/store";

interface AuthState {
  token: string | null;
  refreshToken: string | null;
  role: AuthRole;
}

interface SetCredentialsPayload {
  token?: string | null;
  refreshToken?: string | null;
  role?: AuthRole;
}

const getCookieValue = (cookieName: string) => {
  if (typeof window === "undefined") {
    return null;
  }

  return Cookies.get(cookieName) ?? null;
};

const initialState: AuthState = {
  token: getCookieValue(authCookieNames.token),
  refreshToken: getCookieValue(authCookieNames.refreshToken),
  role: normalizeAuthRole(getCookieValue(authCookieNames.role)),
};

const cookieOptions = {
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
};

const clearAuthCookies = () => {
  Cookies.remove(authCookieNames.token, { path: "/" });
  Cookies.remove(authCookieNames.refreshToken, { path: "/" });
  Cookies.remove(authCookieNames.role, { path: "/" });
};

const persistAuthCookies = ({
  token,
  refreshToken,
  role,
}: SetCredentialsPayload) => {
  clearAuthCookies();

  if (!token || !role) {
    return;
  }

  Cookies.set(authCookieNames.token, token, cookieOptions);

  if (refreshToken) {
    Cookies.set(authCookieNames.refreshToken, refreshToken, cookieOptions);
  }

  Cookies.set(authCookieNames.role, role, cookieOptions);
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<SetCredentialsPayload>) => {
      const {
        token = null,
        refreshToken = null,
        role = null,
      } = action.payload;

      state.token = token;
      state.refreshToken = refreshToken;
      state.role = role;

      persistAuthCookies({ token, refreshToken, role });
    },
    logOut: (state) => {
      state.token = null;
      state.refreshToken = null;
      state.role = null;

      clearAuthCookies();
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export const selectCurrentToken = (state: RootState) => state.auth.token;
export const selectCurrentRole = (state: RootState) => state.auth.role;
export const selectIsAuthenticated = (state: RootState) =>
  Boolean(state.auth.token && state.auth.role);

export default authSlice.reducer;
