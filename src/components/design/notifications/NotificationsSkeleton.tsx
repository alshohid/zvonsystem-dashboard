
"use client";

const shimmer = "animate-pulse rounded-2xl bg-[#EEF1F7]";

export default function NotificationsSkeleton() {
  return (
    <div className="space-y-6">
      <div className={`${shimmer} h-14 w-64`} />
      <div className={`${shimmer} h-[420px]`} />
    </div>
  );
}
