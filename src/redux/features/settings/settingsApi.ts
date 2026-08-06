import { baseApi } from "@/src/redux/api/baseApi";
import type {
  ApiAccountSettings,
  ApiNotificationsSettingsPayload,
  ApiNotificationsSettingsResponse,
  ApiNotificationsSettingsUpdateResponse,
  ApiProfile,
  ChangePasswordBody,
  SettingsEnvelope,
  UpdateProfileBody,
} from "@/src/types/settingsTypes";

const settingsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query<SettingsEnvelope<ApiProfile>, void>({
      query: () => ({
        url: "/settings/profile",
        method: "GET",
      }),
      providesTags: ["SettingsProfile"],
    }),

    updateProfile: builder.mutation<
      SettingsEnvelope<ApiProfile>,
      UpdateProfileBody
    >({
      query: (body) => ({
        url: "/settings/profile",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["SettingsProfile", "SettingsAccount"],
    }),

    uploadProfileAvatar: builder.mutation<
      SettingsEnvelope<ApiProfile>,
      FormData
    >({
      query: (body) => ({
        url: "/settings/profile/avatar",
        method: "POST",
        body,
      }),
      invalidatesTags: ["SettingsProfile", "SettingsAccount"],
    }),

    getAccountSettings: builder.query<
      SettingsEnvelope<ApiAccountSettings>,
      void
    >({
      query: () => ({
        url: "/settings/account",
        method: "GET",
      }),
      providesTags: ["SettingsAccount"],
    }),
    getSettingsNotifications: builder.query<ApiNotificationsSettingsResponse, void>({
        query: () => ({
          url: "/settings/notifications",
          method: "GET",
        }),
        providesTags: ["SettingsAccount"],
      }),
    updateSettingsNotifications: builder.mutation<ApiNotificationsSettingsUpdateResponse, ApiNotificationsSettingsPayload>({
        query: (body) => ({
          url: "/settings/notifications",
          method: "PUT",
          body,
        }),
        invalidatesTags: ["SettingsAccount"],
      }),
    changePassword: builder.mutation<
      SettingsEnvelope<unknown>,
      ChangePasswordBody
    >({
      query: (body) => ({
        url: "/settings/account/change-password",
        method: "POST",
        body,
      }),
    }),

    deleteAccount: builder.mutation<SettingsEnvelope<unknown>, void>({
      query: () => ({
        url: "/settings/account",
        method: "DELETE",
      }),
      invalidatesTags: ["SettingsProfile", "SettingsAccount"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetProfileQuery,
  useUpdateProfileMutation,
  useUploadProfileAvatarMutation,
  useGetAccountSettingsQuery,
  useChangePasswordMutation,
  useDeleteAccountMutation,
  useGetSettingsNotificationsQuery,
  useUpdateSettingsNotificationsMutation,
} = settingsApi;

export default settingsApi;
