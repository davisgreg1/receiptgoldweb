'use client';

import { motion } from 'framer-motion';
import { FaReceipt, FaStar } from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi';

export default function HowItWorks() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.8 }}
            className="mt-20 sm:mt-24 text-center"
            id="how-it-works"
        >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black mb-4 tracking-tight text-text-primary">
                How it works
            </h2>
            <p className="text-lg sm:text-xl mb-12 sm:mb-16 max-w-2xl mx-auto font-display text-text-secondary">
                From receipt to report in 3 simple steps
            </p>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {[
                    {
                        step: "1",
                        icon: <FaReceipt className="text-2xl sm:text-3xl" />,
                        title: "Snap a Photo",
                        description: "Take a picture of your receipt. OCR instantly extracts all the details."
                    },
                    {
                        step: "2",
                        icon: <HiSparkles className="text-2xl sm:text-3xl" />,
                        title: "Auto-Categorize",
                        description: "AI automatically sorts expenses into tax categories."
                    },
                    {
                        step: "3",
                        icon: <FaStar className="text-2xl sm:text-3xl" />,
                        title: "Generate Reports",
                        description: "Export tax-ready reports in PDF, CSV, or ZIP format."
                    }
                ].map((item, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 2.0 + index * 0.15 }}
                        className="relative"
                    >
                        <div className="flex flex-col items-center text-center">
                            <div
                                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center mb-6 relative shadow-large"
                                style={{
                                    backgroundImage: `linear-gradient(135deg, var(--gold-primary), var(--gold-rich))`
                                }}
                            >
                                <div className="text-text-inverse">
                                    {item.icon}
                                </div>
                                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold bg-background-primary text-gold-primary border-2 border-gold-primary">
                                    {item.step}
                                </div>
                            </div>
                            <h3 className="text-xl sm:text-2xl font-heading font-bold mb-3 tracking-tight text-text-primary">
                                {item.title}
                            </h3>
                            <p className="text-sm sm:text-base leading-relaxed font-display text-text-secondary">
                                {item.description}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}
