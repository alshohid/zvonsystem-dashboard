/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, Loader2, Lock, Mail, User } from "lucide-react";
import { authRoutes } from "@/src/lib/auth/config";
import AuthShadowPanel from "@/src/sharedComponents/auth/AuthShadowPanel";
import { useSignUpMutation } from "@/src/redux/features/auth/authapi";
import { useRouter } from "next/navigation";

type SignUpFormValues = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const fieldWrapperClassName =
  "flex h-[50px] items-center gap-2.5 rounded-[12px] border border-[#E4E7EC] bg-[#F5F7FB] px-4 transition focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/15";
const fieldInputClassName =
  "h-full w-full bg-transparent text-sm text-[#101828] outline-none placeholder:text-[#98A2B3]";

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [notice, setNotice] = useState("");
  const [signUp, { isLoading }] = useSignUpMutation();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormValues>({
    mode: "onChange",
    defaultValues: { name: "", email: "", password: "", confirmPassword: "" },
  });

  const onSubmit = async (data: SignUpFormValues) => {
    clearErrors("confirmPassword");
    setNotice("");

    if (data.password !== data.confirmPassword) {
      setError("confirmPassword", {
        type: "validate",
        message: "Passwords do not match.",
      });
      return;
    }

    try {
      const response: any = await signUp({ name: data.name, email: data.email, password: data.password }).unwrap();
      if (response.success) {
        setNotice(response?.data?.message);
        router.push(authRoutes.login);
      }
    } catch (error: any) {
      setNotice(error?.data?.message);
    }
  };

  return (
    <div className="box-border h-[100dvh] overflow-hidden px-3 py-3 sm:px-4 sm:py-4">
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
                  Create Account
                </h1>
                <p className="mt-3 text-sm leading-6 text-[#7C859C]">
                  Sign in to your artist account
                </p>
              </div>

              <form className="mt-10 space-y-5" onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-2">
                  <label
                    htmlFor="signup-name"
                    className="block text-sm font-medium text-[#131A2A]"
                  >
                    Name
                  </label>
                  <div className={fieldWrapperClassName}>
                    <User className="h-4 w-4 shrink-0 text-[#98A2B3]" strokeWidth={1.75} />
                    <input
                      id="signup-name"
                      type="text"
                      autoComplete="name"
                      placeholder="Enter your Name"
                      className={fieldInputClassName}
                      {...register("name", { required: "Name is required" })}
                    />
                  </div>
                  {errors.name && (
                    <p className="text-xs text-[#D14343]">{errors.name.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="signup-email"
                    className="block text-sm font-medium text-[#131A2A]"
                  >
                    Email
                  </label>
                  <div className={fieldWrapperClassName}>
                    <Mail className="h-4 w-4 shrink-0 text-[#98A2B3]" strokeWidth={1.75} />
                    <input
                      id="signup-email"
                      type="email"
                      autoComplete="email"
                      placeholder="Enter your email"
                      className={fieldInputClassName}
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /\S+@\S+\.\S+/,
                          message: "Enter a valid email address.",
                        },
                      })}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-xs text-[#D14343]">{errors.email.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="signup-password"
                    className="block text-sm font-medium text-[#131A2A]"
                  >
                    Password
                  </label>
                  <div className={fieldWrapperClassName}>
                    <Lock className="h-4 w-4 shrink-0 text-[#98A2B3]" strokeWidth={1.75} />
                    <input
                      id="signup-password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="new-password"
                      placeholder="Enter your Password"
                      className={fieldInputClassName}
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
                  {errors.password && (
                    <p className="text-xs text-[#D14343]">{errors.password.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="signup-confirm-password"
                    className="block text-sm font-medium text-[#131A2A]"
                  >
                    Confirm Password
                  </label>
                  <div className={fieldWrapperClassName}>
                    <Lock className="h-4 w-4 shrink-0 text-[#98A2B3]" strokeWidth={1.75} />
                    <input
                      id="signup-confirm-password"
                      type={showConfirmPassword ? "text" : "password"}
                      autoComplete="new-password"
                      placeholder="Enter your Password"
                      className={fieldInputClassName}
                      {...register("confirmPassword", {
                        required: "Please confirm your password.",
                      })}
                    />
                    <button
                      type="button"
                      className="shrink-0 rounded-full p-1 text-[#98A2B3] transition hover:text-[#344054]"
                      onClick={() => setShowConfirmPassword((prev) => !prev)}
                      aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4" strokeWidth={1.75} />
                      ) : (
                        <Eye className="h-4 w-4" strokeWidth={1.75} />
                      )}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-xs text-[#D14343]">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>

                <label className="flex cursor-pointer items-start gap-2 text-[13px] leading-5 text-[#667085]">
                  <input
                    type="checkbox"
                    checked={agreeToTerms}
                    onChange={(e) => setAgreeToTerms(e.target.checked)}
                    className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer appearance-none rounded-[4px] border border-[#D0D5DD] bg-white checked:border-primary checked:bg-primary"
                    style={{
                      backgroundImage: agreeToTerms
                        ? 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 16 16%22 fill=%22%23101828%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cpath d=%22M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 1 1-1.06-1.06L12.72 4.22a.75.75 0 0 1 1.06 0Z%22/%3E%3Cpath d=%22M2.22 9.28a.75.75 0 0 0 0 1.06l2.25 2.25a.75.75 0 1 0 1.06-1.06L3.28 9.28a.75.75 0 0 0-1.06 0Z%22/%3E%3C/svg%3E")'
                        : "none",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                    }}
                  />
                  <span>
                    I agree to the{" "}
                    <span className="font-medium text-[#16A34A]">Terms of Service</span> and{" "}
                    <span className="font-medium text-[#16A34A]">Privacy Policy</span>
                  </span>
                </label>

                {notice && (
                  <p className="rounded-[14px] border border-[#D5E0FF] bg-[#F5F8FF] px-4 py-3 text-sm text-[#395094]">
                    {notice}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting || isLoading}
                  className={`inline-flex h-[52px] w-full items-center justify-center gap-2 rounded-[14px] bg-primary px-5 text-sm font-semibold text-[#101828] transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70 ${isLoading ? "text-black" : ""}`}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span className="text-black">Creating Account...</span>
                    </div>
                  ) : (
                    "Create Account"
                  )}
                </button>

                <p className="text-center text-sm text-[#7C859C]">
                  Already have an account?{" "}
                  <Link
                    href={authRoutes.login}
                    className="font-semibold text-[#16A34A] transition hover:underline"
                  >
                    Sign in
                  </Link>
                </p>
              </form>
            </div>
          </section>

          <section className="hidden min-h-0 overflow-hidden rounded-[26px] lg:order-1 lg:block">
            <AuthShadowPanel tagline="Your art deserves a stage" />
          </section>
        </div>
      </div>
    </div>
  );
}
