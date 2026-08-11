const shimmer = "animate-pulse bg-[#EEF1F7]";

function TableRowSkeleton() {
  return (
    <tr className="border-t border-[#F0F2F7]">
      <td className="px-5 py-4">
        <div className="flex items-center gap-3">
          <div className={`${shimmer} h-8 w-8 rounded-full`} />
          <div className="space-y-2">
            <div className={`${shimmer} h-3.5 w-32 rounded-md`} />
            <div className={`${shimmer} h-3 w-40 rounded-md`} />
          </div>
        </div>
      </td>

      <td className="px-5 py-4">
        <div className={`${shimmer} h-5 w-16 rounded-md`} />
      </td>

      <td className="px-5 py-4">
        <div className={`${shimmer} h-3.5 w-20 rounded-md`} />
      </td>

      <td className="px-5 py-4">
        <div className={`${shimmer} h-8 w-20 rounded-lg`} />
      </td>
    </tr>
  );
}

export default function UserManagementTableSkeleton({ count = 10 }: { count?: number }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-[#E9EDF5] bg-white shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse">
          <thead>
            <tr className="bg-[#F2F4F8]">
              <th className="px-5 py-3 text-left text-[13px] font-medium text-[#475467]">
                Artist
              </th>
              <th className="px-5 py-3 text-left text-[13px] font-medium text-[#475467]">
                Role
              </th>
              <th className="px-5 py-3 text-left text-[13px] font-medium text-[#475467]">
                Joined
              </th>
              <th className="px-5 py-3 text-left text-[13px] font-medium text-[#475467]">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {Array.from({ length: count }, (_, index) => (
              <TableRowSkeleton key={index} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
