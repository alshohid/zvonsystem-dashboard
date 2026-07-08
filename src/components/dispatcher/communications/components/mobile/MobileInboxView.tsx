import { Search } from "lucide-react";
import type { SupportConversation } from "@/src/types/adminSupportChatTypes";
import MobileHomeIndicator from "./MobileHomeIndicator";
import MobileInboxItem from "./MobileInboxItem";

type MobileInboxViewProps = {
    conversations: SupportConversation[];
    searchQuery: string;
    onSearchChange: (value: string) => void;
    onSelectConversation: (conversationId: string) => void;
};

export default function MobileInboxView({
    conversations,
    searchQuery,
    onSearchChange,
    onSelectConversation,
}: MobileInboxViewProps) {
    return (
        <section className="flex h-full min-h-0 flex-col bg-white">
            <div className="px-6 pt-4">
                <div className="flex items-center justify-between gap-4">
                    <h1 className="text-[19px] font-semibold leading-6 text-[#101828]">
                        Communications
                    </h1>
                </div>

                <label className="relative mt-5 block" htmlFor="mobile-communication-search">
                    <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#7C8798]" />
                    <input
                        id="mobile-communication-search"
                        value={searchQuery}
                        onChange={(event) => onSearchChange(event.target.value)}
                        placeholder="Search"
                        className="h-12 w-full rounded-[10px] border border-[#D8DDE8] bg-[#F8FAFC] pl-12 pr-4 text-sm text-[#101828] outline-none placeholder:text-[#8A94A6] focus:border-[#C7D7FE] focus:bg-white"
                    />
                </label>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto px-6 pb-4 pt-4">
                {conversations.length > 0 ? (
                    <div className="space-y-1.5">
                        {conversations.map((conversation) => (
                            <MobileInboxItem
                                key={conversation.id}
                                conversation={conversation}
                                onSelect={onSelectConversation}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="flex h-full items-center justify-center text-center text-sm text-[#667085]">
                        No conversations found.
                    </div>
                )}
            </div>

            <MobileHomeIndicator />
        </section>
    );
}
