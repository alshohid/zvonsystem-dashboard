"use client";

import { useMemo, useState } from "react";
import SearchInput from "@/src/components/ui/input/searchInput/SearchInput";
import type { SuperAdminUser } from "./mockSuperAdminDashboard";
import UserListItem from "./UserListItem";

type UsersPanelProps = {
  users: SuperAdminUser[];
};

export default function UsersPanel({ users }: UsersPanelProps) {
  const [query, setQuery] = useState("");

  const filteredUsers = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return users;
    }

    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(normalizedQuery) ||
        user.email.toLowerCase().includes(normalizedQuery),
    );
  }, [users, query]);

  const handleView = (id: string) => {
    console.log("view user", id);
  };

  const handleManage = (id: string) => {
    console.log("manage user", id);
  };

  return (
    <div className="rounded-2xl border border-[#E9EDF5] bg-white p-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-sm font-semibold text-[#101828]">All Artists</h2>
        <SearchInput
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search tracks, albums..."
          containerClassName="w-full sm:w-72"
        />
      </div>

      <div className="mt-2 divide-y divide-[#EEF2ED]">
        {filteredUsers.map((user) => (
          <UserListItem key={user.id} user={user} onView={handleView} onManage={handleManage} />
        ))}

        {filteredUsers.length === 0 && (
          <p className="py-6 text-center text-sm text-[#667085]">No artists match your search.</p>
        )}
      </div>
    </div>
  );
}
