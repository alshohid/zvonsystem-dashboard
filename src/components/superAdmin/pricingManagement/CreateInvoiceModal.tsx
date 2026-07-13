'use client';

import { useState } from 'react';
import ReleaseSelectField from '@/src/components/admin/releases/ReleaseSelectField';
import { FIELD_INPUT_CLASSNAME } from '@/src/components/admin/releases/formControls';
import TextInputField from '@/src/components/ui/input/TextInputField';
import { Modal } from '@/src/components/ui/modal';
import { BILLING_CYCLE_OPTIONS } from './mockPricingManagementData';
import type { CreateInvoiceValues } from './types';

const EMPTY_VALUES: CreateInvoiceValues = {
  artistName: '',
  email: '',
  amount: '',
  billingCycle: 'monthly',
  billingDate: '',
};

type CreateInvoiceModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (values: CreateInvoiceValues) => void;
};

export default function CreateInvoiceModal({ isOpen, onClose, onCreate }: CreateInvoiceModalProps) {
  const [wasOpen, setWasOpen] = useState(false);
  const [values, setValues] = useState<CreateInvoiceValues>(EMPTY_VALUES);

  if (isOpen && !wasOpen) {
    setWasOpen(true);
    setValues(EMPTY_VALUES);
  } else if (!isOpen && wasOpen) {
    setWasOpen(false);
  }

  const updateValues = (patch: Partial<CreateInvoiceValues>) => {
    setValues(prev => ({ ...prev, ...patch }));
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="w-full max-w-md p-0"
      contentBgClassName="bg-white"
      textClassName="text-[#101828]"
    >
      <div className="space-y-4 rounded-2xl p-6">
        <h3 className="text-[16px] font-semibold text-[#101828]">Create Invoice</h3>

        <TextInputField
          label="Artist Name"
          placeholder="Enter Artist Name"
          value={values.artistName}
          onChange={e => updateValues({ artistName: e.target.value })}
          inputClassName={FIELD_INPUT_CLASSNAME}
        />

        <TextInputField
          label="Email"
          placeholder="artist@gmail.com"
          type="email"
          value={values.email}
          onChange={e => updateValues({ email: e.target.value })}
          inputClassName={FIELD_INPUT_CLASSNAME}
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <TextInputField
            label="Amount ($)"
            type="number"
            placeholder="$2.99"
            value={values.amount}
            onChange={e => updateValues({ amount: e.target.value })}
            inputClassName={FIELD_INPUT_CLASSNAME}
          />
          <ReleaseSelectField
            label="Billing Cycle"
            value={values.billingCycle}
            onChange={billingCycle =>
              updateValues({ billingCycle: billingCycle as CreateInvoiceValues['billingCycle'] })
            }
            options={BILLING_CYCLE_OPTIONS}
            placeholder="Select Billing Cycle"
          />
        </div>

        <TextInputField
          label="Billing Date"
          type="date"
          value={values.billingDate}
          onChange={e => updateValues({ billingDate: e.target.value })}
          inputClassName={FIELD_INPUT_CLASSNAME}
        />

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
            onClick={() => onCreate(values)}
            className="flex-1 rounded-xl bg-primary px-4 py-2.5 text-[13px] font-semibold text-[#101828] hover:opacity-90"
          >
            Create Invoice
          </button>
        </div>
      </div>
    </Modal>
  );
}
