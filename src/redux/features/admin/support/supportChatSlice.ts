import { createSelector, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/src/redux/store";
import type {
  SupportChatBootstrapPayload,
  SupportChatState,
  SupportConnectionStatus,
  SupportDocumentRequest,
  SupportMessage,
} from "@/src/types/adminSupportChatTypes";

const initialState: SupportChatState = {
  initialized: false,
  connectionStatus: "connecting",
  activeConversationId: null,
  searchQuery: "",
  conversationIds: [],
  conversationsById: {},
  messagesByConversationId: {},
  draftsByConversationId: {},
};

const buildMessageId = (prefix: "admin" | "customer" | "system") =>
  `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

const moveConversationToFront = (ids: string[], conversationId: string) => [
  conversationId,
  ...ids.filter((id) => id !== conversationId),
];

function upsertMessage(
  state: SupportChatState,
  conversationId: string,
  message: SupportMessage,
) {
  if (!state.messagesByConversationId[conversationId]) {
    state.messagesByConversationId[conversationId] = [];
  }

  state.messagesByConversationId[conversationId].push(message);
}

function refreshConversationSnapshot(
  state: SupportChatState,
  conversationId: string,
  message: SupportMessage,
) {
  const conversation = state.conversationsById[conversationId];

  if (!conversation) {
    return;
  }

  conversation.lastMessageAt = message.createdAt;
  conversation.lastMessagePreview =
    message.body.length > 84 ? `${message.body.slice(0, 81)}...` : message.body;
  state.conversationIds = moveConversationToFront(
    state.conversationIds,
    conversationId,
  );
}

const adminSupportChatSlice = createSlice({
  name: "adminSupportChat",
  initialState,
  reducers: {
    hydrateSupportChat(state, action: PayloadAction<SupportChatBootstrapPayload>) {
      if (state.initialized) {
        return;
      }

      const { activeConversationId, conversations, messagesByConversationId } =
        action.payload;

      state.initialized = true;
      state.conversationIds = conversations.map((conversation) => conversation.id);
      state.conversationsById = Object.fromEntries(
        conversations.map((conversation) => [conversation.id, conversation]),
      );
      state.messagesByConversationId = messagesByConversationId;
      state.draftsByConversationId =
        action.payload.draftsByConversationId ??
        Object.fromEntries(conversations.map((conversation) => [conversation.id, ""]));
      state.activeConversationId = activeConversationId;
    },
    setActiveConversation(state, action: PayloadAction<string>) {
      const conversation = state.conversationsById[action.payload];

      if (!conversation) {
        return;
      }

      state.activeConversationId = action.payload;
      conversation.unreadCount = 0;
      conversation.typing = false;
    },
    setSupportSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
    setConversationDraft(
      state,
      action: PayloadAction<{ conversationId: string; value: string }>,
    ) {
      if (!state.conversationsById[action.payload.conversationId]) {
        return;
      }

      state.draftsByConversationId[action.payload.conversationId] =
        action.payload.value;
    },
    markConversationRead(state, action: PayloadAction<string>) {
      const conversation = state.conversationsById[action.payload];

      if (!conversation) {
        return;
      }

      conversation.unreadCount = 0;
    },
    setConversationTyping(
      state,
      action: PayloadAction<{ conversationId: string; typing: boolean }>,
    ) {
      const conversation = state.conversationsById[action.payload.conversationId];

      if (!conversation) {
        return;
      }

      conversation.typing = action.payload.typing;
    },
    setConnectionStatus(state, action: PayloadAction<SupportConnectionStatus>) {
      state.connectionStatus = action.payload;
    },
    sendSupportMessage: {
      reducer(
        state,
        action: PayloadAction<{
          conversationId: string;
          message: SupportMessage;
        }>,
      ) {
        const { conversationId, message } = action.payload;

        if (!state.conversationsById[conversationId]) {
          return;
        }

        upsertMessage(state, conversationId, message);
        refreshConversationSnapshot(state, conversationId, message);
        state.draftsByConversationId[conversationId] = "";
        state.conversationsById[conversationId].typing = false;
      },
      prepare(payload: { conversationId: string; body: string }) {
        const timestamp = new Date().toISOString();

        return {
          payload: {
            conversationId: payload.conversationId,
            message: {
              id: buildMessageId("admin"),
              conversationId: payload.conversationId,
              sender: "admin" as const,
              senderName: "Admin Support",
              body: payload.body.trim(),
              createdAt: timestamp,
              status: "sent" as const,
            },
          },
        };
      },
    },
    sendSupportDocumentRequest: {
      reducer(
        state,
        action: PayloadAction<{
          conversationId: string;
          message: SupportMessage;
        }>,
      ) {
        const { conversationId, message } = action.payload;

        if (!state.conversationsById[conversationId]) {
          return;
        }

        upsertMessage(state, conversationId, message);
        refreshConversationSnapshot(state, conversationId, message);
        state.draftsByConversationId[conversationId] = "";
        state.conversationsById[conversationId].typing = false;
      },
      prepare(payload: {
        conversationId: string;
        documentRequest: SupportDocumentRequest;
      }) {
        const timestamp = new Date().toISOString();
        const documentList = payload.documentRequest.documentTypes.join(", ");
        const body = payload.documentRequest.message?.trim()
          ? payload.documentRequest.message.trim()
          : "Need these documents";

        return {
          payload: {
            conversationId: payload.conversationId,
            message: {
              id: buildMessageId("admin"),
              conversationId: payload.conversationId,
              sender: "admin" as const,
              senderName: "Admin Support",
              body: documentList ? body + ": " + documentList : body,
              createdAt: timestamp,
              status: "sent" as const,
              documentRequest: payload.documentRequest,
            },
          },
        };
      },
    },
    receiveSupportMessage: {
      reducer(
        state,
        action: PayloadAction<{
          conversationId: string;
          message: SupportMessage;
        }>,
      ) {
        const { conversationId, message } = action.payload;
        const conversation = state.conversationsById[conversationId];

        if (!conversation) {
          return;
        }

        upsertMessage(state, conversationId, message);
        refreshConversationSnapshot(state, conversationId, message);
        conversation.typing = false;
        conversation.unreadCount =
          state.activeConversationId === conversationId
            ? 0
            : conversation.unreadCount + 1;
      },
      prepare(payload: {
        conversationId: string;
        body: string;
        senderName: string;
      }) {
        const timestamp = new Date().toISOString();

        return {
          payload: {
            conversationId: payload.conversationId,
            message: {
              id: buildMessageId("customer"),
              conversationId: payload.conversationId,
              sender: "customer" as const,
              senderName: payload.senderName,
              body: payload.body.trim(),
              createdAt: timestamp,
              status: "delivered" as const,
            },
          },
        };
      },
    },
  },
});

export const {
  hydrateSupportChat,
  markConversationRead,
  receiveSupportMessage,
  sendSupportDocumentRequest,
  sendSupportMessage,
  setActiveConversation,
  setConnectionStatus,
  setConversationDraft,
  setConversationTyping,
  setSupportSearchQuery,
} = adminSupportChatSlice.actions;

export default adminSupportChatSlice.reducer;

export const selectAdminSupportChatState = (state: RootState) =>
  state.adminSupportChat;

export const selectSupportConversationList = createSelector(
  [selectAdminSupportChatState],
  (supportChat) =>
    supportChat.conversationIds
      .map((conversationId) => supportChat.conversationsById[conversationId])
      .filter(Boolean),
);

export const selectActiveSupportConversation = createSelector(
  [selectAdminSupportChatState],
  (supportChat) =>
    supportChat.activeConversationId
      ? supportChat.conversationsById[supportChat.activeConversationId] ?? null
      : null,
);
