'use client';

import { CloseIcon, CloseLineIcon, SubmitIcon } from '@/src/icons';
import { Modal } from '../ui/modal';

interface SubmissionDoneModalProps {
  open: boolean;
  onClose: () => void;
}

export default function SubmissionDoneModal({
  open,
  onClose,
}: SubmissionDoneModalProps) {
  return (
    <Modal
      isOpen={open}
      onClose={onClose}
      className="max-w-[360px] p-0"
      contentBgClassName="bg-white"
      textClassName="text-[#111827]"
      overlayClassName = "bg-[#100F0F59] backdrop-blur-[2px]"
      showCloseButton={false}
    >
      <div className="relative w-full rounded-2xl p-6 shadow-xl">
        <button
          onClick={onClose}
          className="absolute right-3 top-3 inline-flex h-7 w-7 items-center justify-center rounded-full border text-[#111827] "
        >
          <CloseLineIcon/>
        </button>

        <div className="flex flex-col items-center text-center">
          <div className="mb-4 flex h-18 w-18 items-center justify-center rounded-full bg-[#E9EEFF] text-[#2F3E9E]">
            <SubmitIcon />
          </div>

          <h3 className="mb-4 text-xl font-semibold text-[#111827]">
            Submission Done!
          </h3>

          <button
            onClick={onClose}
            className="inline-flex h-10 w-full items-center justify-center rounded-xl bg-[#2F3E9E] text-sm font-medium text-white"
          >
            Submit
          </button>
        </div>
      </div>
    </Modal>
  );
}
