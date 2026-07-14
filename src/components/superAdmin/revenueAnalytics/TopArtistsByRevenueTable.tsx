import InitialAvatar from "@/src/components/superAdmin/dashboard/InitialAvatar";
import { PlanBadge } from "@/src/components/superAdmin/pricingManagement/badges";
import type { TopArtistByRevenue } from "./types";

const TABLE_HEADERS = ["Artist", "Plan", "Releases", "Revenue"];

type TopArtistsByRevenueTableProps = {
  artists: TopArtistByRevenue[];
};

export default function TopArtistsByRevenueTable({ artists }: TopArtistsByRevenueTableProps) {
  return (
    <section className="overflow-hidden rounded-2xl border border-[#E9EDF5] bg-white shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
      <h3 className="px-5 py-4 text-[15px] font-semibold text-[#101828]">Top Artists by Revenue</h3>

      <div className="w-full overflow-x-auto border-t border-[#F0F2F7]">
        <table className="w-full min-w-[560px] border-collapse">
          <thead>
            <tr className="bg-[#F2F4F8]">
              {TABLE_HEADERS.map((header) => (
                <th
                  key={header}
                  className="px-5 py-3 text-left text-[13px] font-medium text-[#475467]"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {artists.map((artist) => (
              <tr
                key={artist.id}
                className="border-t border-[#F0F2F7] transition-colors hover:bg-[#FAFBFC]"
              >
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <InitialAvatar name={artist.artistName} size={32} />
                    <p className="truncate text-[14px] font-medium text-[#101828]">
                      {artist.artistName}
                    </p>
                  </div>
                </td>

                <td className="px-5 py-4">
                  <PlanBadge plan={artist.plan} />
                </td>

                <td className="px-5 py-4 text-[14px] text-[#475467]">{artist.releases}</td>

                <td className="px-5 py-4 text-[14px] font-semibold text-[#101828]">
                  ${artist.revenue.toFixed(2)}
                </td>
              </tr>
            ))}

            {artists.length === 0 ? (
              <tr>
                <td colSpan={TABLE_HEADERS.length} className="px-5 py-12 text-center text-sm text-[#98A2B3]">
                  No artist revenue data yet.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </section>
  );
}
