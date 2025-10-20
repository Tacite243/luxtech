"use client";

import { useSession } from "next-auth/react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchUser, clearUser } from "@/redux/features/authSlice";
import { useEffect } from "react";



// Ce composant n'affiche rien. Son seul rôle est de synchroniser les états.
export default function AuthManager() {
    const { status } = useSession();
    const dispatch = useAppDispatch();
    const reduxUser = useAppSelector(state => state.auth.user);

    useEffect(() => {
        // Si la session NextAuth est authentifiée MAIS que notre store Redux est vide,
        // on récupère les infos de l'utilisateur.
        if (status === "authenticated" && !reduxUser) {
            dispatch(fetchUser());
        }

        // Si la session NextAuth n'est plus authentifiée et qu'il y a encore un utilisateur dans Redux,
        // on nettoie le store Redux.
        if (status === "unauthenticated" && reduxUser) {
            dispatch(clearUser());
        }
    }, [status, reduxUser, dispatch]);

    // Ce composant ne rend aucun JSX visible.
    return null;
}
