import { FaStar } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface FooterProps {
    variant?: 'public' | 'portal';
}

export default function Footer({ variant = 'public' }: FooterProps) {
    return (
        <motion.footer
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 2.8 }}
            className="relative z-10 mt-20 sm:mt-24 border-t border-border dark:bg-background"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
                <div className="grid md:grid-cols-4 gap-8 mb-8">
                    {/* Brand Column */}
                    <div className="md:col-span-2">
                        <div className="flex items-center space-x-2 mb-4">
                            <div className="w-8 h-8 relative">
                                <Image
                                    src="/images/logo.jpg"
                                    alt="ReceiptGold Logo"
                                    fill
                                    className="object-contain rounded-lg"
                                />
                            </div>
                            <span className="text-xl font-heading font-bold text-text-primary">
                                ReceiptGold
                            </span>
                        </div>
                        <p className="text-sm leading-relaxed max-w-sm mb-4 text-text-secondary">
                            The ultimate expense management app for LLC owners and small business. Capture receipts, track expenses, and maximize deductions.
                        </p>
                        <div className="flex items-center space-x-2 text-xs text-text-tertiary">
                            <FaStar className="text-gold-primary" />
                            <span className="font-semibold text-text-primary">5/5</span>
                            <span>• Built for business owners</span>
                        </div>
                    </div>

                    {/* Navigation Column */}
                    <div>
                        <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-text-primary">
                            {variant === 'public' ? 'Product' : 'Navigation'}
                        </h4>
                        <ul className="space-y-2 text-sm text-text-secondary">
                            {variant === 'public' ? (
                                <>
                                    <li>
                                        <a href="#features" className="hover:opacity-70 transition-opacity">Features</a>
                                    </li>
                                    <li>
                                        <a href="#how-it-works" className="hover:opacity-70 transition-opacity">How It Works</a>
                                    </li>
                                    <li>
                                        <a href="#download" className="hover:opacity-70 transition-opacity">Download</a>
                                    </li>
                                    <li>
                                        <a href="#" className="hover:opacity-70 transition-opacity">Pricing</a>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li>
                                        <Link href="/portal/dashboard" className="hover:opacity-70 transition-opacity">Dashboard</Link>
                                    </li>
                                    <li>
                                        <Link href="/portal/receipts" className="hover:opacity-70 transition-opacity">Receipts</Link>
                                    </li>
                                    <li>
                                        <Link href="/portal/team" className="hover:opacity-70 transition-opacity">Team</Link>
                                    </li>
                                    <li>
                                        <Link href="/portal/settings" className="hover:opacity-70 transition-opacity">Settings</Link>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>

                    {/* Company Column */}
                    <div>
                        <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-text-primary">
                            Company
                        </h4>
                        <ul className="space-y-2 text-sm text-text-secondary">
                            <li>
                                <Link href="/privacy-policy" className="hover:opacity-70 transition-opacity">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="/terms" className="hover:opacity-70 transition-opacity">
                                    Terms of Service
                                </Link>
                            </li>
                            <li>
                                <a
                                    href="https://www.gregdavistech.com/about"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:opacity-70 transition-opacity"
                                >
                                    About Us
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-border-primary flex flex-col sm:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-text-tertiary">
                        © <span suppressHydrationWarning>{new Date().getFullYear()}</span> ReceiptGold by{' '}
                        <a
                            href="https://business.gregdavistech.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:opacity-70 transition-opacity text-gold-primary"
                        >
                            GregDavisTech, LLC
                        </a>
                    </p>
                    <div className="flex items-center space-x-4 text-xs text-text-tertiary">
                        <span>Available on iOS & Android</span>
                        <span>•</span>
                        <span>Made for Business Owners</span>
                    </div>
                </div>
            </div>
        </motion.footer>
    );
}
