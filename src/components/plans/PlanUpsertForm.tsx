"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/src/components/ui/skeleton";
import StatusNotice from "@/src/components/ui/StatusNotice";
import { getErrorMessage } from "@/src/lib/getErrorMessage";
import {
    useCreateSubscriptionPlanMutation,
    useDeleteSubscriptionPlanByIdMutation,
    useUpdateSubscriptionPlanByIdMutation,
    useViewSingleSubscriptionPlanByIdQuery,
} from "@/src/redux/features/admin/subscriptionPlan/subscriptionPlan";
import {
    AdminSubscriptionPlanType,
    IAdminSubscriptionPlanPayload,
} from "@/src/types/adminSubscriptionPlanTypes";

type Mode = "create" | "edit";
type PlanType = "payg" | "monthly";

type PlanUpsertFormProps = {
    mode?: Mode;
    planId?: string;
    initialPlanName?: string;
    initialPlanType?: PlanType;
    initialPrice?: string;
    initialBillingPeriod?: string;
    initialCredits?: string;
    initialBenefits?: string[];
    onSuccessRedirectTo?: string;
};

type FeedbackState = {
    variant: "success" | "error";
    title: string;
    message: string;
};

type FormErrors = {
    name?: string;
    price?: string;
    billingPeriod?: string;
    credits?: string;
    benefits?: string;
};

const mapApiTypeToFormType = (type?: AdminSubscriptionPlanType): PlanType =>
    type === "PAY_AS_YOU_GO" ? "payg" : "monthly";

const mapFormTypeToApiType = (type: PlanType): AdminSubscriptionPlanType =>
    type === "payg" ? "PAY_AS_YOU_GO" : "MONTHLY";

function RadioCard({
    checked,
    title,
    subtitle,
    onClick,
}: {
    checked: boolean;
    title: string;
    subtitle: string;
    onClick: () => void;
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={[
                "w-full rounded-[10px] border px-4 py-4 text-left transition",
                checked ? "border-[#C3D4B3] bg-white" : "border-[#E9E9EA] bg-white hover:bg-gray-50",
            ].join(" ")}
        >
            <div className="flex items-start gap-3">
                <span
                    className={[
                        "mt-1 inline-flex h-4 w-4 rounded-full border-2",
                        checked ? "border-black" : "border-gray-300",
                    ].join(" ")}
                >
                    {checked ? <span className="m-auto h-2 w-2 rounded-full bg-black" /> : null}
                </span>

                <div className="min-w-0">
                    <div className="text-[14px] font-medium text-[#161721]">{title}</div>
                    <div className="mt-1 text-[12px] text-gray-500">{subtitle}</div>
                </div>
            </div>
        </button>
    );
}

function XIcon() {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
        </svg>
    );
}

function PlusIcon() {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
        </svg>
    );
}

function FormLoadingState() {
    return (
        <section className="w-full rounded-[12px] border border-[#E9E9EA] bg-white p-5 sm:p-6">
            <div className="grid gap-3 sm:grid-cols-2">
                <Skeleton className="h-24 w-full rounded-[10px] bg-[#EEF3E8]" />
                <Skeleton className="h-24 w-full rounded-[10px] bg-[#EEF3E8]" />
            </div>

            <div className="mt-5 border-t border-black/5 pt-5" />

            <div className="grid gap-4 sm:grid-cols-2">
                <Skeleton className="h-20 w-full rounded-[10px] bg-[#EEF3E8]" />
                <Skeleton className="h-20 w-full rounded-[10px] bg-[#EEF3E8]" />
            </div>

            <div className="mt-4 space-y-3">
                {Array.from({ length: 3 }).map((_, index) => (
                    <Skeleton key={`benefit-skeleton-${index}`} className="h-14 w-full rounded-[10px] bg-[#EEF3E8]" />
                ))}
            </div>
        </section>
    );
}

