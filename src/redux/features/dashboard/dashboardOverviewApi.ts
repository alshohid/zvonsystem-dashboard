import { baseApi } from "@/src/redux/api/baseApi";
import { IDashboardOverviewResponse } from "@/src/types/dashboardOverviewTypes";

const DashboardOverviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardOverview: builder.query<IDashboardOverviewResponse, void>({
      query: () => ({
        url: "/dashboard/overview",
        method: "GET",
      }),
      providesTags: ["DashboardOverview"],
    }),
  }),

  overrideExisting: true,
});

export const { useGetDashboardOverviewQuery } = DashboardOverviewApi;
export default DashboardOverviewApi;
