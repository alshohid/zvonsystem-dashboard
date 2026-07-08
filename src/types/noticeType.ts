interface ICondolance {
  id: string;
}

export interface ICharity {
  id: string;
  charity_name: string;
}

export interface INotice {
  id: string;
  first_name: string;
  surname: string;
  nee: string;
  city: string;
  town: string;
  country: string;
  form: string;
  to: string;
  status: string;
  image: string | null;
  title?: string | null;
  biography: string | null;
  service_type: string;
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
  charity_id?: string | null;
  charity?: ICharity | null;
  condolance: ICondolance | null;
  created_at: string;
  updated_at: string;
  total_donations: number | null;
  user?: {
    name: string;
  };
}

export interface IPaginationMeta {
  total: number;
  page: number;
  last_page: number;
  limit: number;
}
export interface ICondolenceMessage {
  id: string;
  name: string;
  message: string;
  condolance_id: string;
  user_id: string;
  created_at: string;
  updated_at: string;
}
export interface IBaseAdminNoticeResponse {
  success: boolean;
  message: string;
}
export interface ICondolenceMessageResponse extends IBaseAdminNoticeResponse {
  data: ICondolenceMessage[];
  meta: IPaginationMeta;
}
export interface IAdminNoticesResponse extends IBaseAdminNoticeResponse {
  data: INotice[];
  meta: IPaginationMeta;
}
export interface ICondolenceBook {
  id: string;
  enable_comments: boolean;
  comment_allert: boolean;
  public: boolean;
  print_option: boolean;
  condolance_image: string;
  notice: INotice;
  created_at: string;
  updated_at: string;
}
export interface IAminNoticeByIdResponse extends IBaseAdminNoticeResponse {
  data: INotice;
}
export interface IAminNoticeCondolenceByIdResponse extends IBaseAdminNoticeResponse {
  data: ICondolenceBook;
}
export interface IGetAdminNoticesParams {
  to?: string;
  form?: string;
  town?: string;
  country?: string;
  nee?: string;
  surname?: string;
  first_name?: string;
  limit: number;
  page: number;
}
