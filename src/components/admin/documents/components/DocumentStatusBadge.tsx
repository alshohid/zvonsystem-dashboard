import { DocumentStatus } from "../documentTypes";

const statusBadgeClasses: Record<DocumentStatus, string> = {
    Approved: "border-[#86EFAC] bg-[#ECFDF3] text-[#16A34A]",
    Pending: "border-[#FDE68A] bg-[#FFFAEB] text-[#B54708]",
    Rejected: "border-[#FDA29B] bg-[#FEF3F2] text-[#D92D20]",
};

type DocumentStatusBadgeProps = {
    status: DocumentStatus;
};

export default function DocumentStatusBadge({ status }: DocumentStatusBadgeProps) {
    return (
        <span
            className={`inline-flex min-w-[76px] items-center justify-center rounded-full border px-2.5 py-1 text-xs font-medium leading-none ${statusBadgeClasses[status]}`}
        >
            {status}
        </span>
    );
}
