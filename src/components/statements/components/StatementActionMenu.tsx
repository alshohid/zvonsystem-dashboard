"use client";

import { Download, Eye, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { StatementRecord } from "../statementTypes";

type StatementActionMenuProps = {
    statement: StatementRecord;
    onView: (statement: StatementRecord) => void;
    onEdit: (statement: StatementRecord) => void;
    onDownload: (statement: StatementRecord) => void;
    onDelete: (statement: StatementRecord) => void;
};

export default function StatementActionMenu({
    statement,
    onView,
    onEdit,
    onDownload,
    onDelete,
}: StatementActionMenuProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button
                    type="button"
                    className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-[#667085] transition hover:bg-[#F2F4F7] hover:text-[#344054]"
                    aria-label={`Actions for ${statement.statementNumber}`}
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
                    onClick={() => onView(statement)}
                    className="cursor-pointer rounded-md px-3 py-2 text-sm text-[#344054] focus:bg-[#F8FAFC] focus:text-[#101828]"
                >
                    <Eye className="h-4 w-4" />
                    View
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => onEdit(statement)}
                    className="cursor-pointer rounded-md px-3 py-2 text-sm text-[#344054] focus:bg-[#F8FAFC] focus:text-[#101828]"
                >
                    <Pencil className="h-4 w-4" />
                    Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => onDownload(statement)}
                    className="cursor-pointer rounded-md px-3 py-2 text-sm text-[#344054] focus:bg-[#F8FAFC] focus:text-[#101828]"
                >
                    <Download className="h-4 w-4" />
                    Download
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => onDelete(statement)}
                    className="cursor-pointer rounded-md px-3 py-2 text-sm text-[#344054] focus:bg-[#FEF3F2] focus:text-[#D92D20]"
                >
                    <Trash2 className="h-4 w-4" />
                    Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
