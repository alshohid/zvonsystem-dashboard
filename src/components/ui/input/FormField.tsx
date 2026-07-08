// components/form/FormField.tsx

import { cn } from "@/lib/utils";
import { Input } from "../input";
// import { Input } from "../input";

type FormFieldProps = React.ComponentProps<typeof Input> & {
    label?: string;
    hint?: string;
};

const FormField = ({ label, hint, className, ...props }: FormFieldProps) => {
    return (
        <div className="space-y-1.5">
            {label && (
                <label className="text-xs font-medium text-white/70">
                    {label}
                </label>
            )}

            <Input
                {...props}
                className={cn(
                    "bg-[#020617]/70 border-white/15 text-white placeholder:text-white/30 focus:border-brand-500 focus:ring-brand-500/20",
                    className
                )}
            />

            {hint && (
                <p className="text-[11px] text-white/40">
                    {hint}
                </p>
            )}
        </div>
    );
};

export default FormField;
