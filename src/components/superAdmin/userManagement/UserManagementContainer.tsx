/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import { useState, useMemo, useEffect } from 'react';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import TableTabSwitch, { type TableTab } from '@/src/components/superAdmin/pricingManagement/TableTabSwitch';
import SearchInput from '@/src/components/ui/input/searchInput/SearchInput';
import { useTabsQueryState } from '@/src/lib/helper/useTabsQueryState';
import UserManagementTable from './UserManagementTable';
import UserManagementTableSkeleton from './UserManagementTableSkeleton';
import UserProfileModal from './UserProfileModal';
import ReusablePagination from '@/src/components/tables/ReusablePagination';
import type { UserRole, ManagedUser } from './types';
import { useDebouncedValue } from '@/src/lib/helper/useDebouncedValue';
import { useGetAllArtistsQuery } from '@/src/redux/features/auth/authapi';
import type { IUser } from '@/src/types/auth';

type RoleFilterKey = 'all' | UserRole;

const ROLE_FILTER_TABS: TableTab<RoleFilterKey>[] = [
  { key: 'artist', label: 'All Artist' },
];

const PAGE_SIZE = 10;

function mapApiUserToManagedUser(apiUser: IUser): ManagedUser {
  const joinedDate = new Date(apiUser.joinedAt);
  const formattedDate = joinedDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return {
    id: apiUser.id,
    userId: apiUser.id,
    name: apiUser.name,
    email: apiUser.email,
    releaseCount: apiUser.releaseCount,
    joinedDate: formattedDate,
    lastUpdatedDate: formattedDate,
  };
}

export default function UserManagementContainer() {
  const [roleFilter, setRoleFilter] = useTabsQueryState<RoleFilterKey>('role', 'all');
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [viewingUserId, setViewingUserId] = useState<string | null>(null);
  const debouncedQuery = useDebouncedValue(query, 500);

  useEffect(() => {
    setPage(1);
  }, [debouncedQuery]);

  const { data, isLoading, isFetching, isError } = useGetAllArtistsQuery({
    search: debouncedQuery,
    limit: PAGE_SIZE,
    page,
  });

  const apiUsers = data?.data ?? [];
  const paginationMeta = data?.meta;

  const managedUsers = useMemo(() => {
    return apiUsers.map(mapApiUserToManagedUser);
  }, [apiUsers]);

  const viewingUser = useMemo(() => {
    return managedUsers.find(user => user.id === viewingUserId) ?? null;
  }, [managedUsers, viewingUserId]);

  const totalPages = paginationMeta?.total_pages ?? 1;
  const totalItems = paginationMeta?.total ?? 0;

  return (
    <div className="space-y-6">
      <Link
        href="/super-admin/dashboard"
        className="inline-flex items-center gap-1 text-[13px] font-medium text-[#667085] hover:text-[#101828]"
      >
        <ChevronLeft size={14} /> Back to Admin Panel
      </Link>

      <div>
        {/* <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#98A2B3]">Admin</p> */}
        <h1 className="mt-1 text-2xl font-semibold text-[#101828]">User Management</h1>
      </div>

      {/* <UserManagementStatsGrid stats={USER_MANAGEMENT_STATS} /> */}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <TableTabSwitch tabs={ROLE_FILTER_TABS} activeKey={roleFilter} onChange={setRoleFilter} />
        <SearchInput
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search users..."
          containerClassName="w-full sm:w-72"
        />
      </div>

      {isLoading || (isFetching && managedUsers.length === 0) ? (
        <UserManagementTableSkeleton count={PAGE_SIZE} />
      ) : isError ? (
        <div className="rounded-2xl border border-[#FECDD3] bg-[#FEF2F2] py-12 text-center">
          <p className="text-sm font-medium text-[#B42318]">
            Failed to load users. Please try again later.
          </p>
        </div>
      ) : (
        <>
          <UserManagementTable
            users={managedUsers}
            onViewProfile={setViewingUserId}
            isLoading={isFetching && managedUsers.length > 0}
          />

          {totalPages > 1 && (
            <ReusablePagination
              currentPage={page}
              totalPages={totalPages}
              totalItems={totalItems}
              pageSize={PAGE_SIZE}
              onPageChange={setPage}
              itemLabel="users"
              className="rounded-2xl border border-[#E9EDF5]"
            />
          )}
        </>
      )}

      <UserProfileModal user={viewingUser} onClose={() => setViewingUserId(null)} />
    </div>
  );
}
