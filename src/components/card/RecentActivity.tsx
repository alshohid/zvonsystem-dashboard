"use client";

import { Skeleton } from "@/src/components/ui/skeleton";
import { IDonation } from "@/src/types/dashboardTypes";
import Link, { useLinkStatus } from "next/link";

const dateFormatter = new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
});

const amountFormatter = new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
});

interface RecentDonationsProps {
    title?: string;
    items?: IDonation[];
    isLoading?: boolean;
    onSeeAll?: () => void;
}

const formatDate = (value?: string | null) => {
    if (!value) {
        return "-";
    }

    const parsedDate = new Date(value);

    if (Number.isNaN(parsedDate.getTime())) {
        return "-";
    }

    return dateFormatter.format(parsedDate);
};

const formatRelativeTime = (value?: string | null) => {
    if (!value) {
        return "Just now";
    }

    const parsedDate = new Date(value);

    if (Number.isNaN(parsedDate.getTime())) {
        return "Just now";
    }

    const diffInMinutes = Math.max(0, Math.floor((Date.now() - parsedDate.getTime()) / (1000 * 60)));

    if (diffInMinutes < 1) {
        return "Just now";
    }

    if (diffInMinutes < 60) {
        return `${diffInMinutes}m ago`;
    }

    const diffInHours = Math.floor(diffInMinutes / 60);

    if (diffInHours < 24) {
        return `${diffInHours}h ago`;
    }

    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInDays < 7) {
        return `${diffInDays}d ago`;
    }

    return formatDate(value);
};

const formatAmount = (value?: string | number | null) => {
    if (value === null || value === undefined || value === "") {
        return amountFormatter.format(0);
    }

    const parsedAmount =
        typeof value === "number" ? value : Number(String(value).replace(/,/g, ""));

    if (Number.isNaN(parsedAmount)) {
        return String(value);
    }

    return amountFormatter.format(parsedAmount);
};

const getNoticeDisplayName = (item: IDonation) =>
    [item.notice?.first_name, item.notice?.surname].filter(Boolean).join(" ") || "Unnamed notice";

const getDonorName = (item: IDonation) => item.user?.name || "Anonymous donor";

export default function RecentDonations({
    title = "Recent Donations",
    items = [],
    isLoading = false,

}: RecentDonationsProps) {
    const { pending: pendingRecentDonations } = useLinkStatus()
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
            {/* Title (Figma typography) */}
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
                        <li key={`condolence-skeleton-${idx}`} className="w-full">
                            <div className="space-y-2">
                                <Skeleton className="h-5 w-40 bg-[#E7ECE1]" />
                                <Skeleton className="h-4 w-full bg-[#EFF3EB]" />
                            </div>
                            {idx !== 3 && <div className="my-4 h-px w-full bg-black/5" />}
                        </li>
                    ))
                    : items.map((item, idx) => (
                        <li key={item.id} className="w-full">
                            <div className="flex items-center gap-2 w-full">
                                <div className="min-w-0 flex-1">
                                    <p className="text-[1rem] sm:text-[1.125rem] font-semibold text-[#161721] truncate">
                                        {getDonorName(item)}
                                    </p>

                                    <div className="mt-0.5 flex flex-wrap items-center gap-2 text-[0.95rem] text-[#6B7280]">
                                        <span className="font-medium text-[#161721]">{formatAmount(item.amount)}</span>
                                        <span className="text-[#9CA3AF]">•</span>
                                        <span>{formatRelativeTime(item.created_at)}</span>
                                        <span className="text-[#9CA3AF]">•</span>
                                        <span className="truncate">To {getNoticeDisplayName(item)}</span>
                                    </div>
                                </div>
                            </div>

                            {idx !== items.length - 1 && (
                                <div className="my-4 h-px w-full bg-black/5" />
                            )}
                        </li>
                    ))}

                {!isLoading && items.length === 0 ? (
                    <li className="rounded-[0.75rem] border border-dashed border-[#D9DADC] bg-white px-4 py-5 text-center text-[14px] text-[#667164]">
                        No recent donations found.
                    </li>
                ) : null}
            </ul>

            <Link href="/admin/dashboard/financial-management?tab=see-all-donation">
                <button
                    type="button"
                    disabled={pendingRecentDonations}
                    className={`
          w-full
          rounded-[0.5rem]
          border border-[#D9DADC]
          bg-white
          px-4 py-2.5
          text-[.875rem] font-medium text-[#161721]
          hover:bg-gray-50 transition
        ${pendingRecentDonations ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                    See All Donations
                </button>
            </Link>
        </section>
    );
}
