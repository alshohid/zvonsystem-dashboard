import { baseApi } from "@/src/redux/api/baseApi";
import { charityPayloadToFormData } from "@/src/redux/services/admin/charityService";
import {
  ICharityResponse,
  ICharityDetailsResponse,
  ICreateCharityPayload,
  ICreateCharityResponse,
  IDeleteCharityResponse,
  IUpdateCharityPayload,
  ICharityConnectionsResponse,
} from "@/src/types/adminCharityTypes";

const charityManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createCharity: builder.mutation<
      ICreateCharityResponse,
      ICreateCharityPayload
    >({
      query: (payload) => ({
        url: "/admin/charity",
        method: "POST",
        body: charityPayloadToFormData(payload),
      }),
      invalidatesTags: [{ type: "AdminCharity", id: "LIST" }],
    }),
    getAllCharity: builder.query<
      ICharityResponse,
      { page: number; limit: number; filter?: string }
    >({
      query: ({ page, limit, filter }) => ({
        url: "/admin/charity",
        method: "GET",
        params: {
          page,
          limit,
          ...(filter ? { filter } : {}),
        },
      }),
      providesTags: (result) =>
        result
          ? [
              { type: "AdminCharity", id: "LIST" },
              ...result.data.map((charity) => ({
                type: "AdminCharity" as const,
                id: charity.id,
              })),
            ]
          : [{ type: "AdminCharity", id: "LIST" }],
    }),
    getSingleCharity: builder.query<ICharityDetailsResponse, string>({
      query: (id) => ({
        url: `/admin/charity/${id}`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [{ type: "AdminCharity", id }],
    }),
    getCharityConnectionsWithNotice: builder.query<
      ICharityConnectionsResponse,
      { page: number; limit: number; filter?: string }
    >({
      query: ({ page, limit, filter }) => ({
        url: `/admin/charity/notice-charity`,
        method: "GET",
        params: {
          page,
          limit,
          ...(filter ? { filter } : {}),
        },
      }),
      providesTags: (_result, _error) => [{ type: "AdminCharity", id: "LIST" }],
    }),
    updateCharity: builder.mutation<
      ICharityDetailsResponse,
      { id: string; payload: IUpdateCharityPayload }
    >({
      query: ({ id, payload }) => ({
        url: `/admin/charity/${id}`,
        method: "PATCH",
        body: charityPayloadToFormData(payload),
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "AdminCharity", id },
        { type: "AdminCharity", id: "LIST" },
      ],
    }),
    deleteCharity: builder.mutation<IDeleteCharityResponse, string>({
      query: (id) => ({
        url: `/admin/charity/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: "AdminCharity", id },
        { type: "AdminCharity", id: "LIST" },
      ],
    }),
  }),

  overrideExisting: true,
});

export const {
  useCreateCharityMutation,
  useGetAllCharityQuery,
  useGetSingleCharityQuery,
  useUpdateCharityMutation,
  useDeleteCharityMutation,
  useGetCharityConnectionsWithNoticeQuery,
} = charityManagementApi;
export default charityManagementApi;
