'use client';

import { motion } from 'framer-motion';
import { FaApple, FaGooglePlay, FaReceipt, FaStar, FaCheckCircle, FaMoon, FaSun } from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi';
import { BsPhone, BsCloudUpload, BsShield } from 'react-icons/bs';
import { useTheme } from './theme/theme';
import Image from 'next/image';

export default function Home() {
  const { theme, themeMode, toggleTheme } = useTheme();

  return (
    <div 
      className="min-h-screen transition-colors duration-300"
      style={{ backgroundColor: theme.background.primary }}
    >
      {/* Header */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 p-4 sm:p-6"
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
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
          <div className="flex items-center space-x-4">
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
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="px-3 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium"
              style={{ 
                backgroundColor: theme.gold.primary,
                color: theme.text.inverse 
              }}
            >
              Coming Soon
            </motion.div>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <main className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
          <div className="text-center">
            {/* Animated Logo */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="mb-6 sm:mb-8 flex justify-center"
            >
              <div className="relative">
                <div 
                  className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl sm:rounded-3xl flex items-center justify-center p-2"
                  style={{ 
                    backgroundImage: `linear-gradient(135deg, ${theme.gold.primary}, ${theme.gold.rich})`,
                    boxShadow: theme.shadow.large
                  }}
                >
                  <div className="w-full h-full relative">
                    <Image
                      src="/images/logo.jpg"
                      alt="ReceiptGold Logo"
                      fill
                      className="object-contain rounded-xl sm:rounded-2xl"
                    />
                  </div>
                </div>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2"
                >
                  <HiSparkles 
                    className="text-xl sm:text-3xl" 
                    style={{ color: theme.gold.primary }}
                  />
                </motion.div>
              </div>
            </motion.div>

            {/* Main Title */}
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl sm:text-7xl md:text-9xl font-heading font-black mb-6 sm:mb-8 px-2 tracking-tighter leading-none"
            >
              <span className="text-gradient">
                ReceiptGold
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl sm:text-3xl md:text-4xl mb-10 sm:mb-16 max-w-4xl mx-auto leading-relaxed px-4 font-display font-medium"
              style={{ color: theme.text.secondary }}
            >
              The ultimate expense management app for{' '}
              <span 
                className="font-bold text-gradient"
              >
                LLC owners
              </span>. 
              <br className="hidden sm:block" />
              Streamline your business receipts, track deductions, and simplify tax season.
            </motion.p>

            {/* Coming Soon Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="inline-flex items-center space-x-3 glass-effect px-6 sm:px-10 py-4 sm:py-6 rounded-full mb-16 sm:mb-20 mx-4 border border-opacity-20"
              style={{ 
                borderColor: theme.gold.primary,
                boxShadow: `0 8px 32px rgba(184, 134, 11, 0.1), ${theme.shadow.large}`
              }}
            >
              <HiSparkles 
                className="text-lg sm:text-xl" 
                style={{ color: theme.gold.primary }}
              />
              <span 
                className="text-base sm:text-xl font-display font-semibold tracking-wide"
                style={{ color: theme.text.primary }}
              >
                Coming Soon for Business Owners
              </span>
              <HiSparkles 
                className="text-lg sm:text-xl" 
                style={{ color: theme.gold.primary }}
              />
            </motion.div>

          </div>

          {/* Features Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="grid gap-6 sm:gap-8 max-w-5xl mx-auto px-4"
          >
            {[
              {
                icon: <BsPhone className="text-2xl sm:text-3xl" />,
                title: "Mobile Business Management",
                description: "Manage your LLC expenses on-the-go with powerful mobile tools designed for business owners."
              },
              {
                icon: <BsCloudUpload className="text-2xl sm:text-3xl" />,
                title: "Automated Categorization",
                description: "Smart AI automatically categorizes your business expenses for easy tax preparation and reporting."
              },
              {
                icon: <BsShield className="text-2xl sm:text-3xl" />,
                title: "IRS-Compliant Storage",
                description: "Secure, encrypted storage that meets IRS requirements for digital receipt retention."
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group p-8 sm:p-10 rounded-3xl sm:rounded-[2rem] transition-all duration-500 glass-effect hover:shadow-2xl border border-opacity-10"
                style={{ 
                  borderColor: theme.gold.primary,
                  boxShadow: `0 4px 24px rgba(184, 134, 11, 0.05), ${theme.shadow.medium}`
                }}
              >
                <div 
                  className="mb-6 sm:mb-8 flex justify-center transform group-hover:scale-110 transition-transform duration-300"
                  style={{ color: theme.gold.primary }}
                >
                  <div className="text-3xl sm:text-4xl p-4 rounded-2xl" style={{ backgroundColor: `${theme.gold.primary}15` }}>
                    {feature.icon}
                  </div>
                </div>
                <h3 
                  className="text-xl sm:text-2xl font-heading font-bold mb-4 sm:mb-6 tracking-tight"
                  style={{ color: theme.text.primary }}
                >
                  {feature.title}
                </h3>
                <p 
                  className="text-base sm:text-lg leading-relaxed font-display"
                  style={{ color: theme.text.secondary }}
                >
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* How Does It Work Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.5 }}
            className="mt-16 sm:mt-20 text-center px-4"
          >
            <h2 
              className="text-4xl sm:text-6xl md:text-7xl font-heading font-black mb-6 sm:mb-8 tracking-tighter"
              style={{ color: theme.text.primary }}
            >
              How Does It Work?
            </h2>
            <p 
              className="text-xl sm:text-2xl md:text-3xl mb-16 sm:mb-20 max-w-4xl mx-auto leading-relaxed font-display font-medium"
              style={{ color: theme.text.secondary }}
            >
              Transform your business expense management in just a few simple steps
            </p>
            
            {/* Step-by-Step Process */}
            <div className="max-w-6xl mx-auto">
              {[
                {
                  step: "01",
                  icon: <FaReceipt className="text-3xl sm:text-4xl" />,
                  title: "Scan Your Receipt",
                  description: "Simply take a photo of any business receipt with your phone. Our advanced OCR technology instantly extracts vendor, amount, date, and item details with 99% accuracy."
                },
                {
                  step: "02", 
                  icon: <HiSparkles className="text-3xl sm:text-4xl" />,
                  title: "Auto-Categorize",
                  description: "Smart AI automatically categorizes your expense (meals, travel, supplies, etc.) and determines tax deductibility. Perfect for LLC owners who need IRS-compliant organization."
                },
                {
                  step: "03",
                  icon: <BsCloudUpload className="text-3xl sm:text-4xl" />,
                  title: "Secure Storage",
                  description: "All receipts are encrypted and stored in IRS-compliant cloud storage. Access your expense history anytime, anywhere with automatic backup and sync across devices."
                },
                {
                  step: "04",
                  icon: <FaStar className="text-3xl sm:text-4xl" />,
                  title: "Generate Reports",
                  description: "Create detailed expense reports, track monthly spending, and export tax-ready documents. Get quarterly summaries and maximize your business deductions with ease."
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 1.8 + index * 0.2 }}
                  className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-8 sm:gap-12 mb-12 sm:mb-20`}
                >
                  {/* Step Content */}
                  <div className="flex-1 text-left">
                    <div className="flex items-center space-x-4 mb-4">
                      <div 
                        className="text-sm sm:text-base font-bold px-3 py-1 rounded-full"
                        style={{ 
                          backgroundColor: theme.gold.primary,
                          color: theme.text.inverse 
                        }}
                      >
                        STEP {item.step}
                      </div>
                    </div>
                    <h3 
                      className="text-3xl sm:text-4xl font-heading font-bold mb-6 tracking-tight"
                      style={{ color: theme.text.primary }}
                    >
                      {item.title}
                    </h3>
                    <p 
                      className="text-lg sm:text-xl leading-relaxed font-display"
                      style={{ color: theme.text.secondary }}
                    >
                      {item.description}
                    </p>
                  </div>

                  {/* Step Visual */}
                  <div className="flex-shrink-0">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-3xl sm:rounded-full flex items-center justify-center"
                      style={{ 
                        backgroundImage: `linear-gradient(135deg, ${theme.gold.primary}, ${theme.gold.rich})`,
                        boxShadow: theme.shadow.large
                      }}
                    >
                      <div style={{ color: theme.text.inverse }}>
                        {item.icon}
                      </div>
                      
                      {/* Floating animation elements */}
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                        className="absolute -top-2 -right-2 w-6 h-6 sm:w-8 sm:h-8 rounded-full"
                        style={{ backgroundColor: theme.gold.primary, opacity: 0.3 }}
                      />
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                        className="absolute -bottom-1 -left-1 w-4 h-4 sm:w-6 sm:h-6 rounded-full"
                        style={{ backgroundColor: theme.gold.rich, opacity: 0.4 }}
                      />
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Process Summary */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 2.6 }}
              className="mt-12 sm:mt-16 p-6 sm:p-8 rounded-2xl sm:rounded-3xl max-w-4xl mx-auto"
              style={{ 
                backgroundColor: theme.background.elevated,
                boxShadow: theme.shadow.medium
              }}
            >
              <h3 
                className="text-xl sm:text-2xl font-bold mb-4"
                style={{ color: theme.text.primary }}
              >
                It&apos;s That Simple!
              </h3>
              <p 
                className="text-base sm:text-lg mb-6"
                style={{ color: theme.text.secondary }}
              >
                From receipt capture to tax-ready reports in seconds. Built specifically for LLC owners who need efficient, compliant expense tracking.
              </p>
              
              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                {[
                  { number: "99%", label: "OCR Accuracy" },
                  { number: "5sec", label: "Process Time" },
                  { number: "IRS", label: "Compliant" },
                  { number: "24/7", label: "Cloud Access" }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 2.8 + index * 0.1 }}
                    className="text-center"
                  >
                    <div 
                      className="text-2xl sm:text-3xl font-bold"
                      style={{ color: theme.gold.primary }}
                    >
                      {stat.number}
                    </div>
                    <div 
                      className="text-xs sm:text-sm font-medium"
                      style={{ color: theme.text.secondary }}
                    >
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Benefits */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 3.0 }}
            className="mt-16 sm:mt-20 text-center px-4"
          >
            <h2 
              className="text-4xl sm:text-6xl font-heading font-black mb-12 sm:mb-16 tracking-tighter"
              style={{ color: theme.text.primary }}
            >
              Perfect for <span className="text-gradient">LLC Owners</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-6xl mx-auto">
              {[
                { icon: <FaCheckCircle />, text: "Capture receipts instantly with your phone" },
                { icon: <FaStar />, text: "Track business vs personal expenses" },
                { icon: <FaCheckCircle />, text: "Generate reports for tax season" },
                { icon: <FaStar />, text: "Maximize your business deductions" }
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 3.2 + index * 0.1 }}
                  className="flex items-center space-x-4 px-6 sm:px-8 py-4 sm:py-6 rounded-2xl glass-effect border border-opacity-10 hover:border-opacity-20 transition-all duration-300"
                  style={{ 
                    borderColor: theme.gold.primary,
                    boxShadow: `0 4px 16px rgba(184, 134, 11, 0.05)`
                  }}
                >
                  <div 
                    className="text-lg sm:text-xl flex-shrink-0"
                    style={{ color: theme.gold.primary }}
                  >
                    {benefit.icon}
                  </div>
                  <span 
                    className="text-base sm:text-lg font-display font-semibold text-left"
                    style={{ color: theme.text.primary }}
                  >
                    {benefit.text}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* App Store Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 3.4 }}
            className="mt-16 sm:mt-20 text-center px-4"
          >
            <h2 
              className="text-4xl sm:text-5xl font-heading font-black mb-12 sm:mb-16 tracking-tighter"
              style={{ color: theme.text.primary }}
            >
              Get <span className="text-gradient">ReceiptGold</span>
            </h2>
            <div className="flex flex-col space-y-4 justify-center items-center max-w-md mx-auto">
              <motion.a
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href="#"
                className="flex items-center space-x-4 px-8 sm:px-10 py-4 sm:py-5 rounded-2xl transition-all duration-300 w-full font-display font-semibold text-lg hover:scale-105 hover:shadow-2xl"
                style={{ 
                  backgroundColor: '#000000',
                  color: '#FFFFFF',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
                }}
              >
                <FaApple className="text-2xl sm:text-3xl" />
                <div className="text-left">
                  <div className="text-xs sm:text-sm opacity-80">Download on the</div>
                  <div className="text-lg sm:text-xl font-semibold">App Store</div>
                </div>
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href="#"
                className="flex items-center space-x-4 px-8 sm:px-10 py-4 sm:py-5 rounded-2xl transition-all duration-300 w-full font-display font-semibold text-lg hover:scale-105 hover:shadow-2xl"
                style={{ 
                  backgroundImage: 'linear-gradient(135deg, #34C759, #007AFF)',
                  color: '#FFFFFF',
                  boxShadow: '0 8px 32px rgba(52, 199, 89, 0.3)'
                }}
              >
                <FaGooglePlay className="text-2xl sm:text-3xl" />
                <div className="text-left">
                  <div className="text-xs sm:text-sm opacity-90">Get it on</div>
                  <div className="text-lg sm:text-xl font-semibold">Google Play</div>
                </div>
              </motion.a>
            </div>
          </motion.div>

          {/* Notification Signup */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 3.6 }}
            className="mt-16 sm:mt-20 text-center px-4"
          >
            <div 
              className="p-6 sm:p-12 rounded-2xl sm:rounded-3xl max-w-2xl mx-auto"
              style={{ 
                backgroundImage: `linear-gradient(135deg, ${theme.gold.primary}, ${theme.gold.rich})`,
                boxShadow: theme.shadow.large
              }}
            >
              <h3 
                className="text-3xl sm:text-4xl font-heading font-black mb-4 sm:mb-6 tracking-tight"
                style={{ color: theme.text.inverse }}
              >
                Get Early Access
              </h3>
              <p 
                className="mb-8 sm:mb-10 text-lg sm:text-xl opacity-95 font-display"
                style={{ color: theme.text.inverse }}
              >
                Join the waitlist and be among the first LLC owners to streamline your business expenses!
              </p>
              <div className="flex flex-col space-y-3 sm:space-y-4">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="w-full px-6 sm:px-8 py-4 sm:py-5 rounded-2xl text-lg sm:text-xl focus:outline-none transition-all duration-300 font-display placeholder:opacity-70"
                  style={{ 
                    backgroundColor: theme.background.primary,
                    color: theme.text.primary,
                    border: `2px solid rgba(184, 134, 11, 0.2)`,
                    boxShadow: '0 4px 16px rgba(184, 134, 11, 0.1)'
                  }}
                  onFocus={(e) => {
                    e.target.style.border = `2px solid ${theme.gold.primary}`;
                    e.target.style.boxShadow = `0 8px 24px rgba(184, 134, 11, 0.2)`;
                  }}
                  onBlur={(e) => {
                    e.target.style.border = '2px solid rgba(184, 134, 11, 0.2)';
                    e.target.style.boxShadow = '0 4px 16px rgba(184, 134, 11, 0.1)';
                  }}
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full px-8 sm:px-10 py-4 sm:py-5 rounded-2xl font-display font-bold text-lg sm:text-xl transition-all duration-300 hover:shadow-2xl"
                  style={{ 
                    backgroundColor: theme.background.primary,
                    color: theme.gold.primary,
                    boxShadow: '0 8px 24px rgba(184, 134, 11, 0.2)'
                  }}
                >
                  Join Waitlist
                </motion.button>
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
        transition={{ duration: 0.6, delay: 3.8 }}
        className="relative z-10 py-8 sm:py-12 text-center px-4"
      >
        <div className="max-w-7xl mx-auto">
          <p 
            className="text-base sm:text-lg"
            style={{ color: theme.text.secondary }}
          >
            © 2025 ReceiptGold. Expense management made simple for LLC owners - coming soon!
          </p>
          <div className="flex justify-center items-center space-x-2 mt-3 sm:mt-4">
            <div className="w-4 h-4 sm:w-5 sm:h-5 relative">
              <Image
                src="/images/logo.jpg"
                alt="ReceiptGold Logo"
                fill
                className="object-contain rounded"
              />
            </div>
            <span 
              className="font-medium text-sm sm:text-base"
              style={{ color: theme.gold.primary }}
            >
              Streamline your business expenses on iOS & Android
            </span>
          </div>
          <div 
            className="mt-4 sm:mt-6 pt-3 sm:pt-4"
            style={{ borderTop: `1px solid ${theme.border.primary}` }}
          >
            <a 
              href="https://www.gregdavistech.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-xs sm:text-sm transition-colors duration-300 hover:opacity-80"
              style={{ color: theme.text.tertiary }}
            >
              GregDavisTech, LLC 2025
            </a>
          </div>
        </div>
      </motion.footer>
    </div>
  );
}
