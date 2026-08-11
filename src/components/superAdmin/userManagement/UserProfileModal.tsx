import InitialAvatar from "@/src/components/superAdmin/dashboard/InitialAvatar";
import ReadOnlyField from "@/src/components/superAdmin/common/ReadOnlyField";
import { Modal } from "@/src/components/ui/modal";
import type { ManagedUser } from "./types";



type UserProfileModalProps = {
  user: ManagedUser | null;
  onClose: () => void;
};

export default function UserProfileModal({ user, onClose }: UserProfileModalProps) {
  return (
    <Modal
      isOpen={!!user}
      onClose={onClose}
      className="w-full max-w-md p-0"
      contentBgClassName="bg-white"
      textClassName="text-[#101828]"
    >
      {user && (
        <div className="rounded-2xl p-6">
          <h3 className="text-[16px] font-semibold text-[#101828]">User Profile</h3>

          <div className="mt-4 flex items-center gap-3">
            <InitialAvatar name={user.name} size={40} />
            <div className="min-w-0">
              <p className="truncate text-[14px] font-semibold text-[#101828]">{user.name}</p>
              <p className="truncate text-xs text-[#98A2B3]">{user.email}</p>
              <div className="mt-1.5">
                <p>{user.releaseCount}</p>
              </div>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-4">
            <ReadOnlyField label="Release Count" value={user.releaseCount} />
            <ReadOnlyField label="Joined" value={user.joinedDate} />
            <ReadOnlyField label="Last Updated" value={user.lastUpdatedDate} />
            {/* <ReadOnlyField label="Role" value={ROLE_LABEL[user.role]} /> */}
          </div>

          <button
            type="button"
            onClick={onClose}
            className="mt-6 w-full rounded-xl bg-primary px-4 py-2.5 text-[13px] font-semibold text-[#101828] hover:opacity-90"
          >
            Close
          </button>
        </div>
      )}
    </Modal>
  );
}
