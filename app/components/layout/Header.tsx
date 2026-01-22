'use client';

import { motion } from 'framer-motion';
import { FaMoon, FaSun } from 'react-icons/fa';
import Image from 'next/image';
import { useTheme } from '../../theme/theme';

export default function Header() {
    const { themeMode, toggleTheme } = useTheme();

    return (
        <motion.header
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="sticky top-0 z-50 backdrop-blur-lg border-b bg-background-primary/95 border-border-primary"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
                <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 relative">
                            <Image
                                src="/images/logo.jpg"
                                alt="ReceiptGold Logo"
                                fill
                                className="object-contain rounded-lg"
                            />
                        </div>
                        <span className="text-lg sm:text-2xl font-heading font-bold tracking-tight text-text-primary">
                            ReceiptGold
                        </span>
                    </div>

                    <nav className="hidden md:flex items-center space-x-6">
                        <a
                            href="#features"
                            className="text-sm font-medium transition-colors hover:opacity-70 text-text-secondary"
                        >
                            Features
                        </a>
                        <a
                            href="#how-it-works"
                            className="text-sm font-medium transition-colors hover:opacity-70 text-text-secondary"
                        >
                            How It Works
                        </a>
                        <a
                            href="#download"
                            className="text-sm font-medium transition-colors hover:opacity-70 text-text-secondary"
                        >
                            Download
                        </a>
                    </nav>

                    <div className="flex items-center space-x-3">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={toggleTheme}
                            className="p-2 rounded-full transition-colors duration-300 bg-background-secondary text-text-primary"
                            aria-label="Toggle theme"
                        >
                            {themeMode === 'dark' ? <FaSun size={16} /> : <FaMoon size={16} />}
                        </motion.button>
                        <motion.a
                            href="#download"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-4 py-2 rounded-full text-sm font-semibold transition-all bg-gold-primary text-text-inverse"
                        >
                            Get Started Free
                        </motion.a>
                    </div>
                </div>
            </div>
        </motion.header>
    );
}
