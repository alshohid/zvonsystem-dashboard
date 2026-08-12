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
      ],
    },
    {
      route: "/admin/dashboard/releases/create",
      steps: [
        {
          element: `[data-tour="${tourIds.createRelease}"]`,
          popover: {
            title: "Create a new release",
            description:
              "The release wizard takes you from upload all the way to moderation.",
            side: "right",
            disableButtons: [],
          },
          prevRoute: "/admin/dashboard",
          nextRoute: "/admin/dashboard/guide",
        },
      ],
    },
    {
      route: "/admin/dashboard/guide",
      steps: [
        {
          element: `[data-tour="${tourIds.guideNav}"]`,
          popover: {
            title: "The Guide 📖",
            description:
              "Reference docs for every part of the workspace, whenever you need them.",
            side: "right",
            disableButtons: [],
          },
          prevRoute: "/admin/dashboard/releases/create",
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
            title: "Billing 💳",
            description: "Manage your subscription, plan and invoices from here.",
            side: "right",
            disableButtons: [],
          },
          prevRoute: "/admin/dashboard/guide",
          nextRoute: "/admin/dashboard/settings",
        },
      ],
    },
    {
      route: "/admin/dashboard/settings",
      steps: [
        {
          element: `[data-tour="${tourIds.settingsNav}"]`,
          popover: {
            title: "Settings ⚙️",
            description:
              "Tweak your profile, account, notification and region preferences from here.",
            side: "right",
            disableButtons: [],
          },
          prevRoute: "/admin/dashboard/billing",
        },
        {
          element: `[data-tour="${tourIds.settingsTabNotifications}"]`,
          popover: {
            title: "Notification preferences",
            description:
              "Open this tab to choose how you want to hear about releases and workspace activity.",
            side: "bottom",
          },
        },
        {
          element: `[data-tour="${tourIds.headerNotifications}"]`,
          popover: {
            title: "You're all set 🎉",
            description:
              "That's the end of the tour — your notifications live here. You're ready to go!",
            side: "bottom",
          },
        },
      ],
    },
  ],
};
