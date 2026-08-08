import { baseApi } from "@/src/redux/api/baseApi";
import type {
  IArtistDashboardResponse,
  IArtistDashboardViewModel,
} from "@/src/types/dashboardOverviewTypes";
import { DashboardOverviewMapper } from "@/src/lib/dashboard/dashboardOverviewMapper";

const DashboardOverviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardOverview: builder.query<
      IArtistDashboardViewModel,
      void
    >({
      query: () => ({
        url: "/dashboard/artist",
        method: "GET",
      }),
      providesTags: ["DashboardOverview"],
      transformResponse: (response: IArtistDashboardResponse) =>
        DashboardOverviewMapper.fromDto(response.data),
    }),
  }),

  overrideExisting: true,
});

export const { useGetDashboardOverviewQuery } = DashboardOverviewApi;
export default DashboardOverviewApi;
