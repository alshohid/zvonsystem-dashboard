'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface AddTrailerTextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export default function AddTrailerTextInput({
  className,
  ...props
}: AddTrailerTextInputProps) {
  return (
    <input
      {...props}
      className={cn(
        'h-[39px] w-full rounded-[5px] border border-[#D9DCE3] bg-white px-3 text-[16px] text-[#111827] outline-none placeholder:text-[#A0AEC0]',
        className,
      )}
    />
  );
}
