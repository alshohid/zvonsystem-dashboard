"use client";

import { Modal } from "../../ui/modal";
import {
    getUserInformationItems,
    requestDocumentOptions,
} from "./documentMockData";
import { DocumentRecord } from "./documentTypes";
import OnboardingUserInformation from "./components/OnboardingUserInformation";
import RequestDocumentsSection from "./components/RequestDocumentsSection";
import UploadedDocumentsTable from "./components/UploadedDocumentsTable";

type OnboardingDocumentsModalProps = {
    isOpen: boolean;
    onClose: () => void;
    document: DocumentRecord | null;
    uploadedDocuments: DocumentRecord[];
    userType: string;
    onOpenDocument?: (document: DocumentRecord) => void;
};

export default function OnboardingDocumentsModal({
    isOpen,
    onClose,
    document,
    uploadedDocuments,
    userType,
    onOpenDocument,
}: OnboardingDocumentsModalProps) {
    if (!document) {
        return null;
    }

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            className="mx-4 my-6 max-h-[calc(100vh-2rem)] w-full max-w-[608px] overflow-y-auto rounded-[10px] border border-[#E4E7EC] bg-white p-4 shadow-[0_20px_70px_rgba(16,24,40,0.22)] sm:p-5"
            contentBgClassName="bg-white"
            textClassName="text-[#101828]"
            overlayClassName="bg-[rgba(16,24,40,0.28)] backdrop-blur-[4px]"
            showCloseButton={false}
        >
            <div className="space-y-4">
                <h2 className="text-center text-lg font-semibold text-[#101828]">
                    Onboarding Documents
                </h2>

                <OnboardingUserInformation
                    items={getUserInformationItems(document, userType)}
                />

                <UploadedDocumentsTable
                    documents={uploadedDocuments}
                    previewPersonLabel={userType}
                    onOpenDocument={(selectedDocument) => {
                        console.log("Open uploaded document", selectedDocument.id);
                        onOpenDocument?.(selectedDocument);
                    }}
                />

                <RequestDocumentsSection
                    key={document.id}
                    documents={requestDocumentOptions}
                    onSendRequest={(selectedDocuments) =>
                        console.log("Send document request", {
                            documentId: document.id,
                            selectedDocuments,
                        })
                    }
                />
            </div>
        </Modal>
    );
}
