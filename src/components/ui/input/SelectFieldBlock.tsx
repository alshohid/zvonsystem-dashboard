"use client";

import FormFieldInput from "./FormFieldInput";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type Option = { value: string; label: string };

type SelectFieldBlockProps = {
    label?: string;
    required?: boolean;
    value: string;
    onChange: (v: string) => void;
    options: Option[];
    error?: string;
    helperText?: string;
    placeholder?: string;
};

export default function SelectFieldBlock({ label, required, value, onChange, options, error, helperText, placeholder }: SelectFieldBlockProps) {
    return (
        <FormFieldInput label={label} required={required} error={error} helperText={helperText}>
            <Select value={value} onValueChange={onChange}>
                <SelectTrigger className="h-12 w-full rounded-[10px] border border-[#5B5A64] bg-transparent px-5 text-sm text-white focus:border-[#5B5CFF]/60 focus:ring-2 focus:ring-[#5B5CFF]/10">
                    <SelectValue placeholder={placeholder || "Select"} />
                </SelectTrigger>
                <SelectContent className="bg-[#0B111B] border border-[#26344B]">
                    {options.map((o) => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}
                </SelectContent>
            </Select>
        </FormFieldInput>
    );
}
