'use client';

import React, { useState } from 'react';
import {
  
  X,
} from 'lucide-react';
import { Modal } from '../ui/modal';
import { cn } from '@/lib/utils';
import {
  ActivityIcon,
  BoneIcon,
  ClockIcon,
  
  HomeIconNew,
  MonitorIcon,
  NoteIcon,
  TruckIcon,
} from '@/src/icons';
import toast from 'react-hot-toast';

type AvailabilityReason =
  | 'available'
  | 'on_load'
  | 'home_time'
  | 'reset_34'
  | 'sick'
  | 'breakdown'
  | 'in_shop';

interface DriverAvailabilityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

const availabilityOptions: {
  label: string;
  value: AvailabilityReason;
  icon: React.ElementType;
}[] = [
  {
    label: 'Available',
    value: 'available',
    icon: ActivityIcon,
  },
  {
    label: 'On Load',
    value: 'on_load',
    icon: TruckIcon,
  },
  {
    label: 'Home Time',
    value: 'home_time',
    icon: HomeIconNew,
  },
  {
    label: '34 Hour Reset',
    value: 'reset_34',
    icon: ClockIcon,
  },
  {
    label: 'Sick',
    value: 'sick',
    icon: MonitorIcon,
  },
  {
    label: 'Breakdown',
    value: 'breakdown',
    icon: BoneIcon,
  },
  {
    label: 'In Shop',
    value: 'in_shop',
    icon: NoteIcon,
  },
];

export default function DriverAvailabilityModal({
  isOpen,
  onClose,
  onSuccess,
}: DriverAvailabilityModalProps) {
  const [nextAvailableAt, setNextAvailableAt] = useState('');
  const [reason, setReason] = useState<AvailabilityReason>('available');

  // const handleSubmit = () => {
  //   const payload = {
  //     nextAvailableAt,
  //     reason,
  //   };

  //   console.log('Driver Availability Payload:', payload);

  //   onSuccess?.();
  //   onClose();
  // };
  const handleSubmit = async () => {
    const payload = {
      nextAvailableAt,
      reason,
    };

    try {
      console.log('Driver Availability Payload:', payload);

      // await updateDriverAvailability(payload);

      toast.success('Driver availability updated successfully');

      onSuccess?.();
      onClose();
    } catch (error) {
      toast.error('Failed to update driver availability');
    }
  };
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      showCloseButton={false}
      className="max-w-[700px] rounded-[14px] p-0 shadow-[0_20px_60px_#00000026]"
      contentBgClassName="bg-white"
      textClassName="text-[#111827]"
      overlayClassName="bg-[#100F0F59] backdrop-blur-[2px]"
    >
      <div className="p-6 sm:p-7 font-[poppins]">
        {/* Header */}
        <div className="mb-5 flex items-center justify-between">
          <h2 className="md:text-[24px] leading-[120%] font-semibold text-[#161721]">
            Driver Availability
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="flex h-7 w-7 items-center justify-center rounded-full border border-[#E5E7EB] text-[#6B7280] transition hover:bg-[#F9FAFB]"
          >
            <X size={15} />
          </button>
        </div>

        {/* Date Field */}
        <div className="mb-5">
          <label className="mb-2 block text-[16px] leading-[120%]  font-medium text-[#030304]">
            Next Available Data and Time
          </label>

          <div className="relative">
            <input
              type="datetime-local"
              value={nextAvailableAt}
              onChange={e => setNextAvailableAt(e.target.value)}
              className="h-[42px] w-full rounded-[6px] border border-[#E5E7EB] bg-white px-3 pr-10 text-[13px] text-[#111827] outline-none transition placeholder:text-[#9CA3AF] focus:border-[#3E4EDD]"
            />

            {/* <CalendarDays
              size={16}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]"
            /> */}
          </div>

          <p className="mt-1.5 text-[14px] text-[#9CA3AF]">
            Leave empty to mark driver as available now
          </p>
        </div>

        {/* Reason Options */}
        <div>
          <label className="mb-3 block text-[16px] leading-[120%]  font-medium text-[#030304]">
            Reason for Unavailability
          </label>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {availabilityOptions.map(option => {
              const Icon = option.icon;
              const isSelected = reason === option.value;

              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setReason(option.value)}
                  className={cn(
                    'flex items-center gap-2 rounded-[6px] border px-6 py-4 text-left text-[16px] font-medium transition',
                    isSelected
                      ? 'border-[#3E4EDD] bg-[#F4F6FF] text-[#111827]'
                      : 'border-[#E5E7EB] bg-white text-[#374151] hover:border-[#C7D2FE] hover:bg-[#F9FAFF]',
                  )}
                >
                  <Icon
                    size={16}
                    className={isSelected ? 'text-[#3E4EDD]' : 'text-[#6B7280]'}
                  />

                  <span className="text-[16px]">{option.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-7 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="h-[52px] min-w-[186px] rounded-[12px] border border-[#E5E7EB] bg-white px-5 text-[13px] font-medium text-[#374151] transition hover:bg-[#F9FAFB]"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            className="h-[52px] min-w-[186px] rounded-[12px] bg-[#2B3674] px-5 text-[13px] font-semibold text-white transition hover:bg-[#1E2756]"
          >
            Set Availability
          </button>
        </div>
      </div>
    </Modal>
  );
}
