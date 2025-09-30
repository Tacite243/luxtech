"use client";

import { motion, Variants } from 'framer-motion';
import Image from 'next/image';
import { Twitter, Facebook, Instagram, Linkedin } from 'lucide-react';

// --- Données de l'Équipe ---
// --- Données de l'Équipe (avec descriptions optimisées) ---
const teamData = [
    {
        name: "Paulin AS NGOBOBO",
        role: "Directeur Exécutif",
        imageUrl: "/img/team/paulin.jpg",
        bio: "Pilote la vision de l'entreprise avec une passion pour l'innovation et un engagement total envers la satisfaction client.",
        socials: [
            { name: 'Twitter', icon: Twitter, href: '#' },
            { name: 'Facebook', icon: Facebook, href: '#' },
            { name: 'Instagram', icon: Instagram, href: '#' },
            { name: 'Linkedin', icon: Linkedin, href: '#' },
        ]
    },
    {
        name: "Urbain Teganyi",
        role: "Directeur Chargé des Programmes",
        imageUrl: "/img/team/urbain.jpg",
        bio: "Orchestre la mise en œuvre de nos projets, garantissant la coordination des équipes et le respect des plus hauts standards de qualité.",
        socials: [
            { name: 'Twitter', icon: Twitter, href: '#' },
            { name: 'Facebook', icon: Facebook, href: '#' },
            { name: 'Instagram', icon: Instagram, href: '#' },
            { name: 'Linkedin', icon: Linkedin, href: '#' },
        ]
    },
    {
        name: "Jimmy MILINGANYO",
        role: "Ingénieur Civil",
        imageUrl: "/img/team/jimmy.jpg",
        bio: "Responsable de la conception et de la supervision structurelle, il assure la solidité et la durabilité de chaque construction.",
        socials: [
            { name: 'Twitter', icon: Twitter, href: '#' },
            { name: 'Linkedin', icon: Linkedin, href: '#' },
        ]
    },
    {
        name: "Pascal MUNYI",
        role: "Ajusteur",
        imageUrl: "/img/team/pascal.jpg",
        bio: "Artisan de la précision, il garantit l'ajustement parfait des installations et des finitions, apportant la touche finale à nos projets.",
        socials: [
            { name: 'Twitter', icon: Twitter, href: '#' },
            { name: 'Linkedin', icon: Linkedin, href: '#' },
        ]
    },
    {
        name: "Francisca SANGANYI",
        role: "Architecte",
        imageUrl: "",
        bio: "Transforme la vision de nos clients en plans innovants, en créant des espaces qui allient esthétique audacieuse et fonctionnalité.",
        socials: [
            { name: 'Twitter', icon: Twitter, href: '#' },
            { name: 'Linkedin', icon: Linkedin, href: '#' },
        ]
    },
    {
        name: "Beni FUNDI",
        role: "Ingénieur Électricien",
        imageUrl: "",
        bio: "Conçoit et supervise nos installations électriques, en intégrant les dernières innovations pour garantir sécurité et performance.",
        socials: [
            { name: 'Twitter', icon: Twitter, href: '#' },
            { name: 'Linkedin', icon: Linkedin, href: '#' },
        ]
    },
    {
        name: "Oumaryandro Bin Mateene",
        role: "Designer & Peintre",
        imageUrl: "",
        bio: "Notre expert des couleurs et textures. Il crée des ambiances uniques et assure des finitions de peinture impeccables.",
        socials: [
            { name: 'Twitter', icon: Twitter, href: '#' },
            { name: 'Linkedin', icon: Linkedin, href: '#' },
        ]
    },
    {
        name: "Jackson",
        role: "Plombier",
        imageUrl: "",
        bio: "Assure la fiabilité et l'efficacité de toutes les installations sanitaires, des canalisations à l'équipement final.",
        socials: [
            { name: 'Twitter', icon: Twitter, href: '#' },
            { name: 'Linkedin', icon: Linkedin, href: '#' },
        ]
    },
    {
        name: "Samuel",
        role: "Carreleur",
        imageUrl: "",
        bio: "Maître de la pose précise, il transforme sols et murs avec des revêtements impeccables pour une finition esthétique et durable.",
        socials: [
            { name: 'Twitter', icon: Twitter, href: '#' },
            { name: 'Linkedin', icon: Linkedin, href: '#' },
        ]
    },
];

// --- Variantes d'Animation ---
const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
};

export default function TeamSection() {
    return (
        <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
            className="bg-[#FFFFFF] py-16 md:py-24"
        >
            <div className="container mx-auto px-6">
                <motion.div variants={fadeInUp} className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-[#000000]">Notre Équipe</h2>
                    <div className="w-20 h-1 bg-[#FFC107] my-4 mx-auto" />
                    <p className="text-lg text-[#6b7280]">
                        Une équipe d&apos;experts passionnés et dévoués, prêts à transformer vos projets en réalité avec savoir-faire et professionnalisme.
                    </p>
                </motion.div>

                <motion.div
                    variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-8"
                >
                    {teamData.map((member, index) => (
                        <motion.div key={index} variants={fadeInUp} className="text-center">

                            {/* CHANGEMENT 1: Conteneur d'image robuste */}
                            <div className="relative w-48 h-48 mx-auto mb-6 group">
                                <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-gray-100 shadow-md">
                                    {/* CHANGEMENT 2: Utilisation de la prop 'fill' pour un ajustement parfait */}
                                    <Image
                                        // CHANGEMENT 3: Logique de l'image par défaut
                                        src={member.imageUrl || "/img/team/default-avatar.png"}
                                        alt={`Photo de ${member.name}`}
                                        fill
                                        style={{ objectFit: 'cover' }}
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    />
                                </div>
                                {/* Overlay des réseaux sociaux */}
                                <div className="absolute inset-0 bg-[#000000]/60 rounded-full flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    {member.socials.map(social => (
                                        <a key={social.name} href={social.href} className="text-[#FFFFFF] hover:text-[#FF0000] transition-colors">
                                            <social.icon size={20} />
                                        </a>
                                    ))}
                                </div>
                            </div>

                            <div className="member-info">
                                <h4 className="text-xl font-bold text-[#000000]">{member.name}</h4>
                                <span className="block text-sm text-gray-500 italic">{member.role}</span>
                                <p className="mt-2 text-gray-600 text-sm">
                                    {member.bio}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </motion.section>
    );
}