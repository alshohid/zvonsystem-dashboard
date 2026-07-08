import type { ReactNode } from "react";
import { Headphones, Radio, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { connectionToneClasses } from "@/src/components/admin/support-chat/supportChatUtils";
import type { SupportConnectionStatus } from "@/src/types/adminSupportChatTypes";

type SupportWorkspaceHeaderProps = {
  connectionStatus: SupportConnectionStatus;
  totalConversations: number;
  unreadCount: number;
  resolvedCount: number;
};

function SummaryCard({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-[#EAECF0] bg-white px-4 py-3 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#EEF4FF] text-[#3538CD]">
          {icon}
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.08em] text-[#667085]">
            {label}
          </p>
          <p className="text-lg font-semibold text-[#101828]">{value}</p>
        </div>
      </div>
    </div>
  );
}

export default function SupportWorkspaceHeader({
  connectionStatus,
  totalConversations,
  unreadCount,
  resolvedCount,
}: SupportWorkspaceHeaderProps) {
  return (
    <div className="flex flex-col gap-4 rounded-[28px] border border-[#EAECF0] bg-[linear-gradient(135deg,#FFFFFF_0%,#F8FAFF_44%,#F3F0FF_100%)] p-5 shadow-[0_10px_30px_rgba(81,56,238,0.08)]">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#D0D5DD] bg-white px-3 py-1 text-xs font-medium text-[#475467]">
            <Headphones className="h-3.5 w-3.5" />
            Admin support inbox
          </div>

          <div>
            <h1 className="text-[1.9rem] font-semibold tracking-[-0.04em] text-[#101828]">
              Real-time support conversations
            </h1>
            <p className="mt-1 max-w-3xl text-sm text-[#667085]">
              UI, store shape, and mocked live events are already split for fast
              RTK Query or socket integration later.
            </p>
          </div>
        </div>

        <div
          className={cn(
            "inline-flex items-center gap-2 rounded-full border px-3 py-2 text-sm font-medium",
            connectionToneClasses[connectionStatus],
          )}
        >
          <Radio className="h-4 w-4" />
          {connectionStatus === "connected"
            ? "Simulation connected"
            : connectionStatus === "connecting"
              ? "Connecting mock socket"
              : "Connection offline"}
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        <SummaryCard
          icon={<Headphones className="h-5 w-5" />}
          label="Total Threads"
          value={String(totalConversations)}
        />
        <SummaryCard
          icon={<Radio className="h-5 w-5" />}
          label="Unread Updates"
          value={String(unreadCount)}
        />
        <SummaryCard
          icon={<ShieldCheck className="h-5 w-5" />}
          label="Resolved"
          value={String(resolvedCount)}
        />
      </div>
    </div>
  );
}
