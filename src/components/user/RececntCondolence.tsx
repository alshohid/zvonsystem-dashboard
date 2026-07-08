"use client";

import { Skeleton } from "@/src/components/ui/skeleton";
import { IDirectorRecentCondolenceItem } from "@/src/types/undertaker/dashboardTypes";

type RecentCondolenceProps = {
    title?: string;
    items?: IDirectorRecentCondolenceItem[];
    isLoading?: boolean;
    onSeeAll?: () => void;
};

const dateFormatter = new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
});

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

const getDisplayName = (item: IDirectorRecentCondolenceItem) => {
    const fullName = [item.first_name, item.surname].filter(Boolean).join(" ").trim();

    if (item.nee?.trim()) {
        return `${fullName} (nee ${item.nee.trim()})`;
    }

    return fullName || "Unnamed notice";
};

export default function RecentCondolence({
    title = "Recent Condolences",
    items = [],
    isLoading = false,
    onSeeAll,
}: RecentCondolenceProps) {
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
            <h3
                className="text-[#161721] font-medium leading-[130%]"
                style={{ fontFamily: "var(--font-schibsted)", fontSize: "1.625rem" }}
            >
                {title}
            </h3>

            <ul className="w-full">
                {isLoading
                    ? Array.from({ length: 4 }).map((_, index) => (
                        <li key={`recent-condolence-skeleton-${index}`} className="w-full">
                            <div className="space-y-2">
                                <Skeleton className="h-5 w-48 bg-[#E7ECE1]" />
                                <Skeleton className="h-4 w-full bg-[#EFF3EB]" />
                            </div>
                            {index !== 3 ? <div className="my-4 h-px w-full bg-black/5" /> : null}
                        </li>
                    ))
                    : items.map((item, index) => (
                        <li key={item.condolance.id} className="w-full">
                            <div className="flex items-center gap-2 w-full">
                                <div className="min-w-0 flex-1">
                                    <p className="text-[1rem] sm:text-[1.125rem] font-semibold text-[#161721] truncate">
                                        {getDisplayName(item)}
                                    </p>

                                    <div className="mt-0.5 flex flex-wrap items-center gap-2 text-[1rem] text-[#6B7280]">
                                        <span className="font-medium text-[#161721]">
                                            Received {formatRelativeTime(item.condolance.created_at)}
                                        </span>
                                        <span className="text-[#9CA3AF]">•</span>
                                        <span>{formatDate(item.condolance.created_at)}</span>
                                    </div>
                                </div>
                            </div>

                            {index !== items.length - 1 ? (
                                <div className="my-4 h-px w-full bg-black/5" />
                            ) : null}
                        </li>
                    ))}

                {!isLoading && items.length === 0 ? (
                    <li className="rounded-[0.75rem] border border-dashed border-[#D9DADC] bg-white px-4 py-5 text-center text-[14px] text-[#667164]">
                        No recent condolences found.
                    </li>
                ) : null}
            </ul>

            <button
                type="button"
                onClick={onSeeAll}
                disabled={!onSeeAll}
                className="
          w-full
          rounded-[0.5rem]
          border border-[#D9DADC]
          bg-white
          px-4 py-2.5
          text-[.875rem] font-medium text-[#161721]
          transition hover:bg-gray-50
          disabled:cursor-not-allowed disabled:opacity-60
        "
            >
                See All Condolences
            </button>
        </section>
    );
}
