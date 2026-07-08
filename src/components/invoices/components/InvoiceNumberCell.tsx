"use client";

import { FileText } from "lucide-react";

type InvoiceNumberCellProps = {
    invoiceNumber: string;
};

export default function InvoiceNumberCell({ invoiceNumber }: InvoiceNumberCellProps) {
    return (
        <div className="flex min-w-0 items-center gap-2">
            <FileText className="h-4 w-4 shrink-0 text-[#667085]" />
            <span className="truncate font-medium text-[#344054]">{invoiceNumber}</span>
        </div>
    );
}
