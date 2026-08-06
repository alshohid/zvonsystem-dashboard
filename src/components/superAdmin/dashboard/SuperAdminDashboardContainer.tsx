"use client";

import { useEffect, useMemo, useState } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";
import toast from "react-hot-toast";
import { getErrorMessage } from "@/src/lib/getErrorMessage";
import { useTabsQueryState } from "@/src/lib/helper/useTabsQueryState";
import { useGetSuperAdminDashboardQuery } from "@/src/redux/features/dashboard/superAdminDashboardApi";
import { useUpdateReleaseStatusMutation } from "@/src/redux/features/releases/releasesApi";
import type { ReleaseStatus } from "@/src/types/releaseTypes";
import type { DashboardReleaseSummary } from "@/src/types/superAdminDashboardTypes";
import DashboardTabBar from "./DashboardTabBar";
import PendingApprovalsPanel from "./PendingApprovalsPanel";
import ReviewedTodayPanel from "./ReviewedTodayPanel";
import StatTilesGrid from "./StatTilesGrid";

import UsersPanel from "./UsersPanel";
import {
  formatRelativeTime,
  formatReleaseType,
  formatSubmittedDate,
  type ReviewedItem,
  type StatTile,
  type SuperAdminUser,
} from "./types";
import SuperAdminDashboardSkeleton from "./SuperAdminDashboardSkeleton";

type DashboardTabKey = "pending" | "approved" | "rejected";

const toReviewedItem = (
  release: DashboardReleaseSummary,
  outcome: ReviewedItem["outcome"],
): ReviewedItem => ({
  id: release.id,
  title: release.name,
  artist: release.artistName,
  type: formatReleaseType(release.type),
  outcome,
  reviewedAt: formatRelativeTime(release.submittedAt),
});

export default function SuperAdminDashboardContainer() {
  const [activeTab, setActiveTab] = useTabsQueryState<DashboardTabKey>(
    "tab",
    "pending",
  );
  const [selectedId, setSelectedId] = useState("");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const { data, isLoading, isFetching, isError, refetch } =
    useGetSuperAdminDashboardQuery();
  const [updateStatus] = useUpdateReleaseStatusMutation();

  const dashboard = data?.data;
  const pendingReleases = dashboard?.pendingApprovals ?? [];

  useEffect(() => {
    if (pendingReleases.length === 0) {
      setSelectedId("");
      return;
    }

    if (!pendingReleases.some((release) => release.id === selectedId)) {
      setSelectedId(pendingReleases[0].id);
    }
  }, [pendingReleases, selectedId]);

  const stats: StatTile[] = useMemo(() => {
    if (!dashboard) return [];

    return [
      {
        id: "total-artists",
        label: "Total Artists",
        value: String(dashboard.stats.totalArtists),
      },
      {
        id: "total-releases",
        label: "Total Releases",
        value: String(dashboard.stats.totalReleases),
      },
      {
        id: "releases-in-queue",
        label: "Releases In Queue",
        value: String(dashboard.stats.pendingApprovals),
      },
      {
        id: "approved-today",
        label: "Approved Today",
        value: String(dashboard.stats.approvedToday),
      },
    ];
  }, [dashboard]);

  const approvedItems = useMemo(
    () =>
      (dashboard?.approvedReleases ?? []).map((release) =>
        toReviewedItem(release, "approved"),
      ),
    [dashboard?.approvedReleases],
  );

  const rejectedItems = useMemo(
    () =>
      (dashboard?.rejectedReleases ?? []).map((release) =>
        toReviewedItem(release, "rejected"),
      ),
    [dashboard?.rejectedReleases],
  );

  const artists: SuperAdminUser[] = useMemo(
    () =>
      (dashboard?.artists ?? []).map((artist) => ({
        id: artist.id,
        name: artist.name,
        email: artist.email,
        releaseCount: artist.releaseCount,
        joinedDate: formatSubmittedDate(artist.joinedAt),
        avatar: artist.avatar,
        status: "active",
      })),
    [dashboard?.artists],
  );

  const changeStatus = async (id: string, status: ReleaseStatus) => {
    setUpdatingId(id);

    try {
      await updateStatus({ id, status }).unwrap();
      toast.success(
        status === "APPROVED" ? "Release approved." : "Release rejected.",
      );
    } catch (statusError) {
      toast.error(getErrorMessage(statusError, "Could not update the status."));
    } finally {
      setUpdatingId(null);
    }
  };

  if (isLoading || (isFetching && !data)) {
    return <SuperAdminDashboardSkeleton />;
  }

  if (isError || !dashboard) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 rounded-[24px] border border-[#F2B7B7] bg-[#FFF1F1] p-10 text-center">
        <AlertTriangle size={28} className="text-[#DC2626]" />
        <p className="text-sm font-medium text-[#101828]">
          Couldn&apos;t load the admin dashboard.
        </p>
        <button
          type="button"
          onClick={() => refetch()}
          className="mt-1 inline-flex items-center gap-2 rounded-xl border border-[#D7DDF2] bg-white px-4 py-2 text-sm font-semibold text-[#2E3A83] transition hover:bg-[#F7F8FE]"
        >
          <RefreshCw size={14} />
          Retry
        </button>
      </div>
    );
  }

  const tabs = [
    {
      key: "pending" as const,
      label: "Pending Approvals",
      count: pendingReleases.length,
    },
    {
      key: "approved" as const,
      label: "Approved",
      count: approvedItems.length,
    },
    {
      key: "rejected" as const,
      label: "Rejected",
      count: rejectedItems.length,
    },
  ];

  return (
    <div className="space-y-6">
      <StatTilesGrid stats={stats} />

      <DashboardTabBar
        tabs={tabs}
        activeKey={activeTab}
        onChange={setActiveTab}
      />

      {activeTab === "pending" ? (
        <PendingApprovalsPanel
          releases={pendingReleases}
          selectedId={selectedId}
          updatingId={updatingId}
          onSelect={setSelectedId}
          onApprove={(id) => changeStatus(id, "APPROVED")}
          onReject={(id) => changeStatus(id, "REJECTED")}
        />
      ) : null}

      {activeTab === "approved" ? (
        <ReviewedTodayPanel
          title="Approved Releases"
          emptyMessage="No approved releases yet."
          items={approvedItems}
          buildHref={(item) =>
            `/super-admin/dashboard/releases/${item.id}?tab=approved`
          }
        />
      ) : null}

      {activeTab === "rejected" ? (
        <ReviewedTodayPanel
          title="Rejected Releases"
          emptyMessage="No rejected releases yet."
          items={rejectedItems}
          buildHref={(item) =>
            `/super-admin/dashboard/releases/${item.id}?tab=rejected`
          }
        />
      ) : null}

      <UsersPanel users={artists} />
    </div>
  );
}
