import { baseApi } from "@/src/redux/api/baseApi";
import type { RevenueAnalyticsResponse } from "@/src/types/revenueAnalyticsTypes";

const revenueAnalyticsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getRevenueAnalytics: builder.query<RevenueAnalyticsResponse, void>({
      query: () => ({
        url: "/revenue/analytics",
        method: "GET",
      }),
      providesTags: ["RevenueAnalytics"],
    }),
  }),
  overrideExisting: true,
});

export const { useGetRevenueAnalyticsQuery } = revenueAnalyticsApi;
export default revenueAnalyticsApi;
