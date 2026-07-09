import { baseApi } from "@/src/redux/api/baseApi";
import { INotificationsOverviewResponse } from "@/src/types/notificationTypes";

const NotificationsOverviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getNotificationsOverview: builder.query<INotificationsOverviewResponse, void>({
      query: () => ({
        url: "/notifications/overview",
        method: "GET",
      }),
      providesTags: ["NotificationsOverview"],
    }),
  }),

  overrideExisting: true,
});

export const { useGetNotificationsOverviewQuery } = NotificationsOverviewApi;
export default NotificationsOverviewApi;
