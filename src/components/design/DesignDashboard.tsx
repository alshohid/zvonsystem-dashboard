"use client";

import { useMemo, useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  BadgeCheck,
  ChevronDown,
  Clock3,
  Link2,
  Search,
  Truck,
  Users,
  Wallet,
} from "lucide-react";
import OnboardingDocumentsModal from "@/src/components/admin/documents/OnboardingDocumentsModal";
import type { DocumentRecord } from "@/src/components/admin/documents/documentTypes";

const BRAND_PRIMARY = "#2E3A83";
const BRAND_LINE = "#D8E0FF";

const revenueTrend = [
  { month: "Jan", revenue: 46000 },
  { month: "Feb", revenue: 52000 },
  { month: "Mar", revenue: 50000 },
  { month: "Apr", revenue: 62000 },
  { month: "May", revenue: 56000 },
  { month: "Jun", revenue: 68000 },
];

const userGrowth = [
  { month: "Jan", users: 46 },
  { month: "Feb", users: 53 },
  { month: "Mar", users: 59 },
  { month: "Apr", users: 64 },
  { month: "May", users: 69 },
  { month: "Jun", users: 74 },
];

type DocumentStatus = "Approved" | "Pending" | "Rejected";

type DocumentItem = {
  id: string;
  userType: string;
  name: string;
  company: string;
  reference: string;
  date: string;
  status: DocumentStatus;
};

const driverUploadedDocumentTypes = [
  "CDL License",
  "Medical Card",
  "Driver Application",
];

const dispatcherUploadedDocumentTypes = [
  "Dispatch Agreement",
  "W-9 Form",
  "Carrier Packet",
];

const documents: DocumentItem[] = [
  {
    id: "1",
    userType: "Driver",
    name: "John Doe",
    company: "Swift Logistics Inc.",
    reference: "MC123456",
    date: "2024-03-29",
    status: "Approved",
  },
  {
    id: "2",
    userType: "Dispatcher",
    name: "Emily Johnson",
    company: "Metro Dispatch Co.",
    reference: "MC123456",
    date: "2024-03-29",
    status: "Pending",
  },
  {
    id: "3",
    userType: "Driver",
    name: "Sophia Davis",
    company: "Swift Logistics Inc.",
    reference: "MC123456",
    date: "2024-03-29",
    status: "Approved",
  },
  {
    id: "4",
    userType: "Dispatcher",
    name: "David Wilson",
    company: "Express Transport",
    reference: "MC123456",
    date: "2024-03-29",
    status: "Pending",
  },
  {
    id: "5",
    userType: "Dispatcher",
    name: "Daniel Anderson",
    company: "Metro Dispatch Co.",
    reference: "MC123456",
    date: "2024-03-29",
    status: "Rejected",
  },
  {
    id: "6",
    userType: "Driver",
    name: "Mia Turner",
    company: "Blue Ridge Freight",
    reference: "MC194320",
    date: "2024-03-30",
    status: "Approved",
  },
  {
    id: "7",
    userType: "Dispatcher",
    name: "Lucas Martin",
    company: "Highway Link Partners",
    reference: "MC812334",
    date: "2024-03-30",
    status: "Pending",
  },
  {
    id: "8",
    userType: "Driver",
    name: "Olivia White",
    company: "Northern Carrier Group",
    reference: "MC728590",
    date: "2024-03-30",
    status: "Approved",
  },
  {
    id: "9",
    userType: "Dispatcher",
    name: "Ava Thomas",
    company: "Red Canyon Dispatch",
    reference: "MC883104",
    date: "2024-03-31",
    status: "Rejected",
  },
  {
    id: "10",
    userType: "Driver",
    name: "Ethan Lewis",
    company: "Everline Transport",
    reference: "MC690114",
    date: "2024-03-31",
    status: "Approved",
  },
];

const PAGE_SIZE = 5;

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);

const formatLargeNumber = (value: number) =>
  new Intl.NumberFormat("en-US").format(value);

const cardData = [
  {
    title: "Total Carriers",
    value: "32",
    icon: Truck,
  },
  {
    title: "Total Dispatcher",
    value: "28",
    icon: Users,
  },
  {
    title: "Monthly Revenue",
    value: "20",
    icon: Wallet,
  },
];

const statusClasses: Record<DocumentStatus, string> = {
  Approved: "border-[#B8E7C1] bg-[#ECFDF3] text-[#16A34A]",
  Pending: "border-[#F9D59A] bg-[#FFF7E8] text-[#D97706]",
  Rejected: "border-[#F2B7B7] bg-[#FFF1F1] text-[#DC2626]",
};

