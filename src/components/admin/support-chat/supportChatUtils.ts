import { format, isToday, isYesterday } from "date-fns";
import type {
  SupportConnectionStatus,
  SupportConversationPriority,
  SupportConversationStatus,
} from "@/src/types/adminSupportChatTypes";

export const connectionToneClasses: Record<SupportConnectionStatus, string> = {
  connecting: "border-[#D0D5DD] bg-white text-[#667085]",
  connected: "border-[#ABEFC6] bg-[#ECFDF3] text-[#067647]",
  offline: "border-[#FDA29B] bg-[#FEF3F2] text-[#B42318]",
};

export const priorityToneClasses: Record<SupportConversationPriority, string> = {
  high: "border-[#FECACA] bg-[#FEF2F2] text-[#B42318]",
  medium: "border-[#FEDF89] bg-[#FFFAEB] text-[#B54708]",
  low: "border-[#D1FADF] bg-[#ECFDF3] text-[#027A48]",
};

export const statusToneClasses: Record<SupportConversationStatus, string> = {
  active: "border-[#C7D7FE] bg-[#EEF4FF] text-[#3538CD]",
  waiting: "border-[#F9DBAF] bg-[#FFF7E8] text-[#C4320A]",
  resolved: "border-[#ABEFC6] bg-[#ECFDF3] text-[#067647]",
};

export function formatConversationTimestamp(isoDate: string) {
  const date = new Date(isoDate);
  const diffInMinutes = Math.max(
    1,
    Math.floor((Date.now() - date.getTime()) / 60_000),
  );

  if (diffInMinutes < 60) {
    return `${diffInMinutes} min ago`;
  }

  if (diffInMinutes < 1_440) {
    return `${Math.floor(diffInMinutes / 60)}h ago`;
  }

  if (isYesterday(date)) {
    return "Yesterday";
  }

  return format(date, "MMM d");
}

export function formatMessageTimestamp(isoDate: string) {
  return format(new Date(isoDate), "h:mm a");
}

export function formatMessageDayLabel(isoDate: string) {
  const date = new Date(isoDate);

  if (isToday(date)) {
    return "Today";
  }

  if (isYesterday(date)) {
    return "Yesterday";
  }

  return format(date, "MMM d, yyyy");
}
