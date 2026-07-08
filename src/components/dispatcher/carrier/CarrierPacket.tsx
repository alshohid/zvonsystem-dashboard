import { useState } from 'react';
import { Check, Download, FileText, Mail, Send, Upload, X } from 'lucide-react';
import toast from 'react-hot-toast';
import { Modal } from '../../ui/modal';
import { CarrierUploadedDocumentCard } from './CarrierUploadedDocumentCard';
import { DocuSignUploadRow } from './DocuSignUploadRow';

type RequestDocumentItem = {
  id: string;
  title: string;
  description: string;
  required?: boolean;
  optional?: boolean;
  signature?: boolean;
  defaultChecked?: boolean;
};

const REQUEST_DOCUMENTS: RequestDocumentItem[] = [
  {
    id: 'certificate-insurance',
    title: 'Certificate of Insurance',
    description: 'Cargo insurance certificate ($100k Minimum)',
    required: true,
    defaultChecked: true,
  },
  {
    id: 'mc-authority',
    title: 'MC Authority',
    description: 'Motor carrier operating documentation',
    required: true,
    defaultChecked: true,
  },
  {
    id: 'void-check',
    title: 'Void Check / Direct Deposit Form',
    description: 'Banking information for payment setup',
    optional: true,
    defaultChecked: true,
  },
  {
    id: 'w9-form',
    title: 'W-9 Form',
    description: 'Tax identification form required for payment processing',
    required: true,
    signature: true,
    defaultChecked: true,
  },
  {
    id: 'carrier-contract',
    title: 'Carrier Contract',
    description: 'Signed carrier-broker agreement/contact',
    required: true,
    signature: true,
  },
  {
    id: 'limited-power-attorney',
    title: 'Limited Power of Attorney',
    description: 'Signed Limited Power of Attorney',
    required: true,
    signature: true,
  },
  {
    id: 'driver-list',
    title: 'Driver List',
    description: 'List of authorized drivers with CDL information',
  },
  {
    id: 'equipment-list',
    title: 'Equipment List',
    description: 'List of authorized trucks and trailers with VINs',
  },
];

