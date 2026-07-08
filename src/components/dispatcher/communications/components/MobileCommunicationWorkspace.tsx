"use client";

import { useState } from "react";
import SupportRequestDocumentModal from "@/src/components/admin/support-chat/SupportRequestDocumentModal";
import type { SupportDocumentRequest } from "@/src/types/adminSupportChatTypes";
import type {
    CommunicationWorkspaceActions,
    CommunicationWorkspaceData,
} from "../communicationTypes";
import MobileConversationView from "./mobile/MobileConversationView";
import MobileInboxView from "./mobile/MobileInboxView";

type MobileCommunicationWorkspaceProps = CommunicationWorkspaceData & CommunicationWorkspaceActions;

export default function MobileCommunicationWorkspace({
    activeConversation,
    activeDraft,
    activeMessages,
    filteredConversations,
    searchQuery,
    selectConversation,
    sendDocumentRequest,
    sendMessage,
    updateDraft,
    updateSearch,
}: MobileCommunicationWorkspaceProps) {
    const [isConversationOpen, setIsConversationOpen] = useState(false);
    const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);

    const handleConversationSelect = (conversationId: string) => {
        selectConversation(conversationId);
        setIsConversationOpen(true);
    };

    const handleDocumentRequest = (payload: SupportDocumentRequest) => {
        sendDocumentRequest(payload);
    };

    return (
        <>
            <section className="-m-4 h-[calc(100dvh-72px)] min-h-[620px] overflow-hidden bg-white md:hidden">
                {isConversationOpen ? (
                    <MobileConversationView
                        conversation={activeConversation}
                        draft={activeDraft}
                        messages={activeMessages}
                        onBack={() => setIsConversationOpen(false)}
                        onDraftChange={updateDraft}
                        onRequestDocuments={() => setIsRequestModalOpen(true)}
                        onSendMessage={sendMessage}
                    />
                ) : (
                    <MobileInboxView
                        conversations={filteredConversations}
                        searchQuery={searchQuery}
                        onSearchChange={updateSearch}
                        onSelectConversation={handleConversationSelect}
                    />
                )}
            </section>

            <SupportRequestDocumentModal
                isOpen={isRequestModalOpen}
                onClose={() => setIsRequestModalOpen(false)}
                onSubmit={handleDocumentRequest}
            />
        </>
    );
}
