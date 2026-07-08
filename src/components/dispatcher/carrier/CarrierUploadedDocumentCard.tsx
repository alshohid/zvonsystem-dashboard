import { ExportIcon } from '@/src/icons';
import { FileText, Loader2 } from 'lucide-react';

type CarrierUploadedDocumentCardProps = {
  label: string;
  fileName: string;
  fileSize: string;
  isDownloading?: boolean;
  onDownload?: () => void;
};

export function CarrierUploadedDocumentCard({
  label,
  fileName,
  fileSize,
  isDownloading = false,
  onDownload,
}: CarrierUploadedDocumentCardProps) {
  return (
    <div>
      <h3 className="mb-2 text-[14px] font-semibold text-[#111827]">{label}</h3>

      <div className="flex h-[58px] items-center justify-between rounded-[8px] border border-dashed border-[#CBD5E1] bg-[#F8FAFC] px-4 transition hover:border-[#2F3E9E] hover:bg-[#F8FAFF]">
        <div className="flex min-w-0 items-center gap-3">
          <FileText className="h-5 w-5 shrink-0 text-[#667085]" />

          <div className="min-w-0">
            <p className="truncate text-[13px] font-medium text-[#111827]">
              {fileName}
            </p>
            <p className="mt-0.5 text-[12px] text-[#98A2B3]">{fileSize}</p>
          </div>
        </div>

        <button
          type="button"
          onClick={onDownload}
          disabled={isDownloading}
          aria-label={`Download ${fileName}`}
          className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-[6px] text-[#2F3E9E] transition hover:bg-[#EEF2FF] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isDownloading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <ExportIcon />
          )}
        </button>
      </div>
    </div>
  );
}
