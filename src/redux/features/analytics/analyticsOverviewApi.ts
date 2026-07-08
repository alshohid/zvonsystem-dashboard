import { baseApi } from "@/src/redux/api/baseApi";
import { IAnalyticsOverviewResponse } from "@/src/types/analyticsTypes";

const AnalyticsOverviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAnalyticsOverview: builder.query<IAnalyticsOverviewResponse, void>({
      query: () => ({
        url: "/analytics/overview",
        method: "GET",
      }),
      providesTags: ["AnalyticsOverview"],
    }),
  }),

  overrideExisting: true,
});

export const { useGetAnalyticsOverviewQuery } = AnalyticsOverviewApi;
export default AnalyticsOverviewApi;
