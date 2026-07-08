"use client";

type RoleSectionPageProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export default function RoleSectionPage({
  eyebrow,
  title,
  description,
}: RoleSectionPageProps) {
  return (
    <section className="rounded-[28px] border border-[#E3E8F7] bg-white p-6 shadow-[0_18px_50px_rgba(46,58,131,0.08)] sm:p-8">
      <div className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#2E3A83]">
          {eyebrow}
        </p>
        <h1 className="mt-4 text-3xl font-semibold text-[#101828]">
          {title}
        </h1>
        <p className="mt-4 text-sm leading-7 text-[#667085] sm:text-base">
          {description}
        </p>
      </div>
    </section>
  );
}
