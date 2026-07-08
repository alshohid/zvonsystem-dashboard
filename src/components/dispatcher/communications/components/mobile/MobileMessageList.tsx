"use client";

import { useEffect, useRef } from "react";
import type {
    SupportConversation,
    SupportMessage,
} from "@/src/types/adminSupportChatTypes";
import MobileConversationAvatar from "./MobileConversationAvatar";
import MobileMessageBubble from "./MobileMessageBubble";

type MobileMessageListProps = {
    conversation: SupportConversation;
    messages: SupportMessage[];
};

export default function MobileMessageList({
    conversation,
    messages,
}: MobileMessageListProps) {
    const scrollContainerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const container = scrollContainerRef.current;

        if (!container) {
            return;
        }

        container.scrollTo({
            top: container.scrollHeight,
            behavior: "smooth",
        });
    }, [conversation.typing, messages.length]);

    return (
        <div ref={scrollContainerRef} className="min-h-0 flex-1 overflow-y-auto px-5 py-3">
            <div className="space-y-4 pb-3">
                {messages.map((message) => (
                    <MobileMessageBubble
                        key={message.id}
                        conversation={conversation}
                        message={message}
                    />
                ))}

                {conversation.typing ? (
                    <div className="flex items-center gap-2 text-xs font-medium text-[#98A2B3]">
                        <MobileConversationAvatar
                            conversation={conversation}
                            className="h-6 w-6"
                            fallbackClassName="text-[10px]"
                        />
                        Typing...
                    </div>
                ) : null}
            </div>
        </div>
    );
}
