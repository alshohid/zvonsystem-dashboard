import type { ManagedUser, UserManagementStat } from "./types";

export const USER_MANAGEMENT_STATS: UserManagementStat[] = [
  { id: "total-users", label: "Total Users", value: "1" },
  { id: "admins", label: "Admins", value: "1" },
  { id: "artists", label: "Artists", value: "2" },
  { id: "new-this-month", label: "New This Month", value: "1" },
];

export const MOCK_MANAGED_USERS: ManagedUser[] = [
  {
    id: "roberto-mangan",
    userId: "6a5300a45a089be5e",
    name: "Roberto Mangan",
    email: "mangan@discovod.com",
    releaseCount: 0,
    role: "admin",
    joinedDate: "12/7/2026",
    lastUpdatedDate: "12/7/2026",
  },
  {
    id: "kiran-dey",
    userId: "8f13c92d61e447a2b",
    name: "Kiran Dey",
    email: "kiran@discovod.com",
    releaseCount: 0,
    role: "artist",
    joinedDate: "10/7/2026",
    lastUpdatedDate: "10/7/2026",
  },
  {
    id: "zara-lyra",
    userId: "2c9a1f7b5d834e60c",
    name: "Zara Lyra",
    email: "zara@discovod.com",
    releaseCount: 0,
    role: "artist",
    joinedDate: "5/7/2026",
    lastUpdatedDate: "5/7/2026",
  },
];
