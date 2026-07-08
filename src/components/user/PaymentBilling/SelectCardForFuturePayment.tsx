"use client";

import React, { useMemo, useState } from "react";

type SavedCard = {
    id: string;
    brand: "VISA" | "MASTERCARD";
    typeLabel?: string; // Debit
    balanceLabel: string; // "$X.XXX,XX"
    last4: string; // "4214"
    exp: string; // "12/24"
};

function WarningIcon() {
    return (
        <span className="grid h-10 w-10 place-items-center rounded-full bg-[#FFC0C0] text-[#B42318]">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                    d="M12 8v5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                />
                <path
                    d="M12 16.8h.01"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                />
                <path
                    d="M10.3 3.2h3.4c.6 0 1.2.3 1.6.9l7 11.9c.8 1.3-.2 3-1.7 3H3.4c-1.5 0-2.5-1.7-1.7-3l7-11.9c.4-.6 1-.9 1.6-.9Z"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinejoin="round"
                />
            </svg>
        </span>
    );
}

function CheckIcon() {
    return (
        <span className="grid h-6 w-6 place-items-center rounded-full bg-[#708161] text-white">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                    d="M20 6L9 17l-5-5"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        </span>
    );
}

function PlusIcon() {
    return (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
        </svg>
    );
}

function VisaWord() {
    return (
        <div className="text-right leading-none">
            <div className="text-[22px] font-bold tracking-wide text-[#111827]">VISA</div>
            <div className="text-[12px] text-[#111827]/70">Debit</div>
        </div>
    );
}

function MaskedDigits({ last4 }: { last4: string }) {
    return (
        <div className="flex items-center gap-2 text-[#111827]">
            <span className="tracking-widest text-[14px]">****</span>
            <span className="tracking-widest text-[14px]">****</span>
            <span className="tracking-widest text-[14px]">****</span>
            <span className="text-[14px]">{last4}</span>
        </div>
    );
}

export default function SelectCardForFuturePayment() {
    const cards: SavedCard[] = useMemo(
        () => [
            {
                id: "1",
                brand: "VISA",
                typeLabel: "Debit",
                balanceLabel: "$X.XXX,XX",
                last4: "4214",
                exp: "12/24",
            },
        ],
        []
    );

    const [selectedId, setSelectedId] = useState<string>(cards[0]?.id || "");

    const requirements = [
        "Card Holder Name",
        "Card Number",
        "Card PIN",
        "OTP will be sent to your registered mobile number",
    ];

    return (
        <section className="w-full">
            <div className="pb-4 border-b border-black/10">
                <h2 className="text-[28px] sm:text-[36px] font-medium text-[#111827]">
                    Select a Card for Future Payment
                </h2>
            </div>

            {/* Warning / Info box */}
            <div className="mt-6 rounded-[12px] border border-[#FFC0C0] bg-[#FFF9F9] p-4 sm:p-6">
                <div className="flex items-start justify-between gap-4">
                    <p className="text-[16px] sm:text-[18px] leading-7 text-[#777980] max-w-[62ch]">
                        You will be required to provide the following information
                        <br className="hidden sm:block" />
                        to add the digitalized version of your card
                    </p>
                    <WarningIcon />
                </div>

                <ul className="mt-5 grid gap-3 sm:gap-4">
                    {requirements.map((t) => (
                        <li key={t} className="flex items-center gap-3 text-[#777980] text-[14px] sm:text-[16px]">
                            <CheckIcon />
                            <span>{t}</span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Card selection area */}
            <div className="mt-6 rounded-[12px] border border-[#E9E9EA] bg-white p-4 sm:p-6">
                <div className="grid gap-4 sm:grid-cols-2">
                    {/* Existing card */}
                    {cards.map((c) => {
                        const active = selectedId === c.id;

                        return (
                            <button
                                key={c.id}
                                type="button"
                                onClick={() => setSelectedId(c.id)}
                                className={[
                                    "text-left rounded-[12px] border p-4 sm:p-6 transition",
                                    "bg-[#C3D4B3]",
                                    active ? "border-[#708161] ring-2 ring-[#708161]/20" : "border-transparent hover:ring-2 hover:ring-black/5",
                                ].join(" ")}
                            >
                                <div className="flex items-start justify-between gap-3">
                                    <div>
                                        <p className="text-[14px] text-[#111827]/70">Current Balance</p>
                                        <p className="mt-1 text-[26px] sm:text-[30px] font-semibold text-[#111827]">
                                            {c.balanceLabel}
                                        </p>
                                    </div>
                                    <VisaWord />
                                </div>

                                <div className="mt-10 flex items-end justify-between gap-3">
                                    <MaskedDigits last4={c.last4} />
                                    <p className="text-[14px] text-[#111827]">{c.exp}</p>
                                </div>
                            </button>
                        );
                    })}

                    {/* Add Another Card */}
                    <button
                        type="button"
                        onClick={() => console.log("Add another card")}
                        className="
              rounded-[12px]
              border border-[#E9E9EA]
              bg-[#ECECEC]
              p-4 sm:p-6
              flex flex-col items-center justify-center
              gap-4
              min-h-[160px]
              hover:bg-[#E6E6E6]
              transition
            "
                    >
                        <p className="text-[16px] sm:text-[18px] font-medium text-[#111827]">
                            Add Another Card
                        </p>
                        <div className="grid h-16 w-16 place-items-center rounded-full bg-black/10 text-[#111827]/70">
                            <PlusIcon />
                        </div>
                    </button>
                </div>

                {/* CTA */}
                <div className="mt-6 flex justify-center">
                    <button
                        type="button"
                        className="
              h-11
              w-full sm:w-[min(420px,60%)]
              rounded-[10px]
              bg-[linear-gradient(180deg,#394034_0%,#4F5747_100%)]
              text-white
              text-[14px] font-medium
              hover:opacity-90 transition
            "
                    >
                        Update Payment Method
                    </button>
                </div>
            </div>
        </section>
    );
}