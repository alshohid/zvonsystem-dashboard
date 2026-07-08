"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ArrowLeftRight, ArrowRight } from "lucide-react";
import { GoEye, GoEyeClosed } from "react-icons/go";
import { useRouter, useSearchParams } from "next/navigation";
import { env } from "@/src/lib/env";
import { useAuth } from "@/src/redux/features/auth/hooks";
import { getErrorMessage } from "@/src/lib/getErrorMessage";
import {
  authRoutes,
  normalizeAuthRole,
  resolvePostLoginPath,
} from "@/src/lib/auth/config";

type AuthMode = "login" | "activate";

type LoginFormValues = {
  email: string;
  password: string;
};

type ActivateWorkspaceFormValues = {
  organizationName: string;
  email: string;
  fullName: string;
  password: string;
  confirmPassword: string;
};

const LOGIN_HERO_PATH = "/images/auth/login-hero.jpg";
const ACTIVATE_WORKSPACE_HERO_PATH =
  "/images/auth/activate-workspace-hero.jpg";

const inputClassName =
  "h-[50px] w-full rounded-[12px] border border-[#D9E0EF] bg-white px-4 text-sm text-[#101828] outline-none transition placeholder:text-[#A0A8BC] hover:border-[#C5CEE4] focus:border-[#2E3A83] focus:ring-4 focus:ring-[#2E3A83]/8";

type AuthVisualPanelProps = {
  mode: AuthMode;
};

