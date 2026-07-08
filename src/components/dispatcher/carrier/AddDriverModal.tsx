'use client';

import React, { useState } from 'react';

import { Search, ChevronDown, X } from 'lucide-react';
import { Modal } from '../../ui/modal';
import CustomDropdown from '../reusable-component/CustomDropdown';
import AssignTruckDropdown from '../reusable-component/AssignTruckDropdown';


const MOCK_DRIVERS = [
  {
    id: 1,
    name: 'Leslie Alexander',
    email: 'sara.cruz@example.com',
    avatar: '/avatar1.png',
  },
  {
    id: 2,
    name: 'Annette Black',
    email: 'jessica.hanson@example.com',
    avatar: '/avatar2.png',
  },
  {
    id: 3,
    name: 'Wade Warren',
    email: 'felicia.reid@example.com',
    avatar: '/avatar3.png',
  },
];

interface Driver {
  id: number;
  name: string;
  email: string;
  avatar: string;
}

export default function AddDriverModal({
  isOpen,
  onClose,
  onSuccess,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [showDriverList, setShowDriverList] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredDrivers = MOCK_DRIVERS.filter(d =>
    d.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );
  const handleSubmit = () => {
    onSuccess();
  };
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="max-w-[850px] p-0"
      showCloseButton={false}
    >
      <div className="p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-[#111827]">Add Driver</h2>
          <button
            onClick={onClose}
            className="p-2 border border-gray-100 rounded-full hover:bg-gray-50"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Top Row: Carrier and Driver */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-[#111827]">
                Carrier
              </label>
              <CustomDropdown
                placeholder="Choose Carrier"
                options={[
                  { label: 'Logic LTD', value: 'logic_ltd' },
                  { label: 'Truck driver', value: 'river_ltd' },
                ]}
                value="{option}"
                onChange={() => {}}
              />
            </div>

            <div className="space-y-2 relative">
              <label className="text-sm font-bold text-[#111827]">Driver</label>
              <div
                onClick={() => setShowDriverList(!showDriverList)}
                className="flex items-center justify-between w-full border border-[#E5E7EB] rounded-[18px] px-4 py-3.5 bg-white cursor-pointer"
              >
                <span
                  className={
                    selectedDriver ? 'text-[#111827]' : 'text-[#A0AEC0]'
                  }
                >
                  {selectedDriver ? selectedDriver.name : 'Choose Driver'}
                </span>
                <ChevronDown size={20} className="text-[#A0AEC0]" />
              </div>

              {/* Driver Search Dropdown (Screenshot 58 style) */}
              {showDriverList && (
                <div className="absolute z-50 mt-2 w-full bg-white border border-gray-100 rounded-2xl shadow-xl p-4 animate-in fade-in zoom-in duration-200">
                  <div className="relative mb-4">
                    <Search
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                      size={18}
                    />
                    <input
                      type="text"
                      placeholder="Search..."
                      className="w-full pl-10 pr-4 py-2 border border-gray-100 rounded-xl outline-none focus:border-[#3E4EDD]"
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <div className="max-h-[250px] overflow-y-auto space-y-1">
                    {filteredDrivers.map(driver => (
                      <div
                        key={driver.id}
                        onClick={() => {
                          setSelectedDriver(driver);
                          setShowDriverList(false);
                        }}
                        className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-xl cursor-pointer group"
                      >
                        <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
                          {/* Avatar placeholder */}
                          <div className="w-full h-full bg-[#E5E7EB] flex items-center justify-center text-xs font-bold text-gray-500">
                            {driver.name.charAt(0)}
                          </div>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-bold text-[#111827]">
                            {driver.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {driver.email}
                          </p>
                        </div>
                        <div
                          className={`w-5 h-5 rounded border flex items-center justify-center ${selectedDriver?.id === driver.id ? 'bg-[#2B3674] border-[#2B3674]' : 'border-gray-300'}`}
                        >
                          {selectedDriver?.id === driver.id && (
                            <div className="w-2 h-2 bg-white rounded-full" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <h3 className="text-lg font-bold text-[#111827] pt-2">
            Driver Fitness / Compliance
          </h3>

          {/* Compliance Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-[#111827]">
                CDL Number
              </label>
              <input
                type="text"
                placeholder="License #"
                className="w-full border border-[#E5E7EB] rounded-[18px] px-4 py-3.5 outline-none focus:border-[#3E4EDD]"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-[#111827]">State</label>
              <input
                type="text"
                placeholder="e.g. TX"
                className="w-full border border-[#E5E7EB] rounded-[18px] px-4 py-3.5 outline-none focus:border-[#3E4EDD]"
              />
            </div>
          </div>

          {/* Optional Assign Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-[#111827]">
                Assign Truck (Optional)
              </label>
              <AssignTruckDropdown
                placeholder="None"
                options={[]}
                value=""
                onChange={() => {}}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-[#111827]">
                Assign Trailer (Optional)
              </label>
              <AssignTruckDropdown
                placeholder="None"
                options={[]}
                value=""
                onChange={() => {}}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              onClick={onClose}
              className="flex-1 py-4 border border-gray-100 rounded-2xl font-bold text-gray-700 hover:bg-gray-50 transition-all"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="flex-1 py-4 bg-[#2B3674] text-white rounded-2xl font-bold hover:bg-[#1e2756] transition-all shadow-lg shadow-blue-900/20"
            >
              Add Driver
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
