import { PaginationMeta } from "../dashboardTypes";

export interface IBaseDashboardResponse {
  success: boolean;
  message: string;
}
export interface IDirectorNoticeViewsGraphData {
  total_views: number;
  labels: string[];
  this_week: number[];
  last_week: number[];
}
export interface IDirectorDeathNoticeAreaGraphData {
  labels: string[];
  values: number[];
}
export interface IDirectorRecentNoticeItem {
  id: string;
  first_name: string;
  surname: string;
  nee: string;
  country: string;
  town: string;
  created_at: string;
}
export interface IDirectorRecentCondolenceItem {
  id: string;
  first_name: string;
  surname: string;
  nee: string;
  condolance: {
    id: string;
    created_at: string;
  };
}
export interface IDirectorRecentNoticeResponse extends IBaseDashboardResponse {
  data: IDirectorRecentNoticeItem[];
  meta: PaginationMeta;
}
export interface IDirectorRecentCondolenceResponse extends IBaseDashboardResponse {
  data: IDirectorRecentCondolenceItem[];
  meta: PaginationMeta;
}
export interface IDirectorDeathNoticeAreaGraphResponse extends IBaseDashboardResponse {
  data: IDirectorDeathNoticeAreaGraphData;
}
export interface IDirectorDashboardStates {
  total_notices: number;
  total_condolances: number;
  total_donations: number;
}
export interface IDirectorDashboardStatesResponse extends IBaseDashboardResponse {
  data: IDirectorDashboardStates;
}
export interface IDirectorNoticeViewsGraphResponse extends IBaseDashboardResponse {
  data: IDirectorNoticeViewsGraphData;
}

export type IDirectorDashboardStatesData = IDirectorDashboardStatesResponse;
