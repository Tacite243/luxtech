import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";


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
  metadataBase: new URL(
    process.env.NEXTAUTH_URL || "https://www.luxtechservices.com"
  ),
  title: {
    default: "LuxTech Services | Construction, Électricité & Design Intérieur",
    template: `%s | LuxTech Services`,
  },
  description:
    "Votre expert en construction moderne, installation électrique, domotique, et design intérieur. Nous transformons vos espaces pour un confort et une sécurité optimaux.",
  keywords: [
    "construction",
    "électricité",
    "domotique",
    "design intérieur",
    "éclairage LED",
    "sécurité",
    "dépannage",
    "rénovation",
  ],
  openGraph: {
    title: "LuxTech Services | Solutions Complètes pour l'Habitat",
    description:
      "De la construction à la domotique, nous simplifions votre vie avec des services fiables, innovants et esthétiques.",
    url: "https://www.luxtechservices.com",
    siteName: "LuxTech Services",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
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
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}