"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type ClipboardEvent,
  type ReactNode,
} from "react";
import { useForm, useWatch } from "react-hook-form";
import { GoEye, GoEyeClosed } from "react-icons/go";
import { authRoutes } from "@/src/lib/auth/config";
import { getErrorMessage } from "@/src/lib/getErrorMessage";
import {
  useForgotPasswordMutation,
  useResendVerificationEmailMutation,
  useResetPasswordMutation,
} from "@/src/redux/features/auth/authapi";

type Step = "email" | "otp" | "password" | "success";

type ForgotPasswordForm = {
  email: string;
  code: string[];
  password: string;
  confirmPassword: string;
};

const CODE_LENGTH = 5;
const AUTH_HERO_PATH = "/images/auth/activate-workspace-hero.jpg";

const inputClassName =
  "h-[50px] w-full rounded-[12px] border border-[#D9E0EF] bg-white px-4 text-sm text-[#101828] outline-none transition placeholder:text-[#A0A8BC] hover:border-[#C5CEE4] focus:border-[#2E3A83] focus:ring-4 focus:ring-[#2E3A83]/8";

const primaryButtonClassName =
  "inline-flex h-[52px] w-full items-center justify-center rounded-[14px] bg-[#2E3A83] px-5 text-sm font-semibold text-white transition hover:bg-[#24306C] disabled:cursor-not-allowed disabled:bg-[#AAB2D4] disabled:hover:bg-[#AAB2D4]";

const getStepFromQuery = (value: string | null, email: string): Step => {
  if ((value === "otp" || value === "reset") && email) {
    return "otp";
  }

  if (value === "password" && email) {
    return "password";
  }

  if (value === "success") {
    return "success";
  }

  return "email";
};

