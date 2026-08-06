const shimmer = "animate-pulse bg-[#EEF1F7]";

export function ProfileSettingsSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[300px_1fr]">
      <div className="overflow-hidden rounded-2xl border border-[#E9EDF5] bg-white">
        <div className="flex flex-col items-center gap-3 px-6 pb-6 pt-8">
          <div className={`${shimmer} h-20 w-20 rounded-full`} />
          <div className={`${shimmer} h-4 w-32 rounded-md`} />
          <div className={`${shimmer} h-3 w-20 rounded-md`} />
          <div className={`${shimmer} mt-2 h-10 w-full rounded-xl`} />
        </div>
      </div>

      <div className="space-y-5 rounded-2xl border border-[#E9EDF5] bg-white p-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="grid grid-cols-1 gap-3 sm:grid-cols-[220px_1fr] sm:gap-6"
          >
            <div className="space-y-2">
              <div className={`${shimmer} h-4 w-28 rounded-md`} />
              <div className={`${shimmer} h-3 w-40 rounded-md`} />
            </div>
            <div className={`${shimmer} h-11 w-full rounded-lg`} />
          </div>
        ))}
      </div>
    </div>
  );
}

export function AccountSettingsSkeleton() {
  return (
    <div className="space-y-5 rounded-2xl border border-[#E9EDF5] bg-white p-6">
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          className="grid grid-cols-1 gap-3 sm:grid-cols-[220px_1fr] sm:gap-6"
        >
          <div className="space-y-2">
            <div className={`${shimmer} h-4 w-28 rounded-md`} />
            <div className={`${shimmer} h-3 w-44 rounded-md`} />
          </div>
          <div className="space-y-3">
            <div className={`${shimmer} h-11 w-full rounded-lg`} />
            {index === 1 ? (
              <>
                <div className={`${shimmer} h-11 w-full rounded-lg`} />
                <div className={`${shimmer} h-11 w-full rounded-lg`} />
              </>
            ) : null}
          </div>
        </div>
      ))}
    </div>
  );
}
