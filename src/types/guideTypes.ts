import type { IBaseResponse } from "@/src/types/dashboardTypes";

export interface IFaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface IGuideOverviewData {
  faqs: IFaqItem[];
}

export interface IGuideOverviewResponse extends IBaseResponse {
  data: IGuideOverviewData;
}
