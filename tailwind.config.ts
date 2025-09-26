import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                // Un noir moins intense pour le fond principal
                'primary': '#111827',
                // Le rouge de votre logo pour les actions importantes
                'secondary': '#FF0000',
                // Un blanc cassé pour le texte, plus doux pour les yeux
                'accent': '#F3F4F6',
                // La couleur jaune/or de l'image de référence
                'accent-yellow': '#FFC107',
            },
            fontFamily: {
                // Associe les variables CSS de vos polices à des classes Tailwind
                sans: ['var(--font-geist-sans)'],
                mono: ['var(--font-geist-mono)'],
            },
        },
    },
    plugins: [],
};
export default config;