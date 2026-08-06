const shimmer = "animate-pulse rounded-2xl bg-[#EEF1F7]";

export default function RevenueAnalyticsSkeleton() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className={`${shimmer} h-3 w-16`} />
        <div className={`${shimmer} h-8 w-56`} />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className={`${shimmer} h-32`} />
        ))}
      </div>

      <div className={`${shimmer} h-[340px]`} />

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <div className={`${shimmer} h-[340px]`} />
        <div className={`${shimmer} h-[340px]`} />
      </div>

      <div className={`${shimmer} h-[320px]`} />
    </div>
  );
}
