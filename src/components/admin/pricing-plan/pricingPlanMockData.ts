import type {
    BillingDay,
    BillingFrequencyOption,
    FreeTrialPeriod,
    PricingBillingSettings,
    PricingPlanFeatureOption,
    PricingPlanRecord,
} from "./pricingPlanTypes";

export const billingFrequencyOptions: BillingFrequencyOption[] = [
    {
        value: "weekly",
        label: "Weekly",
        description: "Every 7 days",
    },
    {
        value: "bi-weekly",
        label: "Bi- Weekly",
        description: "Every 14 days",
    },
    {
        value: "monthly",
        label: "Monthly",
        description: "Every 30 days",
    },
];

export const billingDayOptions: BillingDay[] = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
];

export const freeTrialOptions: FreeTrialPeriod[] = [
    "7 Days",
    "14 Days",
    "30 Days",
];

export const defaultBillingFeatureLabels = [
    "Driver Recruiting",
    "Permits & IFTA Filing",
    "Permits & IFTA Filing",
    "Permits & IFTA Filing",
    "Financial Metrics",
];

export const defaultPricingBillingSettings: PricingBillingSettings = {
    frequency: "weekly",
    dispatchFeePercentage: "",
    billingDay: "Monday",
    freeTrial: "14 Days",
};

export const pricingPlanFeatureOptions: PricingPlanFeatureOption[] = [
    {
        id: "load-dispatching",
        label: "Load Dispatching",
        description: "Full load management and dispatching services",
    },
    {
        id: "dedicated-dispatcher",
        label: "Dedicated Dispatcher",
        description: "Personal dispatcher assignment",
    },
    {
        id: "load-board-access",
        label: "Load Board Access",
        description: "Access to premium load boards",
    },
    {
        id: "document-tracking",
        label: "Document Tracking",
        description: "Track insurance, permits, and driver documents",
    },
    {
        id: "document-upload",
        label: "Document Upload",
        description: "Upload and store compliance documents",
    },
    {
        id: "driver-qualification-files",
        label: "Driver Qualification Files",
        description: "Full DQF management (CDL, Medical, MVR, Drug Tests)",
    },
    {
        id: "hos-violation-tracking",
        label: "HOS Violation Tracking",
        description: "Track and monitor hours of service violations",
    },
    {
        id: "vehicle-maintenance",
        label: "Vehicle Maintenance",
        description: "Maintenance scheduling and tracking",
    },
    {
        id: "dvir-tracking",
        label: "DVIR Tracking",
        description: "Driver vehicle inspection reports",
    },
    {
        id: "csa-score-monitoring",
        label: "CSA Score Monitoring",
        description: "Track CSA BASIC scores and percentiles",
    },
    {
        id: "permit-renewals",
        label: "Permit Renewals",
        description: "Track UCR, BOC-3, IRP, IFTA, HVUT renewals",
    },
    {
        id: "safety-meeting-tracking",
        label: "Safety Meeting Tracking",
        description: "Schedule and track safety training meetings",
    },
    {
        id: "email-notifications",
        label: "Email Notifications",
        description: "Email alerts for expirations and violations",
    },
    {
        id: "audit-reports",
        label: "Audit Reports",
        description: "Comprehensive compliance audit and scoring",
    },
    {
        id: "billing-invoicing",
        label: "Billing & Invoicing",
        description: "Automated billing and invoice generation",
    },
    {
        id: "statements-invoicing",
        label: "Statements & Invoicing",
        description: "Professional invoicing and statements",
    },
    {
        id: "factoring-services",
        label: "Factoring Services",
        description: "Invoice factoring and quick pay",
    },
    {
        id: "financial-metrics",
        label: "Financial Metrics",
        description: "Revenue tracking, profit analysis, and financial reports",
    },
    {
        id: "financial-metrics-reports",
        label: "Financial Metrics & Reports",
        description: "Access to financial dashboards, revenue analytics, and performance reports",
    },
    {
        id: "dispatch-support-24-7",
        label: "24/7 Dispatch Support",
        description: "Round-the-clock dispatcher assistance and load support",
    },
    {
        id: "admin-support",
        label: "Admin Support",
        description: "Back-office admin dispatch and customer support",
    },
    {
        id: "roadside-assistance-24-7",
        label: "24/7 Roadside Assistance",
        description: "Roadside and truck mechanical support",
    },
    {
        id: "fuel-card-program",
        label: "Fuel Card Program",
        description: "Discounted fuel card access",
    },
    {
        id: "eld-integration",
        label: "ELD Integration",
        description: "Electronic logging device sync",
    },
    {
        id: "insurance-filing",
        label: "Insurance Filing",
        description: "Help with insurance paperwork",
    },
    {
        id: "permits-ifta-filing",
        label: "Permits & IFTA Filing",
        description: "Permit and IFTA filing assistance",
    },
    {
        id: "driver-recruiting",
        label: "Driver Recruiting",
        description: "Help finding and vetting drivers",
    },
];

const basicPlanFeatureIds = [
    "load-dispatching",
    "dedicated-dispatcher",
    "load-board-access",
    "document-tracking",
    "document-upload",
];

const basicPlanFeatures = pricingPlanFeatureOptions
    .filter((feature) => basicPlanFeatureIds.includes(feature.id))
    .map((feature) => feature.label);

export const carrierPricingPlans: PricingPlanRecord[] = [
    {
        id: "basic-plan-1",
        name: "Basic Plan",
        status: "active",
        description: "Great for everyday usage and long term benefits",
        dispatchFeePercentage: "10",
        billingDay: "Monday",
        billingCycle: "weekly",
        freeTrialEnabled: true,
        trialDuration: "14 Days",
        featureIds: basicPlanFeatureIds,
        features: basicPlanFeatures,
    },
    {
        id: "basic-plan-2",
        name: "Basic Plan",
        status: "active",
        description: "Great for everyday usage and long term benefits",
        dispatchFeePercentage: "10",
        billingDay: "Monday",
        billingCycle: "weekly",
        freeTrialEnabled: true,
        trialDuration: "14 Days",
        featureIds: basicPlanFeatureIds,
        features: basicPlanFeatures,
    },
    {
        id: "basic-plan-3",
        name: "Basic Plan",
        status: "active",
        description: "Great for everyday usage and long term benefits",
        dispatchFeePercentage: "10",
        billingDay: "Monday",
        billingCycle: "weekly",
        freeTrialEnabled: true,
        trialDuration: "14 Days",
        featureIds: basicPlanFeatureIds,
        features: basicPlanFeatures,
    },
];
