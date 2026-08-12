'use client';

import { useState } from 'react';
import ReleaseSelectField from '@/src/components/admin/releases/ReleaseSelectField';
import { FIELD_INPUT_CLASSNAME } from '@/src/components/admin/releases/formControls';
import TextInputField from '@/src/components/ui/input/TextInputField';
import { Modal } from '@/src/components/ui/modal';
import {
  INVOICE_STATUS_OPTIONS,
  PAYMENT_METHOD_OPTIONS,
} from './mockPricingManagementData';
import type { Invoice } from '@/src/types/noticeTypes';

type InvoiceEditValues = {
  artistName: string;
  email: string;
  amount: string;
  status: string;
  billingDate: string;
  description: string;
  notes: string;
  paymentMethod: string;
  paidDate: string;
};

type InvoiceEditRequest = {
  artist_name: string;
  email: string;
  amount: number;
  status: string;
  billing_date: string;
  description: string;
  notes: string | null;
  payment_method: string;
  paid_date: string | null;
};

const EMPTY_VALUES: InvoiceEditValues = {
  artistName: '',
  email: '',
  amount: '',
  status: 'PENDING',
  billingDate: '',
  description: '',
  notes: '',
  paymentMethod: 'paypal',
  paidDate: '',
};

const toValues = (invoice: Invoice): InvoiceEditValues => ({
  artistName: invoice.artist_name,
  email: invoice.email,
  amount: String(invoice.amount),
  status: invoice.status.toLowerCase(),
  billingDate: invoice.billing_date ?? '',
  description: invoice.description ?? '',
  notes: invoice.notes ?? '',
  paymentMethod: invoice.payment_method || 'paypal',
  paidDate: invoice.paid_date ?? '',
});

type EditInvoiceModalProps = {
  invoice: Invoice | null;
  onClose: () => void;
  onSave: (id: string, request: InvoiceEditRequest) => void;
  isLoading?: boolean;
  error?: string | null;
};

export default function EditInvoiceModal({
  invoice,
  onClose,
  onSave,
  isLoading = false,
  error = null,
}: EditInvoiceModalProps) {
  const [trackedId, setTrackedId] = useState<string | null>(null);
  const [values, setValues] = useState<InvoiceEditValues>(EMPTY_VALUES);

  if (invoice && invoice.id !== trackedId) {
    setTrackedId(invoice.id);
    setValues(toValues(invoice));
  }

  const updateValues = (patch: Partial<InvoiceEditValues>) => {
    setValues(prev => ({ ...prev, ...patch }));
  };

  return (
    <Modal
      isOpen={!!invoice}
      onClose={onClose}
      className="w-full max-w-lg p-0"
      contentBgClassName="bg-white"
      textClassName="text-[#101828]"
    >
      {invoice && (
        <div className="space-y-5 rounded-2xl p-6">
          <h3 className="text-[16px] font-semibold text-[#101828]">
            Edit Invoice – {invoice.invoice_number}
          </h3>

          {error ? (
            <div className="rounded-lg border border-[#FECDD3] bg-[#FEF2F2] px-4 py-3 text-[13px] leading-relaxed text-[#B42318]">
              {error}
            </div>
          ) : null}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <TextInputField
              label="Artist Name"
              value={values.artistName}
              onChange={e => updateValues({ artistName: e.target.value })}
              inputClassName={FIELD_INPUT_CLASSNAME}
            />
            <TextInputField
              label="Email"
              type="email"
              value={values.email}
              onChange={e => updateValues({ email: e.target.value })}
              inputClassName={FIELD_INPUT_CLASSNAME}
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <TextInputField
              label="Amount"
              type="number"
              value={values.amount}
              onChange={e => updateValues({ amount: e.target.value })}
              inputClassName={FIELD_INPUT_CLASSNAME}
            />
            <ReleaseSelectField
              label="Status"
              value={values.status}
              onChange={status => updateValues({ status })}
              options={INVOICE_STATUS_OPTIONS}
              placeholder="Select Status"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <TextInputField
              label="Billing Date"
              type="date"
              value={values.billingDate}
              onChange={e => updateValues({ billingDate: e.target.value })}
              inputClassName={FIELD_INPUT_CLASSNAME}
            />
            <ReleaseSelectField
              label="Payment Method"
              value={values.paymentMethod}
              onChange={paymentMethod => updateValues({ paymentMethod })}
              options={PAYMENT_METHOD_OPTIONS}
              placeholder="Select Payment Method"
            />
          </div>

          <TextInputField
            label="Description"
            value={values.description}
            onChange={e => updateValues({ description: e.target.value })}
            inputClassName={FIELD_INPUT_CLASSNAME}
          />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <TextInputField
              label="Notes"
              value={values.notes}
              onChange={e => updateValues({ notes: e.target.value })}
              inputClassName={FIELD_INPUT_CLASSNAME}
            />
            <TextInputField
              label="Paid Date"
              type="date"
              value={values.paidDate}
              onChange={e => updateValues({ paidDate: e.target.value })}
              inputClassName={FIELD_INPUT_CLASSNAME}
            />
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-xl bg-[#F2F4F7] px-4 py-2.5 text-[13px] font-semibold text-[#344054] hover:bg-[#E4E7EC]"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() =>
                onSave(invoice.id, {
                  artist_name: values.artistName,
                  email: values.email,
                  amount: Number(values.amount) || 0,
                  status: values.status,
                  billing_date: values.billingDate,
                  description: values.description,
                  notes: values.notes || null,
                  payment_method: values.paymentMethod,
                  paid_date: values.paidDate || null,
                })
              }
              disabled={isLoading}
              className="flex-1 rounded-xl bg-primary px-4 py-2.5 text-[13px] font-semibold text-[#101828] hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isLoading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
}