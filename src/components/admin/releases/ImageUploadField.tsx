'use client';

import { useEffect, useMemo, useRef } from 'react';
import { Upload, X } from 'lucide-react';
import { resolveMediaUrl } from '@/src/lib/env';

type ImageUploadFieldProps = {
  value: File | null;
  onChange: (file: File | null) => void;
  accept?: string;
  uploadLabel?: string;
  replaceLabel?: string;
  previewAlt?: string;
  /** Shown when no new file is picked but the release already has an upload. */
  existingFileName?: string | null;
  existingFilePath?: string | null;
};

export default function ImageUploadField({
  value,
  onChange,
  accept = 'image/jpeg,image/png',
  uploadLabel = 'Upload a file',
  replaceLabel = 'Replace file',
  previewAlt = 'Preview',
  existingFileName = null,
  existingFilePath = null,
}: ImageUploadFieldProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const objectUrl = useMemo(() => (value ? URL.createObjectURL(value) : null), [value]);
  const previewUrl = objectUrl ?? resolveMediaUrl(existingFilePath);
  const hasExistingUpload = Boolean(existingFileName) && !value;

  useEffect(() => {
    return () => {
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [objectUrl]);

  const handleRemove = () => {
    onChange(null);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  return (
    <div className="flex flex-wrap items-start gap-4">
      {previewUrl && (
        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg border border-[#E5E7EB] sm:h-24 sm:w-24">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={previewUrl} alt={previewAlt} className="h-full w-full object-cover" />
          {value ? (
            <button
              type="button"
              onClick={handleRemove}
              aria-label="Remove image"
              className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80"
            >
              <X size={12} />
            </button>
          ) : null}
        </div>
      )}

      <div className="min-w-0">
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          className="hidden"
          onChange={e => onChange(e.target.files?.[0] ?? null)}
        />
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="inline-flex items-center gap-2 rounded-lg border border-[#D0D5DD] bg-white px-4 py-2 text-[13px] font-medium text-[#22C55E] hover:bg-[#F0FDF4]"
        >
          <Upload size={16} strokeWidth={2.25} />
          {value || hasExistingUpload ? replaceLabel : uploadLabel}
        </button>
        {value ? (
          <p className="mt-1.5 truncate text-[13px] text-[#667085]">{value.name}</p>
        ) : hasExistingUpload ? (
          <p className="mt-1.5 truncate text-[13px] text-[#667085]">
            Uploaded: {existingFileName}
          </p>
        ) : null}
      </div>
    </div>
  );
}
