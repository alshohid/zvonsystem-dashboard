"use client";

import { useState } from "react";
import OnboardingDocumentsModal from "@/src/components/admin/documents/OnboardingDocumentsModal";
import { dispatcherCarrierDocuments } from "@/src/components/admin/documents/documentMockData";
import type { DocumentRecord } from "@/src/components/admin/documents/documentTypes";
import ReusableTable from "@/src/components/tables/ReusableTable";
import { FileDocumentIcon } from "@/src/icons";

export type UserType = "Driver" | "Dispatcher";
export type UserStatus = "Approved" | "Pending" | "Rejected";

export type UserRecord = {
  id: string;
  userType: UserType;
  name: string;
  carrier: string;
  carrierCode: string;
  date: string;
  status: UserStatus;
};

type UserManagementTableProps = {
  items: UserRecord[];
  emptyText?: string;
};

const tableHeader = ["User type", "Name", "Carrier", "Date", "Status", ""];

const statusBadgeClasses: Record<UserStatus, string> = {
  Approved: "border-[#86EFAC] bg-[#F0FDF4] text-[#16A34A]",
  Pending: "border-[#F9D59A] bg-[#FFF7E8] text-[#D97706]",
  Rejected: "border-[#FDA4AF] bg-[#FFF1F3] text-[#E11D48]",
};

function StatusBadge({ status }: { status: UserStatus }) {
  return (
    <span
      className={[
        "inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium leading-none",
        statusBadgeClasses[status],
      ].join(" ")}
    >
      {status}
    </span>
  );
}

function buildOnboardingDocument(user: UserRecord): DocumentRecord {
  return {
    id: "onboarding-" + user.id,
    carrier: user.carrier,
    dispatcher: user.name,
    type: "Onboarding Documents",
    document: "Onboarding_Documents.pdf",
    date: user.date,
    status: user.status,
  };
}

function buildUploadedDocuments(user: UserRecord): DocumentRecord[] {
  return dispatcherCarrierDocuments.map((document) => ({
    ...document,
    id: user.id + "-" + document.id,
    carrier: user.carrier,
    dispatcher: user.name,
    date: user.date,
  }));
}

export default function UserManagementTable({
  items,
  emptyText = "No users matched the current filters.",
}: UserManagementTableProps) {
  const [selectedUser, setSelectedUser] = useState<UserRecord | null>(null);
  const onboardingDocument = selectedUser
    ? buildOnboardingDocument(selectedUser)
    : null;
  const uploadedDocuments = selectedUser ? buildUploadedDocuments(selectedUser) : [];

  const closeOnboardingModal = () => {
    setSelectedUser(null);
  };

  return (
    <>
      <ReusableTable<UserRecord>
        tableHeader={tableHeader}
        items={items}
        getRowKey={(user) => user.id}
        minTableWidthPx={760}
        wrapperClassName="rounded-none border-0 bg-transparent shadow-none"
        tableClassName="w-full border-separate border-spacing-0"
        tableBodyClassName="divide-y-0"
        rowClassName="bg-white transition hover:bg-[#FCFCFD]"
        headerCellClassName="border-b border-[#EAECF0] bg-[#F8FAFC] px-4 py-3 text-left text-[13px] font-medium text-[#667085] first:rounded-tl-[10px] last:rounded-tr-[10px]"
        bodyCellClassName="border-b border-[#EAECF0] px-4 py-4 align-middle text-sm text-[#101828] last:w-[56px]"
        emptyText={emptyText}
        emptyCellClassName="block px-5 py-16 text-center text-sm text-[#667085]"
        rowRenderers={[
          (user) => <span className="text-[1rem] text-[#101828]">{user.userType}</span>,
          (user) => <span className="text-[1rem] text-[#101828]">{user.name}</span>,
          (user) => (
            <div>
              <p className="text-[1rem] font-medium text-[#101828]">{user.carrier}</p>
              <p className="mt-1 text-xs text-[#98A2B3]">{user.carrierCode}</p>
            </div>
          ),
          (user) => <span className="text-[1rem] text-[#101828]">{user.date}</span>,
          (user) => <StatusBadge status={user.status} />,
          (user) => (
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedUser(user)}
                className="inline-flex h-8 w-8 items-center justify-center rounded-full text-[#98A2B3] transition hover:bg-[#F2F4F7] hover:text-[#667085]"
                aria-label={"View onboarding documents for " + user.name}
              >
                <FileDocumentIcon />
              </button>
            </div>
          ),
        ]}
      />

      <OnboardingDocumentsModal
        isOpen={Boolean(selectedUser)}
        onClose={closeOnboardingModal}
        document={onboardingDocument}
        uploadedDocuments={uploadedDocuments}
        userType={selectedUser?.userType ?? ""}
      />

    </>
  );
}
