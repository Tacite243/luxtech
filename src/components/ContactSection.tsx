"use client";

import { motion, Variants } from 'framer-motion';
import { MapPin, Mail, Phone } from 'lucide-react';

// --- Animation Variants ---
const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

export default function ContactSection() {
    const inputStyle = "w-full px-4 py-3 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF0000] transition duration-300";

    return (
        <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={containerVariants}
            className="contact bg-white py-16 md:py-24"
        >
            <div className="container mx-auto px-6">

                {/* Grille des informations de contact */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                    <motion.div variants={fadeInUp} className="info-item text-center p-6 bg-gray-50 rounded-lg shadow-sm">
                        <MapPin size={48} className="text-[#FF0000] mx-auto mb-4" strokeWidth={1.5} />
                        <h3 className="text-xl font-bold text-[#000000]">Notre Adresse</h3>
                        <p className="text-gray-600">149 Av Nzangi butondo, Q/Kyeshero, Goma, RDC</p>
                    </motion.div>
                    <motion.div variants={fadeInUp} className="info-item text-center p-6 bg-gray-50 rounded-lg shadow-sm">
                        <Mail size={48} className="text-[#FF0000] mx-auto mb-4" strokeWidth={1.5} />
                        <h3 className="text-xl font-bold text-[#000000]">Envoyez-nous un email</h3>
                        <p className="text-gray-600">info@luxtechservices.com</p>
                    </motion.div>
                    <motion.div variants={fadeInUp} className="info-item text-center p-6 bg-gray-50 rounded-lg shadow-sm">
                        <Phone size={48} className="text-[#FF0000] mx-auto mb-4" strokeWidth={1.5} />
                        <h3 className="text-xl font-bold text-[#000000]">Appelez-nous</h3>
                        <p className="text-gray-600">+243 997354382</p>
                    </motion.div>
                </div>

                {/* Grille pour la carte et le formulaire */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

                    {/* Carte Google Maps */}
                    <motion.div variants={fadeInUp} className="h-[400px] lg:h-full w-full">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.472983777596!2d29.2270966152865!3d-1.684179336637156!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19dd055745772321%3A0x633d3c267c4d516b!2sGoma!5e0!3m2!1sen!2scd!4v1672834567890" // Remplacez ce lien par le lien de votre adresse
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen={true}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            className="rounded-lg shadow-md"
                        ></iframe>
                    </motion.div>

                    {/* Formulaire de Contact */}
                    <motion.div variants={fadeInUp} className="bg-gray-50 p-8 rounded-lg shadow-md">
                        <form action="#" method="POST" className="space-y-5">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <div><input type="text" name="name" placeholder="Votre Nom" required className={inputStyle} /></div>
                                <div><input type="email" name="email" placeholder="Votre Email" required className={inputStyle} /></div>
                            </div>
                            <div>
                                <input type="text" name="subject" placeholder="Sujet" required className={inputStyle} />
                            </div>
                            <div>
                                <textarea name="message" placeholder="Votre Message" rows={6} required className={inputStyle}></textarea>
                            </div>
                            <div className="text-center">
                                <button
                                    type="submit"
                                    className="w-full sm:w-auto bg-[#FF0000] text-[#FFFFFF] font-bold py-3 px-8 rounded-md hover:bg-[#D90000] transition-all duration-300"
                                >
                                    Envoyer le Message
                                </button>
                            </div>
                        </form>
                    </motion.div>

                </div>
            </div>
        </motion.section>
    );
}