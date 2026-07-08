'use client';

import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';

import AddTrailerField from './AddTrailerField';
import AddTrailerTextInput from './AddTrailerTextInput';
import TrailerTypeSelect from './TrailerTypeSelect';
import { INITIAL_ADD_TRAILER_FORM, DEFAULT_TRAILER_TYPES } from './constants';
import { AddTrailerFormData, TrailerTypeOption } from '../../../types/dispatcher/type';
import { Modal } from '../../ui/modal';

interface AddTrailerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  onSubmit?: (data: AddTrailerFormData) => void | Promise<void>;
  trailerTypes?: TrailerTypeOption[];
}

export default function AddTrailerModal({
  isOpen,
  onClose,
  onSuccess,
  onSubmit,
  trailerTypes = DEFAULT_TRAILER_TYPES,
}: AddTrailerModalProps) {
  const [formData, setFormData] = useState<AddTrailerFormData>(
    INITIAL_ADD_TRAILER_FORM,
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setFormData(INITIAL_ADD_TRAILER_FORM);
      setIsSubmitting(false);
    }
  }, [isOpen]);

  const updateField = <K extends keyof AddTrailerFormData>(
    key: K,
    value: AddTrailerFormData[K],
  ) => {
    setFormData(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      await onSubmit?.(formData);
      onClose();
      onSuccess();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      showCloseButton={false}
      className="max-w-[650px] w-[calc(100%-24px)] px-6 py-4 shadow-[0px_20px_60px_rgba(15,23,42,0.12)]"
      contentBgClassName="bg-white"
      textClassName="text-[#111827]"
      overlayClassName="bg-[#100F0F59] backdrop-blur-[6px]"
    >
      <div className="relative rounded-[12px] bg-white px-4 pt-4 pb-3">
        <div className="mb-3 flex items-start justify-between">
          <h2 className="text-[24px] font-semibold leading-[24px] text-[#111827]">
            Add Trailer
          </h2>

          <button
            onClick={onClose}
            className="flex h-6.5 w-6.5 items-center justify-center rounded-full border border-[#D9DCE3] text-[#111827] transition hover:bg-gray-50"
            aria-label="Close modal"
          >
            <X size={12} />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-x-3 gap-y-2.5">
          <AddTrailerField label="Carrier" required>
            <AddTrailerTextInput
              value={formData.carrier}
              onChange={e => updateField('carrier', e.target.value)}
              placeholder="Enter MC Number"
            />
          </AddTrailerField>

          <AddTrailerField label="Type">
            <TrailerTypeSelect
              value={formData.type}
              options={trailerTypes}
              onChange={value => updateField('type', value)}
            />
          </AddTrailerField>

          <AddTrailerField label="Unit Number" required>
            <AddTrailerTextInput
              value={formData.unitNumber}
              onChange={e => updateField('unitNumber', e.target.value)}
              placeholder="Enter MC Number"
            />
          </AddTrailerField>

          <AddTrailerField label="VIN">
            <AddTrailerTextInput
              value={formData.vin}
              onChange={e => updateField('vin', e.target.value)}
              placeholder="ENTER Vin Number"
            />
          </AddTrailerField>

          <AddTrailerField label="Plate Number">
            <AddTrailerTextInput
              value={formData.plateNumber}
              onChange={e => updateField('plateNumber', e.target.value)}
              placeholder="e.g, TRL-001"
            />
          </AddTrailerField>

          <AddTrailerField label="Plate State">
            <AddTrailerTextInput
              value={formData.plateState}
              onChange={e => updateField('plateState', e.target.value)}
              placeholder="e.g, TX or IL"
            />
          </AddTrailerField>
        </div>

        <div className="mt-7 grid grid-cols-2 gap-3 border-t border-[#EDEEF2] pt-4">
          <button
            type="button"
            onClick={onClose}
            className="h-[38px] rounded-[6px] border border-[#E5E7EB] bg-[#F9FAFB] text-[12px] font-medium text-[#111827] transition hover:bg-[#F3F4F6]"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="h-[38px] rounded-[6px] bg-[#2F3A8F] text-[12px] font-medium text-white transition hover:bg-[#26327d] disabled:opacity-60"
          >
            {isSubmitting ? 'Creating...' : 'Create Trailer'}
          </button>
        </div>
      </div>
    </Modal>
  );
}
