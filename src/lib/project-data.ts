

// Définition du type pour un projet, réutilisable dans nos composants
export type Project = {
    id: number;
    title: string;
    category: string;
    mainImage: string;
    galleryImages: string[];
    client: string;
    projectDate: string;
    projectUrl: string;
    description: string;
    testimonial: {
        quote: string;
        author: string;
        role: string;
    } | null;
};

// DONNÉES COMPLÈTES POUR TOUS LES PROJETS
export const detailedProjectsData: Project[] = [
    {
        id: 1,
        title: 'Résidence Moderne',
        category: 'Construction',
        mainImage: '/img/projects/construction-1.jpg',
        galleryImages: ['/img/projects/construction-1.jpg', '/img/projects/design-1.jpg', '/img/projects/remodeling-1.jpg'],
        client: 'Famille Dupont',
        projectDate: '15 Mars, 2024',
        projectUrl: '#',
        description: "<p>Construction d'une résidence moderne alliant design épuré et matériaux durables. Ce projet clé en main a été géré de la conception à la livraison, en mettant l'accent sur l'efficacité énergétique et l'intégration paysagère.</p>",
        testimonial: {
            quote: "Le professionnalisme de LuxTech a rendu notre projet de construction simple et agréable. Le résultat final a dépassé toutes nos attentes.",
            author: "M. Dupont",
            role: "Client"
        }
    },
    {
        id: 2,
        title: 'Rénovation de Cuisine',
        category: 'Rénovation',
        mainImage: '/img/projects/remodeling-1.jpg',
        galleryImages: ['/img/projects/remodeling-1.jpg', '/img/projects/remodeling-2.jpg'],
        client: 'Mme. Martin',
        projectDate: '22 Janvier, 2024',
        projectUrl: '#',
        description: "<p>Transformation complète d'une cuisine pour créer un espace plus fonctionnel, moderne et convivial. Le projet incluait la refonte de la plomberie, de l'électricité, et l'installation de mobilier sur mesure.</p>",
        testimonial: null
    },
    {
        id: 3,
        title: 'Système Électrique Commercial',
        category: 'Électricité',
        mainImage: '/img/projects/repairs-1.jpg',
        galleryImages: ['/img/projects/repairs-1.jpg', '/img/projects/repairs-2.jpg'],
        client: 'Espace Commercial Central',
        projectDate: '10 Février, 2024',
        projectUrl: '#',
        description: "<p>Mise en place d'un réseau électrique complet pour un nouveau bâtiment commercial, incluant l'éclairage, les systèmes de sécurité et la distribution de puissance, le tout en conformité avec les normes les plus strictes.</p>",
        testimonial: null
    },
    {
        id: 4,
        title: 'Design Intérieur Loft',
        category: 'Design',
        mainImage: '/img/projects/design-1.jpg',
        galleryImages: ['/img/projects/design-1.jpg', '/img/projects/design-2.jpg', '/img/projects/design-3.jpg'],
        client: 'Agence Créative',
        projectDate: '05 Décembre, 2023',
        projectUrl: '#',
        description: "<p>Aménagement d'un loft pour un espace de travail collaboratif. L'objectif était de maximiser la lumière naturelle et de créer des zones distinctes tout en conservant un esprit ouvert et industriel.</p>",
        testimonial: {
            quote: "LuxTech a parfaitement capturé l'esprit de notre marque dans le design de nos bureaux. Un espace de travail inspirant !",
            author: "La Directrice Artistique",
            role: "Client"
        }
    },
    {
        id: 5,
        title: 'Extension de Maison',
        category: 'Construction',
        mainImage: '/img/projects/construction-2.jpg',
        galleryImages: ['/img/projects/construction-2.jpg', '/img/projects/remodeling-3.jpg'],
        client: 'Famille Bernard',
        projectDate: '18 Novembre, 2023',
        projectUrl: '#',
        description: "<p>Agrandissement d'une maison existante pour ajouter un étage et une terrasse. Le défi était d'intégrer la nouvelle structure de manière harmonieuse avec l'architecture d'origine.</p>",
        testimonial: null
    },
    {
        id: 6,
        title: 'Mise aux Normes Électriques',
        category: 'Électricité',
        mainImage: '/img/projects/repairs-2.jpg',
        galleryImages: ['/img/projects/repairs-2.jpg', '/img/projects/repairs-3.jpg'],
        client: 'Syndic de Copropriété',
        projectDate: '30 Octobre, 2023',
        projectUrl: '#',
        description: "<p>Projet de rénovation électrique complet pour un immeuble résidentiel, garantissant la sécurité des habitants et la conformité avec les réglementations actuelles.</p>",
        testimonial: null
    },
    {
        id: 7,
        title: 'Aménagement de Bureau',
        category: 'Design',
        mainImage: '/img/projects/design-2.jpg',
        galleryImages: ['/img/projects/design-2.jpg', '/img/projects/design-1.jpg'],
        client: 'Startup Tech',
        projectDate: '11 Septembre, 2023',
        projectUrl: '#',
        description: "<p>Création d'un environnement de travail dynamique et modulable pour une startup en pleine croissance, avec des espaces de détente et des salles de réunion high-tech.</p>",
        testimonial: null
    },
    {
        id: 8,
        title: 'Réfection de Salle de Bain',
        category: 'Rénovation',
        mainImage: '/img/projects/remodeling-2.jpg',
        galleryImages: ['/img/projects/remodeling-2.jpg', '/img/projects/remodeling-3.jpg'],
        client: 'M. et Mme. Leroy',
        projectDate: '25 Août, 2023',
        projectUrl: '#',
        description: "<p>Modernisation d'une salle de bain avec installation d'une douche à l'italienne, pose de carrelage et optimisation de l'éclairage pour une ambiance relaxante.</p>",
        testimonial: {
            quote: "Notre nouvelle salle de bain est magnifique. Un travail impeccable et des finitions parfaites.",
            author: "Mme. Leroy",
            role: "Client"
        }
    },
    {
        id: 9,
        title: 'Fondations & Gros Œuvre',
        category: 'Construction',
        mainImage: '/img/projects/construction-3.jpg',
        galleryImages: ['/img/projects/construction-3.jpg', '/img/projects/construction-1.jpg'],
        client: 'Immobilier Horizon',
        projectDate: '14 Juillet, 2023',
        projectUrl: '#',
        description: "<p>Réalisation des fondations et de la structure porteuse pour un futur complexe résidentiel, une étape cruciale assurant la stabilité et la pérennité de l'ouvrage.</p>",
        testimonial: null
    },
];