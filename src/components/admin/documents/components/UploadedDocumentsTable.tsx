"use client";

import { useState } from "react";
import { FileSearch } from "lucide-react";
import { DocumentRecord } from "../documentTypes";
import DocumentImagePreviewModal from "./DocumentImagePreviewModal";
import DocumentStatusBadge from "./DocumentStatusBadge";

type UploadedDocumentsTableProps = {
    documents: DocumentRecord[];
    onOpenDocument?: (document: DocumentRecord) => void;
    previewPersonLabel?: string;
    previewImageSrc?: string;
    previewFallbackImageSrc?: string;
};

export default function UploadedDocumentsTable({
    documents,
    onOpenDocument,
    previewPersonLabel = "Dispatcher",
    previewImageSrc,
    previewFallbackImageSrc,
}: UploadedDocumentsTableProps) {
    const [previewDocument, setPreviewDocument] = useState<DocumentRecord | null>(null);

    const openDocumentPreview = (document: DocumentRecord) => {
        onOpenDocument?.(document);
        setPreviewDocument(document);
    };

    return (
        <>
            <section className="rounded-xl border border-[#E4E7EC] bg-white p-4">
                <div>
                    <h3 className="text-base font-semibold text-[#101828]">
                        Uploaded Documents
                    </h3>
                    <p className="mt-1 text-xs text-[#101828]">
                        View full documents to approve or reject.
                    </p>
                </div>

                <div className="mt-4 overflow-hidden rounded-lg border border-[#E4E7EC]">
                    <table className="w-full border-separate border-spacing-0 text-left">
                        <thead>
                            <tr className="bg-[#F8FAFC]">
                                <th className="border-b border-[#EAECF0] px-3 py-3 text-xs font-medium text-[#667085]">
                                    Document
                                </th>
                                <th className="border-b border-[#EAECF0] px-3 py-3 text-xs font-medium text-[#667085]">
                                    Date
                                </th>
                                <th className="border-b border-[#EAECF0] px-3 py-3 text-xs font-medium text-[#667085]">
                                    Status
                                </th>
                                <th className="w-12 border-b border-[#EAECF0] px-3 py-3 text-right text-xs font-medium text-[#667085]" />
                            </tr>
                        </thead>
                        <tbody>
                            {documents.length > 0 ? (
                                documents.map((document) => (
                                    <tr
                                        key={document.id}
                                        className="bg-white transition hover:bg-[#FCFCFD]"
                                    >
                                        <td className="border-b border-[#EAECF0] px-3 py-4 text-sm text-[#101828]">
                                            <span className="block max-w-[220px] break-words">
                                                {document.type}
                                            </span>
                                        </td>
                                        <td className="whitespace-nowrap border-b border-[#EAECF0] px-3 py-4 text-sm text-[#344054]">
                                            {document.date}
                                        </td>
                                        <td className="border-b border-[#EAECF0] px-3 py-4 text-sm text-[#101828]">
                                            <DocumentStatusBadge status={document.status} />
                                        </td>
                                        <td className="border-b border-[#EAECF0] px-3 py-4 text-right text-sm text-[#101828]">
                                            <button
                                                type="button"
                                                onClick={(event) => {
                                                    event.preventDefault();
                                                    event.stopPropagation();
                                                    openDocumentPreview(document);
                                                }}
                                                className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-[#667085] transition hover:bg-[#F2F4F7] hover:text-[#344054] focus:outline-none focus:ring-2 focus:ring-[#2E3A83]/20"
                                                aria-label={"View " + document.type}
                                            >
                                                <FileSearch className="h-4 w-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan={4}
                                        className="px-5 py-10 text-center text-sm text-[#667085]"
                                    >
                                        No uploaded documents found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </section>

            <DocumentImagePreviewModal
                isOpen={Boolean(previewDocument)}
                onClose={() => setPreviewDocument(null)}
                document={previewDocument}
                personLabel={previewPersonLabel}
                imageSrc={previewImageSrc}
                fallbackImageSrc={previewFallbackImageSrc}
            />
        </>
    );
}
