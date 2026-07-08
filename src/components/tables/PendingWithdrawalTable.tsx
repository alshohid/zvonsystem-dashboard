"use client";

import { Skeleton } from "@/src/components/ui/skeleton";
import { Business, PaginationMeta } from "@/src/types/dashboardTypes";
import Link, { useLinkStatus } from "next/link";

const tableHeader = [
    "Applicant",
    "Location",
    "Submitted Date",
    "Attachment",
    "Status",
];

interface RecentApplicationsTableProps {
    applications?: Business[];
    meta?: PaginationMeta;
    isLoading?: boolean;
    onSeeAll?: () => void;
}

const dateFormatter = new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
});

function AttachmentBadge({ count, href }: { count: number; href?: string }) {
    const label = `${count} file${count === 1 ? "" : "s"}`;

    if (!href) {
        return (
            <span className="inline-flex items-center justify-center rounded bg-[#E9EEF5] px-2.5 py-1 text-[11px] font-semibold text-[#3F4A3B]">
                {label}
            </span>
        );
    }

    return (
        <a
            href={href}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded bg-[#E9EEF5] px-2.5 py-1 text-[11px] font-semibold text-[#3F4A3B] transition hover:opacity-80"
        >
            {label}
        </a>
    );
}

function StatusBadge({ status }: { status: string }) {
    const normalizedStatus = status.trim().toLowerCase();
    const className =
        normalizedStatus === "approved"
            ? "bg-[#E7F2DD] text-[#3F4A3B]"
            : normalizedStatus === "rejected"
                ? "bg-[#FCE8E8] text-[#B54747]"
                : "bg-[#FFF4DA] text-[#9A6700]";

    return (
        <span className={`inline-flex rounded-full px-3 py-1 text-[11px] font-medium capitalize ${className}`}>
            {normalizedStatus || "pending"}
        </span>
    );
}

const formatApplicationDate = (value?: string | null) => {
    if (!value) {
        return "-";
    }

    const parsedDate = new Date(value);

    if (Number.isNaN(parsedDate.getTime())) {
        return "-";
    }

    return dateFormatter.format(parsedDate);
};

const getLocationLabel = (application: Business) =>
    application.country || application.address || "Location unavailable";

const getAttachmentCount = (application: Business) => application.exercise_documents?.length ?? 0;

export default function RecentApplicationsTable({
    applications = [],
    meta,
    isLoading = false,
}: RecentApplicationsTableProps) {
    const { pending: pendingApplications } = useLinkStatus()
    const applicationCount = meta?.total ?? applications.length;

    return (
        <section
            className="
        w-full
        flex flex-col items-start gap-4
        p-6
        rounded-[0.75rem]
        border border-[#E9E9EA]
        bg-white
      "
        >
            {/* Top bar */}
            <div className="w-full flex items-center justify-between gap-3">
                <div>
                    <h3 className="text-[1.625rem] font-medium text-[#161721]">
                        Recent Applications
                    </h3>
                    <p className="mt-1 text-[13px] text-[#667164]">
                        {applicationCount} application{applicationCount === 1 ? "" : "s"} found
                    </p>
                </div>

                <Link
                    href="/admin/dashboard/undertaker-verification?tab=All-Application"
                    passHref
                >
                    <button
                        type="button"
                        disabled={pendingApplications}
                        className={`
            rounded-lg border border-[#E9E9EA] bg-white
            px-3 py-2 text-[12px] font-medium text-gray-700
            hover:bg-gray-50 transition
          ${pendingApplications ? "opacity-50 cursor-not-allowed" : ""}`}
                    >
                        See All Applications
                    </button>
                </Link>
            </div>

            {/* Table wrapper (responsive) */}
            <div className="w-full overflow-x-auto">
                <table className="w-full min-w-[720px] border-separate border-spacing-0">
                    {/* Header strip */}
                    <thead>
                        <tr className="bg-[#3F4A3B]">
                            {tableHeader.map((h) => (
                                <th
                                    key={h}
                                    className="
                    px-4 py-3 text-left
                    text-[1rem] font-medium text-white/90
                    first:rounded-l-[6px] last:rounded-r-[6px]
                  "
                                >
                                    {h}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    {/* Body */}
                    <tbody>
                        {isLoading
                            ? Array.from({ length: 5 }).map((_, idx) => {
                                const isStriped = idx % 2 === 1;

                                return (
                                    <tr key={`application-skeleton-${idx}`} className={isStriped ? "bg-[#FAFAFA]" : "bg-white"}>
                                        <td className="px-4 py-4">
                                            <div className="space-y-2">
                                                <Skeleton className="h-4 w-36 bg-[#EEF2E8]" />
                                                <Skeleton className="h-3 w-44 bg-[#F4F7F1]" />
                                            </div>
                                        </td>
                                        <td className="px-4 py-4">
                                            <Skeleton className="h-4 w-32 bg-[#EEF2E8]" />
                                        </td>
                                        <td className="px-4 py-4">
                                            <Skeleton className="h-4 w-20 bg-[#EEF2E8]" />
                                        </td>
                                        <td className="px-4 py-4">
                                            <Skeleton className="h-7 w-16 rounded-md bg-[#EEF2E8]" />
                                        </td>
                                        <td className="px-4 py-4">
                                            <Skeleton className="h-7 w-20 rounded-full bg-[#EEF2E8]" />
                                        </td>
                                    </tr>
                                );
                            })
                            : applications.map((application, idx) => {
                                const isStriped = idx % 2 === 1;
                                const attachmentCount = getAttachmentCount(application);
                                const attachmentHref = application.exercise_documents_url?.[0];

                                return (
                                    <tr key={application.id} className={isStriped ? "bg-[#FAFAFA]" : "bg-white"}>
                                        <td className="px-4 py-4">
                                            <div>
                                                <p className="text-[1rem] font-medium text-[#161721]">
                                                    {application.name || "Unnamed applicant"}
                                                </p>
                                                <p className="mt-1 text-[13px] text-[#667164]">
                                                    {application.email}
                                                </p>
                                            </div>
                                        </td>

                                        <td className="px-4 py-4 text-[1rem] text-gray-700">
                                            {getLocationLabel(application)}
                                        </td>

                                        <td className="px-4 py-4 text-[1rem] text-gray-700">
                                            {formatApplicationDate(application.created_at)}
                                        </td>

                                        <td className="px-4 py-4">
                                            {attachmentCount > 0 ? (
                                                <AttachmentBadge count={attachmentCount} href={attachmentHref} />
                                            ) : (
                                                <span className="text-[13px] text-gray-500">N/A</span>
                                            )}
                                        </td>

                                        <td className="px-4 py-4">
                                            <StatusBadge status={application.approval_status} />
                                        </td>
                                    </tr>
                                );
                            })}

                        {!isLoading && applications.length === 0 ? (
                            <tr>
                                <td colSpan={tableHeader.length} className="px-4 py-10 text-center text-[14px] text-[#667164]">
                                    No recent applications found.
                                </td>
                            </tr>
                        ) : null}
                    </tbody>
                </table>
            </div>
        </section>
    );
}
