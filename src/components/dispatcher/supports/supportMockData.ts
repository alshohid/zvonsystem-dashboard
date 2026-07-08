import type { ContactSupportForm, SupportFaq, SupportResponse } from "./supportTypes";

export const dispatcherSupportFaqs: SupportFaq[] = [
    {
        id: "login-data",
        question: "Why can't I see my app or data after logging in?",
        answer:
            "Refresh your dashboard first, then confirm that you are using the dispatcher account linked to your workspace.",
    },
    {
        id: "driver-notification",
        question: "How do I set up notifications for my drivers?",
        answer:
            "Open Settings, choose notification preferences, and enable the dispatcher alerts you want drivers to receive.",
    },
    {
        id: "rate-parser",
        question: "The AI rate confirmation parser isn't working. What should I do?",
        answer:
            "Upload a clear JPG, PNG, or PDF and make sure the rate confirmation file is not password protected.",
    },
    {
        id: "branding",
        question: "How do I customize my app's branding?",
        answer:
            "Go to Settings and update your company logo, profile details, and brand information from the workspace section.",
    },
    {
        id: "assign-equipment",
        question: "How do I assign trucks and trailers to drivers?",
        answer:
            "Use the carrier workflow to select an active driver, then assign available trucks and trailers from the dropdown fields.",
    },
];

export const dispatcherSupportResponses: SupportResponse[] = [
    {
        id: "response-001",
        from: "Robinson",
        role: "Admin",
        subject: "System error",
        sentAt: "12 February, 2026",
        message:
            "Images can take a few seconds to upload. Make sure your file is under 2MB for logos and 10MB for other documents. Supported formats: JPG, PNG, PDF. Images can take a few seconds to upload. Make sure your file is under 2MB for logos and 10MB for other documents. Supported formats: JPG, PNG, PDF.",
    },
];

export const emptyContactSupportForm: ContactSupportForm = {
    name: "",
    email: "",
    subject: "",
    message: "",
};
