import GetAQuote from "@/components/GetAQuote";
import HeroSection from "@/components/HeroCarousel";
import ProjectsSection from "@/components/ProjectsSection";
import ServicesSection from "@/components/ServicesSection";
import TestimonialsSection from "@/components/TestimonialsSection";


export default function HomePage() {
    return (
        <>
            <HeroSection />
            <GetAQuote />
            <ServicesSection />
            <ProjectsSection />
            <TestimonialsSection />
        </>
    );
}