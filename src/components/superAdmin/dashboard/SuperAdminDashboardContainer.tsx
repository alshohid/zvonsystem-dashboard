"use client";

import { useState } from "react";
import { useTabsQueryState } from "@/src/lib/helper/useTabsQueryState";
import {
  MOCK_PENDING_RELEASES,
  MOCK_REVIEWED_TODAY,
  MOCK_STAT_TILES,
  MOCK_USERS,
} from "./mockSuperAdminDashboard";
import StatTilesGrid from "./StatTilesGrid";
import DashboardTabBar from "./DashboardTabBar";
import PendingApprovalsPanel from "./PendingApprovalsPanel";
import ReviewedTodayPanel from "./ReviewedTodayPanel";
import UsersPanel from "./UsersPanel";

type DashboardTabKey = "pending" | "approved" | "rejected";

export default function SuperAdminDashboardContainer() {
  const [activeTab, setActiveTab] = useTabsQueryState<DashboardTabKey>("tab", "pending");
  const [pendingReleases, setPendingReleases] = useState(MOCK_PENDING_RELEASES);
  const [selectedId, setSelectedId] = useState(MOCK_PENDING_RELEASES[0]?.id ?? "");

  const removeRelease = (id: string) => {
    setPendingReleases((current) => {
      const next = current.filter((release) => release.id !== id);

      if (id === selectedId) {
        setSelectedId(next[0]?.id ?? "");
      }

      return next;
    });
  };

  const tabs = [
    { key: "pending" as const, label: "Pending Approvals", count: pendingReleases.length },
    { key: "approved" as const, label: "Approved" },
    { key: "rejected" as const, label: "Rejected" },
  ];

  return (
    <div className="space-y-6">
      <StatTilesGrid stats={MOCK_STAT_TILES} />

      <DashboardTabBar tabs={tabs} activeKey={activeTab} onChange={setActiveTab} />

      {activeTab === "pending" && (
        <PendingApprovalsPanel
          releases={pendingReleases}
          selectedId={selectedId}
          onSelect={setSelectedId}
          onApprove={removeRelease}
          onReject={removeRelease}
        />
      )}

      {activeTab === "approved" && <ReviewedTodayPanel items={MOCK_REVIEWED_TODAY} />}

      {activeTab === "rejected" && <UsersPanel users={MOCK_USERS} />}
    </div>
  );
}
