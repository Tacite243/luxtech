import AuthForm from "@/components/AuthForm";
import Image from "next/image";
import Link from "next/link";




export default function LoginPage() {
  return (
    <main className="min-h-screen w-full grid grid-cols-1 lg:grid-cols-2">
      <div className="hidden lg:block relative">
        <Image
          src="/img/projects/construction-1.jpg" // Créez une image de fond attrayante
          alt="Chantier LuxTech Services"
          fill
          className="object-cover"
        />
        {/* Superposition pour le contraste */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        {/* Logo et slogan */}
        <div className="absolute bottom-10 left-10 text-white">
          <Link href="/" className="text-3xl font-bold">
            Lux<span className="text-[#FBBF24]">Tech</span>
          </Link>
          <p className="mt-2 text-lg max-w-md text-gray-200">
            Construire l'avenir, avec précision et excellence.
          </p>
        </div>
      </div>

      {/* --- Colonne de Droite : Formulaire --- */}
      <div className="flex items-center justify-center bg-gray-50 p-4">
        <AuthForm />
      </div>
    </main>
  );
}