import type { ITopCountry } from "@/src/types/analyticsTypes";
import { DASHBOARD_COLORS } from "@/src/components/design/dashboard/dashboardTheme";
import { formatCompactNumber } from "@/src/components/design/dashboard/dashboardFormat";

type TopCountriesCardProps = {
  countries: ITopCountry[];
};

export default function TopCountriesCard({ countries }: TopCountriesCardProps) {
  const maxStreams = Math.max(...countries.map((country) => country.streams), 1);

  return (
    <section className="rounded-[24px] border border-[#E7EBF7] bg-white p-5 shadow-[0_18px_45px_rgba(46,58,131,0.06)] sm:p-6">
      <div>
        <h3 className="text-lg font-semibold text-[#101828]">Top Countries</h3>
        <p className="mt-1 text-sm text-[#667085]">By stream share</p>
      </div>

      <div className="mt-6 flex flex-col gap-4">
        {countries.map((country) => (
          <div key={country.id}>
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-[#344054]">{country.country}</span>
              <span className="text-[#667085]">{formatCompactNumber(country.streams)}</span>
            </div>
            <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-[#F1F3F9]">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${(country.streams / maxStreams) * 100}%`,
                  backgroundColor: DASHBOARD_COLORS.streamAccent,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
