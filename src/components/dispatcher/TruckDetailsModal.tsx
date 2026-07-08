'use client';

import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Modal } from '../ui/modal';
import { EditOptionIcon } from '@/src/icons';

type TruckDetailKey =
  | 'carrier'
  | 'unitNumber'
  | 'truckType'
  | 'modalMake'
  | 'licensePlate'
  | 'vin';

interface TruckDetails {
  carrier?: string;
  unitNumber?: string;
  truckType?: string;
  modalMake?: string;
  licensePlate?: string;
  vin?: string;
}

interface TruckDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: TruckDetails;
  onSave?: (updated: TruckDetails) => void;
  onEdit: (field: TruckDetailKey) => void;
}

const detailsConfig = [
  { key: 'carrier', label: 'Carrier' },
  { key: 'unitNumber', label: 'Unit Number' },
  { key: 'truckType', label: 'Truck Type' },
  { key: 'modalMake', label: 'Modal/Make' },
  { key: 'licensePlate', label: 'License Plate' },
  { key: 'vin', label: 'VIN' },
] as const;

export default function TruckDetailsModal({
  isOpen,
  onClose,
  data,
  onSave,
  onEdit,
}: TruckDetailsModalProps) {
  const [editField, setEditField] = useState<TruckDetailKey | null>(null);
  const [formData, setFormData] = useState<TruckDetails>(data);

  const renderValue = (value?: string) => {
    if (!value || value.trim() === '') return 'N/A';
    return value;
  };

  const handleChange = (key: TruckDetailKey, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    setEditField(null);
    onSave?.(formData);
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
        {/* Header */}
        <div className="mb-7 flex items-start justify-between">
          <h2 className="text-[20px] font-semibold leading-[28px]">
            Truck Details
          </h2>

          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-[#E5E7EB] hover:bg-gray-50"
          >
            <X size={16} />
          </button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-x-9 sm:grid-cols-2">
          {detailsConfig.map((item, index) => {
            const value = formData[item.key];
            const isEditing = editField === item.key;

            return (
              <div
                key={item.key}
                className={`flex items-start justify-between gap-4 py-4 ${
                  index < detailsConfig.length - 1
                    ? 'border-b border-[#E5E7EB]'
                    : ''
                }`}
              >
                <div className="flex-1">
                  <p className="mb-1 text-[15px] font-medium">{item.label}</p>

                  {/* EDIT MODE */}
                  {isEditing ? (
                    <input
                      autoFocus
                      value={value || ''}
                      onChange={e => handleChange(item.key, e.target.value)}
                      onBlur={handleSave}
                      onKeyDown={e => {
                        if (e.key === 'Enter') handleSave();
                      }}
                      className="w-full rounded-lg border border-[#E5E7EB] px-3 py-2 text-[14px] outline-none focus:border-[#3E4EDD]"
                    />
                  ) : (
                    <p className="text-[14px] text-[#6B7280]">
                      {renderValue(value)}
                    </p>
                  )}
                </div>

                {/* Edit Button */}
                <button
                  type="button"
                  onClick={() => setEditField(item.key)}
                  className="mt-0.5 shrink-0 text-[#7C88C4] hover:text-[#4B5BBE]"
                >
                  <EditOptionIcon />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </Modal>
  );
}
