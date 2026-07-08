"use client";

import { useMemo, useState } from "react";
import { CheckCircle2, CircleAlert, Dot, LockKeyhole, ShieldCheck } from "lucide-react";
import { getErrorMessage } from "@/src/lib/getErrorMessage";
import { useChangePasswordMutation } from "@/src/redux/features/auth/authapi";
import PasswordField from "../../ui/input/PasswordField";
import StatusNotice from "../../ui/StatusNotice";

type FeedbackState = {
    variant: "success" | "error";
    title: string;
    message: string;
};

type FormErrors = {
    currentPassword?: string;
    newPassword?: string;
    confirmPassword?: string;
};

type PasswordRequirement = {
    label: string;
    isMet: boolean;
};

const getPasswordRequirements = (
    currentPassword: string,
    newPassword: string,
): PasswordRequirement[] => [
        {
            label: "At least 8 characters long",
            isMet: newPassword.length >= 8,
        },
        {
            label: "Contains at least one letter",
            isMet: /[a-zA-Z]/.test(newPassword),
        },
        {
            label: "Contains at least one number",
            isMet: /\d/.test(newPassword),
        },
        {
            label: "Different from your current password",
            isMet: Boolean(newPassword) && Boolean(currentPassword) && currentPassword !== newPassword,
        },
    ];

function RequirementItem({ label, isMet }: PasswordRequirement) {
    return (
        <div
            className={[
                "flex items-center gap-3 rounded-2xl border px-4 py-3 text-[13px] transition",
                isMet
                    ? "border-[#D5E8C7] bg-[#F7FCF1] text-[#456037]"
                    : "border-[#E7EBE1] bg-white text-[#667164]",
            ].join(" ")}
        >
            <span
                className={[
                    "flex h-6 w-6 shrink-0 items-center justify-center rounded-full",
                    isMet ? "bg-[#DFF0CF] text-[#456037]" : "bg-[#F1F3EE] text-[#9AA592]",
                ].join(" ")}
            >
                {isMet ? <CheckCircle2 className="h-4 w-4" /> : <Dot className="h-5 w-5" />}
            </span>
            <span>{label}</span>
        </div>
    );
}

