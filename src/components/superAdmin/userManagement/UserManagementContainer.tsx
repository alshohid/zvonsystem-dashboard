'use client';

import { useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import TableTabSwitch, { type TableTab } from '@/src/components/superAdmin/pricingManagement/TableTabSwitch';
import SearchInput from '@/src/components/ui/input/searchInput/SearchInput';
import { useTabsQueryState } from '@/src/lib/helper/useTabsQueryState';
import { MOCK_MANAGED_USERS, USER_MANAGEMENT_STATS } from './mockUserManagementData';
import UserManagementStatsGrid from './UserManagementStatsGrid';
import UserManagementTable from './UserManagementTable';
import UserProfileModal from './UserProfileModal';
import type { UserRole } from './types';

type RoleFilterKey = 'all' | UserRole;

const ROLE_FILTER_TABS: TableTab<RoleFilterKey>[] = [
  { key: 'all', label: 'All' },
  { key: 'admin', label: 'Admin' },
  { key: 'user', label: 'User' },
  { key: 'artist', label: 'Artist' },
];

export default function UserManagementContainer() {
  const [roleFilter, setRoleFilter] = useTabsQueryState<RoleFilterKey>('role', 'all');
  const [query, setQuery] = useState('');
  const [viewingUserId, setViewingUserId] = useState<string | null>(null);

  const normalizedQuery = query.trim().toLowerCase();
  const filteredUsers = MOCK_MANAGED_USERS.filter(user => {
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesQuery =
      user.name.toLowerCase().includes(normalizedQuery) ||
      user.email.toLowerCase().includes(normalizedQuery);

    return matchesRole && matchesQuery;
  });

  const viewingUser = MOCK_MANAGED_USERS.find(user => user.id === viewingUserId) ?? null;

  return (
    <div className="space-y-6">
      <Link
        href="/super-admin/dashboard"
        className="inline-flex items-center gap-1 text-[13px] font-medium text-[#667085] hover:text-[#101828]"
      >
        <ChevronLeft size={14} /> Back to Admin Panel
      </Link>

      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#98A2B3]">Admin</p>
        <h1 className="mt-1 text-2xl font-semibold text-[#101828]">User Management</h1>
      </div>

      <UserManagementStatsGrid stats={USER_MANAGEMENT_STATS} />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <TableTabSwitch tabs={ROLE_FILTER_TABS} activeKey={roleFilter} onChange={setRoleFilter} />
        <SearchInput
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search users..."
          containerClassName="w-full sm:w-72"
        />
      </div>

      <UserManagementTable users={filteredUsers} onViewProfile={setViewingUserId} />

      <UserProfileModal user={viewingUser} onClose={() => setViewingUserId(null)} />
    </div>
  );
}
