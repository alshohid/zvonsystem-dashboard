'use client';

import Badge from '@/src/components/ui/badge/Badge';
import type { CardBrand, SavedCard } from './types';

const BRAND_GRADIENT: Record<CardBrand, string> = {
  visa: 'linear-gradient(135deg, #1d4ed8 0%, #3b82f6 60%, #60a5fa 100%)',
  mastercard: 'linear-gradient(135deg, #ea580c 0%, #f97316 60%, #fb923c 100%)',
};

const BRAND_LABEL: Record<CardBrand, string> = {
  visa: 'VISA',
  mastercard: 'MASTERCARD',
};

type SavedCardOptionProps = {
  card: SavedCard;
  selected: boolean;
  onSelect: (id: string) => void;
};

export default function SavedCardOption({ card, selected, onSelect }: SavedCardOptionProps) {
  return (
    <label
      className={[
        'relative block cursor-pointer overflow-hidden rounded-2xl p-4 text-white transition-shadow',
        selected ? 'ring-2 ring-primary ring-offset-2' : '',
      ].join(' ')}
      style={{ backgroundImage: BRAND_GRADIENT[card.brand] }}
    >
      <input
        type="radio"
        name="saved-card"
        className="sr-only"
        checked={selected}
        onChange={() => onSelect(card.id)}
      />

      <div className="flex items-center justify-between">
        <span className="text-xs font-bold tracking-wide">{BRAND_LABEL[card.brand]}</span>
        {card.isDefault && (
          <Badge variant="solid" color="light" size="sm">
            Default
          </Badge>
        )}
      </div>

      <p className="mt-6 text-lg tracking-[0.2em]">•••• {card.last4}</p>

      <div className="mt-4 flex items-end justify-between text-xs">
        <div>
          <p className="text-white/70">Card Holder</p>
          <p className="font-medium">{card.holder}</p>
        </div>
        <div className="text-right">
          <p className="text-white/70">Expires</p>
          <p className="font-medium">{card.expiry}</p>
        </div>
      </div>
    </label>
  );
}
