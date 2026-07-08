"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { ArrowRight, ShieldCheck, Mail, Phone, Trash2 } from "lucide-react";
import Switch from "../../ui/switch/Switch";
import { Button } from "../../ui/button";
import { Badge } from "./Badge";

type TwoFactorMethodState = {
    configured: boolean;
    enabled: boolean;
};

type TwoFactorSectionProps = {
    email: TwoFactorMethodState;
    phone: TwoFactorMethodState;
    title?: string;
    description?: string;

    onEmailSetup: () => void;
    onPhoneSetup: () => void;

    onEmailToggle: (v: boolean) => void;
    onPhoneToggle: (v: boolean) => void;

    onEmailRemove: () => void;
    onPhoneRemove: () => void;
};

const TwoFactorItem = ({
    icon,
    title,
    subtitle,
    right,
}: {
    icon: React.ReactNode;
    title: React.ReactNode;
    subtitle: string;
    right: React.ReactNode;
}) => {
    return (
        <div className="flex w-full flex-col gap-4 rounded-lg border border-[#252528] bg-[rgba(8,14,30,0.60)] p-4 sm:flex-row sm:items-center sm:justify-between sm:p-6">
            <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-full bg-[#2B2FEE]/20 text-[#5952FF]">
                    {icon}
                </div>

                <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                        <p className="text-sm font-semibold text-white">{title}</p>
                    </div>
                    <p className="text-xs text-white/50">{subtitle}</p>
                </div>
            </div>

            <div className="flex items-center gap-3 self-start sm:self-center">
                {right}
            </div>
        </div>
    );
};

export default function TwoFactorSection({
    title,
    description,
    email,
    phone,
    onEmailSetup,
    onPhoneSetup,
    onEmailToggle,
    onPhoneToggle,
    onEmailRemove,
    onPhoneRemove,
}: TwoFactorSectionProps) {
    return (
        <section className="w-full rounded-xl border border-[#26344B] bg-[#18222A] px-6 py-6 sm:px-10">
            {/* Header */}
            <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#2B2FEE]/20 text-[#5952FF]">
                    <ShieldCheck className="h-5 w-5" />
                </div>

                <div className="space-y-0.5">
                    <p className="text-sm font-semibold text-white">
                        {title}
                    </p>
                    <p className="text-xs text-white/50">
                        {description}
                    </p>
                </div>
            </div>

            <div className="my-5 h-px w-full bg-white/10" />

            <div className="space-y-4">
                {/* Email */}
                <TwoFactorItem
                    icon={<Mail className="h-4 w-4" />}
                    title={
                        <>
                            Email Verification{" "}
                            <Badge variant={email.configured ? "neutral" : "neutral"}>
                                {email.configured ? "Configured" : "Not Configured Yet"}
                            </Badge>
                        </>
                    }
                    subtitle="Receive a temporary one-time passcode through email."
                    right={
                        email.configured ? (
                            <>
                                <Badge variant={email.enabled ? "success" : "neutral"}>
                                    {email.enabled ? "Active" : "Inactive"}
                                </Badge>

                                <Switch checked={email.enabled} onCheckedChange={onEmailToggle} />

                                <Button
                                    type="button"
                                    variant="secondary"
                                    onClick={onEmailRemove}
                                    className={cn(
                                        "h-10 gap-2 rounded-md px-4 text-xs font-semibold",
                                        "bg-white/10 text-white/60 hover:bg-white/15"
                                    )}
                                >
                                    Remove <Trash2 className="h-4 w-4" />
                                </Button>
                            </>
                        ) : (
                            <Button
                                type="button"
                                onClick={onEmailSetup}
                                className="h-10 gap-2 rounded-md px-4 text-xs font-semibold"
                            >
                                Continue Setup <ArrowRight className="h-4 w-4" />
                            </Button>
                        )
                    }
                />

                {/* Phone */}
                <TwoFactorItem
                    icon={<Phone className="h-4 w-4" />}
                    title={
                        <>
                            Phone Number Verification{" "}
                            <Badge variant="neutral">
                                {phone.configured ? "Configured" : "Not Configured Yet"}
                            </Badge>
                        </>
                    }
                    subtitle="Receive a temporary code via text message to your registered mobile phone number."
                    right={
                        phone.configured ? (
                            <>
                                <Badge variant={phone.enabled ? "success" : "neutral"}>
                                    {phone.enabled ? "Active" : "Inactive"}
                                </Badge>

                                <Switch checked={phone.enabled} onCheckedChange={onPhoneToggle} />

                                <Button
                                    type="button"
                                    variant="secondary"
                                    onClick={onPhoneRemove}
                                    className={cn(
                                        "h-10 gap-2 rounded-md px-4 text-xs font-semibold",
                                        "bg-white/10 text-white/60 hover:bg-white/15"
                                    )}
                                >
                                    Remove <Trash2 className="h-4 w-4" />
                                </Button>
                            </>
                        ) : (
                            <Button
                                type="button"
                                onClick={onPhoneSetup}
                                className="h-10 gap-2 rounded-md px-4 text-xs font-semibold"
                            >
                                Continue Setup <ArrowRight className="h-4 w-4" />
                            </Button>
                        )
                    }
                />
            </div>
        </section>
    );
}
