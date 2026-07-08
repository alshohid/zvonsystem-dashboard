import { formatMessageTimestamp } from "@/src/components/admin/support-chat/supportChatUtils";
import type {
    SupportConversation,
    SupportMessage,
} from "@/src/types/adminSupportChatTypes";
import MobileAdminAvatar from "./MobileAdminAvatar";
import MobileConversationAvatar from "./MobileConversationAvatar";

function MobileDocumentRequestCard({ message }: { message: SupportMessage }) {
    const requestedDocuments = message.documentRequest?.documentTypes ?? [];
    const note = message.documentRequest?.message?.trim() || "Need these documents";

    return (
        <div>
            <p className="mb-2 text-center text-xs font-medium text-[#98A2B3]">
                {formatMessageTimestamp(message.createdAt)}
            </p>
            <div className="flex justify-end">
                <article className="w-[198px] rounded-[10px] bg-[#EEF6FF] px-4 py-3 text-sm text-[#344054]">
                    <h4 className="font-semibold text-[#006AFF]">Document Request</h4>
                    <p className="mt-2 text-[13px] leading-5">{note}</p>
                    {requestedDocuments.length > 0 ? (
                        <div className="mt-3 grid grid-cols-2 gap-2">
                            {requestedDocuments.map((documentType) => (
                                <span
                                    key={documentType}
                                    className="inline-flex h-9 items-center justify-center rounded-[6px] border border-[#D8DDE8] bg-white px-3 text-sm font-medium text-[#101828]"
                                >
                                    {documentType}
                                </span>
                            ))}
                        </div>
                    ) : null}
                </article>
            </div>
        </div>
    );
}

type MobileMessageBubbleProps = {
    conversation: SupportConversation;
    message: SupportMessage;
};

export default function MobileMessageBubble({
    conversation,
    message,
}: MobileMessageBubbleProps) {
    if (message.sender === "system") {
        return (
            <div className="flex justify-center">
                <span className="rounded-full bg-[#F2F4F7] px-3 py-1 text-xs text-[#667085]">
                    {message.body}
                </span>
            </div>
        );
    }

    if (message.documentRequest) {
        return <MobileDocumentRequestCard message={message} />;
    }

    const isOutgoing = message.sender === "admin";

    return (
        <div>
            <p className="mb-2 text-center text-xs font-medium text-[#98A2B3]">
                {formatMessageTimestamp(message.createdAt)}
            </p>
            <div className={`flex items-end gap-2 ${isOutgoing ? "justify-end" : "justify-start"}`}>
                {!isOutgoing ? (
                    <MobileConversationAvatar
                        conversation={conversation}
                        className="h-6 w-6"
                        fallbackClassName="text-[10px]"
                    />
                ) : null}

                <div
                    className={`max-w-[76%] rounded-[10px] px-4 py-2.5 text-[15px] leading-6 ${
                        isOutgoing
                            ? "rounded-br-[3px] bg-[#313A8A] text-white"
                            : "rounded-bl-[3px] bg-[#F2F4F7] text-[#101828]"
                    }`}
                >
                    {message.body}
                </div>

                {isOutgoing ? <MobileAdminAvatar /> : null}
            </div>
        </div>
    );
}
