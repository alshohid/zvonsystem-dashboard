"use client";

import { useState } from "react";
import CarrierPricingPlanSection from "./CarrierPricingPlanSection";
import DefaultBillingSystemCard from "./DefaultBillingSystemCard";
import DeletePricingPlanModal from "./DeletePricingPlanModal";
import PricingPlanUpsertModal from "./PricingPlanUpsertModal";
import {
    carrierPricingPlans,
    defaultPricingBillingSettings,
    pricingPlanFeatureOptions,
} from "./pricingPlanMockData";
import type {
    PricingBillingSettings,
    PricingPlanFeatureOption,
    PricingPlanFormValues,
    PricingPlanRecord,
} from "./pricingPlanTypes";
import { buildPricingPlanRecord } from "./pricingPlanUtils";

type PricingPlanModalMode = "create" | "edit";

type AdminPricingPlanContainerProps = {
    initialBillingSettings?: PricingBillingSettings;
    initialPlans?: PricingPlanRecord[];
    featureOptions?: PricingPlanFeatureOption[];
    onSaveBillingSettings?: (settings: PricingBillingSettings) => void;
    onCreatePlan?: (values: PricingPlanFormValues) => void;
    onEditPlan?: (planId: string, values: PricingPlanFormValues) => void;
    onDeletePlan?: (plan: PricingPlanRecord) => void;
};

export default function AdminPricingPlanContainer({
    initialBillingSettings = defaultPricingBillingSettings,
    initialPlans = carrierPricingPlans,
    featureOptions = pricingPlanFeatureOptions,
    onSaveBillingSettings,
    onCreatePlan,
    onEditPlan,
    onDeletePlan,
}: AdminPricingPlanContainerProps) {
    const [billingSettings, setBillingSettings] = useState(initialBillingSettings);
    const [plans, setPlans] = useState(initialPlans);
    const [isUpsertModalOpen, setIsUpsertModalOpen] = useState(false);
    const [upsertModalMode, setUpsertModalMode] = useState<PricingPlanModalMode>("create");
    const [selectedPlan, setSelectedPlan] = useState<PricingPlanRecord | null>(null);
    const [deleteTargetPlan, setDeleteTargetPlan] = useState<PricingPlanRecord | null>(null);

    const openCreatePlanModal = () => {
        setSelectedPlan(null);
        setUpsertModalMode("create");
        setIsUpsertModalOpen(true);
    };

    const openEditPlanModal = (plan: PricingPlanRecord) => {
        setSelectedPlan(plan);
        setUpsertModalMode("edit");
        setIsUpsertModalOpen(true);
    };

    const closeUpsertModal = () => {
        setIsUpsertModalOpen(false);
        setSelectedPlan(null);
    };

    const openDeletePlanModal = (plan: PricingPlanRecord) => {
        setDeleteTargetPlan(plan);
    };

    const closeDeletePlanModal = () => {
        setDeleteTargetPlan(null);
    };

    const handleUpsertPlan = (
        values: PricingPlanFormValues,
        mode: PricingPlanModalMode,
    ) => {
        if (mode === "edit" && selectedPlan) {
            const updatedPlan = buildPricingPlanRecord({
                formValues: values,
                featureOptions,
                existingPlan: selectedPlan,
            });

            setPlans((currentPlans) =>
                currentPlans.map((plan) =>
                    plan.id === selectedPlan.id ? updatedPlan : plan,
                ),
            );
            onEditPlan?.(selectedPlan.id, values);
            closeUpsertModal();
            return;
        }

        const createdPlan = buildPricingPlanRecord({
            formValues: values,
            featureOptions,
        });

        setPlans((currentPlans) => [createdPlan, ...currentPlans]);
        onCreatePlan?.(values);
        closeUpsertModal();
    };

    const handleDeletePlan = (planToDelete: PricingPlanRecord) => {
        setPlans((currentPlans) =>
            currentPlans.filter((plan) => plan.id !== planToDelete.id),
        );
        onDeletePlan?.(planToDelete);
        closeDeletePlanModal();
    };

    return (
        <>
            <main className="w-full max-w-full space-y-4 overflow-x-hidden bg-white pb-8 text-[#161721]">
                <DefaultBillingSystemCard
                    settings={billingSettings}
                    onChange={setBillingSettings}
                    onSave={onSaveBillingSettings}
                />

                <CarrierPricingPlanSection
                    plans={plans}
                    onCreatePlan={openCreatePlanModal}
                    onEditPlan={openEditPlanModal}
                    onDeletePlan={openDeletePlanModal}
                />
            </main>

            {isUpsertModalOpen ? (
                <PricingPlanUpsertModal
                    key={`${upsertModalMode}-${selectedPlan?.id ?? "new"}`}
                    isOpen={isUpsertModalOpen}
                    mode={upsertModalMode}
                    plan={selectedPlan}
                    featureOptions={featureOptions}
                    onClose={closeUpsertModal}
                    onSubmit={handleUpsertPlan}
                />
            ) : null}

            <DeletePricingPlanModal
                isOpen={Boolean(deleteTargetPlan)}
                plan={deleteTargetPlan}
                onClose={closeDeletePlanModal}
                onConfirm={handleDeletePlan}
            />
        </>
    );
}
