export type NotificationPrefKey =
  | "releaseStatusUpdates"
  | "moderationFeedback"
  | "releaseScheduled"
  | "pushNotifications"
  | "weeklyDigest";

export const NOTIFICATION_PREF_ITEMS: {
  key: NotificationPrefKey;
  title: string;
  description: string;
}[] = [
  {
    key: "releaseStatusUpdates",
    title: "Release status updates",
    description: "When your release is approved, rejected or distributed",
  },
  {
    key: "moderationFeedback",
    title: "Moderation feedback",
    description: "When a moderator sends feedback or requests changes",
  },
  {
    key: "releaseScheduled",
    title: "Release scheduled",
    description: "Confirmation when a release date is set",
  },
  {
    key: "pushNotifications",
    title: "Push notifications",
    description: "Real time notifications in the app",
  },
  {
    key: "weeklyDigest",
    title: "Weekly digest",
    description: "A summary of your activity every week",
  },
];

export const DEFAULT_NOTIFICATION_PREFS: Record<NotificationPrefKey, boolean> =
  {
    releaseStatusUpdates: true,
    moderationFeedback: true,
    releaseScheduled: true,
    pushNotifications: true,
    weeklyDigest: false,
  };

export const LANGUAGE_OPTIONS = [
  "English",
  "Hindi",
  "Spanish",
  "French",
  "German",
];

export const COUNTRY_OPTIONS = [
  "India",
  "United States",
  "United Kingdom",
  "Canada",
  "Australia",
  "Germany",
  "Bangladesh",
];
