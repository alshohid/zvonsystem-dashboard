'use client';

import { useState } from 'react';
import ReleaseSelectField from '@/src/components/admin/releases/ReleaseSelectField';
import { FIELD_INPUT_CLASSNAME } from '@/src/components/admin/releases/formControls';
import TextInputField from '@/src/components/ui/input/TextInputField';
import { Modal } from '@/src/components/ui/modal';
import { BILLING_CYCLE_OPTIONS, SUBSCRIPTION_STATUS_OPTIONS } from './mockPricingManagementData';
import PlanSelector from './PlanSelector';
import type { ArtistSubscription, SubscriptionEditValues } from './types';

const EMPTY_VALUES: SubscriptionEditValues = {
  plan: 'free',
  status: 'active',
  billingCycle: 'monthly',
  amount: '',
  releasesUsed: '',
};

const toValues = (subscription: ArtistSubscription): SubscriptionEditValues => ({
  plan: subscription.plan,
  status: subscription.status,
  billingCycle: subscription.billingCycle,
  amount: String(subscription.amount),
  releasesUsed: String(subscription.releasesUsed),
});

type EditSubscriptionModalProps = {
  subscription: ArtistSubscription | null;
  onClose: () => void;
  onSave: (id: string, values: SubscriptionEditValues) => void;
  isLoading?: boolean;
};

export default function EditSubscriptionModal({
  subscription,
  onClose,
  onSave,
  isLoading = false,
}: EditSubscriptionModalProps) {
  const [trackedId, setTrackedId] = useState<string | null>(null);
  const [values, setValues] = useState<SubscriptionEditValues>(EMPTY_VALUES);

  if (subscription && subscription.id !== trackedId) {
    setTrackedId(subscription.id);
    setValues(toValues(subscription));
  }

  const updateValues = (patch: Partial<SubscriptionEditValues>) => {
    setValues(prev => ({ ...prev, ...patch }));
  };

  return (
    <Modal
      isOpen={!!subscription}
      onClose={onClose}
      className="w-full max-w-lg p-0"
      contentBgClassName="bg-white"
      textClassName="text-[#101828]"
    >
      {subscription && (
        <div className="space-y-5 rounded-2xl p-6">
          <h3 className="text-[16px] font-semibold text-[#101828]">
            Edit Subscription – {subscription.artistName}
          </h3>

          <PlanSelector value={values.plan} onChange={plan => updateValues({ plan })} />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <ReleaseSelectField
              label="Status"
              value={values.status}
              onChange={status => updateValues({ status: status as SubscriptionEditValues['status'] })}
              options={SUBSCRIPTION_STATUS_OPTIONS}
              placeholder="Select Status"
            />
            <ReleaseSelectField
              label="Billing Cycle"
              value={values.billingCycle}
              onChange={billingCycle =>
                updateValues({ billingCycle: billingCycle as SubscriptionEditValues['billingCycle'] })
              }
              options={BILLING_CYCLE_OPTIONS}
              placeholder="Select Billing Cycle"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <TextInputField
              label="Amount ($)"
              type="number"
              value={values.amount}
              onChange={e => updateValues({ amount: e.target.value })}
              inputClassName={FIELD_INPUT_CLASSNAME}
            />
            <TextInputField
              label="Releases Used"
              type="number"
              value={values.releasesUsed}
              onChange={e => updateValues({ releasesUsed: e.target.value })}
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
              onClick={() => onSave(subscription.id, values)}
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
