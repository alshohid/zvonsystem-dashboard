import { Check, CheckCircle2, Info, X } from "lucide-react";
import type { PendingRelease } from "./mockSuperAdminDashboard";

type PendingApprovalDetailProps = {
  release: PendingRelease;
  onApprove: () => void;
  onReject: () => void;
};

export default function PendingApprovalDetail({
  release,
  onApprove,
  onReject,
}: PendingApprovalDetailProps) {
  return (
    <div className="space-y-5 rounded-2xl border border-[#E9EDF5] bg-white p-5">
      <div
        className="relative h-56 w-full overflow-hidden rounded-2xl bg-cover bg-center sm:h-72"
        style={{ backgroundImage: `url(${release.coverImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5">
          <div className="min-w-0">
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-white/80">
              {release.genre} · {release.type}
            </p>
            <h2 className="truncate text-2xl font-bold text-white sm:text-3xl">
              {release.title}
            </h2>
          </div>

          <div
            className="h-11 w-11 shrink-0 rounded-full border-2 border-white bg-cover bg-center"
            style={{ backgroundImage: `url(${release.artistAvatar})` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 border-b border-[#EEF2ED] pb-5">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.1em] text-[#98A2B3]">Artist</p>
          <p className="mt-1 text-sm font-semibold text-[#101828]">{release.artist}</p>
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.1em] text-[#98A2B3]">Tracks</p>
          <p className="mt-1 text-sm font-semibold text-[#101828]">{release.trackCount}</p>
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.1em] text-[#98A2B3]">Submitted</p>
          <p className="mt-1 text-sm font-semibold text-[#101828]">{release.submittedDate}</p>
        </div>
      </div>

      <div className="border-b border-[#EEF2ED] pb-5">
        <p className="text-xs font-medium uppercase tracking-[0.1em] text-[#98A2B3]">
          Artist Note
        </p>
        <p className="mt-2 text-sm text-[#344054]">{release.artistNote}</p>
      </div>

      <div className="border-b border-[#EEF2ED] pb-5">
        <p className="text-xs font-medium uppercase tracking-[0.1em] text-[#98A2B3]">
          Submission Checklist
        </p>
        <div className="mt-3 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2">
          {release.checklist.map((item) => (
            <div key={item} className="flex items-center gap-2 text-sm text-[#344054]">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-success-600" />
              {item}
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={onApprove}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary py-3 text-sm font-semibold text-[#101828] transition-opacity hover:opacity-90"
        >
          <Check className="h-4 w-4" />
          Approve Release
        </button>

        <button
          type="button"
          onClick={onReject}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-error-500 px-6 py-3 text-sm font-semibold text-error-600 transition-colors hover:bg-error-50"
        >
          <X className="h-4 w-4" />
          Reject
        </button>

        <button
          type="button"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#E5E7EB] text-[#667085] transition-colors hover:bg-gray-50"
          aria-label="More information"
        >
          <Info className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
