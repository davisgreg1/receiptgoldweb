'use client';

import { motion } from 'framer-motion';
import { FaApple, FaGooglePlay, FaReceipt, FaStar, FaCheckCircle, FaMoon, FaSun, FaUsers } from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi';
import { BsCloudUpload, BsShield } from 'react-icons/bs';
import { useTheme } from './theme/theme';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  const { theme, themeMode, toggleTheme } = useTheme();

  return (
    <div 
      className="min-h-screen transition-colors duration-300"
      style={{ backgroundColor: theme.background.primary }}
    >
      {/* Sticky Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="sticky top-0 z-50 backdrop-blur-lg border-b"
        style={{
          backgroundColor: `${theme.background.primary}95`,
          borderColor: theme.border.primary
        }}
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
              <span
                className="text-lg sm:text-2xl font-heading font-bold tracking-tight"
                style={{ color: theme.text.primary }}
              >
                ReceiptGold
              </span>
            </div>

            <nav className="hidden md:flex items-center space-x-6">
              <a
                href="#features"
                className="text-sm font-medium transition-colors hover:opacity-70"
                style={{ color: theme.text.secondary }}
              >
                Features
              </a>
              <a
                href="#how-it-works"
                className="text-sm font-medium transition-colors hover:opacity-70"
                style={{ color: theme.text.secondary }}
              >
                How It Works
              </a>
              <a
                href="#download"
                className="text-sm font-medium transition-colors hover:opacity-70"
                style={{ color: theme.text.secondary }}
              >
                Download
              </a>
            </nav>

            <div className="flex items-center space-x-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleTheme}
                className="p-2 rounded-full transition-colors duration-300"
                style={{
                  backgroundColor: theme.background.secondary,
                  color: theme.text.primary
                }}
              >
                {themeMode === 'dark' ? <FaSun size={16} /> : <FaMoon size={16} />}
              </motion.button>
              <motion.a
                href="#download"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 rounded-full text-sm font-semibold transition-all"
                style={{
                  backgroundColor: theme.gold.primary,
                  color: theme.text.inverse
                }}
              >
                Get Started Free
              </motion.a>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <main className="relative">
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
                className="inline-flex items-center space-x-2 px-4 py-2 rounded-full mb-6 border"
                style={{
                  backgroundColor: theme.gold.background,
                  borderColor: theme.gold.primary,
                  color: theme.gold.primary
                }}
              >
                <HiSparkles className="text-lg" />
                <span className="text-sm font-semibold">For LLC Owners & Small Business</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-heading font-black mb-6 tracking-tight leading-tight"
                style={{ color: theme.text.primary }}
              >
                Your receipts in{' '}
                <span className="text-gradient">one nifty little app</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-lg sm:text-xl lg:text-2xl mb-8 leading-relaxed font-display"
                style={{ color: theme.text.secondary }}
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
                className="text-sm font-medium"
                style={{ color: theme.text.tertiary }}
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
                  className="relative w-56 h-80 sm:w-64 sm:h-[400px] rounded-3xl sm:rounded-[3rem] shadow-2xl overflow-hidden"
                  style={{
                    boxShadow: `0 25px 50px -12px rgba(0, 0, 0, 0.25), ${theme.shadow.large}`
                  }}
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
                  className="absolute -top-4 -right-4 w-16 h-16 rounded-2xl flex items-center justify-center"
                  style={{
                    backgroundColor: theme.gold.primary,
                    boxShadow: theme.shadow.large
                  }}
                >
                  <HiSparkles className="text-2xl" style={{ color: theme.text.inverse }} />
                </motion.div>

                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -bottom-4 -left-4 w-20 h-20 rounded-2xl flex items-center justify-center"
                  style={{
                    backgroundColor: theme.background.elevated,
                    boxShadow: theme.shadow.large
                  }}
                >
                  <FaReceipt className="text-3xl" style={{ color: theme.gold.primary }} />
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Social Proof */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-16 sm:mt-20 text-center"
            id="social-proof"
          >
            <p className="text-sm font-semibold mb-6 uppercase tracking-wider" style={{ color: theme.text.tertiary }}>
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
                    <div className="text-3xl sm:text-4xl font-bold" style={{ color: theme.gold.primary }}>
                      {stat.number}
                    </div>
                    {stat.icon && (
                      <span className="ml-2 text-xl" style={{ color: theme.gold.primary }}>
                        {stat.icon}
                      </span>
                    )}
                  </div>
                  <div className="text-sm font-medium" style={{ color: theme.text.secondary }}>
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Features Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="mt-20 sm:mt-24"
            id="features"
          >
            <div className="text-center mb-12 sm:mb-16">
              <h2
                className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black mb-4 tracking-tight"
                style={{ color: theme.text.primary }}
              >
                Everything you need in{' '}
                <span className="text-gradient">one place</span>
              </h2>
              <p
                className="text-lg sm:text-xl max-w-2xl mx-auto font-display"
                style={{ color: theme.text.secondary }}
              >
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
                  className="group p-6 sm:p-8 rounded-2xl sm:rounded-3xl transition-all duration-300 border"
                  style={{
                    backgroundColor: theme.background.elevated,
                    borderColor: theme.border.primary,
                    boxShadow: theme.shadow.small
                  }}
                >
                  <div
                    className="mb-4 sm:mb-6 inline-flex p-3 sm:p-4 rounded-xl transition-transform duration-300 group-hover:scale-110"
                    style={{
                      backgroundColor: theme.gold.background,
                      color: theme.gold.primary
                    }}
                  >
                    {feature.icon}
                  </div>
                  <h3
                    className="text-lg sm:text-xl font-heading font-bold mb-3 tracking-tight"
                    style={{ color: theme.text.primary }}
                  >
                    {feature.title}
                  </h3>
                  <p
                    className="text-sm sm:text-base leading-relaxed font-display"
                    style={{ color: theme.text.secondary }}
                  >
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Team Collaboration Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.8 }}
            className="mt-20 sm:mt-24"
          >
            <div className="max-w-6xl mx-auto">
              <div
                className="relative overflow-hidden rounded-3xl sm:rounded-[3rem] p-8 sm:p-12 lg:p-16"
                style={{
                  backgroundImage: `linear-gradient(135deg, ${theme.gold.primary}15, ${theme.gold.rich}15)`,
                  border: `2px solid ${theme.gold.primary}30`,
                  boxShadow: theme.shadow.large
                }}
              >
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-64 h-64 opacity-10">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                  >
                    <FaUsers className="w-full h-full" style={{ color: theme.gold.primary }} />
                  </motion.div>
                </div>

                <div className="relative z-10 grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                  {/* Left Content */}
                  <div className="text-center lg:text-left">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6, delay: 2.0 }}
                      className="inline-flex items-center space-x-2 px-4 py-2 rounded-full mb-6 border"
                      style={{
                        backgroundColor: theme.gold.background,
                        borderColor: theme.gold.primary,
                        color: theme.gold.primary
                      }}
                    >
                      <FaUsers className="text-base" />
                      <span className="text-sm font-semibold">Team Collaboration</span>
                    </motion.div>

                    <h2
                      className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black mb-6 tracking-tight"
                      style={{ color: theme.text.primary }}
                    >
                      Work together with{' '}
                      <span className="text-gradient">your team</span>
                    </h2>

                    <p
                      className="text-base sm:text-lg lg:text-xl mb-8 leading-relaxed font-display"
                      style={{ color: theme.text.secondary }}
                    >
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
                          <div style={{ color: theme.gold.primary }}>
                            {item.icon}
                          </div>
                          <span
                            className="text-sm sm:text-base font-medium"
                            style={{ color: theme.text.primary }}
                          >
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
                        className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
                        style={{
                          backgroundColor: theme.gold.primary,
                          color: theme.text.inverse,
                          boxShadow: theme.shadow.medium
                        }}
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
                          { name: "Sarah Chen", role: "Owner", color: theme.gold.primary },
                          { name: "Mike Rodriguez", role: "Accountant", color: theme.gold.rich },
                          { name: "Emma Wilson", role: "Bookkeeper", color: theme.gold.primary }
                        ].map((member, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 2.2 + index * 0.15 }}
                            whileHover={{ scale: 1.02, y: -5 }}
                            className="p-6 rounded-2xl backdrop-blur-lg border"
                            style={{
                              backgroundColor: `${theme.background.elevated}95`,
                              borderColor: theme.border.primary,
                              boxShadow: theme.shadow.medium
                            }}
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
                                <div
                                  className="font-semibold text-base"
                                  style={{ color: theme.text.primary }}
                                >
                                  {member.name}
                                </div>
                                <div
                                  className="text-sm"
                                  style={{ color: theme.text.secondary }}
                                >
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
                        className="absolute -top-4 -right-4 px-4 py-2 rounded-full font-semibold text-sm shadow-lg"
                        style={{
                          backgroundColor: theme.gold.primary,
                          color: theme.text.inverse
                        }}
                      >
                        Unlimited Team
                      </motion.div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* How It Works Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.8 }}
            className="mt-20 sm:mt-24 text-center"
            id="how-it-works"
          >
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black mb-4 tracking-tight"
              style={{ color: theme.text.primary }}
            >
              How it works
            </h2>
            <p
              className="text-lg sm:text-xl mb-12 sm:mb-16 max-w-2xl mx-auto font-display"
              style={{ color: theme.text.secondary }}
            >
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
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center mb-6 relative"
                      style={{
                        backgroundImage: `linear-gradient(135deg, ${theme.gold.primary}, ${theme.gold.rich})`,
                        boxShadow: theme.shadow.large
                      }}
                    >
                      <div style={{ color: theme.text.inverse }}>
                        {item.icon}
                      </div>
                      <div
                        className="absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                        style={{
                          backgroundColor: theme.background.primary,
                          color: theme.gold.primary,
                          border: `2px solid ${theme.gold.primary}`
                        }}
                      >
                        {item.step}
                      </div>
                    </div>
                    <h3
                      className="text-xl sm:text-2xl font-heading font-bold mb-3 tracking-tight"
                      style={{ color: theme.text.primary }}
                    >
                      {item.title}
                    </h3>
                    <p
                      className="text-sm sm:text-base leading-relaxed font-display"
                      style={{ color: theme.text.secondary }}
                    >
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Download CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.4 }}
            className="mt-20 sm:mt-24 text-center"
            id="download"
          >
            <div
              className="p-8 sm:p-12 lg:p-16 rounded-3xl sm:rounded-[3rem] max-w-4xl mx-auto"
              style={{
                backgroundImage: `linear-gradient(135deg, ${theme.gold.primary}, ${theme.gold.rich})`,
                boxShadow: theme.shadow.large
              }}
            >
              <h2
                className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black mb-4 tracking-tight"
                style={{ color: theme.text.inverse }}
              >
                Get started for free
              </h2>
              <p
                className="text-lg sm:text-xl mb-8 sm:mb-10 opacity-95 font-display max-w-2xl mx-auto"
                style={{ color: theme.text.inverse }}
              >
                Join thousands of business owners who trust ReceiptGold for their expense tracking
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

              <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-sm font-medium" style={{ color: theme.text.inverse }}>
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
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-6xl opacity-10"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                color: theme.gold.primary
              }}
              animate={{
                y: [0, -20, 0],
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 0.9, 1],
              }}
              transition={{
                duration: 5 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            >
              <FaReceipt />
            </motion.div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 2.8 }}
        className="relative z-10 mt-20 sm:mt-24 border-t"
        style={{ borderColor: theme.border.primary }}
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
                <span
                  className="text-xl font-heading font-bold"
                  style={{ color: theme.text.primary }}
                >
                  ReceiptGold
                </span>
              </div>
              <p
                className="text-sm leading-relaxed max-w-sm mb-4"
                style={{ color: theme.text.secondary }}
              >
                The ultimate expense management app for LLC owners and small business. Capture receipts, track expenses, and maximize deductions.
              </p>
              <div className="flex items-center space-x-2 text-xs" style={{ color: theme.text.tertiary }}>
                <FaStar style={{ color: theme.gold.primary }} />
                <span className="font-semibold" style={{ color: theme.text.primary }}>4.8/5</span>
                <span>• 10K+ business owners</span>
              </div>
            </div>

            {/* Product Column */}
            <div>
              <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider" style={{ color: theme.text.primary }}>
                Product
              </h4>
              <ul className="space-y-2 text-sm" style={{ color: theme.text.secondary }}>
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
              </ul>
            </div>

            {/* Company Column */}
            <div>
              <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider" style={{ color: theme.text.primary }}>
                Company
              </h4>
              <ul className="space-y-2 text-sm" style={{ color: theme.text.secondary }}>
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
          <div
            className="pt-8 border-t flex flex-col sm:flex-row justify-between items-center gap-4"
            style={{ borderColor: theme.border.primary }}
          >
            <p className="text-sm" style={{ color: theme.text.tertiary }}>
              © 2025 ReceiptGold by{' '}
              <a
                href="https://www.gregdavistech.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-70 transition-opacity"
                style={{ color: theme.gold.primary }}
              >
                GregDavisTech, LLC
              </a>
            </p>
            <div className="flex items-center space-x-4 text-xs" style={{ color: theme.text.tertiary }}>
              <span>Available on iOS & Android</span>
              <span>•</span>
              <span>Made for Business Owners</span>
            </div>
          </div>
        </div>
      </motion.footer>
    </div>
  );
}
