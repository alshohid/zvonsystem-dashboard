const shimmer = "animate-pulse rounded-2xl bg-[#EEF1F7]";

export default function AnalyticsSkeleton() {
  return (
    <div className="space-y-6">
      <div className={`${shimmer} h-14 w-48`} />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className={`${shimmer} h-32`} />
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <div className={`${shimmer} h-[360px]`} />
        <div className={`${shimmer} h-[360px]`} />
      </div>

      <div className={`${shimmer} h-[420px]`} />
    </div>
  );
}
