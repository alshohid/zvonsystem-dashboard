import { cn } from "@/lib/utils";

export const Badge = ({
    children,
    variant = "neutral",
}: {
    children: React.ReactNode;
    variant?: "success" | "neutral";
}) => {
    return (
        <span
            className={cn(
                "inline-flex items-center rounded-md px-2 py-1 text-[0.75rem] font-medium",
                variant === "success"
                    ? "bg-green-600/20 text-green-400"
                    : "bg-[#7B8594] text-[#fff]"
            )}
        >
            {children}
        </span>
    );
};
