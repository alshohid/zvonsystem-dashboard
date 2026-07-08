'use client';

import React, { useState } from 'react';
import { Modal } from '../ui/modal';
import { Search, X } from 'lucide-react';
import CustomDropdown from './reusable-component/CustomDropdown';
import AssignTruckDropdown from './reusable-component/AssignTruckDropdown';

const MOCK_DRIVERS = [
  {
    id: 1,
    name: 'Leslie Alexander',
    email: 'sara.cruz@example.com',
    avatar: '/avatar1.png',
    initials: 'LA',
  },
  {
    id: 2,
    name: 'Annette Black',
    email: 'jessica.hanson@example.com',
    avatar: '/avatar2.png',
    initials: 'AB',
  },
  {
    id: 3,
    name: 'Wade Warren',
    email: 'felicia.reid@example.com',
    avatar: '/avatar3.png',
    initials: 'WW',
  },
  {
    id: 4,
    name: 'John Smith',
    email: 'john.smith@example.com',
    avatar: '/avatar4.png',
    initials: 'JS',
  },
  {
    id: 5,
    name: 'Jane Doe',
    email: 'jane.doe@example.com',
    avatar: '/avatar5.png',
    initials: 'JD',
  },
];

interface Driver {
  id: number;
  name: string;
  email: string;
  avatar: string;
  initials: string;
}

interface DriverFormData {
  selectedDrivers: Driver[];
  carrier: string;
  cdlNumber: string;
  state: string;
  assignTruck: string;
  assignTrailer: string;
}

