import { apiClient } from "@/app/api-client";

export const subscriptionAPI = apiClient.injectEndpoints({
  endpoints: (builder) => ({
    getSubscription: builder.query<any, void>({
      query: () => ({
        url: "/subscription",
        method: "GET",
      }),
      providesTags: ["billingSubscription"],
    }),
    createCheckoutSession: builder.mutation<any, { plan: "PRO" | "BUSINESS" }>({
      query: (body) => ({
        url: "/subscription/checkout",
        method: "POST",
        body,
      }),
    }),
    createBillingPortal: builder.mutation<any, void>({
      query: () => ({
        url: "/subscription/billing-portal",
        method: "POST",
      }),
    }),
  }),
});

export const {
  useGetSubscriptionQuery,
  useCreateCheckoutSessionMutation,
  useCreateBillingPortalMutation,
} = subscriptionAPI;
