"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  FaTrashAlt,
  FaMobileAlt,
  FaEnvelope,
  FaShieldAlt,
  FaExclamationTriangle,
  FaCheckCircle,
} from "react-icons/fa";

export default function DeleteAccountPage() {
  return (
    <div className="min-h-screen transition-colors duration-300 bg-background-primary text-text-primary">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 p-4 sm:p-6"
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link
            href="/"
            className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 relative">
              <Image
                src="/images/logo.jpg"
                alt="ReceiptGold Logo"
                fill
                className="object-contain rounded-lg"
              />
            </div>
            <span
              className="text-lg sm:text-2xl font-heading font-bold tracking-tight text-text-primary"
            >
              ReceiptGold
            </span>
          </Link>
          <Link
            href="/"
            className="px-4 py-2 rounded-lg transition-colors duration-300 bg-gold-primary text-text-inverse"
          >
            Back to Home
          </Link>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
        {/* Title Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div
            className="w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center bg-status-error/10"
          >
            <FaTrashAlt
              className="text-4xl text-status-error"
            />
          </div>
          <h1
            className="text-4xl sm:text-6xl font-heading font-black mb-4 tracking-tight text-text-primary"
          >
            Account Deletion
          </h1>
          <p
            className="text-lg sm:text-xl max-w-3xl mx-auto text-text-secondary"
          >
            We respect your right to delete your account and personal data at
            any time.
          </p>
        </motion.div>

        {/* Delete In-App Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8 rounded-2xl border overflow-hidden bg-background-secondary border-border-primary"
        >
          <div
            className="p-6 border-b bg-gold-background border-border-primary"
          >
            <div className="flex items-center space-x-4">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center bg-gold-primary/20"
              >
                <FaMobileAlt
                  className="text-xl text-gold-primary"
                />
              </div>
              <div>
                <h2
                  className="text-2xl font-heading font-bold text-text-primary"
                >
                  Delete Your Account In-App
                </h2>
                <p className="text-sm text-text-secondary">
                  Recommended method - fastest and most secure
                </p>
              </div>
            </div>
          </div>

          <div className="p-6">
            <p
              className="mb-6 leading-relaxed text-text-secondary"
            >
              You can delete your account directly from the ReceiptGold mobile
              app by following these simple steps:
            </p>

            <ol className="space-y-4 mb-6">
              {[
                { step: 1, text: "Open the ReceiptGold app on your device" },
                {
                  step: 2,
                  text: "Navigate to the Settings screen (tap the gear icon)",
                },
                { step: 3, text: "Scroll down to the Account section" },
                { step: 4, text: 'Tap on "Delete Account"' },
                { step: 5, text: "Enter your password to confirm" },
                {
                  step: 6,
                  text: "Your account and all associated data will be permanently deleted",
                },
              ].map((item) => (
                <li key={item.step} className="flex items-start space-x-4">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1 font-bold text-sm bg-gold-primary text-text-inverse"
                  >
                    {item.step}
                  </div>
                  <span
                    className="leading-relaxed pt-1 text-text-secondary"
                  >
                    {item.text}
                  </span>
                </li>
              ))}
            </ol>

            <div
              className="p-4 rounded-xl border-l-4 bg-gold-background border-gold-primary"
            >
              <div className="flex items-start space-x-3">
                <FaCheckCircle
                  className="text-xl flex-shrink-0 mt-0.5 text-gold-primary"
                />
                <p
                  className="text-sm leading-relaxed text-text-secondary"
                >
                  <strong className="text-text-primary">
                    Important:
                  </strong>{" "}
                  {`If you have an active subscription, you'll be provided with instructions on how to cancel it before account deletion. Deleting your account will permanently remove all your receipts, data, and settings.`}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Request via Email Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-8 rounded-2xl border overflow-hidden bg-background-secondary border-border-primary"
        >
          <div
            className="p-6 border-b border-border-primary"
          >
            <div className="flex items-center space-x-4">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center bg-gold-background"
              >
                <FaEnvelope
                  className="text-xl text-gold-primary"
                />
              </div>
              <div>
                <h2
                  className="text-2xl font-heading font-bold text-text-primary"
                >
                  Request Deletion via Email
                </h2>
                <p className="text-sm text-text-secondary">
                  Alternative method if you need assistance
                </p>
              </div>
            </div>
          </div>

          <div className="p-6">
            <p
              className="mb-6 leading-relaxed text-text-secondary"
            >
              {`If you're unable to delete your account in-app or need assistance, you can request account deletion by contacting our support team:`}
            </p>

            <div
              className="p-6 rounded-xl text-center mb-6 bg-gold-background"
            >
              <p
                className="text-sm mb-2 text-text-secondary"
              >
                Email us at:
              </p>
              <a
                href="mailto:support@receiptgold.com?subject=Account%20Deletion%20Request"
                className="text-2xl font-bold hover:opacity-80 transition-opacity text-gold-primary"
              >
                support@receiptgold.com
              </a>
            </div>

            <div
              className="p-4 rounded-xl bg-background-primary"
            >
              <p
                className="text-sm font-semibold mb-2 text-text-primary"
              >
                Please include the following in your email:
              </p>
              <ul className="space-y-2 ml-2">
                {[
                  'Email subject: "Account Deletion Request"',
                  "The email address associated with your ReceiptGold account",
                  "Confirmation that you want to permanently delete your account and all data",
                  "Your reason for deletion (optional, helps us improve)",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start space-x-3">
                    <span
                      className="mt-1 flex-shrink-0 font-bold text-gold-primary"
                    >
                      •
                    </span>
                    <span
                      className="text-sm leading-relaxed text-text-secondary"
                    >
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <p
              className="mt-4 text-sm leading-relaxed text-text-secondary"
            >
              We will process your request within 30 days and send you a
              confirmation email once your account has been deleted.
            </p>
          </div>
        </motion.div>

        {/* What Gets Deleted Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-8 rounded-2xl border overflow-hidden bg-background-secondary border-border-primary"
        >
          <div
            className="p-6 border-b border-border-primary"
          >
            <div className="flex items-center space-x-4">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center bg-gold-background"
              >
                <FaShieldAlt
                  className="text-xl text-gold-primary"
                />
              </div>
              <div>
                <h2
                  className="text-2xl font-heading font-bold text-text-primary"
                >
                  What Data Gets Deleted
                </h2>
              </div>
            </div>
          </div>

          <div className="p-6">
            <p
              className="mb-4 leading-relaxed text-text-secondary"
            >
              When you delete your account, the following data will be
              permanently removed:
            </p>

            <ul className="space-y-2 ml-2">
              {[
                "All receipt images and scanned documents",
                "All extracted receipt data (amounts, dates, vendors, categories)",
                "All expense reports and exported documents",
                "Your profile information and account settings",
                "Team data and collaboration history",
                "Financial connection tokens (if applicable)",
                "All usage data and preferences",
                "Push notification tokens and device information",
              ].map((item, idx) => (
                <li key={idx} className="flex items-start space-x-3">
                  <span
                    className="mt-1 flex-shrink-0 font-bold text-gold-primary"
                  >
                    •
                  </span>
                  <span
                    className="leading-relaxed text-text-secondary"
                  >
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            <div
              className="mt-6 p-4 rounded-xl border-l-4 bg-status-error/10 border-status-error"
            >
              <div className="flex items-start space-x-3">
                <FaExclamationTriangle
                  className="text-xl flex-shrink-0 mt-0.5 text-status-error"
                />
                <div>
                  <p
                    className="text-sm font-semibold mb-2 text-text-primary"
                  >
                    This action is irreversible!
                  </p>
                  <p
                    className="text-sm leading-relaxed text-text-secondary"
                  >
                    Once your account is deleted, all your data will be
                    permanently removed from our servers within 30 days and
                    cannot be recovered. Please export any important receipts or
                    reports before deleting your account.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Footer CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="p-8 rounded-2xl text-center border-t border-border-primary"
        >
          <div className="flex justify-center mb-4">
            <FaShieldAlt
              className="text-3xl text-gold-primary"
            />
          </div>
          <h3
            className="text-2xl font-heading font-bold mb-2 text-text-primary"
          >
            Questions about account deletion?
          </h3>
          <p className="text-lg mb-6 text-text-secondary">
            Contact our support team at support@receiptgold.com
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/privacy-policy"
              className="inline-block px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 bg-background-secondary text-text-primary border border-border-primary"
            >
              View Privacy Policy
            </Link>
            <Link
              href="/"
              className="inline-block px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 bg-gold-primary text-text-inverse"
            >
              Back to Home
            </Link>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer
        className="py-8 text-center px-4 border-t border-border-primary"
      >
        <p className="text-sm text-text-secondary">
          © 2025 ReceiptGold. All rights reserved.
        </p>
        <div className="flex justify-center space-x-6 mt-4">
          <Link
            href="/privacy-policy"
            className="text-sm hover:opacity-80 transition-opacity text-gold-primary"
          >
            Privacy Policy
          </Link>
          <Link
            href="/terms"
            className="text-sm hover:opacity-80 transition-opacity text-gold-primary"
          >
            Terms of Service
          </Link>
          <Link
            href="/delete-account"
            className="text-sm hover:opacity-80 transition-opacity text-gold-primary"
          >
            Delete Account
          </Link>
        </div>
      </footer>
    </div>
  );
}
