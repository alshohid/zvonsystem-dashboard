'use client';

import React from 'react';

interface AddTrailerFieldProps {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}

export default function AddTrailerField({
  label,
  required = false,
  children,
}: AddTrailerFieldProps) {
  return (
    <div>
      <label className="mb-1 block text-[16px] font-medium text-[#111827]">
        {label} {required && <span className="text-[#EF4444]">*</span>}
      </label>
      {children}
    </div>
  );
}
