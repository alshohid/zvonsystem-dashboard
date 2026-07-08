'use client'

import { Skeleton } from "@/src/components/ui/skeleton";
import { IRecentCondolenceItem } from "@/src/types/dashboardTypes";
import { useLinkStatus } from "next/link";
import { useState } from "react";
import Link from "next/link";

type CondolenceBookItem = IRecentCondolenceItem & {
    onView?: () => void;
};

const yearFormatter = new Intl.DateTimeFormat("en-GB", {
    year: "numeric",
});

interface CondolenceBooksProps {
    title?: string;
    items?: CondolenceBookItem[];
    isLoading?: boolean;
    onSeeAll?: () => void;
}

const formatYear = (value?: string | null) => {
    if (!value) {
        return "-";
    }

    const parsedDate = new Date(value);

    if (Number.isNaN(parsedDate.getTime())) {
        return "-";
    }

    return yearFormatter.format(parsedDate);
};

const getNoticeDisplayName = (item: CondolenceBookItem) =>
    [item.notice?.first_name, item.notice?.surname].filter(Boolean).join(" ") || "Unnamed notice";

const getYearRange = (item: CondolenceBookItem) => {
    const fromYear = formatYear(item.notice?.form);
    const toYear = formatYear(item.notice?.to);

    if (fromYear === "-" && toYear === "-") {
        return "Years unavailable";
    }

    return `${fromYear} - ${toYear}`;
};

export default function CondolenceBooksCard({
    title = "Condolence Books",
    items = [],
    isLoading = false,
}: CondolenceBooksProps) {

    const { pending: pendingCondolenceBooks } = useLinkStatus()
    const { pending: pendingCondolenceBooksSeeAll } = useLinkStatus()

    return (
        <section
            className="
            w-full
            flex flex-col items-start gap-6
            p-6
            rounded-[0.75rem]
            bg-[#F8F7F8]
        "
        >
            {/* Title */}
            <h3
                className="text-[#161721] font-medium leading-[130%]"
                style={{ fontFamily: "var(--font-schibsted)", fontSize: "1.625rem" }}
            >
                {title}
            </h3>

            {/* List */}
            <ul className="w-full">
                {isLoading
                    ? Array.from({ length: 4 }).map((_, idx) => (
                        <li key={`condolence-book-skeleton-${idx}`} className="w-full">
                            <div className="flex items-center justify-between gap-3">
                                <div className="min-w-0 flex-1 space-y-2">
                                    <Skeleton className="h-5 w-40 bg-[#E7ECE1]" />
                                    <Skeleton className="h-4 w-28 bg-[#EFF3EB]" />
                                </div>
                                <Skeleton className="h-5 w-10 bg-[#E7ECE1]" />
                            </div>
                            {idx !== 3 && <div className="my-4 h-px w-full bg-black/5" />}
                        </li>
                    ))
                    : items.map((item, idx) => (
                        <li key={item.id} className="w-full">
                            <div className="flex items-center justify-between gap-3 w-full">
                                <div className="min-w-0">
                                    <p className="text-[1rem] sm:text-[1.125rem] font-semibold text-[#161721] truncate">
                                        {getNoticeDisplayName(item)}
                                    </p>
                                    <p className="mt-0.5 text-[1rem] text-[#6B7280]">{getYearRange(item)}</p>
                                </div>

                                {/* Use Link component for navigation */}
                                <Link
                                    href={`/admin/dashboard/all-notices?tab=condolence&condolence_id=${item.id}`}
                                    passHref
                                >
                                    <button
                                        type="button"
                                        disabled={pendingCondolenceBooks}
                                        className={`shrink-0 text-[1rem] font-medium text-[#6B7280] transition hover:text-[#161721] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:text-[#6B7280] ${pendingCondolenceBooks ? "opacity-50 cursor-not-allowed" : ""}`}
                                    >
                                        View
                                    </button>
                                </Link>
                            </div>

                            {/* Divider */}
                            {idx !== items.length - 1 && (
                                <div className="my-4 h-px w-full bg-black/5" />
                            )}
                        </li>
                    ))}

                {!isLoading && items.length === 0 ? (
                    <li className="rounded-xl border border-dashed border-[#D9DADC] bg-white px-4 py-5 text-center text-[14px] text-[#667164]">
                        No condolence books found.
                    </li>
                ) : null}
            </ul>

            <Link href="/admin/dashboard/all-notices?tab=notices">
                <button
                    type="button"
                    disabled={pendingCondolenceBooksSeeAll}
                    className={`
                    w-full
                    rounded-lg
                    border border-[#D9DADC]
                    bg-white
                    px-4 py-2.5
                    text-[0.875rem] font-medium text-[#161721]
                    hover:bg-gray-50 transition
                    ${pendingCondolenceBooksSeeAll ? "opacity-50 cursor-not-allowed" : ""}
                `}
                >
                    See All Condolence Books
                </button>
            </Link>
        </section>
    );
}