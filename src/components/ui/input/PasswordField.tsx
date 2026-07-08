"use client";

import { useState } from "react";

type PasswordFieldProps = {
    label: string;
    value: string;
    onChange: (v: string) => void;
    placeholder?: string;
    name?: string;
    description?: string;
    helperText?: string;
    errorText?: string;
    helperList?: string[];
    autoComplete?: string;
};

function EyeIcon({ open }: { open: boolean }) {
    return open ? (
        // eye-off
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
                d="M3 3l18 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
            />
            <path
                d="M10.6 10.6a2.5 2.5 0 0 0 3.3 3.3"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
            />
            <path
                d="M6.1 6.1C3.8 7.9 2.2 10.3 2 12c.6 4 5 8 10 8 1.7 0 3.2-.4 4.5-1"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
            />
            <path
                d="M9.5 4.3A10.3 10.3 0 0 1 12 4c5 0 9.4 4 10 8-.2 1.3-1.2 2.9-2.7 4.5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
            />
        </svg>
    ) : (
        // eye
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
                d="M2 12s3.6-8 10-8 10 8 10 8-3.6 8-10 8-10-8-10-8Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

export default function PasswordField({
    label,
    value,
    onChange,
    placeholder = "********",
    name,
    description,
    helperText,
    errorText,
    helperList,
    autoComplete,
}: PasswordFieldProps) {
    const [show, setShow] = useState(false);

    return (
        <div className="w-full">
            <label className="block text-[16px] font-semibold text-[#161721]">
                {label}
            </label>
            {description ? (
                <p className="mt-1 text-[13px] leading-6 text-[#667164]">{description}</p>
            ) : null}

            <div className="mt-2 relative">
                <input
                    name={name}
                    type={show ? "text" : "password"}
                    autoComplete={autoComplete}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    aria-invalid={Boolean(errorText)}
                    className="
            h-12 w-full rounded-[10px]
            border border-[#C8D0BF]
            bg-white px-4 pr-12
            text-[14px] text-[#161721]
            outline-none
            transition
            placeholder:text-[#A1A8A0]
            focus:border-[#8FA17E] focus:ring-2 focus:ring-[#8FA17E]/15
            aria-[invalid=true]:border-[#D96B6B] aria-[invalid=true]:focus:ring-[#D96B6B]/15
          "
                />

                {/* ✅ eye button separate */}
                <button
                    type="button"
                    onClick={() => setShow((v) => !v)}
                    className="
            absolute right-3 top-1/2 -translate-y-1/2
            text-gray-500 hover:text-gray-800 transition
          "
                    aria-label={show ? "Hide password" : "Show password"}
                >
                    <EyeIcon open={show} />
                </button>
            </div>

            {/* error red text */}
            {errorText ? (
                <p className="mt-2 text-[13px] text-red-500">{errorText}</p>
            ) : null}

            {helperText && !errorText ? (
                <p className="mt-2 text-[13px] text-[#667164]">{helperText}</p>
            ) : null}

            {/* helper bullets */}
            {helperList?.length ? (
                <ul className="mt-3 list-disc pl-5 space-y-1 text-[13px] text-[#777980]">
                    {helperList.map((t) => (
                        <li key={t}>{t}</li>
                    ))}
                </ul>
            ) : null}
        </div>
    );
}
