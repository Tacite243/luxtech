import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ScrollToTopButton from "@/components/ScrollToTopButton";


export default function PublicLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen flex flex-col bg-primary text-accent">
            <Navbar />
            <main>
                {children}
            </main>
            <Footer />
            <ScrollToTopButton />
        </div>
    );
}