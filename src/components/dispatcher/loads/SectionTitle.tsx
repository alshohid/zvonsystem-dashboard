export function SectionTitle({ title }: { title: string }) {
  return (
    <div className="px-4 pb-4 pt-1 sm:px-6">
      <h3 className="text-[18px] font-semibold text-[#111827]">{title}</h3>
    </div>
  );
}
