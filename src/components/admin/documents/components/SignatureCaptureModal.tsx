"use client";

import {
    PointerEvent as ReactPointerEvent,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import { Keyboard, PenLine, Upload } from "lucide-react";
import { Modal } from "../../../ui/modal";
import FileDropzone from "./FileDropzone";

export type SignatureMode = "draw" | "type" | "upload";

export type SignatureValue = {
    mode: SignatureMode;
    value: string;
    label: string;
};

type SignatureCaptureModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onSave: (signature: SignatureValue) => void;
};

const signatureTabs: Array<{
    key: SignatureMode;
    label: string;
    icon: typeof PenLine;
}> = [
    { key: "draw", label: "Draw", icon: PenLine },
    { key: "type", label: "Type", icon: Keyboard },
    { key: "upload", label: "Upload", icon: Upload },
];

export default function SignatureCaptureModal({
    isOpen,
    onClose,
    onSave,
}: SignatureCaptureModalProps) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const isDrawingRef = useRef(false);
    const [activeMode, setActiveMode] = useState<SignatureMode>("draw");
    const [typedSignature, setTypedSignature] = useState("");
    const [uploadedSignature, setUploadedSignature] = useState<File | null>(null);
    const [hasDrawn, setHasDrawn] = useState(false);

    const setupCanvas = useCallback(() => {
        const canvas = canvasRef.current;

        if (!canvas) {
            return;
        }

        const rect = canvas.getBoundingClientRect();
        const scale = window.devicePixelRatio || 1;
        const context = canvas.getContext("2d");

        if (!context || rect.width === 0 || rect.height === 0) {
            return;
        }

        canvas.width = rect.width * scale;
        canvas.height = rect.height * scale;
        context.scale(scale, scale);
        context.lineCap = "round";
        context.lineJoin = "round";
        context.lineWidth = 4;
        context.strokeStyle = "#202124";
    }, []);

    useEffect(() => {
        if (!isOpen) {
            return;
        }

        window.setTimeout(setupCanvas, 0);
    }, [isOpen, setupCanvas]);

    useEffect(() => {
        if (isOpen && activeMode === "draw") {
            window.setTimeout(setupCanvas, 0);
        }
    }, [activeMode, isOpen, setupCanvas]);

    const getCanvasPoint = (event: ReactPointerEvent<HTMLCanvasElement>) => {
        const canvas = canvasRef.current;

        if (!canvas) {
            return { x: 0, y: 0 };
        }

        const rect = canvas.getBoundingClientRect();

        return {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top,
        };
    };

    const handlePointerDown = (event: ReactPointerEvent<HTMLCanvasElement>) => {
        const canvas = canvasRef.current;
        const context = canvas?.getContext("2d");

        if (!canvas || !context) {
            return;
        }

        const point = getCanvasPoint(event);
        isDrawingRef.current = true;
        setHasDrawn(true);
        canvas.setPointerCapture(event.pointerId);
        context.beginPath();
        context.moveTo(point.x, point.y);
    };

    const handlePointerMove = (event: ReactPointerEvent<HTMLCanvasElement>) => {
        const context = canvasRef.current?.getContext("2d");

        if (!context || !isDrawingRef.current) {
            return;
        }

        const point = getCanvasPoint(event);
        context.lineTo(point.x, point.y);
        context.stroke();
    };

    const finishDrawing = (event: ReactPointerEvent<HTMLCanvasElement>) => {
        if (!isDrawingRef.current) {
            return;
        }

        try {
            canvasRef.current?.releasePointerCapture(event.pointerId);
        } catch {
            // Pointer may already be released by the browser.
        }

        isDrawingRef.current = false;
    };

    const clearDrawing = () => {
        const canvas = canvasRef.current;
        const context = canvas?.getContext("2d");

        if (!canvas || !context) {
            return;
        }

        context.clearRect(0, 0, canvas.width, canvas.height);
        setHasDrawn(false);
        setupCanvas();
    };

    const resetSignatureState = () => {
        setActiveMode("draw");
        setTypedSignature("");
        setUploadedSignature(null);
        setHasDrawn(false);
    };

    const handleClose = () => {
        resetSignatureState();
        onClose();
    };

    const canSave = useMemo(() => {
        if (activeMode === "draw") {
            return hasDrawn;
        }

        if (activeMode === "type") {
            return typedSignature.trim().length > 0;
        }

        return Boolean(uploadedSignature);
    }, [activeMode, hasDrawn, typedSignature, uploadedSignature]);

    const handleSave = () => {
        if (!canSave) {
            return;
        }

        if (activeMode === "draw") {
            const dataUrl = canvasRef.current?.toDataURL("image/png") ?? "";
            onSave({ mode: "draw", value: dataUrl, label: "Drawn signature" });
        }

        if (activeMode === "type") {
            const value = typedSignature.trim();
            onSave({ mode: "type", value, label: value });
        }

        if (activeMode === "upload" && uploadedSignature) {
            onSave({
                mode: "upload",
                value: uploadedSignature.name,
                label: uploadedSignature.name,
            });
        }

        resetSignatureState();
        onClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={handleClose}
            className="mx-4 my-6 max-h-[calc(100vh-2rem)] w-full max-w-[538px] overflow-y-auto rounded-xl border border-[#E4E7EC] bg-white p-6 shadow-[0_24px_80px_rgba(16,24,40,0.22)]"
            contentBgClassName="bg-white"
            textClassName="text-[#101828]"
            overlayClassName="bg-[rgba(16,24,40,0.28)] backdrop-blur-[4px]"
            showCloseButton={false}
        >
            <div className="space-y-7">
                <h2 className="text-center text-xl font-semibold text-[#101828]">
                    Sign Document
                </h2>

                <div className="grid grid-cols-3 gap-4">
                    {signatureTabs.map((tab) => {
                        const Icon = tab.icon;
                        const active = activeMode === tab.key;

                        return (
                            <button
                                key={tab.key}
                                type="button"
                                onClick={() => setActiveMode(tab.key)}
                                className={[
                                    "flex items-center justify-center gap-3 border-b pb-3 text-lg font-medium transition",
                                    active
                                        ? "border-[#2E3A83] text-[#2E3A83]"
                                        : "border-transparent text-[#555965] hover:text-[#2E3A83]",
                                ].join(" ")}
                            >
                                <Icon className="h-5 w-5" />
                                {tab.label}
                            </button>
                        );
                    })}
                </div>

                {activeMode === "draw" ? (
                    <div>
                        <div className="relative overflow-hidden rounded-xl border border-[#D8DDE8] bg-[#F5F5F5]">
                            <canvas
                                ref={canvasRef}
                                onPointerDown={handlePointerDown}
                                onPointerMove={handlePointerMove}
                                onPointerUp={finishDrawing}
                                onPointerCancel={finishDrawing}
                                onPointerLeave={finishDrawing}
                                className="block h-[210px] w-full touch-none"
                            />
                        </div>
                        <button
                            type="button"
                            onClick={clearDrawing}
                            className="mt-3 text-sm font-medium text-[#2E3A83] transition hover:text-[#25306F]"
                        >
                            Clear signature
                        </button>
                    </div>
                ) : null}

                {activeMode === "type" ? (
                    <div className="space-y-4">
                        <input
                            value={typedSignature}
                            onChange={(event) => setTypedSignature(event.target.value)}
                            placeholder="Type signature"
                            className="h-12 w-full rounded-xl border border-[#D8DDE8] bg-white px-4 text-base text-[#101828] outline-none transition placeholder:text-[#98A2B3] focus:border-[#2E3A83]"
                        />
                        <div className="flex min-h-[168px] items-center justify-center rounded-xl border border-[#D8DDE8] bg-[#F5F5F5] px-6">
                            <p className="break-words text-center font-[cursive] text-5xl text-[#202124]">
                                {typedSignature || "John Doe"}
                            </p>
                        </div>
                    </div>
                ) : null}

                {activeMode === "upload" ? (
                    <FileDropzone
                        file={uploadedSignature}
                        onFileChange={setUploadedSignature}
                        className="[&_button]:min-h-[168px]"
                    />
                ) : null}

                <button
                    type="button"
                    onClick={handleSave}
                    disabled={!canSave}
                    className="inline-flex h-[52px] w-full items-center justify-center rounded-lg bg-[#2E3A83] px-5 text-lg font-semibold text-white transition hover:bg-[#25306F] disabled:cursor-not-allowed disabled:opacity-50"
                >
                    Add Signature & Send
                </button>
            </div>
        </Modal>
    );
}
