"use client";

import Image from "next/image";
import { useState } from "react";
import { Modal } from "../../../ui/modal";
import { DocumentRecord } from "../documentTypes";

type DocumentImagePreviewModalProps = {
    isOpen: boolean;
    onClose: () => void;
    document: DocumentRecord | null;
    imageSrc?: string;
    fallbackImageSrc?: string;
    personLabel?: string;
};

export default function DocumentImagePreviewModal({
    isOpen,
    onClose,
    document,
    imageSrc = "/images/auth/signed_image.png",
    fallbackImageSrc = "/images/auth/signed_image.png",
    personLabel = "Dispatcher",
}: DocumentImagePreviewModalProps) {
    const [previewImageSrc, setPreviewImageSrc] = useState(imageSrc);

    if (!document) {
        return null;
    }

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            className="mx-3 my-6 max-h-[calc(100vh-2rem)] w-full max-w-[752px] overflow-y-auto rounded-xl border border-[#E4E7EC] bg-white p-4 shadow-[0_24px_80px_rgba(16,24,40,0.24)] sm:p-5"
            contentBgClassName="bg-white"
            textClassName="text-[#101828]"
            overlayClassName="bg-[rgba(16,24,40,0.30)] backdrop-blur-[4px]"
            showCloseButton={false}
        >
            <div className="space-y-4">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0">
                        <h3 className="text-base font-semibold text-[#101828]">
                            {document?.type}
                        </h3>
                        <div className="mt-1 space-y-0.5 text-sm text-[#101828]">
                            <p>
                                <span>Carrier: </span>
                                <span className="font-semibold">{document?.carrier}</span>
                            </p>
                            <p>
                                <span>{personLabel}: </span>
                                <span className="font-semibold">{document?.dispatcher}</span>
                            </p>
                            <p>
                                <span>Date: </span>
                                <span className="font-semibold">{document?.date}</span>
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 sm:min-w-[254px]">
                        <button
                            type="button"
                            onClick={() => console.log("Reject document", document?.id)}
                            className="inline-flex h-9 items-center justify-center rounded-md border border-[#F7D5D8] bg-[#FEF0F2] px-5 text-sm font-medium text-[#B42318] transition hover:bg-[#FEE4E2]"
                        >
                            Reject
                        </button>
                        <button
                            type="button"
                            onClick={() => console.log("Approve document", document?.id)}
                            className="inline-flex h-9 items-center justify-center rounded-md border border-[#BFE7CB] bg-[#DFF3E7] px-5 text-sm font-medium text-[#027A48] transition hover:bg-[#D1FADF]"
                        >
                            Approve
                        </button>
                    </div>
                </div>

                <div className="overflow-hidden rounded-lg border border-[#D9DCE5] bg-[#F3F5FA] p-2 sm:p-3">
                    <div className="relative mx-auto aspect-[1.72/1] min-h-[230px] w-full overflow-hidden rounded-md bg-white sm:min-h-[360px]">
                        <Image
                            src={previewImageSrc}
                            alt={document?.type + " preview"}
                            fill
                            priority
                            sizes="(max-width: 640px) 94vw, 720px"
                            className="object-contain"
                            onError={() => {
                                if (previewImageSrc !== fallbackImageSrc) {
                                    setPreviewImageSrc(fallbackImageSrc);
                                }
                            }}
                        />
                    </div>
                </div>
            </div>
        </Modal>
    );
}
