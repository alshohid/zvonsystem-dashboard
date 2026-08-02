import { baseApi } from "@/src/redux/api/baseApi";
import type {
  AllReleasesQuery,
  ApiEnvelope,
  MyReleasesQuery,
  ReleaseListResponse,
  ReleaseResponse,
  ReleaseStatus,
} from "@/src/types/releaseTypes";

const releasesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyReleases: builder.query<ReleaseListResponse, MyReleasesQuery | void>({
      query: (params) => ({
        url: "/releases/my-releases",
        method: "GET",
        params: {
          page: params?.page ?? 1,
          limit: params?.limit ?? 10,
          ...(params?.status ? { status: params.status } : {}),
          ...(params?.search ? { search: params.search } : {}),
        },
      }),
      providesTags: (result, _error, params) => [
        { type: "Release" as const, id: `LIST-${params?.status ?? "ALL"}` },
        ...(result?.data ?? []).map(({ id }) => ({
          type: "Release" as const,
          id,
        })),
      ],
    }),

    /** Every LIVE release on the platform, not just the current user's. */
    getAllReleases: builder.query<ReleaseListResponse, AllReleasesQuery | void>({
      query: (params) => ({
        url: "/releases/all-releases",
        method: "GET",
        params: {
          page: params?.page ?? 1,
          limit: params?.limit ?? 10,
          ...(params?.search ? { search: params.search } : {}),
        },
      }),
      providesTags: [{ type: "Release" as const, id: "LIST-PUBLIC" }],
    }),

    getReleaseById: builder.query<ReleaseResponse, string>({
      query: (id) => ({
        url: `/releases/${id}`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [{ type: "Release", id }],
    }),

    createRelease: builder.mutation<ReleaseResponse, FormData>({
      query: (body) => ({
        url: "/releases",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Release", id: "LIST-DRAFT" }],
    }),

    updateRelease: builder.mutation<
      ReleaseResponse,
      { id: string; body: FormData }
    >({
      query: ({ id, body }) => ({
        url: `/releases/${id}`,
        method: "PUT",
        body,
      }),
      // A submit moves the release between lists, so every list has to refetch.
      invalidatesTags: (_result, _error, { id }) => [
        { type: "Release", id },
        { type: "Release", id: "LIST-DRAFT" },
        { type: "Release", id: "LIST-IN_MODERATION" },
        { type: "Release", id: "LIST-SCHEDULED" },
        { type: "Release", id: "LIST-REJECTED" },
        { type: "Release", id: "LIST-ALL" },
      ],
    }),

    deleteRelease: builder.mutation<ApiEnvelope<unknown>, string>({
      query: (id) => ({
        url: `/releases/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: "Release", id },
        { type: "Release", id: "LIST-DRAFT" },
        { type: "Release", id: "LIST-IN_MODERATION" },
        { type: "Release", id: "LIST-SCHEDULED" },
        { type: "Release", id: "LIST-REJECTED" },
        { type: "Release", id: "LIST-ALL" },
      ],
    }),

    updateReleaseStatus: builder.mutation<
      ReleaseResponse,
      { id: string; status: ReleaseStatus; message?: string }
    >({
      query: ({ id, status, message }) => ({
        url: `/releases/${id}/status`,
        method: "PATCH",
        body: { status, ...(message ? { message } : {}) },
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "Release", id },
        { type: "Release", id: "LIST-IN_MODERATION" },
        { type: "Release", id: "LIST-SCHEDULED" },
        { type: "Release", id: "LIST-APPROVED" },
        { type: "Release", id: "LIST-REJECTED" },
        { type: "Release", id: "LIST-ALL" },
      ],
    }),
  }),

  overrideExisting: true,
});

export const {
  useGetMyReleasesQuery,
  useGetAllReleasesQuery,
  useGetReleaseByIdQuery,
  useCreateReleaseMutation,
  useUpdateReleaseMutation,
  useDeleteReleaseMutation,
  useUpdateReleaseStatusMutation,
} = releasesApi;

export default releasesApi;
