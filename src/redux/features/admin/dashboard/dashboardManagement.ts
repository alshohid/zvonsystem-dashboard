import { baseApi } from "@/src/redux/api/baseApi";
import {
  IAdminDashboardStatesDataResponse,
  IAdminNoticeGraphResponse,
  ICondolenceDetailsResponse,
  IRecentApplicationResponse,
  IRecentCondolenceResponse,
  IRecentDonationsResponse,
} from "@/src/types/dashboardTypes";

const DashboardManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getRecentApplication: builder.query<
      IRecentApplicationResponse,
      { limit: number; page: number }
    >({
      query: (params) => {
        return {
          url: "/admin/dashboard/recent-applications",
          method: "GET",
          params: {
            page: params.page,
            limit: params.limit,
          },
        };
      },
    }),
    getRecentCondolence: builder.query<
      IRecentCondolenceResponse,
      { limit: number; page: number }
    >({
      query: (params) => {
        return {
          url: "/admin/dashboard/recent-condolances",
          method: "GET",
          params: {
            page: params.page,
            limit: params.limit,
          },
        };
      },
    }),
    getRecentDonation: builder.query<
      IRecentDonationsResponse,
      { limit: number; page: number }
    >({
      query: (params) => {
        return {
          url: "/admin/dashboard/recent-donations",
          method: "GET",
          params: {
            page: params.page,
            limit: params.limit,
          },
        };
      },
    }),
    adminGetNoticeGraph: builder.query<
      IAdminNoticeGraphResponse,
      { filter: string }
    >({
      query: (params) => {
        return {
          url: "/admin/dashboard/death-notice/graph",
          method: "GET",
          params: {
            ...(params.filter && { filter: params.filter }),
          },
        };
      },
    }),

    getCondolenceByCondolenceId: builder.query<
      ICondolenceDetailsResponse,
      { condolance_id: string }
    >({
      query: (params) => {
        return {
          url: `/admin/dashboard/condolance/${params.condolance_id}`,
          method: "GET",
        };
      },
    }),

    getAdminDashboardStatesData: builder.query<
      IAdminDashboardStatesDataResponse,
      void
    >({
      query: () => {
        return {
          url: `/admin/dashboard/states`,
          method: "GET",
        };
      },
    }),
  }),

  overrideExisting: true,
});

export const {
  useGetRecentApplicationQuery,
  useGetRecentCondolenceQuery,
  useAdminGetNoticeGraphQuery,
  useGetCondolenceByCondolenceIdQuery,
  useGetAdminDashboardStatesDataQuery,
  useGetRecentDonationQuery,
} = DashboardManagementApi;
export default DashboardManagementApi;
