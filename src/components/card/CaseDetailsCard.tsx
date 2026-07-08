"use client";

import React from "react";

type CaseDetailsCardProps = {
    caseId?: string; // "#122"
    reportedBy?: string;

    submittedOn?: string; // "20 min ago"

    personName?: string; // "Demy Campbell"
    message?: string;
    linkText?: string; // "//sdfkhie123=-qw23"

    reasonTitle?: string; // "Reason"
    reasonText?: string;  // "Person engaging with phishing link"

    implicationTitle?: string; // "Implication"
    implicationText?: string;  // "Flag for only this notice"

    onSeeCondolenceBook?: () => void;
    onTakeAction?: () => void;
};

export default function CaseDetailsCard({
    caseId = "#122",
    reportedBy = "British Heart Foundation",
    submittedOn = "20 min ago",

    personName = "Demy Campbell",
    message = `A beautiful soul has left us, but her light will remain in our hearts forever. Isabel was a true friend and a second mother to me. Deepest condolences to the family. Donate now in this link:`,
    linkText = "//sdfkhie123=-qw23",

    reasonTitle = "Reason",
    reasonText = "Person engaging with phishing link",

    implicationTitle = "Implication",
    implicationText = "Flag for only this notice",

    onSeeCondolenceBook,
    onTakeAction,
}: CaseDetailsCardProps) {
    return (
        <section className="w-full rounded-[12px] border border-[#E9E9EA] bg-white p-5 sm:p-6">
            <div className="flex flex-col items-start gap-6">
                {/* Header */}
                <div className="w-full">
                    <h3
                        className="text-[#1D1F2C]"
                        style={{
                            fontFamily: "var(--font-schibsted)",
                            fontSize: "1.125rem",
                            fontWeight: 600,
                            lineHeight: "118%",
                        }}
                    >
                        Case {caseId}
                    </h3>
                    <p className="mt-1 text-[14px] text-gray-500">
                        Reported by {reportedBy}
                    </p>
                </div>

                {/* Submitted */}
                <div className="w-full">
                    <p
                        className="text-[#1D1F2C]"
                        style={{
                            fontFamily: "var(--font-schibsted)",
                            fontSize: "1.125rem",
                            fontWeight: 600,
                            lineHeight: "118%",
                        }}
                    >
                        Submitted On
                    </p>
                    <p className="mt-2 text-[14px] text-gray-500">{submittedOn}</p>
                </div>

                {/* Content */}
                <div className="w-full">
                    <p
                        className="text-[#1D1F2C]"
                        style={{
                            fontFamily: "var(--font-schibsted)",
                            fontSize: "1.125rem",
                            fontWeight: 600,
                            lineHeight: "118%",
                        }}
                    >
                        {personName}
                    </p>

                    <p className="mt-2 text-[14px] leading-6 text-gray-500">
                        {message}
                    </p>

                    <a
                        href="#"
                        onClick={(e) => e.preventDefault()}
                        className="mt-2 inline-block text-[14px] text-[#2F64FF] hover:underline break-all"
                    >
                        {linkText}
                    </a>
                </div>

                {/* Reason */}
                <div className="w-full border-t border-black/5 pt-5">
                    <p
                        className="text-[#1D1F2C]"
                        style={{
                            fontFamily: "var(--font-schibsted)",
                            fontSize: "1.125rem",
                            fontWeight: 600,
                            lineHeight: "118%",
                        }}
                    >
                        {reasonTitle}
                    </p>
                    <p className="mt-2 text-[14px] text-gray-500">{reasonText}</p>
                </div>

                {/* Implication */}
                <div className="w-full border-t border-black/5 pt-5">
                    <p
                        className="text-[#1D1F2C]"
                        style={{
                            fontFamily: "var(--font-schibsted)",
                            fontSize: "1.125rem",
                            fontWeight: 600,
                            lineHeight: "118%",
                        }}
                    >
                        {implicationTitle}
                    </p>
                    <p className="mt-2 text-[14px] text-gray-500">{implicationText}</p>
                </div>

                {/* Buttons */}
                <div className="w-full flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <button
                        type="button"
                        onClick={onSeeCondolenceBook}
                        className="
              h-11 w-full sm:w-[48%]
              rounded-[10px]
              border border-[#CFCFD6]
              bg-white
              text-[13px] font-medium text-gray-700
              hover:bg-gray-50 transition
            "
                    >
                        See Condolence Book
                    </button>

                    <button
                        type="button"
                        onClick={onTakeAction}
                        className="
              h-11 w-full sm:w-[48%]
              rounded-[10px]
              bg-[#3F4A3B]
              text-[13px] font-medium text-white
              hover:opacity-90 transition
            "
                    >
                        Take Action
                    </button>
                </div>
            </div>
        </section>
    );
}