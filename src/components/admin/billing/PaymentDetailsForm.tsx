'use client';

import { ArrowRight } from 'lucide-react';
import ReleaseSelectField from '@/src/components/admin/releases/ReleaseSelectField';
import { FIELD_INPUT_CLASSNAME } from '@/src/components/admin/releases/formControls';
import TextInputField from '@/src/components/ui/input/TextInputField';
import { COUNTRY_OPTIONS } from './mockBillingData';
import type { BillingDetailsFormValues } from './types';

type PaymentDetailsFormProps = {
  values: BillingDetailsFormValues;
  onChange: (patch: Partial<BillingDetailsFormValues>) => void;
  onSubmit: () => void;
};

export default function PaymentDetailsForm({
  values,
  onChange,
  onSubmit,
}: PaymentDetailsFormProps) {
  return (
    <div className="space-y-4 rounded-2xl border border-[#E9EDF5] bg-white p-5 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
      <h2 className="text-[15px] font-semibold text-[#101828]">Payment Details</h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <TextInputField
          label="First Name"
          value={values.firstName}
          onChange={e => onChange({ firstName: e.target.value })}
          inputClassName={FIELD_INPUT_CLASSNAME}
        />
        <TextInputField
          label="Last Name"
          value={values.lastName}
          onChange={e => onChange({ lastName: e.target.value })}
          inputClassName={FIELD_INPUT_CLASSNAME}
        />
      </div>

      <TextInputField
        label="Email Address"
        type="email"
        value={values.email}
        onChange={e => onChange({ email: e.target.value })}
        inputClassName={FIELD_INPUT_CLASSNAME}
      />

      <TextInputField
        label="Phone Number"
        value={values.phone}
        onChange={e => onChange({ phone: e.target.value })}
        inputClassName={FIELD_INPUT_CLASSNAME}
      />

      <TextInputField
        label="Street Address"
        value={values.street}
        onChange={e => onChange({ street: e.target.value })}
        inputClassName={FIELD_INPUT_CLASSNAME}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <TextInputField
          label="City"
          value={values.city}
          onChange={e => onChange({ city: e.target.value })}
          inputClassName={FIELD_INPUT_CLASSNAME}
        />
        <TextInputField
          label="Postal Code"
          value={values.postalCode}
          onChange={e => onChange({ postalCode: e.target.value })}
          inputClassName={FIELD_INPUT_CLASSNAME}
        />
      </div>

      <ReleaseSelectField
        label="Country"
        value={values.country}
        onChange={country => onChange({ country })}
        options={COUNTRY_OPTIONS}
        placeholder="Select your country"
      />

      <button
        type="button"
        onClick={onSubmit}
        className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-primary px-4 py-3 text-[13px] font-semibold text-[#101828] hover:opacity-90"
      >
        Continue to Payment <ArrowRight size={16} />
      </button>
    </div>
  );
}
