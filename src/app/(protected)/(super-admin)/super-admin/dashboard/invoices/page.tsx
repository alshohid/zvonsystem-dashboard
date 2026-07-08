import InvoiceContainer from "@/src/components/invoices/InvoiceContainer";
import { superAdminInvoiceDataset } from "@/src/components/invoices/invoiceMockData";

export default function SuperAdminInvoicesPage() {
    return <InvoiceContainer dataset={superAdminInvoiceDataset} />;
}
