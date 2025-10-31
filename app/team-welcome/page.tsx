'use client';

import { motion } from 'framer-motion';
import { FaReceipt, FaCheckCircle, FaUsers, FaDownload } from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi';
import { BsPhone } from 'react-icons/bs';
import { useTheme } from '../theme/theme';

export default function TeamWelcomePage() {
  const { theme } = useTheme();

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4"
      style={{ backgroundColor: theme.background.primary }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl w-full text-center"
      >
        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8 flex justify-center"
        >
          <div className="relative">
            <div 
              className="w-32 h-32 rounded-full flex items-center justify-center"
              style={{ 
                backgroundImage: `linear-gradient(135deg, ${theme.gold.primary}, ${theme.gold.rich})`,
                boxShadow: theme.shadow.large
              }}
            >
              <FaCheckCircle 
                className="text-6xl" 
                style={{ color: theme.text.inverse }}
              />
            </div>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -top-2 -right-2"
            >
              <HiSparkles 
                className="text-3xl" 
                style={{ color: theme.gold.primary }}
              />
            </motion.div>
          </div>
        </motion.div>

        {/* Welcome Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <h1 
            className="text-4xl sm:text-5xl font-bold mb-4"
            style={{ color: theme.text.primary }}
          >
            Welcome to the Team! 🎉
          </h1>
          <p 
            className="text-xl mb-8"
            style={{ color: theme.text.secondary }}
          >
            You&apos;ve successfully joined the ReceiptGold team. Start tracking your business expenses right away!
          </p>
        </motion.div>

        {/* Next Steps Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="p-8 rounded-3xl mb-8"
          style={{ 
            backgroundColor: theme.background.elevated,
            boxShadow: theme.shadow.large 
          }}
        >
          <div className="flex items-center justify-center mb-6">
            <FaUsers 
              className="text-3xl mr-3"
              style={{ color: theme.gold.primary }}
            />
            <h2 
              className="text-2xl font-bold"
              style={{ color: theme.text.primary }}
            >
              What&apos;s Next?
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              {
                icon: <BsPhone className="text-2xl" />,
                title: "Download the App",
                description: "Get the ReceiptGold mobile app to start capturing receipts on the go"
              },
              {
                icon: <FaReceipt className="text-2xl" />,
                title: "Start Adding Receipts", 
                description: "Begin tracking your business expenses for your assigned company"
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                className="p-6 rounded-2xl text-center"
                style={{ 
                  backgroundColor: theme.background.secondary,
                  border: `1px solid ${theme.border.primary}`
                }}
              >
                <div 
                  className="mb-4 flex justify-center"
                  style={{ color: theme.gold.primary }}
                >
                  {step.icon}
                </div>
                <h3 
                  className="text-lg font-semibold mb-2"
                  style={{ color: theme.text.primary }}
                >
                  {step.title}
                </h3>
                <p 
                  className="text-sm"
                  style={{ color: theme.text.secondary }}
                >
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* App Download Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="space-y-4"
        >
          <h3 
            className="text-xl font-semibold mb-6"
            style={{ color: theme.text.primary }}
          >
            Download ReceiptGold
          </h3>
          
          <div className="flex flex-col space-y-4 max-w-md mx-auto">
            <motion.a
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              href="https://apps.apple.com/us/app/receiptgold/id6751426301"
              className="flex items-center space-x-3 px-6 py-4 rounded-2xl transition-all duration-300"
              style={{ 
                backgroundColor: '#000000',
                color: '#FFFFFF',
                boxShadow: theme.shadow.large
              }}
            >
              <FaDownload className="text-2xl" />
              <div className="text-left">
                <div className="text-sm opacity-80">Download on the</div>
                <div className="text-xl font-semibold">App Store</div>
              </div>
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              href="#"
              className="flex items-center space-x-3 px-6 py-4 rounded-2xl transition-all duration-300"
              style={{ 
                backgroundImage: 'linear-gradient(135deg, #34C759, #007AFF)',
                color: '#FFFFFF',
                boxShadow: theme.shadow.large
              }}
            >
              <FaDownload className="text-2xl" />
              <div className="text-left">
                <div className="text-sm opacity-90">Get it on</div>
                <div className="text-xl font-semibold">Google Play</div>
              </div>
            </motion.a>
          </div>
        </motion.div>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="mt-12 p-6 rounded-2xl"
          style={{ 
            backgroundColor: theme.background.secondary,
            border: `1px solid ${theme.border.primary}`
          }}
        >
          <p 
            className="text-sm"
            style={{ color: theme.text.secondary }}
          >
            Need help getting started? Contact your team administrator or reach out to our support team.
          </p>
          <p 
            className="text-xs mt-2"
            style={{ color: theme.text.tertiary }}
          >
            You can now close this browser window and use the mobile app to access your account.
          </p>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="mt-8"
        >
          <div className="flex items-center justify-center space-x-2">
            <FaReceipt style={{ color: theme.gold.primary }} />
            <span 
              className="font-medium text-sm"
              style={{ color: theme.gold.primary }}
            >
              ReceiptGold - Transform Your Business Receipts Into Digital Gold
            </span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}