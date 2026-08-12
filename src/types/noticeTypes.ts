export interface CreateInvoiceRequest {
  artistName: string;
  email: string;
  amount: number;
  status: string;
  billingDate: string;
  description: string;
  currency: string;
  paymentMethod: string;
}
export interface Invoice {
  id: string;
  invoice_number: string;
  artist_name: string;
  email: string;
  amount: string;
  currency: string;
  status: string;
  billing_date: string;
  paid_date: string | null;
  description: string;
  notes: string | null;
  payment_method: string;
  payment_reference: string | null;
  created_at: string;
  updated_at: string;
}
export interface InvoicePaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
export interface InvoiceListResponse {
  success: boolean;
  message: string;
  data: {
    items: Invoice[];
    meta: InvoicePaginationMeta;
  };
}
export interface InvoiceStatistics {
  total_invoices: number;
  total_revenue: number;
  paid_invoices: number;
  paid_revenue: number;
  pending_invoices: number;
  draft_invoices: number;
  cancelled_invoices: number;
  average_invoice: number;
}
export interface UpdateInvoiceRequest {
  artist_name: string;
  email: string;
  amount: number;
  status: string;
  billing_date: string;
  description: string;
  notes: string | null;
  payment_method: string;
  paid_date: string | null;
}
export interface GetInvoiceResponse {
  success: boolean;
  message: string;
  data: Invoice;
}
export interface InvoiceStatisticsResponse {
  success: boolean;
  message: string;
  data: InvoiceStatistics;
}
export interface CreateInvoiceResponse {
  success: boolean;
  message: string;
  data: Invoice;
}
