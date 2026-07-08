import type { SupportConversation } from "@/src/types/adminSupportChatTypes";

export const mobileConversationAvatars: Record<string, string> = {
    "support-mandy": "/images/user/user_01.png",
    "support-jennifer": "/images/user/user_02.png",
    "support-robinson": "/images/user/user_03.png",
    "support-jacob": "/images/user/user_04.png",
    "support-olivia": "/images/user/user_05.png",
};

const mobileConversationNames: Record<string, string> = {
    "support-jennifer": "Jennifer",
    "support-robinson": "Robinson",
};

export function getMobileConversationName(conversation: SupportConversation) {
    return mobileConversationNames[conversation.id] ?? conversation.participantName;
}
