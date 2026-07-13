import InitialAvatar from "@/src/components/superAdmin/dashboard/InitialAvatar";
import UserRoleBadge from "./UserRoleBadge";
import type { ManagedUser } from "./types";

const TABLE_HEADERS = ["Artist", "Role", "Joined", "Actions"];

type UserManagementTableProps = {
  users: ManagedUser[];
  onViewProfile: (id: string) => void;
};

export default function UserManagementTable({ users, onViewProfile }: UserManagementTableProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-[#E9EDF5] bg-white shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse">
          <thead>
            <tr className="bg-[#F2F4F8]">
              {TABLE_HEADERS.map(header => (
                <th
                  key={header}
                  className="px-5 py-3 text-left text-[13px] font-medium text-[#475467]"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {users.map(user => (
              <tr
                key={user.id}
                className="border-t border-[#F0F2F7] transition-colors hover:bg-[#FAFBFC]"
              >
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <InitialAvatar name={user.name} size={32} />
                    <div className="min-w-0">
                      <p className="truncate text-[14px] font-medium text-[#101828]">
                        {user.name}
                      </p>
                      <p className="truncate text-xs text-[#98A2B3]">{user.email}</p>
                    </div>
                  </div>
                </td>

                <td className="px-5 py-4">
                  <UserRoleBadge role={user.role} />
                </td>

                <td className="px-5 py-4 text-[14px] text-[#475467]">{user.joinedDate}</td>

                <td className="px-5 py-4">
                  <button
                    type="button"
                    onClick={() => onViewProfile(user.id)}
                    className="inline-flex items-center gap-1 rounded-lg border border-[#D0D5DD] px-3 py-1.5 text-xs font-medium text-[#344054] hover:bg-[#F9FAFB]"
                  >
                    View Profile →
                  </button>
                </td>
              </tr>
            ))}

            {users.length === 0 ? (
              <tr>
                <td colSpan={TABLE_HEADERS.length} className="px-5 py-12 text-center text-sm text-[#98A2B3]">
                  No users match this filter.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}
