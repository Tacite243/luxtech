import { notFound } from 'next/navigation';
import HearoInterrior from '@/components/heroInterior';
import ProjectDetailsContent from '@/components/ProjectDetailsContent';
import { detailedProjectsData } from '@/lib/project-data';

// Fonction pour récupérer un projet par son ID
function getProjectById(id: number) {
    return detailedProjectsData.find(project => project.id === id);
}

export default function ProjectDetailsPage({ params }: { params: { id: string } }) {
    // Convertir l'ID de la chaîne de caractères de l'URL en nombre
    const projectId = parseInt(params.id, 10);
    const project = getProjectById(projectId);

    // Si aucun projet n'est trouvé, afficher une page 404
    if (!project) {
        notFound();
    }

    return (
        <>
            <HearoInterrior
                title="Détails du Projet"
                breadcrumbs={[
                    { name: "Accueil", href: "/" },
                    { name: "Projets", href: "/projets" },
                    { name: project.title }
                ]}
            />

            <ProjectDetailsContent project={project} />
        </>
    );
}