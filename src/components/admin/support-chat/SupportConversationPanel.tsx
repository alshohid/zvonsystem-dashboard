"use client";

import { useState } from "react";
import SupportConversationHeader from "@/src/components/admin/support-chat/SupportConversationHeader";
import SupportMessageComposer from "@/src/components/admin/support-chat/SupportMessageComposer";
import SupportMessageList from "@/src/components/admin/support-chat/SupportMessageList";
import SupportQuickActionBar from "@/src/components/admin/support-chat/SupportQuickActionBar";
import SupportRequestDocumentModal from "@/src/components/admin/support-chat/SupportRequestDocumentModal";
import type {
  SupportChatViewMode,
  SupportConversation,
  SupportDocumentRequest,
  SupportMessage,
} from "@/src/types/adminSupportChatTypes";

type SupportConversationPanelProps = {
  conversation: SupportConversation | null;
  draft: string;
  messages: SupportMessage[];
  mode?: SupportChatViewMode;
  onDraftChange: (value: string) => void;
  onSendMessage: (body: string) => void;
  onSendDocumentRequest?: (documentRequest: SupportDocumentRequest) => void;
};

export default function SupportConversationPanel({
  conversation,
  draft,
  messages,
  mode = "admin",
  onDraftChange,
  onSendMessage,
  onSendDocumentRequest,
}: SupportConversationPanelProps) {
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);

  if (!conversation) {
    return (
      <div className="flex h-full min-h-0 items-center justify-center bg-white p-8">
        <div className="max-w-md rounded-[28px] border border-dashed border-[#D0D5DD] bg-[#FCFCFD] px-8 py-10 text-center">
          <h3 className="text-lg font-semibold text-[#101828]">
            Select a conversation
          </h3>
          <p className="mt-2 text-sm leading-6 text-[#667085]">
            Once a thread is selected, the mocked live chat panel, templates, and
            composer will appear here.
          </p>
        </div>
      </div>
    );
  }

  const isDispatcherMode = mode === "dispatcher";

  return (
    <section className="flex h-full min-h-0 flex-col overflow-hidden bg-white">
      <SupportConversationHeader conversation={conversation} mode={mode} />
      {isDispatcherMode ? (
        <SupportQuickActionBar
          actions={conversation.quickActions}
          onRequestDocuments={() => setIsRequestModalOpen(true)}
        />
      ) : null}
      <SupportMessageList
        conversation={conversation}
        messages={messages}
        mode={mode}
        isParticipantTyping={conversation.typing}
      />
      <SupportMessageComposer
        draft={draft}
        onDraftChange={onDraftChange}
        onSend={onSendMessage}
      />

      <SupportRequestDocumentModal
        isOpen={isRequestModalOpen}
        onClose={() => setIsRequestModalOpen(false)}
        onSubmit={(payload) => {
          onSendDocumentRequest?.(payload);
        }}
      />
    </section>
  );
}
