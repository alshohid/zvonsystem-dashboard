export type SupportFaq = {
    id: string;
    question: string;
    answer: string;
};

export type SupportResponse = {
    id: string;
    from: string;
    role: string;
    subject: string;
    sentAt: string;
    message: string;
};

export type ContactSupportForm = {
    name: string;
    email: string;
    subject: string;
    message: string;
};
