import type { ReleaseType } from "@/src/types/releaseTypes";

export type SuperAdminDashboardStats = {
  pendingApprovals: number;
  approvedToday: number;
  totalArtists: number;
  totalReleases: number;
};

export type DashboardReleaseSummary = {
  id: string;
  name: string;
  artistName: string;
  type: ReleaseType | string;
  submittedAt: string;
  coverUrl: string | null;
  trackCount: number;
  artistNote: string | null;
};

export type DashboardArtist = {
  id: string;
  name: string;
  email: string;
  releaseCount: number;
  joinedAt: string;
  avatar: string | null;
};

export type SuperAdminDashboardData = {
  stats: SuperAdminDashboardStats;
  pendingApprovals: DashboardReleaseSummary[];
  approvedReleases: DashboardReleaseSummary[];
  rejectedReleases: DashboardReleaseSummary[];
  artists: DashboardArtist[];
};

export type SuperAdminDashboardResponse = {
  success: boolean;
  role?: string;
  data: SuperAdminDashboardData;
};