export function CarrierPacket() {
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [isAccessModalOpen, setIsAccessModalOpen] = useState(false);

  const handleUploadSignedDocuments = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const files = event.target.files;

    if (!files?.length) return;

    toast.success('Signed documents selected successfully');
  };

  return (
    <>
      <div className="rounded-2xl border border-[#E9EDF5] bg-white p-4 shadow-[0_1px_2px_#1018280A] md:p-5">
        <div className="mb-6 flex flex-col justify-end gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => setIsRequestModalOpen(true)}
            className="inline-flex h-10 items-center justify-center rounded-[8px] border border-[#E5E7EB] bg-white px-5 text-[14px] font-medium text-[#2F3E9E] transition hover:bg-[#F8FAFF]"
          >
            Request Documents
          </button>

          <button
            type="button"
            onClick={() => setIsAccessModalOpen(true)}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-[8px] bg-[#2F3E9E] px-5 text-[14px] font-medium text-white transition hover:bg-[#26358F]"
          >
            <Send className="h-4 w-4" />
            Send Onboarding Portal Access
          </button>
        </div>

        <div className="rounded-[10px] border border-[#E5E7EB] bg-white p-5">
          <div>
            <h2 className="text-[20px] font-semibold text-[#111827]">
              Uploads From Carrier Portal - Pending Review
            </h2>

            <p className="mt-1 max-w-[880px] text-[14px] leading-5 text-[#667085]">
              Documents uploaded by the carrier through their onboarding app.
              Review and approve to add them to the carrier&apos;s document.
            </p>

            <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
              <CarrierUploadedDocumentCard
                label="MC Authority"
                fileName="MC Authority.pdf"
                fileSize="827 KB"
              />

              <CarrierUploadedDocumentCard
                label="Void Check"
                fileName="Void Check.pdf"
                fileSize="827 KB"
              />
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-[20px] font-semibold text-[#111827]">
              Finalize DocuSign Contracts
            </h2>

            <p className="mt-1 text-[14px] leading-5 text-[#667085]">
              Upload the completed documents received from DocuSign to finalize
              the carrier&apos;s profile.
            </p>

            <div className="mt-5 space-y-4">
              <DocuSignUploadRow
                label="Carrier Contract"
                onFileSelect={() => {}}
                onRemove={() => {}}
              />

              <DocuSignUploadRow
                label="W-9"
                onFileSelect={() => {}}
                onRemove={() => {}}
              />

              <DocuSignUploadRow
                label="Limited Power of Attorney"
                onFileSelect={() => {}}
                onRemove={() => {}}
              />
            </div>

            <div className="mt-6 flex justify-end">
              <label className="inline-flex h-11 cursor-pointer items-center justify-center gap-2 rounded-[8px] bg-[#2F3E9E] px-5 text-[14px] font-medium text-white transition hover:bg-[#26358F]">
                <Upload className="h-4 w-4" />
                Upload Signed Documents
                <input
                  type="file"
                  multiple
                  className="hidden"
                  onChange={handleUploadSignedDocuments}
                />
              </label>
            </div>
          </div>
        </div>
      </div>

      <RequestDocumentsModal
        isOpen={isRequestModalOpen}
        onClose={() => setIsRequestModalOpen(false)}
      />

      <SendOnboardingAccessModal
        isOpen={isAccessModalOpen}
        onClose={() => setIsAccessModalOpen(false)}
      />
    </>
  );
}



function RequestDocumentsModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [selectedDocumentIds, setSelectedDocumentIds] = useState<string[]>(
    REQUEST_DOCUMENTS.filter(item => item.defaultChecked).map(item => item.id),
  );
  const [customMessage, setCustomMessage] = useState('');

  const handleToggleDocument = (id: string) => {
    setSelectedDocumentIds(prev =>
      prev.includes(id) ? prev.filter(itemId => itemId !== id) : [...prev, id],
    );
  };

  const handleSendRequest = () => {
    if (!selectedDocumentIds.length) {
      toast.error('Please select at least one document');
      return;
    }

    toast.success('Document request sent via email');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      showCloseButton={false}
      className="max-w-[620px] rounded-[12px] p-0 shadow-[0_20px_60px_#00000026]"
      contentBgClassName="bg-white"
      textClassName="text-[#111827]"
      overlayClassName="bg-[#100F0F59] backdrop-blur-[4px]"
    >
      <div className="p-6">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-[20px] font-semibold text-[#111827]">
            Select Documents to Request
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-[#E5E7EB] text-[#111827] transition hover:bg-[#F9FAFB]"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="space-y-3">
          {REQUEST_DOCUMENTS.map(document => {
            const isChecked = selectedDocumentIds.includes(document.id);

            return (
              <button
                key={document.id}
                type="button"
                onClick={() => handleToggleDocument(document.id)}
                className="flex w-full items-start gap-3 rounded-[8px] border border-[#E5E7EB] bg-white p-3 text-left transition hover:border-[#C7D2FE] hover:bg-[#F8FAFF]"
              >
                <span
                  className={`mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-[4px] border ${
                    isChecked
                      ? 'border-[#22C55E] bg-[#22C55E]'
                      : 'border-[#E5E7EB] bg-white'
                  }`}
                >
                  {isChecked && <Check className="h-3.5 w-3.5 text-white" />}
                </span>

                <span className="min-w-0 flex-1">
                  <span className="block text-[14px] font-semibold text-[#111827]">
                    {document.title}
                  </span>

                  <span className="mt-1 block text-[12px] leading-4 text-[#98A2B3]">
                    {document.description}
                  </span>
                </span>

                <span className="flex shrink-0 flex-wrap justify-end gap-1.5">
                  {document.signature && (
                    <span className="rounded-full border border-[#F59E0B] bg-[#FFFBEB] px-2 py-0.5 text-[11px] font-medium text-[#D97706]">
                      Signature
                    </span>
                  )}

                  {document.required && (
                    <span className="rounded-full border border-[#F04438] bg-[#FFF5F5] px-2 py-0.5 text-[11px] font-medium text-[#F04438]">
                      Required
                    </span>
                  )}

                  {document.optional && (
                    <span className="rounded-full border border-[#F59E0B] bg-[#FFFBEB] px-2 py-0.5 text-[11px] font-medium text-[#D97706]">
                      Optional
                    </span>
                  )}
                </span>
              </button>
            );
          })}
        </div>

        <div className="mt-5">
          <label className="mb-2 block text-[14px] font-semibold text-[#111827]">
            Custom Message (optional)
          </label>

          <textarea
            value={customMessage}
            onChange={event => setCustomMessage(event.target.value)}
            placeholder="Write a custom message to the carrier/driver."
            className="h-[72px] w-full resize-none rounded-[8px] border border-[#E5E7EB] bg-[#F8FAFC] px-3 py-2 text-[13px] text-[#111827] outline-none placeholder:text-[#98A2B3] focus:border-[#C7D2FE]"
          />
        </div>

        <div className="mt-6 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onClose}
            className="h-11 min-w-[160px] rounded-[8px] border border-[#E5E7EB] bg-white px-5 text-[14px] font-medium text-[#2F3E9E] transition hover:bg-[#F9FAFB]"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSendRequest}
            className="h-11 min-w-[260px] rounded-[8px] bg-[#2F3E9E] px-5 text-[14px] font-medium text-white transition hover:bg-[#26358F]"
          >
            Send Document Request Via Email
          </button>
        </div>
      </div>
    </Modal>
  );
}

function SendOnboardingAccessModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [communicationChannel, setCommunicationChannel] = useState<
    'resend' | 'work-email'
  >('resend');
  const [password, setPassword] = useState('');

  const handleSendCredentials = () => {
    if (!password.trim()) {
      toast.error('Please enter carrier password');
      return;
    }

    toast.success('Onboarding portal access sent successfully');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      showCloseButton={false}
      className="max-w-[540px] rounded-[12px] p-0 shadow-[0_20px_60px_#00000026]"
      contentBgClassName="bg-white"
      textClassName="text-[#111827]"
      overlayClassName="bg-[#100F0F59] backdrop-blur-[4px]"
    >
      <div className="p-6">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-[20px] font-semibold text-[#111827]">
            Send Carrier Onboarding App Access
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-[#E5E7EB] text-[#111827] transition hover:bg-[#F9FAFB]"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="rounded-[8px] border border-[#E5E7EB] bg-[#F8FAFC] p-4">
          <p className="text-[14px] text-[#111827]">
            <span className="font-semibold">Carrier:</span> ABC Transport
          </p>

          <p className="mt-1 text-[14px] text-[#111827]">
            <span className="font-semibold">Email:</span> abc@gmail.com
          </p>
        </div>

        <div className="mt-5">
          <h3 className="mb-3 text-[14px] font-semibold text-[#111827]">
            Communication Channel
          </h3>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => setCommunicationChannel('resend')}
              className={`flex h-[84px] flex-col items-center justify-center rounded-[8px] border text-[14px] font-semibold transition ${
                communicationChannel === 'resend'
                  ? 'border-[#2F3E9E] bg-[#F8FAFF] text-[#2F3E9E]'
                  : 'border-[#E5E7EB] bg-white text-[#111827] hover:bg-[#F9FAFB]'
              }`}
            >
              <Mail className="mb-2 h-5 w-5" />
              Resend
            </button>

            <button
              type="button"
              onClick={() => setCommunicationChannel('work-email')}
              className={`flex h-[84px] flex-col items-center justify-center rounded-[8px] border text-[14px] font-semibold transition ${
                communicationChannel === 'work-email'
                  ? 'border-[#2F3E9E] bg-[#F8FAFF] text-[#2F3E9E]'
                  : 'border-[#E5E7EB] bg-white text-[#111827] hover:bg-[#F9FAFB]'
              }`}
            >
              <Mail className="mb-2 h-5 w-5" />
              Work Email
            </button>
          </div>
        </div>

        <div className="mt-5">
          <label className="mb-2 block text-[14px] font-semibold text-[#111827]">
            Set Carrier Password
          </label>

          <input
            type="password"
            value={password}
            onChange={event => setPassword(event.target.value)}
            placeholder="Enter pass"
            className="h-11 w-full rounded-[8px] border border-[#E5E7EB] bg-white px-3 text-[14px] text-[#111827] outline-none placeholder:text-[#98A2B3] focus:border-[#C7D2FE]"
          />
        </div>

        <div className="mt-6 flex items-center gap-3">
          <button
            type="button"
            onClick={onClose}
            className="h-11 min-w-[110px] rounded-[8px] border border-[#E5E7EB] bg-white px-5 text-[14px] font-medium text-[#2F3E9E] transition hover:bg-[#F9FAFB]"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSendCredentials}
            className="h-11 flex-1 rounded-[8px] bg-[#2F3E9E] px-5 text-[14px] font-medium text-white transition hover:bg-[#26358F]"
          >
            Send Credentials
          </button>
        </div>
      </div>
    </Modal>
  );
}

