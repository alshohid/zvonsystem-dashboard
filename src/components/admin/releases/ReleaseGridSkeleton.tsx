const shimmer = 'animate-pulse bg-[#EEF1F7]';

function ReleaseCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-[#E9EDF5] bg-white shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
      <div className={`${shimmer} aspect-square w-full`} />

      <div className="space-y-2 p-4">
        <div className={`${shimmer} h-3.75 w-3/4 rounded-md`} />
        <div className={`${shimmer} h-3 w-1/2 rounded-md`} />

        <div className="flex items-center justify-between pt-1">
          <div className={`${shimmer} h-5 w-16 rounded-md`} />
          <div className={`${shimmer} h-3 w-10 rounded-md`} />
        </div>
      </div>
    </div>
  );
}

export default function ReleaseGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: count }, (_, index) => (
        <ReleaseCardSkeleton key={index} />
      ))}
    </div>
  );
}
