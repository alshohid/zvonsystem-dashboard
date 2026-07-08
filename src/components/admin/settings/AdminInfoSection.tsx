import React from "react";
import EditSquareIcon from "@/src/icons/EditSquareIcon";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";

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

interface AdminInfoSectionProps {
    settings: Settings;
    setSettings: React.Dispatch<React.SetStateAction<Settings>>;
}

const AdminInfoSection: React.FC<AdminInfoSectionProps> = ({ settings, setSettings }) => {
    return (
        <section className="rounded-xl p-6" style={{ backgroundColor: "#18222A", borderColor: "#26344B", borderWidth: "1px" }}>
            <div className="flex justify-between items-center">
                <h3 className="text-white font-semibold text-[1rem] md:text-[1.25rem] mb-4">
                    Admin Information
                </h3>
                <Button type="button" className="flex space-x-2 bg-[#3641534D] text-[#5952FF]">
                    <span className="text-[#5952FF]"><EditSquareIcon /></span>
                    Edit
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-[14px] text-[#BEBEC8]">Name</label>
                    <Input
                        name="adminName"
                        placeholder="Enter Name"
                        value={settings.adminName}
                        onChange={(e) => setSettings((p) => ({ ...p, adminName: e.target.value }))}
                        className="border border-[#5B5A64] text-[#BEBEC8]"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-[14px] text-[#BEBEC8]">Account Type</label>
                    <Input
                        name="accountType"
                        placeholder="Enter Account Type"
                        value={settings.accountType}
                        disabled
                        className="border border-[#5B5A64] text-[#545454] cursor-not-allowed"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-[14px] text-[#BEBEC8]">Email Address</label>
                    <Input
                        name="email"
                        type="email"
                        placeholder="Enter Email Address"
                        value={settings.email}
                        onChange={(e) => setSettings((p) => ({ ...p, email: e.target.value }))}
                        className="border border-[#5B5A64] text-[#BEBEC8]"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-[14px] text-[#BEBEC8]">Phone Number</label>
                    <Input
                        name="phone"
                        placeholder="Enter Phone Number"
                        value={settings.phone}
                        onChange={(e) => setSettings((p) => ({ ...p, phone: e.target.value }))}
                        className="border border-[#5B5A64] text-[#BEBEC8]"
                    />
                </div>
            </div>
        </section>
    );
};

export default AdminInfoSection;
