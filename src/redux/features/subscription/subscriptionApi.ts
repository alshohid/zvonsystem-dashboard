import { baseApi } from "@/src/redux/api/baseApi";
import type {
  CancelSubscriptionResponse,
  CheckoutSessionResponse,
  CreateCheckoutSessionRequest,
  IEditTransactionPlanRequest,
  ITransactionHistoryResponse,
  PlanResponse,
  PlanStatsResponse,
  PlansListResponse,
  ProcessPaymentRequest,
  ProcessPaymentResponse,
  SubscriptionResponse,
} from "@/src/types/billingTypes";

const subscriptionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPlans: builder.query<PlansListResponse, void>({
      query: () => ({
        url: "/subscription/plans",
        method: "GET",
      }),
      providesTags: ["SubscriptionPlan", "Subscription"],
    }),

    getPlanById: builder.query<PlanResponse, string>({
      query: (id) => ({
        url: `/subscription/plans/${id}`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [
        { type: "SubscriptionPlan" as const, id },
        { type: "Subscription" as const, id },
      ],
    }),

    getMySubscription: builder.query<SubscriptionResponse, void>({
      query: () => ({
        url: "/subscription/my-subscription",
        method: "GET",
      }),
      providesTags: ["Subscription", "SubscriptionPlan"],
    }),
    getPlanStats: builder.query<PlanStatsResponse, void>({
      query: () => ({
        url: "/subscription/stats",
        method: "GET",
      }),
      providesTags: ["SubscriptionStats"],
    }),
    subscriptionPaymentTransactionList: builder.query<
      ITransactionHistoryResponse,
      { page: number; limit: number; search?: string }
    >({
      query: ({ page, limit, search }) => ({
        url: "/subscription-payment/transactions",
        method: "GET",
        params: { page, limit, search },
      }),
      providesTags: ["SubscriptionStats"],
    }),
    editSingleSubscriptionPaymentTransaction: builder.mutation<
      ITransactionHistoryResponse,
      { planId: string; data: IEditTransactionPlanRequest }
    >({
      query: ({ planId, data }) => ({
        url: `/subscription-payment/transaction/${planId}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["SubscriptionStats"],
    }),
    cancelSubscription: builder.mutation<CancelSubscriptionResponse, string>({
      query: (subscriptionId) => ({
        url: `/subscription/cancel/${subscriptionId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Subscription", "SubscriptionPlan"],
    }),

    createCheckoutSession: builder.mutation<
      CheckoutSessionResponse,
      CreateCheckoutSessionRequest
    >({
      query: (body) => ({
        url: "/subscription-payment/create-checkout-session",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Subscription", "SubscriptionPlan"],
    }),

    processPayment: builder.mutation<
      ProcessPaymentResponse,
      ProcessPaymentRequest
    >({
      query: (body) => ({
        url: "/subscription-payment/process-payment",
        method: "POST",
        body,
      }),
      invalidatesTags: [
        "Subscription",
        "SubscriptionStats",
        "SubscriptionPlan",
      ],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetPlansQuery,
  useGetPlanByIdQuery,
  useGetMySubscriptionQuery,
  useGetPlanStatsQuery,
  useCancelSubscriptionMutation,
  useCreateCheckoutSessionMutation,
  useProcessPaymentMutation,
  useEditSingleSubscriptionPaymentTransactionMutation,
  useSubscriptionPaymentTransactionListQuery,
} = subscriptionApi;

export default subscriptionApi;
