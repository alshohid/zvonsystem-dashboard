import SupportConversationListItem from "@/src/components/admin/support-chat/SupportConversationListItem";
import type { SupportConversation } from "@/src/types/adminSupportChatTypes";

type SupportConversationListProps = {
  activeConversationId: string | null;
  conversations: SupportConversation[];
  onSelectConversation: (conversationId: string) => void;
};

export default function SupportConversationList({
  activeConversationId,
  conversations,
  onSelectConversation,
}: SupportConversationListProps) {
  if (!conversations.length) {
    return (
      <div className="rounded-[22px] border border-dashed border-[#D0D5DD] bg-white px-5 py-10 text-center">
        <p className="text-sm font-medium text-[#344054]">
          No conversation matched your search.
        </p>
        <p className="mt-1 text-xs text-[#667085]">
          Try a participant name, email, carrier, or load reference.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-2.5">
      {conversations.map((conversation) => (
        <SupportConversationListItem
          key={conversation.id}
          conversation={conversation}
          isActive={conversation.id === activeConversationId}
          onSelect={onSelectConversation}
        />
      ))}
    </div>
  );
}
