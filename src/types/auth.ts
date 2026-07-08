export type AuthRole = "dispatcher" | "admin" | "super-admin" | null;

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
