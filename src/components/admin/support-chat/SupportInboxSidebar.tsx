import SearchInput from "@/src/components/ui/input/searchInput/SearchInput";
import SupportConversationList from "@/src/components/admin/support-chat/SupportConversationList";
import type { SupportConversation } from "@/src/types/adminSupportChatTypes";

type SupportInboxSidebarProps = {
  activeConversationId: string | null;
  conversations: SupportConversation[];
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onSelectConversation: (conversationId: string) => void;
};

export default function SupportInboxSidebar({
  activeConversationId,
  conversations,
  searchQuery,
  onSearchChange,
  onSelectConversation,
}: SupportInboxSidebarProps) {
  return (
    <aside className="flex h-full min-h-0 flex-col overflow-hidden border-b border-[#EAECF0] bg-white xl:border-b-0 xl:border-r">
      <div className="shrink-0 border-b border-[#EAECF0] px-4 py-4">
        <SearchInput
          value={searchQuery}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search"
          containerClassName="w-full"
          inputClassName="h-12 rounded-[12px] border-[#E4E7EC] bg-[#F6F7FB] pl-11 text-sm shadow-none placeholder:text-[#98A2B3] focus:border-[#DADCE5] focus:bg-[#F6F7FB] focus:ring-0"
        />
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-2 py-2">
        <SupportConversationList
          activeConversationId={activeConversationId}
          conversations={conversations}
          onSelectConversation={onSelectConversation}
        />
      </div>
    </aside>
  );
}
