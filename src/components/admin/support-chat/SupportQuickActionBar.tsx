import { FileText } from "lucide-react";
import type { SupportQuickAction } from "@/src/types/adminSupportChatTypes";

type SupportQuickActionBarProps = {
  actions: SupportQuickAction[];
  onRequestDocuments: () => void;
};

export default function SupportQuickActionBar({
  actions,
  onRequestDocuments,
}: SupportQuickActionBarProps) {
  if (!actions.length) {
    return null;
  }

  const promptAction = actions[0];
  const buttonAction = actions[1] ?? actions[0];

  return (
    <div className="shrink-0 border-b border-[#EAECF0] bg-white px-4 py-3 sm:px-6">
      <div className="flex flex-col gap-3 rounded-[12px] border border-[#BFD8FF] bg-[#EEF6FF] px-3 py-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="inline-flex min-w-0 items-center gap-2 text-sm text-[#006AFF]">
          <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white text-[#006AFF]">
            <FileText className="h-4 w-4" />
          </span>
          <span className="truncate">{promptAction.label}</span>
        </div>

        <button
          type="button"
          onClick={onRequestDocuments}
          className="inline-flex h-9 shrink-0 cursor-pointer items-center justify-center rounded-[8px] bg-[#006AFF] px-4 text-xs font-semibold text-white shadow-[0_8px_16px_rgba(0,106,255,0.18)] transition hover:bg-[#0055D4]"
        >
          {buttonAction.label}
        </button>
      </div>
    </div>
  );
}
