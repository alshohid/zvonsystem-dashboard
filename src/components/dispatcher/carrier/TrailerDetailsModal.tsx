'use client';

import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';

import { EditOptionIcon } from '@/src/icons';
import { Modal } from '../../ui/modal';

type TrailerDetailKey =
  | 'carrier'
  | 'unitNumber'
  | 'plateNumber'
  | 'type'
  | 'plateState';

interface TrailerDetails {
  carrier?: string;
  unitNumber?: string;
  plateNumber?: string;
  type?: string;
  plateState?: string;
}

interface TrailerDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: TrailerDetails;
  onSave?: (updatedData: TrailerDetails) => void;
}

const detailsConfig: { key: TrailerDetailKey; label: string }[] = [
  { key: 'carrier', label: 'Carrier' },
  { key: 'unitNumber', label: 'Unit Number' },
  { key: 'plateNumber', label: 'Plate Number' },
  { key: 'type', label: 'Type' },
  { key: 'plateState', label: 'Plate State' },
];

export default function TrailerDetailsModal({
  isOpen,
  onClose,
  data,
  onSave,
}: TrailerDetailsModalProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<TrailerDetails>(data);

  useEffect(() => {
    if (isOpen) {
      setFormData(data);
      setIsEditing(false);
    }
  }, [isOpen, data]);

  const renderValue = (value?: string) => {
    if (!value || value.trim() === '') return 'N/A';
    return value;
  };

  const handleChange = (key: TrailerDetailKey, value: string) => {
    setFormData(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setFormData(data);
    setIsEditing(false);
  };

  const handleSave = () => {
    onSave?.(formData);
    setIsEditing(false);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      showCloseButton={false}
      className="max-w-[684px] w-[calc(100%-24px)] sm:w-[calc(100%-64px)] p-0 shadow-[0px_20px_60px_rgba(15,23,42,0.12)]"
      contentBgClassName="bg-white"
      textClassName="text-[#111827]"
      overlayClassName="bg-[#100F0F59] backdrop-blur-[6px]"
    >
      <div className="relative rounded-[16px] bg-white px-6 py-7 sm:px-8 sm:py-8">
        <div className="mb-7 flex items-start justify-between">
          <h2 className="text-[24px] font-semibold leading-[28px] text-[#111827]">
            Trailer Details
          </h2>

          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-[#E5E7EB] text-[#111827] transition hover:bg-gray-50"
            aria-label="Close modal"
          >
            <X size={16} />
          </button>
        </div>

        <div className="grid grid-cols-1 gap-x-9 sm:grid-cols-2">
          {detailsConfig.map((item, index) => {
            const value = formData[item.key];

            return (
              <div
                key={item.key}
                className={`flex items-start justify-between gap-4 py-4 ${
                  index < detailsConfig.length - 1
                    ? 'border-b border-[#E5E7EB]'
                    : ''
                }`}
              >
                <div className="min-w-0 flex-1">
                  <p className="mb-1 text-[16px] font-medium leading-6 text-[#111827]">
                    {item.label}
                  </p>

                  {isEditing ? (
                    <input
                      type="text"
                      value={value ?? ''}
                      onChange={e => handleChange(item.key, e.target.value)}
                      className="h-[40px] w-full rounded-[8px] border border-[#E5E7EB] px-3 text-[16px] font-normal leading-5 text-[#111827] outline-none focus:border-[#7C88C4]"
                    />
                  ) : (
                    <p className="break-words text-[16px] font-normal leading-5 text-[#6B7280]">
                      {renderValue(value)}
                    </p>
                  )}
                </div>

                <button
                  type="button"
                  onClick={handleEditClick}
                  className="mt-0.5 shrink-0 cursor-pointer text-[#7C88C4] transition hover:text-[#4B5BBE]"
                  aria-label={`Edit ${item.label}`}
                >
                  <EditOptionIcon />
                </button>
              </div>
            );
          })}
        </div>

        {isEditing && (
          <div className="mt-6 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={handleCancel}
              className="rounded-[8px] border border-[#E5E7EB] px-5 py-2 text-[14px] font-medium text-[#111827] transition hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleSave}
              className="rounded-[8px] bg-[#2F3A8F] px-5 py-2 text-[14px] font-medium text-white transition hover:bg-[#26327d]"
            >
              Save
            </button>
          </div>
        )}
      </div>
    </Modal>
  );
}
