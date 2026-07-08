"use client";

import { Paperclip, SendHorizonal } from "lucide-react";

type SupportMessageComposerProps = {
  draft: string;
  onDraftChange: (value: string) => void;
  onSend: (body: string) => void;
};

export default function SupportMessageComposer({
  draft,
  onDraftChange,
  onSend,
}: SupportMessageComposerProps) {
  const handleSubmit = () => {
    if (!draft.trim()) {
      return;
    }

    onSend(draft);
  };

  return (
    <div className="shrink-0 border-t border-[#EAECF0] bg-white px-4 py-4 sm:px-6">
      <div className="rounded-[14px] border border-[#E4E7EC] bg-white px-3 py-2 shadow-[0_8px_20px_rgba(16,24,40,0.04)]">
        <div className="flex items-end gap-2">
          <button
            type="button"
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[#98A2B3] transition hover:bg-[#F2F4F7] hover:text-[#667085]"
            aria-label="Attachment placeholder"
          >
            <Paperclip className="h-4 w-4" />
          </button>

          <textarea
            value={draft}
            onChange={(event) => onDraftChange(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                handleSubmit();
              }
            }}
            rows={1}
            placeholder="Type a message..."
            className="max-h-32 min-h-[40px] flex-1 resize-none border-0 bg-transparent px-1 py-2 text-sm text-[#101828] outline-none placeholder:text-[#98A2B3]"
          />

          <button
            type="button"
            onClick={handleSubmit}
            disabled={!draft.trim()}
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-[#EEE9FF] text-[#B7A5FF] transition hover:bg-[#E6DDFF] hover:text-[#8B6DFF] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <SendHorizonal className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
