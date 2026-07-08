import { ExportIcon } from '@/src/icons';
import { FileText, X } from 'lucide-react';
import { useRef } from 'react';

type DocuSignUploadRowProps = {
  label: string;
  fileName?: string;
  fileSize?: string;
  onFileSelect: (file: File) => void;
  onRemove: () => void;
};

export function DocuSignUploadRow({
  label,
  fileName,
  fileSize,
  onFileSelect,
  onRemove,
}: DocuSignUploadRowProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const hasFile = Boolean(fileName);

  const handleOpenFilePicker = () => {
    inputRef.current?.click();
  };

  const handleChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    onFileSelect(file);

    event.target.value = '';
  };

  return (
    <div>
      <h3 className="mb-2 text-[14px] font-semibold text-[#111827]">{label}</h3>

      <div
        role="button"
        tabIndex={0}
        onClick={handleOpenFilePicker}
        onKeyDown={event => {
          if (event.key === 'Enter' || event.key === ' ') {
            handleOpenFilePicker();
          }
        }}
        className="flex min-h-[44px] cursor-pointer items-center justify-center rounded-[8px] border border-dashed border-[#CBD5E1] bg-[#F8FAFC] px-4 py-2 transition hover:border-[#2F3E9E] hover:bg-[#F8FAFF]"
      >
        {hasFile ? (
          <div className="flex w-full items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-3">
              <FileText className="h-4 w-4 shrink-0 text-[#2F3E9E]" />

              <div className="min-w-0">
                <p className="truncate text-[13px] font-medium text-[#111827]">
                  {fileName}
                </p>

                {fileSize && (
                  <p className="mt-0.5 text-[12px] text-[#98A2B3]">
                    {fileSize}
                  </p>
                )}
              </div>
            </div>

            <button
              type="button"
              onClick={event => {
                event.stopPropagation();
                onRemove();
              }}
              className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[#F04438] transition hover:bg-[#FEE4E2]"
              aria-label={`Remove ${label}`}
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-center gap-2 text-[13px] font-medium text-[#F04438]">
            <ExportIcon />
            Awaiting Upload
          </div>
        )}

        <input
          ref={inputRef}
          type="file"
          accept=".pdf,.png,.jpg,.jpeg"
          className="hidden"
          onChange={handleChangeFile}
        />
      </div>
    </div>
  );
}
