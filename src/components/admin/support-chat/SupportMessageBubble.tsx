import { cn } from "@/lib/utils";
import { formatMessageTimestamp } from "@/src/components/admin/support-chat/supportChatUtils";
import type { SupportMessage } from "@/src/types/adminSupportChatTypes";

type SupportMessageBubbleProps = {
  message: SupportMessage;
};

function DocumentRequestCard({ message }: { message: SupportMessage }) {
  const requestedDocuments = message.documentRequest?.documentTypes ?? [];
  const note = message.documentRequest?.message?.trim() || "Need these documents";

  return (
    <div className="flex justify-end">
      <article className="w-full max-w-[86%] rounded-[12px] bg-[#EEF6FF] px-4 py-4 text-sm text-[#344054] sm:max-w-[58%]">
        <h4 className="font-semibold text-[#006AFF]">Document Request</h4>
        <p className="mt-2 leading-5">{note}</p>
        {requestedDocuments.length > 0 ? (
          <div className="mt-3 grid grid-cols-2 gap-2">
            {requestedDocuments.map((documentType) => (
              <span
                key={documentType}
                className="inline-flex h-9 items-center justify-center rounded-[7px] border border-[#D8DDE8] bg-white px-4 text-sm font-medium text-[#101828]"
              >
                {documentType}
              </span>
            ))}
          </div>
        ) : null}
        <p className="mt-2 text-[11px] font-medium text-[#98A2B3]">
          {formatMessageTimestamp(message.createdAt)}
        </p>
      </article>
    </div>
  );
}

export default function SupportMessageBubble({
  message,
}: SupportMessageBubbleProps) {
  if (message.sender === "system") {
    return (
      <div className="flex justify-center">
        <span className="rounded-full border border-[#D0D5DD] bg-white px-3 py-1 text-xs font-medium text-[#667085]">
          {message.body}
        </span>
      </div>
    );
  }

  if (message.documentRequest) {
    return <DocumentRequestCard message={message} />;
  }

  const isAdminMessage = message.sender === "admin";

  return (
    <div className={cn("flex", isAdminMessage ? "justify-end" : "justify-start")}>
      <div className="max-w-[86%] sm:max-w-[64%]">
        <div
          className={cn(
            "rounded-[14px] px-4 py-3 text-sm leading-6 shadow-[0_8px_18px_rgba(16,24,40,0.04)]",
            isAdminMessage
              ? "rounded-br-[4px] bg-[#313A8A] text-white"
              : "rounded-bl-[4px] bg-[#F2F4F7] text-[#344054]",
          )}
        >
          <p>{message.body}</p>
          <div
            className={cn(
              "mt-1.5 text-[11px] font-medium",
              isAdminMessage ? "text-white/70" : "text-[#98A2B3]",
            )}
          >
            {formatMessageTimestamp(message.createdAt)}
          </div>
        </div>
      </div>
    </div>
  );
}