function AuthVisualPanel({ mode }: AuthVisualPanelProps) {
  const imagePath =
    mode === "login" ? LOGIN_HERO_PATH : ACTIVATE_WORKSPACE_HERO_PATH;
  const [failedImagePath, setFailedImagePath] = useState<string | null>(null);
  const imageFailed = failedImagePath === imagePath;

  const truckTheme =
    mode === "login"
      ? {
        cabin: "from-[#6B778A] via-[#425164] to-[#131C27]",
        trailer: "from-[#DCE6F2] via-[#A6B7CB] to-[#5E7289]",
        accent: "bg-[#C7D4E2]",
        bumper: "bg-[#1A2430]",
        wheel: "bg-[#0D1219]",
        rim: "bg-[#F2F5FA]",

      }
      : {
        cabin: "from-[#2D96FF] via-[#0F67EE] to-[#083B9C]",
        trailer: "from-[#BFE8FF] via-[#79C7FF] to-[#2B8AF3]",
        accent: "bg-[#8FE6FF]",
        bumper: "bg-[#0A2C70]",
        wheel: "bg-[#081018]",
        rim: "bg-[#FAFCFF]",

      };

  return (
    <div className="relative h-[320px] overflow-hidden rounded-[26px] border border-[#DDE4F2] bg-[#DFF4FF] shadow-[0_30px_70px_rgba(46,58,131,0.12)] sm:h-[400px] lg:h-full lg:min-h-0">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#E5F8FF_0%,#A9DCF8_38%,#F7FBFF_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.95),transparent_34%),radial-gradient(circle_at_top_right,rgba(255,255,255,0.42),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.52),transparent_30%)]" />

      <div className="absolute left-[4%] top-[11%] h-[18%] w-[45%] rounded-full bg-white/50 blur-3xl" />
      <div className="absolute right-[5%] top-[18%] h-[15%] w-[34%] rounded-full bg-white/35 blur-3xl" />

      <div className="absolute inset-x-0 bottom-0 h-[32%] bg-[linear-gradient(180deg,rgba(255,255,255,0)_0%,rgba(212,196,164,0.24)_24%,rgba(167,141,93,0.44)_100%)]" />
      <div className="absolute inset-x-[5%] bottom-[8%] h-[19%] [clip-path:polygon(6%_0,94%_0,100%_100%,0_100%)] rounded-[32px] bg-[linear-gradient(180deg,#5D6268_0%,#1A1D23_100%)] shadow-[0_18px_34px_rgba(0,0,0,0.18)]" />
      <div className="absolute bottom-[17%] left-[18%] h-[1.2%] w-[10%] rounded-full bg-white/80" />
      <div className="absolute bottom-[13%] left-[31%] h-[8%] w-[1.4%] rounded-full bg-white/85" />
      <div className="absolute bottom-[16%] left-[57%] h-[1.2%] w-[10%] rounded-full bg-white/70" />
      <div className="absolute bottom-[13%] left-[69%] h-[7%] w-[1.4%] rounded-full bg-white/80" />

      <div className="absolute bottom-[11%] right-[6%] h-[45%] w-[70%] min-w-[280px] max-w-[520px]">
        <div
          className={[
            "absolute bottom-[15%] right-0 h-[34%] w-[58%] rounded-[24px] border border-white/40 bg-gradient-to-br shadow-[0_24px_40px_rgba(14,28,44,0.18)]",
            truckTheme.trailer,
          ].join(" ")}
        />
        <div className="absolute bottom-[29%] right-[5%] h-[4%] w-[38%] rounded-full bg-white/35 blur-md" />
        <div
          className={[
            "absolute bottom-0 left-[10%] h-[46%] w-[36%] rounded-[34px_34px_20px_20px] border border-white/35 bg-gradient-to-br shadow-[0_24px_40px_rgba(12,28,56,0.24)]",
            truckTheme.cabin,
          ].join(" ")}
        />
        <div className="absolute bottom-[26%] left-[22%] h-[16%] w-[19%] rounded-[18px] bg-[#112235]/75 backdrop-blur-[2px]" />
        <div className="absolute bottom-[33%] left-[13%] h-[4%] w-[20%] rounded-full bg-white/25" />
        <div className="absolute bottom-[13%] left-[12%] h-[8%] w-[15%] rounded-[14px] bg-[#0B1420]/88" />
        <div className="absolute bottom-[14%] left-[20%] h-[3.2%] w-[9%] rounded-full bg-white/38" />
        <div
          className={[
            "absolute bottom-[4%] left-[11%] h-[22%] w-[12%] rounded-full border-[10px] shadow-[0_12px_18px_rgba(0,0,0,0.28)]",
            truckTheme.wheel,
            truckTheme.rim,
          ].join(" ")}
        />
        <div
          className={[
            "absolute bottom-[4%] left-[43%] h-[18%] w-[10%] rounded-full border-[8px] shadow-[0_12px_18px_rgba(0,0,0,0.26)]",
            truckTheme.wheel,
            truckTheme.rim,
          ].join(" ")}
        />
        <div
          className={[
            "absolute bottom-[4%] right-[21%] h-[18%] w-[10%] rounded-full border-[8px] shadow-[0_12px_18px_rgba(0,0,0,0.26)]",
            truckTheme.wheel,
            truckTheme.rim,
          ].join(" ")}
        />
        <div
          className={[
            "absolute bottom-[4%] right-[7%] h-[18%] w-[10%] rounded-full border-[8px] shadow-[0_12px_18px_rgba(0,0,0,0.26)]",
            truckTheme.wheel,
            truckTheme.rim,
          ].join(" ")}
        />
        <div className={["absolute bottom-[19%] left-[29%] h-[3%] w-[18%] rounded-full", truckTheme.accent].join(" ")} />
        <div className={["absolute bottom-[12%] left-[11%] h-[4%] w-[28%] rounded-full", truckTheme.bumper].join(" ")} />
      </div>

      {!imageFailed && (
        <Image
          key={imagePath}
          src={imagePath}
          alt={mode === "login" ? "Login page truck visual" : "Activate workspace truck visual"}
          fill
          unoptimized
          priority={mode === "login"}
          className="object-cover"
          onError={() => setFailedImagePath(imagePath)}
        />
      )}

      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.06)_0%,rgba(255,255,255,0)_42%,rgba(16,24,40,0.14)_100%)]" />
    </div>
  );
}

