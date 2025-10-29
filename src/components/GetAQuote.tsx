"use client";

import { motion, Variants } from 'framer-motion';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { sendQuoteRequest, resetQuoteState } from '@/redux/features/quotesSlice';
import toast from 'react-hot-toast';
import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';

// Schéma de validation pour le formulaire
const quoteSchema = z.object({
  name: z.string().min(2, "Le nom est requis."),
  email: z.string().email("L'adresse email est invalide."),
  phone: z.string().optional(),
  message: z.string().min(10, "Veuillez décrire votre projet (min. 10 caractères)."),
});

type QuoteFormValues = z.infer<typeof quoteSchema>;

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};

// Variante pour le conteneur qui orchestre la cascade des deux colonnes
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      // Délai entre l'animation de la colonne de texte et celle du formulaire
      staggerChildren: 0.25
    }
  }
};

export default function GetAQuote() {
  const dispatch = useAppDispatch();
  const { status, error } = useAppSelector((state) => state.quotes);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<QuoteFormValues>({
    resolver: zodResolver(quoteSchema),
  });

  const onSubmit: SubmitHandler<QuoteFormValues> = async (data) => {
    await dispatch(sendQuoteRequest(data)).unwrap();
  };

  // Gérer les notifications de succès/erreur
  useEffect(() => {
    if (status === 'succeeded') {
      toast.success('Demande de devis envoyée avec succès !');
      reset(); // Vider le formulaire
      dispatch(resetQuoteState()); // Réinitialiser l'état du slice
    }
    if (status === 'failed' && error) {
      toast.error(error);
      dispatch(resetQuoteState());
    }
  }, [status, error, dispatch, reset]);

  const isLoading = status === 'loading';
  const inputStyle = "w-full px-4 py-3 bg-white border border-[#d1d5db] rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF0000] transition duration-300 text-gray-800";

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
      className="bg-[#FFFFFF] text-[#111827] py-16 md:py-24"
    >
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div variants={fadeInUp}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#000000]">
              Un projet en tête ? Simplifions ensemble sa réalisation.
            </h2>
            <div className="w-20 h-1 bg-[#FF0000] mb-6" />
            <p className="text-lg text-[#4b5563] mb-4">
              Notre objectif est de vous offrir un service fiable, efficace et durable. En nous faisant confiance, vous gagnez non seulement du temps, mais aussi la garantie d&apos;un travail bien fait, avec un suivi attentif et une réelle valeur ajoutée.
            </p>
            <p className="text-[#6b7280]">
              Choisir LuxTech Services, c&apos;est opter pour la fiabilité, l&apos;innovation et la satisfaction. Remplissez le formulaire pour obtenir votre devis personnalisé.
            </p>
          </motion.div>

          <motion.div variants={fadeInUp} className="bg-[#f9fafb] p-8 rounded-lg shadow-md border border-[#e5e7eb]">
            <h3 className="text-xl font-bold text-[#000000] mb-2 uppercase">
              Demander un devis gratuit
            </h3>
            <p className="text-[#6b7280] mb-6">
              Notre équipe vous répondra dans les plus brefs délais.
            </p>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div>
                <input {...register('name')} placeholder="Votre Nom" className={inputStyle} />
                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
              </div>
              <div>
                <input {...register('email')} placeholder="Votre Email" className={inputStyle} />
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
              </div>
              <div>
                <input {...register('phone')} placeholder="Votre Téléphone (Optionnel)" className={inputStyle} />
              </div>
              <div>
                <textarea {...register('message')} placeholder="Décrivez brièvement votre projet..." rows={5} className={inputStyle}></textarea>
                {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>}
              </div>
              <div>
                <button type="submit" disabled={isLoading} className="w-full bg-[#FF0000] text-[#FFFFFF] font-bold py-3 px-6 rounded-md hover:bg-[#D90000] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF0000] transition-all duration-300 flex items-center justify-center disabled:opacity-60">
                  {isLoading ? <Loader2 className="animate-spin" /> : 'Envoyer la demande'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}