import InvoiceContainer from "@/src/components/invoices/InvoiceContainer";
import { adminInvoiceDataset } from "@/src/components/invoices/invoiceMockData";

export default function AdminInvoicesPage() {
    return <InvoiceContainer dataset={adminInvoiceDataset} />;
}
