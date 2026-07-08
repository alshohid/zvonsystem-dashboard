import InvoiceContainer from "@/src/components/invoices/InvoiceContainer";
import { dispatcherInvoiceDataset } from "@/src/components/invoices/invoiceMockData";

export default function DispatcherInvoicePage() {
    return <InvoiceContainer dataset={dispatcherInvoiceDataset} />;
}
