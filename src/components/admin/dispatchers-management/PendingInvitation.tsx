"use client";

import { Check, Copy, Trash2 } from "lucide-react";
import { useState } from "react";

export type PendingInvitationRecord = {
    id: string;
    email: string;
    sentAtLabel: string;
    inviteUrl: string;
};

type PendingInvitationProps = {
    invitations: PendingInvitationRecord[];
    onDelete: (invitationId: string) => void;
};

async function copyToClipboard(text: string) {
    if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
        return;
    }

    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.setAttribute("readonly", "true");
    textArea.style.position = "absolute";
    textArea.style.left = "-9999px";
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
}

export default function PendingInvitation({
    invitations,
    onDelete,
}: PendingInvitationProps) {
    const [copiedId, setCopiedId] = useState<string | null>(null);

    const handleCopy = async (invitation: PendingInvitationRecord) => {
        try {
            await copyToClipboard(invitation.inviteUrl);
            setCopiedId(invitation.id);
            window.setTimeout(() => {
                setCopiedId((currentId) =>
                    currentId === invitation.id ? null : currentId,
                );
            }, 1800);
        } catch {
            setCopiedId(null);
        }
    };

    return (
        <section className="rounded-[1.5rem] border border-[#E4E7EC] bg-[#F8FAFC] p-4 shadow-[0_1px_2px_rgba(16,24,40,0.04)] sm:p-6">
            <div className="space-y-4 sm:space-y-5">
                <h2 className="text-[1.5rem] font-semibold tracking-[-0.03em] text-[#101828]">
                    Sent Pending Invitation ({invitations.length})
                </h2>

                {invitations.length === 0 ? (
                    <div className="rounded-[1rem] border border-dashed border-[#D7DDE8] bg-white px-5 py-8 text-center text-sm text-[#667085]">
                        No pending invitations yet.
                    </div>
                ) : (
                    invitations.map((invitation) => (
                        <article
                            key={invitation.id}
                            className="flex flex-col gap-4 rounded-2xl border border-[#D7DDE8] bg-white p-4 shadow-[0_1px_2px_rgba(16,24,40,0.03)] md:flex-row md:items-center md:justify-between md:px-5 md:py-5"
                        >
                            <div className="min-w-0">
                                <h3 className="truncate text-[1.25rem] font-semibold text-[#101828] sm:text-[1.35rem]">
                                    {invitation.email}
                                </h3>
                                <p className="mt-1 text-base text-[#6B7280]">
                                    {invitation.sentAtLabel}
                                </p>
                            </div>

                            <div className="flex flex-wrap items-center gap-3 md:justify-end">
                                <button
                                    type="button"
                                    onClick={() => handleCopy(invitation)}
                                    className="inline-flex h-11 items-center gap-2 rounded-[1rem] border border-[#D7DDE8] bg-white px-4 text-base font-medium text-[#344054] transition hover:bg-[#F8FAFC] sm:h-12 sm:px-5"
                                >
                                    {copiedId === invitation.id ? (
                                        <Check size={18} className="text-[#16A34A]" />
                                    ) : (
                                        <Copy size={18} />
                                    )}
                                    {copiedId === invitation.id ? "Copied!" : "Copy Invite Link"}
                                </button>

                                <button
                                    type="button"
                                    onClick={() => onDelete(invitation.id)}
                                    className="inline-flex h-11 w-11 items-center justify-center rounded-[1rem] text-[#FF4D5E] transition hover:bg-[#FFF1F3] sm:h-12 sm:w-12"
                                    aria-label={`Delete invitation for ${invitation.email}`}
                                >
                                    <Trash2 size={22} />
                                </button>
                            </div>
                        </article>
                    ))
                )}
            </div>
        </section>
    );
}
