import { formatConversationTimestamp } from "@/src/components/admin/support-chat/supportChatUtils";
import type { SupportConversation } from "@/src/types/adminSupportChatTypes";
import { getMobileConversationName } from "../../communicationMobileConfig";
import MobileConversationAvatar from "./MobileConversationAvatar";

type MobileInboxItemProps = {
    conversation: SupportConversation;
    onSelect: (conversationId: string) => void;
};

export default function MobileInboxItem({
    conversation,
    onSelect,
}: MobileInboxItemProps) {
    return (
        <button
            type="button"
            onClick={() => onSelect(conversation.id)}
            className="flex w-full items-start gap-3 rounded-[16px] px-1 py-2.5 text-left transition active:bg-[#F8FAFC]"
        >
            <MobileConversationAvatar conversation={conversation} className="h-11 w-11" />

            <span className="min-w-0 flex-1 pt-0.5">
                <span className="flex items-start justify-between gap-3">
                    <span className="min-w-0 truncate text-[16px] font-semibold leading-5 text-[#101828]">
                        {getMobileConversationName(conversation)}
                    </span>
                    <span className="shrink-0 pt-0.5 text-[11px] font-medium text-[#667085]">
                        {formatConversationTimestamp(conversation.lastMessageAt)}
                    </span>
                </span>

                <span className="mt-1 flex items-center justify-between gap-3">
                    <span className="min-w-0 truncate text-[13px] leading-4 text-[#98A2B3]">
                        {conversation.lastMessagePreview}
                    </span>
                    {conversation.unreadCount > 0 ? (
                        <span className="inline-flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-[#313A8A] px-1 text-[10px] font-semibold text-white">
                            {conversation.unreadCount}
                        </span>
                    ) : null}
                </span>
            </span>
        </button>
    );
}
