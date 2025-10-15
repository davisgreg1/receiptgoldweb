'use client';

import { motion } from 'framer-motion';
import { useTheme } from '../theme/theme';
import Link from 'next/link';
import { FaFileContract, FaClock, FaCheckCircle, FaFileAlt, FaUser, FaCreditCard, FaBook, FaShieldAlt, FaExclamationTriangle, FaEnvelope } from 'react-icons/fa';
import { useState } from 'react';

interface TermsSection {
  id: string;
  title: string;
  content: TermsContent[];
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
}

interface TermsContent {
  type: 'header' | 'text' | 'list';
  text?: string;
  items?: string[];
}

const termsSections: TermsSection[] = [
  {
    id: '1',
    title: 'Acceptance of Terms',
    icon: FaCheckCircle,
    content: [
      {
        type: 'text',
        text: 'By downloading, installing, or using ReceiptGold ("the App"), you agree to be bound by these Terms of Service ("Terms").'
      },
      {
        type: 'header',
        text: 'Agreement to Terms:'
      },
      {
        type: 'list',
        items: [
          'These Terms constitute a legal agreement between you and GregDavisTech, LLC',
          'If you don\'t agree to these Terms, you may not use our service',
          'Continued use of the App indicates acceptance of any updates to these Terms',
          'You must be at least 18 years old or have parental consent to use ReceiptGold',
          'Business users must have authority to bind their organization to these Terms'
        ]
      },
      {
        type: 'header',
        text: 'Updates to Terms:'
      },
      {
        type: 'list',
        items: [
          'We may modify these Terms at any time with reasonable notice',
          'Material changes will be communicated through the App and email',
          'Continued use after changes constitutes acceptance',
          'Previous versions are available upon request',
          'We will provide 30 days notice for material changes affecting paid users'
        ]
      },
      {
        type: 'header',
        text: 'Applicable Law:'
      },
      {
        type: 'list',
        items: [
          'These Terms are governed by California law, without regard to conflict of law principles',
          'Any disputes will be resolved in California state or federal courts',
          'If any provision is invalid or unenforceable, the rest remain in effect',
          'These Terms supersede any previous agreements or communications',
          'Both parties consent to the jurisdiction of California courts'
        ]
      }
    ]
  },
  {
    id: '2',
    title: 'Service Description',
    icon: FaFileAlt,
    content: [
      {
        type: 'text',
        text: 'ReceiptGold provides comprehensive digital receipt management and expense tracking services for individuals and teams.'
      },
      {
        type: 'header',
        text: 'Core Services:'
      },
      {
        type: 'list',
        items: [
          'Receipt scanning using device camera or image picker',
          'AI-powered OCR technology for automatic data extraction',
          'Intelligent expense categorization and organization',
          'Tax report generation and export in multiple formats (PDF, CSV, Excel)',
          'Real-time cloud backup and multi-device synchronization',
          'Team collaboration and business management features',
          'Bank transaction monitoring and matching via financial services integration providers (Professional tier)',
          'Subscription management through subscription management services'
        ]
      },
      {
        type: 'header',
        text: 'Subscription Tiers:'
      },
      {
        type: 'list',
        items: [
          'Starter: Enhanced features with increased receipt limits',
          'Growth: Advanced reporting, analytics, and integrations',
          'Professional: Unlimited features, advanced team management, and priority support',
          'Teammate: Special access for team members of Professional accounts'
        ]
      },
      {
        type: 'header',
        text: 'Service Availability:'
      },
      {
        type: 'list',
        items: [
          'We strive for 99.9% uptime but cannot guarantee uninterrupted service',
          'Scheduled maintenance will be communicated in advance via app and email',
          'Emergency maintenance may occur with minimal notice',
          'Service availability may vary by region due to infrastructure',
          'Mobile app works offline with data sync when connection resumes'
        ]
      },
      {
        type: 'header',
        text: 'Service Limitations:'
      },
      {
        type: 'list',
        items: [
          'OCR accuracy depends on receipt image quality and legibility',
          'Some features require internet connectivity for full functionality',
          'Storage and processing limits apply based on subscription tier',
          'Processing speed may vary based on system load and device performance',
          'AI extraction accuracy may vary by receipt type and language',
          'Team features require Professional tier subscription'
        ]
      },
      {
        type: 'header',
        text: 'Beta and Experimental Features:'
      },
      {
        type: 'list',
        items: [
          'Some features may be in beta, preview, or testing phases',
          'Beta features are provided "as-is" without warranties or SLA guarantees',
          'We may discontinue, modify, or graduate beta features at any time',
          'Feedback on beta features is appreciated and helps improve the service',
          'Beta features may have additional limitations or usage restrictions'
        ]
      }
    ]
  },
  {
    id: '3',
    title: 'User Accounts & Responsibilities',
    icon: FaUser,
    content: [
      {
        type: 'text',
        text: 'You are responsible for your account and the information you provide to ReceiptGold.'
      },
      {
        type: 'header',
        text: 'Account Creation:'
      },
      {
        type: 'list',
        items: [
          'You must provide accurate, current, and complete information',
          'You\'re responsible for maintaining your login credentials and account security',
          'One account per person or business entity (team accounts managed separately)',
          'You must notify us immediately of any unauthorized account access',
          'Business accounts must be created by authorized representatives',
          'Team members require valid invitations from account holders'
        ]
      },
      {
        type: 'header',
        text: 'User Responsibilities:'
      },
      {
        type: 'list',
        items: [
          'Keep your login information secure and confidential',
          'Use the service only for lawful business and personal expense tracking purposes',
          'Don\'t share accounts or allow unauthorized access to your account',
          'Maintain accurate receipt and expense information for your records',
          'Report any bugs, security issues, or vulnerabilities promptly',
          'Comply with applicable tax laws and regulations in your jurisdiction',
          'Respect team member access controls and permissions',
          'Keep your subscription and billing information current'
        ]
      },
      {
        type: 'header',
        text: 'Prohibited Activities:'
      },
      {
        type: 'list',
        items: [
          'Uploading false, misleading, or fraudulent receipt data',
          'Attempting to hack, reverse engineer, or compromise the service',
          'Using the service to violate any laws, regulations, or third-party rights',
          'Sharing copyrighted content without proper authorization',
          'Creating fake accounts, impersonating others, or providing false identity information',
          'Transmitting viruses, malware, or any malicious code',
          'Attempting to access other users\' accounts or data without authorization',
          'Using the service for any illegal financial activities or money laundering',
          'Circumventing subscription limits or attempting to defraud our billing system',
          'Scraping, crawling, or automated data extraction from our services',
          'Reselling or redistributing our services without authorization'
        ]
      },
      {
        type: 'header',
        text: 'Team Account Responsibilities:'
      },
      {
        type: 'list',
        items: [
          'Account holders are responsible for managing team member access',
          'Ensure team members comply with these Terms and your organization\'s policies',
          'Monitor team usage and maintain appropriate subscription levels',
          'Properly configure team permissions and data access controls',
          'Remove team member access when employment or collaboration ends'
        ]
      },
      {
        type: 'header',
        text: 'Account Termination:'
      },
      {
        type: 'list',
        items: [
          'You may delete your account at any time through app settings or by contacting support',
          'We may suspend or terminate accounts for Terms violations after appropriate notice',
          'Upon termination, your data will be deleted according to our Privacy Policy',
          'Outstanding subscription fees remain due upon termination',
          'You may export your data before account deletion',
          'Terminated accounts cannot be reactivated; you must create a new account'
        ]
      }
    ]
  },
  {
    id: '4',
    title: 'Subscription & Billing',
    icon: FaCreditCard,
    content: [
      {
        type: 'text',
        text: 'ReceiptGold offers multiple subscription tiers with different features and varying prices based on tier and billing period. Current pricing information is available in the mobile app.'
      },
      {
        type: 'header',
        text: 'Subscription Tiers:'
      },
      {
        type: 'list',
        items: [
          'Starter: Paid monthly subscription with unlimited storage, LLC categories, and educational content',
          'Growth: Paid monthly or annual subscription with advanced reporting, integrations, and priority support',
          'Professional: Paid monthly or annual subscription with multi-business management, advanced team features, and dedicated support',
          'Teammate: Free access for team members invited by Professional account holders',
          'Subscription pricing varies by tier and billing period - current prices are displayed in the app',
          'Pricing may vary by region and is subject to applicable taxes and app store fees',
          'All pricing is subject to change with advance notice as described in our pricing change policy'
        ]
      },
      {
        type: 'header',
        text: 'Billing Terms:'
      },
      {
        type: 'list',
        items: [
          'Subscriptions are processed through device app stores',
          'Billing is handled by subscription management services and your device\'s app store payment method',
          'Subscriptions are billed monthly or annually in advance',
          'All fees are non-refundable except as required by law or app store policies',
          'Subscription auto-renews unless cancelled before renewal date through your device\'s subscription settings',
          'Taxes and fees are determined by your location and app store policies'
        ]
      },
      {
        type: 'header',
        text: 'Changes to Pricing:'
      },
      {
        type: 'list',
        items: [
          'We may change subscription prices with 30 days advance notice',
          'Existing subscribers will be notified before price changes take effect',
          'You may cancel before price changes to avoid new rates',
          'Grandfathered pricing may apply to existing subscribers at our discretion',
          'Price changes are subject to app store approval processes'
        ]
      },
      {
        type: 'header',
        text: 'Refund Policy:'
      },
      {
        type: 'list',
        items: [
          'Generally, all payments are final and non-refundable',
          'Refund requests must be made through your device\'s app store (Apple App Store or Google Play)',
          'We cannot process refunds directly; all refunds are handled by app stores',
          'Exceptions may be made for technical issues preventing service use',
          'Refund requests should be made within 30 days of payment',
          'Contact our support team for assistance with refund requests'
        ]
      },
      {
        type: 'header',
        text: 'Free Trial and Promotions:'
      },
      {
        type: 'list',
        items: [
          'New users may be eligible for free trial periods as offered by app stores',
          'Trial periods automatically convert to paid subscriptions unless cancelled',
          'Cancel through your device\'s subscription settings before trial ends to avoid charges',
          'One trial per user or payment method',
          'Promotional pricing may be offered at our discretion',
          'Promotional terms may have additional restrictions'
        ]
      },
      {
        type: 'header',
        text: 'Team Billing:'
      },
      {
        type: 'list',
        items: [
          'Professional account holders are responsible for their team\'s usage',
          'Team members cannot have active individual subscriptions',
          'Account holders manage team size and access through subscription settings',
          'Team member limits may apply based on subscription tier'
        ]
      }
    ]
  },
  {
    id: '5',
    title: 'Intellectual Property',
    icon: FaBook,
    content: [
      {
        type: 'text',
        text: 'ReceiptGold and its content are protected by intellectual property laws.'
      },
      {
        type: 'header',
        text: 'Our Intellectual Property:'
      },
      {
        type: 'list',
        items: [
          'The ReceiptGold app, website, and services are our property',
          'All trademarks, logos, and brand elements belong to us',
          'The software, algorithms, and user interface are proprietary',
          'You may not copy, modify, or redistribute our intellectual property'
        ]
      },
      {
        type: 'header',
        text: 'Your Content:'
      },
      {
        type: 'list',
        items: [
          'You retain ownership of receipt images and data you upload',
          'You grant us license to process, store, and display your content',
          'This license is necessary to provide our services',
          'You can revoke this license by deleting your content or account'
        ]
      },
      {
        type: 'header',
        text: 'Third-Party Content:'
      },
      {
        type: 'list',
        items: [
          'Some features may include third-party content or services',
          'Third-party content is subject to separate terms and licenses',
          'We don\'t claim ownership of third-party intellectual property',
          'Report any copyright infringement to legal@receiptgold.com'
        ]
      },
      {
        type: 'header',
        text: 'DMCA Policy:'
      },
      {
        type: 'list',
        items: [
          'We comply with the Digital Millennium Copyright Act',
          'Submit takedown notices to legal@receiptgold.com',
          'Include all required DMCA information in your notice',
          'False claims may result in legal liability'
        ]
      },
      {
        type: 'header',
        text: 'License to Use:'
      },
      {
        type: 'list',
        items: [
          'We grant you a limited, non-exclusive license to use ReceiptGold',
          'This license is personal and non-transferable',
          'You may not sublicense or resell access to our services',
          'This license terminates when your account is closed'
        ]
      }
    ]
  },
  {
    id: '6',
    title: 'Data & Privacy',
    icon: FaShieldAlt,
    content: [
      {
        type: 'text',
        text: 'Your privacy and data security are important to us, as detailed in our Privacy Policy.'
      },
      {
        type: 'header',
        text: 'Data Collection:'
      },
      {
        type: 'list',
        items: [
          'We collect information as described in our Privacy Policy',
          'Receipt images and extracted data are encrypted and secured',
          'Usage analytics help us improve the service',
          'You control what data you share with us'
        ]
      },
      {
        type: 'header',
        text: 'Data Use:'
      },
      {
        type: 'list',
        items: [
          'We use your data to provide and improve our services',
          'We don\'t sell your personal information to third parties',
          'Data may be shared with service providers under strict contracts',
          'You can request data deletion at any time'
        ]
      },
      {
        type: 'header',
        text: 'Data Security:'
      },
      {
        type: 'list',
        items: [
          'We implement industry-standard security measures',
          'All data transmission is encrypted using modern protocols',
          'Regular security audits ensure ongoing protection',
          'We promptly address any security vulnerabilities'
        ]
      },
      {
        type: 'header',
        text: 'Data Retention:'
      },
      {
        type: 'list',
        items: [
          'We retain your data while your account is active',
          'Deleted data is permanently removed within 30 days',
          'Some data may be retained for legal or regulatory requirements',
          'You can export your data before account deletion'
        ]
      },
      {
        type: 'header',
        text: 'International Transfers:'
      },
      {
        type: 'list',
        items: [
          'Your data may be processed in the United States',
          'We comply with applicable international privacy laws',
          'Appropriate safeguards protect data during transfers',
          'EU users have specific rights under GDPR'
        ]
      }
    ]
  },
  {
    id: '7',
    title: 'Disclaimers & Limitations',
    icon: FaExclamationTriangle,
    content: [
      {
        type: 'text',
        text: 'ReceiptGold is provided "as-is" with certain limitations on our liability and warranties.'
      },
      {
        type: 'header',
        text: 'Service Disclaimers:'
      },
      {
        type: 'list',
        items: [
          'We provide the service "as-is" and "as-available" without warranties of any kind',
          'We don\'t guarantee uninterrupted, error-free, or completely secure operation',
          'AI/OCR accuracy may vary based on image quality, receipt type, and language',
          'Third-party integrations (financial services, app stores, cloud infrastructure providers) are subject to their own terms and availability',
          'Mobile app functionality depends on device capabilities and operating system versions',
          'Data synchronization depends on internet connectivity and may experience delays'
        ]
      },
      {
        type: 'header',
        text: 'No Professional Advice:'
      },
      {
        type: 'list',
        items: [
          'ReceiptGold is a tool for organizing receipts and tracking expenses',
          'We don\'t provide tax, legal, accounting, or financial advice',
          'Our categorizations and reports are suggestions, not professional recommendations',
          'Consult qualified professionals for tax preparation, legal guidance, and financial planning',
          'You\'re responsible for compliance with applicable laws, regulations, and tax requirements',
          'Always verify AI-extracted data for accuracy before using for official purposes'
        ]
      },
      {
        type: 'header',
        text: 'Data and Accuracy Disclaimers:'
      },
      {
        type: 'list',
        items: [
          'While we strive for accuracy, AI/OCR processing may contain errors',
          'You\'re responsible for reviewing and verifying all extracted data',
          'We don\'t guarantee the completeness or accuracy of receipt processing',
          'Currency conversions and calculations are estimates only',
          'Tax category suggestions may not be appropriate for your specific situation',
          'Bank transaction matching may have false positives or missed matches'
        ]
      },
      {
        type: 'header',
        text: 'Limitation of Liability:'
      },
      {
        type: 'list',
        items: [
          'Our total liability is limited to the amount you paid for the service in the 12 months preceding the claim',
          'We\'re not liable for indirect, incidental, consequential, special, or punitive damages',
          'This includes loss of data, profits, business opportunities, or revenue',
          'We\'re not liable for damages caused by third-party services or integrations',
          'Some jurisdictions don\'t allow liability limitations, so these may not apply to you',
          'Our liability limitations apply even if we\'ve been advised of the possibility of such damages'
        ]
      },
      {
        type: 'header',
        text: 'Force Majeure:'
      },
      {
        type: 'list',
        items: [
          'We\'re not liable for delays or failures caused by circumstances beyond our reasonable control',
          'This includes natural disasters, government actions, pandemics, or technical infrastructure failures',
          'Third-party service outages (app stores, cloud providers, payment processors)',
          'Internet connectivity issues or mobile network problems',
          'Service credits may be provided for extended outages at our discretion',
          'We\'ll communicate service disruptions through available channels as soon as possible'
        ]
      },
      {
        type: 'header',
        text: 'Indemnification:'
      },
      {
        type: 'list',
        items: [
          'You agree to indemnify and hold us harmless from claims arising from your use of the service',
          'This includes claims related to your content, data, or violations of these Terms',
          'Claims arising from your team members\' use of the service (for team accounts)',
          'Violations of third-party rights or applicable laws through your use of the service',
          'We\'ll notify you of any claims and reasonably cooperate in defense',
          'This obligation survives termination of these Terms and your account'
        ]
      }
    ]
  },
  {
    id: '8',
    title: 'Termination & Contact',
    icon: FaEnvelope,
    content: [
      {
        type: 'text',
        text: 'These Terms remain effective until terminated by either party.'
      },
      {
        type: 'header',
        text: 'Termination by You:'
      },
      {
        type: 'list',
        items: [
          'You may terminate your account at any time through app settings',
          'Cancellation stops future billing; refunds are subject to app store policies',
          'Your data will be deleted according to our Privacy Policy'
        ]
      },
      {
        type: 'header',
        text: 'Termination by Us:'
      },
      {
        type: 'list',
        items: [
          'We may terminate accounts for Terms violations',
          'We may discontinue the service with reasonable notice',
          'Paid subscribers will receive refunds for unused subscription time',
          'We\'ll provide data export opportunities before termination'
        ]
      },
      {
        type: 'header',
        text: 'Effect of Termination:'
      },
      {
        type: 'list',
        items: [
          'Your license to use ReceiptGold ends immediately',
          'You must stop using the service and delete any copies',
          'Provisions regarding liability and indemnification survive termination',
          'Outstanding payment obligations remain due'
        ]
      },
      {
        type: 'header',
        text: 'Effective Date:'
      },
      {
        type: 'text',
        text: 'These Terms of Service are effective as of October 1, 2025.'
      },
      {
        type: 'header',
        text: 'Data Processors:'
      },
      {
        type: 'text',
        text: 'A complete list of our data processors and their privacy practices is available in our Privacy Policy and can be requested by contacting legal@receiptgold.com.'
      },
      {
        type: 'header',
        text: 'Contact Information:'
      },
      {
        type: 'text',
        text: 'For questions about these Terms:'
      },
      {
        type: 'list',
        items: [
          'Email: legal@receiptgold.com',
          'Support: Through the app\'s Contact Support feature',
        ]
      },
      {
        type: 'header',
        text: 'Dispute Resolution:'
      },
      {
        type: 'list',
        items: [
          'We encourage resolving disputes through direct communication',
          'California law governs these Terms',
          'Disputes will be resolved in California state or federal courts',
          'You may have rights to arbitration under applicable law'
        ]
      },
      {
        type: 'header',
        text: 'Severability:'
      },
      {
        type: 'text',
        text: 'If any provision of these Terms is found invalid, the remaining provisions continue in full force and effect.'
      }
    ]
  }
];

