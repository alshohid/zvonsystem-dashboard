"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/src/lib/utils";
import { settingsNav } from "@/src/lib/settingsNav";

export default function SettingsSidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-full rounded-xl border border-[#26344B] bg-[#111B23] p-3">
            <p className="px-2 pb-2 text-xs text-white/40">Settings Menu</p>

            <div className="flex flex-col gap-1">
                {settingsNav.map((item) => {
                    const active = pathname === item.href;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "w-full flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition",
                                active ? "bg-[#6B38FF] text-white" : "text-white/60 hover:bg-white/5 hover:text-white",
                                item.danger && !active && "text-red-400 hover:text-red-300"
                            )}
                        >
                            <item.icon className="h-4 w-4" />
                            <span>{item.label}</span>
                        </Link>
                    );
                })}
            </div>
        </aside>
    );
}
