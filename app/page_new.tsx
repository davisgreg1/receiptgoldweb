'use client';

import { motion } from 'framer-motion';
import { FaApple, FaGooglePlay, FaReceipt, FaStar } from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi';
import { MdPhoneAndroid, MdIosShare } from 'react-icons/md';

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      rotate: [0, 5, -5, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const sparkleVariants = {
    animate: {
      scale: [1, 1.2, 1],
      opacity: [0.7, 1, 0.7],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 flex items-center justify-center p-4 overflow-hidden relative">
      {/* Background decorative elements */}
      <motion.div
        className="absolute top-20 left-20 text-yellow-400 opacity-30"
        variants={sparkleVariants}
        animate="animate"
      >
        <HiSparkles size={40} />
      </motion.div>
      <motion.div
        className="absolute top-40 right-32 text-amber-400 opacity-30"
        variants={sparkleVariants}
        animate="animate"
        style={{ animationDelay: '1s' }}
      >
        <HiSparkles size={24} />
      </motion.div>
      <motion.div
        className="absolute bottom-32 left-32 text-orange-400 opacity-30"
        variants={sparkleVariants}
        animate="animate"
        style={{ animationDelay: '2s' }}
      >
        <HiSparkles size={32} />
      </motion.div>
      <motion.div
        className="absolute bottom-20 right-20 text-yellow-500 opacity-30"
        variants={sparkleVariants}
        animate="animate"
        style={{ animationDelay: '0.5s' }}
      >
        <HiSparkles size={28} />
      </motion.div>

      {/* Floating receipt icons */}
      <motion.div
        className="absolute top-24 right-16 text-amber-300 opacity-20"
        variants={floatingVariants}
        animate="animate"
      >
        <FaReceipt size={60} />
      </motion.div>
      <motion.div
        className="absolute bottom-24 left-16 text-yellow-300 opacity-20"
        variants={floatingVariants}
        animate="animate"
        style={{ animationDelay: '3s' }}
      >
        <FaReceipt size={45} />
      </motion.div>

      {/* Main content */}
      <motion.div
        className="text-center max-w-4xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Logo/Icon */}
        <motion.div
          className="mb-8"
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-2xl shadow-lg mb-6">
            <FaReceipt className="text-white text-4xl" />
          </div>
        </motion.div>

        {/* Main heading */}
        <motion.h1
          className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-amber-600 via-yellow-600 to-orange-600 bg-clip-text text-transparent mb-4"
          variants={itemVariants}
        >
          ReceiptGold
        </motion.h1>

        {/* Subheading */}
        <motion.p
          className="text-xl md:text-2xl text-gray-700 mb-2"
          variants={itemVariants}
        >
          The Ultimate Receipt Management App
        </motion.p>

        {/* Coming Soon badge */}
        <motion.div
          className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-400 to-yellow-500 text-white px-6 py-3 rounded-full text-lg font-semibold shadow-lg mb-8"
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <HiSparkles className="text-xl" />
          Coming Soon
          <HiSparkles className="text-xl" />
        </motion.div>

        {/* Description */}
        <motion.p
          className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed"
          variants={itemVariants}
        >
          Transform the way you manage receipts with our intelligent scanning, 
          automatic categorization, and powerful expense tracking. Never lose 
          another receipt again!
        </motion.p>

        {/* Features */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          variants={itemVariants}
        >
          <motion.div
            className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-amber-100"
            whileHover={{ y: -5, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <FaReceipt className="text-amber-600 text-xl" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Smart Scanning</h3>
            <p className="text-gray-600">AI-powered receipt scanning and data extraction</p>
          </motion.div>

          <motion.div
            className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-yellow-100"
            whileHover={{ y: -5, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <FaStar className="text-yellow-600 text-xl" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Auto Categorization</h3>
            <p className="text-gray-600">Intelligent expense categorization and tracking</p>
          </motion.div>

          <motion.div
            className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-orange-100"
            whileHover={{ y: -5, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <HiSparkles className="text-orange-600 text-xl" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Cloud Sync</h3>
            <p className="text-gray-600">Seamless synchronization across all devices</p>
          </motion.div>
        </motion.div>

        {/* App Store Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          variants={itemVariants}
        >
          <motion.a
            href="#"
            className="inline-flex items-center gap-3 bg-black text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-shadow group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaApple className="text-2xl group-hover:scale-110 transition-transform" />
            <div className="text-left">
              <div className="text-xs text-gray-300">Download on the</div>
              <div>App Store</div>
            </div>
          </motion.a>

          <motion.a
            href="https://play.google.com/store/apps/details?id=com.receiptgold.app"
            className="inline-flex items-center gap-3 bg-green-600 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-shadow group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaGooglePlay className="text-2xl group-hover:scale-110 transition-transform" />
            <div className="text-left">
              <div className="text-xs text-green-100">Get it on</div>
              <div>Google Play</div>
            </div>
          </motion.a>
        </motion.div>

        {/* Platform icons */}
        <motion.div
          className="flex justify-center gap-6 mt-8 text-gray-400"
          variants={itemVariants}
        >
          <motion.div whileHover={{ scale: 1.2, color: "#374151" }}>
            <MdIosShare size={32} />
          </motion.div>
          <motion.div whileHover={{ scale: 1.2, color: "#374151" }}>
            <MdPhoneAndroid size={32} />
          </motion.div>
        </motion.div>

        {/* Email signup */}
        <motion.div
          className="mt-12 max-w-md mx-auto"
          variants={itemVariants}
        >
          <p className="text-gray-600 mb-4">Get notified when we launch</p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
            <motion.button
              className="bg-gradient-to-r from-amber-500 to-yellow-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-amber-600 hover:to-yellow-600 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Notify Me
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
