import { HardHat, Zap, Paintbrush, BrainCircuit, Key, Wrench } from 'lucide-react';

// Define the type for a single service
export type Service = {
    id: number;
    iconName: string;
    title: string;
    shortDescription: string;
    mainImage: string;
    longDescription: string;
    features: string[];
};

// Expanded data for all services
export const detailedServicesData: Service[] = [
    {
        id: 1,
        iconName: "Zap",
        title: "Construction Moderne",
        shortDescription: "Projets de construction clés en main, respectant les normes de qualité et de sécurité les plus strictes.",
        mainImage: '/img/projects/construction-1.jpg',
        longDescription: "<p>Notre expertise en construction moderne nous permet de gérer votre projet de A à Z. De la conception des plans à la remise des clés, nous nous engageons à utiliser des matériaux durables et des techniques de construction innovantes pour créer des espaces de vie et de travail exceptionnels.</p>",
        features: [
            "Gestion de projet complète",
            "Respect rigoureux des délais et du budget",
            "Utilisation de matériaux éco-responsables",
            "Garantie de conformité aux normes en vigueur"
        ]
    },
    {
        id: 2,
        iconName: "Paintbrush",
        title: "Installations Électriques",
        shortDescription: "Installation complète, systèmes de protection, et dépannage rapide pour garantir votre sécurité.",
        mainImage: '/img/projects/design-1.jpg',
        longDescription: "<p>La sécurité et la fiabilité de vos installations électriques sont notre priorité. Nous concevons et installons des systèmes complets pour les bâtiments neufs et en rénovation, en intégrant les dernières technologies pour une gestion optimale de l'énergie.</p>",
        features: [
            "Mise en conformité des installations",
            "Installation de systèmes de sécurité (alarmes, caméras)",
            "Solutions d'éclairage LED performantes",
            "Service de dépannage rapide 24/7"
        ]
    },
    {
        id: 3,
        iconName: "Paintbrush",
        title: "Design & Agencement",
        shortDescription: "Conception d'espaces fonctionnels et esthétiques : faux plafonds, luminaires, peintures et sols.",
        mainImage: '/img/projects/design-2.jpg',
        longDescription: "<p>Notre équipe de designers transforme vos intérieurs en espaces qui allient esthétique et fonctionnalité. Nous travaillons en étroite collaboration avec vous pour créer des ambiances uniques qui reflètent votre style, que ce soit pour un projet résidentiel ou commercial.</p>",
        features: [
            "Conception 3D et plans d'aménagement",
            "Création de faux plafonds design",
            "Conseils en choix de couleurs et matériaux",
            "Installation de revêtements de sol et muraux"
        ]
    },
    {
        id: 4,
        iconName: "BrainCircuit",
        title: "Solutions Domotiques",
        shortDescription: "Intégration de solutions innovantes et économes en énergie pour un confort de vie simplifié.",
        mainImage: '/img/projects/remodeling-2.jpg',
        longDescription: "<p>Entrez dans l'ère de la maison intelligente. Nous intégrons des systèmes domotiques qui vous permettent de contrôler l'éclairage, le chauffage, la sécurité et bien plus, depuis votre smartphone. Simplifiez votre quotidien tout en réalisant des économies d'énergie.</p>",
        features: [
            "Contrôle centralisé de l'habitat",
            "Gestion intelligente de l'énergie",
            "Scénarios personnalisés (ex: départ, arrivée)",
            "Intégration avec les assistants vocaux"
        ]
    },
    {
        id: 5,
        iconName: "Key",
        title: "Projets Clés en Main",
        shortDescription: "Nous gérons tout, de l'étude à la livraison, pour un projet sans souci et une valeur ajoutée réelle.",
        mainImage: '/img/projects/repairs-1.jpg',
        longDescription: "<p>Optez pour la tranquillité d'esprit avec notre service de projets clés en main. Nous prenons en charge l'intégralité de votre projet, de la conception initiale à la coordination de tous les corps de métier, jusqu'à la livraison finale. Un seul interlocuteur pour un résultat garanti.</p>",
        features: [
            "Interlocuteur unique et dédié",
            "Planification et coordination complètes",
            "Gestion administrative et des permis",
            "Garantie d'un résultat conforme à vos attentes"
        ]
    },
    {
        id: 6,
        iconName: "Wrench",
        title: "Dépannage & Maintenance",
        shortDescription: "Un service professionnel pour la maintenance de vos installations et un dépannage efficace.",
        mainImage: '/img/projects/design-3.jpg',
        longDescription: "<p>La pérennité de vos installations est essentielle. Nous proposons des contrats de maintenance préventive pour éviter les pannes et un service de dépannage réactif pour intervenir rapidement en cas de problème électrique ou de plomberie.</p>",
        features: [
            "Intervention rapide et efficace",
            "Contrats de maintenance sur mesure",
            "Diagnostic professionnel et transparent",
            "Disponibilité pour les urgences"
        ]
    }
];