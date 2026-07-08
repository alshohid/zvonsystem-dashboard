import { ArrowLeft, Phone } from "lucide-react";
import type {
    SupportConversation,
    SupportMessage,
} from "@/src/types/adminSupportChatTypes";
import MobileComposer from "./MobileComposer";
import MobileConversationAvatar from "./MobileConversationAvatar";
import MobileHomeIndicator from "./MobileHomeIndicator";
import MobileMessageList from "./MobileMessageList";
import MobileQuickActionBar from "./MobileQuickActionBar";

type MobileConversationViewProps = {
    conversation: SupportConversation | null;
    draft: string;
    messages: SupportMessage[];
    onBack: () => void;
    onDraftChange: (value: string) => void;
    onRequestDocuments: () => void;
    onSendMessage: (body: string) => void;
};

export default function MobileConversationView({
    conversation,
    draft,
    messages,
    onBack,
    onDraftChange,
    onRequestDocuments,
    onSendMessage,
}: MobileConversationViewProps) {
    if (!conversation) {
        return (
            <section className="flex h-full flex-col bg-white">
                <div className="flex flex-1 items-center justify-center px-8 text-center text-sm text-[#667085]">
                    Select a conversation to start chatting.
                </div>
                <MobileHomeIndicator />
            </section>
        );
    }

    return (
        <section className="flex h-full min-h-0 flex-col bg-white">
            <header className="shrink-0 border-b border-[#EAECF0] px-5 pb-3 pt-2">
                <div className="flex items-center justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-3">
                        <button
                            type="button"
                            onClick={onBack}
                            className="-ml-2 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[#101828] transition active:bg-[#F2F4F7]"
                            aria-label="Back to conversations"
                        >
                            <ArrowLeft className="h-5 w-5" />
                        </button>

                        <div className="relative shrink-0">
                            <MobileConversationAvatar conversation={conversation} className="h-11 w-11" />
                            {conversation.online ? (
                                <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-[#0A7CFF]" />
                            ) : null}
                        </div>

                        <div className="min-w-0">
                            <h2 className="truncate text-[16px] font-semibold leading-5 text-[#101828]">
                                {conversation.participantName}
                            </h2>
                            <p className="mt-1 truncate text-xs leading-4 text-[#98A2B3]">
                                {conversation.carrierName} • {conversation.participantRoleLabel} • {conversation.participantEmail}
                            </p>
                        </div>
                    </div>

                    <button
                        type="button"
                        className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[#101828] transition active:bg-[#F2F4F7]"
                        aria-label="Call participant"
                    >
                        <Phone className="h-5 w-5" />
                    </button>
                </div>
            </header>

            <MobileQuickActionBar
                conversation={conversation}
                onRequestDocuments={onRequestDocuments}
            />
            <MobileMessageList conversation={conversation} messages={messages} />
            <MobileComposer
                draft={draft}
                onDraftChange={onDraftChange}
                onSend={onSendMessage}
            />
            <MobileHomeIndicator />
        </section>
    );
}
