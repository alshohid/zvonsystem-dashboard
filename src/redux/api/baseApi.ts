import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  QueryReturnValue,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { env } from "@/src/lib/env";
import { getErrorMessage } from "@/src/lib/getErrorMessage";
import { buildDesignModeResponse } from "@/src/redux/api/designMode";
import {
  extractAuthTokens,
  handleAuthSuccess,
} from "@/src/redux/features/auth/authHelpers";
import { logOut, setCredentials } from "@/src/redux/features/auth/authSlice";
import type { RootState } from "@/src/redux/store";
import type {
  LoginParams,
  LoginResponse,
  RefreshTokenResponse,
} from "@/src/types/auth";

const baseQuery = fetchBaseQuery({
  baseUrl: env.apiBaseUrl,
  prepareHeaders: (headers, { getState }) => {
  
    const token = (getState() as RootState).auth.token;
    headers.set('ngrok-skip-browser-warning', 'true');
    headers.set("accept", "*/*");

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
      headers.set("access_token", token);
    }

    return headers;
  },
});

let refreshPromise: Promise<
  QueryReturnValue<unknown, FetchBaseQueryError>
> | null = null;

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  if (env.designMode) {
    return {
      data: buildDesignModeResponse(args),
    };
  }

  let result = await baseQuery(args, api, extraOptions);

  const isRefreshRequest =
    typeof args === "object" && "url" in args
      ? args.url === "/auth/refresh-token"
      : args === "/auth/refresh-token";

  if (result.error?.status === 401 && !isRefreshRequest) {
    const state = api.getState() as RootState;
    const { token, refreshToken, role } = state.auth;

    if (token && refreshToken) {
      try {
        if (!refreshPromise) {
          refreshPromise = Promise.resolve(
            baseQuery(
              {
                url: "/auth/refresh-token",
                method: "POST",
                body: { refresh_token: refreshToken },
                headers: {
                  access_token: token,
                  Authorization: `Bearer ${token}`,
                },
              },
              api,
              extraOptions,
            ),
          );
        }

        const refreshResult = await refreshPromise;
        refreshPromise = null;

        if (!("data" in refreshResult) || !refreshResult.data) {
          throw new Error("Session refresh failed.");
        }

        const refreshedTokens = extractAuthTokens(
          refreshResult.data as RefreshTokenResponse,
        );

        if (!refreshedTokens.accessToken) {
          throw new Error(
            "Refresh token response did not include an access token.",
          );
        }

        api.dispatch(
          setCredentials({
            token: refreshedTokens.accessToken,
            refreshToken: refreshedTokens.refreshToken ?? refreshToken,
            role,
          }),
        );

        result = await baseQuery(args, api, extraOptions);
      } catch (error) {
        refreshPromise = null;
        api.dispatch(logOut());

        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }

        console.error(
          getErrorMessage(error, "Session expired. Please log in again."),
        );
      }
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    "User",
    "AdminCharity",
    "AdminNotice",
    "AdminUser",
    "FinancialAdminCharity",
    "AdminSubscriptionPlan",
    "DirectorNotice",
    "DashboardOverview",
    "AnalyticsOverview",
    "GuideOverview",
    "NotificationsOverview",
    "Release",
  ],
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginParams>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      onQueryStarted: async (_arg, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          handleAuthSuccess(data, dispatch);
        } catch {
          // handled by the caller via unwrap
        }
      },
    }),
  }),
});

export const { useLoginMutation } = baseApi;
