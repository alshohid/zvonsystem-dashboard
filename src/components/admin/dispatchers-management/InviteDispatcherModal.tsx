"use client";

import { Eye, EyeOff, MailPlus, X } from "lucide-react";
import { useState } from "react";
import { Modal } from "@/src/components/ui/modal";

type InviteDispatcherModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onInvite: (email: string) => void;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function InviteDispatcherModal({
  isOpen,
  onClose,
  onInvite,
}: InviteDispatcherModalProps) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const isValidEmail = emailPattern.test(email.trim());
  const isValidForm =
    fullName.trim().length > 0 &&
    isValidEmail &&
    password.trim().length > 0 &&
    phoneNumber.trim().length > 0;

  const handleClose = () => {
    setFullName("");
    setEmail("");
    setPassword("");
    setPhoneNumber("");
    setShowPassword(false);
    onClose();
  };

  const handleInvite = () => {
    if (!isValidForm) {
      return;
    }

    onInvite(email.trim());
    handleClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      showCloseButton={false}
      className="mx-3 max-w-195 rounded-3xl border border-[#E4E7EC] bg-[#FFFFFF] shadow-[0_24px_56px_rgba(16,24,40,0.16)] sm:mx-4"
    >
      <div className="p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-[1.65rem] font-semibold tracking-[-0.03em] text-[#101828]">
            Add a Dispatcher
          </h3>

          <button
            type="button"
            onClick={handleClose}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#E4E7EC] bg-white text-[#344054] transition hover:bg-[#F8FAFC]"
            aria-label="Close invite modal"
          >
            <X size={18} />
          </button>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          <div>
            <label
              htmlFor="dispatcher-full-name"
              className="mb-2 block text-[1rem] font-medium text-[#101828]"
            >
              Full Name
            </label>
            <input
              id="dispatcher-full-name"
              type="text"
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
              placeholder="Your full name"
              className="h-[3.25rem] w-full rounded-xl border border-[#D7DDE8] bg-white px-4 text-base text-[#101828] outline-none transition placeholder:text-[#98A2B3] focus:border-[#C9D3E0]"
            />
          </div>

          <div>
            <label
              htmlFor="dispatcher-email"
              className="mb-2 block text-[1rem] font-medium text-[#101828]"
            >
              Email
            </label>
            <input
              id="dispatcher-email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Enter the invite email address"
              className="h-[3.25rem] w-full rounded-xl border border-[#D7DDE8] bg-white px-4 text-base text-[#101828] outline-none transition placeholder:text-[#98A2B3] focus:border-[#C9D3E0]"
            />
          </div>

          <div>
            <label
              htmlFor="dispatcher-password"
              className="mb-2 block text-[1rem] font-medium text-[#101828]"
            >
              Password
            </label>

            <div className="relative">
              <input
                id="dispatcher-password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Your password"
                className="h-[3.25rem] w-full rounded-xl border border-[#D7DDE8] bg-white px-4 pr-12 text-base text-[#101828] outline-none transition placeholder:text-[#98A2B3] focus:border-[#C9D3E0]"
              />

              <button
                type="button"
                onClick={() => setShowPassword((current) => !current)}
                className="absolute right-3 top-1/2 inline-flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-[#98A2B3] transition hover:bg-[#F2F4F7] hover:text-[#667085]"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div>
            <label
              htmlFor="dispatcher-phone"
              className="mb-2 block text-[1rem] font-medium text-[#101828]"
            >
              Phone Number
            </label>
            <input
              id="dispatcher-phone"
              type="tel"
              value={phoneNumber}
              onChange={(event) => setPhoneNumber(event.target.value)}
              placeholder="Your phone number"
              className="h-[3.25rem] w-full rounded-xl border border-[#D7DDE8] bg-white px-4 text-base text-[#101828] outline-none transition placeholder:text-[#98A2B3] focus:border-[#C9D3E0]"
            />
          </div>
        </div>

        <div className="mt-7 grid gap-3 sm:grid-cols-2">
          <button
            type="button"
            onClick={handleClose}
            className="inline-flex h-[3rem] items-center justify-center rounded-xl border border-[#D7DDE8] bg-white px-5 text-[1.05rem] font-medium text-[#101828] transition hover:bg-[#F8FAFC]"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleInvite}
            disabled={!isValidForm}
            className="inline-flex h-[3rem] items-center justify-center gap-2 rounded-xl bg-[#394492] px-5 text-[1.05rem] font-medium text-white transition hover:bg-[#2F397F] disabled:cursor-not-allowed disabled:bg-[#B8C1E5]"
          >
            <MailPlus size={18} />
            Invite Dispatcher
          </button>
        </div>
      </div>
    </Modal>
  );
}
