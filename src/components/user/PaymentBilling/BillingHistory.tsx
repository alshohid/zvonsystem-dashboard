"use client";

import React, { useEffect, useRef, useState } from "react";

type BillingItem = {
    id: number;
    planName: string; // Pay-As-You-Go
    dateTime: string; // 31 Jan, 2026 at 3:30 PM
    methodLabel: string; // Card Payment
    amount: string; // €35
};

const DATA: BillingItem[] = [
    {
        id: 1,
        planName: "Pay-As-You-Go",
        dateTime: "31 Jan, 2026 at 3:30 PM",
        methodLabel: "Card Payment",
        amount: "€35",
    },
    {
        id: 2,
        planName: "Pay-As-You-Go",
        dateTime: "31 Jan, 2026 at 4:30 PM",
        methodLabel: "Card Payment",
        amount: "€35",
    },
    {
        id: 3,
        planName: "Pay-As-You-Go",
        dateTime: "31 Jan, 2026 at 6:30 PM",
        methodLabel: "Card Payment",
        amount: "€35",
    },
];

function TransferIcon() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M7 7h12M7 7l3-3M7 7l3 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M17 17H5M17 17l-3-3M17 17l-3 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

function CardIcon() {
    return (
        <svg width="28" height="22" viewBox="0 0 28 22" fill="none" aria-hidden="true">
            <rect x="1.25" y="2.25" width="25.5" height="17.5" rx="3.25" stroke="currentColor" strokeWidth="1.5" />
            <path d="M1.5 7.5H26.5" stroke="currentColor" strokeWidth="1.5" />
            <path d="M6 15h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
    );
}

function DotsIcon() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
                d="M12 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm7 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM5 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
                fill="currentColor"
            />
        </svg>
    );
}

export default function BillingHistory() {
    const [openId, setOpenId] = useState<number | null>(null);
    const menuRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const onDown = (e: MouseEvent) => {
            if (!menuRef.current) return;
            if (!menuRef.current.contains(e.target as Node)) setOpenId(null);
        };
        document.addEventListener("mousedown", onDown);
        return () => document.removeEventListener("mousedown", onDown);
    }, []);

    return (
        <section className="w-full">
            {/* Title */}
            <div className="pb-4 border-b border-black/10">
                <h2 className="text-[28px] sm:text-[36px] font-medium text-[#111827]">
                    Your Billing History
                </h2>
            </div>

            {/* Group title */}
            <div className="pt-6">
                <p className="text-[16px] text-[#6B7280]">Today’s Payment</p>
            </div>

            {/* LIST */}
            <div className="mt-2">
                {DATA.map((item) => (
                    <div
                        key={item.id}
                        className="
              relative
              w-full
              border-b border-black/5
              py-4
            "
                    >
                        {/* Desktop row */}
                        <div className="hidden md:grid items-center gap-4"
                            style={{ gridTemplateColumns: "44px 1.4fr 1.2fr 110px 44px" }}>
                            {/* left icon */}
                            <div className="text-[#111827]">
                                <TransferIcon />
                            </div>

                            {/* plan + datetime */}
                            <div className="min-w-0">
                                <p className="text-[20px] font-semibold text-[#111827] truncate">
                                    {item.planName}
                                </p>
                                <p className="text-[14px] text-[#6B7280]">{item.dateTime}</p>
                            </div>

                            {/* method */}
                            <div className="flex items-center gap-3 text-[#111827]">
                                <div className="text-[#111827]">
                                    <CardIcon />
                                </div>
                                <p className="text-[16px] text-[#6B7280]">{item.methodLabel}</p>
                            </div>

                            {/* amount */}
                            <div className="text-right">
                                <p className="text-[20px] font-semibold text-[#111827]">{item.amount}</p>
                            </div>

                            {/* action */}
                            <div className="relative flex justify-end">
                                <button
                                    type="button"
                                    onClick={() => setOpenId((v) => (v === item.id ? null : item.id))}
                                    className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-[#111827] hover:bg-gray-100 transition"
                                    aria-label="Actions"
                                >
                                    <DotsIcon />
                                </button>

                                {openId === item.id && (
                                    <div
                                        ref={menuRef}
                                        className="
                      absolute right-0 top-12 z-[50]
                      w-[180px]
                      rounded-lg border border-[#E9E9EA] bg-white
                      shadow-[0_11px_30px_rgba(0,0,0,0.16)]
                      overflow-hidden
                    "
                                    >
                                        <button className="w-full text-left px-4 py-2 text-[13px] text-gray-700 hover:bg-gray-50">
                                            View Invoice
                                        </button>
                                        <button className="w-full text-left px-4 py-2 text-[13px] text-gray-700 hover:bg-gray-50">
                                            Download PDF
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Mobile card */}
                        <div className="md:hidden flex items-start gap-3">
                            <div className="mt-1 text-[#111827] shrink-0">
                                <TransferIcon />
                            </div>

                            <div className="min-w-0 flex-1">
                                <div className="flex items-start justify-between gap-3">
                                    <div className="min-w-0">
                                        <p className="text-[18px] font-semibold text-[#111827] truncate">
                                            {item.planName}
                                        </p>
                                        <p className="text-[13px] text-[#6B7280]">{item.dateTime}</p>
                                    </div>

                                    <div className="flex items-center gap-2 shrink-0">
                                        <p className="text-[18px] font-semibold text-[#111827]">{item.amount}</p>
                                        <button
                                            type="button"
                                            onClick={() => setOpenId((v) => (v === item.id ? null : item.id))}
                                            className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-[#111827] hover:bg-gray-100 transition"
                                            aria-label="Actions"
                                        >
                                            <DotsIcon />
                                        </button>
                                    </div>
                                </div>

                                <div className="mt-3 flex items-center gap-2 text-[#111827]">
                                    <CardIcon />
                                    <p className="text-[14px] text-[#6B7280]">{item.methodLabel}</p>
                                </div>

                                {openId === item.id && (
                                    <div
                                        ref={menuRef}
                                        className="
                      mt-3
                      w-full
                      rounded-lg border border-[#E9E9EA] bg-white
                      shadow-[0_11px_30px_rgba(0,0,0,0.10)]
                      overflow-hidden
                    "
                                    >
                                        <button className="w-full text-left px-4 py-2 text-[13px] text-gray-700 hover:bg-gray-50">
                                            View Invoice
                                        </button>
                                        <button className="w-full text-left px-4 py-2 text-[13px] text-gray-700 hover:bg-gray-50">
                                            Download PDF
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}