"use client";

import { startTransition, useDeferredValue, useEffect, useMemo } from "react";
import {
  markConversationRead,
  selectActiveSupportConversation,
  selectSupportConversationList,
  sendSupportDocumentRequest,
  sendSupportMessage,
  setActiveConversation,
  setConversationDraft,
  setSupportSearchQuery,
} from "@/src/redux/features/admin/support/supportChatSlice";
import type { SupportDocumentRequest } from "@/src/types/adminSupportChatTypes";
import { useAppDispatch, useAppSelector } from "@/src/redux/store";

export function useAdminSupportChat() {
  const dispatch = useAppDispatch();

  const conversations = useAppSelector(selectSupportConversationList);
  const activeConversation = useAppSelector(selectActiveSupportConversation);
  const activeConversationId = useAppSelector(
    (state) => state.adminSupportChat.activeConversationId,
  );
  const connectionStatus = useAppSelector(
    (state) => state.adminSupportChat.connectionStatus,
  );
  const searchQuery = useAppSelector((state) => state.adminSupportChat.searchQuery);
  const draftsByConversationId = useAppSelector(
    (state) => state.adminSupportChat.draftsByConversationId,
  );
  const activeMessages = useAppSelector((state) =>
    activeConversationId
      ? state.adminSupportChat.messagesByConversationId[activeConversationId] ?? []
      : [],
  );

  const deferredQuery = useDeferredValue(searchQuery);

  const filteredConversations = useMemo(() => {
    const normalizedQuery = deferredQuery.trim().toLowerCase();

    return conversations
      .filter((conversation) => {
        if (!normalizedQuery) {
          return true;
        }

        return [
          conversation.participantName,
          conversation.participantEmail,
          conversation.participantRoleLabel,
          conversation.carrierName,
          conversation.loadReference,
          conversation.lastMessagePreview,
        ].some((value) => value.toLowerCase().includes(normalizedQuery));
      })
      .sort(
        (left, right) =>
          new Date(right.lastMessageAt).getTime() -
          new Date(left.lastMessageAt).getTime(),
      );
  }, [conversations, deferredQuery]);

  const unreadCount = useMemo(
    () =>
      conversations.reduce(
        (total, conversation) => total + conversation.unreadCount,
        0,
      ),
    [conversations],
  );

  const activeDraft = activeConversationId
    ? draftsByConversationId[activeConversationId] ?? ""
    : "";

  useEffect(() => {
    if (!activeConversationId) {
      return;
    }

    dispatch(markConversationRead(activeConversationId));
  }, [activeConversationId, dispatch]);

  const updateSearch = (value: string) => {
    startTransition(() => {
      dispatch(setSupportSearchQuery(value));
    });
  };

  const selectConversation = (conversationId: string) => {
    startTransition(() => {
      dispatch(setActiveConversation(conversationId));
    });
  };

  const updateDraft = (value: string) => {
    if (!activeConversationId) {
      return;
    }

    dispatch(setConversationDraft({ conversationId: activeConversationId, value }));
  };

  const sendMessage = (body: string) => {
    if (!activeConversationId) {
      return false;
    }

    const normalizedBody = body.trim();

    if (!normalizedBody) {
      return false;
    }

    dispatch(
      sendSupportMessage({
        conversationId: activeConversationId,
        body: normalizedBody,
      }),
    );

    return true;
  };

  const sendDocumentRequest = (documentRequest: SupportDocumentRequest) => {
    if (!activeConversationId || documentRequest.documentTypes.length === 0) {
      return false;
    }

    dispatch(
      sendSupportDocumentRequest({
        conversationId: activeConversationId,
        documentRequest,
      }),
    );

    return true;
  };

  return {
    activeConversation,
    activeConversationId,
    activeDraft,
    activeMessages,
    connectionStatus,
    conversations,
    filteredConversations,
    onlineCount: conversations.filter((conversation) => conversation.online).length,
    resolvedCount: conversations.filter(
      (conversation) => conversation.status === "resolved",
    ).length,
    searchQuery,
    totalConversations: conversations.length,
    unreadCount,
    selectConversation,
    sendDocumentRequest,
    sendMessage,
    updateDraft,
    updateSearch,
  };
}
