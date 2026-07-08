import SupportConversationPanel from "@/src/components/admin/support-chat/SupportConversationPanel";
import SupportInboxSidebar from "@/src/components/admin/support-chat/SupportInboxSidebar";
import type {
    CommunicationWorkspaceActions,
    CommunicationWorkspaceData,
} from "../communicationTypes";

type DesktopCommunicationWorkspaceProps = CommunicationWorkspaceData & CommunicationWorkspaceActions;

export default function DesktopCommunicationWorkspace({
    activeConversation,
    activeConversationId,
    activeDraft,
    activeMessages,
    filteredConversations,
    searchQuery,
    selectConversation,
    sendDocumentRequest,
    sendMessage,
    updateDraft,
    updateSearch,
}: DesktopCommunicationWorkspaceProps) {
    return (
        <section className="hidden h-[calc(100vh-132px)] min-h-[620px] overflow-hidden rounded-[22px] border border-[#E4E7EC] bg-white shadow-[0_14px_34px_rgba(16,24,40,0.08)] md:block">
            <div className="grid h-full min-h-0 grid-cols-1 xl:grid-cols-[300px_minmax(0,1fr)]">
                <SupportInboxSidebar
                    activeConversationId={activeConversationId}
                    conversations={filteredConversations}
                    searchQuery={searchQuery}
                    onSearchChange={updateSearch}
                    onSelectConversation={selectConversation}
                />

                <SupportConversationPanel
                    conversation={activeConversation}
                    draft={activeDraft}
                    messages={activeMessages}
                    mode="dispatcher"
                    onDraftChange={updateDraft}
                    onSendMessage={sendMessage}
                    onSendDocumentRequest={sendDocumentRequest}
                />
            </div>
        </section>
    );
}
