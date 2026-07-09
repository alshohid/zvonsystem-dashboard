import Image from "next/image";

export default function AuthShadowPanel({ tagline }: { tagline: string }) {
  return (
    <div className="relative flex h-[320px] items-center justify-center overflow-hidden rounded-[26px] bg-[#F4F5F7] sm:h-[400px] lg:h-full lg:min-h-0">
      <Image
        src="/images/login_shadow_left.png"
        alt=""
        fill
        priority
        className="object-cover"
      />
      <p className="relative z-10 max-w-[420px] px-8 text-center text-[28px] font-semibold leading-tight tracking-[-0.02em] text-[#101828] sm:text-[34px]">
        {tagline}
      </p>
    </div>
  );
}
