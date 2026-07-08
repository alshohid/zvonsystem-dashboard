export interface IBaseRegionalResponse {
  success: boolean;
  message: string;
  total: number;
  page: number;
  limit: number;
  lastPage: number;
}

export interface IRegionalDeathNoticeCount {
  _all: number;
}

export interface IRegionalConfigurationData {
  _count: IRegionalDeathNoticeCount;
  town: string;
  country: string;
}

export interface IRegionalConfigurationParams {
  page: number;
  limit: number;
  filter?: string;
}

export interface IRegionalFuneralHouseCount {
  notices: number;
}

export interface IRegionalFuneralHouseData {
  id: string;
  name: string;
  address?: string;
  primary_contact?: string;
  business_phone?: string;
  _count: IRegionalFuneralHouseCount;
}

export interface IRegionalConfigurationResponse extends IBaseRegionalResponse {
  data: IRegionalConfigurationData[];
}
export interface IRegionalFuneralHouseResponse extends IBaseRegionalResponse {
  data: IRegionalFuneralHouseData[];
}
