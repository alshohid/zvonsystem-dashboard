"use client";

import { useEffect, useRef } from "react";
import SupportMessageBubble from "@/src/components/admin/support-chat/SupportMessageBubble";
import SupportTypingIndicator from "@/src/components/admin/support-chat/SupportTypingIndicator";
import type {
  SupportChatViewMode,
  SupportConversation,
  SupportMessage,
} from "@/src/types/adminSupportChatTypes";

type SupportMessageListProps = {
  conversation: SupportConversation;
  isParticipantTyping: boolean;
  messages: SupportMessage[];
  mode?: SupportChatViewMode;
};

function SupportIssueCard({ conversation }: { conversation: SupportConversation }) {
  return (
    <div className="flex justify-start">
      <article className="max-w-[92%] rounded-[10px] bg-[#EEF6FF] px-4 py-4 text-sm text-[#344054] sm:max-w-[55%]">
        <h4 className="text-sm font-semibold text-[#006AFF]">
          Issue with Delivery Route Assignment
        </h4>
        <dl className="mt-3 grid grid-cols-[48px_1fr] gap-x-3 gap-y-1 text-xs leading-5 text-[#344054]">
          <dt>From</dt>
          <dd>: {conversation.participantName}</dd>
          <dt>Email</dt>
          <dd>: {conversation.participantEmail}</dd>
          <dt>Role</dt>
          <dd>: {conversation.participantRoleLabel}</dd>
          <dt>Subject</dt>
          <dd>: System error</dd>
          <dt>Sent</dt>
          <dd>: 12 February, 2026</dd>
        </dl>
        <p className="mt-3 leading-6">
          Some deliveries aren&apos;t being assigned correctly, and drivers can&apos;t see updated routes. Please check.
        </p>
        <p className="mt-3">Thanks.</p>
      </article>
    </div>
  );
}

export default function SupportMessageList({
  conversation,
  isParticipantTyping,
  messages,
  mode = "admin",
}: SupportMessageListProps) {
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
  }, [messages.length, isParticipantTyping]);

  return (
    <div
      ref={scrollContainerRef}
      className="min-h-0 flex-1 overflow-y-auto bg-white px-4 py-5 sm:px-6"
    >
      <div className="space-y-7">
        {mode === "admin" ? <SupportIssueCard conversation={conversation} /> : null}

        {messages.map((message) => (
          <SupportMessageBubble key={message.id} message={message} />
        ))}

        {isParticipantTyping ? <SupportTypingIndicator /> : null}
      </div>
    </div>
  );
}
