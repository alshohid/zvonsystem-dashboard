import { ChevronDown } from "lucide-react";
import type { SupportFaq } from "./supportTypes";

type SupportFaqSectionProps = {
    faqs: SupportFaq[];
    openFaqId: string | null;
    onToggleFaq: (faqId: string) => void;
};

export default function SupportFaqSection({
    faqs,
    openFaqId,
    onToggleFaq,
}: SupportFaqSectionProps) {
    return (
        <section className="rounded-lg border border-[#E4E7EC] bg-white p-3 sm:p-5">
            <h1 className="text-base font-semibold leading-6 text-[#101828]">
                Frequently Asked Questions
            </h1>

            <div className="mt-3 space-y-2">
                {faqs.map((faq) => {
                    const isOpen = openFaqId === faq.id;

                    return (
                        <div
                            key={faq.id}
                            className="min-w-0 overflow-hidden rounded-md border border-[#E4E7EC] bg-[#F8F9FB]"
                        >
                            <button
                                type="button"
                                aria-expanded={isOpen}
                                onClick={() => onToggleFaq(faq.id)}
                                className="flex min-h-10 w-full items-center justify-between gap-3 px-3 py-2 text-left text-sm font-normal leading-5 text-[#101828] transition hover:bg-[#F2F4F7]"
                            >
                                <span className="min-w-0 flex-1 break-words">{faq.question}</span>
                                <ChevronDown
                                    aria-hidden="true"
                                    className={`h-4 w-4 shrink-0 text-[#101828] transition-transform ${isOpen ? "rotate-180" : ""}`}
                                />
                            </button>

                            {isOpen ? (
                                <p className="break-words border-t border-[#E4E7EC] bg-white px-3 py-2 text-sm leading-5 text-[#475467]">
                                    {faq.answer}
                                </p>
                            ) : null}
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
