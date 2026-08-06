import { baseApi } from "@/src/redux/api/baseApi";
import type { SuperAdminDashboardResponse } from "@/src/types/superAdminDashboardTypes";

const superAdminDashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSuperAdminDashboard: builder.query<SuperAdminDashboardResponse, void>({
      query: () => ({
        url: "/dashboard",
        method: "GET",
      }),
      providesTags: ["SuperAdminDashboard"],
    }),
  }),
  overrideExisting: true,
});

export const { useGetSuperAdminDashboardQuery } = superAdminDashboardApi;
export default superAdminDashboardApi;
