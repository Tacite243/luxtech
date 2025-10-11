import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Geist_Mono } from "next/font/google";
import "./globals.css";
import StoreProvider from '@/redux/StoreProvider';
import { ToasterProvider } from '@/components/ToasterProvider';



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// MÉTADONNÉES OPTIMISÉES
export const metadata: Metadata = {
  // Titre dynamique pour un meilleur SEO
  title: {
    default: "LuxTech Services | Construction, Électricité & Design Intérieur",
    template: `%s | LuxTech Services`,
  },
  // Description plus riche en mots-clés
  description: "Votre expert en construction moderne, installation électrique, domotique, et design intérieur. Nous transformons vos espaces pour un confort et une sécurité optimaux.",
  keywords: ["construction", "électricité", "domotique", "design intérieur", "éclairage LED", "sécurité", "dépannage", "rénovation"],

  // Métadonnées pour le partage sur les réseaux sociaux (Open Graph)
  openGraph: {
    title: "LuxTech Services | Solutions Complètes pour l'Habitat",
    description: "De la construction à la domotique, nous simplifions votre vie avec des services fiables, innovants et esthétiques.",
    url: "https://www.luxtechservices.com", // Mettez votre URL finale ici
    siteName: "LuxTech Services",
    // Ajoutez une image qui représentera votre site lors du partage
    // Par exemple : 'https://www.luxtechservices.com/og-image.png'
    images: [
      {
        url: '/og-image.png', // Créez ce fichier dans votre dossier /public
        width: 1200,
        height: 630,
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },

  // Pour les robots d'indexation
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <StoreProvider>
          <ToasterProvider />
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}