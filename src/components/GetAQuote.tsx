"use client";

import { motion, Variants } from 'framer-motion';

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
  const inputStyle = "w-full px-4 py-3 bg-[#f9fafb] border border-[#d1d5db] rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF0000] transition duration-300 text-gray-800";

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      // viewport={{ once: true, amount: 0.2 }}
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
              Notre équipe vous répondra dans les plus brefs délais pour discuter de votre projet.
            </p>
            <form action="#" method="POST" className="space-y-5">
              {/* ...champs du formulaire... */}
              <div><input type="text" name="name" placeholder="Votre Nom" required className={inputStyle} /></div>
              <div><input type="email" name="email" placeholder="Votre Email" required className={inputStyle} /></div>
              <div><input type="tel" name="phone" placeholder="Votre Téléphone (Optionnel)" className={inputStyle} /></div>
              <div><textarea name="message" placeholder="Décrivez brièvement votre projet..." rows={5} required className={inputStyle}></textarea></div>
              <div><button type="submit" className="w-full bg-[#FF0000] text-[#FFFFFF] font-bold py-3 px-6 rounded-md hover:bg-[#D90000] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF0000] transition-all duration-300">Envoyer la demande</button></div>
            </form>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}