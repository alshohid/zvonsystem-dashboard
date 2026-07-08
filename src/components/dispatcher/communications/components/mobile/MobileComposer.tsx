import { Paperclip, SendHorizonal } from "lucide-react";

type MobileComposerProps = {
    draft: string;
    onDraftChange: (value: string) => void;
    onSend: (body: string) => void;
};

export default function MobileComposer({
    draft,
    onDraftChange,
    onSend,
}: MobileComposerProps) {
    const handleSend = () => {
        if (!draft.trim()) {
            return;
        }

        onSend(draft);
    };

    return (
        <div className="shrink-0 border-t border-[#EAECF0] bg-white px-5 pb-4 pt-3">
            <div className="flex items-center gap-3">
                <button
                    type="button"
                    className="inline-flex h-9 w-7 shrink-0 items-center justify-center text-[#101828]"
                    aria-label="Attach file"
                >
                    <Paperclip className="h-5 w-5" />
                </button>

                <div className="flex min-w-0 flex-1 items-center rounded-full border border-[#E4E7EC] bg-white px-4 shadow-[0_8px_18px_rgba(16,24,40,0.04)]">
                    <input
                        value={draft}
                        onChange={(event) => onDraftChange(event.target.value)}
                        onKeyDown={(event) => {
                            if (event.key === "Enter") {
                                event.preventDefault();
                                handleSend();
                            }
                        }}
                        placeholder="Type your message"
                        className="h-11 min-w-0 flex-1 border-0 bg-transparent text-sm text-[#101828] outline-none placeholder:text-[#8A94A6]"
                    />

                    {draft.trim() ? (
                        <button
                            type="button"
                            onClick={handleSend}
                            className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#313A8A] text-white"
                            aria-label="Send message"
                        >
                            <SendHorizonal className="h-4 w-4" />
                        </button>
                    ) : null}
                </div>
            </div>
        </div>
    );
}
