import type { OrganizationRecord } from "./organizationTypes";

export const ORGANIZATIONS_PAGE_SIZE = 8;

const featuredOrganizations: OrganizationRecord[] = [
    {
        id: "02",
        companyName: "Innovate Inc.",
        adminName: "Jane Smith",
        phoneNumber: "445 678 9012",
        adminEmail: "jane@innovate.com",
        businessAddress: "San Francisco, CA",
        status: "Active",
        createdAt: "2026-04-16",
    },
    {
        id: "03",
        companyName: "Design Experts",
        adminName: "Emily Johnson",
        phoneNumber: "557 890 1234",
        adminEmail: "emily@designexperts.com",
        businessAddress: "Austin, TX",
        status: "Active",
        createdAt: "2026-04-15",
    },
    {
        id: "04",
        companyName: "TechX Solutions",
        adminName: "Michael Lee",
        phoneNumber: "668 901 2345",
        adminEmail: "michael@techx.com",
        businessAddress: "Seattle, WA",
        status: "Active",
        createdAt: "2026-04-14",
    },
    {
        id: "05",
        companyName: "Creative Rise",
        adminName: "Sarah Brown",
        phoneNumber: "779 012 3456",
        adminEmail: "sarah@creativerise.com",
        businessAddress: "Boston, MA",
        status: "Active",
        createdAt: "2026-04-13",
    },
    {
        id: "06",
        companyName: "Northline Freight",
        adminName: "Maya Chen",
        phoneNumber: "331 742 8801",
        adminEmail: "maya@northline.com",
        businessAddress: "Denver, CO",
        status: "Active",
        createdAt: "2026-04-12",
    },
    {
        id: "07",
        companyName: "Harbor Lane Logistics",
        adminName: "Daniel Kim",
        phoneNumber: "447 218 0933",
        adminEmail: "daniel@harborlane.com",
        businessAddress: "Portland, OR",
        status: "Inactive",
        createdAt: "2026-04-11",
    },
    {
        id: "08",
        companyName: "Atlas Cargo Group",
        adminName: "Sophia Lee",
        phoneNumber: "559 320 1184",
        adminEmail: "sophia@atlascargo.com",
        businessAddress: "Chicago, IL",
        status: "Active",
        createdAt: "2026-04-10",
    },
    {
        id: "09",
        companyName: "Metro Dispatch Co.",
        adminName: "Owen Rivera",
        phoneNumber: "672 331 0045",
        adminEmail: "owen@metrodispatch.com",
        businessAddress: "Dallas, TX",
        status: "Active",
        createdAt: "2026-04-09",
    },
];

const generatedOrganizations: OrganizationRecord[] = Array.from({ length: 39 }, (_, index) => {
    const numericId = index + 10;
    const cityOptions = ["Phoenix, AZ", "Miami, FL", "Nashville, TN", "Columbus, OH"];
    const city = cityOptions[index % cityOptions.length];

    return {
        id: String(numericId).padStart(2, "0"),
        companyName: `Route Partner ${numericId}`,
        adminName: `Admin User ${numericId}`,
        phoneNumber: `555 010 ${String(numericId).padStart(4, "0")}`,
        adminEmail: `admin${numericId}@routepartner.com`,
        businessAddress: city,
        status: index % 9 === 0 ? "Inactive" : "Active",
        createdAt: `2026-03-${String(28 - (index % 20)).padStart(2, "0")}`,
    };
});

export const organizationsMockData: OrganizationRecord[] = [
    ...featuredOrganizations,
    ...generatedOrganizations,
];
