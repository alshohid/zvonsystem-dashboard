"use client";

import { useDeferredValue, useState } from "react";
import SearchInput from "@/src/components/ui/input/searchInput/SearchInput";
import SelectField, {
  type SelectOption,
} from "@/src/components/ui/input/searchInput/SelectField";
import ReusablePagination from "@/src/components/tables/ReusablePagination";
import UserManagementTable, {
  type UserRecord,
} from "@/src/components/admin/user-management/UserManagementTable";

const PAGE_SIZE = 8;

const USER_RECORDS: UserRecord[] = [
  {
    id: "usr-01",
    userType: "Driver",
    name: "John Doe",
    carrier: "Swift Logistics Inc.",
    carrierCode: "MC123456",
    date: "2024-03-29",
    status: "Approved",
  },
  {
    id: "usr-02",
    userType: "Dispatcher",
    name: "Emily Johnson",
    carrier: "Metro Dispatch Co.",
    carrierCode: "MC123456",
    date: "2024-03-29",
    status: "Pending",
  },
  {
    id: "usr-03",
    userType: "Driver",
    name: "Sophia Davis",
    carrier: "Swift Logistics Inc.",
    carrierCode: "MC123456",
    date: "2024-03-29",
    status: "Approved",
  },
  {
    id: "usr-04",
    userType: "Driver",
    name: "Sophia Davis",
    carrier: "Swift Logistics Inc.",
    carrierCode: "MC123456",
    date: "2024-03-29",
    status: "Approved",
  },
  {
    id: "usr-05",
    userType: "Driver",
    name: "Sophia Davis",
    carrier: "Swift Logistics Inc.",
    carrierCode: "MC123456",
    date: "2024-03-29",
    status: "Approved",
  },
  {
    id: "usr-06",
    userType: "Dispatcher",
    name: "David Wilson",
    carrier: "Express Transport",
    carrierCode: "MC123456",
    date: "2024-03-29",
    status: "Pending",
  },
  {
    id: "usr-07",
    userType: "Dispatcher",
    name: "David Wilson",
    carrier: "Express Transport",
    carrierCode: "MC123456",
    date: "2024-03-29",
    status: "Pending",
  },
  {
    id: "usr-08",
    userType: "Dispatcher",
    name: "David Wilson",
    carrier: "Express Transport",
    carrierCode: "MC123456",
    date: "2024-03-29",
    status: "Pending",
  },
  {
    id: "usr-09",
    userType: "Dispatcher",
    name: "Daniel Anderson",
    carrier: "Metro Dispatch Co.",
    carrierCode: "MC123456",
    date: "2024-03-29",
    status: "Rejected",
  },
  {
    id: "usr-10",
    userType: "Dispatcher",
    name: "Daniel Anderson",
    carrier: "Metro Dispatch Co.",
    carrierCode: "MC123456",
    date: "2024-03-29",
    status: "Rejected",
  },
];

const typeOptions: SelectOption[] = [
  { value: "all", label: "All types" },
  { value: "Driver", label: "Driver" },
  { value: "Dispatcher", label: "Dispatcher" },
];

const statusOptions: SelectOption[] = [
  { value: "all", label: "All status" },
  { value: "Approved", label: "Approved" },
  { value: "Pending", label: "Pending" },
  { value: "Rejected", label: "Rejected" },
];

const sortOptions: SelectOption[] = [
  { value: "newest", label: "Newest" },
  { value: "oldest", label: "Oldest" },
  { value: "az", label: "A - Z" },
];

export default function UserManagementContainer() {
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [page, setPage] = useState(1);
  const deferredQuery = useDeferredValue(query);

  const normalizedQuery = deferredQuery.trim().toLowerCase();

  const filteredUsers = USER_RECORDS.filter((user) => {
    const matchesQuery =
      normalizedQuery.length === 0 ||
      user.name.toLowerCase().includes(normalizedQuery) ||
      user.userType.toLowerCase().includes(normalizedQuery) ||
      user.carrier.toLowerCase().includes(normalizedQuery);

    const matchesType = typeFilter === "all" || user.userType === typeFilter;
    const matchesStatus =
      statusFilter === "all" || user.status === statusFilter;

    return matchesQuery && matchesType && matchesStatus;
  }).sort((left, right) => {
    if (sortBy === "az") {
      return left.name.localeCompare(right.name);
    }

    const leftDate = new Date(left.date).getTime();
    const rightDate = new Date(right.date).getTime();

    return sortBy === "oldest" ? leftDate - rightDate : rightDate - leftDate;
  });

  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);

  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-[#E4E7EC] bg-white p-4 shadow-[0_1px_2px_rgba(16,24,40,0.04)] sm:p-5">
        <div className="flex flex-col gap-4">
          <div>
            <h2 className="text-[1.75rem] font-semibold tracking-[-0.03em] text-[#101828]">
              User management
            </h2>
          </div>

          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
            <SearchInput
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setPage(1);
              }}
              placeholder="Search by name/type"
              containerClassName="w-full lg:flex-1"
              inputClassName="h-10 rounded-xl border-[#D8E2EE] bg-[#F8FAFB] pl-11 pr-4 text-sm text-[#101828] shadow-none placeholder:text-[#98A2B3] focus:border-[#C9D3E0] focus:bg-[#F8FAFB] focus:ring-0"
            />

            <SelectField
              value={typeFilter}
              onChange={(value) => {
                setTypeFilter(value);
                setPage(1);
              }}
              options={typeOptions}
              placeholder="User type"
              wrapperClassName="w-full sm:w-[120px]"
              selectClassName="bg-[#FCFCFD]"
            />

            <SelectField
              value={statusFilter}
              onChange={(value) => {
                setStatusFilter(value);
                setPage(1);
              }}
              options={statusOptions}
              placeholder="Status"
              wrapperClassName="w-full sm:w-[120px]"
              selectClassName="bg-[#FCFCFD]"
            />

            <SelectField
              value={sortBy}
              onChange={(value) => {
                setSortBy(value);
                setPage(1);
              }}
              options={sortOptions}
              placeholder="Newest"
              wrapperClassName="w-full sm:w-[116px]"
              selectClassName="bg-[#FCFCFD]"
            />
          </div>
        </div>

        <div className="mt-4 overflow-hidden rounded-[12px] border border-[#E4E7EC] bg-white">
          <UserManagementTable items={paginatedUsers} />

          <ReusablePagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={filteredUsers.length}
            pageSize={PAGE_SIZE}
            itemLabel="results"
            onPageChange={setPage}
          />
        </div>
      </section>
    </div>
  );
}
