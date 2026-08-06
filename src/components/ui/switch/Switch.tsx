"use client";

import React, { useState } from "react";

interface SwitchProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    checked?: boolean;
    onCheckedChange?: (checked: boolean) => void;
}

const Switch: React.FC<SwitchProps> = ({ checked, onCheckedChange, className, ...props }) => {
    const [internalChecked, setInternalChecked] = useState<boolean>(!!checked);

    // useEffect(() => {
    //     if (typeof checked === "boolean") setInternalChecked(checked);
    // }, [checked]);

    const isChecked = typeof checked === "boolean" ? checked : internalChecked;

    const handleClick = () => {
        const next = !isChecked;
        if (typeof checked !== "boolean") setInternalChecked(next);
        onCheckedChange?.(next);
    };

    return (
        <button
            type="button"
            role="switch"
            aria-checked={isChecked}
            onClick={handleClick}
            className={[
                "relative inline-flex items-center h-6 w-11 rounded-full transition-colors focus:outline-none",
                isChecked ? "bg-primary" : "bg-gray-300 dark:bg-gray-600",
                className || "",
            ].join(" ")}
            {...props}
        >
            <span
                className={[
                    "inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform",
                    isChecked ? "translate-x-5" : "translate-x-0",
                ].join(" ")}
            />
        </button>
    );
};

export default Switch;
