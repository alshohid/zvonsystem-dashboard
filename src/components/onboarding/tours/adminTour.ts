import type { TourDefinition } from "@/src/types/onboarding";
import { tourIds } from "@/src/lib/onboarding/ids";

export const adminTour: TourDefinition = {
  key: "admin",
  startRoute: "/admin/dashboard",
  segments: [
    {
      route: "/admin/dashboard",
      steps: [
        {
          element: `[data-tour="${tourIds.adminDashboard}"]`,
          popover: {
            title: "Welcome, Artist 👋",
            description:
              "This is your Dashboard — a quick overview of releases, recent activity and key stats for your workspace.",
            side: "right",
            align: "start",
          },
          nextRoute: "/admin/dashboard/releases/create",
        },
        {
          element: `[data-tour="${tourIds.createRelease}"]`,
          popover: {
            title: "Create a new release",
            description:
              "Start here whenever you want to ship. The release wizard walks you through every step from upload to moderation.",
            side: "right",
            align: "start",
          },
          nextRoute: "/admin/dashboard/guide",
        },
        {
          element: `[data-tour="${tourIds.headerNotifications}"]`,
          popover: {
            title: "Stay in the loop",
            description:
              "Notifications about your releases and workspace activity land here in real time.",
            side: "bottom",
          },
        },

        {
          element: `[data-tour="${tourIds.headerUser}"]`,
          popover: {
            title: "Your account",
            description:
              "Manage your profile, security and billing from this menu. Let's look at the Guide next →",
            side: "bottom",
          },
          nextRoute: "/admin/dashboard/guide",
        },
      ],
    },
    {
      route: "/admin/dashboard/guide",
      steps: [
        {
          element: `[data-tour="${tourIds.pageGuide}"]`,
          popover: {
            title: "The Guide 📖",
            description:
              "Reference docs for every part of the workspace, whenever you need them. Now let's quickly check Settings.",
            side: "bottom",
          },
          nextRoute: "/admin/dashboard/billing",
        },
      ],
    },
    {
      route: "/admin/dashboard/billing",
      steps: [
        {
          element: `[data-tour="${tourIds.billing}"]`,
          popover: {
            title: "Billing 📖",
            description:
              "Reference docs for every part of the workspace, whenever you need them. Now let's quickly check Settings.",
            side: "bottom",
          },
          nextRoute: "/admin/dashboard/settings",
        },
      ],
    },
    {
      route: "/admin/dashboard/settings",
      steps: [
        {
          element: `[data-tour="${tourIds.pageSettings}"]`,
          popover: {
            title: "You're all set 🎉",
            description:
              "That's the end of the tour. Tweak your account settings here — then you're ready to go!",
            side: "bottom",
          },
        },
      ],
    },
  ],
};
