'use client';

import { motion } from 'framer-motion';
import { FaStar } from 'react-icons/fa';

export default function SocialProof() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-16 sm:mt-20 text-center"
            id="social-proof"
        >
            <p className="text-sm font-semibold mb-6 uppercase tracking-wider text-text-tertiary">
                Built for Business Owners
            </p>
            <div className="grid grid-cols-2 gap-8 max-w-2xl mx-auto justify-center">
                {[
                    { number: "5.0", label: "App Store Rating", icon: <FaStar /> },
                    { number: "99%", label: "OCR Accuracy" }
                ].map((stat, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
                        className="text-center"
                    >
                        <div className="flex items-center justify-center mb-2">
                            <div className="text-3xl sm:text-4xl font-bold text-gold-primary">
                                {stat.number}
                            </div>
                            {stat.icon && (
                                <span className="ml-2 text-xl text-gold-primary">
                                    {stat.icon}
                                </span>
                            )}
                        </div>
                        <div className="text-sm font-medium text-text-secondary">
                            {stat.label}
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}
