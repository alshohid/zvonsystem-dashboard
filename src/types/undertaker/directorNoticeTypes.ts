export interface IBaseDirectorNoticeResponse {
  success: boolean;
  message: string;
}
export interface ICharityData {
  id: string;
  charity_name: string;
}
export interface IAllNoticeData {
  id: string;
  first_name: string;
  surname: string;
  city: string;
  town: string;
  status: string;
  image: string | null;
  created_at: string;
  updated_at: string;
}
export interface IActiveSubscriptionData {
  id: string;
  plan_type: string;
  status: string;
  current_period_end: string;
}
export interface IDirectorNoticeListMeta {
  total: number;
  page: number;
  last_page: number;
  limit: number;
}
export interface ISingleDirectorNoticeData {
  id: string;
  status: string;
  image: string | null;
  first_name: string;
  surname: string;
  nee: string;
  form: string;
  to: string;
  country: string;
  city: string;
  town: string;
  title: string;
  biography: string;
  service_type: "Reposing" | "Funeral" | "Both";
  created_at: string;
  updated_at: string;
  reposing_location: string;
  reposing_address: string;
  reposing_date: string;
  reposing_start_time: string;
  reposing_end_time: string;
  funeral_location: string;
  funeral_address: string;
  funeral_date: string;
  funeral_start_time: string;
  funeral_end_time: string;
  charity_id: string;
  charity: {
    id: string;
    charity_name: string;
  } | null;
}
export interface ICreateDirectorNoticePayload {
  first_name: string;
  surname: string;
  city: string;
  town: string;
  title: string;
  nee: string;
  form: string;
  to: string;
  country: string;
  biography: string;
  service_type: "Reposing" | "Funeral" | "Both";
  reposing_location: string;
  reposing_address: string;
  reposing_date: string;
  reposing_start_time: string;
  reposing_end_time: string;
  funeral_location: string;
  funeral_address: string;
  funeral_date: string;
  funeral_start_time: string;
  funeral_end_time: string;
  charity_id: string;
}
export type IUpdateDirectorNoticePayload = ICreateDirectorNoticePayload;
export interface ISingleDirectorNoticeResponse extends IBaseDirectorNoticeResponse {
  data: ISingleDirectorNoticeData;
}
export interface IDirectorActiveSubscriptionResponse extends IBaseDirectorNoticeResponse {
  data: IActiveSubscriptionData;
}
export interface IDirectorAllNoticeListResponse extends IBaseDirectorNoticeResponse {
  data: IAllNoticeData[];
  meta?: IDirectorNoticeListMeta;
  total?: number;
  page?: number;
  limit?: number;
  lastPage?: number;
}
export interface IDirectorNoticeCharityListResponse extends IBaseDirectorNoticeResponse {
  data: ICharityData[];
}
