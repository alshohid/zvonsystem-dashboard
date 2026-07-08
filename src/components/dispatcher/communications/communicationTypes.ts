import type {
    SupportConversation,
    SupportDocumentRequest,
    SupportMessage,
} from "@/src/types/adminSupportChatTypes";

export type CommunicationWorkspaceData = {
    activeConversation: SupportConversation | null;
    activeConversationId: string | null;
    activeDraft: string;
    activeMessages: SupportMessage[];
    filteredConversations: SupportConversation[];
    searchQuery: string;
};

export type CommunicationWorkspaceActions = {
    selectConversation: (conversationId: string) => void;
    sendDocumentRequest: (documentRequest: SupportDocumentRequest) => boolean;
    sendMessage: (body: string) => boolean;
    updateDraft: (value: string) => void;
    updateSearch: (value: string) => void;
};
