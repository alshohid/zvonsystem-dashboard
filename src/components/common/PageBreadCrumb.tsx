import Link from "next/link";
import React from "react";

export type BreadcrumbItem = {
    label: string;
    href?: string;
};

interface BreadcrumbProps {
    pageTitle: string;
    pageDescription?: string;
    breadcrumbs?: BreadcrumbItem[];
    hideBreadCrumpOption?: boolean;
}

const PageBreadcrumb: React.FC<BreadcrumbProps> = ({
    pageTitle,
    pageDescription,
    breadcrumbs = [],
    hideBreadCrumpOption = false,
}) => {
    return (
        <div className="mb-6 flex flex-col gap-3">
            {!hideBreadCrumpOption && (
                <nav>
                    <ol className="flex items-center gap-1.5 text-sm">
                        {/* Home */}
                        {/* <li>
                            <Link
                                href="/admin/dashboard"
                                className="inline-flex items-center gap-1.5 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                            >
                                Home
                                <Chevron />
                            </Link>
                        </li> */}

                        {/* Dynamic crumbs */}
                        {breadcrumbs.map((item, index) => {
                            const isLast = index === breadcrumbs.length - 1;

                            return (
                                <li key={index} className="flex items-center gap-1.5">
                                    {item.href && !isLast ? (
                                        <>
                                            <Link
                                                href={item.href}
                                                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                                            >
                                                {item.label}
                                            </Link>
                                            <Chevron />
                                        </>
                                    ) : (
                                        <span className="text-gray-800 dark:text-white/90">
                                            {item.label}
                                        </span>
                                    )}
                                </li>
                            );
                        })}
                    </ol>
                </nav>
            )}

            <h2 className="text-[1.25rem] md:text-[1.5rem] lg:text-[2rem] font-semibold text-gray-800 dark:text-[#C1C2C5]">
                {pageTitle}
            </h2>

            {pageDescription && (
                <p className="text-sm text-gray-400">{pageDescription}</p>
            )}
        </div>
    );
};

export default PageBreadcrumb;

/* Chevron icon */
const Chevron = () => (
    <svg
        className="stroke-current"
        width="16"
        height="16"
        viewBox="0 0 17 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M6.0765 12.667L10.2432 8.50033L6.0765 4.33366"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);
