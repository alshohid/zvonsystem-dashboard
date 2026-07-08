"use client";

import React from "react";
import FormField from "./FormField";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import FormFieldInput from "./FormFieldInput";

type CountryOption = { code: string; label: string; flag: React.ReactNode };

type PhoneNumberFieldProps = {
    label?: string;
    required?: boolean;
    error?: string;
    helperText?: string;
    country: string;
    onCountryChange: (code: string) => void;
    value: string;
    onChange: (v: string) => void;
    countries: CountryOption[];
    placeholder?: string;
};

export default function PhoneNumberField({ label, required, error, helperText, country, onCountryChange, value, onChange, countries, placeholder }: PhoneNumberFieldProps) {
    return (
        <FormFieldInput label={label} required={required} error={error} helperText={helperText}>
            <div className={cn("w-full flex items-center gap-3 rounded-[10px] border border-[#5B5A64] bg-transparent px-4 py-3 focus-within:border-[#5B5CFF]/60 focus-within:ring-2 focus-within:ring-[#5B5CFF]/10", error ? "border-red-500/60" : "")}>
                <button type="button" className="shrink-0 flex items-center gap-2 pr-3 border-r border-white/10" onClick={() => { /* dropdown open (your custom/select modal) */ }}>
                    <span className="flex items-center justify-center">{countries.find(c => c.code === country)?.flag}</span>
                    <select value={country} onChange={(e) => onCountryChange(e.target.value)} className="bg-transparent text-sm text-white/80 outline-none">
                        {countries.map((c) => <option key={c.code} value={c.code} className="bg-[#0B111B]">{c.label}</option>)}
                    </select>
                    {/* <ChevronDown className="h-4 w-4 text-white/40" /> */}
                </button>

                <input value={value} onChange={(e) => onChange(e.target.value)} inputMode="tel" placeholder={placeholder || "+123..."} className="w-full bg-transparent text-sm text-white placeholder:text-white/30 outline-none" />
            </div>
        </FormFieldInput>
    );
}
