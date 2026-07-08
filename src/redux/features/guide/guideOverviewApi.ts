import { baseApi } from "@/src/redux/api/baseApi";
import { IGuideOverviewResponse } from "@/src/types/guideTypes";

const GuideOverviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getGuideOverview: builder.query<IGuideOverviewResponse, void>({
      query: () => ({
        url: "/guide/overview",
        method: "GET",
      }),
      providesTags: ["GuideOverview"],
    }),
  }),

  overrideExisting: true,
});

export const { useGetGuideOverviewQuery } = GuideOverviewApi;
export default GuideOverviewApi;
