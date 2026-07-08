import { AlertTriangle, RefreshCw } from "lucide-react";

type AnalyticsErrorProps = {
  onRetry: () => void;
};

export default function AnalyticsError({ onRetry }: AnalyticsErrorProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-[24px] border border-[#F2B7B7] bg-[#FFF1F1] p-10 text-center">
      <AlertTriangle size={28} className="text-[#DC2626]" />
      <p className="text-sm font-medium text-[#101828]">
        Couldn&apos;t load your analytics data.
      </p>
      <button
        type="button"
        onClick={onRetry}
        className="mt-1 inline-flex items-center gap-2 rounded-xl border border-[#D7DDF2] bg-white px-4 py-2 text-sm font-semibold text-[#2E3A83] transition hover:bg-[#F7F8FE]"
      >
        <RefreshCw size={14} />
        Retry
      </button>
    </div>
  );
}
