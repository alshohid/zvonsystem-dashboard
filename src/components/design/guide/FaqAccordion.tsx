"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import type { IFaqItem } from "@/src/types/guideTypes";

type FaqAccordionProps = {
  faqs: IFaqItem[];
};

export default function FaqAccordion({ faqs }: FaqAccordionProps) {
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id ?? null);

  return (
    <section className="rounded-[24px] border border-[#E7EBF7] bg-white shadow-[0_18px_45px_rgba(46,58,131,0.06)]">
      {faqs.map((faq) => {
        const isOpen = faq.id === openId;

        return (
          <div key={faq.id} className="border-b border-[#F1F3F9] px-5 last:border-b-0 sm:px-6">
            <button
              type="button"
              onClick={() => setOpenId(isOpen ? null : faq.id)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 py-5 text-left"
            >
              <span
                className={`text-sm sm:text-base ${
                  isOpen ? "font-semibold text-[#101828]" : "font-medium text-[#344054]"
                }`}
              >
                {faq.question}
              </span>
              {isOpen ? (
                <Minus size={18} className="shrink-0 text-[#101828]" />
              ) : (
                <Plus size={18} className="shrink-0 text-[#667085]" />
              )}
            </button>

            {isOpen && (
              <p className="pb-5 text-sm leading-6 text-[#667085] sm:pr-10">{faq.answer}</p>
            )}
          </div>
        );
      })}

      {faqs.length === 0 && (
        <p className="p-6 text-center text-sm text-[#667085]">No FAQs available yet.</p>
      )}
    </section>
  );
}
