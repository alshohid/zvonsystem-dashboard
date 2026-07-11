type InitialAvatarProps = {
  name: string;
  size?: number;
};

export default function InitialAvatar({ name, size = 40 }: InitialAvatarProps) {
  const initial = name.trim().charAt(0).toUpperCase();

  return (
    <div
      className="flex shrink-0 items-center justify-center rounded-full bg-[#101828] font-semibold text-white"
      style={{ width: size, height: size, fontSize: size * 0.4 }}
    >
      {initial}
    </div>
  );
}
