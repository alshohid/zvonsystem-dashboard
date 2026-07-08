"use client";

import { useMemo, useState } from "react";
import { Modal } from "@/src/components/ui/modal";

const documentOptions = ["POD", "BOL", "Lumper", "Rate Con", "Scale", "Fuel"];

type SupportRequestDocumentModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (payload: { documentTypes: string[]; message?: string }) => void;
};

export default function SupportRequestDocumentModal({
  isOpen,
  onClose,
  onSubmit,
}: SupportRequestDocumentModalProps) {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [message, setMessage] = useState("");

  const canSubmit = selectedTypes.length > 0;
  const placeholder = useMemo(
    () =>
      selectedTypes.length > 0
        ? "Add any extra detail for the driver or dispatcher..."
        : "Select a document type first...",
    [selectedTypes.length],
  );

  const toggleType = (type: string) => {
    setSelectedTypes((currentTypes) =>
      currentTypes.includes(type)
        ? currentTypes.filter((currentType) => currentType !== type)
        : [...currentTypes, type],
    );
  };

  const handleClose = () => {
    setSelectedTypes([]);
    setMessage("");
    onClose();
  };

  const handleSubmit = () => {
    if (!canSubmit) {
      return;
    }

    onSubmit({
      documentTypes: selectedTypes,
      message: message.trim() || undefined,
    });
    handleClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      className="mx-4 my-6 w-full max-w-[426px] rounded-[14px] border border-[#E4E7EC] bg-white p-5 shadow-[0_24px_90px_rgba(16,24,40,0.22)] sm:p-6"
      contentBgClassName="bg-white"
      textClassName="text-[#101828]"
      overlayClassName="bg-[rgba(16,24,40,0.28)] backdrop-blur-[4px]"
      showCloseButton={false}
    >
      <div>
        <div className="text-center">
          <h2 className="text-lg font-semibold text-[#101828]">Request Document</h2>
          <p className="mt-2 text-sm text-[#667085] sm:text-base">
            Send a message requesting a specific document
          </p>
        </div>

        <div className="mt-7">
          <p className="text-base font-semibold text-[#101828]">Document Type</p>
          <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
            {documentOptions.map((type) => {
              const isSelected = selectedTypes.includes(type);

              return (
                <button
                  key={type}
                  type="button"
                  onClick={() => toggleType(type)}
                  className={[
                    "inline-flex h-9 items-center justify-center rounded-[7px] border px-3 text-sm font-medium transition",
                    isSelected
                      ? "border-[#2F3A8C] bg-[#2F3A8C] text-white"
                      : "border-[#E4E7EC] bg-white text-[#8A94A6] hover:border-[#C7D2FE] hover:text-[#2F3A8C]",
                  ].join(" ")}
                >
                  {type}
                </button>
              );
            })}
          </div>
        </div>

        <label
          htmlFor="support-request-document-message"
          className="mt-7 block text-base font-semibold text-[#101828]"
        >
          Custom Message (optional)
        </label>
        <textarea
          id="support-request-document-message"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder={placeholder}
          rows={4}
          className="mt-2 min-h-[72px] w-full resize-none rounded-[8px] border border-[#D8DDE8] bg-[#F8FAFC] px-3 py-3 text-sm text-[#101828] outline-none placeholder:text-[#98A2B3] focus:border-[#2F3A8C] focus:bg-white focus:ring-2 focus:ring-[#2F3A8C]/10"
        />

        <div className="mt-7 grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={handleClose}
            className="inline-flex h-12 items-center justify-center rounded-[9px] border border-[#E4E7EC] bg-white px-4 text-sm font-semibold text-[#2F3A8C] transition hover:bg-[#F8FAFC]"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!canSubmit}
            className="inline-flex h-12 items-center justify-center rounded-[9px] bg-[#2F3A8C] px-4 text-sm font-semibold text-white transition hover:bg-[#273174] disabled:cursor-not-allowed disabled:bg-[#C9D0E8]"
          >
            Send
          </button>
        </div>
      </div>
    </Modal>
  );
}
