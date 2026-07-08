import type { OrganizationStatus } from "./organizationTypes";

type OrganizationStatusBadgeProps = {
    status: OrganizationStatus;
};

const statusClassName: Record<OrganizationStatus, string> = {
    Active: "border-[#8CE8A9] bg-[#EFFFF4] text-[#0A9A3E]",
    Inactive: "border-[#F3B1B1] bg-[#FFF1F1] text-[#DC2626]",
};

export default function OrganizationStatusBadge({
    status,
}: OrganizationStatusBadgeProps) {
    return (
        <span
            className={[
                "inline-flex h-6 items-center rounded-full border px-3 text-xs font-medium",
                statusClassName[status],
            ].join(" ")}
        >
            {status}
        </span>
    );
}
