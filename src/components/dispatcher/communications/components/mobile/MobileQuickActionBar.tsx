import { FileText } from "lucide-react";
import type { SupportConversation } from "@/src/types/adminSupportChatTypes";

type MobileQuickActionBarProps = {
    conversation: SupportConversation;
    onRequestDocuments: () => void;
};

export default function MobileQuickActionBar({
    conversation,
    onRequestDocuments,
}: MobileQuickActionBarProps) {
    if (!conversation.quickActions.length) {
        return null;
    }

    const promptAction = conversation.quickActions[0];
    const buttonAction = conversation.quickActions[1] ?? conversation.quickActions[0];

    return (
        <div className="border-b border-[#EAECF0] px-5 py-3">
            <div className="flex items-center justify-between gap-3 rounded-[8px] border border-[#BFD8FF] bg-[#EEF6FF] p-2">
                <div className="inline-flex min-w-0 items-center gap-2 text-sm font-medium text-[#006AFF]">
                    <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-[6px] bg-white text-[#006AFF]">
                        <FileText className="h-4 w-4" />
                    </span>
                    <span className="truncate">{promptAction.label}</span>
                </div>

                <button
                    type="button"
                    onClick={onRequestDocuments}
                    className="inline-flex h-9 shrink-0 items-center justify-center rounded-[7px] bg-[#006AFF] px-5 text-sm font-medium text-white shadow-[0_8px_16px_rgba(0,106,255,0.18)] transition active:bg-[#0055D4]"
                >
                    {buttonAction.label.replace(" Documents", "")}
                </button>
            </div>
        </div>
    );
}
