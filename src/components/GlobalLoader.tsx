"use client";

import { useAppSelector } from "@/redux/hooks";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";

export default function GlobalLoader() {
    // On lit l'état `isLoading` depuis notre `uiSlice`
    const isLoading = useAppSelector((state) => state.ui.isLoading);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    // Style pour l'overlay pleine page
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[9999]"
                >
                    {/* L'icône animée */}
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.1, type: 'spring', stiffness: 200, damping: 20 }}
                    >
                        <Loader2 className="w-16 h-16 text-[#FBBF24] animate-spin" />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}