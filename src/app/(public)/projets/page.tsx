import HearoInterrior from "@/components/heroInterior";
import ProjectsSection from "@/components/ProjectsSection";

export default function ProjectsPage() {
    return (
        <>
            {/* Use the PageHeader for the main banner */}
            <HearoInterrior
                title="Nos Projets"
                breadcrumbs={[
                    { name: "Accueil", href: "/" },
                    { name: "Projets" }
                ]}
            />

            {/* Use the ProjectsSection, but hide its default title */}
            <ProjectsSection showTitle={false} />
        </>
    );
}