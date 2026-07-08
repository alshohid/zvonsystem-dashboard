'use client';

import React from 'react';
import { X } from 'lucide-react';
import { Modal } from '../../ui/modal';
import { SubmitIcon } from '@/src/icons';


interface AddTruckSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddTruckSuccessModal({
  isOpen,
  onClose,
}: AddTruckSuccessModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      showCloseButton={false}
      className="max-w-[404px] w-[calc(100%-24px)] p-0 shadow-[0px_20px_60px_rgba(15,23,42,0.12)]"
      contentBgClassName="bg-white"
      textClassName="text-[#111827]"
      overlayClassName="bg-[#100F0F59] backdrop-blur-[6px]"
    >
      <div className="relative rounded-[16px] bg-white px-6 pt-5 pb-6 sm:px-7">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 flex h-7.5 w-7.5 items-center justify-center rounded-full border border-[#D9DCE3] text-[#111827] transition hover:bg-gray-50"
          aria-label="Close success modal"
        >
          <X size={14} />
        </button>

        <div className="flex flex-col items-center text-center">
          <div className="mb-5 flex h-15 w-15 items-center justify-center rounded-full bg-[#C9CEE9]">
            <SubmitIcon/>
          </div>

          <h3 className="mb-5 text-[28px] font-semibold leading-[34px] text-[#111827]">
            Truck Has Been Added!
          </h3>

          <button
            onClick={onClose}
            className="h-[42px] w-full rounded-[8px] bg-[#2F3A8F] px-4 text-[13px] font-medium text-white transition hover:bg-[#26327d]"
          >
            Back to All Truck
          </button>
        </div>
      </div>
    </Modal>
  );
}
