import { ChevronDown, SquarePen } from "lucide-react";
import BillingFrequencyCard from "./BillingFrequencyCard";
import {
    billingDayOptions,
    billingFrequencyOptions,
    defaultBillingFeatureLabels,
    freeTrialOptions,
} from "./pricingPlanMockData";
import type {
    BillingDay,
    BillingFrequency,
    FreeTrialPeriod,
    PricingBillingSettings,
} from "./pricingPlanTypes";

type DefaultBillingSystemCardProps = {
    settings: PricingBillingSettings;
    onChange: (settings: PricingBillingSettings) => void;
    onSave?: (settings: PricingBillingSettings) => void;
};

export default function DefaultBillingSystemCard({
    settings,
    onChange,
    onSave,
}: DefaultBillingSystemCardProps) {
    const updateFrequency = (frequency: BillingFrequency) => {
        onChange({ ...settings, frequency });
    };

    const updateDispatchFee = (dispatchFeePercentage: string) => {
        onChange({ ...settings, dispatchFeePercentage });
    };

    const updateBillingDay = (billingDay: BillingDay) => {
        onChange({ ...settings, billingDay });
    };

    const updateFreeTrial = (freeTrial: FreeTrialPeriod) => {
        onChange({ ...settings, freeTrial });
    };

    return (
        <section className="rounded-[10px] border border-[#DCE2EA] bg-[#F8FAFC] p-5 sm:p-6 lg:p-8">
            <div className="flex items-start justify-between gap-4">
                <h1 className="text-2xl font-semibold leading-8 text-[#161721] sm:text-[28px] sm:leading-9">
                    Default Billing System
                </h1>

                <button
                    type="button"
                    aria-label="Update default billing settings"
                    onClick={() => onSave?.(settings)}
                    className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md text-[#101828] transition hover:bg-white focus:outline-none focus:ring-2 focus:ring-[#2E3A83]/20"
                >
                    <SquarePen className="h-6 w-6" strokeWidth={2.25} />
                </button>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-3 lg:gap-8">
                {billingFrequencyOptions.map((option) => (
                    <BillingFrequencyCard
                        key={option.value}
                        option={option}
                        isSelected={settings.frequency === option.value}
                        onSelect={updateFrequency}
                    />
                ))}
            </div>

            <div className="mt-8 grid grid-cols-1 gap-x-5 gap-y-5 lg:grid-cols-3 lg:gap-x-8">
                <div>
                    <label
                        htmlFor="dispatch-fee"
                        className="block text-lg font-semibold leading-7 text-[#161721]"
                    >
                        Dispatch Fee Percentage (%)
                    </label>
                    <div className="mt-2 flex h-14 overflow-hidden rounded-lg border border-[#DCE2EA] bg-white focus-within:border-[#2E3A83] focus-within:ring-2 focus-within:ring-[#2E3A83]/10">
                        <input
                            id="dispatch-fee"
                            type="text"
                            inputMode="decimal"
                            value={settings.dispatchFeePercentage}
                            onChange={(event) => updateDispatchFee(event.target.value)}
                            placeholder="e.g. 10"
                            className="min-w-0 flex-1 bg-transparent px-5 text-lg text-[#101828] outline-none placeholder:text-[#A0A7B3]"
                        />
                        <span className="flex w-14 items-center justify-center text-lg font-semibold text-[#101828]">
                            %
                        </span>
                    </div>
                    <p className="mt-3 text-base leading-6 text-[#CD2D47]">
                        * Set a default dispatch fee rate
                    </p>
                </div>

                <div>
                    <label
                        htmlFor="billing-day"
                        className="block text-lg font-semibold leading-7 text-[#161721]"
                    >
                        Billing Day
                    </label>
                    <div className="relative mt-2">
                        <select
                            id="billing-day"
                            value={settings.billingDay}
                            onChange={(event) =>
                                updateBillingDay(event.target.value as BillingDay)
                            }
                            className="h-14 w-full appearance-none rounded-lg border border-[#DCE2EA] bg-white px-4 pr-12 text-lg text-[#101828] outline-none focus:border-[#2E3A83] focus:ring-2 focus:ring-[#2E3A83]/10"
                        >
                            {billingDayOptions.map((day) => (
                                <option key={day} value={day}>
                                    {day}
                                </option>
                            ))}
                        </select>
                        <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#101828]" />
                    </div>
                </div>

                <div>
                    <label
                        htmlFor="free-trial"
                        className="block text-lg font-semibold leading-7 text-[#161721]"
                    >
                        Free Trial
                    </label>
                    <div className="relative mt-2">
                        <select
                            id="free-trial"
                            value={settings.freeTrial ?? "14 Days"}
                            onChange={(event) =>
                                updateFreeTrial(event.target.value as FreeTrialPeriod)
                            }
                            className="h-14 w-full appearance-none rounded-lg border border-[#DCE2EA] bg-white px-4 pr-12 text-lg text-[#101828] outline-none focus:border-[#2E3A83] focus:ring-2 focus:ring-[#2E3A83]/10"
                        >
                            {freeTrialOptions.map((period) => (
                                <option key={period} value={period}>
                                    {period}
                                </option>
                            ))}
                        </select>
                        <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#101828]" />
                    </div>
                </div>
            </div>

            <div className="mt-7">
                <h2 className="text-lg font-semibold leading-7 text-[#161721]">
                    Included Features:
                </h2>
                <div className="mt-2 flex flex-wrap gap-2">
                    {defaultBillingFeatureLabels.map((feature, index) => (
                        <span
                            key={`${feature}-${index}`}
                            className="inline-flex min-h-9 items-center rounded-full border border-[#D8DDE7] bg-white px-4 text-base leading-5 text-[#161721]"
                        >
                            {feature}
                        </span>
                    ))}
                </div>
            </div>
        </section>
    );
}
