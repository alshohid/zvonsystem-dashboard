import { baseApi } from "@/src/redux/api/baseApi";
import { IAdminCharityDonationListParams } from "@/src/types/adminFinancialManagementTypes";
import { IAdminUserListResponse } from "@/src/types/adminVerificationForUndertakerTypes";

const financialManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCharityDonation: builder.query<
      IAdminUserListResponse,
      IAdminCharityDonationListParams
    >({
      query: (params) => ({
        url: "admin/management/charity-donation",
        method: "GET",
        params: {
          page: params.page,
          limit: params.limit,
          ...(params.time && { time: params.time }),
        },
      }),
      providesTags: ["FinancialAdminCharity"],
    }),
    getAllFunding: builder.query<
      IAdminUserListResponse,
      IAdminCharityDonationListParams
    >({
      query: (params) => ({
        url: "/admin/management/all-fund",
        method: "GET",
        params: {
          page: params.page,
          limit: params.limit,
          ...(params.time && { time: params.time }),
        },
      }),
      providesTags: ["FinancialAdminCharity"],
    }),
    getDonationByDonationId: builder.query({
      query: (id: string) => ({
        url: `/admin/management/donation/${id}`,
        method: "GET",
      }),
      providesTags: ["FinancialAdminCharity"],
    }),
    foundTransferByCharityId: builder.mutation({
      query: (id: string) => ({
        url: `/admin/management/transfer-fund/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["FinancialAdminCharity"],
    }),
    getRecentFundTransfer: builder.query({
      query: (params) => ({
        url: "/admin/management/recent-fund",
        method: "GET",
        params: {
          page: params.page,
          limit: params.limit,
        },
      }),
      providesTags: ["FinancialAdminCharity"],
    }),
    getSingleTransferByTransferId: builder.query({
      query: (id: string) => ({
        url: `/admin/management/single-transfer/${id}`,
        method: "GET",
      }),
      providesTags: ["FinancialAdminCharity"],
    }),
  }),

  overrideExisting: true,
});

export const {
  useGetAllCharityDonationQuery,
  useGetAllFundingQuery,
  useGetDonationByDonationIdQuery,
  useFoundTransferByCharityIdMutation,
  useGetRecentFundTransferQuery,
  useGetSingleTransferByTransferIdQuery,
} = financialManagementApi;

export default financialManagementApi;
