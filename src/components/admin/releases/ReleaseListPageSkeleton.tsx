import ReleaseGridSkeleton from './ReleaseGridSkeleton';

const shimmer = 'animate-pulse bg-[#EEF1F7]';

/** Stands in for a release list page until its client state is ready. */
export default function ReleaseListPageSkeleton({
  withTabs = false,
}: {
  withTabs?: boolean;
}) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-2">
          <div className={`${shimmer} h-3 w-20 rounded-md`} />
          <div className={`${shimmer} h-7 w-48 rounded-md`} />
        </div>
        <div
          className={`${shimmer} h-11 w-full rounded-lg ${withTabs ? 'sm:max-w-xs' : 'sm:max-w-sm'}`}
        />
      </div>

      {withTabs ? <div className={`${shimmer} h-11 max-w-md rounded-lg`} /> : null}

      <ReleaseGridSkeleton />
    </div>
  );
}
