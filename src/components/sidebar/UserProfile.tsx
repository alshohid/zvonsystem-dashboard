"use client";
import React from "react";
import { Logout } from "@/src/icons/index";


interface UserProfileProps {
  name?: string;
  id?: string;
  onLogout?: () => Promise<void> | void;
  isLoggingOut?: boolean;
}

export const UserProfile: React.FC<UserProfileProps> = ({
  onLogout,
  isLoggingOut = false,
}) => {
  return (
    <div className="px-3 pb-4 ">
      <div className="mt-4 p-3">
        <div onClick={onLogout} className="flex items-center gap-3 cursor-pointer hover:bg-gray-700 rounded-lg p-2">
          <button

            className="text-gray-600 disabled:cursor-not-allowed disabled:opacity-70"
            aria-label="Logout"
            disabled={isLoggingOut}
          >
            <Logout className="w-5 h-5" />

          </button>
          <h4 className="text-[1rem] font-normal text-white">
            {isLoggingOut ? "Logging out..." : " Logout"}
          </h4>
        </div>
      </div>
    </div>
  );
};
