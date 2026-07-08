'use client';

import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';

import AddTruckField from './AddTruckField';
import AddTruckTextInput from './AddTruckTextInput';
import CarrierSelect from './CarrierSelect';
import TruckTypeDropdown from './TruckTypeDropdown';
import {
  DEFAULT_CARRIERS,
  DEFAULT_TRUCK_TYPES,
  INITIAL_ADD_TRUCK_FORM,
} from './constants';
import { AddTruckFormData, CarrierOption, TruckTypeOption } from '../../../types/dispatcher/type';
import { Modal } from '../../ui/modal';

interface AddTruckModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  onSubmit?: (data: AddTruckFormData) => void | Promise<void>;
  carriers?: CarrierOption[];
  truckTypes?: TruckTypeOption[];
}

export default function AddTruckModal({
  isOpen,
  onClose,
  onSuccess,
  onSubmit,
  carriers = DEFAULT_CARRIERS,
  truckTypes = DEFAULT_TRUCK_TYPES,
}: AddTruckModalProps) {
  const [formData, setFormData] = useState<AddTruckFormData>(
    INITIAL_ADD_TRUCK_FORM,
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setFormData(INITIAL_ADD_TRUCK_FORM);
      setIsSubmitting(false);
    }
  }, [isOpen]);

  const updateField = <K extends keyof AddTruckFormData>(
    key: K,
    value: AddTruckFormData[K],
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

      onClose(); // close main modal first
      onSuccess(); // then open success modal
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      showCloseButton={false}
      className="max-w-[850px]  px-6 py-4 shadow-[0px_20px_60px_rgba(15,23,42,0.12)]"
      contentBgClassName="bg-white"
      textClassName="text-[#111827]"
      overlayClassName="bg-[#100F0F59] backdrop-blur-[6px]"
    >
      <div className="relative rounded-[12px] bg-white px-4 pt-4 pb-3 ">
        <div className="mb-3 flex items-start justify-between">
          <h2 className="text-[24px] font-semibold leading-[24px] text-[#111827]">
            Add Truck
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
          <AddTruckField label="Carrier" required>
            <CarrierSelect
              value={formData.carrier}
              options={carriers}
              onChange={value => updateField('carrier', value)}
            />
          </AddTruckField>

          <AddTruckField label="License Plate">
            <AddTruckTextInput
              value={formData.licensePlate}
              onChange={e => updateField('licensePlate', e.target.value)}
            />
          </AddTruckField>

          <AddTruckField label="Truck Type">
            <TruckTypeDropdown
              value={formData.truckType}
              options={truckTypes}
              onChange={value => updateField('truckType', value)}
            />
          </AddTruckField>

          <AddTruckField label="VIN">
            <AddTruckTextInput
              value={formData.vin}
              onChange={e => updateField('vin', e.target.value)}
              placeholder="Enter VIN Number"
            />
          </AddTruckField>

          <AddTruckField label="Model/ Make">
            <AddTruckTextInput
              value={formData.modelMake}
              onChange={e => updateField('modelMake', e.target.value)}
            />
          </AddTruckField>

          <AddTruckField label="Unit Number">
            <AddTruckTextInput
              value={formData.unitNumber}
              onChange={e => updateField('unitNumber', e.target.value)}
              placeholder="e.g, 101 or T-45"
            />
          </AddTruckField>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-3">
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
            {isSubmitting ? 'Creating...' : 'Create Truck'}
          </button>
        </div>
      </div>
    </Modal>
  );
}
