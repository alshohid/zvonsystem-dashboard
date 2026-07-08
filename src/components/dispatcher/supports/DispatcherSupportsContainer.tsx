"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import ContactSupportCard from "./ContactSupportCard";
import SupportFaqSection from "./SupportFaqSection";
import SupportResponseCard from "./SupportResponseCard";
import {
    dispatcherSupportFaqs,
    dispatcherSupportResponses,
    emptyContactSupportForm,
} from "./supportMockData";
import type { ContactSupportForm, SupportFaq, SupportResponse } from "./supportTypes";

type DispatcherSupportsContainerProps = {
    faqs?: SupportFaq[];
    responses?: SupportResponse[];
    initialContactForm?: ContactSupportForm;
};

export default function DispatcherSupportsContainer({
    faqs = dispatcherSupportFaqs,
    responses = dispatcherSupportResponses,
    initialContactForm = emptyContactSupportForm,
}: DispatcherSupportsContainerProps) {
    const latestSupportResponse = responses[0] ?? null;
    const [openFaqId, setOpenFaqId] = useState<string | null>(null);
    const [isReplying, setIsReplying] = useState(false);
    const [contactForm, setContactForm] = useState<ContactSupportForm>(initialContactForm);
    const [replyMessage, setReplyMessage] = useState("");

    const handleToggleFaq = (faqId: string) => {
        setOpenFaqId((currentFaqId) => (currentFaqId === faqId ? null : faqId));
    };

    const handleContactSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setContactForm(initialContactForm);
    };

    const handleReplySubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!replyMessage.trim()) {
            return;
        }
        setReplyMessage("");
        setIsReplying(false);
    };

    const handleCancelReply = () => {
        setReplyMessage("");
        setIsReplying(false);
    };

    return (
        <main className="w-full max-w-full space-y-4 overflow-x-hidden bg-white pb-8 text-[#101828]">
            <SupportFaqSection
                faqs={faqs}
                openFaqId={openFaqId}
                onToggleFaq={handleToggleFaq}
            />

            {latestSupportResponse ? (
                <SupportResponseCard
                    response={latestSupportResponse}
                    isReplying={isReplying}
                    replyMessage={replyMessage}
                    onReplyClick={() => setIsReplying(true)}
                    onCancelReply={handleCancelReply}
                    onReplyMessageChange={setReplyMessage}
                    onReplySubmit={handleReplySubmit}
                />
            ) : (
                <ContactSupportCard
                    form={contactForm}
                    onChange={setContactForm}
                    onSubmit={handleContactSubmit}
                />
            )}
        </main>
    );
}
