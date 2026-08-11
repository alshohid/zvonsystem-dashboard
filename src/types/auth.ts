export type AuthRole = "CLIENT" | "ADMIN" | null;
export interface LoginParams {
  email: string;
  password: string;
}

export interface AuthTokenPayload {
  type?: string;
  access_token?: string;
  refresh_token?: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  authorization?: AuthTokenPayload;
  data?: AuthTokenPayload;
  type?: AuthRole | string;
}

export interface RefreshTokenResponse {
  success: boolean;
  message?: string;
  authorization?: AuthTokenPayload;
  data?: AuthTokenPayload;
  type?: AuthRole | string;
}
export type UserType = "CLIENT" | "ADMIN";

export interface IUserProfile {
  id: string;
  name: string;
  phoneNumber: string;
  email: string;
  avatar: string;
  address: string | null;
  type: UserType;
  avatarUrl: string;
}

export interface IApiResponse<T> {
  success: boolean;
  data: T;
}

export type IProfileResponse = IApiResponse<IUserProfile>;
