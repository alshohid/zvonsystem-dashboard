export type ApiProfile = {
  id: string;
  name: string | null;
  username: string | null;
  bio: string | null;
  genre: string | null;
  website: string | null;
  country: string | null;
  location: string | null;
  avatar: string | null;
  email: string | null;
  phone_number: string | null;
  language: string | null;
};

export type UpdateProfileBody = {
  name: string;
  username: string;
  bio: string;
  genre: string;
  /** Empty input must be sent as `null`, not `""`. */
  website: string | null;
  country: string;
  location: string;
};

export type ApiAccountSettings = {
  id: string;
  email: string | null;
  name: string | null;
  username: string | null;
  avatar: string | null;
  created_at: string | null;
  email_verified_at: string | null;
};

export type ChangePasswordBody = {
  current_password: string;
  new_password: string;
  confirm_password: string;
};

export type SettingsEnvelope<T> = {
  success: boolean;
  message: string;
  data: T;
};
export interface ApiNotificationsSettingsResponseData {
  data: {
    releaseStatusUpdates: boolean;
    moderationFeedback?: boolean;
    releaseScheduled?: boolean;
    pushNotifications?: boolean;
    weeklyDigest?: boolean;
  };
}

export interface ApiNotificationsSettingsPayload {
  releaseStatusUpdates?: boolean;
  moderationFeedback?: boolean;
  releaseScheduled?: boolean;
  pushNotifications?: boolean;
  weeklyDigest?: boolean;
}

export interface ApiNotificationsSettingsUpdateResponse {
  success: boolean;
  message: string;
  data: ApiNotificationsSettingsResponseData;
}

export interface ApiNotificationsSettingsResponse {
  success: boolean;
  message: string;
  data: ApiNotificationsSettingsResponseData;
}

export interface ApiRegionSettingsResponse {
  success: boolean;
  message: string;
  data: ApiRegionSettings;
}

export interface ApiRegionSettings {
  country: string;
  language: string;
}


export interface ApiRegionSettingsPayload {
  country: string;
  language: string;
}


export interface ApiRegionSettingsUpdateResponse {
  success: boolean;
  message: string;
  data: ApiRegionSettings;
}