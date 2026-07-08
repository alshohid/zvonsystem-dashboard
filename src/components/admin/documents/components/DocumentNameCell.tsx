import { FileText } from "lucide-react";

type DocumentNameCellProps = {
    name: string;
};

export default function DocumentNameCell({ name }: DocumentNameCellProps) {
    return (
        <div className="flex min-w-0 items-center gap-2">
            <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-[#D0D5DD] text-[#667085]">
                <FileText className="h-3.5 w-3.5" />
            </span>
            <span className="max-w-[190px] break-words text-[#101828]">{name}</span>
        </div>
    );
}
