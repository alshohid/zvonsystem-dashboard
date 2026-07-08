'use client';

import React, { useState } from 'react';
import { X, Plus, ChevronDown } from 'lucide-react';
import { MessageChatIcon, EditOptionIcon, DownCaretIcon } from '@/src/icons';
import { Driver } from '@/src/types/driver/type';
import { Modal } from '../../ui/modal';
import SmartField from '../reusable-component/SmartField';
import AvailableSlotsModal from './AvailableSlotsModal';

interface Props {
  open: boolean;
  onClose: () => void;
  driver: Driver;
}

const TRUCK_OPTIONS = [
  '30',
  '80',
  '15',
  '22',
  '40',
];
const TRAILER_OPTIONS = [
  '6700',
  '4380',
  '3250',
  '5100',
  '9900',
];

export default function DriverDetailModal({ open, onClose, driver }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [showSlots, setShowSlots] = useState(false);
  const [showAddTruckForm, setShowAddTruckForm] = useState(false);
  const [formData, setFormData] = useState<Driver>(driver);
  const [selectedSlot, setSelectedSlot] = useState<string>('');

  // Temp state for the assign form
  const [assignTruck, setAssignTruck] = useState(formData?.truckNo || '');
  const [assignTrailer, setAssignTrailer] = useState(formData?.trailerNo || '');

  const handleFieldChange = (field: keyof Driver, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAssign = () => {
    if (!assignTruck || !assignTrailer) return;
    setFormData(prev => ({
      ...prev,
      truckNo: assignTruck,
      trailerNo: assignTrailer,
    }));
    setShowAddTruckForm(false);
  };

  const handleCancelAssign = () => {
    // Reset temp selects back to current formData values
    setAssignTruck(formData.truckNo || '');
    setAssignTrailer(formData.trailerNo || '');
    setShowAddTruckForm(false);
  };

  return (
    <>
      <Modal
        isOpen={open}
        onClose={onClose}
        className="max-w-[850px] p-0"
        showCloseButton={false}
      >
        <div className="p-8 bg-white rounded-3xl">
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-[#111827]">
              Driver Details #ID_{formData.id}
            </h2>
            <button
              onClick={onClose}
              className="p-2 border border-gray-100 rounded-full hover:bg-gray-50 transition-colors"
            >
              <X size={18} className="text-gray-500" />
            </button>
          </div>

          {/* Edit Toggle Button */}
          <div className="flex justify-end mb-4">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="text-[#3E4EDD] text-sm font-bold hover:underline flex items-center gap-1"
            >
              {isEditing ? (
                'Save Changes'
              ) : (
                <>
                  <EditOptionIcon /> Edit
                </>
              )}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
            {/* Driver Information */}
            <div className="space-y-1">
              <h3 className="font-semibold text-lg text-[#111827] mb-4">
                Driver Information
              </h3>
              <SmartField
                label="Name"
                value={formData.name}
                isEditing={isEditing}
                onChange={v => handleFieldChange('name', v)}
                border
              />
              <SmartField
                label="Carrier"
                value={formData.carrier}
                isEditing={isEditing}
                onChange={v => handleFieldChange('carrier', v)}
                border
              />
              <SmartField
                label="Assigned Truck"
                value={formData.truckNo}
                isEditing={isEditing}
                onChange={v => handleFieldChange('truckNo', v)}
                border
              />
              <SmartField
                label="Assigned Trailer"
                value={formData.trailerNo}
                isEditing={isEditing}
                onChange={v => handleFieldChange('trailerNo', v)}
                border
              />
              <SmartField
                label="Contact"
                value={formData.contact}
                isEditing={isEditing}
                onChange={v => handleFieldChange('contact', v)}
                border
              />
            </div>

            {/* Compliance Column */}
            <div className="space-y-1">
              <h3 className="font-bold text-lg text-[#111827] mb-4">
                Driver Fitness / Compliance
              </h3>
              <SmartField
                label="CDL Number"
                value={formData.cdlNumber || formData.name}
                isEditing={isEditing}
                onChange={v => handleFieldChange('cdlNumber', v)}
                border
              />
              <SmartField
                label="State"
                value={formData.state || 'Truck Inc.'}
                isEditing={isEditing}
                onChange={v => handleFieldChange('state', v)}
                border
              />
              <SmartField
                label="CDL Expiration Date"
                value={formData.cdlExpDate || '1/1/25'}
                isEditing={isEditing}
                onChange={v => handleFieldChange('cdlExpDate', v)}
                border
              />
              <SmartField
                label="Medical Card Expiration Date"
                value={formData.medCardExpDate || '12/12/28'}
                isEditing={isEditing}
                onChange={v => handleFieldChange('medCardExpDate', v)}
                border
              />
              <div className="pt-2">
                <p className="text-[16px] font-bold text-[#030304]">
                  Status
                </p>
                <span className="inline-block mt-1 px-3 py-1 bg-green-50 text-green-500 border border-green-200 rounded-full text-xs font-bold">
                  {formData.status}
                </span>
              </div>
            </div>
          </div>

          {/* Assign Truck Section */}
          <div className="mt-8">
            {!showAddTruckForm ? (
              <div className="flex flex-col sm:flex-row items-center justify-between p-6 rounded-2xl bg-[#F9FAFB] border border-gray-100">
                <div className="text-center sm:text-left">
                  <h4 className="font-bold text-[#111827]">
                    Add Truck & Trailer (Optional)
                  </h4>
                  <p className="text-sm text-gray-500 mt-1">
                    {formData.truckNo && formData.trailerNo
                      ? `Currently assigned: Truck #${formData.truckNo} · Trailer #${formData.trailerNo}`
                      : 'You have not selected any truck for this driver. Click on Add truck button to assign.'}
                  </p>
                </div>
                <button
                  onClick={() => setShowAddTruckForm(true)}
                  className="mt-4 sm:mt-0 flex items-center gap-2 px-5 py-2.5 bg-[#2B3674] text-white rounded-xl text-sm font-bold hover:bg-[#1e2756] transition-all"
                >
                  <Plus size={18} />{' '}
                  {formData.truckNo ? 'Add Truck' : 'Add Truck'}
                </button>
              </div>
            ) : (
              <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Assign Truck Select */}
                  <div className="space-y-2">
                    <label className="text-[15px] font-bold text-[#111827]">
                      Assign Truck
                    </label>
                    <div className="relative">
                      <select
                        value={assignTruck}
                        onChange={e => setAssignTruck(e.target.value)}
                        className="w-full h-11 appearance-none rounded-[10px] border border-[#dfe1e7] bg-white px-3 pr-9 text-sm text-[#111827] outline-none focus:border-[#2B3674] transition"
                      >
                        <option value="">Select truck</option>
                        {TRUCK_OPTIONS.map(truck => (
                          <option key={truck} value={truck}>
                            {truck}
                          </option>
                        ))}
                      </select>
                      <DownCaretIcon
                        size={16}
                        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                      />
                    </div>
                  </div>

                  {/* Assign Trailer Select */}
                  <div className="space-y-2">
                    <label className="text-[15px] font-bold text-[#111827]">
                      Assign Trailer
                    </label>
                    <div className="relative">
                      <select
                        value={assignTrailer}
                        onChange={e => setAssignTrailer(e.target.value)}
                        className="w-full h-11 appearance-none rounded-[10px] border border-[#dfe1e7] bg-white px-3 pr-9 text-sm text-[#111827] outline-none focus:border-[#2B3674] transition"
                      >
                        <option value="">Select trailer</option>
                        {TRAILER_OPTIONS.map(trailer => (
                          <option key={trailer} value={trailer}>
                            {trailer}
                          </option>
                        ))}
                      </select>
                      <DownCaretIcon
                        size={16}
                        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    onClick={handleCancelAssign}
                    className="px-6 py-2.5 w-full border border-gray-200 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAssign}
                    disabled={!assignTruck || !assignTrailer}
                    className="px-6 py-2.5 w-full bg-[#2B3674] text-white rounded-xl text-sm font-bold hover:bg-[#1e2756] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                  >
                    Assign Truck
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="mt-10 flex flex-wrap justify-between items-center gap-4">
            <button className="px-8 py-3 border border-gray-200 rounded-xl font-bold text-gray-700 hover:bg-red-50 hover:text-red-600 transition-all">
              Delete Driver
            </button>
            <div className="flex gap-3">
              <button
                onClick={() => setShowSlots(true)}
                className="bg-[#2B3674] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#1e2756] transition-all"
              >
                View Available Slots
              </button>
              <button className="bg-[#2B3674] text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-[#1e2756] transition-all">
                <MessageChatIcon /> Contact Driver
              </button>
            </div>
          </div>
        </div>
      </Modal>

      <div>
        <AvailableSlotsModal
          isOpen={showSlots}
          onClose={() => setShowSlots(false)}
          onSaveSlot={slot => setSelectedSlot(slot)}
        />
      </div>
    </>
  );
}
