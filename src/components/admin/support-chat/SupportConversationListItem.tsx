import { Avatar, AvatarFallback } from "@/src/components/ui/avatar";
import { cn } from "@/lib/utils";
import { formatConversationTimestamp } from "@/src/components/admin/support-chat/supportChatUtils";
import type { SupportConversation } from "@/src/types/adminSupportChatTypes";

type SupportConversationListItemProps = {
  conversation: SupportConversation;
  isActive: boolean;
  onSelect: (conversationId: string) => void;
};

export default function SupportConversationListItem({
  conversation,
  isActive,
  onSelect,
}: SupportConversationListItemProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(conversation.id)}
      className={cn(
        "w-full rounded-[14px] px-3 py-3 text-left transition",
        isActive
          ? "bg-[#F2F4F7]"
          : "bg-transparent hover:bg-[#F8FAFC]",
      )}
    >
      <div className="flex items-start gap-3">
        <div className="shrink-0">
          <Avatar className="h-10 w-10">
            <AvatarFallback
              className="text-sm font-semibold text-white"
              style={{ backgroundColor: conversation.avatarColor }}
            >
              {conversation.initials}
            </AvatarFallback>
          </Avatar>
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <p className="min-w-0 truncate text-[15px] font-semibold text-[#101828]">
              {conversation.participantName}
            </p>

            <span className="shrink-0 text-[11px] font-medium text-[#98A2B3]">
              {formatConversationTimestamp(conversation.lastMessageAt)}
            </span>
          </div>

          <div className="mt-1.5 flex items-center justify-between gap-3">
            <p className="min-w-0 truncate text-xs text-[#98A2B3]">
              {conversation.lastMessagePreview}
            </p>
            {conversation.unreadCount > 0 ? (
              <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-[#4F15B6] px-1.5 text-[10px] font-semibold text-white">
                {conversation.unreadCount}
              </span>
            ) : null}
          </div>
        </div>
      </div>
    </button>
  );
}
