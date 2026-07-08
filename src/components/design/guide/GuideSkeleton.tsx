const shimmer = "animate-pulse rounded-2xl bg-[#EEF1F7]";

export default function GuideSkeleton() {
  return (
    <div className="space-y-6">
      <div className={`${shimmer} h-16 w-56`} />
      <div className={`${shimmer} h-[420px]`} />
    </div>
  );
}
