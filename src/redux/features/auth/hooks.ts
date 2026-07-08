"use client";

import { baseApi, useLoginMutation } from "@/src/redux/api/baseApi";
import { useLogoutUserMutation } from "@/src/redux/features/auth/authapi";
import {
  logOut,
  selectCurrentRole,
  selectCurrentToken,
  selectIsAuthenticated,
} from "@/src/redux/features/auth/authSlice";
import { getErrorMessage } from "@/src/lib/getErrorMessage";
import { useAppDispatch, useAppSelector } from "@/src/redux/store";

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const token = useAppSelector(selectCurrentToken);
  const role = useAppSelector(selectCurrentRole);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const [logIn, loginState] = useLoginMutation();
  const [logoutUser, logoutState] = useLogoutUserMutation();

  const handleLogout = async () => {
    try {
      if (token) {
        await logoutUser().unwrap();
      }
    } catch (error) {
      console.error(getErrorMessage(error, "Logout request failed."));
    } finally {
      dispatch(logOut());
      dispatch(baseApi.util.resetApiState());
    }
  };

  return {
    token,
    role,
    isAuthenticated,
    logIn,
    logOut: handleLogout,
    isLoginLoading: loginState.isLoading,
    isLogoutLoading: logoutState.isLoading,
    isLoading: loginState.isLoading || logoutState.isLoading,
    loginError: loginState.error,
    logoutError: logoutState.error,
  };
};
