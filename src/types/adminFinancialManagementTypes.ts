export interface IAdminCharityDonationListParams {
  page?: number;
  limit?: number;
  time?: "today" | "7days" | "1month" | "1year" | string;
}
