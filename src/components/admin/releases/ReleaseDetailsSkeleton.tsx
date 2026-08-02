const shimmer = 'animate-pulse bg-[#EEF1F7]';

function InfoRowSkeleton({ valueWidth }: { valueWidth: string }) {
  return (
    <div className="flex items-center justify-between gap-6 border-b border-[#F2F4F7] py-2.5 last:border-b-0">
      <div className={`${shimmer} h-3.5 w-24 rounded-md`} />
      <div className={`${shimmer} h-3.5 rounded-md ${valueWidth}`} />
    </div>
  );
}

function CardSkeleton({ valueWidths }: { valueWidths: string[] }) {
  return (
    <section className="rounded-2xl border border-[#E9EDF5] bg-white">
      <header className="border-b border-[#E9EDF5] px-5 py-4">
        <div className={`${shimmer} h-3.5 w-32 rounded-md`} />
      </header>
      <div className="px-5 py-3">
        {valueWidths.map((width, index) => (
          <InfoRowSkeleton key={index} valueWidth={width} />
        ))}
      </div>
    </section>
  );
}

/**
 * Mirrors the release details layout while the release is being fetched.
 * The back link is only a placeholder before the page is interactive; once the
 * container is mounted it renders the real one and this stands in below it.
 */
export default function ReleaseDetailsSkeleton({
  withBackLink = true,
}: {
  withBackLink?: boolean;
}) {
  return (
    <div className="space-y-6">
      {withBackLink ? <div className={`${shimmer} h-3 w-24 rounded-md`} /> : null}

      <div className="flex flex-col gap-6 sm:flex-row">
        <div className={`${shimmer} h-48 w-48 shrink-0 rounded-xl`} />

        <div className="flex flex-col justify-center gap-3">
          <div className={`${shimmer} h-5 w-40 rounded-md`} />
          <div className={`${shimmer} h-9 w-72 max-w-full rounded-md`} />
          <div className={`${shimmer} h-4 w-48 rounded-md`} />
          <div className={`${shimmer} h-5 w-56 rounded-md`} />

          <div className="mt-2 flex flex-wrap gap-x-8 gap-y-2">
            <div className={`${shimmer} h-3.5 w-16 rounded-md`} />
            <div className={`${shimmer} h-3.5 w-14 rounded-md`} />
            <div className={`${shimmer} h-3.5 w-20 rounded-md`} />
            <div className={`${shimmer} h-3.5 w-28 rounded-md`} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <CardSkeleton valueWidths={['w-16', 'w-20', 'w-28', 'w-24', 'w-24', 'w-32']} />
        <CardSkeleton valueWidths={['w-24', 'w-36', 'w-28']} />
      </div>

      <section className="rounded-2xl border border-[#E9EDF5] bg-white">
        <header className="flex items-center justify-between border-b border-[#E9EDF5] px-5 py-4">
          <div className={`${shimmer} h-3.5 w-16 rounded-md`} />
          <div className={`${shimmer} h-3 w-12 rounded-md`} />
        </header>

        <ul>
          {Array.from({ length: 4 }, (_, index) => (
            <li
              key={index}
              className="flex items-center gap-4 border-b border-[#F2F4F7] px-5 py-3 last:border-b-0"
            >
              <div className={`${shimmer} h-3 w-5 shrink-0 rounded-md`} />
              <div className={`${shimmer} h-7 w-7 shrink-0 rounded-full`} />

              <div className="min-w-0 flex-1 space-y-2">
                <div className={`${shimmer} h-3.5 w-48 max-w-full rounded-md`} />
                <div className={`${shimmer} h-3 w-32 max-w-full rounded-md`} />
              </div>

              <div className={`${shimmer} h-3 w-16 shrink-0 rounded-md`} />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
