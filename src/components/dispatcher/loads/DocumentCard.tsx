import { DocumentItem } from "@/src/app/(protected)/(dispatcher)/dispatcher/dashboard/loads/[loadId]/page";
import { DeleteIcon, DocIcon } from "@/src/icons";
import { Download } from "lucide-react";

export function DocumentCard({
  item,
  onDownload,
  onDelete,
}: {
  item: DocumentItem;
  onDownload: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <div className="flex items-start justify-between rounded-xl border border-[#ECEEF3] px-4 py-4">
      <div className="flex items-start gap-3">
        <div className="mt-0.5 text-[#98A2B3]">
          <DocIcon size={18} />
        </div>

        <div>
          <p className="text-sm font-medium text-[#111827]">{item.name}</p>
          <p className="mt-1 text-xs text-[#98A2B3]">
            {item.size} • {item.uploadedAt}
          </p>
          <span className="mt-2 inline-flex rounded-full bg-[#FFF3CD] px-2.5 py-1 text-[10px] font-semibold text-[#B07A00]">
            {item.tag}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => onDownload(item.id)}
          className="rounded-lg p-2 text-[#98A2B3] transition hover:bg-[#F8FAFC]"
        >
          <Download size={16} />
        </button>
        <button
          type="button"
          onClick={() => onDelete(item.id)}
          className="rounded-lg p-2 text-[#98A2B3] transition hover:bg-[#FFF1F2] hover:text-[#EF4444]"
        >
          <DeleteIcon/>
        </button>
      </div>
    </div>
  );
}
