"use client";

import { LogOut } from "lucide-react";
import { Modal } from "@/src/components/ui/modal";
import type { PricingPlanRecord } from "./pricingPlanTypes";

type DeletePricingPlanModalProps = {
    isOpen: boolean;
    plan: PricingPlanRecord | null;
    onClose: () => void;
    onConfirm: (plan: PricingPlanRecord) => void;
};

export default function DeletePricingPlanModal({
    isOpen,
    plan,
    onClose,
    onConfirm,
}: DeletePricingPlanModalProps) {
    const handleConfirm = () => {
        if (!plan) {
            return;
        }

        onConfirm(plan);
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            className="mx-4 w-full max-w-[380px] rounded-lg border border-[#E4E7EC] bg-white p-6 shadow-[0_24px_80px_rgba(16,24,40,0.24)]"
            contentBgClassName="bg-white"
            textClassName="text-[#161721]"
            overlayClassName="bg-[rgba(16,24,40,0.28)] backdrop-blur-[4px]"
            showCloseButton={false}
        >
            <div className="text-center">
                <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-lg bg-[#F04457] text-white">
                    <LogOut className="h-5 w-5" />
                </span>

                <h2 className="mt-4 text-xl font-semibold leading-7 text-[#161721]">
                    Delete Pricing Plan?
                </h2>
                <p className="mt-2 text-sm leading-5 text-[#8A92A6]">
                    Are you sure you want to delete this Pricing Plan?
                </p>

                <div className="mt-6 grid grid-cols-2 gap-3">
                    <button
                        type="button"
                        onClick={onClose}
                        className="inline-flex h-11 items-center justify-center rounded-lg border border-[#E4E7EC] bg-white px-5 text-sm font-semibold text-[#161721] transition hover:bg-[#F8FAFC]"
                    >
                        Cancel
                    </button>

                    <button
                        type="button"
                        onClick={handleConfirm}
                        className="inline-flex h-11 items-center justify-center rounded-lg bg-[#F04457] px-5 text-sm font-semibold text-white transition hover:bg-[#D92D3D]"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </Modal>
    );
}