const tooltipFormatter = (value: unknown) => {
  const normalizedValue = Array.isArray(value) ? value[0] : value;
  return formatCurrency(Number(normalizedValue ?? 0));
};

const buildDashboardDocumentRecord = (
  item: DocumentItem,
  type = `${item.userType} Onboarding`,
): DocumentRecord => ({
  id: `dashboard-${item.id}`,
  carrier: item.company,
  dispatcher: item.name,
  type,
  document: `${item.name.replace(/\s+/g, "_")}_${type.replace(/\s+/g, "_")}.pdf`,
  date: item.date,
  status: item.status,
});

const getUploadedDocumentsForDashboardItem = (item: DocumentItem) => {
  const documentTypes =
    item.userType === "Driver"
      ? driverUploadedDocumentTypes
      : dispatcherUploadedDocumentTypes;

  return documentTypes.map((type, index) => ({
    ...buildDashboardDocumentRecord(item, type),
    id: `dashboard-${item.id}-uploaded-${index + 1}`,
    document: `${item.name.replace(/\s+/g, "_")}_${type.replace(/\s+/g, "_")}.pdf`,
  }));
};

export default function DesignDashboard() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<"All" | DocumentStatus>("All");
  const [sortBy, setSortBy] = useState<"Newest" | "Oldest">("Newest");
  const [page, setPage] = useState(1);
  const [selectedItem, setSelectedItem] = useState<DocumentItem | null>(null);

  const filteredDocuments = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    const result = documents.filter((item) => {
      const matchesQuery =
        normalizedQuery.length === 0 ||
        item.name.toLowerCase().includes(normalizedQuery) ||
        item.userType.toLowerCase().includes(normalizedQuery) ||
        item.company.toLowerCase().includes(normalizedQuery);

      const matchesStatus = status === "All" || item.status === status;

      return matchesQuery && matchesStatus;
    });

    return result.sort((left, right) => {
      const leftDate = new Date(left.date).getTime();
      const rightDate = new Date(right.date).getTime();

      return sortBy === "Newest" ? rightDate - leftDate : leftDate - rightDate;
    });
  }, [query, sortBy, status]);

  const totalPages = Math.max(1, Math.ceil(filteredDocuments.length / PAGE_SIZE));

  const currentPageItems = useMemo(() => {
    const currentPage = Math.min(page, totalPages);
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredDocuments.slice(start, start + PAGE_SIZE);
  }, [filteredDocuments, page, totalPages]);

  const currentPage = Math.min(page, totalPages);
  const startIndex = filteredDocuments.length === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1;
  const endIndex = Math.min(currentPage * PAGE_SIZE, filteredDocuments.length);

  const pagesToRender = useMemo(() => {
    if (totalPages <= 3) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    if (currentPage <= 2) {
      return [1, 2, 3];
    }

    if (currentPage >= totalPages - 1) {
      return [totalPages - 2, totalPages - 1, totalPages];
    }

    return [currentPage - 1, currentPage, currentPage + 1];
  }, [currentPage, totalPages]);

  const selectedDocument = useMemo(
    () => (selectedItem ? buildDashboardDocumentRecord(selectedItem) : null),
    [selectedItem],
  );

  const selectedUploadedDocuments = useMemo(
    () => (selectedItem ? getUploadedDocumentsForDashboardItem(selectedItem) : []),
    [selectedItem],
  );

  const handleCloseModal = () => {
    setSelectedItem(null);
  };

  return (
    <>
    <div className="space-y-6">
      <div className="grid gap-4 xl:grid-cols-3">
        {cardData.map(({ title, value, icon: Icon }) => (
          <div
            key={title}
            className="rounded-lg border border-[#E7EBF7] bg-[#F8FAFB] p-6 shadow-[0_16px_40px_rgba(46,58,131,0.06)]"
          >
            <div className="flex items-start justify-start gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-[#CACEE2] text-[#2E3A83]">
                <Icon size={22} />
              </div>

              <div className="flex flex-col gap-2">
                <h2 className="text-[2rem] font-semibold leading-none text-[#101828]">
                  {value}
                </h2>
                <p className="mt-2 text-sm text-[#667085]">{title}</p>
              </div>
            </div>

          </div>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <section className="rounded-[24px] border border-[#E7EBF7] bg-white p-5 shadow-[0_18px_45px_rgba(46,58,131,0.06)] sm:p-6">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h3 className="text-lg font-semibold text-[#101828]">
                Revenue Trend
              </h3>
              <p className="mt-1 text-sm text-[#667085]">
                Monitoring revenue movement over the last 6 months
              </p>
            </div>
            <div className="rounded-full border border-[#DDE4FB] bg-[#F8FAFF] px-3 py-1 text-sm font-medium text-[#51608C]">
              {formatCurrency(revenueTrend[revenueTrend.length - 1].revenue)}
            </div>
          </div>

          <div className="mt-6 h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueTrend} margin={{ top: 12, right: 8, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={BRAND_PRIMARY} stopOpacity={0.34} />
                    <stop offset="95%" stopColor={BRAND_PRIMARY} stopOpacity={0.04} />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} stroke={BRAND_LINE} strokeDasharray="4 4" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "#667085", fontSize: 12 }} />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#667085", fontSize: 12 }}
                  tickFormatter={(value) => formatLargeNumber(value)}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: 16,
                    borderColor: "#D8E0FF",
                    boxShadow: "0 16px 40px rgba(46,58,131,0.12)",
                  }}
                  formatter={(value) => tooltipFormatter(value)}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke={BRAND_PRIMARY}
                  strokeWidth={3}
                  fill="url(#revenueFill)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="rounded-[24px] border border-[#E7EBF7] bg-white p-5 shadow-[0_18px_45px_rgba(46,58,131,0.06)] sm:p-6">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h3 className="text-lg font-semibold text-[#101828]">
                User Growth
              </h3>
              <p className="mt-1 text-sm text-[#667085]">
                Active onboarded users month by month
              </p>
            </div>
            <div className="rounded-full border border-[#DDE4FB] bg-[#F8FAFF] px-3 py-1 text-sm font-medium text-[#51608C]">
              {userGrowth[userGrowth.length - 1].users} users
            </div>
          </div>

          <div className="mt-6 h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={userGrowth} margin={{ top: 12, right: 8, left: -20, bottom: 0 }}>
                <CartesianGrid vertical={false} stroke={BRAND_LINE} strokeDasharray="4 4" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "#667085", fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: "#667085", fontSize: 12 }} />
                <Tooltip
                  cursor={{ fill: "#F8FAFF" }}
                  contentStyle={{
                    borderRadius: 16,
                    borderColor: "#D8E0FF",
                    boxShadow: "0 16px 40px rgba(46,58,131,0.12)",
                  }}
                />
                <Bar dataKey="users" fill={BRAND_PRIMARY} radius={[10, 10, 0, 0]} barSize={28} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>
      </div>

      <section className="rounded-[24px] border border-[#E7EBF7] bg-white p-5 shadow-[0_18px_45px_rgba(46,58,131,0.06)] sm:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h3 className="text-[1.75rem] font-semibold text-[#101828]">
              Recent Onboarding Documents
            </h3>
            <p className="mt-2 text-sm text-[#667085]">
              Review onboarding progress without touching the old backend layer.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <label className="relative min-w-[260px] flex-1 lg:w-[320px]">
              <Search
                size={18}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#667085]"
              />
              <input
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setPage(1);
                }}
                placeholder="Search by name/type"
                className="h-12 w-full rounded-2xl border border-[#D7DDF2] bg-[#FBFCFF] pl-11 pr-4 text-sm text-[#101828] outline-none transition placeholder:text-[#98A2B3] focus:border-[#2E3A83] focus:bg-white"
              />
            </label>

            <div className="relative">
              <select
                value={status}
                onChange={(event) => {
                  setStatus(event.target.value as "All" | DocumentStatus);
                  setPage(1);
                }}
                className="h-12 appearance-none rounded-2xl border border-[#D7DDF2] bg-[#FBFCFF] px-4 pr-10 text-sm font-medium text-[#344054] outline-none transition focus:border-[#2E3A83] focus:bg-white"
              >
                <option value="All">All Status</option>
                <option value="Approved">Approved</option>
                <option value="Pending">Pending</option>
                <option value="Rejected">Rejected</option>
              </select>
              <ChevronDown size={16} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#667085]" />
            </div>

            <div className="relative">
              <select
                value={sortBy}
                onChange={(event) => setSortBy(event.target.value as "Newest" | "Oldest")}
                className="h-12 appearance-none rounded-2xl border border-[#D7DDF2] bg-[#FBFCFF] px-4 pr-10 text-sm font-medium text-[#344054] outline-none transition focus:border-[#2E3A83] focus:bg-white"
              >
                <option value="Newest">Newest</option>
                <option value="Oldest">Oldest</option>
              </select>
              <ChevronDown size={16} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#667085]" />
            </div>
          </div>
        </div>

        <div className="mt-6 overflow-hidden rounded-[20px] border border-[#E5EAF7]">
          <div className="overflow-x-auto">
            <table className="min-w-full border-separate border-spacing-0">
              <thead>
                <tr className="bg-[#F8FAFF] text-left">
                  {["User type", "Name", "Carrier", "Date", "Status", ""].map((label) => (
                    <th
                      key={label}
                      className="border-b border-[#E5EAF7] px-5 py-4 text-xs font-semibold uppercase tracking-[0.14em] text-[#667085]"
                    >
                      {label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {currentPageItems.map((item) => (
                  <tr key={item.id} className="bg-white">
                    <td className="border-b border-[#EEF1F7] px-5 py-4 text-sm text-[#475467]">
                      {item.userType}
                    </td>
                    <td className="border-b border-[#EEF1F7] px-5 py-4 text-sm font-medium text-[#101828]">
                      {item.name}
                    </td>
                    <td className="border-b border-[#EEF1F7] px-5 py-4">
                      <p className="text-sm font-medium text-[#101828]">
                        {item.company}
                      </p>
                      <p className="mt-1 text-xs text-[#98A2B3]">{item.reference}</p>
                    </td>
                    <td className="border-b border-[#EEF1F7] px-5 py-4 text-sm text-[#475467]">
                      {item.date}
                    </td>
                    <td className="border-b border-[#EEF1F7] px-5 py-4">
                      <span
                        className={[
                          "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold",
                          statusClasses[item.status],
                        ].join(" ")}
                      >
                        {item.status === "Approved" && <BadgeCheck size={14} />}
                        {item.status === "Pending" && <Clock3 size={14} />}
                        {item.status === "Rejected" && <Clock3 size={14} />}
                        {item.status}
                      </span>
                    </td>
                    <td className="border-b border-[#EEF1F7] px-5 py-4 text-right">
                      <button
                        type="button"
                        onClick={() => setSelectedItem(item)}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-[#E1E7F5] text-[#667085] transition hover:bg-[#F7F8FE] hover:text-[#2E3A83]"
                        aria-label={`Open ${item.name}`}
                      >
                        <Link2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}

                {currentPageItems.length === 0 && (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-5 py-12 text-center text-sm text-[#667085]"
                    >
                      No documents matched the current filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col gap-4 border-t border-[#E5EAF7] bg-white px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-[#667085]">
              Showing {startIndex} to {endIndex} of {filteredDocuments.length} results
            </p>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setPage((value) => Math.max(1, value - 1))}
                className="inline-flex h-9 min-w-9 items-center justify-center rounded-xl border border-[#D7DDF2] px-3 text-sm font-medium text-[#344054] transition hover:bg-[#F7F8FE]"
              >
                Prev
              </button>

              {pagesToRender.map((pageNumber) => (
                <button
                  key={pageNumber}
                  type="button"
                  onClick={() => setPage(pageNumber)}
                  className={[
                    "inline-flex h-9 min-w-9 items-center justify-center rounded-xl border px-3 text-sm font-medium transition",
                    pageNumber === currentPage
                      ? "border-[#2E3A83] bg-[#2E3A83] text-white"
                      : "border-[#D7DDF2] text-[#344054] hover:bg-[#F7F8FE]",
                  ].join(" ")}
                >
                  {pageNumber}
                </button>
              ))}

              <button
                type="button"
                onClick={() => setPage((value) => Math.min(totalPages, value + 1))}
                className="inline-flex h-9 min-w-9 items-center justify-center rounded-xl border border-[#D7DDF2] px-3 text-sm font-medium text-[#344054] transition hover:bg-[#F7F8FE]"
              >
                Next
              </button>
            </div>
          </div>
        </div>

      </section>
    </div>
    <OnboardingDocumentsModal
      isOpen={Boolean(selectedItem)}
      onClose={handleCloseModal}
      document={selectedDocument}
      uploadedDocuments={selectedUploadedDocuments}
      userType={selectedItem?.userType ?? "Dispatcher"}
    />
    </>
  );
}
