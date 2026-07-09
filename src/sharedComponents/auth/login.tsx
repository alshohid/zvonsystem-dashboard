"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/src/redux/features/auth/hooks";
import { getErrorMessage } from "@/src/lib/getErrorMessage";
import {
  authRoutes,
  normalizeAuthRole,
  resolvePostLoginPath,
} from "@/src/lib/auth/config";
import AuthShadowPanel from "@/src/sharedComponents/auth/AuthShadowPanel";

type LoginFormValues = {
  email: string;
  password: string;
};

const loginFieldWrapperClassName =
  "flex h-[50px] items-center gap-2.5 rounded-[12px] border border-[#E4E7EC] bg-[#F5F7FB] px-4 transition focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/15";
const loginFieldInputClassName =
  "h-full w-full bg-transparent text-sm text-[#101828] outline-none placeholder:text-[#98A2B3]";

export default function Login() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirect");
  const [showPassword, setShowPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [serverError, setServerError] = useState("");
  const { logIn, isLoading, isAuthenticated, role } = useAuth();

  const {
    register,
    handleSubmit,
    formState: loginFormState,
  } = useForm<LoginFormValues>({
    mode: "onChange",
    defaultValues: { email: "", password: "" },
  });

  useEffect(() => {
    if (isAuthenticated && role) {
      router.replace(resolvePostLoginPath(role, redirectPath));
    }
  }, [isAuthenticated, redirectPath, role, router]);

  const onSubmit = async (data: LoginFormValues) => {
    try {
      setServerError("");

      const response = await logIn(data).unwrap();
      const responseRole = normalizeAuthRole(response.type ?? null);

      if (!response.success || !responseRole) {
        throw new Error("Login response did not include a valid user role.");
      }

      router.replace(resolvePostLoginPath(responseRole, redirectPath));
    } catch (error) {
      setServerError(getErrorMessage(error, "Login failed. Please try again."));
    }
  };

  return (
    <div className="box-border h-[100dvh] overflow-hidden  px-3 py-3 sm:px-4 sm:py-4">
      <div className="mx-auto flex h-full w-full flex-col overflow-hidden rounded-[30px] p-3 sm:p-4 lg:p-5">
        <div className="grid h-full min-h-0 flex-1 gap-4 lg:grid-cols-[6fr_6fr]">
          <section className="flex min-h-0 items-center justify-center rounded-[26px] px-6 py-8 sm:px-8 lg:order-2 lg:px-10">
            <div className="w-full max-w-[338px]">
              <div className="mb-10 flex justify-center">
                <Image
                  src="/images/website_logo.png"
                  alt="Zvon"
                  width={220}
                  height={50}
                  className="w-auto h-auto"
                />
              </div>

              <div className="text-center">
                <h1 className="text-[34px] font-semibold tracking-[-0.03em] text-[#111111]">
                  Login
                </h1>
                <p className="mt-3 text-sm leading-6 text-[#7C859C]">
                  Log in your account
                </p>
              </div>

              <form className="mt-10 space-y-5" onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-2">
                  <label
                    htmlFor="login-email"
                    className="block text-sm font-medium text-[#131A2A]"
                  >
                    Email
                  </label>
                  <div className={loginFieldWrapperClassName}>
                    <Mail className="h-4 w-4 shrink-0 text-[#98A2B3]" strokeWidth={1.75} />
                    <input
                      id="login-email"
                      type="email"
                      autoComplete="email"
                      placeholder="Enter your email"
                      className={loginFieldInputClassName}
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /\S+@\S+\.\S+/,
                          message: "Enter a valid email address.",
                        },
                      })}
                    />
                  </div>
                  {loginFormState.errors.email && (
                    <p className="text-xs text-[#D14343]">
                      {loginFormState.errors.email.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="login-password"
                    className="block text-sm font-medium text-[#131A2A]"
                  >
                    Password
                  </label>
                  <div className={loginFieldWrapperClassName}>
                    <Lock className="h-4 w-4 shrink-0 text-[#98A2B3]" strokeWidth={1.75} />
                    <input
                      id="login-password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      placeholder="Enter your Password"
                      className={loginFieldInputClassName}
                      {...register("password", {
                        required: "Password is required",
                        minLength: {
                          value: 8,
                          message: "Password must be at least 8 characters.",
                        },
                      })}
                    />
                    <button
                      type="button"
                      className="shrink-0 rounded-full p-1 text-[#98A2B3] transition hover:text-[#344054]"
                      onClick={() => setShowPassword((prev) => !prev)}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" strokeWidth={1.75} />
                      ) : (
                        <Eye className="h-4 w-4" strokeWidth={1.75} />
                      )}
                    </button>
                  </div>
                  {loginFormState.errors.password && (
                    <p className="text-xs text-[#D14343]">
                      {loginFormState.errors.password.message}
                    </p>
                  )}
                </div>

                <div className="flex justify-end">
                  <Link
                    href={authRoutes.forgotPassword}
                    className="text-[13px] font-medium text-[#4A5FA8] transition hover:text-[#2E3A83]"
                  >
                    Forgot Password?
                  </Link>
                </div>
                {serverError && (
                  <p className="rounded-[14px] border border-[#F3D2D2] bg-[#FFF5F5] px-4 py-3 text-sm text-[#C23A3A]">
                    {serverError}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="inline-flex h-[52px] w-full items-center justify-center gap-2 rounded-[14px] bg-primary px-5 text-sm font-semibold text-[#101828] transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isLoading ? "Signing in..." : "Log In"}
                </button>

                <p className="text-center text-sm text-[#7C859C]">
                  Don&apos;t have an account?{" "}
                  <Link
                    href={authRoutes.signUp}
                    className="font-semibold text-[#16A34A] transition hover:underline"
                  >
                    Sign up
                  </Link>
                </p>
              </form>
            </div>
          </section>

          <section className="hidden min-h-0 overflow-hidden rounded-[26px] lg:order-1 lg:block">
            <AuthShadowPanel tagline="Every legend starts with first step" />
          </section>
        </div>
      </div>
    </div>
  );
}
