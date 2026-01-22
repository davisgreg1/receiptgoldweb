'use client';

import { motion } from 'framer-motion';
import { FaApple, FaGooglePlay, FaReceipt } from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi';

export default function Hero() {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-20">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Left Content */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center lg:text-left"
                >
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="inline-flex items-center space-x-2 px-4 py-2 rounded-full mb-6 border bg-gold-background border-gold-primary text-gold-primary"
                    >
                        <HiSparkles className="text-lg" />
                        <span className="text-sm font-semibold">For LLC Owners & Small Business</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-heading font-black mb-6 tracking-tight leading-tight text-text-primary"
                    >
                        Your receipts in{' '}
                        <span className="text-gradient">one nifty little app</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-lg sm:text-xl lg:text-2xl mb-8 leading-relaxed font-display text-text-secondary"
                    >
                        Capture receipts instantly, auto-categorize expenses, and generate IRS-compliant reports. Everything you need to maximize deductions and simplify tax season.
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-6"
                    >
                        <motion.a
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            href="https://apps.apple.com/us/app/receiptgold/id6751426301"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center space-x-3 px-6 py-4 rounded-2xl transition-all duration-300 font-semibold text-base shadow-lg hover:shadow-xl"
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
                            className="flex items-center justify-center space-x-3 px-6 py-4 rounded-2xl transition-all duration-300 font-semibold text-base shadow-lg hover:shadow-xl"
                            style={{
                                backgroundImage: 'linear-gradient(135deg, #34C759, #007AFF)',
                                color: '#FFFFFF'
                            }}
                        >
                            <FaGooglePlay className="text-2xl" />
                            <div className="text-left">
                                <div className="text-xs opacity-90">Get it on</div>
                                <div className="text-base font-semibold">Google Play</div>
                            </div>
                        </motion.a>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        className="text-sm font-medium text-text-tertiary"
                    >
                        No credit card required • Free to start • 3-day trial
                    </motion.p>
                </motion.div>

                {/* Right Content - App Mockup with Video */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="relative flex justify-center lg:justify-end"
                >
                    <div className="relative">
                        {/* Phone Mockup with Video */}
                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                            className="relative w-56 h-80 sm:w-64 sm:h-[400px] rounded-3xl sm:rounded-[3rem] shadow-2xl overflow-hidden shadow-gold-primary/20"
                        >
                            {/* Video Content */}
                            <video
                                autoPlay
                                muted
                                playsInline
                                className="w-full h-full object-cover"
                            >
                                <source src="/quickScanAnim.mov" type="video/mp4" />
                                <source src="/quickScanAnim.mov" type="video/quicktime" />
                                Your browser does not support the video tag.
                            </video>
                        </motion.div>

                        {/* Floating Elements */}
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            className="absolute -top-4 -right-4 w-16 h-16 rounded-2xl flex items-center justify-center bg-gold-primary shadow-large"
                        >
                            <HiSparkles className="text-2xl text-text-inverse" />
                        </motion.div>

                        <motion.div
                            animate={{ y: [0, 10, 0] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute -bottom-4 -left-4 w-20 h-20 rounded-2xl flex items-center justify-center bg-background-elevated shadow-large"
                        >
                            <FaReceipt className="text-3xl text-gold-primary" />
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
