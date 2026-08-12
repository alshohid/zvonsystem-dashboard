import { baseApi } from "@/src/redux/api/baseApi";

import {
  CreateInvoiceRequest,
  CreateInvoiceResponse,
  GetInvoiceResponse,
  InvoiceListResponse,
  InvoiceStatisticsResponse,
  UpdateInvoiceRequest,
} from "@/src/types/noticeTypes";
const SOURCE_OF_NOTICE = "/invoices";
const noticeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    postNotice: builder.mutation<CreateInvoiceResponse, CreateInvoiceRequest>({
      query: (body) => ({
        url: SOURCE_OF_NOTICE,
        method: "POST",
        body,
      }),
      invalidatesTags: ["SubscriptionPlan", "Subscription", "Invoices"],
    }),

    getAllInvoices: builder.query<
      InvoiceListResponse,
      {
        page: number;
        limit: number;
        search?: string;
      }
    >({
      query: ({ page, limit, search }) => ({
        url: SOURCE_OF_NOTICE,
        method: "GET",
        params: { page, limit, search },
      }),
      providesTags: ["SubscriptionPlan", "Subscription", "Invoices"],
    }),
    getNoticeStats: builder.query<InvoiceStatisticsResponse, void>({
      query: () => ({
        url: `${SOURCE_OF_NOTICE}/stats`,
        method: "GET",
      }),
      providesTags: ["Invoices"],
    }),
    getInvoiceById: builder.query<GetInvoiceResponse, string>({
      query: (id) => ({
        url: `${SOURCE_OF_NOTICE}/${id}`,
        method: "GET",
      }),
      providesTags: ["Invoices"],
    }),
    updateInvoice: builder.mutation<
      GetInvoiceResponse,
      { id: string; data: UpdateInvoiceRequest }
    >({
      query: ({ id, data }) => ({
        url: `${SOURCE_OF_NOTICE}/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Invoices"],
    }),
    deleteInvoice: builder.mutation<GetInvoiceResponse, string>({
      query: (id) => ({
        url: `${SOURCE_OF_NOTICE}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Invoices"],
    }),
    getInvoiceByInvoiceNumber: builder.query<GetInvoiceResponse, string>({
      query: (invoice_number) => ({
        url: `${SOURCE_OF_NOTICE}/number/${invoice_number}`,
        method: "GET",
      }),
      providesTags: ["Invoices"],
    }),
    getInvoiceByNumber: builder.query<GetInvoiceResponse, string>({
      query: (invoiceNumber: string) => ({
        url: `${SOURCE_OF_NOTICE}/number/${invoiceNumber}`,
        method: "GET",
      }),
      providesTags: ["Invoices"],
    }),
    updateInvoiceAsPaid: builder.mutation<
      GetInvoiceResponse,
      { id: string; payment_method: string }
    >({
      query: ({ id, payment_method }) => ({
        url: `${SOURCE_OF_NOTICE}/${id}/pay`,
        method: "PUT",
        body: { payment_method },
      }),
      invalidatesTags: ["Invoices"],
    }),
  }),
  overrideExisting: true,
});

export const {
  usePostNoticeMutation,
  useGetAllInvoicesQuery,
  useGetNoticeStatsQuery,
  useGetInvoiceByIdQuery,
  useGetInvoiceByNumberQuery,
  useUpdateInvoiceMutation,
  useDeleteInvoiceMutation,
  useUpdateInvoiceAsPaidMutation,
} = noticeApi;

export default noticeApi;
