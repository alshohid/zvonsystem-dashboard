'use client';

import { ArrowRight, CreditCard, Loader2 } from 'lucide-react';
import CardEntryForm from './CardEntryForm';
import SavedCardOption from './SavedCardOption';
import type { CheckoutSessionResponse } from '@/src/types/billingTypes';
import type { CardEntryValues, Plan, SavedCard } from './types';

type CheckoutStepProps = {
  plan: Plan;
  savedCards: SavedCard[];
  selectedCardId: string | null;
  onSelectCard: (id: string) => void;
  cardEntry: CardEntryValues;
  onCardEntryChange: (patch: Partial<CardEntryValues>) => void;
  totalLabel: string;
  /** Checkout session created by `create-checkout-session` (null until submitted). */
  session: CheckoutSessionResponse['data'] | null;
  error: string | null;
  isSubmitting: boolean;
  isPaying: boolean;
  /** Free plan activation or creating the checkout session. */
  onSubmit: () => void;
  /** Completes the payment with the card entered in the form. */
  onPayNow: () => void;
};

export default function CheckoutStep({
  plan,
  savedCards,
  selectedCardId,
  onSelectCard,
  cardEntry,
  onCardEntryChange,
  totalLabel,
  session,
  error,
  isSubmitting,
  isPaying,
  onSubmit,
  onPayNow,
}: CheckoutStepProps) {
  const requiresCardEntry = session?.requiresCardEntry ?? false;

  return (
    <div className="space-y-6 rounded-2xl border border-[#E9EDF5] bg-white p-5 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
      <h2 className="text-[32px] font-semibold text-[#101828] leading-9">Payment Information</h2>

      {plan.isFree ? (
        <div className="rounded-xl border border-[#EAECF0] bg-[#F9FAFB] p-4 text-sm text-[#667085]">
          <p className="font-medium text-[#101828]">No payment required</p>
          <p className="mt-1">
            The {plan.name} plan is free of charge. Just activate it and start uploading.
          </p>
        </div>
      ) : (
        <div className="rounded-xl border border-[#EAECF0] bg-[#F9FAFB] p-4 text-sm text-[#667085]">
          <p className="flex items-center gap-2 font-medium text-[#101828]">
            <CreditCard size={16} />
            Secure payment via {requiresCardEntry ? 'card' : 'PayPal'}
          </p>
          <p className="mt-1">
            {requiresCardEntry
              ? 'Enter your card details below to complete the payment.'
              : 'You will be redirected to PayPal to approve your subscription.'}
          </p>
        </div>
      )}

      {/* {!plan.isFree && requiresCardEntry && ( */}
      <>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {savedCards.map(card => (
            <SavedCardOption
              key={card.id}
              card={card}
              selected={card.id === selectedCardId}
              onSelect={onSelectCard}
            />
          ))}
        </div>

        <CardEntryForm values={cardEntry} onChange={onCardEntryChange} />
      </>
      {/* )} */}

      {error && (
        <p className="rounded-lg border border-[#FECDCA] bg-[#FEF3F2] px-3 py-2 text-[13px] text-[#B42318]">
          {error}
        </p>
      )}

      {plan.isFree ? (
        <button
          type="button"
          disabled={isSubmitting}
          onClick={onSubmit}
          className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-primary px-4 py-3 text-[13px] font-semibold text-[#101828] hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? (
            <>
              <Loader2 size={16} className="animate-spin" /> Activating…
            </>
          ) : (
            <>
              Activate Free Plan <ArrowRight size={16} />
            </>
          )}
        </button>
      ) : requiresCardEntry ? (
        <button
          type="button"
          disabled={isPaying}
          onClick={onPayNow}
          className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-primary px-4 py-3 text-[13px] font-semibold text-[#101828] hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPaying ? (
            <>
              <Loader2 size={16} className="animate-spin" /> Processing…
            </>
          ) : (
            <>
              Pay Now - {totalLabel} <ArrowRight size={16} />
            </>
          )}
        </button>
      ) : (
        <button
          type="button"
          disabled={isSubmitting}
          onClick={onSubmit}
          className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-primary px-4 py-3 text-[13px] font-semibold text-[#101828] hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? (
            <>
              <Loader2 size={16} className="animate-spin" /> Redirecting…
            </>
          ) : (
            <>
              Place Order - {totalLabel} <ArrowRight size={16} />
            </>
          )}
        </button>
      )}
    </div>
  );
}
