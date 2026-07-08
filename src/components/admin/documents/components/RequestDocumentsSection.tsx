"use client";

import { useState } from "react";
import { RequestDocumentItem } from "../documentTypes";

type RequestDocumentsSectionProps = {
    documents: RequestDocumentItem[];
    onSendRequest?: (selectedDocuments: RequestDocumentItem[]) => void;
};

export default function RequestDocumentsSection({
    documents,
    onSendRequest,
}: RequestDocumentsSectionProps) {
    const [selectedIds, setSelectedIds] = useState<string[]>(() =>
        documents
            .filter((document) => document.selected)
            .map((document) => document.id),
    );

    const toggleDocument = (documentId: string) => {
        setSelectedIds((previousIds) =>
            previousIds.includes(documentId)
                ? previousIds.filter((id) => id !== documentId)
                : [...previousIds, documentId],
        );
    };

    const selectedDocuments = documents.filter((document) =>
        selectedIds.includes(document.id),
    );

    return (
        <section className="rounded-xl border border-[#E4E7EC] bg-white p-4">
            <div className="flex items-center justify-between gap-3">
                <h3 className="text-base font-semibold text-[#101828]">
                    Request Documents
                </h3>

                <button
                    type="button"
                    onClick={() => onSendRequest?.(selectedDocuments)}
                    className="inline-flex h-8 items-center justify-center rounded-lg border border-[#E4E7EC] bg-white px-3 text-xs font-medium text-[#101828] transition hover:bg-[#F8FAFC] disabled:cursor-not-allowed disabled:opacity-60"
                    disabled={selectedDocuments.length === 0}
                >
                    Send Request
                </button>
            </div>

            <div className="mt-5 space-y-3">
                {documents.map((document) => {
                    const checked = selectedIds.includes(document.id);

                    return (
                        <label
                            key={document.id}
                            className="flex w-fit cursor-pointer items-center gap-2 text-sm font-medium text-[#101828]"
                        >
                            <input
                                type="checkbox"
                                checked={checked}
                                onChange={() => toggleDocument(document.id)}
                                className="h-4 w-4 rounded border-[#D0D5DD] accent-[#2E3A83]"
                            />
                            <span>
                                {document.label}
                                {document.required ? (
                                    <span className="ml-1 text-[#D92D20]">*</span>
                                ) : null}
                            </span>
                        </label>
                    );
                })}
            </div>
        </section>
    );
}
