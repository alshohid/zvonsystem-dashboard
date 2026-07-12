'use client';

import Badge from '@/src/components/ui/badge/Badge';
import type { CardBrand, SavedCard } from './types';
import { MastercardIcon, VisaActualIcon, VisaIcon } from '@/src/icons';
import { StarIcon } from 'lucide-react';
import Image from 'next/image';
import { GreenRadioOption } from '../releases/formControls';

const BRAND_GRADIENT: Record<CardBrand, string> = {
  visa: 'linear-gradient(135deg, #2B7FFF 0%, #155DFC 100%)',
  mastercard: 'linear-gradient(135deg, #FF6900 0%, #FB2C36 100%)',
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
    <label className="relative flex w-full min-w-0 cursor-pointer flex-col gap-3">
      <div className="flex justify-between items-center gap-2">
        <GreenRadioOption
          label=""
          value={card.id}
          checked={selected}
          onChange={() => onSelect(card.id)}
        />
        <div className="flex items-center gap-2">
          {card.brand === 'visa' ? <VisaActualIcon /> : <MastercardIcon />}
          <span className="text-sm font-medium capitalize text-[#344054]">
            {card.brand === 'visa' ? <VisaIcon /> : 'Mastercard'}
          </span>
        </div>
      </div>

      <div
        className={[
          'block relative w-full min-w-0 rounded-2xl p-5 text-white shadow-lg transition-shadow',
          selected ? 'ring-2 ring-primary ring-offset-2' : '',
        ].join(' ')}
        style={{ backgroundImage: BRAND_GRADIENT[card.brand] }}
      >
        <div className='absolute top-0 right-1 z-2' >
          <Image
            src="/images/top-right.png"
            alt="ellipse"
            width={100}
            height={100}
            className='w-full opacity-[0.1]'
          />
        </div>
        <div className='absolute bottom-0 left-0 z-1' >
          <Image
            src="/images/bottom-left.png"
            alt="ellipse"
            width={75}
            height={75}
            className='w-full h-10 opacity-[0.1]'

          />
        </div>

        <div className="flex items-center justify-between">
          <div className="rounded-md bg-[#FFFFFF33] px-2 py-1 text-xs font-bold tracking-wide z-20">
            {BRAND_LABEL[card.brand]}
          </div>
          {card.isDefault && (
            <div className='z-20'>
              <Badge variant="solid" color="light" size="sm">
                <div className="flex items-center gap-1">
                  <StarIcon size={10} /> <span className='text-xs font-medium'>Default</span>
                </div>
              </Badge>
            </div>
          )}
        </div>

        <div className="mt-6 flex items-center text-lg tracking-[0.2em]">
          {
            Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="h-2 w-2 rounded-full bg-[#FFFFFF99] mr-2" />
            ))
          }

          {card.last4}</div>

        <div className="mt-4 flex items-end justify-between text-xs">
          <span>
            <span className="block text-white/70">Card Holder</span>
            <span className="block font-medium">{card.holder}</span>
          </span>
          <div className="text-right">
            <span className="block text-white/70">Expires</span>
            <span className="block font-medium">{card.expiry}</span>
          </div>
        </div>
      </div>
    </label>
  );
}
