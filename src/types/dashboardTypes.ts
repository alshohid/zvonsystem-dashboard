import { ICharity } from "./adminCharityTypes";

export interface IBaseResponse {
  success: boolean;
  message: string;
}
export interface Business {
  id: string;
  name: string;
  email: string;
  phone_number: string | null;
  address?: string | null;
  country: string | null;
  registration_number?: string | null;
  primary_contact?: string | null;
  business_phone?: string | null;
  exercise_documents: string[];
  exercise_documents_url?: string[];
  created_at: string;
  approved_at: string | null;
  approval_status: string;
}

export interface PaginationMeta {
  total: number;
  page: number;
  last_page: number;
  limit: number;
}
export interface PaginatedMetaData {
  meta: PaginationMeta;
}
export interface IAdminDashboardStatesData {
  pending_director_applications: number;
  total_completed_donations: number;
  total_completed_subscriptions: number;
}
export interface INoticeData {
  id: string;
  first_name: string;
  surname: string;
  form: string;
  to: string;
  image?: string;
  created_at: string;
  charity?: ICharity;
}
export interface IUser {
  id: string;
  name: string;
}

export interface INotice {
  id: string;
  first_name: string;
  surname: string;
}

export interface IDonation {
  id: string;
  amount: string;
  created_at: string;
  user: IUser;
  notice: INotice;
}

export interface IRecentDonationsResponse
  extends IBaseResponse, PaginatedMetaData {
  data: IDonation[];
}
export interface IAdminNoticeGraphData {
  categories: string[];
  series: IAdminNoticeGraphSeries[];
}

export interface IAdminNoticeGraphSeries {
  name: string;
  data: number[];
}
export interface IAdminNoticeGraphResponse extends IBaseResponse {
  data: IAdminNoticeGraphData;
}

export interface ICondolenceDetailsResponse extends IBaseResponse {
  data: INoticeData;
}

export interface IRecentCondolenceNotice {
  id: string;
  first_name: string;
  surname: string;
  form: string;
  to: string;
  created_at: string;
}

export interface IRecentCondolenceItem {
  id: string;
  notice: IRecentCondolenceNotice;
  created_at: string;
}

export interface IRecentCondolenceResponse extends IBaseResponse {
  data: IRecentCondolenceItem[];
  meta: PaginationMeta;
}
export interface IAdminDashboardStatesDataResponse extends IBaseResponse {
  data: IAdminDashboardStatesData;
}
export interface IRecentApplicationResponse extends IBaseResponse {
  data: Business[];
  meta: PaginationMeta;
}
