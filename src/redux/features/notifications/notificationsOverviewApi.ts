import { baseApi } from "@/src/redux/api/baseApi";
import type {
  INotificationUnreadCountResponse,
  INotificationsResponse,
} from "@/src/types/notificationTypes";
const SOURCE_OF_NOTIFICATION = "notifications";

const NotificationsOverviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getNotificationsOverview: builder.query<
      INotificationsResponse,
      { page?: number; limit?: number } | void
    >({
      query: (params) => ({
        url: SOURCE_OF_NOTIFICATION,
        method: "GET",
        params: {
          page: params?.page ?? 1,
          limit: params?.limit ?? 20,
        },
      }),
      providesTags: ["NotificationsOverview"],
    }),
    markNotificationRead: builder.mutation<void, string>({
      query: (id) => ({
        url: `${SOURCE_OF_NOTIFICATION}/${id}/read`,
        method: "PUT",
      }),
      invalidatesTags: ["NotificationsOverview"],
    }),
    markAllNotificationsRead: builder.mutation<void, void>({
      query: () => ({
        url: `${SOURCE_OF_NOTIFICATION}/read-all`,
        method: "PUT",
      }),
      invalidatesTags: ["NotificationsOverview"],
    }),
    deleteNotification: builder.mutation<void, string>({
      query: (id) => ({
        url: `${SOURCE_OF_NOTIFICATION}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["NotificationsOverview"],
    }),
    deleteAllNotifications: builder.mutation<void, void>({
      query: () => ({
        url: `${SOURCE_OF_NOTIFICATION}/clear-read`,
        method: "DELETE",
      }),
      invalidatesTags: ["NotificationsOverview"],
    }),
    notificationUnreadCount: builder.query<
      INotificationUnreadCountResponse,
      void
    >({
      query: () => `${SOURCE_OF_NOTIFICATION}/unread/count`,
      providesTags: ["NotificationsOverview"],
    }),
  }),

  overrideExisting: true,
});

export const {
  useGetNotificationsOverviewQuery,
  useLazyGetNotificationsOverviewQuery,
  useNotificationUnreadCountQuery,
  useDeleteNotificationMutation,
  useDeleteAllNotificationsMutation,
  useMarkNotificationReadMutation,
  useMarkAllNotificationsReadMutation,
} = NotificationsOverviewApi;
export default NotificationsOverviewApi;
