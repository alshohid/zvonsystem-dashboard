import { UserInformationItem } from "../documentTypes";

type OnboardingUserInformationProps = {
    items: UserInformationItem[];
};

function UserInfoField({ label, value }: UserInformationItem) {
    return (
        <div className="border-b border-[#EEF0F5] pb-2">
            <p className="text-sm font-medium text-[#101828]">{label}</p>
            <p className="mt-1 text-xs text-[#667085]">{value}</p>
        </div>
    );
}

export default function OnboardingUserInformation({
    items,
}: OnboardingUserInformationProps) {
    return (
        <section className="rounded-xl border border-[#E4E7EC] bg-white p-4">
            <h3 className="text-base font-semibold text-[#101828]">User Information</h3>

            <div className="mt-4 grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
                {items.map((item) => (
                    <UserInfoField key={item.label} {...item} />
                ))}
            </div>
        </section>
    );
}
