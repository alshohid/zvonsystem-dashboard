"use client";

import { Eye, MoreHorizontal, Trash2 } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "../../../ui/dropdown-menu";
import { DocumentRecord } from "../documentTypes";

type DocumentsActionMenuProps = {
    document: DocumentRecord;
    onView: (document: DocumentRecord) => void;
};

export default function DocumentsActionMenu({
    document,
    onView,
}: DocumentsActionMenuProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button
                    type="button"
                    className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-[#667085] transition hover:bg-[#F2F4F7] hover:text-[#344054]"
                    aria-label={`Actions for ${document.document}`}
                >
                    <MoreHorizontal className="h-4 w-4" />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                align="end"
                sideOffset={8}
                className="z-[70] w-[132px] rounded-lg border border-[#E4E7EC] bg-white p-1 shadow-[0_12px_32px_rgba(16,24,40,0.18)]"
            >
                <DropdownMenuItem
                    onClick={() => onView(document)}
                    className="cursor-pointer rounded-md px-3 py-2 text-sm text-[#344054] focus:bg-[#F8FAFC] focus:text-[#101828]"
                >
                    <Eye className="h-4 w-4" />
                    View
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => console.log("Delete document", document.id)}
                    className="cursor-pointer rounded-md px-3 py-2 text-sm text-[#344054] focus:bg-[#FEF3F2] focus:text-[#D92D20]"
                >
                    <Trash2 className="h-4 w-4" />
                    Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
