export interface IAdminUserListParams {
  page?: number;
  limit?: number;
  approval_status?: "pending" | "approved" | "rejected";
  type?: "director" | "admin" | string;
  q?: string;
}

export interface IAdminUserItem {
  id: string;
  name: string;
  email: string;
  address: string;
  registration_number: string;
  primary_contact: string;
  business_phone: string;
  exercise_documents: string[];
  type: string;
  approved_at: string | null;
  approval_status: "pending" | "approved" | "rejected";
  created_at: string;
  updated_at: string;
  avatar: string | null;
  exercise_documents_url: string[];
}

export interface IAdminUserListResponse {
  success: boolean;
  data: IAdminUserItem[];
  total: number;
  page: number;
  limit: number;
  lastPage: number;
}

export interface IAdminUserResponse {
  success: boolean;
  data: IAdminUserItem;
}

export interface IAdminUserActionResponse {
  success: boolean;
  message: string;
}
