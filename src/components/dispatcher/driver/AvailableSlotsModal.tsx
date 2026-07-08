'use client';
import React, { useState, useMemo } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Modal } from '../../ui/modal';

interface AvailableSlotsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveSlot: (slot: string) => void;
}

export default function AvailableSlotsModal({
  isOpen,
  onClose,
  onSaveSlot,
}: AvailableSlotsModalProps) {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 1, 1)); // Feb 2026
  const [selectedDay, setSelectedDay] = useState<number>(8); // Default selected
  const [activeSlot, setActiveSlot] = useState<number | null>(null);

  const timeSlots = [
    '07:43 AM - 10:43 PM',
    '08:00 AM - 11:00 AM',
    '01:00 PM - 05:00 PM',
  ];

  // Calendar Logic
  const daysInMonth = useMemo(() => {
    return new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0,
    ).getDate();
  }, [currentDate]);

  const firstDayOffset = useMemo(() => {
    const day = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1,
    ).getDay();
    return day === 0 ? 6 : day - 1; // Adjust for Monday start
  }, [currentDate]);

  const handleMonthChange = (offset: number) => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + offset, 1),
    );
    setSelectedDay(1);
    setActiveSlot(null);
  };

  const handleSave = () => {
    if (activeSlot !== null) {
      const formattedDate = `${selectedDay} ${currentDate.toLocaleString('default', { month: 'long' })} ${currentDate.getFullYear()}`;
      onSaveSlot(`${formattedDate} @ ${timeSlots[activeSlot]}`);
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="max-w-[650px] p-0"
      showCloseButton={false}
    >
      <div className="p-8 bg-white rounded-3xl">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-[#111827]">
              Available Slots
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Select a date and time to assign to driver
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 border border-gray-100 rounded-full hover:bg-gray-50 transition-colors"
          >
            <X size={18} className="text-gray-500" />
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Dynamic Calendar */}
          <div className="flex-1 border border-gray-100 rounded-2xl p-5">
            <div className="flex justify-between items-center mb-6">
              <button
                onClick={() => handleMonthChange(-1)}
                className="p-1 hover:bg-gray-50 rounded-lg"
              >
                <ChevronLeft size={18} />
              </button>
              <span className="font-bold text-[#111827]">
                {currentDate.toLocaleString('default', {
                  month: 'long',
                  year: 'numeric',
                })}
              </span>
              <button
                onClick={() => handleMonthChange(1)}
                className="p-1 hover:bg-gray-50 rounded-lg"
              >
                <ChevronRight size={18} />
              </button>
            </div>

            <div className="grid grid-cols-7 text-center text-[10px] font-bold text-gray-400 uppercase mb-3">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(d => (
                <div key={d}>{d}</div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1 text-center">
              {/* Offset for first day of month */}
              {Array.from({ length: firstDayOffset }).map((_, i) => (
                <div key={`off-${i}`} />
              ))}

              {/* Actual Days */}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1;
                const isSelected = selectedDay === day;
                return (
                  <button
                    key={day}
                    onClick={() => setSelectedDay(day)}
                    className={`aspect-square flex items-center justify-center text-sm rounded-full transition-all ${
                      isSelected
                        ? 'bg-[#2B3674] text-white font-bold shadow-md'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {day}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Time Selection */}
          <div className="w-full md:w-52 space-y-3">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
              Select Time
            </p>
            {timeSlots.map((slot, i) => (
              <button
                key={i}
                onClick={() => setActiveSlot(i)}
                className={`w-full p-3 border rounded-xl text-center text-sm font-semibold transition-all ${
                  activeSlot === i
                    ? 'border-[#2B3674] bg-[#F4F7FE] text-[#2B3674]'
                    : 'border-gray-100 text-gray-600 hover:border-gray-300'
                }`}
              >
                {slot}
              </button>
            ))}

            <button
              disabled={activeSlot === null}
              onClick={handleSave}
              className={`w-full mt-4 py-3 rounded-xl font-bold transition-all ${
                activeSlot !== null
                  ? 'bg-[#2B3674] text-white hover:bg-[#1e2756]'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
            >
              Confirm Slot
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
