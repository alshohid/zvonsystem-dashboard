"use client";

import Switch from "../../ui/switch/Switch";



interface MaintenanceToggleCardProps {
    title: string;
    description: string;
    checked: boolean;
    onChange: (value: boolean) => void;
}

const MaintenanceToggleCard = ({
    title,
    description,
    checked,
    onChange,
}: MaintenanceToggleCardProps) => {
    return (
        <div className="flex w-full flex-col gap-4 rounded-xl bg-[#080E1E99] p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-col gap-1">
                <p className="text-sm font-medium text-white">{title}</p>
                <p className="text-xs leading-relaxed text-white/50">
                    {description}
                </p>
            </div>

            <div className="self-start sm:self-center">
                <Switch
                    checked={checked}
                    onCheckedChange={onChange}
                />
            </div>
        </div>
    );
};

export default MaintenanceToggleCard;
