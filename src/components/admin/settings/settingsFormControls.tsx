'use client';

import { ChevronDown } from 'lucide-react';
import { type InputHTMLAttributes, type ReactNode, type SelectHTMLAttributes, type TextareaHTMLAttributes } from 'react';

export const FIELD_INPUT_CLASSNAME =
  'w-full rounded-lg border border-[#E9E9EA] bg-[#F5F7FB] px-4 py-3 text-sm text-[#344054] outline-none placeholder:text-[#98A2B3] focus:border-[#D0D5DD]';

export function SettingsFieldRow({
  label,
  description,
  children,
}: {
  label: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <div className="grid grid-cols-1 gap-3 py-5 first:pt-0 last:pb-0 sm:grid-cols-[220px_1fr] sm:gap-6">
      <div>
        <p className="text-sm font-semibold text-[#101828]">{label}</p>
        <p className="mt-1 text-xs leading-5 text-[#98A2B3]">{description}</p>
      </div>
      <div>{children}</div>
    </div>
  );
}

export function TextField({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={[FIELD_INPUT_CLASSNAME, className].filter(Boolean).join(' ')} />;
}

export function TextAreaField(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea rows={3} {...props} className={[FIELD_INPUT_CLASSNAME, 'resize-none'].join(' ')} />;
}

export function PrefixedTextField({
  prefix,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { prefix: string }) {
  return (
    <div className="flex items-stretch overflow-hidden rounded-lg border border-[#E9E9EA] bg-[#F5F7FB]">
      <span className="flex items-center border-r border-[#E9E9EA] px-3 text-sm text-[#98A2B3]">
        {prefix}
      </span>
      <input
        {...props}
        className="w-full bg-transparent px-3 py-3 text-sm text-[#344054] outline-none placeholder:text-[#98A2B3]"
      />
    </div>
  );
}

export function SelectField({
  children,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div className="relative">
      <select
        {...props}
        className={[FIELD_INPUT_CLASSNAME, 'appearance-none pr-10'].join(' ')}
      >
        {children}
      </select>
      <ChevronDown
        className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#98A2B3]"
        strokeWidth={1.75}
      />
    </div>
  );
}
