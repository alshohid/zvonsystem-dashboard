import { baseApi } from "@/src/redux/api/baseApi";
import {
  IAdminUserActionResponse,
  IAdminUserListParams,
  IAdminUserListResponse,
  IAdminUserResponse,
} from "@/src/types/adminVerificationForUndertakerTypes";

const undertakerVerificationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUndertakerForAdminVerification: builder.query<
      IAdminUserListResponse,
      IAdminUserListParams
    >({
      query: (params) => ({
        url: "/admin/user",
        method: "GET",
        params: {
          page: params.page,
          limit: params.limit,
          ...(params.approval_status && {
            approval_status: params.approval_status,
          }),
          ...(params.type && { type: params.type }),
          ...(params.q && { q: params.q }),
        },
      }),
      providesTags: ["AdminUser"],
    }),
    getSingleUndertakerForAdminVerification: builder.query<
      IAdminUserResponse,
      string
    >({
      query: (id: string) => ({
        url: `/admin/user/${id}`,
        method: "GET",
      }),
      providesTags: ["AdminUser"],
    }),
    undertakerApproveByAdmin: builder.mutation<IAdminUserActionResponse, string>({
      query: (id: string) => ({
        url: `/admin/user/${id}/approve`,
        method: "POST",
      }),
      invalidatesTags: ["AdminUser"],
    }),
    undertakerRejectByAdmin: builder.mutation<IAdminUserActionResponse, string>({
      query: (id: string) => ({
        url: `/admin/user/${id}/reject`,
        method: "POST",
      }),
      invalidatesTags: ["AdminUser"],
    }),
  }),

  overrideExisting: true,
});

export const {
  useGetAllUndertakerForAdminVerificationQuery,
  useGetSingleUndertakerForAdminVerificationQuery,
  useUndertakerApproveByAdminMutation,
  useUndertakerRejectByAdminMutation,
} = undertakerVerificationApi;

export default undertakerVerificationApi;
