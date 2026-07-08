"use client";

import AdminSupportChatProvider from "@/src/components/admin/support-chat/AdminSupportChatProvider";
import SupportConversationPanel from "@/src/components/admin/support-chat/SupportConversationPanel";
import SupportInboxSidebar from "@/src/components/admin/support-chat/SupportInboxSidebar";
import { useAdminSupportChat } from "@/src/hooks/useAdminSupportChat";

function AdminSupportMessageWorkspace() {
  const {
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
  } = useAdminSupportChat();

  return (
    <section className="h-[calc(100vh-132px)] min-h-[620px] overflow-hidden rounded-[22px] border border-[#E4E7EC] bg-white shadow-[0_14px_34px_rgba(16,24,40,0.08)]">
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
          mode="admin"
          onDraftChange={updateDraft}
          onSendMessage={sendMessage}
          onSendDocumentRequest={sendDocumentRequest}
        />
      </div>
    </section>
  );
}

export default function AdminSupportMessageContainer() {
  return (
    <AdminSupportChatProvider>
      <AdminSupportMessageWorkspace />
    </AdminSupportChatProvider>
  );
}
