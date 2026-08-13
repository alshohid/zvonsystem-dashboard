"use client";

import NextTopLoader from "nextjs-toploader";

const TopLoader = () => {
    return (
        <NextTopLoader
            color="#4cfc0f"
            height={4}
            showSpinner={false}
            crawl={true}
            speed={200}
        />
    );
};

export default TopLoader;