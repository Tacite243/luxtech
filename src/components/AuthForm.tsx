"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchUser, registerUser } from '@/redux/features/authSlice';
import { Loader2, LogIn, UserPlus } from 'lucide-react';
import toast from 'react-hot-toast';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { GoogleIcon, AppleIcon } from './SocialIcons'; // Assurez-vous que ce chemin est correct

// Schémas de validation Zod
const loginSchema = z.object({
    email: z.string().email("Email invalide"),
    password: z.string().min(1, "Mot de passe requis"),
});

const registerSchema = z.object({
    name: z.string().min(3, "Le nom doit faire au moins 3 caractères"),
    email: z.string().email("Email invalide"),
    password: z.string().min(6, "Le mot de passe doit faire au moins 6 caractères"),
});

// Inférence de types à partir des schémas
type LoginFormValues = z.infer<typeof loginSchema>;
type RegisterFormValues = z.infer<typeof registerSchema>;

export default function AuthForm() {
    const [isLogin, setIsLogin] = useState(true);
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { status } = useAppSelector((state) => state.auth);

    const { register: loginRegister, handleSubmit: handleLoginSubmit, formState: { errors: loginErrors } } = useForm<LoginFormValues>({ resolver: zodResolver(loginSchema) });
    const { register: registerRegister, handleSubmit: handleRegisterSubmit, reset: resetRegisterForm, formState: { errors: registerErrors } } = useForm<RegisterFormValues>({ resolver: zodResolver(registerSchema) });

    const onLogin: SubmitHandler<LoginFormValues> = async (data) => {
        const result = await signIn('credentials', {
            redirect: false,
            email: data.email,
            password: data.password,
        });

        if (result?.error) {
            toast.error(result.error);
        } else {
            toast.success('Connexion réussie !');
            await dispatch(fetchUser());
            router.push('/dashboard'); // Rediriger après la connexion
        }
    };

    const onRegister: SubmitHandler<RegisterFormValues> = async (data) => {
        await dispatch(registerUser(data)).unwrap()
            .then(() => {
                toast.success('Inscription réussie ! Veuillez vous connecter.');
                setIsLogin(true);
                resetRegisterForm(); // Vider les champs du formulaire d'inscription
            })
            .catch((err: any) => {
                toast.error(err || 'Une erreur est survenue.');
            });
    };

    const isLoading = status === 'loading';

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="w-full max-w-sm bg-white p-6 rounded-2xl shadow-lg border border-gray-200"
        >
            <div className="text-center">
                <h2 className="text-2xl font-bold text-[#111827] mb-1">
                    {isLogin ? 'Bienvenue' : 'Créer un compte'}
                </h2>
                <p className="text-sm text-gray-500 mb-6">
                    {isLogin ? 'Connectez-vous pour continuer' : 'Rejoignez LuxTech Services'}
                </p>
            </div>

            <div className="space-y-3 mb-4">
                <button
                    onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
                    className="w-full flex items-center justify-center gap-3 py-2.5 px-4 border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 transition-colors"
                >
                    <GoogleIcon />
                    <span className="font-semibold text-gray-700 text-sm">Continuer avec Google</span>
                </button>
                <button
                    onClick={() => signIn('apple', { callbackUrl: '/dashboard' })}
                    className="w-full flex items-center justify-center gap-3 py-2.5 px-4 border border-gray-800 rounded-lg shadow-sm bg-black text-white hover:bg-gray-800 transition-colors"
                >
                    <AppleIcon />
                    <span className="font-semibold text-sm">Continuer avec Apple</span>
                </button>
            </div>

            <div className="flex items-center my-6">
                <div className="flex-grow border-t border-gray-200"></div>
                <span className="flex-shrink mx-4 text-gray-400 text-xs font-medium">OU</span>
                <div className="flex-grow border-t border-gray-200"></div>
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={isLogin ? 'login' : 'register'}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                >
                    {isLogin ? (
                        <form onSubmit={handleLoginSubmit(onLogin)} className="space-y-4">
                            <div>
                                <input {...loginRegister('email')} type="email" placeholder="Email" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FBBF24] focus:border-[#FBBF24] transition" />
                                {loginErrors.email && <p className="mt-1 text-xs text-red-600">{loginErrors.email.message}</p>}
                            </div>
                            <div>
                                <input {...loginRegister('password')} type="password" placeholder="Mot de passe" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FBBF24] focus:border-[#FBBF24] transition" />
                                {loginErrors.password && <p className="mt-1 text-xs text-red-600">{loginErrors.password.message}</p>}
                            </div>
                            <motion.button type="submit" disabled={isLoading} /* ... */ >
                                {isLoading ? <Loader2 className="animate-spin" /> : <><LogIn className="mr-2" size={18} /> Se connecter</>}
                            </motion.button>
                        </form>
                    ) : (
                        <form onSubmit={handleRegisterSubmit(onRegister)} className="space-y-4">
                            <div>
                                <input {...registerRegister('name')} type="text" placeholder="Nom complet" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FBBF24] focus:border-[#FBBF24] transition" />
                                {registerErrors.name && <p className="mt-1 text-xs text-red-600">{registerErrors.name.message}</p>}
                            </div>
                            <div>
                                <input {...registerRegister('email')} type="email" placeholder="Email" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FBBF24] focus:border-[#FBBF24] transition" />
                                {registerErrors.email && <p className="mt-1 text-xs text-red-600">{registerErrors.email.message}</p>}
                            </div>
                            <div>
                                <input {...registerRegister('password')} type="password" placeholder="Mot de passe" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FBBF24] focus:border-[#FBBF24] transition" />
                                {registerErrors.password && <p className="mt-1 text-xs text-red-600">{registerErrors.password.message}</p>}
                            </div>
                            <motion.button type="submit" disabled={isLoading} /* ... */ >
                                {isLoading ? <Loader2 className="animate-spin" /> : <><UserPlus className="mr-2" size={18} /> S'inscrire</>}
                            </motion.button>
                        </form>
                    )}
                </motion.div>
            </AnimatePresence>

            <div className="mt-6 text-center">
                <button onClick={() => setIsLogin(!isLogin)} className="text-xs text-gray-500 hover:text-[#111827] hover:underline transition-colors">
                    {isLogin ? 'Pas encore de compte ? S\'inscrire' : 'Déjà un compte ? Se connecter'}
                </button>
            </div>
        </motion.div>
    );
}