export default function ChangePasswordSection() {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [feedback, setFeedback] = useState<FeedbackState | null>(null);
    const [errors, setErrors] = useState<FormErrors>({});
    const [changePassword, { isLoading }] = useChangePasswordMutation();

    const passwordRequirements = useMemo(
        () => getPasswordRequirements(currentPassword, newPassword),
        [currentPassword, newPassword],
    );

    const completedRequirementCount = passwordRequirements.filter((item) => item.isMet).length;

    const validateForm = () => {
        const nextErrors: FormErrors = {};

        if (!currentPassword.trim()) {
            nextErrors.currentPassword = "Please enter your current password.";
        }

        if (!newPassword.trim()) {
            nextErrors.newPassword = "Please enter your new password.";
        } else {
            const unmetRequirement = passwordRequirements.find((item) => !item.isMet);

            if (unmetRequirement) {
                nextErrors.newPassword = "Your new password does not meet the required rules yet.";
            }
        }

        if (!confirmPassword.trim()) {
            nextErrors.confirmPassword = "Please confirm your new password.";
        } else if (confirmPassword !== newPassword) {
            nextErrors.confirmPassword = "Your confirmation password does not match the new password.";
        }

        return nextErrors;
    };

    const updateField = (
        field: keyof FormErrors,
        value: string,
        setter: (nextValue: string) => void,
    ) => {
        setter(value);

        setErrors((previous) => ({
            ...previous,
            [field]: undefined,
        }));

        setFeedback(null);
    };

    const handleSave = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const nextErrors = validateForm();

        if (Object.keys(nextErrors).length > 0) {
            setErrors(nextErrors);
            setFeedback({
                variant: "error",
                title: "Please Review Your Password Details",
                message: "We found a few issues in the form. Update the highlighted fields and try again.",
            });
            return;
        }

        try {
            const response = await changePassword({
                old_password: currentPassword,
                new_password: newPassword,
            }).unwrap();

            setFeedback({
                variant: "success",
                title: "Password Updated Successfully",
                message:
                    response.message ||
                    "Your password has been updated. Use the new password the next time you sign in.",
            });
            setErrors({});
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
        } catch (error) {
            setFeedback({
                variant: "error",
                title: "Unable To Update Password",
                message: getErrorMessage(
                    error,
                    "We could not update your password. Please review your current password and try again.",
                ),
            });
        }
    };

    return (
        <section className="w-full px-2 py-3 sm:px-4">
            <div className="overflow-hidden rounded-[28px] border border-[#E5EBDD] bg-[radial-gradient(circle_at_top_left,#F6FBF0_0%,#FFFFFF_42%,#F8FAF6_100%)] shadow-[0_24px_70px_rgba(47,61,41,0.08)]">
                <div className="grid gap-6 p-4 sm:p-6  grid-cols-1 xl:p-8">
                    {/* <aside className="rounded-[24px] bg-[linear-gradient(180deg,#394034_0%,#4F5747_100%)] p-6 text-white shadow-[0_18px_45px_rgba(57,64,52,0.22)]">
                        <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[12px] font-medium tracking-[0.14em] text-white/90 uppercase">
                            <ShieldCheck className="h-4 w-4" />
                            Security
                        </div>

                        <h2 className="mt-5 text-[30px] font-medium leading-[1.15] text-white">
                            Change Your Password With Confidence
                        </h2>

                        <p className="mt-4 text-[14px] leading-7 text-white/75">
                            Enter your current password first, then choose a stronger new password you will remember easily.
                        </p>

                        <div className="mt-6 rounded-[20px] border border-white/10 bg-white/10 p-4">
                            <div className="flex items-center gap-3">
                                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/12 text-white">
                                    <LockKeyhole className="h-5 w-5" />
                                </span>
                                <div>
                                    <p className="text-[13px] uppercase tracking-[0.14em] text-white/60">
                                        Password Checklist
                                    </p>
                                    <p className="mt-1 text-[18px] font-medium text-white">
                                        {completedRequirementCount}/{passwordRequirements.length} rules completed
                                    </p>
                                </div>
                            </div>
                            <p className="mt-4 text-[13px] leading-6 text-white/70">
                                A good password should be longer, harder to guess, and different from your old one.
                            </p>
                        </div>

                        <div className="mt-6 space-y-3">
                            <div className="rounded-[18px] border border-white/10 bg-white/10 px-4 py-3">
                                <p className="text-[14px] font-medium text-white">Step 1</p>
                                <p className="mt-1 text-[13px] leading-6 text-white/70">Enter your current password to confirm it is really you.</p>
                            </div>
                            <div className="rounded-[18px] border border-white/10 bg-white/10 px-4 py-3">
                                <p className="text-[14px] font-medium text-white">Step 2</p>
                                <p className="mt-1 text-[13px] leading-6 text-white/70">Create a new password that is strong and different from the old one.</p>
                            </div>
                            <div className="rounded-[18px] border border-white/10 bg-white/10 px-4 py-3">
                                <p className="text-[14px] font-medium text-white">Step 3</p>
                                <p className="mt-1 text-[13px] leading-6 text-white/70">Confirm the new password carefully before saving the change.</p>
                            </div>
                        </div>
                    </aside> */}

                    <div className="rounded-[24px] border border-[#E8EEE0] bg-white/90 p-5 shadow-[0_18px_50px_rgba(42,55,34,0.05)] backdrop-blur sm:p-6">
                        <div className="flex flex-col gap-3 border-b border-[#EEF3E8] pb-5 sm:flex-row sm:items-end sm:justify-between">
                            <div>
                                <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#708161]">
                                    Update Credentials
                                </p>
                                <h3 className="mt-2 text-[28px] font-medium text-[#161721]">
                                    Keep your account secure
                                </h3>
                                <p className="mt-2 max-w-[680px] text-[14px] leading-7 text-[#667164]">
                                    Your current password is required before we can save a new one. After saving, your new password will be used for future sign-ins.
                                </p>
                            </div>

                            <div className="inline-flex items-center gap-2 rounded-full border border-[#DCE7D2] bg-[#F7FBF1] px-3 py-2 text-[13px] text-[#4F6343]">
                                <ShieldCheck className="h-4 w-4" />
                                Secure update
                            </div>
                        </div>

                        {feedback ? (
                            <StatusNotice
                                variant={feedback.variant}
                                title={feedback.title}
                                message={feedback.message}
                                className="mt-5"
                            />
                        ) : null}

                        <form onSubmit={handleSave} className="mt-6 space-y-6">
                            <div className="grid gap-4 lg:grid-cols-2">
                                <div className="rounded-[20px] border border-[#E8EEE0] bg-[#FAFCF8] p-4">
                                    <PasswordField
                                        label="Current Password"
                                        description="Enter the password you use right now."
                                        value={currentPassword}
                                        onChange={(value) => updateField("currentPassword", value, setCurrentPassword)}
                                        errorText={errors.currentPassword}
                                        name="currentPassword"
                                        autoComplete="current-password"
                                        placeholder="Enter current password"
                                    />
                                </div>

                                <div className="rounded-[20px] border border-[#E8EEE0] bg-[#FAFCF8] p-4">
                                    <PasswordField
                                        label="New Password"
                                        description="Choose a fresh password for your next sign-in."
                                        value={newPassword}
                                        onChange={(value) => updateField("newPassword", value, setNewPassword)}
                                        errorText={errors.newPassword}
                                        helperText="Use a password that is easy for you to remember but hard for others to guess."
                                        name="newPassword"
                                        autoComplete="new-password"
                                        placeholder="Create a new password"
                                    />
                                </div>
                            </div>

                            <div className="rounded-[24px] border border-[#E8EEE0] bg-[#F8FBF5] p-4 sm:p-5">
                                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                                    <div>
                                        <p className="text-[15px] font-semibold text-[#161721]">Password Requirements</p>
                                        <p className="mt-1 text-[13px] text-[#667164]">
                                            Your new password should satisfy all of these checks before saving.
                                        </p>
                                    </div>
                                    <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-2 text-[12px] font-medium text-[#5A6C50] shadow-[0_8px_20px_rgba(58,74,43,0.06)]">
                                        <ShieldCheck className="h-4 w-4" />
                                        {completedRequirementCount} of {passwordRequirements.length} ready
                                    </div>
                                </div>

                                <div className="mt-4 grid gap-3 md:grid-cols-2">
                                    {passwordRequirements.map((requirement) => (
                                        <RequirementItem
                                            key={requirement.label}
                                            label={requirement.label}
                                            isMet={requirement.isMet}
                                        />
                                    ))}
                                </div>
                            </div>

                            <div className="rounded-[20px] border border-[#E8EEE0] bg-[#FAFCF8] p-4">
                                <PasswordField
                                    label="Confirm New Password"
                                    description="Re-enter the new password exactly as you typed it above."
                                    value={confirmPassword}
                                    onChange={(value) => updateField("confirmPassword", value, setConfirmPassword)}
                                    errorText={errors.confirmPassword}
                                    helperText="This helps confirm there are no typing mistakes before the password is changed."
                                    name="confirmPassword"
                                    autoComplete="new-password"
                                    placeholder="Re-enter new password"
                                />
                            </div>

                            <div className="flex flex-col gap-4 rounded-[22px] border border-[#E8EEE0] bg-[linear-gradient(180deg,#FFFFFF_0%,#F9FBF6_100%)] p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
                                <div className="flex items-start gap-3">
                                    <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#EEF5E7] text-[#506047]">
                                        <CircleAlert className="h-5 w-5" />
                                    </span>
                                    <div>
                                        <p className="text-[14px] font-medium text-[#161721]">Before you save</p>
                                        <p className="mt-1 text-[13px] leading-6 text-[#667164]">
                                            Double-check your current password and make sure the new password is confirmed correctly.
                                        </p>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="
            h-12 w-full rounded-[14px] bg-[linear-gradient(180deg,#394034_0%,#4F5747_100%)]
            px-6 text-[14px] font-medium text-white shadow-[0_14px_30px_rgba(57,64,52,0.18)]
            transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60 sm:w-[240px]
          "
                                >
                                    {isLoading ? "Updating Password..." : "Save New Password"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
