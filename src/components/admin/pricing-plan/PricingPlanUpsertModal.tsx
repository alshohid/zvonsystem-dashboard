"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { ChevronDown, Plus, X } from "lucide-react";
import { Modal } from "@/src/components/ui/modal";
import PricingPlanModalField from "./PricingPlanModalField";
import {
    billingDayOptions,
    billingFrequencyOptions,
    freeTrialOptions,
    pricingPlanFeatureOptions,
} from "./pricingPlanMockData";
import type {
    BillingDay,
    BillingFrequency,
    FreeTrialPeriod,
    PricingPlanFeatureOption,
    PricingPlanFormValues,
    PricingPlanRecord,
} from "./pricingPlanTypes";
import { createPricingPlanFormValues } from "./pricingPlanUtils";

type PricingPlanUpsertModalMode = "create" | "edit";

type PricingPlanUpsertModalProps = {
    isOpen: boolean;
    mode: PricingPlanUpsertModalMode;
    plan?: PricingPlanRecord | null;
    featureOptions?: PricingPlanFeatureOption[];
    onClose: () => void;
    onSubmit: (values: PricingPlanFormValues, mode: PricingPlanUpsertModalMode) => void;
};

export default function PricingPlanUpsertModal({
    isOpen,
    mode,
    plan,
    featureOptions = pricingPlanFeatureOptions,
    onClose,
    onSubmit,
}: PricingPlanUpsertModalProps) {
    const [formValues, setFormValues] = useState<PricingPlanFormValues>(
        createPricingPlanFormValues(plan),
    );

    const updateFormValue = <Key extends keyof PricingPlanFormValues>(
        key: Key,
        value: PricingPlanFormValues[Key],
    ) => {
        setFormValues((currentValues) => ({
            ...currentValues,
            [key]: value,
        }));
    };

    const toggleFeature = (featureId: string) => {
        setFormValues((currentValues) => {
            const hasFeature = currentValues.featureIds.includes(featureId);

            return {
                ...currentValues,
                featureIds: hasFeature
                    ? currentValues.featureIds.filter(
                          (currentFeatureId) => currentFeatureId !== featureId,
                      )
                    : [...currentValues.featureIds, featureId],
            };
        });
    };

    const toggleFreeTrial = () => {
        updateFormValue("freeTrialEnabled", !formValues.freeTrialEnabled);
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSubmit(formValues, mode);
    };

    const title = mode === "edit" ? "Edit Pricing Plan" : "Create Pricing Plan";
    const submitLabel = mode === "edit" ? "Save Changes" : "Create Plan";

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            className="mx-3 my-5 max-h-[calc(100vh-2rem)] w-full max-w-[920px] overflow-y-auto rounded-lg border border-[#E4E7EC] bg-white p-4 shadow-[0_24px_80px_rgba(16,24,40,0.24)] sm:mx-4 sm:p-6"
            contentBgClassName="bg-white"
            textClassName="text-[#161721]"
            overlayClassName="bg-[rgba(16,24,40,0.28)] backdrop-blur-[4px]"
            showCloseButton={false}
        >
            <form onSubmit={handleSubmit}>
                <div className="flex items-start justify-between gap-4">
                    <h2 className="text-xl font-semibold leading-7 text-[#161721] sm:text-2xl">
                        {title}
                    </h2>

                    <button
                        type="button"
                        onClick={onClose}
                        className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#E4E7EC] bg-white text-[#161721] transition hover:bg-[#F8FAFC]"
                        aria-label="Close pricing plan modal"
                    >
                        <X className="h-4 w-4" />
                    </button>
                </div>

                <div className="mt-5 space-y-5">
                    <PricingPlanModalField label="Plan Name" htmlFor="plan-name">
                        <input
                            id="plan-name"
                            type="text"
                            value={formValues.name}
                            onChange={(event) => updateFormValue("name", event.target.value)}
                            placeholder="Basic"
                            className="h-10 w-full rounded-md border border-[#D8DDE8] bg-white px-3 text-sm text-[#161721] outline-none placeholder:text-[#8A92A6] focus:border-[#2E3A83] focus:ring-2 focus:ring-[#2E3A83]/10"
                        />
                    </PricingPlanModalField>

                    <PricingPlanModalField label="Description" htmlFor="plan-description">
                        <textarea
                            id="plan-description"
                            value={formValues.description}
                            onChange={(event) =>
                                updateFormValue("description", event.target.value)
                            }
                            placeholder="Brief description of this plan."
                            rows={4}
                            className="min-h-[96px] w-full resize-none rounded-md border border-[#D8DDE8] bg-[#F8FAFC] px-3 py-3 text-sm leading-5 text-[#161721] outline-none placeholder:text-[#8A92A6] focus:border-[#2E3A83] focus:bg-white focus:ring-2 focus:ring-[#2E3A83]/10"
                        />
                    </PricingPlanModalField>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                        <PricingPlanModalField
                            label="Dispatch Fee Percentage (%)"
                            htmlFor="plan-dispatch-fee"
                        >
                            <div className="flex h-10 overflow-hidden rounded-md border border-[#D8DDE8] bg-white focus-within:border-[#2E3A83] focus-within:ring-2 focus-within:ring-[#2E3A83]/10">
                                <input
                                    id="plan-dispatch-fee"
                                    type="text"
                                    inputMode="decimal"
                                    value={formValues.dispatchFeePercentage}
                                    onChange={(event) =>
                                        updateFormValue(
                                            "dispatchFeePercentage",
                                            event.target.value,
                                        )
                                    }
                                    placeholder="e.g. 10"
                                    className="min-w-0 flex-1 bg-transparent px-3 text-sm text-[#161721] outline-none placeholder:text-[#8A92A6]"
                                />
                                <span className="flex w-9 items-center justify-center text-sm font-semibold text-[#161721]">
                                    %
                                </span>
                            </div>
                            <p className="mt-2 text-sm leading-5 text-[#CD2D47]">
                                * Set a custom dispatch fee for this plan, or leave blank to use organization default rate
                            </p>
                        </PricingPlanModalField>

                        <PricingPlanModalField label="Billing Day" htmlFor="plan-billing-day">
                            <div className="relative">
                                <select
                                    id="plan-billing-day"
                                    value={formValues.billingDay}
                                    onChange={(event) =>
                                        updateFormValue(
                                            "billingDay",
                                            event.target.value as BillingDay,
                                        )
                                    }
                                    className="h-10 w-full appearance-none rounded-md border border-[#D8DDE8] bg-white px-3 pr-10 text-sm text-[#161721] outline-none focus:border-[#2E3A83] focus:ring-2 focus:ring-[#2E3A83]/10"
                                >
                                    {billingDayOptions.map((day) => (
                                        <option key={day} value={day}>
                                            {day}
                                        </option>
                                    ))}
                                </select>
                                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#161721]" />
                            </div>
                        </PricingPlanModalField>

                        <PricingPlanModalField label="Billing Cycle" htmlFor="plan-billing-cycle">
                            <div className="relative">
                                <select
                                    id="plan-billing-cycle"
                                    value={formValues.billingCycle}
                                    onChange={(event) =>
                                        updateFormValue(
                                            "billingCycle",
                                            event.target.value as BillingFrequency,
                                        )
                                    }
                                    className="h-10 w-full appearance-none rounded-md border border-[#D8DDE8] bg-white px-3 pr-10 text-sm text-[#161721] outline-none focus:border-[#2E3A83] focus:ring-2 focus:ring-[#2E3A83]/10"
                                >
                                    {billingFrequencyOptions.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#161721]" />
                            </div>
                        </PricingPlanModalField>
                    </div>

                    <section className="rounded-lg border border-[#DCE2EA] bg-[#F8FAFC] p-4">
                        <div className="flex items-start justify-between gap-4">
                            <div className="min-w-0">
                                <h3 className="text-base font-semibold leading-6 text-[#161721]">
                                    Start this plan with Free Trial?
                                </h3>
                                <p className="mt-1 text-sm leading-5 text-[#A0A4AD] sm:text-base">
                                    Allow users to start this plan with a free trial giving temporary access before billing begins.
                                </p>
                            </div>

                            <button
                                type="button"
                                role="switch"
                                aria-checked={formValues.freeTrialEnabled}
                                onClick={toggleFreeTrial}
                                className={[
                                    "relative mt-1 inline-flex h-9 w-16 shrink-0 items-center rounded-full border transition focus:outline-none focus:ring-2 focus:ring-[#2E3A83]/20",
                                    formValues.freeTrialEnabled
                                        ? "border-[#0B3042] bg-[#0B3042]"
                                        : "border-[#E4E7EC] bg-white",
                                ].join(" ")}
                            >
                                <span
                                    className={[
                                        "inline-block h-7 w-7 rounded-full transition",
                                        formValues.freeTrialEnabled
                                            ? "translate-x-[30px] bg-white"
                                            : "translate-x-1 bg-[#B8C0C8]",
                                    ].join(" ")}
                                />
                            </button>
                        </div>

                        {formValues.freeTrialEnabled ? (
                            <div className="mt-5 grid grid-cols-1 items-center gap-3 md:grid-cols-[220px_1fr]">
                                <label
                                    htmlFor="plan-trial-duration"
                                    className="text-base font-semibold leading-6 text-[#161721]"
                                >
                                    Trial Duration
                                </label>
                                <div className="relative">
                                    <select
                                        id="plan-trial-duration"
                                        value={formValues.trialDuration}
                                        onChange={(event) =>
                                            updateFormValue(
                                                "trialDuration",
                                                event.target.value as FreeTrialPeriod,
                                            )
                                        }
                                        className="h-11 w-full appearance-none rounded-lg border border-[#D8DDE8] bg-white px-4 pr-10 text-base text-[#161721] outline-none focus:border-[#2E3A83] focus:ring-2 focus:ring-[#2E3A83]/10"
                                    >
                                        {freeTrialOptions.map((period) => (
                                            <option key={period} value={period}>
                                                {period.toLowerCase()}
                                            </option>
                                        ))}
                                    </select>
                                    <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#161721]" />
                                </div>
                            </div>
                        ) : null}
                    </section>

                    <div>
                        <h3 className="text-base font-semibold leading-6 text-[#161721]">
                            Included Features
                        </h3>
                        <p className="mt-1 text-sm leading-5 text-[#8A92A6]">
                            Select which features are included in this plan
                        </p>

                        <div className="mt-4 max-h-[360px] space-y-2 overflow-y-auto overscroll-contain pr-2">
                            {featureOptions.map((feature) => {
                                const isChecked = formValues.featureIds.includes(feature.id);

                                return (
                                    <label
                                        key={feature.id}
                                        htmlFor={`plan-feature-${feature.id}`}
                                        className="flex cursor-pointer items-start gap-3 rounded-md border border-[#E4E7EC] bg-[#F8FAFC] px-4 py-3 transition hover:bg-[#F2F4F7]"
                                    >
                                        <input
                                            id={`plan-feature-${feature.id}`}
                                            type="checkbox"
                                            checked={isChecked}
                                            onChange={() => toggleFeature(feature.id)}
                                            className="mt-1 h-4 w-4 rounded border-[#C8CED8] accent-[#2E3A83]"
                                        />
                                        <span className="min-w-0">
                                            <span className="block text-sm font-semibold leading-5 text-[#161721]">
                                                {feature.label}
                                            </span>
                                            <span className="mt-1 block text-sm leading-5 text-[#8A92A6]">
                                                {feature.description}
                                            </span>
                                        </span>
                                    </label>
                                );
                            })}
                        </div>
                    </div>
                </div>

                <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <button
                        type="button"
                        onClick={onClose}
                        className="inline-flex h-11 items-center justify-center rounded-lg border border-[#D8DDE8] bg-white px-5 text-sm font-semibold text-[#161721] transition hover:bg-[#F8FAFC] focus:outline-none focus:ring-2 focus:ring-[#2E3A83]/10"
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#2E3A83] px-5 text-sm font-semibold text-white transition hover:bg-[#25306F] focus:outline-none focus:ring-2 focus:ring-[#2E3A83]/25"
                    >
                        {mode === "create" ? <Plus className="h-4 w-4" /> : null}
                        {submitLabel}
                    </button>
                </div>
            </form>
        </Modal>
    );
}
