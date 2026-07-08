import { baseApi } from "@/src/redux/api/baseApi";
import {
  IAdminSubscriptionPlanActionResponse,
  IAdminSubscriptionPlanData,
  IAdminSubscriptionPlanListResponse,
  IAdminSubscriptionPlanPayload,
} from "@/src/types/adminSubscriptionPlanTypes";

const adminSubscriptionPlanApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAdminSubscriptionPlan: builder.query<
      IAdminSubscriptionPlanListResponse,
      void
    >({
      query: () => ({
        url: "/admin/subscription-plan",
        method: "GET",
      }),
      providesTags: ["AdminSubscriptionPlan"],
    }),
    viewSingleSubscriptionPlanById: builder.query<
      IAdminSubscriptionPlanData,
      string
    >({
      query: (id) => ({
        url: `/admin/subscription-plan/${id}`,
        method: "GET",
      }),
      providesTags: ["AdminSubscriptionPlan"],
    }),
    updateSubscriptionPlanById: builder.mutation<
      IAdminSubscriptionPlanActionResponse,
      {
        id: string;
        data: IAdminSubscriptionPlanPayload;
      }
    >({
      query: ({
        id,
        data,
      }: {
        id: string;
        data: IAdminSubscriptionPlanPayload;
      }) => ({
        url: `/admin/subscription-plan/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["AdminSubscriptionPlan"],
    }),
    createSubscriptionPlan: builder.mutation<
      IAdminSubscriptionPlanActionResponse,
      IAdminSubscriptionPlanPayload
    >({
      query: (data: IAdminSubscriptionPlanPayload) => ({
        url: "/admin/subscription-plan",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["AdminSubscriptionPlan"],
    }),
    deleteSubscriptionPlanById: builder.mutation<
      IAdminSubscriptionPlanActionResponse,
      string
    >({
      query: (id: string) => ({
        url: `/admin/subscription-plan/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["AdminSubscriptionPlan"],
    }),
  }),

  overrideExisting: true,
});

export const {
  useGetAdminSubscriptionPlanQuery,
  useViewSingleSubscriptionPlanByIdQuery,
  useUpdateSubscriptionPlanByIdMutation,
  useCreateSubscriptionPlanMutation,
  useDeleteSubscriptionPlanByIdMutation,
} = adminSubscriptionPlanApi;

export default adminSubscriptionPlanApi;
