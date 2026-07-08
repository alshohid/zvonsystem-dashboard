export type SupportConnectionStatus = "connecting" | "connected" | "offline";

export type SupportConversationStatus = "active" | "waiting" | "resolved";
export type SupportConversationPriority = "high" | "medium" | "low";
export type SupportMessageSender = "admin" | "customer" | "system";
export type SupportMessageStatus = "sent" | "delivered" | "read";

export type SupportChatViewMode = "admin" | "dispatcher";

export type SupportQuickAction = {
  id: string;
  label: string;
  message: string;
  tone?: "primary" | "secondary";
};

export type SupportDocumentRequest = {
  documentTypes: string[];
  message?: string;
};

export type SupportConversation = {
  id: string;
  participantName: string;
  participantEmail: string;
  participantRoleLabel: string;
  carrierName: string;
  loadReference: string;
  initials: string;
  avatarColor: string;
  notes: string;
  etaLabel: string;
  unreadCount: number;
  online: boolean;
  typing: boolean;
  priority: SupportConversationPriority;
  status: SupportConversationStatus;
  quickActions: SupportQuickAction[];
  lastMessagePreview: string;
  lastMessageAt: string;
};

export type SupportMessage = {
  id: string;
  conversationId: string;
  sender: SupportMessageSender;
  senderName: string;
  body: string;
  createdAt: string;
  status: SupportMessageStatus;
  documentRequest?: SupportDocumentRequest;
};

export type SupportChatBootstrapPayload = {
  activeConversationId: string;
  conversations: SupportConversation[];
  messagesByConversationId: Record<string, SupportMessage[]>;
  draftsByConversationId?: Record<string, string>;
};

export type SupportChatState = {
  initialized: boolean;
  connectionStatus: SupportConnectionStatus;
  activeConversationId: string | null;
  searchQuery: string;
  conversationIds: string[];
  conversationsById: Record<string, SupportConversation>;
  messagesByConversationId: Record<string, SupportMessage[]>;
  draftsByConversationId: Record<string, string>;
};
