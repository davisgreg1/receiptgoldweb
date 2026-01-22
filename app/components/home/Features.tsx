'use client';

import { motion } from 'framer-motion';
import { FaReceipt } from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi';
import { BsCloudUpload, BsShield } from 'react-icons/bs';

export default function Features() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="mt-20 sm:mt-24"
            id="features"
        >
            <div className="text-center mb-12 sm:mb-16">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black mb-4 tracking-tight text-text-primary">
                    Everything you need in{' '}
                    <span className="text-gradient">one place</span>
                </h2>
                <p className="text-lg sm:text-xl max-w-2xl mx-auto font-display text-text-secondary">
                    Powerful features designed specifically for LLC owners and small business
                </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                {[
                    {
                        icon: <FaReceipt className="text-3xl" />,
                        title: "Smart OCR Scanning",
                        description: "AI-powered receipt scanning extracts vendor, date, amount, and items with 99% accuracy."
                    },
                    {
                        icon: <HiSparkles className="text-3xl" />,
                        title: "Auto-Categorization",
                        description: "Expenses automatically sorted into IRS tax categories for seamless reporting."
                    },
                    {
                        icon: <BsCloudUpload className="text-3xl" />,
                        title: "Cloud Backup",
                        description: "Secure cloud storage with automatic sync across all your devices."
                    },
                    {
                        icon: <BsShield className="text-3xl" />,
                        title: "Tax-Ready Reports",
                        description: "Generate professional reports in PDF, CSV, or ZIP format instantly."
                    }
                ].map((feature, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 1.4 + index * 0.1 }}
                        whileHover={{ y: -5 }}
                        className="group p-6 sm:p-8 rounded-2xl sm:rounded-3xl transition-all duration-300 border bg-background-elevated border-border-primary shadow-small"
                    >
                        <div className="mb-4 sm:mb-6 inline-flex p-3 sm:p-4 rounded-xl transition-transform duration-300 group-hover:scale-110 bg-gold-background text-gold-primary">
                            {feature.icon}
                        </div>
                        <h3 className="text-lg sm:text-xl font-heading font-bold mb-3 tracking-tight text-text-primary">
                            {feature.title}
                        </h3>
                        <p className="text-sm sm:text-base leading-relaxed font-display text-text-secondary">
                            {feature.description}
                        </p>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}
