type SupportInputProps = {
    id: string;
    label: string;
    value: string;
    placeholder: string;
    type?: string;
    required?: boolean;
    onChange: (value: string) => void;
};

export default function SupportInput({
    id,
    label,
    value,
    placeholder,
    type = "text",
    required = false,
    onChange,
}: SupportInputProps) {
    return (
        <div className="min-w-0">
            <label htmlFor={id} className="text-sm font-semibold leading-5 text-[#101828]">
                {label}
            </label>
            <input
                id={id}
                type={type}
                value={value}
                required={required}
                onChange={(event) => onChange(event.target.value)}
                placeholder={placeholder}
                className="mt-1 h-10 w-full min-w-0 rounded-md border border-[#E4E7EC] bg-[#F8F9FB] px-3 text-sm text-[#101828] outline-none placeholder:text-[#98A2B3] focus:border-[#2E3A83] focus:bg-white focus:ring-2 focus:ring-[#2E3A83]/10"
            />
        </div>
    );
}
