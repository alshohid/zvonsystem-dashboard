"use client";

import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ComponentCard from "../../common/ComponentCard";

interface Settings {
    adminName: string;
    accountType: string;
    email: string;
    phone: string;
    siteTitle: string;
    supportEmail: string;
    timezone: string;
    dateFormat: string;
    maintenance: boolean;
}

interface PreferenceSectionProps {
    settings: Settings;
    setSettings: React.Dispatch<React.SetStateAction<Settings>>;
}

const PreferenceSection: React.FC<PreferenceSectionProps> = ({ settings, setSettings }) => {
    return (
        <ComponentCard title="Preference" className="bg-[#18222A] border border-[#26344B]">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-1">
                    <label className="text-sm text-gray-400">Preferred Time zone</label>
                    <Select
                        value={settings.timezone}
                        onValueChange={(v) => setSettings((p) => ({ ...p, timezone: v }))}
                    >
                        <SelectTrigger className="h-11 w-full border-[#26344B] bg-transparent text-white">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-black border border-gray-700">
                            <SelectItem value="UTC+6">UTC +6</SelectItem>
                            <SelectItem value="UTC+7">UTC +7</SelectItem>
                            <SelectItem value="UTC+8">UTC +8</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-1">
                    <label className="text-sm text-gray-400">Date Format</label>
                    <Select
                        value={settings.dateFormat}
                        onValueChange={(v) => setSettings((p) => ({ ...p, dateFormat: v }))}
                    >
                        <SelectTrigger className="h-11 w-full border-[#26344B] bg-transparent text-white">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-black border border-gray-700">
                            <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                            <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                            <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </ComponentCard>
    );
};

export default PreferenceSection;
