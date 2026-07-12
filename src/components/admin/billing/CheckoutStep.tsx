'use client';

import { ArrowRight } from 'lucide-react';
import CardEntryForm from './CardEntryForm';
import SavedCardOption from './SavedCardOption';
import type { CardEntryValues, SavedCard } from './types';

type CheckoutStepProps = {
  savedCards: SavedCard[];
  selectedCardId: string | null;
  onSelectCard: (id: string) => void;
  cardEntry: CardEntryValues;
  onCardEntryChange: (patch: Partial<CardEntryValues>) => void;
  totalLabel: string;
  onSubmit: () => void;

};

export default function CheckoutStep({
  savedCards,
  selectedCardId,
  onSelectCard,
  cardEntry,
  onCardEntryChange,
  totalLabel,
  onSubmit,

}: CheckoutStepProps) {
  return (
    <div className="space-y-6 rounded-2xl border border-[#E9EDF5] bg-white p-5 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
      <h2 className="text-[15px] font-semibold text-[#101828]">Payment Information</h2>

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

      <button
        type="button"
        onClick={onSubmit}
        className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-primary px-4 py-3 text-[13px] font-semibold text-[#101828] hover:opacity-90"
      >
        Place Order - {totalLabel} <ArrowRight size={16} />
      </button>
    </div>
  );
}
