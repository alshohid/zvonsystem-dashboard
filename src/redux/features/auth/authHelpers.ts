import type {
  AuthTokenPayload,
  LoginResponse,
  RefreshTokenResponse,
} from "@/src/types/auth";
import { normalizeAuthRole } from "@/src/lib/auth/config";
import type { AppDispatch } from "@/src/redux/store";
import { setCredentials } from "@/src/redux/features/auth/authSlice";

const extractTokenPayload = (
  payload?: LoginResponse | RefreshTokenResponse | null,
): AuthTokenPayload | null => {
  if (!payload) {
    return null;
  }

  return payload.authorization ?? payload.data ?? null;
};

export const extractAuthTokens = (
  payload?: LoginResponse | RefreshTokenResponse | null,
) => {
  const tokenPayload = extractTokenPayload(payload);

  return {
    accessToken: tokenPayload?.access_token ?? null,
    refreshToken: tokenPayload?.refresh_token ?? null,
  };
};

export const extractLoginAuthData = (payload: LoginResponse) => {
  const { accessToken, refreshToken } = extractAuthTokens(payload);
  const role = normalizeAuthRole(payload.type ?? null);

  return { accessToken, refreshToken, role };
};

export const handleAuthSuccess = (
  payload: LoginResponse,
  dispatch: AppDispatch,
) => {
  const { accessToken, refreshToken, role } = extractLoginAuthData(payload);

  dispatch(
    setCredentials({
      token: accessToken,
      refreshToken,
      role,
    }),
  );
};
