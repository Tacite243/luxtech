import HeroWrapper from "@/components/HeroWrapper";
import dynamic from "next/dynamic";

const GetAQuaote = dynamic(() => import("@/components/DynamicQuoteSection"));
const ServicesSection = dynamic(() => import("@/components/ServicesSection"));
const ProjectsSection = dynamic(() => import("@/components/ProjectsSection"));
const TestimonialsSection = dynamic(
  () => import("@/components/TestimonialsSection"),
);

export default function HomePage() {
  return (
    <>
      <HeroWrapper />

      <GetAQuaote />
      <ServicesSection />
      <ProjectsSection />
      <TestimonialsSection />
    </>
  );
}
