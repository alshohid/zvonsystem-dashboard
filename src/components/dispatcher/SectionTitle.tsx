interface SectionTitleProps {
  title: string;
  subtitle?: string;
}

export default function SectionTitle({ title, subtitle }: SectionTitleProps) {
  return (
    <div>
      <h2 className="text-[24px] font-semibold text-[#1F2430] md:text-[20px] ml-6 py-1">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-1 text-[16px] text-[#8A94A6]">{subtitle}</p>
      ) : null}
    </div>
  );
}
