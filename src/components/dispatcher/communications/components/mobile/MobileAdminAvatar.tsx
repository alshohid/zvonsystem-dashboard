import Image from "next/image";

export default function MobileAdminAvatar() {
    return (
        <span className="relative h-6 w-6 shrink-0 overflow-hidden rounded-full bg-[#E4E7EC]">
            <Image
                src="/sidebar/profile_img.jpg"
                alt="Dispatcher avatar"
                width={32}
                height={32}
                className="h-full w-full object-cover"
            />
        </span>
    );
}
