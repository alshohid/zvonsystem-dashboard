"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import TextField from "./TextField";

type Props = {
    label: string;
    required?: boolean;
    error?: string;
    helperText?: string;
    value: string;
    onChange: (v: string) => void;
    placeholder?: string;
    name?: string;
};

export default function PasswordField({ label, required, error, helperText, value, onChange, placeholder, name }: Props) {
    const [show, setShow] = useState(false);

    return (
        <TextField
            label={label}
            required={required}
            error={error}
            helperText={helperText}
            type={show ? "text" : "password"}
            value={value}
            name={name}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            rightSlot={
                <button type="button" onClick={() => setShow((p) => !p)} className="grid place-items-center hover:text-white/70">
                    {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
            }
        />
    );
}
