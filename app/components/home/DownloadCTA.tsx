'use client';

import { motion } from 'framer-motion';
import { FaApple, FaGooglePlay, FaCheckCircle } from 'react-icons/fa';

export default function DownloadCTA() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.4 }}
            className="mt-20 sm:mt-24 text-center"
            id="download"
        >
            <div
                className="p-8 sm:p-12 lg:p-16 rounded-3xl sm:rounded-[3rem] max-w-4xl mx-auto shadow-large"
                style={{
                    backgroundImage: `linear-gradient(135deg, var(--gold-primary), var(--gold-rich))`
                }}
            >
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black mb-4 tracking-tight text-text-inverse">
                    Get started for free
                </h2>
                <p className="text-lg sm:text-xl mb-8 sm:mb-10 opacity-95 font-display max-w-2xl mx-auto text-text-inverse">
                    Join other business owners who trust ReceiptGold for their expense tracking
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                    <motion.a
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        href="https://apps.apple.com/us/app/receiptgold/id6751426301"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center space-x-3 px-8 py-5 rounded-2xl transition-all duration-300 font-semibold text-base shadow-xl"
                        style={{
                            backgroundColor: '#000000',
                            color: '#FFFFFF'
                        }}
                    >
                        <FaApple className="text-2xl" />
                        <div className="text-left">
                            <div className="text-xs opacity-80">Download on the</div>
                            <div className="text-base font-semibold">App Store</div>
                        </div>
                    </motion.a>

                    <motion.a
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        href="https://play.google.com/store/apps/details?id=com.receiptgold.app"
                        className="flex items-center justify-center space-x-3 px-8 py-5 rounded-2xl transition-all duration-300 font-semibold text-base shadow-xl"
                        style={{
                            backgroundColor: '#FFFFFF',
                            color: '#000000'
                        }}
                    >
                        <FaGooglePlay className="text-2xl" />
                        <div className="text-left">
                            <div className="text-xs opacity-80">Get it on</div>
                            <div className="text-base font-semibold">Google Play</div>
                        </div>
                    </motion.a>
                </div>

                <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-sm font-medium text-text-inverse">
                    <div className="flex items-center space-x-2">
                        <FaCheckCircle className="text-base" />
                        <span>No credit card required</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <FaCheckCircle className="text-base" />
                        <span>3-day free trial</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <FaCheckCircle className="text-base" />
                        <span>Cancel anytime</span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
