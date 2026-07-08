"use client";

import { useState } from "react";
import SessionManagementSection from "./SessionManagementSection";
import TwoFactorSection from "./TwoFactorSection";
import { useRouter } from "next/navigation";

export default function SecuritySection() {
    const router = useRouter()
    const [sessionTimeout, setSessionTimeout] = useState("30");

    // initial state → both not configured (screenshot)
    const [twoFA, setTwoFA] = useState({
        email: { configured: false, enabled: false },
        phone: { configured: false, enabled: false },
    });

    return (
        <div className="space-y-6 w-full">
            <SessionManagementSection value={sessionTimeout} onChange={setSessionTimeout} />

            <TwoFactorSection
                title=" Two-Factor Authentication (2FA)"
                description=" Secure admin accounts with an additional layer of protection."
                email={twoFA.email}
                phone={twoFA.phone}
                onEmailSetup={() =>
                    router.push(`/admin/dashboard/settings/security/2fa/email-verify`)
                    
                }
                onPhoneSetup={() =>
                    router.push(`/admin/dashboard/settings/security/2fa/phone-verify`)
                }
                onEmailToggle={(v) =>
                    setTwoFA((p) => ({ ...p, email: { ...p.email, enabled: v } }))
                }
                onPhoneToggle={(v) =>
                    setTwoFA((p) => ({ ...p, phone: { ...p.phone, enabled: v } }))
                }
                onEmailRemove={() =>
                    setTwoFA((p) => ({ ...p, email: { configured: false, enabled: false } }))
                }
                onPhoneRemove={() =>
                    setTwoFA((p) => ({ ...p, phone: { configured: false, enabled: false } }))
                }
            />
        </div>
    );
}
