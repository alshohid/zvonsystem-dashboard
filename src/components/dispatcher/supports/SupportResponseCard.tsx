import type { FormEvent } from "react";
import type { SupportResponse } from "./supportTypes";

type SupportResponseCardProps = {
    response: SupportResponse;
    isReplying: boolean;
    replyMessage: string;
    onReplyClick: () => void;
    onCancelReply: () => void;
    onReplyMessageChange: (message: string) => void;
    onReplySubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export default function SupportResponseCard({
    response,
    isReplying,
    replyMessage,
    onReplyClick,
    onCancelReply,
    onReplyMessageChange,
    onReplySubmit,
}: SupportResponseCardProps) {
    return (
        <section className="rounded-lg border border-[#E4E7EC] bg-white p-3 sm:p-5">
            <h2 className="text-base font-semibold leading-6 text-[#101828]">Response Message</h2>

            <div className="mt-2 min-w-0 rounded-md border border-[#E4E7EC] bg-white px-3 py-3 sm:px-4">
                <dl className="grid max-w-full grid-cols-[52px_12px_minmax(0,1fr)] gap-y-1 text-sm leading-5 sm:max-w-[360px]">
                    <dt className="font-medium text-[#101828]">From</dt>
                    <dd className="text-center text-[#101828]">:</dd>
                    <dd className="min-w-0 break-words text-[#344054]">{response.from}</dd>

                    <dt className="font-medium text-[#101828]">Role</dt>
                    <dd className="text-center text-[#101828]">:</dd>
                    <dd className="min-w-0 break-words text-[#344054]">{response.role}</dd>

                    <dt className="font-medium text-[#101828]">Subject</dt>
                    <dd className="text-center text-[#101828]">:</dd>
                    <dd className="min-w-0 break-words text-[#344054]">{response.subject}</dd>

                    <dt className="font-medium text-[#101828]">Sent</dt>
                    <dd className="text-center text-[#101828]">:</dd>
                    <dd className="min-w-0 break-words text-xs text-[#98A2B3]">{response.sentAt}</dd>
                </dl>

                <p className="mt-4 max-w-[940px] break-words text-sm leading-6 text-[#1D2939]">
                    {response.message}
                </p>
            </div>

            <div className="mt-3">
                <button
                    type="button"
                    onClick={onReplyClick}
                    className="inline-flex h-10 w-full min-w-[135px] items-center justify-center rounded-lg bg-[#2E3A83] px-5 text-sm font-semibold text-white transition hover:bg-[#25306F] focus:outline-none focus:ring-2 focus:ring-[#2E3A83]/25 sm:w-auto"
                >
                    Reply Message
                </button>
            </div>

            {isReplying ? (
                <form onSubmit={onReplySubmit} className="mt-3">
                    <label htmlFor="reply-message" className="text-sm font-semibold leading-5 text-[#101828]">
                        Reply Message to Admin
                    </label>
                    <textarea
                        id="reply-message"
                        value={replyMessage}
                        onChange={(event) => onReplyMessageChange(event.target.value)}
                        placeholder="Ask question, report an issue to solve."
                        rows={4}
                        required
                        className="mt-2 min-h-[96px] w-full resize-none rounded-md border border-[#E4E7EC] bg-[#F8F9FB] px-3 py-2 text-sm leading-5 text-[#101828] outline-none placeholder:text-[#98A2B3] focus:border-[#2E3A83] focus:bg-white focus:ring-2 focus:ring-[#2E3A83]/10"
                    />
                    <div className="mt-3 flex flex-col gap-2 sm:flex-row">
                        <button
                            type="submit"
                            className="inline-flex h-10 w-full min-w-[135px] items-center justify-center rounded-lg bg-[#2E3A83] px-5 text-sm font-semibold text-white transition hover:bg-[#25306F] focus:outline-none focus:ring-2 focus:ring-[#2E3A83]/25 sm:w-auto"
                        >
                            Send Reply
                        </button>
                        <button
                            type="button"
                            onClick={onCancelReply}
                            className="inline-flex h-10 w-full min-w-[100px] items-center justify-center rounded-lg border border-[#D0D5DD] bg-white px-5 text-sm font-semibold text-[#344054] transition hover:bg-[#F8F9FB] focus:outline-none focus:ring-2 focus:ring-[#2E3A83]/10 sm:w-auto"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            ) : null}
        </section>
    );
}
