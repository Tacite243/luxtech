import GlobalLoader from "@/components/GlobalLoader";
// import { Loader2 } from "lucide-react";

// Ce composant est un Server Component !
export default function Loading() {
    // Vous pouvez créer n'importe quel squelette de chargement ici
    return (
        // <div className="fixed inset-0 bg-white flex items-center justify-center z-[10000]">
        //   <div className="flex flex-col items-center gap-4">
        //     <Loader2 className="w-16 h-16 text-[#FBBF24] animate-spin" />
        //     <p className="text-lg font-semibold text-gray-700">Chargement...</p>
        //   </div>
        // </div>
        <>
            <GlobalLoader />
        </>
    );
}