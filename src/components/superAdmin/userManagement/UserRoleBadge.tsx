import type { UserRole } from "./types";

const ROLE_LABEL: Record<UserRole, string> = {
  admin: "Admin",
  user: "User",
  artist: "Artist",
};

const ROLE_BADGE_CLASSNAME: Record<UserRole, string> = {
  admin: "border border-[#BBF7D0] bg-[#F0FDF4] text-[#15803D]",
  user: "border border-[#E5E7EB] bg-[#F9FAFB] text-[#667085]",
  artist: "border border-[#BFDBFE] bg-[#EFF6FF] text-[#1D4ED8]",
};

export default function UserRoleBadge({ role }: { role: UserRole }) {
  return (
    <span
      className={[
        "inline-block rounded-md px-2 py-0.5 text-xs font-medium",
        ROLE_BADGE_CLASSNAME[role],
      ].join(" ")}
    >
      {ROLE_LABEL[role]}
    </span>
  );
}
