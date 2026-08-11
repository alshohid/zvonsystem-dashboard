/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

export type PlanFormState = {
  ok: boolean;
  message?: string;
  errors?: Record<string, string>;
};

export async function upsertPlanAction(
  prevState: PlanFormState,
  formData: FormData,
): Promise<PlanFormState> {
  try {
    const mode = String(formData.get("mode") || "create"); // create | edit
    const planId = String(formData.get("planId") || "");
    const planType = String(formData.get("planType") || "monthly"); // payg | monthly
    const price = String(formData.get("price") || "");
    const billingPeriod = String(formData.get("billingPeriod") || "");
    const benefitsJson = String(formData.get("benefits") || "[]");

    let benefits: string[] = [];
    try {
      benefits = JSON.parse(benefitsJson);
    } catch {
      benefits = [];
    }

    const errors: Record<string, string> = {};
    if (!price) errors.price = "Price is required";
    if (planType === "monthly" && !billingPeriod)
      errors.billingPeriod = "Billing period is required";
    if (benefits.length === 0) errors.benefits = "Add at least one benefit";

    if (Object.keys(errors).length) return { ok: false, errors };

    // TODO: DB/API here
    // if (mode === "edit") update by planId else create

    return {
      ok: true,
      message:
        mode === "edit"
          ? "Plan updated successfully."
          : "Plan created successfully.",
    };
  } catch (e: any) {
    return { ok: false, message: e?.message || "Something went wrong" };
  }
}
