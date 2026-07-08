
import Image from "next/image";


interface ProfileAvatarProps {
    imageSrc: string;
    isOnline?: boolean;
}

export default function ProfileAvatar({
    imageSrc,
    isOnline = false,
}: ProfileAvatarProps) {
    return (
        <div className="relative w-[6.85rem] h-[6.85rem]">
            <div className="w-[6.85rem] h-[6.85rem] rounded-full bg-gray-300 dark:bg-[#98A2B3] flex items-center justify-center overflow-hidden">
                <Image
                    src={imageSrc}
                    alt="User"
                    width={400}
                    height={400}
                    className="rounded-full"
                />

            </div>


        </div>
    );
}
