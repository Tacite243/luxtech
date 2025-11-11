"use client";

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/redux/hooks';
import { fetchUser } from '@/redux/features/authSlice';
import { Loader2 } from 'lucide-react';



export default function RedirectingPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const dispatch = useAppDispatch();

    useEffect(() => {
        // Attendre que la session soit chargée
        if (status === 'loading') return;

        // Si la session est authentifiée (après une connexion Google/Apple)
        if (status === 'authenticated') {
            const redirectUser = async () => {
                // Récupérer les détails de l'utilisateur depuis notre backend
                const user = await dispatch(fetchUser()).unwrap();

                if (user) {
                    if (user.role === 'ADMIN' || user.role === 'SUPERADMIN') {
                        router.replace('/dashboard');
                    } else {
                        router.replace('/store');
                    }
                } else {
                    // Cas d'erreur, rediriger vers la page de connexion
                    router.replace('/login');
                }
            };
            redirectUser();
        }

        // Si l'utilisateur n'est pas authentifié pour une raison quelconque
        if (status === 'unauthenticated') {
            router.replace('/login');
        }

    }, [status, dispatch, router]);

    return (
        // Afficher un loader pendant que la redirection se fait
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
            <Loader2 className="w-12 h-12 text-[#FBBF24] animate-spin" />
            <p className="mt-4 text-lg text-gray-700">Redirection en cours...</p>
        </div>
    );
}