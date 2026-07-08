import { baseApi } from "@/src/redux/api/baseApi";
import {
  IAdminNoticesResponse,
  IGetAdminNoticesParams,
  IAminNoticeByIdResponse,
  INotice,
  IAminNoticeCondolenceByIdResponse,
  ICondolenceMessageResponse,
  IBaseAdminNoticeResponse,
} from "@/src/types/noticeType";

type GetCondolenceMessagesArg =
  | string
  | {
      id: string;
      page?: number;
      limit?: number;
    };

const noticeManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAdminNotices: builder.query<
      IAdminNoticesResponse,
      IGetAdminNoticesParams
    >({
      query: ({
        page,
        limit,
        to,
        form,
        town,
        country,
        nee,
        surname,
        first_name,
      }) => ({
        url: "/admin/notice",
        method: "GET",
        params: {
          page,
          limit,
          to,
          form,
          town,
          country,
          nee,
          surname,
          first_name,
        },
      }),
      providesTags: (result) =>
        result
          ? [
              { type: "AdminNotice", id: "LIST" },
              ...result.data.map((notice) => ({
                type: "AdminNotice" as const,
                id: notice.id,
              })),
            ]
          : [{ type: "AdminNotice", id: "LIST" }],
    }),
    getAdminNoticeById: builder.query<IAminNoticeByIdResponse, string>({
      query: (id) => `/admin/notice/${id}`,
      providesTags: (result) =>
        result
          ? [{ type: "AdminNotice", id: result.data.id }]
          : [{ type: "AdminNotice", id: "LIST" }],
    }),
    updatedAdminNoticeById: builder.query<IAminNoticeByIdResponse, INotice>({
      query: ({ id, ...data }) => ({
        url: `/admin/notice/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    getAdminNoticeCondolenceById: builder.query<
      IAminNoticeCondolenceByIdResponse,
      string
    >({
      query: (id) => `/admin/notice/condolance/${id}`,
      providesTags: (result) =>
        result
          ? [{ type: "AdminNotice", id: result.data.id }]
          : [{ type: "AdminNotice", id: "LIST" }],
    }),
    getAllCondolenceMessageByCondolenceId: builder.query<
      ICondolenceMessageResponse,
      GetCondolenceMessagesArg
    >({
      query: (arg) => {
        const { id, page, limit } =
          typeof arg === "string" ? { id: arg, page: undefined, limit: undefined } : arg;

        return {
          url: `/admin/notice/${id}/condolance-message`,
          method: "GET",
          params: {
            page,
            limit,
          },
        };
      },
      providesTags: (result) =>
        result
          ? [
              { type: "AdminNotice", id: "LIST" },
              ...result.data.map((message) => ({
                type: "AdminNotice" as const,
                id: message.id,
              })),
            ]
          : [{ type: "AdminNotice", id: "LIST" }],
    }),
    deleteCondolenceMessage: builder.mutation<
      IBaseAdminNoticeResponse,
      { message_id: string }
    >({
      query: ({ message_id }) => ({
        url: `/admin/notice/${message_id}/condolance-message`,
        method: "DELETE",
      }),
      invalidatesTags: ["AdminNotice"],
    }),
    blockCondolenceMessageByUserId: builder.mutation<
      IBaseAdminNoticeResponse,
      { user_id: string }
    >({
      query: ({ user_id }) => ({
        url: `/admin/notice/${user_id}/block`,
        method: "PATCH",
      }),
      invalidatesTags: ["AdminNotice"],
    }),
  }),

  overrideExisting: true,
});

export const {
  useGetAdminNoticesQuery,
  useUpdatedAdminNoticeByIdQuery,
  useGetAdminNoticeByIdQuery,
  useBlockCondolenceMessageByUserIdMutation,
  useDeleteCondolenceMessageMutation,
  useGetAdminNoticeCondolenceByIdQuery,
  useGetAllCondolenceMessageByCondolenceIdQuery,
} = noticeManagementApi;
export default noticeManagementApi;
