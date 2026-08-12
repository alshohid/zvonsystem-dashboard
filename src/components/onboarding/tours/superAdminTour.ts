import type { TourDefinition } from "@/src/types/onboarding";
import { tourIds } from "@/src/lib/onboarding/ids";

/**
 * Super Admin (ADMIN role) onboarding tour — a single-page tour on the
 * super-admin workspace home. Showing it alongside the multi-page admin tour
 * demonstrates that a tour can be one page or several with no extra work.
 */
export const superAdminTour: TourDefinition = {
  key: "super-admin",
  startRoute: "/super-admin/dashboard",
  segments: [
    {
      route: "/super-admin/dashboard",
      steps: [
        {
          element: `[data-tour="${tourIds.superAdminPanel}"]`,
          popover: {
            title: "Welcome, Super Admin 🛡️",
            description:
              "This is your control room for the whole platform. Everything below is where you manage it.",
            side: "right",
            align: "start",
          },
        },
        {
          element: `[data-tour="${tourIds.superAdminUserManagement}"]`,
          popover: {
            title: "User Management",
            description:
              "Review, enable and manage every user account on the platform from here.",
            side: "right",
            align: "start",
          },
        },
        {
          element: `[data-tour="${tourIds.superAdminPricing}"]`,
          popover: {
            title: "Pricing Management",
            description:
              "Control the plans and pricing shown to clients, and push changes live.",
            side: "right",
            align: "start",
          },
        },
        {
          element: `[data-tour="${tourIds.superAdminRevenue}"]`,
          popover: {
            title: "Revenue Analytics",
            description:
              "Track platform revenue and growth at a glance. That's the tour — enjoy!",
            side: "right",
            align: "start",
          },
        },
      ],
    },
  ],
};