export default function PlanUpsertForm({
    mode = "edit",
    planId = "",
    initialPlanName = "",
    initialPlanType = "monthly",
    initialPrice = "",
    initialBillingPeriod = "monthly",
    initialCredits = "",
    initialBenefits = [],
    onSuccessRedirectTo,
}: PlanUpsertFormProps) {
    const router = useRouter();
    const [feedback, setFeedback] = useState<FeedbackState | null>(null);
    const [errors, setErrors] = useState<FormErrors>({});
    const [planName, setPlanName] = useState(initialPlanName);
    const [planType, setPlanType] = useState<PlanType>(initialPlanType);
    const [price, setPrice] = useState(initialPrice);
    const [billingPeriod, setBillingPeriod] = useState(initialBillingPeriod.toLowerCase());
    const [credits, setCredits] = useState(initialCredits);
    const [benefits, setBenefits] = useState<string[]>(initialBenefits);
    const [newBenefit, setNewBenefit] = useState("");

    const isEditMode = mode === "edit";

    const {
        data: singlePlan,
        error: singlePlanError,
        isLoading: isSinglePlanLoading,
    } = useViewSingleSubscriptionPlanByIdQuery(planId, {
        skip: !isEditMode || !planId,
    });

    const [createSubscriptionPlan, { isLoading: isCreateLoading }] = useCreateSubscriptionPlanMutation();
    const [updateSubscriptionPlanById, { isLoading: isUpdateLoading }] = useUpdateSubscriptionPlanByIdMutation();
    const [deleteSubscriptionPlanById, { isLoading: isDeleteLoading }] = useDeleteSubscriptionPlanByIdMutation();

    useEffect(() => {
        if (!singlePlan) {
            return;
        }

        setPlanName(singlePlan.name || "");
        setPlanType(mapApiTypeToFormType(singlePlan.type));
        setPrice(singlePlan.price || "");
        setBillingPeriod((singlePlan.billing_period || "monthly").toLowerCase());
        setCredits(singlePlan.credits ? String(singlePlan.credits) : "");
        setBenefits(singlePlan.benefits ?? []);
        setNewBenefit("");
        setErrors({});
    }, [singlePlan]);

    const isSubmitting = isCreateLoading || isUpdateLoading;

    const updateError = (field: keyof FormErrors) => {
        setErrors((previous) => ({
            ...previous,
            [field]: undefined,
        }));
        setFeedback(null);
    };

    const addBenefit = () => {
        const value = newBenefit.trim();

        if (!value) {
            return;
        }

        if (benefits.includes(value)) {
            return;
        }

        setBenefits((previous) => [...previous, value]);
        setNewBenefit("");
        updateError("benefits");
    };

    const removeBenefit = (value: string) => {
        setBenefits((previous) => previous.filter((benefit) => benefit !== value));
        setFeedback(null);
    };

    const validateForm = () => {
        const nextErrors: FormErrors = {};
        const numericPrice = Number(price);
        const numericCredits = Number(credits);

        if (!planName.trim()) {
            nextErrors.name = "Plan name is required.";
        }

        if (!price.trim()) {
            nextErrors.price = "Price is required.";
        } else if (Number.isNaN(numericPrice) || numericPrice <= 0) {
            nextErrors.price = "Enter a valid price greater than 0.";
        }

        if (planType === "monthly" && !billingPeriod.trim()) {
            nextErrors.billingPeriod = "Billing period is required for monthly plans.";
        }

        if (!credits.trim()) {
            nextErrors.credits = "Credits are required.";
        } else if (Number.isNaN(numericCredits) || numericCredits <= 0 || !Number.isInteger(numericCredits)) {
            nextErrors.credits = "Credits must be a whole number greater than 0.";
        }

        if (benefits.length === 0) {
            nextErrors.benefits = "Add at least one benefit.";
        }

        return nextErrors;
    };

    const buildPayload = (): IAdminSubscriptionPlanPayload => {
        const payload: IAdminSubscriptionPlanPayload = {
            name: planName.trim(),
            type: mapFormTypeToApiType(planType),
            price: Number(price),
            credits: Number(credits),
            benefits,
        };

        if (planType === "monthly") {
            payload.billing_period = billingPeriod.toLowerCase();
        }

        return payload;
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const nextErrors = validateForm();

        if (Object.keys(nextErrors).length > 0) {
            setErrors(nextErrors);
            setFeedback({
                variant: "error",
                title: "Please Review The Plan Details",
                message: "Some fields still need attention before the plan can be saved.",
            });
            return;
        }

        try {
            const payload = buildPayload();
            const response =
                isEditMode && planId
                    ? await updateSubscriptionPlanById({ id: planId, data: payload }).unwrap()
                    : await createSubscriptionPlan(payload).unwrap();

            setFeedback({
                variant: "success",
                title: isEditMode ? "Plan Updated" : "Plan Created",
                message:
                    response.message ||
                    (isEditMode
                        ? "The subscription plan has been updated successfully."
                        : "The subscription plan has been created successfully."),
            });

            if (onSuccessRedirectTo) {
                router.push(onSuccessRedirectTo);
            }
        } catch (submitError) {
            setFeedback({
                variant: "error",
                title: isEditMode ? "Update Failed" : "Create Failed",
                message: getErrorMessage(
                    submitError,
                    isEditMode
                        ? "Failed to update the subscription plan."
                        : "Failed to create the subscription plan.",
                ),
            });
        }
    };

    const handleDelete = async () => {
        if (!planId) {
            return;
        }

        const shouldDelete = window.confirm("Delete this subscription plan? This action cannot be undone.");

        if (!shouldDelete) {
            return;
        }

        try {
            const response = await deleteSubscriptionPlanById(planId).unwrap();

            setFeedback({
                variant: "success",
                title: "Plan Deleted",
                message: response.message || "The subscription plan has been deleted successfully.",
            });

            if (onSuccessRedirectTo) {
                router.push(onSuccessRedirectTo);
            }
        } catch (deleteError) {
            setFeedback({
                variant: "error",
                title: "Delete Failed",
                message: getErrorMessage(deleteError, "Failed to delete the subscription plan."),
            });
        }
    };

    if (isEditMode && !planId) {
        return (
            <StatusNotice
                variant="error"
                title="Invalid Plan"
                message="A valid plan id is required to edit a subscription plan."
            />
        );
    }

    if (isSinglePlanLoading) {
        return <FormLoadingState />;
    }

    if (singlePlanError) {
        return (
            <StatusNotice
                variant="error"
                title="Unable To Load Plan"
                message={getErrorMessage(singlePlanError, "Failed to load the subscription plan details.")}
            />
        );
    }

    return (
        <section className="w-full rounded-[12px] border border-[#E9E9EA] bg-white p-5 sm:p-6">
            {feedback ? (
                <StatusNotice
                    variant={feedback.variant}
                    title={feedback.title}
                    message={feedback.message}
                    className="mb-5"
                />
            ) : null}

            <form onSubmit={handleSubmit} className="w-full">
                <div className="grid gap-3 sm:grid-cols-2">
                    <RadioCard
                        checked={planType === "payg"}
                        title="Pay-As-You-Go"
                        subtitle="Charge a one-time fee with plan credits"
                        onClick={() => {
                            setPlanType("payg");
                            setBillingPeriod("");
                            updateError("billingPeriod");
                        }}
                    />
                    <RadioCard
                        checked={planType === "monthly"}
                        title="Monthly Professional"
                        subtitle="Charge a recurring monthly or yearly fee"
                        onClick={() => {
                            setPlanType("monthly");
                            setBillingPeriod((previous) => previous || "monthly");
                            setCredits("");
                            updateError("credits");
                        }}
                    />
                </div>

                <div className="mt-5 border-t border-black/5 pt-5" />

                <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                        <label className="text-[13px] font-medium text-[#161721]">Plan Name</label>
                        <div className="mt-2">
                            <input
                                value={planName}
                                onChange={(event) => {
                                    setPlanName(event.target.value);
                                    updateError("name");
                                }}
                                className="
                  h-12 w-full rounded-[10px] border border-[#CFCFD6] bg-white px-4
                  text-[13px] text-[#161721] outline-none
                  focus:border-[#8FA17E] focus:ring-2 focus:ring-[#8FA17E]/15
                "
                                placeholder="Basic Plan"
                            />
                            {errors.name ? (
                                <p className="mt-2 text-[12px] text-red-600">{errors.name}</p>
                            ) : null}
                        </div>
                    </div>

                    <div>
                        <label className="text-[13px] font-medium text-[#161721]">Price</label>
                        <div className="mt-2">
                            <input
                                value={price}
                                onChange={(event) => {
                                    setPrice(event.target.value);
                                    updateError("price");
                                }}
                                className="
                  h-12 w-full rounded-[10px] border border-[#CFCFD6] bg-white px-4
                  text-[13px] text-[#161721] outline-none
                  focus:border-[#8FA17E] focus:ring-2 focus:ring-[#8FA17E]/15
                "
                                placeholder="29.99"
                            />
                            {errors.price ? (
                                <p className="mt-2 text-[12px] text-red-600">{errors.price}</p>
                            ) : null}
                        </div>
                    </div>
                </div>

                <div className={`mt-4 grid gap-4 ${planType === "payg" ? "sm:grid-cols-1" : "sm:grid-cols-2"}`}>
                    {planType === "monthly" ? (
                        <div>
                            <label className="text-[13px] font-medium text-[#161721]">Billing Period</label>
                            <div className="mt-2 relative">
                                <select
                                    value={billingPeriod}
                                    onChange={(event) => {
                                        setBillingPeriod(event.target.value);
                                        updateError("billingPeriod");
                                    }}
                                    className="
                    h-12 w-full appearance-none rounded-[10px] border border-[#CFCFD6] bg-white px-4 pr-10
                    text-[13px] text-[#161721] outline-none
                    focus:border-[#8FA17E] focus:ring-2 focus:ring-[#8FA17E]/15
                  "
                                >
                                    <option value="">Select</option>
                                    <option value="monthly">Monthly</option>
                                    <option value="yearly">Yearly</option>
                                </select>

                                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                                        <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                    </svg>
                                </span>

                                {errors.billingPeriod ? (
                                    <p className="mt-2 text-[12px] text-red-600">{errors.billingPeriod}</p>
                                ) : null}
                            </div>
                        </div>
                    ) : null}

                    <div>
                        <label className="text-[13px] font-medium text-[#161721]">Credits</label>
                        <div className="mt-2">
                            <input
                                value={credits}
                                onChange={(event) => {
                                    setCredits(event.target.value);
                                    updateError("credits");
                                }}
                                className="
                    h-12 w-full rounded-[10px] border border-[#CFCFD6] bg-white px-4
                    text-[13px] text-[#161721] outline-none
                    focus:border-[#8FA17E] focus:ring-2 focus:ring-[#8FA17E]/15
                  "
                                placeholder="100"
                            />
                            {errors.credits ? (
                                <p className="mt-2 text-[12px] text-red-600">{errors.credits}</p>
                            ) : null}
                        </div>
                    </div>
                </div>

                <div className="mt-4">
                    <label className="text-[13px] font-medium text-[#161721]">Benefits</label>

                    <div className="mt-3 space-y-3">
                        {benefits.map((benefit) => (
                            <div
                                key={benefit}
                                className="flex items-center justify-between gap-3 rounded-[10px] border border-[#E9E9EA] bg-white px-4 py-3"
                            >
                                <span className="text-[13px] text-[#161721]">{benefit}</span>
                                <button
                                    type="button"
                                    onClick={() => removeBenefit(benefit)}
                                    className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 text-gray-700 transition hover:bg-gray-200"
                                    aria-label="Remove benefit"
                                >
                                    <XIcon />
                                </button>
                            </div>
                        ))}

                        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                            <input
                                value={newBenefit}
                                onChange={(event) => {
                                    setNewBenefit(event.target.value);
                                    updateError("benefits");
                                }}
                                className="
                  h-12 w-full rounded-[10px] border border-[#E9E9EA] bg-white px-4
                  text-[13px] text-[#161721] outline-none
                  focus:border-[#8FA17E] focus:ring-2 focus:ring-[#8FA17E]/15
                "
                                placeholder="Add a benefit..."
                            />
                            <button
                                type="button"
                                onClick={addBenefit}
                                className="
                  inline-flex h-12 w-full items-center justify-center gap-2 rounded-[10px]
                  border border-[#E9E9EA]
                  bg-white text-[13px] font-medium text-[#161721]
                  transition hover:bg-gray-50 sm:w-[190px]
                "
                            >
                                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#D7E8C8] text-[#3F4A3B]">
                                    <PlusIcon />
                                </span>
                                Add benefits
                            </button>
                        </div>

                        {errors.benefits ? (
                            <p className="mt-2 text-[12px] text-red-600">{errors.benefits}</p>
                        ) : null}
                    </div>
                </div>

                <div className={`mt-6 grid gap-3 ${isEditMode ? "sm:grid-cols-3" : "sm:grid-cols-2"}`}>
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="
              h-12 w-full rounded-[10px]
              border border-[#8FA17E]
              bg-[#F4FFE9]
              text-[14px] font-medium text-[#161721]
              transition hover:bg-[#ECF7DF]
            "
                    >
                        Dismiss
                    </button>

                    {isEditMode ? (
                        <button
                            type="button"
                            onClick={handleDelete}
                            disabled={isDeleteLoading}
                            className="
                h-12 w-full rounded-[10px]
                border border-[#F2D1D1]
                bg-[#FFF7F7]
                text-[14px] font-medium text-[#B42318]
                transition hover:bg-[#FFF0F0]
                disabled:cursor-not-allowed disabled:opacity-60
              "
                        >
                            {isDeleteLoading ? "Deleting..." : "Delete Plan"}
                        </button>
                    ) : null}

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="
              h-12 w-full rounded-[10px]
              bg-[linear-gradient(180deg,#394034_0%,#4F5747_100%)]
              text-[14px] font-medium text-white
              transition hover:opacity-90
              disabled:cursor-not-allowed disabled:opacity-60
            "
                    >
                        {isSubmitting
                            ? "Saving..."
                            : isEditMode
                                ? "Save Changes"
                                : "Create Plan"}
                    </button>
                </div>
            </form>
        </section>
    );
}
