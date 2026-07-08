"use client";

import { ArrowRight } from "lucide-react";

type LiveRoomDataProps = {
    roomName: string;
    roomId: string;
    gameType: string;
    entryFee: string;
    players: string;
    onViewMore?: () => void;
};

export default function LiveRoomDataCard({
    roomName,
    roomId,
    gameType,
    entryFee,
    players,
    onViewMore,
}: LiveRoomDataProps) {
    return (
        <section
            className="
                w-full
                rounded-xl
                border border-[#26344B]
                bg-[#111B23]
                p-4
                flex flex-col
                gap-5
                shadow-[0_1px_2px_rgba(10,13,20,0.03)]
            "
        >
            {/* Header */}
            <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-red-500" />
                <h3 className="text-[1rem] font-medium text-white">
                    Live Room preview
                </h3>
            </div>

            {/* Info list */}
            <div className="flex flex-col gap-3">
                <InfoRow label="Room name" value={roomName} />
                <InfoRow label="Room ID" value={roomId} />
                <InfoRow label="Game type" value={gameType} />
                <InfoRow label="Entry fee" value={entryFee} />
                <InfoRow label="Players" value={players} />
            </div>

            {/* Action */}
            <button
                type="button"
                onClick={onViewMore}
                className="
                    mt-2
                    flex w-full items-center justify-center gap-2
                    rounded
                    border border-[#5952FF]
                    px-4 py-2.5
                    text-sm font-medium text-[#5952FF]
                    transition
                    hover:bg-[#5952FF]/10
                "
            >
                View More
                <ArrowRight className="h-4 w-4" />
            </button>
        </section>
    );
}

function InfoRow({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex items-center justify-between gap-4">
            <span className="text-sm text-white/50">
                {label}
            </span>
            <span className="text-sm font-medium text-white">
                {value}
            </span>
        </div>
    );
}
