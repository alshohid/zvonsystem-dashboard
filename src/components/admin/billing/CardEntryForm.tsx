'use client';

import { FIELD_INPUT_CLASSNAME } from '@/src/components/admin/releases/formControls';
import TextInputField from '@/src/components/ui/input/TextInputField';
import ExpiryDatePicker from './ExpiryDatePicker';
import type { CardEntryValues } from './types';

type CardEntryFormProps = {
  values: CardEntryValues;
  onChange: (patch: Partial<CardEntryValues>) => void;
};

export default function CardEntryForm({ values, onChange }: CardEntryFormProps) {
  return (
    <div className="space-y-4">
      <TextInputField
        label="Card Number"
        placeholder="1234 5678 9012 3456"
        value={values.cardNumber}
        onChange={e => onChange({ cardNumber: e.target.value })}
        inputClassName={FIELD_INPUT_CLASSNAME}
      />

      <TextInputField
        label="Cardholder Name"
        placeholder="John Doe"
        value={values.cardholderName}
        onChange={e => onChange({ cardholderName: e.target.value })}
        inputClassName={FIELD_INPUT_CLASSNAME}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <ExpiryDatePicker
          value={values.expiry}
          onChange={expiry => onChange({ expiry })}
          inputClassName={FIELD_INPUT_CLASSNAME}
        />
        <TextInputField
          label="CVV"
          placeholder="123"
          value={values.cvv}
          onChange={e => onChange({ cvv: e.target.value })}
          inputClassName={FIELD_INPUT_CLASSNAME}
        />
      </div>
    </div>
  );
}