export default function TermsOfServicePage() {
  const { theme } = useTheme();
  const [expandedSection, setExpandedSection] = useState<string | null>('1');

  const toggleSection = (id: string) => {
    setExpandedSection(expandedSection === id ? null : id);
  };

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
          <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <span
              className="text-lg sm:text-2xl font-heading font-bold tracking-tight"
              style={{ color: theme.text.primary }}
            >
              ReceiptGold
            </span>
          </Link>
          <Link
            href="/"
            className="px-4 py-2 rounded-lg transition-colors duration-300"
            style={{
              backgroundColor: theme.gold.primary,
              color: theme.text.inverse
            }}
          >
            Back to Home
          </Link>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
        {/* Title Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div
            className="w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center"
            style={{ backgroundColor: theme.gold.background }}
          >
            <FaFileContract
              className="text-4xl"
              style={{ color: theme.gold.primary }}
            />
          </div>
          <h1
            className="text-4xl sm:text-6xl font-heading font-black mb-4 tracking-tight"
            style={{ color: theme.text.primary }}
          >
            Terms of Service
          </h1>
          <p
            className="text-lg sm:text-xl mb-6 max-w-3xl mx-auto"
            style={{ color: theme.text.secondary }}
          >
            These terms govern your use of ReceiptGold. Please read them carefully.
          </p>
          <div
            className="inline-flex items-center space-x-2 px-4 py-2 rounded-full"
            style={{ backgroundColor: theme.background.secondary }}
          >
            <FaClock style={{ color: theme.text.secondary }} />
            <span
              className="text-sm font-medium"
              style={{ color: theme.text.secondary }}
            >
              Last updated: October 1, 2025
            </span>
          </div>
        </motion.div>

        {/* Quick Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <h2
            className="text-2xl font-heading font-bold mb-4"
            style={{ color: theme.text.primary }}
          >
            Quick Navigation
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {termsSections.map((section) => {
              const IconComponent = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => toggleSection(section.id)}
                  className="flex items-center space-x-2 px-4 py-3 rounded-xl transition-all duration-300 border"
                  style={{
                    backgroundColor: expandedSection === section.id
                      ? theme.gold.primary
                      : theme.background.secondary,
                    borderColor: expandedSection === section.id
                      ? theme.gold.primary
                      : theme.border.primary,
                    color: expandedSection === section.id
                      ? theme.text.inverse
                      : theme.text.primary
                  }}
                >
                  <IconComponent className="flex-shrink-0" />
                  <span className="text-sm font-medium text-left line-clamp-2">
                    {section.title}
                  </span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Terms Sections */}
        <div className="space-y-6">
          {termsSections.map((section, index) => {
            const IconComponent = section.icon;
            return (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                className="rounded-2xl border overflow-hidden"
                style={{
                  backgroundColor: theme.background.secondary,
                  borderColor: theme.border.primary
                }}
              >
                <button
                  onClick={() => toggleSection(section.id)}
                  className="w-full flex items-center justify-between p-6 hover:opacity-80 transition-opacity"
                >
                  <div className="flex items-center space-x-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: theme.gold.background }}
                    >
                      <IconComponent
                        className="text-xl"
                        style={{ color: theme.gold.primary }}
                      />
                    </div>
                    <div className="text-left">
                      <div
                        className="text-sm font-semibold mb-1"
                        style={{ color: theme.text.tertiary }}
                      >
                        {String(index + 1).padStart(2, '0')}
                      </div>
                      <h3
                        className="text-xl font-heading font-bold"
                        style={{ color: theme.text.primary }}
                      >
                        {section.title}
                      </h3>
                    </div>
                  </div>
                  <div
                    className="text-2xl transition-transform duration-300"
                    style={{
                      color: theme.text.secondary,
                      transform: expandedSection === section.id ? 'rotate(180deg)' : 'rotate(0deg)'
                    }}
                  >
                    ▼
                  </div>
                </button>

                {expandedSection === section.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-6 pb-6 border-t"
                    style={{ borderColor: theme.border.primary }}
                  >
                    {section.content.map((item, idx) => {
                      if (item.type === 'header') {
                        return (
                          <h4
                            key={idx}
                            className="text-lg font-bold mt-6 mb-3"
                            style={{ color: theme.text.primary }}
                          >
                            {item.text}
                          </h4>
                        );
                      } else if (item.type === 'text') {
                        return (
                          <p
                            key={idx}
                            className="mb-4 leading-relaxed"
                            style={{ color: theme.text.secondary }}
                          >
                            {item.text}
                          </p>
                        );
                      } else if (item.type === 'list') {
                        return (
                          <ul key={idx} className="space-y-2 mb-4 ml-2">
                            {item.items?.map((listItem, listIdx) => (
                              <li
                                key={listIdx}
                                className="flex items-start space-x-3"
                              >
                                <span
                                  className="mt-1 flex-shrink-0 font-bold"
                                  style={{ color: theme.gold.primary }}
                                >
                                  •
                                </span>
                                <span
                                  className="leading-relaxed"
                                  style={{ color: theme.text.secondary }}
                                >
                                  {listItem}
                                </span>
                              </li>
                            ))}
                          </ul>
                        );
                      }
                      return null;
                    })}
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Footer CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 p-8 rounded-2xl text-center border-t"
          style={{ borderColor: theme.border.primary }}
        >
          <div className="flex justify-center mb-4">
            <FaFileContract
              className="text-3xl"
              style={{ color: theme.gold.primary }}
            />
          </div>
          <h3
            className="text-2xl font-heading font-bold mb-2"
            style={{ color: theme.text.primary }}
          >
            Questions about these terms?
          </h3>
          <p
            className="text-lg mb-6"
            style={{ color: theme.text.secondary }}
          >
            Contact us anytime at legal@receiptgold.com
          </p>
          <Link
            href="/"
            className="inline-block px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
            style={{
              backgroundColor: theme.gold.primary,
              color: theme.text.inverse
            }}
          >
            Back to Home
          </Link>
        </motion.div>
      </main>

      {/* Footer */}
      <footer
        className="py-8 text-center px-4 border-t"
        style={{ borderColor: theme.border.primary }}
      >
        <p
          className="text-sm"
          style={{ color: theme.text.secondary }}
        >
          © 2025 ReceiptGold. All rights reserved.
        </p>
        <div className="flex justify-center space-x-6 mt-4">
          <Link
            href="/privacy-policy"
            className="text-sm hover:opacity-80 transition-opacity"
            style={{ color: theme.gold.primary }}
          >
            Privacy Policy
          </Link>
          <Link
            href="/terms"
            className="text-sm hover:opacity-80 transition-opacity"
            style={{ color: theme.gold.primary }}
          >
            Terms of Service
          </Link>
        </div>
      </footer>
    </div>
  );
}
