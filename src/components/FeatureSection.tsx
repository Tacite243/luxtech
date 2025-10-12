import { motion, Variants } from 'framer-motion';
import Image from 'next/image';
import { ReactNode } from 'react';



// --- Type Definitions for Props ---
interface FeatureItem {
    icon: ReactNode;
    title: string;
    description: string;
}

interface FeatureSectionProps {
    imageUrl: string;
    title: string;
    description: string;
    features: FeatureItem[];
    imageSide?: 'left' | 'right'; // Prop to control image position
    bgColor?: 'white' | 'gray';   // Prop to control background color
}

// --- Animation Variants ---
const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
};

export default function FeatureSection({
    imageUrl,
    title,
    description,
    features,
    imageSide = 'left',
    bgColor = 'white'
}: FeatureSectionProps) {

    const bgClass = bgColor === 'white' ? 'bg-[#FFFFFF]' : 'bg-[#f8f9fa]';

    return (
        <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
            className={`${bgClass} py-16 md:py-24`}
        >
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">

                    {/* Image Column */}
                    <motion.div
                        variants={fadeInUp}
                        // The 'order-last' class is used to flip the column order on large screens
                        className={`min-h-[400px] rounded-md ${imageSide === 'right' ? 'lg:order-last' : ''}`}
                    >
                        <Image
                            src={imageUrl}
                            alt={title}
                            width={800}
                            height={900}
                            className="rounded-md w-full h-full object-cover shadow-lg"
                        />
                    </motion.div>

                    {/* Text Content Column */}
                    <motion.div variants={containerVariants}>
                        <motion.h3 variants={fadeInUp} className="text-3xl font-bold text-[#000000] mb-4">
                            {title}
                        </motion.h3>
                        <motion.p variants={fadeInUp} className="text-gray-600 mb-8">
                            {description}
                        </motion.p>

                        <div className="space-y-6">
                            {features.map((feature, index) => (
                                <motion.div key={index} variants={fadeInUp} className="flex items-start">
                                    <div className="flex-shrink-0 bg-gray-100 p-3 rounded-md mr-4">
                                        {feature.icon}
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-semibold text-[#000000]">{feature.title}</h4>
                                        <p className="text-gray-500">{feature.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                </div>
            </div>
        </motion.section>
    );
}