function AuthRecoveryLayout({ children }: { children: ReactNode }) {
  return (
    <div className="box-border h-[100dvh] overflow-hidden bg-[#EEF2F8] px-3 py-3 sm:px-4 sm:py-4">
      <div className="mx-auto flex h-full w-full flex-col overflow-hidden rounded-[30px] p-3 sm:p-4 lg:p-5">
        <div className="grid h-full min-h-0 flex-1 gap-4 lg:grid-cols-[5fr_7fr]">
          <section className="flex min-h-0 items-center justify-center rounded-[26px] px-6 py-8 sm:px-8 lg:px-10">
            <div className="w-full max-w-[338px]">{children}</div>
          </section>

          <section className="hidden min-h-0 overflow-hidden rounded-[26px] lg:block">
            <div className="relative h-full overflow-hidden rounded-[26px] border border-[#DDE4F2] bg-[#DFF4FF] shadow-[0_30px_70px_rgba(46,58,131,0.12)]">
              <Image
                src={AUTH_HERO_PATH}
                alt="Password recovery truck visual"
                fill
                priority
                unoptimized
                className="object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.04)_0%,rgba(255,255,255,0)_46%,rgba(16,24,40,0.12)_100%)]" />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function AuthLogo() {
  return (
    <div className="mb-10 flex justify-center">
      <Image
        src="/images/auth/website_logo.png"
        alt="FleetOS"
        width={110}
        height={50}
        priority
        className="h-auto w-[88px] object-contain"
      />
    </div>
  );
}

function ScreenHeader({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="text-center">
      <h1 className="text-xl font-semibold tracking-[-0.02em] text-[#111111]">
        {title}
      </h1>
      <p className="mx-auto mt-3 max-w-[286px] text-sm leading-6 text-[#7C859C]">
        {description}
      </p>
    </div>
  );
}

function FeedbackMessage({
  tone,
  children,
}: {
  tone: "error" | "success";
  children: ReactNode;
}) {
  return (
    <p
      className={[
        "rounded-[12px] border px-4 py-3 text-sm",
        tone === "error"
          ? "border-[#F3D2D2] bg-[#FFF5F5] text-[#C23A3A]"
          : "border-[#D5E0FF] bg-[#F5F8FF] text-[#395094]",
      ].join(" ")}
    >
      {children}
    </p>
  );
}

export default function ForgotPasswordRecovery() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryEmail = searchParams.get("email")?.trim() ?? "";
  const requestedStep = getStepFromQuery(searchParams.get("step"), queryEmail);
  const requestedNavigationStep =
    requestedStep === "password" ? "otp" : requestedStep;

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [serverError, setServerError] = useState("");
  const [verifiedCode, setVerifiedCode] = useState("");
  const [currentStep, setCurrentStep] = useState<Step>(requestedNavigationStep);

  const [forgotPassword, forgotPasswordState] = useForgotPasswordMutation();
  const [resendVerificationEmail, resendVerificationEmailState] =
    useResendVerificationEmailMutation();
  const [resetPassword, resetPasswordState] = useResetPasswordMutation();

  const { register, handleSubmit, control, formState, setValue, getValues } =
    useForm<ForgotPasswordForm>({
      mode: "onChange",
      shouldUnregister: true,
      defaultValues: {
        email: "",
        code: Array(CODE_LENGTH).fill(""),
        password: "",
        confirmPassword: "",
      },
    });

  const emailValue = useWatch({ control, name: "email" });
  const codeValue = useWatch({ control, name: "code" });
  const passwordValue = useWatch({ control, name: "password" });
  const confirmPasswordValue = useWatch({ control, name: "confirmPassword" });
  const joinedCode = (codeValue ?? []).join("");
  const codeInputs = useMemo(
    () => Array.from({ length: CODE_LENGTH }, (_, index) => index),
    [],
  );
  const codeInputRefs = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    if (!queryEmail) {
      return;
    }

    setValue("email", queryEmail, {
      shouldDirty: false,
      shouldValidate: requestedStep === "email",
    });
  }, [queryEmail, requestedStep, setValue]);

  const updateUrlState = (nextStep: Step, nextEmail = "") => {
    const params = new URLSearchParams(searchParams.toString());

    if (nextStep === "email") {
      params.delete("step");
    } else {
      params.set("step", nextStep);
    }

    if (nextStep === "success") {
      params.delete("email");
    } else if (nextEmail) {
      params.set("email", nextEmail);
    } else {
      params.delete("email");
    }

    const query = params.toString();

    router.replace(
      query ? `${authRoutes.forgotPassword}?${query}` : authRoutes.forgotPassword,
      { scroll: false },
    );
  };

  const clearFeedback = () => {
    setServerError("");
    setStatusMessage("");
  };

  const assertSuccessfulResponse = (
    response: { success?: boolean; message?: string },
    fallbackMessage: string,
  ) => {
    if (response.success === false) {
      throw new Error(response.message || fallbackMessage);
    }

    return response;
  };

  const clearResetFields = () => {
    setVerifiedCode("");

    codeInputs.forEach((index) => {
      setValue(`code.${index}`, "", {
        shouldDirty: false,
        shouldValidate: false,
      });
    });

    setValue("password", "", {
      shouldDirty: false,
      shouldValidate: false,
    });
    setValue("confirmPassword", "", {
      shouldDirty: false,
      shouldValidate: false,
    });
  };

  const focusCodeInput = (index: number) => {
    codeInputRefs.current[index]?.focus();
    codeInputRefs.current[index]?.select();
  };

  const setCodeValue = (index: number, value: string) => {
    setValue(`code.${index}`, value, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const handleCodeChange = (index: number, value: string) => {
    const digits = value.replace(/\D/g, "");

    if (digits.length === 0) {
      setCodeValue(index, "");
      return;
    }

    if (digits.length === 1) {
      setCodeValue(index, digits);

      if (index < CODE_LENGTH - 1) {
        focusCodeInput(index + 1);
      }

      return;
    }

    const maxFill = Math.min(digits.length, CODE_LENGTH - index);

    for (let i = 0; i < maxFill; i += 1) {
      setCodeValue(index + i, digits[i]);
    }

    const nextIndex = Math.min(index + maxFill, CODE_LENGTH - 1);
    focusCodeInput(nextIndex);
  };

  const handleCodeKeyDown = (index: number, key: string) => {
    if (key === "Backspace") {
      const currentValue = getValues(`code.${index}`);

      if (!currentValue && index > 0) {
        focusCodeInput(index - 1);
      }
    }

    if (key === "ArrowLeft" && index > 0) {
      focusCodeInput(index - 1);
    }

    if (key === "ArrowRight" && index < CODE_LENGTH - 1) {
      focusCodeInput(index + 1);
    }
  };

  const handleCodePaste = (
    event: ClipboardEvent<HTMLInputElement>,
    startIndex: number,
  ) => {
    event.preventDefault();
    const digits = event.clipboardData.getData("text").replace(/\D/g, "");

    if (!digits) {
      return;
    }

    const maxFill = Math.min(digits.length, CODE_LENGTH - startIndex);

    for (let i = 0; i < maxFill; i += 1) {
      setCodeValue(startIndex + i, digits[i]);
    }

    const nextIndex = Math.min(startIndex + maxFill, CODE_LENGTH - 1);
    focusCodeInput(nextIndex);
  };

  const handleSendCode = async ({ email }: ForgotPasswordForm) => {
    const normalizedEmail = email.trim();

    try {
      clearFeedback();

      assertSuccessfulResponse(
        await forgotPassword({ email: normalizedEmail }).unwrap(),
        "We couldn't send the OTP right now. Please try again.",
      );

      setValue("email", normalizedEmail, {
        shouldDirty: true,
        shouldValidate: true,
      });
      clearResetFields();
      setCurrentStep("otp");
      updateUrlState("otp", normalizedEmail);
    } catch (error) {
      setServerError(
        getErrorMessage(
          error,
          "We couldn't send the OTP right now. Please try again.",
        ),
      );
    }
  };

  const handleVerifyCode = () => {
    if (!queryEmail) {
      setServerError("Please enter your email first.");
      updateUrlState("email");
      return;
    }

    if (joinedCode.length !== CODE_LENGTH) {
      setServerError("Please enter the complete OTP.");
      return;
    }

    clearFeedback();
    setVerifiedCode(joinedCode);
    setCurrentStep("password");
  };

  const handlePasswordReset = async ({
    password,
    code,
  }: ForgotPasswordForm) => {
    if (!queryEmail) {
      setServerError("Please enter your email first.");
      updateUrlState("email");
      return;
    }

    const token = verifiedCode || (code ?? []).join("");

    if (token.length !== CODE_LENGTH) {
      setServerError("Please verify the OTP before creating a new password.");
      setCurrentStep("otp");
      updateUrlState("otp", queryEmail);
      return;
    }

    try {
      clearFeedback();

      const response = assertSuccessfulResponse(
        await resetPassword({
          email: queryEmail,
          token,
          password,
        }).unwrap(),
        "We couldn't reset your password. Please try again.",
      );

      clearResetFields();
      setStatusMessage(
        response.message || "Your password has been updated successfully.",
      );
      setCurrentStep("success");
      updateUrlState("success");
    } catch (error) {
      setServerError(
        getErrorMessage(
          error,
          "We couldn't reset your password. Please try again.",
        ),
      );
    }
  };

  const handleResendCode = async () => {
    if (!queryEmail) {
      setServerError("Please enter your email first.");
      updateUrlState("email");
      return;
    }

    try {
      clearFeedback();

      assertSuccessfulResponse(
        await resendVerificationEmail({ email: queryEmail }).unwrap(),
        "We couldn't resend the OTP. Please try again.",
      );

      setVerifiedCode("");
      setCurrentStep("otp");
      codeInputs.forEach((index) => {
        setValue(`code.${index}`, "", {
          shouldDirty: false,
          shouldValidate: false,
        });
      });
      focusCodeInput(0);
    } catch (error) {
      setServerError(
        getErrorMessage(
          error,
          "We couldn't resend the OTP. Please try again.",
        ),
      );
    }
  };

  const isEmailStepValid =
    Boolean(emailValue?.trim()) && !formState.errors.email;
  const isOtpStepValid = joinedCode.length === CODE_LENGTH;
  const isPasswordStepValid =
    Boolean(passwordValue) &&
    passwordValue.length >= 8 &&
    Boolean(confirmPasswordValue) &&
    confirmPasswordValue === passwordValue;

  return (
    <AuthRecoveryLayout>
      <AuthLogo />

      {currentStep === "email" ? (
        <>
          <ScreenHeader
            title="Forgot Password"
            description="Enter your email address and we'll send you password reset instructions."
          />

          <form
            className="mt-8 space-y-5"
            onSubmit={handleSubmit(handleSendCode)}
          >
            <div className="space-y-2">
              <label
                htmlFor="forgot-email"
                className="block text-sm font-medium text-[#131A2A]"
              >
                Email
              </label>
              <input
                id="forgot-email"
                type="email"
                placeholder="yourmail@gmail.com"
                autoComplete="email"
                className={inputClassName}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Enter a valid email address.",
                  },
                })}
              />
              {formState.errors.email ? (
                <p className="text-xs text-[#D14343]">
                  {formState.errors.email.message}
                </p>
              ) : null}
            </div>

            {serverError ? (
              <FeedbackMessage tone="error">{serverError}</FeedbackMessage>
            ) : null}

            <button
              type="submit"
              className={primaryButtonClassName}
              disabled={!isEmailStepValid || forgotPasswordState.isLoading}
            >
              {forgotPasswordState.isLoading ? "Sending Code..." : "Send Code"}
            </button>
          </form>
        </>
      ) : null}

      {currentStep === "otp" ? (
        <>
          <ScreenHeader
            title="OTP Verification"
            description="Enter the OTP sent to your email to verify your identity. Once verified, you can proceed to reset your password."
          />

          <form
            className="mt-7 space-y-6"
            onSubmit={(event) => {
              event.preventDefault();
              handleVerifyCode();
            }}
          >
            <div className="grid grid-cols-5 gap-2">
              {codeInputs.map((index) => (
                <input
                  key={index}
                  type="text"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  maxLength={1}
                  aria-label={`OTP digit ${index + 1}`}
                  className="h-11 min-w-0 rounded-[10px] border border-[#D9E0EF] bg-white text-center text-base font-semibold text-[#101828] outline-none transition hover:border-[#C5CEE4] focus:border-[#2E3A83] focus:ring-4 focus:ring-[#2E3A83]/8"
                  onPaste={(event) => handleCodePaste(event, index)}
                  onKeyDown={(event) => handleCodeKeyDown(index, event.key)}
                  {...(() => {
                    const registration = register(`code.${index}`, {
                      required: true,
                    });

                    return {
                      ...registration,
                      onChange: (event: ChangeEvent<HTMLInputElement>) => {
                        registration.onChange(event);
                        handleCodeChange(index, event.target.value);
                      },
                      ref: (element: HTMLInputElement | null) => {
                        registration.ref(element);
                        codeInputRefs.current[index] = element;
                      },
                    };
                  })()}
                />
              ))}
            </div>

            <div className="space-y-3 text-center">
              {serverError ? (
                <FeedbackMessage tone="error">{serverError}</FeedbackMessage>
              ) : null}
              <p className="text-xs text-[#8B95AB]">
                Haven&apos;t received the code?{" "}
                <button
                  type="button"
                  onClick={handleResendCode}
                  disabled={resendVerificationEmailState.isLoading}
                  className="font-medium text-[#2E3A83] transition hover:text-[#24306C] disabled:cursor-not-allowed disabled:text-[#A0A8BC]"
                >
                  {resendVerificationEmailState.isLoading ? "Resending" : "Resend"}
                </button>
              </p>
            </div>

            <button
              type="submit"
              className={primaryButtonClassName}
              disabled={!isOtpStepValid}
            >
              Verify
            </button>
          </form>
        </>
      ) : null}

      {currentStep === "password" ? (
        <>
          <ScreenHeader
            title="Create New Password"
            description="Choose a strong new password   for your account. Make sure it's unique and different from your previous passwords to keep your account secure. "
          />

          <form
            className="mt-7 space-y-4"
            onSubmit={handleSubmit(handlePasswordReset)}
          >
            <div className="space-y-2">
              <label
                htmlFor="forgot-password"
                className="block text-sm font-medium text-[#131A2A]"
              >
                Password
              </label>
              <div className="relative">
                <button
                  type="button"
                  className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-1 text-[#8B95AB] transition hover:bg-[#F1F4FC] hover:text-[#2E3A83]"
                  onClick={() => setShowPassword((previousValue) => !previousValue)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <GoEyeClosed size={18} /> : <GoEye size={18} />}
                </button>
                <input
                  id="forgot-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="**********"
                  autoComplete="new-password"
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
              {formState.errors.password ? (
                <p className="text-xs text-[#D14343]">
                  {formState.errors.password.message}
                </p>
              ) : null}
            </div>

            <div className="space-y-2">
              <label
                htmlFor="forgot-confirm-password"
                className="block text-sm font-medium text-[#131A2A]"
              >
                Confirm New Password
              </label>
              <div className="relative">
                <button
                  type="button"
                  className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-1 text-[#8B95AB] transition hover:bg-[#F1F4FC] hover:text-[#2E3A83]"
                  onClick={() =>
                    setShowConfirmPassword((previousValue) => !previousValue)
                  }
                  aria-label={
                    showConfirmPassword
                      ? "Hide confirm password"
                      : "Show confirm password"
                  }
                >
                  {showConfirmPassword ? (
                    <GoEyeClosed size={18} />
                  ) : (
                    <GoEye size={18} />
                  )}
                </button>
                <input
                  id="forgot-confirm-password"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="**********"
                  autoComplete="new-password"
                  className={`${inputClassName} pr-12`}
                  {...register("confirmPassword", {
                    required: "Please confirm your password.",
                    validate: (value) =>
                      value === passwordValue || "Passwords do not match.",
                  })}
                />
              </div>
              {formState.errors.confirmPassword ? (
                <p className="text-xs text-[#D14343]">
                  {formState.errors.confirmPassword.message}
                </p>
              ) : null}
            </div>

            {serverError ? (
              <FeedbackMessage tone="error">{serverError}</FeedbackMessage>
            ) : null}

            <button
              type="submit"
              className={primaryButtonClassName}
              disabled={!isPasswordStepValid || resetPasswordState.isLoading}
            >
              {resetPasswordState.isLoading ? "Submitting..." : "submit"}
            </button>
          </form>
        </>
      ) : null}

      {currentStep === "success" ? (
        <div className="text-center">
          <ScreenHeader
            title="Password Updated"
            description={
              statusMessage ||
              "Your password has been reset successfully. You can now sign in with your new password."
            }
          />
          <Link href={authRoutes.login} className={`${primaryButtonClassName} mt-8`}>
            Back to Login
          </Link>
        </div>
      ) : null}
    </AuthRecoveryLayout>
  );
}
