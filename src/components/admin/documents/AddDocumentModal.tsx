"use client";

import { useState } from "react";
import { Check, Plus, X } from "lucide-react";
import { Modal } from "../../ui/modal";
import SelectField, { SelectOption } from "../../ui/input/searchInput/SelectField";
import FileDropzone from "./components/FileDropzone";
import SignatureCaptureModal, {
    SignatureValue,
} from "./components/SignatureCaptureModal";

type AddDocumentModalProps = {
    isOpen: boolean;
    onClose: () => void;
    carrierOptions: SelectOption[];
    documentTypeOptions: SelectOption[];
};

export default function AddDocumentModal({
    isOpen,
    onClose,
    carrierOptions,
    documentTypeOptions,
}: AddDocumentModalProps) {
    const [carrier, setCarrier] = useState("");
    const [documentType, setDocumentType] = useState("");
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const [signature, setSignature] = useState<SignatureValue | null>(null);
    const [needsDispatcherSignature, setNeedsDispatcherSignature] = useState(true);
    const [signatureModalOpen, setSignatureModalOpen] = useState(false);

    const resetForm = () => {
        setCarrier("");
        setDocumentType("");
        setUploadedFile(null);
        setSignature(null);
        setNeedsDispatcherSignature(true);
        setSignatureModalOpen(false);
    };

    const handleClose = () => {
        resetForm();
        onClose();
    };

    const handleSubmit = () => {
        console.log("Add document", {
            carrier,
            documentType,
            uploadedFile,
            signature,
            needsDispatcherSignature,
        });
        handleClose();
    };

    return (
        <>
            <Modal
                isOpen={isOpen}
                onClose={handleClose}
                className="mx-4 my-6 max-h-[calc(100vh-2rem)] w-full max-w-[800px] overflow-y-auto rounded-xl border border-[#E4E7EC] bg-white p-6 shadow-[0_24px_80px_rgba(16,24,40,0.24)] sm:p-7"
                contentBgClassName="bg-white"
                textClassName="text-[#101828]"
                overlayClassName="bg-[rgba(16,24,40,0.28)] backdrop-blur-[4px]"
                showCloseButton={false}
            >
                <div className="space-y-7">
                    <div className="flex items-start justify-between gap-4">
                        <h2 className="text-2xl font-semibold text-[#20232D] sm:text-[1.75rem]">
                            Add Document
                        </h2>

                        <button
                            type="button"
                            onClick={handleClose}
                            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#E4E7EC] bg-white text-[#101828] shadow-[0_8px_24px_rgba(16,24,40,0.08)] transition hover:bg-[#F8FAFC]"
                            aria-label="Close add document modal"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>

                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                        <SelectField
                            label="Carrier"
                            placeholder="Choose Carrier"
                            value={carrier}
                            onChange={setCarrier}
                            options={carrierOptions}
                            labelClassName="mb-2 block text-lg font-medium text-[#101828]"
                            selectClassName="h-[54px] rounded-xl border-[#D8DDE8] bg-white px-3.5 text-lg font-normal text-[#101828] placeholder:text-[#98A2B3] focus:border-[#2E3A83]"
                        />

                        <SelectField
                            label="Document type"
                            placeholder="Choose Document type"
                            value={documentType}
                            onChange={setDocumentType}
                            options={documentTypeOptions}
                            labelClassName="mb-2 block text-lg font-medium text-[#101828]"
                            selectClassName="h-[54px] rounded-xl border-[#D8DDE8] bg-white px-3.5 text-lg font-normal text-[#101828] placeholder:text-[#98A2B3] focus:border-[#2E3A83]"
                        />
                    </div>

                    <FileDropzone
                        file={uploadedFile}
                        onFileChange={setUploadedFile}
                    />

                    <button
                        type="button"
                        onClick={() => setSignatureModalOpen(true)}
                        className={[
                            "inline-flex h-[58px] w-full items-center justify-center gap-3 rounded-xl border px-4 text-lg font-semibold transition",
                            signature
                                ? "border-[#BFE7CB] bg-[#F6FEF9] text-[#027A48]"
                                : "border-[#D8DDE8] bg-[#F8FAFC] text-[#20232D] hover:bg-[#F2F4F7]",
                        ].join(" ")}
                    >
                        {signature ? (
                            <>
                                <Check className="h-5 w-5" />
                                Signature Added ({signature.mode})
                            </>
                        ) : (
                            <>
                                <Plus className="h-5 w-5" />
                                Add Signature
                            </>
                        )}
                    </button>

                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <p className="text-lg font-semibold text-[#101828]">
                            Need dispatcher&apos;s Signature?
                        </p>

                        <button
                            type="button"
                            role="switch"
                            aria-checked={needsDispatcherSignature}
                            onClick={() =>
                                setNeedsDispatcherSignature((previous) => !previous)
                            }
                            className={[
                                "relative inline-flex h-9 w-[66px] shrink-0 items-center rounded-full p-1 transition",
                                needsDispatcherSignature ? "bg-[#2E3A83]" : "bg-[#D0D5DD]",
                            ].join(" ")}
                        >
                            <span
                                className={[
                                    "h-7 w-7 rounded-full bg-white shadow transition-transform",
                                    needsDispatcherSignature
                                        ? "translate-x-[30px]"
                                        : "translate-x-0",
                                ].join(" ")}
                            />
                        </button>
                    </div>

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                        <button
                            type="button"
                            onClick={handleClose}
                            className="inline-flex h-[58px] items-center justify-center rounded-xl border border-[#D8DDE8] bg-white px-5 text-lg font-semibold text-[#20232D] transition hover:bg-[#F8FAFC]"
                        >
                            Cancel
                        </button>

                        <button
                            type="button"
                            onClick={handleSubmit}
                            className="inline-flex h-[58px] items-center justify-center rounded-xl bg-[#2E3A83] px-5 text-lg font-semibold text-white transition hover:bg-[#25306F]"
                        >
                            Add Document
                        </button>
                    </div>
                </div>
            </Modal>

            <SignatureCaptureModal
                isOpen={signatureModalOpen}
                onClose={() => setSignatureModalOpen(false)}
                onSave={setSignature}
            />
        </>
    );
}
