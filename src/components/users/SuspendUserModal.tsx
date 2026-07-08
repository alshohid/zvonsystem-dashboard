"use client";

import React, { useState } from "react";
import { Modal } from "../ui/modal";
import Label from "../ui/switch/Label";
import SelectField, { SelectOption } from "../ui/input/searchInput/SelectField";
import TextArea from "../ui/input/TextArea";
import ProfileAvatar from "./ProfileAvatar";
import { ConfirmSuspension, SuspendProfileIcon } from "@/src/icons";

interface SuspendUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  userName?: string;
  userId?: string;
  userImage?: string;
  isActive?: boolean;
}

const SuspendUserModal: React.FC<SuspendUserModalProps> = ({
  isOpen,
  onClose,
  userName = "Cryptoknight",
  userId = "#8832",
  userImage = "/sidebar/profile_img.jpg",
  isActive = true,
}) => {
  const [suspensionDuration, setSuspensionDuration] = useState("7 days");
  const [reasonCategory, setReasonCategory] = useState("Violation of Terms");
  const [additionalNote, setAdditionalNote] = useState("");
  const [notifyUser, setNotifyUser] = useState(false);

  const durationOptions: SelectOption[] = [
    { value: "1 day", label: "1 day" },
    { value: "3 days", label: "3 days" },
    { value: "7 days", label: "7 days" },
    { value: "14 days", label: "14 days" },
    { value: "30 days", label: "30 days" },
    { value: "Permanent", label: "Permanent" },
  ];

  const reasonOptions: SelectOption[] = [
    { value: "Violation of Terms", label: "Violation of Terms" },
    { value: "Fraudulent Activity", label: "Fraudulent Activity" },
    { value: "Inappropriate Behavior", label: "Inappropriate Behavior" },
    { value: "Security Breach", label: "Security Breach" },
    { value: "Other", label: "Other" },
  ];

  const handleConfirm = () => {
    // Handle suspension logic here
    console.log("Suspending user:", {
      userName,
      userId,
      suspensionDuration,
      reasonCategory,
      additionalNote,
      notifyUser,
    });
    onClose();
    // Reset form
    setSuspensionDuration("7 days");
    setReasonCategory("Violation of Terms");
    setAdditionalNote("");
    setNotifyUser(false);
  };

  const maxChars = 200;
  const charCount = additionalNote.length;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="max-w-[584px] p-5 lg:p-10 bg-gray-200 dark:bg-[#111B23] "
    >
      <div className="space-y-6">
        <div className="w-full border-b border-[#26344B]">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full  flex items-center justify-center">
              <SuspendProfileIcon/>
            </div>
            <div>
              <h3 className="text-lg font-medium text-white">Suspend User</h3>
              <p className="text-sm dark:text-[#BDBDBD]">
                This action will restrict the user&apos;s access.
              </p>
          </div>
          </div>
        </div>

        {/* User Info Card */}
        <div className="rounded-lg dark:bg-[#0B151D] bg-gray-50 p-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <ProfileAvatar imageSrc={userImage} isOnline={isActive} />
            </div>
            <div>
              <p className="font-medium text-white">{userName}</p>
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <span>{userId}</span>
                <span>•</span>
                <span className={isActive ? "text-success-500" : ""}>
                  Currently Active
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Form Fields */}
        <div className="space-y-5">
          {/* Suspension Duration */}
          <div>
            <Label>
              Suspension Duration <span className="text-error-500">*</span>
            </Label>
            <SelectField
              options={durationOptions}
              value={suspensionDuration}
              onChange={setSuspensionDuration}
              placeholder="Select duration"
              selectClassName="!dark:bg-[#0D0D12] !dark:text-white"
            />
          </div>

          {/* Reason Category */}
          <div>
            <Label>
              Reason Category <span className="text-error-500">*</span>
            </Label>
            <SelectField
              options={reasonOptions}
              value={reasonCategory}
              onChange={setReasonCategory}
              placeholder="Select reason"
            />
          </div>

          {/* Additional Note */}
          <div>
            <Label>Additional Note</Label>
            <div className="relative">
              <TextArea
                value={additionalNote}
                onChange={(value) => {
                  if (value.length <= maxChars) {
                    setAdditionalNote(value);
                  }
                }}
                placeholder="e.g. Violation of terms regarding fair play in room #402..."
                rows={4}
                className="pr-20"
              />
              <div className="absolute bottom-3 right-3 text-xs text-gray-400">
                {charCount}/{maxChars} characters
              </div>
            </div>
          </div>

          {/* Notify User Checkbox */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={notifyUser}
                onChange={(e) => setNotifyUser(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 text-brand-500 focus:ring-brand-500 focus:ring-2 dark:border-gray-600 dark:bg-gray-800"
              />
              <span className="text-sm text-gray-300">Notify user via email</span>
            </label>
            <p className="text-xs text-gray-400 ml-6">
              An automated email will be sent explaining the suspension.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-2 pt-4 border-t border-gray-700">
          {/* Cancel Button */}
          <button
            onClick={onClose}
            className="flex-1 h-11 px-6 py-3 rounded-md text-sm font-medium text-white transition-all duration-200 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 dark:bg-[#202023] dark:border dark:border-[#44444A] dark:shadow-[0_1px_2px_0_rgba(82,88,102,0.06)]"
            style={{
              backgroundColor: '#202023',
              border: '1px solid #44444A',
              boxShadow: '0px 1px 2px 0px rgba(82, 88, 102, 0.06)',
            }}
          >
            Cancel
          </button>

          {/* Confirm Suspension Button */}
          <button
            onClick={handleConfirm}
            className="flex-1 h-11 px-6 py-3 rounded-md text-sm font-medium text-white transition-all duration-200 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 flex items-center justify-center gap-2"
            style={{
              backgroundColor: '#EE162A',
              border: '1px solid #FF4935',
              boxShadow: 'inset 0 0 0 1.8px rgba(255, 255, 255, 0.25)',
            }}
          >
            <ConfirmSuspension/>
            Confirm Suspension
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default SuspendUserModal;
