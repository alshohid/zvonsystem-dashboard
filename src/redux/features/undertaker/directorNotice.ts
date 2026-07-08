import { baseApi } from "@/src/redux/api/baseApi";
import {
  IBaseDirectorNoticeResponse,
  ICreateDirectorNoticePayload,
  IDirectorActiveSubscriptionResponse,
  IDirectorAllNoticeListResponse,
  IDirectorNoticeCharityListResponse,
  ISingleDirectorNoticeResponse,
  IUpdateDirectorNoticePayload,
} from "@/src/types/undertaker/directorNoticeTypes";

const directorNoticeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDirectorNoticeCharityList: builder.query<
      IDirectorNoticeCharityListResponse,
      void
    >({
      query: () => {
        return {
          url: "/director/notice/charity/list",
          method: "GET",
        };
      },
    }),
    getDirectorAllNotice: builder.query<
      IDirectorAllNoticeListResponse,
      { limit: number; page: number }
    >({
      query: (params) => {
        return {
          url: "/director/notice",
          method: "GET",
          params: {
            page: params.page,
            limit: params.limit,
          },
        };
      },
      providesTags: ["DirectorNotice"],
    }),
    createDirectorNotice: builder.mutation<
      IBaseDirectorNoticeResponse,
      ICreateDirectorNoticePayload
    >({
      query: (body) => {
        return {
          url: `/director/notice`,
          method: "POST",
          body: body,
        };
      },
      invalidatesTags: ["DirectorNotice"],
    }),
    getSingleDirectorNoticeById: builder.query<
      ISingleDirectorNoticeResponse,
      { id: string }
    >({
      query: ({ id }) => {
        return {
          url: `/director/notice/${id}`,
          method: "GET",
        };
      },
      providesTags: ["DirectorNotice"],
    }),
    updateDirectorNoticeById: builder.mutation<
      ISingleDirectorNoticeResponse,
      { id: string; data: IUpdateDirectorNoticePayload }
    >({
      query: ({ id, data }) => {
        return {
          url: `/director/notice/${id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["DirectorNotice"],
    }),
    deleteDirectorNoticeById: builder.mutation<
      IBaseDirectorNoticeResponse,
      { id: string }
    >({
      query: ({ id }) => {
        return {
          url: `/director/notice/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["DirectorNotice"],
    }),
    getDirectorActiveSubscription: builder.query<
      IDirectorActiveSubscriptionResponse,
      void
    >({
      query: () => {
        return {
          url: "/director/notice/active-subscription",
          method: "GET",
        };
      },
    }),
  }),

  overrideExisting: true,
});

export const {
  useGetDirectorNoticeCharityListQuery,
  useGetDirectorAllNoticeQuery,
  useCreateDirectorNoticeMutation,
  useGetSingleDirectorNoticeByIdQuery,
  useUpdateDirectorNoticeByIdMutation,
  useDeleteDirectorNoticeByIdMutation,
  useGetDirectorActiveSubscriptionQuery,
} = directorNoticeApi;
export default directorNoticeApi;
