const shimmer = "animate-pulse rounded-2xl bg-[#EEF1F7]";

export default function SuperAdminDashboardSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className={`${shimmer} h-32`} />
        ))}
      </div>

      <div className={`${shimmer} h-12 w-full max-w-xl`} />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[2fr_3fr]">
        <div className="space-y-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className={`${shimmer} h-20`} />
          ))}
        </div>
        <div className={`${shimmer} min-h-[420px]`} />
      </div>

      <div className={`${shimmer} h-64`} />
    </div>
  );
}
