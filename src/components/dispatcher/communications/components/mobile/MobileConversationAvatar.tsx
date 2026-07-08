import Image from "next/image";
import { Avatar, AvatarFallback } from "@/src/components/ui/avatar";
import type { SupportConversation } from "@/src/types/adminSupportChatTypes";
import { mobileConversationAvatars } from "../../communicationMobileConfig";

type MobileConversationAvatarProps = {
    conversation: SupportConversation;
    className?: string;
    fallbackClassName?: string;
};

export default function MobileConversationAvatar({
    conversation,
    className = "h-11 w-11",
    fallbackClassName = "text-sm",
}: MobileConversationAvatarProps) {
    const avatarSrc = mobileConversationAvatars[conversation.id];

    if (!avatarSrc) {
        return (
            <Avatar className={className}>
                <AvatarFallback
                    className={`${fallbackClassName} font-semibold text-white`}
                    style={{ backgroundColor: conversation.avatarColor }}
                >
                    {conversation.initials}
                </AvatarFallback>
            </Avatar>
        );
    }

    return (
        <span className={`${className} relative block shrink-0 overflow-hidden rounded-full bg-[#E4E7EC]`}>
            <Image
                src={avatarSrc}
                alt={`${conversation.participantName} avatar`}
                width={64}
                height={64}
                className="h-full w-full object-cover"
            />
        </span>
    );
}
