'use client';

import { motion } from 'framer-motion';
import { useTheme } from '../theme/theme';
import Link from 'next/link';
import Image from 'next/image';
import { FaShieldAlt, FaClock, FaInfoCircle, FaCog, FaDatabase, FaLink, FaUserShield, FaGlobe, FaEnvelope } from 'react-icons/fa';
import { useState } from 'react';

interface PolicySection {
  id: string;
  title: string;
  content: PolicyContent[];
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
}

interface PolicyContent {
  type: 'header' | 'text' | 'list';
  text?: string;
  items?: string[];
}

const policySections: PolicySection[] = [
  {
    id: '1',
    title: 'Information We Collect',
    icon: FaInfoCircle,
    content: [
      {
        type: 'text',
        text: 'We collect information you provide directly to us, such as when you create an account, scan receipts, or contact us for support.'
      },
      {
        type: 'header',
        text: 'Personal Information:'
      },
      {
        type: 'list',
        items: [
          'Email address and account credentials',
          'Name and business information (if provided)',
          'Payment information (processed securely through payment processing services)',
          'Device identifiers and push notification tokens',
          'Team member information when you invite collaborators'
        ]
      },
      {
        type: 'header',
        text: 'Receipt Data:'
      },
      {
        type: 'list',
        items: [
          'Photos of receipts you scan using camera or image picker',
          'Extracted text and data from receipts (processed via AI/OCR)',
          'Categories and tags you assign',
          'Dates, amounts, vendor information, and tax details',
          'Receipt metadata (location if enabled, timestamp)'
        ]
      },
      {
        type: 'header',
        text: 'Usage Information:'
      },
      {
        type: 'list',
        items: [
          'How you interact with our app features',
          'Subscription tier and billing information',
          'Team management activities',
          'Device information (model, OS version, platform)',
          'App performance metrics and crash reports',
          'Feature usage analytics and user preferences'
        ]
      },
      {
        type: 'header',
        text: 'Financial Data (Professional users):'
      },
      {
        type: 'list',
        items: [
          'Bank transaction data (via financial services integration providers)',
          'Account balances and transaction history',
          'This data is encrypted in transit and not permanently stored',
          'Financial connections are tokenized for security'
        ]
      },
      {
        type: 'header',
        text: 'Team Data:'
      },
      {
        type: 'list',
        items: [
          'Business information for team accounts',
          'Team member roles and permissions',
          'Invitation tokens and collaboration history',
          'Team usage statistics and billing information'
        ]
      }
    ]
  },
  {
    id: '2',
    title: 'How We Use Your Information',
    icon: FaCog,
    content: [
      {
        type: 'text',
        text: 'We use your information to provide, maintain, and improve ReceiptGold\'s services.'
      },
      {
        type: 'header',
        text: 'Core Services:'
      },
      {
        type: 'list',
        items: [
          'Process and organize your receipt data using AI/OCR technology',
          'Generate expense reports and tax documents in multiple formats',
          'Sync your data across devices using cloud infrastructure and database services',
          'Provide customer support and troubleshooting',
          'Manage team accounts and collaboration features',
          'Process subscription payments through subscription and payment processing services'
        ]
      },
      {
        type: 'header',
        text: 'Service Improvement:'
      },
      {
        type: 'list',
        items: [
          'Analyze usage patterns to improve features and performance',
          'Develop new functionality based on user needs and feedback',
          'Ensure app stability through crash reporting and monitoring',
          'Prevent fraud, abuse, and unauthorized access',
          'Optimize AI models for better receipt processing accuracy'
        ]
      },
      {
        type: 'header',
        text: 'Communications:'
      },
      {
        type: 'list',
        items: [
          'Send important service updates and security notifications',
          'Respond to your support requests and feedback',
          'Send push notifications for app updates (with your consent)',
          'Send billing and subscription notifications',
          'Facilitate team invitations and collaboration'
        ]
      },
      {
        type: 'header',
        text: 'Legal and Compliance:'
      },
      {
        type: 'list',
        items: [
          'Comply with applicable laws and regulations',
          'Respond to legal requests and government inquiries',
          'Protect our rights and investigate potential violations',
          'Maintain audit trails for security purposes'
        ]
      },
      {
        type: 'text',
        text: 'We never sell your personal information to third parties or use it for advertising purposes outside of our own service improvements.'
      }
    ]
  },
  {
    id: '3',
    title: 'Data Storage & Security',
    icon: FaDatabase,
    content: [
      {
        type: 'text',
        text: 'Your data security is our top priority. We implement industry-standard security measures.'
      },
      {
        type: 'header',
        text: 'Encryption:'
      },
      {
        type: 'list',
        items: [
          'All data is encrypted in transit using TLS 1.3',
          'Receipt images are encrypted at rest in cloud storage services',
          'Database connections use encrypted protocols',
          'API communications are secured end-to-end',
          'Payment data is tokenized and never stored locally'
        ]
      },
      {
        type: 'header',
        text: 'Storage:'
      },
      {
        type: 'list',
        items: [
          'Data is stored on secure cloud infrastructure providers',
          'Servers are located in secure, compliant data centers',
          'Regular security audits and vulnerability assessments',
          'Automated backups with encryption and versioning',
          'Geographic redundancy for data protection'
        ]
      },
      {
        type: 'header',
        text: 'Access Controls:'
      },
      {
        type: 'list',
        items: [
          'Multi-factor authentication for our development team',
          'Role-based access controls with principle of least privilege',
          'Regular access reviews and security updates',
          'Comprehensive logging and monitoring of all data access',
          'Secure service account keys with rotation policies'
        ]
      },
      {
        type: 'header',
        text: 'Application Security:'
      },
      {
        type: 'list',
        items: [
          'React Native app with secure coding practices',
          'Device-level security features (biometric authentication)',
          'Secure token management for API access',
          'Regular security testing and code reviews',
          'Vulnerability scanning and penetration testing'
        ]
      },
      {
        type: 'header',
        text: 'Data Retention:'
      },
      {
        type: 'list',
        items: [
          'Receipt data is retained while your account is active',
          'Deleted data is permanently removed within 30 days',
          'You can request immediate data deletion at any time',
          'Financial connection data is not permanently stored',
          'Team data is retained for audit and compliance purposes',
          'Backup data follows the same retention policies'
        ]
      }
    ]
  },
  {
    id: '4',
    title: 'Third-Party Services',
    icon: FaLink,
    content: [
      {
        type: 'text',
        text: 'ReceiptGold integrates with trusted third-party services to provide enhanced functionality.'
      },
      {
        type: 'header',
        text: 'Financial Services Integration Providers:'
      },
      {
        type: 'list',
        items: [
          'Used for secure bank account connections in Professional tier',
          'Transaction data is encrypted and transmitted securely',
          'We don\'t store your banking credentials or account numbers',
          'Connections use tokenized access that can be revoked anytime',
          'Subject to respective provider privacy policies and security measures'
        ]
      },
      {
        type: 'header',
        text: 'Subscription and Payment Processing Services:'
      },
      {
        type: 'list',
        items: [
          'Handle all subscription billing and payment processing',
          'Integrate with Apple App Store and Google Play Store',
          'Your payment information is never stored on our servers',
          'Provide secure subscription validation and receipt verification',
          'Subject to respective provider privacy policies'
        ]
      },
      {
        type: 'header',
        text: 'Cloud Infrastructure and Database Services:'
      },
      {
        type: 'list',
        items: [
          'Provide secure data storage, authentication, and cloud functions',
          'Real-time database synchronization across devices',
          'Push notification services for app updates',
          'Servers located in secure, compliant data centers worldwide',
          'Automatic scaling, monitoring, and backup capabilities',
          'Subject to industry-leading privacy and security standards'
        ]
      },
      {
        type: 'header',
        text: 'AI and Machine Learning Processing Services:'
      },
      {
        type: 'list',
        items: [
          'Used to extract text and data from receipt images',
          'Receipt images are processed using machine learning models',
          'Images are processed securely and not permanently stored by providers',
          'Data transmission is encrypted and time-limited',
          'Multiple providers may be used for optimal accuracy'
        ]
      },
      {
        type: 'header',
        text: 'Development and Distribution Platforms:'
      },
      {
        type: 'list',
        items: [
          'Provide app development and distribution infrastructure',
          'Handle app updates and development tools',
          'Subject to platform privacy policies and security standards',
          'Do not access user data within the app'
        ]
      },
      {
        type: 'header',
        text: 'Analytics and Performance Monitoring Services:'
      },
      {
        type: 'list',
        items: [
          'Monitor app performance and crash reporting',
          'Analyze usage patterns for service improvement',
          'Provide anonymized analytics data',
          'Help ensure app stability and optimal user experience'
        ]
      },
      {
        type: 'header',
        text: 'Device and Platform Services:'
      },
      {
        type: 'list',
        items: [
          'Camera and image picker functionality',
          'Device storage and file system access',
          'Push notification services',
          'App store distribution and update mechanisms'
        ]
      },
      {
        type: 'text',
        text: 'We carefully vet all third-party services and ensure they meet our security standards before integration. For a current list of our data processing partners and subprocessors, please visit: https://receiptgold.com/data-processors'
      }
    ]
  },
  {
    id: '5',
    title: 'Your Privacy Rights',
    icon: FaUserShield,
    content: [
      {
        type: 'text',
        text: 'You have full control over your personal information and privacy settings.'
      },
      {
        type: 'header',
        text: 'Access & Download:'
      },
      {
        type: 'list',
        items: [
          'View all data we have about you',
          'Download your receipt data and reports',
          'Request a complete data export',
          'Access your account information anytime'
        ]
      },
      {
        type: 'header',
        text: 'Correction & Updates:'
      },
      {
        type: 'list',
        items: [
          'Update your profile information',
          'Correct any inaccurate receipt data',
          'Modify your preferences and settings',
          'Change your email or password'
        ]
      },
      {
        type: 'header',
        text: 'Deletion Rights:'
      },
      {
        type: 'list',
        items: [
          'Delete individual receipts or data',
          'Close your account and delete all data',
          'Request immediate data purging',
          'Export data before deletion'
        ]
      },
      {
        type: 'header',
        text: 'Privacy Controls:'
      },
      {
        type: 'list',
        items: [
          'Control email notifications and communications',
          'Manage data sharing preferences',
          'Set up two-factor authentication',
          'Review connected services and permissions'
        ]
      },
      {
        type: 'header',
        text: 'California Residents (CCPA):'
      },
      {
        type: 'list',
        items: [
          'Right to know what personal information is collected',
          'Right to delete personal information',
          'Right to opt-out of sale (we don\'t sell data)',
          'Non-discrimination for exercising privacy rights'
        ]
      }
    ]
  },
  {
    id: '6',
    title: 'Data Sharing',
    icon: FaShieldAlt,
    content: [
      {
        type: 'text',
        text: 'We are committed to protecting your privacy and do not sell your personal information.'
      },
      {
        type: 'header',
        text: 'We Never Share:'
      },
      {
        type: 'list',
        items: [
          'Your personal receipt data with advertisers or marketers',
          'Individual transaction information with third parties',
          'Personal contact information for marketing purposes',
          'Financial account details or banking information',
          'Team collaboration data outside your organization'
        ]
      },
      {
        type: 'header',
        text: 'Limited Sharing Cases:'
      },
      {
        type: 'list',
        items: [
          'With your explicit consent for specific features',
          'When required by law or valid legal process',
          'To protect our rights and prevent fraud or abuse',
          'With authorized service providers under strict data processing agreements',
          'For team features when you invite team members'
        ]
      },
      {
        type: 'header',
        text: 'Service Providers (Data Processors):'
      },
      {
        type: 'list',
        items: [
          'Cloud infrastructure and database services (encrypted data only)',
          'Subscription and payment processing services (for billing and subscription management)',
          'AI and machine learning processing services (for receipt text extraction - temporary processing only)',
          'Customer support tools (when you contact us for assistance)',
          'Analytics services (anonymized usage data for app improvement)',
          'Security monitoring services (for fraud prevention and system protection)'
        ]
      },
      {
        type: 'header',
        text: 'Team Features:'
      },
      {
        type: 'list',
        items: [
          'Data shared within your team is controlled by your team settings',
          'Team administrators can access team member receipt data as configured',
          'Business information is shared with invited team members',
          'Team usage statistics may be shared with account holders'
        ]
      },
      {
        type: 'header',
        text: 'Business Transfers:'
      },
      {
        type: 'list',
        items: [
          'In case of merger, acquisition, or business restructuring',
          'Your data rights and protections would be maintained',
          'You would be notified of any material changes',
          'Option to delete data before transfer if legally permissible'
        ]
      },
      {
        type: 'header',
        text: 'Legal Requirements:'
      },
      {
        type: 'list',
        items: [
          'Court orders or valid legal subpoenas',
          'Government requests where legally required and appropriate',
          'To protect safety and prevent harm to users or others',
          'To investigate fraud or violations of our terms',
          'Always reviewed by legal counsel before compliance'
        ]
      }
    ]
  },
  {
    id: '7',
    title: 'International Users',
    icon: FaGlobe,
    content: [
      {
        type: 'text',
        text: 'ReceiptGold is available globally, and we comply with international privacy regulations.'
      },
      {
        type: 'header',
        text: 'GDPR Compliance (EU Users):'
      },
      {
        type: 'list',
        items: [
          'Lawful basis for data processing',
          'Right to access, rectify, and erase data',
          'Right to data portability',
          'Right to object to processing',
          'Data Protection Officer available for contact'
        ]
      },
      {
        type: 'header',
        text: 'Data Transfers:'
      },
      {
        type: 'list',
        items: [
          'Data may be processed in the United States',
          'We use appropriate safeguards for international transfers',
          'Standard Contractual Clauses with service providers',
          'Compliance with Privacy Shield principles'
        ]
      },
      {
        type: 'header',
        text: 'Local Laws:'
      },
      {
        type: 'list',
        items: [
          'We comply with applicable local privacy laws',
          'Regular review of international regulations',
          'Updates to practices as laws evolve',
          'Local data residency options where required'
        ]
      },
      {
        type: 'header',
        text: 'Contact for International Users:'
      },
      {
        type: 'list',
        items: [
          'EU users can contact our DPO directly',
          'Specific forms for GDPR requests',
          'Local language support where possible',
          'Recognition of all applicable privacy rights'
        ]
      }
    ]
  },
  {
    id: '8',
    title: 'Updates & Contact',
    icon: FaEnvelope,
    content: [
      {
        type: 'text',
        text: 'We may update this privacy policy from time to time to reflect changes in our practices.'
      },
      {
        type: 'header',
        text: 'Policy Updates:'
      },
      {
        type: 'list',
        items: [
          'We will notify you of material changes',
          'Updates posted on our website and in-app',
          'Continued use constitutes acceptance',
          'Previous versions available upon request'
        ]
      },
      {
        type: 'header',
        text: 'Effective Date:'
      },
      {
        type: 'text',
        text: 'This privacy policy is effective as of October 1, 2025.'
      },
      {
        type: 'header',
        text: 'How to Contact Us:'
      },
      {
        type: 'text',
        text: 'If you have questions about this privacy policy or our data practices:'
      },
      {
        type: 'list',
        items: [
          'Email: privacy@receiptgold.com',
          'Support: Through the app\'s Contact Support feature',
        ]
      },
      {
        type: 'header',
        text: 'Data Protection Officer:'
      },
      {
        type: 'list',
        items: [
          'EU users: dpo@receiptgold.com',
          'Response within 30 days',
          'Dedicated to privacy matters',
          'Available for all privacy-related questions'
        ]
      },
      {
        type: 'header',
        text: 'Data Processing Partners:'
      },
      {
        type: 'text',
        text: 'For a current list of our data processing partners and subprocessors, please visit: https://receiptgold.com/data-processors'
      },
      {
        type: 'text',
        text: 'We\'re committed to transparency and will always respond promptly to your privacy concerns and requests.'
      }
    ]
  }
];

export default function PrivacyPolicyPage() {
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
            <FaShieldAlt
              className="text-4xl"
              style={{ color: theme.gold.primary }}
            />
          </div>
          <h1
            className="text-4xl sm:text-6xl font-heading font-black mb-4 tracking-tight"
            style={{ color: theme.text.primary }}
          >
            Privacy Policy
          </h1>
          <p
            className="text-lg sm:text-xl mb-6 max-w-3xl mx-auto"
            style={{ color: theme.text.secondary }}
          >
            Your privacy is important to us. This policy explains how we collect, use, and protect your information.
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
            {policySections.map((section) => {
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

        {/* Policy Sections */}
        <div className="space-y-6">
          {policySections.map((section, index) => {
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
            <FaShieldAlt
              className="text-3xl"
              style={{ color: theme.gold.primary }}
            />
          </div>
          <h3
            className="text-2xl font-heading font-bold mb-2"
            style={{ color: theme.text.primary }}
          >
            Questions about your privacy?
          </h3>
          <p
            className="text-lg mb-6"
            style={{ color: theme.text.secondary }}
          >
            Contact us anytime at privacy@receiptgold.com
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