export default function AddDriverModal({
  isOpen,
  onClose,
  onSuccess,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (drivers: DriverFormData) => void;
}) {
  const [showDriverList, setShowDriverList] = useState(false);
  const [selectedDrivers, setSelectedDrivers] = useState<Driver[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [formData, setFormData] = useState<
    Omit<DriverFormData, 'selectedDrivers'>
  >({
    carrier: '',
    cdlNumber: '',
    state: '',
    assignTruck: '',
    assignTrailer: '',
  });

  const filteredDrivers = MOCK_DRIVERS.filter(
    d =>
      d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.email.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // Toggle driver selection
  const toggleDriverSelection = (driver: Driver) => {
    setSelectedDrivers(prev => {
      const isSelected = prev.find(d => d.id === driver.id);
      if (isSelected) {
        return prev.filter(d => d.id !== driver.id);
      } else {
        return [...prev, driver];
      }
    });
  };

  // Remove driver from selected
  const removeDriver = (driverId: number) => {
    setSelectedDrivers(prev => prev.filter(d => d.id !== driverId));
  };

  // Handle form input change
  const handleFormChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: String(value) }));
  };

  // Handle submit
  const handleSubmit = () => {
    if (selectedDrivers.length === 0) {
      alert('Please select at least one driver');
      return;
    }

    onSuccess({
      selectedDrivers,
      ...formData,
    });
  };

  // Reset form
  const handleReset = () => {
    setSelectedDrivers([]);
    setSearchQuery('');
    setFormData({
      carrier: '',
      cdlNumber: '',
      state: '',
      assignTruck: '',
      assignTrailer: '',
    });
    setShowDriverList(false);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="max-w-4xl p-0"
      showCloseButton={false}
    >
      <div className="p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-[#111827]">Add Driver</h2>
          <button
            onClick={onClose}
            className="p-2 border border-gray-100 rounded-full hover:bg-gray-50 transition-colors"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Carrier and Driver Selection Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Carrier */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-[#111827]">
                Carrier
              </label>
              <CustomDropdown
                placeholder="Choose Carrier"
                options={[
                  { label: 'Logic LTD', value: 'logic_ltd' },
                  { label: 'Truck driver', value: 'truck_driver' },
                ]}
                value={formData.carrier}
                onChange={value => handleFormChange('carrier', String(value))}
              />
            </div>

            {/* Driver Selection */}
            <div className="space-y-2 relative">
              <label className="text-sm font-bold text-[#111827]">Driver</label>
              <button
                type="button"
                onClick={() => setShowDriverList(!showDriverList)}
                className="w-full flex items-center justify-between border border-[#E5E7EB] rounded-2xl px-4 py-3.5 bg-white hover:border-[#3E4EDD] transition-colors"
              >
                <span className="text-[#A0AEC0]">
                  {selectedDrivers.length === 0
                    ? 'Choose Driver'
                    : `${selectedDrivers.length} driver${selectedDrivers.length !== 1 ? 's' : ''} selected`}
                </span>
                <svg
                  className={`w-5 h-5 text-[#A0AEC0] transition-transform ${
                    showDriverList ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  />
                </svg>
              </button>

              {/* Driver Selection Dropdown */}
              {showDriverList && (
                <div className="absolute z-50 top-full mt-2 w-full bg-white border border-gray-100 rounded-2xl shadow-xl p-4 animate-in fade-in zoom-in duration-200">
                  {/* Search Input */}
                  <div className="relative mb-4">
                    <Search
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                      size={18}
                    />
                    <input
                      type="text"
                      placeholder="Search..."
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-100 rounded-xl outline-none focus:border-[#3E4EDD] focus:ring-1 focus:ring-[#3E4EDD] text-sm"
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      autoFocus
                    />
                  </div>

                  {/* Driver List */}
                  <div className="max-h-[300px] overflow-y-auto space-y-1">
                    {filteredDrivers.length === 0 ? (
                      <div className="text-center py-6">
                        <p className="text-sm text-gray-500">
                          No drivers found
                        </p>
                      </div>
                    ) : (
                      filteredDrivers.map(driver => {
                        const isSelected = selectedDrivers.find(
                          d => d.id === driver.id,
                        );
                        return (
                          <button
                            key={driver.id}
                            type="button"
                            onClick={() => toggleDriverSelection(driver)}
                            className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 rounded-xl cursor-pointer transition-colors group"
                          >
                            {/* Avatar */}
                            <div className="w-10 h-10 rounded-full bg-[#E5E7EB] flex items-center justify-center text-xs font-bold text-gray-600 flex-shrink-0">
                              {driver.initials}
                            </div>

                            {/* Driver Info */}
                            <div className="flex-1 text-left">
                              <p className="text-sm font-semibold text-[#111827]">
                                {driver.name}
                              </p>
                              <p className="text-xs text-gray-500">
                                {driver.email}
                              </p>
                            </div>

                            {/* Checkbox */}
                            <div
                              className={`w-5 h-5 rounded border flex items-center justify-center flex-shrink-0 transition-all ${
                                isSelected
                                  ? 'bg-[#2B3674] border-[#2B3674]'
                                  : 'border-gray-300 hover:border-[#2B3674]'
                              }`}
                            >
                              {isSelected && (
                                <svg
                                  className="w-3 h-3 text-white"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={3}
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                              )}
                            </div>
                          </button>
                        );
                      })
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Selected Drivers Display */}
          {selectedDrivers.length > 0 && (
            <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100">
              <p className="text-sm font-semibold text-[#111827] mb-3">
                Selected Drivers ({selectedDrivers.length})
              </p>
              <div className="flex flex-wrap gap-2">
                {selectedDrivers.map(driver => (
                  <div
                    key={driver.id}
                    className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-blue-200"
                  >
                    <div className="w-8 h-8 rounded-full bg-[#2B3674] flex items-center justify-center text-xs font-bold text-white">
                      {driver.initials}
                    </div>
                    <span className="text-sm font-medium text-[#111827]">
                      {driver.name}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeDriver(driver.id)}
                      className="ml-1 p-0.5 hover:bg-gray-100 rounded-full transition-colors"
                    >
                      <X size={16} className="text-gray-500" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Driver Fitness / Compliance Section */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-bold text-[#111827] mb-6">
              Driver Fitness / Compliance
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-[#111827]">
                  CDL Number
                </label>
                <input
                  type="text"
                  placeholder="License #"
                  value={formData.cdlNumber}
                  onChange={e => handleFormChange('cdlNumber', e.target.value)}
                  className="w-full border border-[#E5E7EB] rounded-2xl px-4 py-3.5 outline-none focus:border-[#3E4EDD] focus:ring-1 focus:ring-[#3E4EDD]"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-[#111827]">
                  State
                </label>
                <input
                  type="text"
                  placeholder="e.g. TX"
                  value={formData.state}
                  onChange={e => handleFormChange('state', e.target.value)}
                  className="w-full border border-[#E5E7EB] rounded-2xl px-4 py-3.5 outline-none focus:border-[#3E4EDD] focus:ring-1 focus:ring-[#3E4EDD]"
                />
              </div>
            </div>

            {/* Assign Truck and Trailer */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-[#111827]">
                  Assign Truck (Optional)
                </label>
                <AssignTruckDropdown
                  placeholder="None"
                  options={[
                    { label: 'Truck #204', value: 't1' },
                    { label: 'Truck #501', value: 't2' },
                  ]}
                  value={formData.assignTruck}
                  onChange={value =>
                    handleFormChange('assignTruck', String(value))
                  }
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-[#111827]">
                  Assign Trailer (Optional)
                </label>
                <AssignTruckDropdown
                  placeholder="None"
                  options={[
                    { label: 'Flatbed #1', value: 'tr1' },
                    { label: 'Reefer #5', value: 'tr2' },
                  ]}
                  value={formData.assignTrailer}
                  onChange={value =>
                    handleFormChange('assignTrailer', String(value))
                  }
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={() => {
                handleReset();
                onClose();
              }}
              className="flex-1 py-3.5 border border-gray-100 rounded-2xl font-bold text-gray-700 hover:bg-gray-50 transition-all"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={selectedDrivers.length === 0}
              className="flex-1 py-3.5 bg-[#2B3674] text-white rounded-2xl font-bold hover:bg-[#1e2756] disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-blue-900/20"
            >
              Add Driver{selectedDrivers.length > 1 ? 's' : ''}
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
