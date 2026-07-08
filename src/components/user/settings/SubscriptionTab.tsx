"use client";

import React from "react";

type OverviewItem = {
    label: string;
    value: string;
};

function AlertIcon() {
    return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
                d="M12 2.5c5.246 0 9.5 4.254 9.5 9.5s-4.254 9.5-9.5 9.5-9.5-4.254-9.5-9.5 4.254-9.5 9.5-9.5Z"
                fill="#FFB3B3"
            />
            <path
                d="M12 7.2v6.2"
                stroke="#7A1C1C"
                strokeWidth="1.8"
                strokeLinecap="round"
            />
            <path
                d="M12 16.9h.01"
                stroke="#7A1C1C"
                strokeWidth="2.6"
                strokeLinecap="round"
            />
        </svg>
    );
}

function OverviewRow({ label, value }: OverviewItem) {
    return (
        <div className="py-5 border-b border-black/5">
            <p className="text-[18px] font-semibold text-[#111827]">{label}</p>
            <p className="mt-1 text-[16px] text-[#777980]">{value}</p>
        </div>
    );
}

export default function SubscriptionTab() {

    const alertText = "You cannot change the plan until 01/2/26 at 11:12 PM";

    const overview: OverviewItem[] = [
        { label: "Active Plan", value: "Monthly Professional" },
        { label: "Billing Period", value: "Your current cycle is Feb 1, 2026 – Mar 1, 2026" },
        { label: "Next Payment", value: "£135.00 will be charged on March 1st" },
        { label: "Notices Published On This Plan", value: "Posted 45 obituary notices" },
        { label: "Next Payment", value: "£135.00 will be charged on March 1st" },
    ];

    return (
        <div className="w-full p-4 md:p-6 space-y-6 max-w-[720px]">
            {/* Alert */}
            <div
                className="
          w-full
          flex items-center gap-4
          rounded-[12px]
          border border-[#FFC0C0]
          bg-[#FFF9F9]
          px-4 py-4 sm:px-6 sm:py-5
        "
            >
                <div className="shrink-0">
                    <AlertIcon />
                </div>
                <p className="text-[14px] sm:text-[16px] text-[#6B7280]">
                    {alertText}
                </p>
            </div>

            {/* Title */}
            <h2 className="mt-10 text-[28px] sm:text-[34px] font-semibold text-[#111827]">
                Your Current Plan Overview
            </h2>

            {/* Overview list */}
            <div className="mt-4">
                {overview.map((item, idx) => (
                    <OverviewRow key={`${item.label}-${idx}`} label={item.label} value={item.value} />
                ))}
            </div>

            {/* Actions */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <button
                    type="button"
                    className="
            h-12 w-full sm:w-[260px]
            rounded-[10px]
            bg-[linear-gradient(180deg,#394034_0%,#4F5747_100%)]
            text-white text-[14px] font-medium
            hover:opacity-90 transition
          "
                >
                    Change Plan
                </button>

                <button
                    type="button"
                    className="
            h-12 w-full sm:w-[260px]
            rounded-[10px]
            bg-[linear-gradient(180deg,#394034_0%,#4F5747_100%)]
            text-white text-[14px] font-medium
            hover:opacity-90 transition
          "
                >
                    Cancel Plan
                </button>
            </div>
        </div>
    );
}