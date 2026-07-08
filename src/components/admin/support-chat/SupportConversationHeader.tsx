import { MoreVertical } from "lucide-react";
import { Avatar, AvatarFallback } from "@/src/components/ui/avatar";
import type {
  SupportChatViewMode,
  SupportConversation,
} from "@/src/types/adminSupportChatTypes";

type SupportConversationHeaderProps = {
  conversation: SupportConversation;
  mode?: SupportChatViewMode;
};

export default function SupportConversationHeader({
  conversation,
  mode = "admin",
}: SupportConversationHeaderProps) {
  const metaItems = [
    conversation.carrierName,
    conversation.participantRoleLabel,
    conversation.participantEmail,
  ];

  if (mode === "admin") {
    metaItems.push("Basic Plan");
  }

  return (
    <div className="shrink-0 border-b border-[#EAECF0] bg-white px-4 py-4 sm:px-6">
      <div className="flex items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <div className="shrink-0">
            <Avatar className="h-11 w-11">
              <AvatarFallback
                className="text-sm font-semibold text-white"
                style={{ backgroundColor: conversation.avatarColor }}
              >
                {conversation.initials}
              </AvatarFallback>
            </Avatar>
          </div>

          <div className="min-w-0">
            <h3 className="truncate text-[15px] font-semibold text-[#101828]">
              {conversation.participantName}
            </h3>
            <p className="truncate text-xs text-[#98A2B3]">
              {metaItems.join(" • ")}
            </p>
          </div>
        </div>

        <div className="group relative shrink-0">
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full text-[#667085] transition hover:bg-[#F2F4F7] hover:text-[#344054] focus:outline-none focus:ring-2 focus:ring-[#2E3A83]/15"
            aria-label="Conversation options"
          >
            <MoreVertical className="h-5 w-5" />
          </button>
          <div className="absolute right-0 top-full z-10 hidden min-w-[112px] rounded-md border border-[#EAECF0] bg-white px-3 py-2 text-xs font-medium text-[#344054] shadow-[0_12px_28px_rgba(16,24,40,0.14)] group-focus-within:block group-hover:block">
            View Profile
          </div>
        </div>
      </div>
    </div>
  );
}
