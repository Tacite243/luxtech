// import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import HearoInterrior from "@/components/heroInterior";
import ProjectDetailsContent from "@/components/ProjectDetailsContent";
import { detailedProjectsData } from "@/lib/project-data";

interface ProjectDetailsPageProps {
  params: Promise<{ id: string }>;
}

// 1. On autorise Next.js à essayer de générer des pages même si elles ne sont pas pré-générées
export const dynamicParams = true;

export async function generateStaticParams() {
  // Option A : Utiliser les données locales pour être sûr que le build passe
  // même si la base de données est vide.
  return detailedProjectsData.map((project) => ({
    id: project.id.toString(),
  }));

  /* 
  // Option B : Si vous voulez vraiment utiliser la DB, gardez le try/catch 
  // mais retournez un tableau vide pour ne pas bloquer le build.
  try {
    const products = await prisma.product.findMany({ select: { id: true } });
    return products.map((product) => ({ id: product.id.toString() }));
  } catch (error) {
    return []; 
  }
  */
}

function getProjectById(id: number) {
  return detailedProjectsData.find((project) => project.id === id);
}

export default async function ProjectDetailsPage({
  params,
}: ProjectDetailsPageProps) {
  const resolvedParams = await params;
  const projectId = parseInt(resolvedParams.id, 10);

  const project = getProjectById(projectId);

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
          { name: project.title },
        ]}
      />
      <ProjectDetailsContent project={project} />
    </>
  );
}