export default function Login() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirect");
  const [mode, setMode] = useState<AuthMode>("login");
  const [hasSwapped, setHasSwapped] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showWorkspacePassword, setShowWorkspacePassword] = useState(false);
  const [showWorkspaceConfirmPassword, setShowWorkspaceConfirmPassword] =
    useState(false);
  const [serverError, setServerError] = useState("");
  const [workspaceNotice, setWorkspaceNotice] = useState("");
  const { logIn, isLoading, isAuthenticated, role } = useAuth();

  const {
    register,
    handleSubmit,
    formState: loginFormState,
  } = useForm<LoginFormValues>({
    mode: "onChange",
    defaultValues: { email: "", password: "" },
  });

  const {
    register: registerWorkspace,
    handleSubmit: handleWorkspaceSubmit,
    formState: workspaceFormState,
    setError: setWorkspaceError,
    clearErrors: clearWorkspaceErrors,
  } = useForm<ActivateWorkspaceFormValues>({
    mode: "onChange",
    defaultValues: {
      organizationName: "",
      email: "",
      fullName: "",
      password: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    if (isAuthenticated && role) {
      router.replace(resolvePostLoginPath(role, redirectPath));
    }
  }, [isAuthenticated, redirectPath, role, router]);

  const switchMode = (nextMode: AuthMode) => {
    if (nextMode === mode) {
      return;
    }

    setMode(nextMode);
    setHasSwapped(true);
    setServerError("");
    setWorkspaceNotice("");
  };

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

  const onWorkspaceSubmit = (data: ActivateWorkspaceFormValues) => {
    clearWorkspaceErrors("confirmPassword");
    setWorkspaceNotice("");

    if (data.password !== data.confirmPassword) {
      setWorkspaceError("confirmPassword", {
        type: "validate",
        message: "Passwords do not match.",
      });
      return;
    }

    setWorkspaceNotice(
      env.designMode
        ? "Activate workspace screen is ready. Add your final hero image to the configured path and wire the backend later."
        : "Workspace activation UI is ready for backend integration.",
    );
  };

  const isLoginMode = mode === "login";
  const formAnimation = hasSwapped
    ? isLoginMode
      ? "auth-panel-enter-from-left 720ms cubic-bezier(0.22,1,0.36,1)"
      : "auth-panel-enter-from-right 720ms cubic-bezier(0.22,1,0.36,1)"
    : undefined;
  const visualAnimation = hasSwapped
    ? isLoginMode
      ? "auth-panel-enter-from-right 720ms cubic-bezier(0.22,1,0.36,1)"
      : "auth-panel-enter-from-left 720ms cubic-bezier(0.22,1,0.36,1)"
    : undefined;

  return (
    <div className="box-border h-[100dvh] overflow-hidden bg-[#EEF2F8] px-3 py-3 sm:px-4 sm:py-4">
      <div className="mx-auto flex h-full w-full flex-col overflow-hidden rounded-[30px] p-3 sm:p-4 lg:p-5">
        <div className={`grid h-full min-h-0 flex-1 gap-4 ${isLoginMode ? "lg:grid-cols-[5fr_7fr]" : "lg:grid-cols-[7fr_5fr]"}`}>
          <section
            style={formAnimation ? { animation: formAnimation } : undefined}
            className={[
              "flex min-h-0 items-center justify-center rounded-[26px] px-6 py-8 sm:px-8 lg:px-10",
              isLoginMode ? "lg:order-1" : "lg:order-2",
            ].join(" ")}
          >
            <div className="w-full max-w-[338px]">
              <div className="mb-10 flex justify-center">
                <Image
                  src="/images/auth/website_logo.png"
                  alt="FleetOS"
                  width={110}
                  height={50}
                  priority
                />
              </div>

              <div className="text-center">
                <h1 className="text-[34px] font-semibold tracking-[-0.03em] text-[#111111]">
                  {isLoginMode ? "Welcome Back" : "Activate Workspace"}
                </h1>
                <p className="mt-3 text-sm leading-6 text-[#7C859C]">
                  {isLoginMode
                    ? "Glad to see you again. Log in to your account."
                    : "Set up your organization access and activate your workspace."}
                </p>
              </div>

              {isLoginMode ? (
                <form
                  className="mt-10 space-y-5"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div className="space-y-2">
                    <label
                      htmlFor="login-email"
                      className="block text-sm font-medium text-[#131A2A]"
                    >
                      Email
                    </label>
                    <input
                      id="login-email"
                      type="email"
                      autoComplete="email"
                      placeholder="yourmail@gmail.com"
                      className={inputClassName}
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /\S+@\S+\.\S+/,
                          message: "Enter a valid email address.",
                        },
                      })}
                    />
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
                    <div className="relative">
                      <button
                        type="button"
                        className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-1 text-[#8B95AB] transition hover:bg-[#F1F4FC] hover:text-[#2E3A83]"
                        onClick={() => setShowPassword((prev) => !prev)}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? (
                          <GoEyeClosed size={18} />
                        ) : (
                          <GoEye size={18} />
                        )}
                      </button>
                      <input
                        id="login-password"
                        type={showPassword ? "text" : "password"}
                        autoComplete="current-password"
                        placeholder="Enter your password"
                        className={`${inputClassName} pr-12`}
                        {...register("password", {
                          required: "Password is required",
                          minLength: {
                            value: 8,
                            message: "Password must be at least 8 characters.",
                          },
                        })}
                      />
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
                    className="inline-flex h-[52px] w-full items-center justify-center gap-2 rounded-[14px] bg-[#2E3A83] px-5 text-sm font-semibold text-white transition hover:bg-[#24306C] disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {isLoading ? "Signing in..." : "Login"}
                    {!isLoading && <ArrowRight size={16} />}
                  </button>

                  <button
                    type="button"
                    onClick={() => switchMode("activate")}
                    className="inline-flex h-[50px] w-full items-center justify-center gap-2 rounded-[14px] border border-[#D7DEED] bg-[#F7F9FD] px-5 text-sm font-semibold text-[#2E3A83] transition hover:border-[#C6D0E8] hover:bg-[#F2F5FC]"
                  >
                    <ArrowLeftRight size={16} />
                    Activate Workspace
                  </button>
                </form>
              ) : (
                <form
                  className="mt-10 space-y-4"
                  onSubmit={handleWorkspaceSubmit(onWorkspaceSubmit)}
                >
                  <div className="space-y-2">
                    <label
                      htmlFor="workspace-organization"
                      className="block text-sm font-medium text-[#131A2A]"
                    >
                      Organization Name
                    </label>
                    <input
                      id="workspace-organization"
                      type="text"
                      placeholder="XYZ Freight"
                      className={inputClassName}
                      {...registerWorkspace("organizationName", {
                        required: "Organization name is required.",
                      })}
                    />
                    {workspaceFormState.errors.organizationName && (
                      <p className="text-xs text-[#D14343]">
                        {workspaceFormState.errors.organizationName.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="workspace-email"
                      className="block text-sm font-medium text-[#131A2A]"
                    >
                      Email
                    </label>
                    <input
                      id="workspace-email"
                      type="email"
                      autoComplete="email"
                      placeholder="buyer@gmail.com"
                      className={inputClassName}
                      {...registerWorkspace("email", {
                        required: "Email is required.",
                        pattern: {
                          value: /\S+@\S+\.\S+/,
                          message: "Enter a valid email address.",
                        },
                      })}
                    />
                    {workspaceFormState.errors.email && (
                      <p className="text-xs text-[#D14343]">
                        {workspaceFormState.errors.email.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="workspace-full-name"
                      className="block text-sm font-medium text-[#131A2A]"
                    >
                      Full Name
                    </label>
                    <input
                      id="workspace-full-name"
                      type="text"
                      placeholder="John Carter"
                      className={inputClassName}
                      {...registerWorkspace("fullName", {
                        required: "Full name is required.",
                      })}
                    />
                    {workspaceFormState.errors.fullName && (
                      <p className="text-xs text-[#D14343]">
                        {workspaceFormState.errors.fullName.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="workspace-password"
                      className="block text-sm font-medium text-[#131A2A]"
                    >
                      Create Password
                    </label>
                    <div className="relative">
                      <button
                        type="button"
                        className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-1 text-[#8B95AB] transition hover:bg-[#F1F4FC] hover:text-[#2E3A83]"
                        onClick={() =>
                          setShowWorkspacePassword((prev) => !prev)
                        }
                        aria-label={
                          showWorkspacePassword
                            ? "Hide password"
                            : "Show password"
                        }
                      >
                        {showWorkspacePassword ? (
                          <GoEyeClosed size={18} />
                        ) : (
                          <GoEye size={18} />
                        )}
                      </button>
                      <input
                        id="workspace-password"
                        type={showWorkspacePassword ? "text" : "password"}
                        autoComplete="new-password"
                        placeholder="Create a secure password"
                        className={`${inputClassName} pr-12`}
                        {...registerWorkspace("password", {
                          required: "Password is required.",
                          minLength: {
                            value: 8,
                            message: "Password must be at least 8 characters.",
                          },
                        })}
                      />
                    </div>
                    {workspaceFormState.errors.password && (
                      <p className="text-xs text-[#D14343]">
                        {workspaceFormState.errors.password.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="workspace-confirm-password"
                      className="block text-sm font-medium text-[#131A2A]"
                    >
                      Confirm Password
                    </label>
                    <div className="relative">
                      <button
                        type="button"
                        className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-1 text-[#8B95AB] transition hover:bg-[#F1F4FC] hover:text-[#2E3A83]"
                        onClick={() =>
                          setShowWorkspaceConfirmPassword((prev) => !prev)
                        }
                        aria-label={
                          showWorkspaceConfirmPassword
                            ? "Hide password"
                            : "Show password"
                        }
                      >
                        {showWorkspaceConfirmPassword ? (
                          <GoEyeClosed size={18} />
                        ) : (
                          <GoEye size={18} />
                        )}
                      </button>
                      <input
                        id="workspace-confirm-password"
                        type={showWorkspaceConfirmPassword ? "text" : "password"}
                        autoComplete="new-password"
                        placeholder="Repeat your password"
                        className={`${inputClassName} pr-12`}
                        {...registerWorkspace("confirmPassword", {
                          required: "Please confirm your password.",
                        })}
                      />
                    </div>
                    {workspaceFormState.errors.confirmPassword && (
                      <p className="text-xs text-[#D14343]">
                        {workspaceFormState.errors.confirmPassword.message}
                      </p>
                    )}
                  </div>

                  {workspaceNotice && (
                    <p className="rounded-[14px] border border-[#D5E0FF] bg-[#F5F8FF] px-4 py-3 text-sm text-[#395094]">
                      {workspaceNotice}
                    </p>
                  )}

                  <button
                    type="submit"
                    className="inline-flex h-[52px] w-full items-center justify-center rounded-[14px] bg-[#AAB2D4] px-5 text-sm font-semibold text-white transition hover:bg-[#949FC7]"
                  >
                    Activate Workspace
                  </button>

                  <button
                    type="button"
                    onClick={() => switchMode("login")}
                    className="inline-flex h-[50px] w-full items-center justify-center gap-2 rounded-[14px] border border-[#D7DEED] bg-[#F7F9FD] px-5 text-sm font-semibold text-[#2E3A83] transition hover:border-[#C6D0E8] hover:bg-[#F2F5FC]"
                  >
                    <ArrowLeftRight size={16} />
                    Back to Login
                  </button>
                </form>
              )}


            </div>
          </section>

          <section
            style={visualAnimation ? { animation: visualAnimation } : undefined}
            className={[
              "hidden min-h-0 overflow-hidden rounded-[26px] lg:block",
              isLoginMode ? "lg:order-2" : "lg:order-1",
            ].join(" ")}
          >
            <AuthVisualPanel mode={mode} />
          </section>
        </div>
      </div>
    </div>
  );
}
// Glad to see you again. Log in to your account.
