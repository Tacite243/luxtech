"use client";

import { motion, Variants } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import type { Service } from '@/lib/services-data';
import { CheckCircle } from 'lucide-react';



interface ServiceDetailsProps {
    service: Service;
    allServices: Service[];
}

const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};

export default function ServiceDetailsContent(
    { service, allServices }: ServiceDetailsProps
) {
    return (
        <motion.section
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
            className="service-details bg-white py-16 md:py-24"
        >
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* Sidebar (Left Column) */}
                    <motion.div variants={fadeInUp} className="lg:col-span-4">
                        <div className="services-list border border-gray-200 rounded-md">
                            {allServices.map(s => (
                                <Link
                                    key={s.id}
                                    href={`/services/${s.id}`}
                                    className={`block p-4 border-l-4 transition-colors duration-300 ${service.id === s.id
                                        ? 'border-[#FFC107] bg-gray-50 font-bold text-[#000000]'
                                        : 'border-transparent text-gray-600 hover:bg-gray-50'
                                        }`}
                                >
                                    {s.title}
                                </Link>
                            ))}
                        </div>
                        <div className="mt-8 p-6 bg-gray-50 rounded-md">
                            <h4 className="font-bold text-lg text-[#000000]">Notre Engagement</h4>
                            <p className="mt-2 text-gray-600">
                                Quel que soit le service, notre mission est de fournir un travail de la plus haute qualité, en alliant sécurité, durabilité et esthétique.
                            </p>
                        </div>
                    </motion.div>

                    {/* Main Content (Right Column) */}
                    <motion.div variants={fadeInUp} className="lg:col-span-8">
                        <Image
                            src={service.mainImage}
                            alt={`Image pour le service ${service.title}`}
                            width={1000}
                            height={600}
                            className="w-full h-auto rounded-lg shadow-md mb-6"
                        />
                        <h3 className="text-3xl font-bold text-[#000000]">{service.title}</h3>
                        <div
                            className="prose max-w-none mt-4 text-gray-600"
                            dangerouslySetInnerHTML={{ __html: service.longDescription }}
                        />
                        <ul className="mt-6 space-y-3">
                            {service.features.map((feature, index) => (
                                <li key={index} className="flex items-start">
                                    <CheckCircle size={20} className="text-[#FF0000] mr-3 mt-1 flex-shrink-0" />
                                    <span className="text-[#4b5563]">{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                </div>
            </div>
        </motion.section>
    );
}