'use client';

import { Loader2, Trash2 } from 'lucide-react';
import { Modal } from '@/src/components/ui/modal';
import type { Invoice } from '@/src/types/noticeTypes';

type DeleteInvoiceModalProps = {
  invoice?: Invoice | null;
  isOpen: boolean;
  isDeleting: boolean;
  onClose: () => void;
  onConfirm: () => void;
  error?: string | null;
};

export default function DeleteInvoiceModal({
  invoice,
  isOpen,
  isDeleting,
  onClose,
  onConfirm,
  error = null,
}: DeleteInvoiceModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-md p-6">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FEF2F2] text-[#DC2626]">
          <Trash2 size={18} />
        </div>
        <h3 className="text-lg font-semibold text-[#101828]">Delete invoice?</h3>
      </div>

      <p className="mt-3 text-sm text-[#667085]">
        You&apos;re about to permanently delete invoice{' '}
        <span className="font-medium text-[#101828]">
          {invoice?.invoice_number ?? ''}
        </span>{' '}
        for <span className="font-medium text-[#101828]">{invoice?.artist_name ?? 'this artist'}</span>.
        This action cannot be undone.
      </p>

      {error ? (
        <div className="mt-3 rounded-lg border border-[#FECDD3] bg-[#FEF2F2] px-4 py-3 text-[13px] leading-relaxed text-[#B42318]">
          {error}
        </div>
      ) : null}

      <div className="mt-6 flex justify-end gap-3">
        <button
          type="button"
          disabled={isDeleting}
          onClick={onClose}
          className="rounded-xl border border-[#E5E7EB] px-4 py-2 text-sm font-medium text-[#344054] transition hover:bg-[#F9FAFB] disabled:opacity-60"
        >
          Cancel
        </button>
        <button
          type="button"
          disabled={isDeleting}
          onClick={onConfirm}
          className="inline-flex items-center gap-2 rounded-xl bg-[#DC2626] px-4 py-2 text-sm font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isDeleting ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          {isDeleting ? 'Deleting…' : 'Yes, Delete Invoice'}
        </button>
      </div>
    </Modal>
  );
}