'use client';

import { motion } from 'framer-motion';
import { FaUsers, FaCheckCircle } from 'react-icons/fa';

export default function TeamCollaboration() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.8 }}
            className="mt-20 sm:mt-24"
        >
            <div className="max-w-6xl mx-auto">
                <div
                    className="relative overflow-hidden rounded-3xl sm:rounded-[3rem] p-8 sm:p-12 lg:p-16 shadow-large"
                    style={{
                        backgroundImage: `linear-gradient(135deg, rgba(255, 215, 0, 0.15) 15%, rgba(184, 134, 11, 0.15) 15%)`,
                        border: `2px solid rgba(255, 215, 0, 0.3)`
                    }}
                >
                    {/* Decorative Elements */}
                    <div className="absolute top-0 right-0 w-64 h-64 opacity-10">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                        >
                            <FaUsers className="w-full h-full text-gold-primary" />
                        </motion.div>
                    </div>

                    <div className="relative z-10 grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                        {/* Left Content */}
                        <div className="text-center lg:text-left">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.6, delay: 2.0 }}
                                className="inline-flex items-center space-x-2 px-4 py-2 rounded-full mb-6 border bg-gold-background border-gold-primary text-gold-primary"
                            >
                                <FaUsers className="text-base" />
                                <span className="text-sm font-semibold">Team Collaboration</span>
                            </motion.div>

                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black mb-6 tracking-tight text-text-primary">
                                Work together with{' '}
                                <span className="text-gradient">your team</span>
                            </h2>

                            <p className="text-base sm:text-lg lg:text-xl mb-8 leading-relaxed font-display text-text-secondary">
                                Invite teammates, accountants, or bookkeepers to collaborate on your expense tracking. Share receipts, sync in real-time, and keep everyone on the same page.
                            </p>

                            <div className="grid sm:grid-cols-2 gap-4 mb-8">
                                {[
                                    { text: "Invite unlimited team members", icon: <FaCheckCircle /> },
                                    { text: "Real-time sync across devices", icon: <FaCheckCircle /> },
                                    { text: "Role-based permissions", icon: <FaCheckCircle /> },
                                    { text: "Shared receipt library", icon: <FaCheckCircle /> }
                                ].map((item, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.5, delay: 2.2 + index * 0.1 }}
                                        className="flex items-center space-x-3"
                                    >
                                        <div className="text-gold-primary">
                                            {item.icon}
                                        </div>
                                        <span className="text-sm sm:text-base font-medium text-text-primary">
                                            {item.text}
                                        </span>
                                    </motion.div>
                                ))}
                            </div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 2.6 }}
                            >
                                <a
                                    href="#download"
                                    className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 bg-gold-primary text-text-inverse shadow-medium"
                                >
                                    <FaUsers />
                                    <span>Start Collaborating</span>
                                </a>
                            </motion.div>
                        </div>

                        {/* Right Content - Visual */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 2.0 }}
                            className="relative"
                        >
                            <div className="relative">
                                {/* Stacked Cards Effect */}
                                <div className="space-y-4">
                                    {[
                                        { name: "Sarah Chen", role: "Owner", color: "var(--gold-primary)" },
                                        { name: "Mike Rodriguez", role: "Accountant", color: "var(--gold-rich)" },
                                        { name: "Emma Wilson", role: "Bookkeeper", color: "var(--gold-primary)" }
                                    ].map((member, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.6, delay: 2.2 + index * 0.15 }}
                                            whileHover={{ scale: 1.02, y: -5 }}
                                            className="p-6 rounded-2xl backdrop-blur-lg border bg-background-elevated/95 border-border-primary shadow-medium"
                                        >
                                            <div className="flex items-center space-x-4">
                                                <div
                                                    className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold"
                                                    style={{
                                                        backgroundColor: `${member.color}20`,
                                                        color: member.color
                                                    }}
                                                >
                                                    {member.name.split(' ').map(n => n[0]).join('')}
                                                </div>
                                                <div className="flex-1">
                                                    <div className="font-semibold text-base text-text-primary">
                                                        {member.name}
                                                    </div>
                                                    <div className="text-sm text-text-secondary">
                                                        {member.role}
                                                    </div>
                                                </div>
                                                <motion.div
                                                    animate={{ scale: [1, 1.2, 1] }}
                                                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                                                    className="w-3 h-3 rounded-full"
                                                    style={{ backgroundColor: '#34C759' }}
                                                />
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Floating Badge */}
                                <motion.div
                                    animate={{ y: [0, -10, 0], rotate: [0, 5, -5, 0] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                    className="absolute -top-4 -right-4 px-4 py-2 rounded-full font-semibold text-sm shadow-lg bg-gold-primary text-text-inverse"
                                >
                                    Unlimited Team
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
