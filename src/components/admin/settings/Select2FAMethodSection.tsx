"use client";

import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Mail, MessageSquareText, CheckCircle2, AlertTriangle, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

type Method = "email" | "phone";

type MethodCardProps = {
    active?: boolean;
    icon: React.ReactNode;
    title: string;
    desc: string;
    badge: string;
    onClick: () => void;
};

function MethodCard({ active, icon, title, desc, badge, onClick }: MethodCardProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={cn(
                "w-full text-left rounded-xl p-6 border-2 transition",
                "bg-[#1D1F2C] border-[#7B8594]/60 hover:border-[#7B8594]",
                active && "border-[#5B5BFF] ring-2 ring-[#5B5BFF]/20"
            )}
        >
            <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white">
                    {icon}
                </div>

                <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between gap-3">
                        <p className="text-sm font-semibold text-white">{title}</p>
                        {active ? (
                            <CheckCircle2 className="h-5 w-5 text-[#5B5BFF]" />
                        ) : null}
                    </div>

                    <p className="text-xs text-white/60 leading-relaxed">{desc}</p>

                    <div className="flex items-center gap-2 text-xs text-white/50">
                        <CheckCircle2 className="h-4 w-4 text-white/40" />
                        <span>{badge}</span>
                    </div>
                </div>
            </div>
        </button>
    );
}

export default function Select2FAMethodSection() {
    const router = useRouter();
    const [method, setMethod] = useState<Method | null>(null);

    const canContinue = useMemo(() => !!method, [method]);

    const handleContinue = () => {
        if (!method) return;
        if (method === "email") {
            router.push("/user/dashboard/settings/security/2fa/email-verify");
            return;
        }

        router.push("/user/dashboard/settings/security/2fa/phone-verify");
    };

    return (
        <section
            className={cn(
                "w-full rounded-xl border border-[#26344B] bg-[#18222A]",
                "px-6 py-6 sm:px-10 sm:py-10",
                "flex flex-col items-start gap-4"
            )}
        >
            {/* Header */}
            <div className="space-y-1 w-full">
                <h3 className="text-base font-semibold text-white">
                    Select Authentication Method
                </h3>
                <p className="text-sm text-white/50">
                    You can Email or SMS authentication method.
                </p>
            </div>

            <div className="h-px w-full bg-white/10" />

            {/* Card parent (Figma: flex-col gap-1.5rem) */}
            <div className="w-full flex flex-col gap-6">
                {/* Cards grid (responsive) */}
                <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
                    <MethodCard
                        active={method === "email"}
                        icon={<Mail className="h-5 w-5" />}
                        title="Email Verification"
                        desc="Use your personal mail to generate secure one-time passcode."
                        badge="Highest Security"
                        onClick={() => setMethod("email")}
                    />

                    <MethodCard
                        active={method === "phone"}
                        icon={<MessageSquareText className="h-5 w-5" />}
                        title="Phone Number Verification"
                        desc="Receive a unique verification code via text message to your registered mobile phone number."
                        badge="Standard Security"
                        onClick={() => setMethod("phone")}
                    />
                </div>

                {/* Bottom action row */}
                <div className="w-full rounded-lg border border-white/10 bg-black/10 p-4">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div className="space-y-0.5">
                            <p className="text-sm font-medium text-[#5B5BFF]">
                                Select any method to set-up 2FA
                            </p>
                            <p className="text-xs text-white/50">
                                You will receive a temporary one-time passcode to set-up the setting.
                            </p>
                        </div>

                        <Button
                            type="button"
                            onClick={handleContinue}
                            disabled={!canContinue}
                            className={cn(
                                "h-10 px-6 text-xs font-semibold w-full sm:w-auto",
                                !canContinue && "opacity-60"
                            )}
                        >
                            Continue Setup <ArrowRight className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                {/* Warning box */}
                <div className="w-full rounded-lg border border-yellow-500/40 bg-yellow-500/10 p-4">
                    <div className="flex items-start gap-3">
                        <AlertTriangle className="h-5 w-5 text-yellow-400 mt-0.5" />
                        <p className="text-xs text-yellow-200/90 leading-relaxed">
                            <span className="font-semibold">Important:</span> You cannot deposit or withdraw funds
                            from your crypto wallet until 2FA is enabled. We highly recommend enabling 2FA to
                            prevent attacks.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
