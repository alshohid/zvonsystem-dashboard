export interface ICreateCharityPayload {
  charity_name: string;
  country: string;
  url: string;
  logo: File;
}

export interface IUpdateCharityPayload {
  charity_name: string;
  country: string;
  url: string;
  logo?: File | null;
}

export interface CharityData {
  id: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
  charity_name: string;
  country: string;
  logo: string;
  url: string;
  logo_url?: string;
}
export interface IUser {
  id: string;
  name: string;
}

export interface ICharity {
  id: string;
  charity_name: string;
  created_at: string;
  country: string;
}

export interface IDeathNotice {
  id: string;
  created_at: string;
  user: IUser | null;
  charity: ICharity;
}

interface ICharityBaseResponse {
  success: boolean;
  message: string;
}
export interface ICharityConnectionsResponse extends ICharityBaseResponse {
  data: IDeathNotice[];
  total: number;
  page: number;
  limit: number;
  lastPage: number;
}

export interface ICreateCharityResponse extends ICharityBaseResponse {
  data: CharityData;
}

export interface ICharityDetailsResponse extends ICharityBaseResponse {
  data: CharityData;
}

export interface IDeleteCharityResponse extends ICharityBaseResponse {
  data?: CharityData | null;
}

export interface ICharityResponse extends ICharityBaseResponse {
  data: CharityData[];
  total: number;
  page: number;
  limit: number;
  lastPage: number;
}
