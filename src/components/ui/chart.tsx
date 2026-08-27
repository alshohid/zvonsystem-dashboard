"use client";

import * as React from "react";
import { cn } from "@/src/lib/utils";

export interface ChartConfig {
    [key: string]: {
        label?: string;
        color?: string;
    };
}

interface ChartContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    config: ChartConfig;
    children: React.ReactNode;
}

const ChartContainer = React.forwardRef<HTMLDivElement, ChartContainerProps>(
    ({ className, config, children, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn("w-full", className)}
                style={
                    {
                        "--color-chrome": config.chrome?.color || "hsl(var(--chart-1))",
                        "--color-safari": config.safari?.color || "hsl(var(--chart-2))",
                        "--color-firefox": config.firefox?.color || "hsl(var(--chart-3))",
                        "--color-edge": config.edge?.color || "hsl(var(--chart-4))",
                        "--color-other": config.other?.color || "hsl(var(--chart-5))",
                        "--color-shooter": config.shooter?.color || "#5952FF",
                        "--color-racing": config.racing?.color || "#E67A00",
                    } as React.CSSProperties
                }
                {...props}
            >
                {children}
            </div>
        );
    }
);
ChartContainer.displayName = "ChartContainer";

interface ChartTooltipProps {
    children?: React.ReactNode;
    content?: React.ComponentType<any>;
    cursor?: boolean | { stroke?: string; strokeWidth?: number; strokeOpacity?: number };
}

const ChartTooltip = ({ children, content, cursor }: ChartTooltipProps) => {
    return children;
};

interface ChartTooltipContentProps extends React.HTMLAttributes<HTMLDivElement> {
    active?: boolean;
    payload?: any[];
    label?: string | number;
    hideLabel?: boolean;
}

const ChartTooltipContent = React.forwardRef<
    HTMLDivElement,
    ChartTooltipContentProps
>(({ className, active, payload, label, hideLabel, ...props }, ref) => {
    if (!active || !payload || payload.length === 0) return null;

    return (
        <div
            ref={ref}
            className={cn(
                "bg-gray-800 dark:bg-gray-900 p-3 rounded-lg shadow-lg border border-gray-700",
                className
            )}
            {...props}
        >
            {!hideLabel && label && (
                <div className="mb-2 text-sm font-medium text-gray-300">{label}</div>
            )}
            <div className="space-y-1">
                {payload.map((entry: any, index: number) => (
                    <div key={index} className="flex items-center gap-2">
                        <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: entry.color }}
                        />
                        <span className="text-sm text-gray-300">
                            {entry.name}: {entry.value}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
});
ChartTooltipContent.displayName = "ChartTooltipContent";

export { ChartContainer, ChartTooltip, ChartTooltipContent };
