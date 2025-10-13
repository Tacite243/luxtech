'use client';

import { useState, useEffect } from 'react';
import { motion, Variants } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import type { ElementType } from 'react';
import { Send, User, Mail, MessageSquare, Loader2, MapPin, Phone } from 'lucide-react';
import { AppDispatch, RootState } from '@/redux/store';
import { sendContactMessage, resetContactState } from '@/redux/slices/contactSlice';



interface FormData {
    name: string;
    email: string;
    subject: string;
    message: string;
}

interface ContactInfo {
    icon: ElementType;
    title: string;
    details: string[];
    // Ajoutons des propriétés optionnelles pour les liens
    linkType?: 'tel' | 'mailto' | 'map';
    linkValue?: string;
}

const contactInfoItems: ContactInfo[] = [
    {
        icon: MapPin,
        title: "Notre Adresse",
        details: ["149 Av Nzangi butondo, Q/Kyeshero", "Goma, RDC"],
        linkType: 'map',
        // Lien direct vers Google Maps (URL encodée pour la recherche)
        linkValue: 'https://www.google.com/maps/search/?api=1&query=149+Av+Nzangi+butondo,+Goma,+RDC'
    },
    {
        icon: Mail,
        title: "Envoyez-nous un email",
        details: ["info@luxtechservices.com"],
        linkType: 'mailto',
        linkValue: 'info@luxtechservices.com'
    },
    {
        icon: Phone,
        title: "Appelez-nous",
        details: ["+243 997 354 382"],
        linkType: 'tel',
        // Format international sans espaces ni caractères spéciaux pour `tel:`
        linkValue: '+243997354382'
    },
];

const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

export default function ContactForm() {
    const [formData, setFormData] = useState<FormData>({ name: "", email: "", subject: "", message: "" });
    const dispatch = useDispatch<AppDispatch>();
    const { status, error } = useSelector((state: RootState) => state.contact);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(sendContactMessage(formData));
    };

    useEffect(() => {
        if (status === 'succeeded') {
            toast.success('Votre message a été envoyé avec succès !');
            setFormData({ name: "", email: "", subject: "", message: "" });
            dispatch(resetContactState());
        }
        if (status === 'failed' && error) {
            toast.error(error);
            dispatch(resetContactState());
        }
    }, [status, error, dispatch]);

    const isSubmitting = status === 'loading';

    return (
        <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={containerVariants}
            className="bg-gray-50 py-16 md:py-24"
        >
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                    {contactInfoItems.map((item, index) => {
                        const Icon = item.icon;
                        
                        // Déterminer le préfixe du lien
                        let hrefPrefix = '';
                        if (item.linkType === 'tel') hrefPrefix = 'tel:';
                        if (item.linkType === 'mailto') hrefPrefix = 'mailto:';

                        const linkHref = item.linkValue ? `${hrefPrefix}${item.linkValue}` : '#';

                        return (
                            <motion.div key={index} variants={fadeInUp} className="text-center p-8 bg-white rounded-xl shadow-lg border border-transparent hover:border-[#FBBF24] transition-colors duration-300 flex flex-col">
                                <Icon size={40} className="text-[#FBBF24] mx-auto mb-5" strokeWidth={1.5} />
                                <h3 className="text-xl font-bold text-[#111827] mb-2">{item.title}</h3>
                                <div className="mt-auto">
                                    {/* On transforme les détails en liens */}
                                    {item.details.map((detail, detailIndex) => (
                                        <a 
                                            key={detailIndex}
                                            href={linkHref}
                                            // Ouvre Google Maps dans un nouvel onglet
                                            target={item.linkType === 'map' ? '_blank' : '_self'}
                                            rel={item.linkType === 'map' ? 'noopener noreferrer' : ''}
                                            className="block text-gray-600 hover:text-[#111827] transition-colors duration-200"
                                        >
                                            {detail}
                                        </a>
                                    ))}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>


                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    <motion.div variants={fadeInUp} className="h-[450px] lg:h-full w-full rounded-xl overflow-hidden shadow-2xl">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.472983777596!2d29.2270966152865!3d-1.684179336637156!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19dd055745772321%3A0x633d3c267c4d516b!2sGoma!5e0!3m2!1sen!2scd!4v1672834567890"
                            width="100%" height="100%" style={{ border: 0 }}
                            allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </motion.div>

                    <motion.form
                        variants={fadeInUp}
                        onSubmit={handleSubmit}
                        className="bg-white rounded-2xl p-8 shadow-2xl"
                    >
                        <h2 className="text-3xl font-bold text-[#111827] mb-6">Envoyez-nous un message</h2>

                        {/* --- Amélioration : Définition des classes pour les champs de saisie --- */}
                        {(() => {
                            // On définit les classes ici pour ne pas les répéter (principe DRY)
                            const inputClasses = "w-full px-4 py-3 bg-gray-50 border border-gray-400 text-[#111827] placeholder:text-gray-500 rounded-lg transition duration-300 hover:border-[#FBBF24] focus:outline-none focus:ring-2 focus:ring-[#FBBF24] focus:border-[#FBBF24]";

                            return (
                                <>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                        <div>
                                            {/* Amélioration : Icône un peu plus visible */}
                                            <label className="block text-gray-700 font-semibold mb-2"><User className="inline mr-2 text-gray-500" size={18} />Nom Complet</label>
                                            <input type="text" name="name" value={formData.name} onChange={handleInputChange} className={inputClasses} placeholder="Votre nom" required />
                                        </div>
                                        <div>
                                            <label className="block text-gray-700 font-semibold mb-2"><Mail className="inline mr-2 text-gray-500" size={18} />Email</label>
                                            <input type="email" name="email" value={formData.email} onChange={handleInputChange} className={inputClasses} placeholder="votre.email@example.com" required />
                                        </div>
                                    </div>
                                    <div className="mb-6">
                                        <label className="block text-gray-700 font-semibold mb-2"><MessageSquare className="inline mr-2 text-gray-500" size={18} />Sujet</label>
                                        <input type="text" name="subject" value={formData.subject} onChange={handleInputChange} className={inputClasses} placeholder="Sujet de votre message" required />
                                    </div>
                                    <div className="mb-8">
                                        <label className="block text-gray-700 font-semibold mb-2"><MessageSquare className="inline mr-2 text-gray-500" size={18} />Message</label>
                                        <textarea name="message" value={formData.message} onChange={handleInputChange} rows={5} className={inputClasses} placeholder="Écrivez votre message ici..." required></textarea>
                                    </div>
                                </>
                            );
                        })()}

                        <motion.button
                            type="submit" disabled={isSubmitting}
                            whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                            whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                            className="w-full bg-[#FBBF24] hover:bg-[#F59E0B] text-[#111827] py-4 rounded-lg font-bold text-lg flex items-center justify-center space-x-2 shadow-lg transition-all duration-300 disabled:opacity-70"
                        >
                            {isSubmitting ? <Loader2 size={24} className="animate-spin" /> : <Send size={20} />}
                            <span>{isSubmitting ? 'Envoi en cours...' : 'Envoyer le Message'}</span>
                        </motion.button>
                    </motion.form>
                </div>
            </div>
        </motion.section>
    );
}