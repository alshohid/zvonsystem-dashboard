export type UserRole = "admin" | "user" | "artist";

export type ManagedUser = {
  id: string;
  userId: string;
  name: string;
  email: string;
  releaseCount: number;
  role?: UserRole;
  joinedDate: string;
  lastUpdatedDate: string;
};

export type UserManagementStatId =
  | "total-users"
  | "admins"
  | "artists"
  | "new-this-month";

export type UserManagementStat = {
  id: UserManagementStatId;
  label: string;
  value: string;
};
