import { Eye, User as UserIcon } from "lucide-react";
import Badge from "@/src/components/ui/badge/Badge";
import InitialAvatar from "./InitialAvatar";
import type { SuperAdminUser } from "./mockSuperAdminDashboard";

type UserListItemProps = {
  user: SuperAdminUser;
  onView: (id: string) => void;
  onManage: (id: string) => void;
};

export default function UserListItem({ user, onView, onManage }: UserListItemProps) {
  return (
    <div className="flex flex-wrap items-center gap-4 py-3">
      <InitialAvatar name={user.name} />

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-[#101828]">{user.name}</p>
        <p className="truncate text-xs text-[#667085]">{user.email}</p>
      </div>

      <p className="shrink-0 text-xs text-[#667085]">{user.releaseCount} releases</p>
      <p className="shrink-0 text-xs text-[#667085]">Joined {user.joinedDate}</p>

      <Badge variant="light" color={user.status === "active" ? "success" : "error"} size="sm">
        {user.status === "active" ? "Active" : "Suspended"}
      </Badge>

      <div className="flex shrink-0 items-center gap-2">
        <button
          type="button"
          onClick={() => onView(user.id)}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-[#E5E7EB] text-[#667085] transition-colors hover:bg-gray-50"
          aria-label={`View ${user.name}`}
        >
          <Eye className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => onManage(user.id)}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-[#E5E7EB] text-[#667085] transition-colors hover:bg-gray-50"
          aria-label={`Manage ${user.name}`}
        >
          <UserIcon className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
