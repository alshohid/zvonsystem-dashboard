export interface IAdminBaseSubscriptionPlanResponse {
  success: boolean;
  message: string;
}

export type AdminSubscriptionPlanType = "MONTHLY" | "PAY_AS_YOU_GO";

export interface IAdminSubscriptionPlanPayload {
  name: string;
  type: AdminSubscriptionPlanType;
  price: number;
  billing_period?: string;
  credits?: number;
  benefits: string[];
}

export interface IAdminSubscriptionPlanData {
  id: string;
  name: string;
  type: AdminSubscriptionPlanType;
  price: string;
  billing_period?: string;
  benefits: string[];
  created_at: string;
  updated_at: string;
  credits?: number;
}
export interface IAdminSubscriptionPlanListResponse extends IAdminBaseSubscriptionPlanResponse {
  data: IAdminSubscriptionPlanData[];
}

export interface IAdminSubscriptionPlanActionResponse
  extends IAdminBaseSubscriptionPlanResponse {
  data?: IAdminSubscriptionPlanData;
}
