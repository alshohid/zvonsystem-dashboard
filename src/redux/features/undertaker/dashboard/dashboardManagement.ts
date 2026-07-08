import { baseApi } from "@/src/redux/api/baseApi";
import {
  IDirectorDashboardStatesResponse,
  IDirectorDeathNoticeAreaGraphResponse,
  IDirectorNoticeViewsGraphResponse,
  IDirectorRecentCondolenceResponse,
  IDirectorRecentNoticeResponse,
} from "@/src/types/undertaker/dashboardTypes";

const UndertakerDashboardManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDirectorRecentNotice: builder.query<
      IDirectorRecentNoticeResponse,
      { limit: number; page: number }
    >({
      query: (params) => {
        return {
          url: "/director/dashboard/recent-notice",
          method: "GET",
          params: {
            page: params.page,
            limit: params.limit,
          },
        };
      },
    }),
    getDirectorRecentCondolence: builder.query<
      IDirectorRecentCondolenceResponse,
      { limit: number; page: number }
    >({
      query: (params) => {
        return {
          url: "/director/dashboard/recent-condolance",
          method: "GET",
          params: {
            page: params.page,
            limit: params.limit,
          },
        };
      },
    }),

    directorNoticeViewsGraph: builder.query<
      IDirectorNoticeViewsGraphResponse,
      { filter: string }
    >({
      query: (params) => {
        return {
          url: "/director/dashboard/notice-views/graph",
          method: "GET",
          params: {
            ...(params.filter && { filter: params.filter }),
          },
        };
      },
    }),
    directorDeathNoticeAreaGraph: builder.query<
      IDirectorDeathNoticeAreaGraphResponse,
      { filter: string }
    >({
      query: (params) => {
        return {
          url: "/director/dashboard/notice-area/graph",
          method: "GET",
          params: {
            ...(params.filter && { filter: params.filter }),
          },
        };
      },
    }),

    getDirectorDashboardStatesData: builder.query<
      IDirectorDashboardStatesResponse,
      void
    >({
      query: () => {
        return {
          url: `/director/dashboard/stats`,
          method: "GET",
        };
      },
    }),
  }),

  overrideExisting: true,
});

export const {
  useGetDirectorRecentCondolenceQuery,
  useGetDirectorRecentNoticeQuery,
  useDirectorNoticeViewsGraphQuery,
  useGetDirectorDashboardStatesDataQuery,
  useDirectorDeathNoticeAreaGraphQuery,
} = UndertakerDashboardManagementApi;
export default UndertakerDashboardManagementApi;
