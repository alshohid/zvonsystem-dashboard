import Link from "next/link";


const FooterLegal = () => {
    return (
        <footer className="absolute bottom-0">
            <p className="text-sm text-center text-[#A0AEC0] leading-[140%] tracking-[0.07px] p-4">
                &copy; {new Date().getFullYear()} johnryan. All rights reserved.
                <Link href="/" className="text-[#5952FF] hover:underline">
                    Terms &amp; Conditions
                </Link>{" "}
                <Link href="/" className="text-[#5952FF] hover:underline">
                    Privacy Policy
                </Link>
            </p>
        </footer>
    );
};

export default FooterLegal;