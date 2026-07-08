'use client';

import React from 'react';

interface AddTruckFieldProps {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}

export default function AddTruckField({
  label,
  required = false,
  children,
}: AddTruckFieldProps) {
  return (
    <div>
      <label className="mb-1 block text-[16px] font-medium text-[#111827]">
        {label} {required && <span className="text-[#EF4444]">*</span>}
      </label>
      {children}
    </div>
  );
}
