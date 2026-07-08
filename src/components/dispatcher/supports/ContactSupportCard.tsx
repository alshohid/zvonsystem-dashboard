import type { FormEvent } from "react";
import SupportInput from "./SupportInput";
import type { ContactSupportForm } from "./supportTypes";

type ContactSupportCardProps = {
    form: ContactSupportForm;
    onChange: (form: ContactSupportForm) => void;
    onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export default function ContactSupportCard({
    form,
    onChange,
    onSubmit,
}: ContactSupportCardProps) {
    const updateField = (field: keyof ContactSupportForm, value: string) => {
        onChange({ ...form, [field]: value });
    };

    return (
        <section className="rounded-lg border border-[#E4E7EC] bg-white p-3 sm:p-5">
            <h2 className="text-base font-semibold leading-6 text-[#101828]">Contact Support</h2>

            <form onSubmit={onSubmit} className="mt-3 space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <SupportInput
                        id="support-name"
                        label="Name"
                        value={form.name}
                        placeholder="Your Name"
                        required
                        onChange={(value) => updateField("name", value)}
                    />
                    <SupportInput
                        id="support-email"
                        label="Email"
                        value={form.email}
                        placeholder="Add Email"
                        type="email"
                        required
                        onChange={(value) => updateField("email", value)}
                    />
                </div>

                <SupportInput
                    id="support-subject"
                    label="Subject"
                    value={form.subject}
                    placeholder="Add Subject"
                    required
                    onChange={(value) => updateField("subject", value)}
                />

                <div>
                    <label htmlFor="support-message" className="text-sm font-semibold leading-5 text-[#101828]">
                        Message to Admin
                    </label>
                    <textarea
                        id="support-message"
                        value={form.message}
                        onChange={(event) => updateField("message", event.target.value)}
                        placeholder="Ask question, report an issue to solve."
                        rows={5}
                        required
                        className="mt-1 min-h-[112px] w-full resize-none rounded-md border border-[#E4E7EC] bg-[#F8F9FB] px-3 py-2 text-sm leading-5 text-[#101828] outline-none placeholder:text-[#98A2B3] focus:border-[#2E3A83] focus:bg-white focus:ring-2 focus:ring-[#2E3A83]/10"
                    />
                </div>

                <button
                    type="submit"
                    className="inline-flex h-10 w-full min-w-[135px] items-center justify-center rounded-lg bg-[#2E3A83] px-5 text-sm font-semibold text-white transition hover:bg-[#25306F] focus:outline-none focus:ring-2 focus:ring-[#2E3A83]/25 sm:w-auto"
                >
                    Send Message
                </button>
            </form>
        </section>
    );
}
