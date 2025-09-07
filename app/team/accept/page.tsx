'use client';

import { motion } from 'framer-motion';
import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FaReceipt, FaUser, FaBuilding, FaSpinner, FaEye, FaEyeSlash } from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi';
import { useTheme } from '../../theme/theme';
import { TeamInvitation } from '../../../types/team';

function TeamAcceptContent() {
  const { theme } = useTheme();
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  
  const [invitation, setInvitation] = useState<TeamInvitation | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    displayName: '',
    firstName: '',
    lastName: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    if (token) {
      validateToken(token);
    } else {
      setError('No invitation token provided');
      setLoading(false);
    }
  }, [token]);

  const validateToken = async (invitationToken: string) => {
    try {
      const response = await fetch(`/api/team-invitations/validate?token=${encodeURIComponent(invitationToken)}`);
      
      if (!response.ok) {
        throw new Error('Invalid or expired invitation');
      }

      const data = await response.json();
      setInvitation(data);
      setFormData(prev => ({ ...prev, email: data.inviteEmail }));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to validate invitation');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!token) {
      setError('No invitation token provided');
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/team-invitations/accept', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: token,
          password: formData.password,
          displayName: formData.displayName || `${formData.firstName} ${formData.lastName}`.trim(),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to accept invitation');
      }

      // Redirect to success page
      router.push('/team-welcome');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to accept invitation');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div 
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: theme.background.primary }}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="text-4xl"
          style={{ color: theme.gold.primary }}
        >
          <FaSpinner />
        </motion.div>
      </div>
    );
  }

  // Only show error page for token validation errors, not form validation errors
  if ((error && !invitation) || !invitation) {
    return (
      <div 
        className="min-h-screen flex items-center justify-center p-4"
        style={{ backgroundColor: theme.background.primary }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full text-center p-8 rounded-3xl"
          style={{ 
            backgroundColor: theme.background.elevated,
            boxShadow: theme.shadow.large 
          }}
        >
          <div 
            className="text-6xl mb-6"
            style={{ color: theme.gold.primary }}
          >
            <FaReceipt />
          </div>
          <h1 
            className="text-2xl font-bold mb-4"
            style={{ color: theme.text.primary }}
          >
            Invalid Invitation
          </h1>
          <p 
            className="text-lg mb-6"
            style={{ color: theme.text.secondary }}
          >
            {error || 'This invitation link is invalid or has expired.'}
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push('/')}
            className="px-6 py-3 rounded-2xl font-semibold"
            style={{ 
              backgroundColor: theme.gold.primary,
              color: theme.text.inverse 
            }}
          >
            Go Home
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4"
      style={{ backgroundColor: theme.background.primary }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-lg w-full"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-6 flex justify-center"
          >
            <div 
              className="w-20 h-20 rounded-2xl flex items-center justify-center relative"
              style={{ 
                backgroundImage: `linear-gradient(135deg, ${theme.gold.primary}, ${theme.gold.rich})`,
                boxShadow: theme.shadow.large
              }}
            >
              <FaReceipt 
                className="text-3xl" 
                style={{ color: theme.text.inverse }}
              />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -top-1 -right-1"
              >
                <HiSparkles 
                  className="text-xl" 
                  style={{ color: theme.gold.primary }}
                />
              </motion.div>
            </div>
          </motion.div>

          <h1 
            className="text-3xl font-bold mb-4"
            style={{ color: theme.text.primary }}
          >
            Join Team ReceiptGold
          </h1>
          
          {/* Invitation Details */}
          <div 
            className="p-6 rounded-2xl mb-8"
            style={{ 
              backgroundColor: theme.background.elevated,
              boxShadow: theme.shadow.medium 
            }}
          >
            <div className="flex items-center justify-center mb-4">
              <FaBuilding 
                className="text-2xl mr-3"
                style={{ color: theme.gold.primary }}
              />
              <div>
                <h2 
                  className="text-xl font-semibold"
                  style={{ color: theme.text.primary }}
                >
                  {invitation.businessName}
                </h2>
                <p 
                  className="text-sm"
                  style={{ color: theme.text.secondary }}
                >
                  Invited by {invitation.accountHolderName}
                </p>
              </div>
            </div>
            <div 
              className="inline-block px-4 py-2 rounded-full text-sm font-medium"
              style={{ 
                backgroundColor: theme.gold.primary + '20',
                color: theme.gold.primary 
              }}
            >
              {invitation.role === 'admin' ? 'Admin Role' : 'Team Member Role'}
            </div>
          </div>
        </div>

        {/* Join Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="p-8 rounded-3xl"
          style={{ 
            backgroundColor: theme.background.elevated,
            boxShadow: theme.shadow.large 
          }}
        >
          <h2 
            className="text-xl font-bold mb-6"
            style={{ color: theme.text.primary }}
          >
            Create Your Account
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email (read-only) */}
            <div>
              <label 
                className="block text-sm font-medium mb-2"
                style={{ color: theme.text.primary }}
              >
                Email Address
              </label>
              <input
                type="email"
                value={formData.email}
                readOnly
                className="w-full px-4 py-3 rounded-xl opacity-60"
                style={{ 
                  backgroundColor: theme.background.secondary,
                  color: theme.text.primary,
                  border: `1px solid ${theme.border.primary}`
                }}
              />
            </div>

            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label 
                  className="block text-sm font-medium mb-2"
                  style={{ color: theme.text.primary }}
                >
                  First Name
                </label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl focus:outline-none transition-all duration-300"
                  style={{ 
                    backgroundColor: theme.background.secondary,
                    color: theme.text.primary,
                    border: `1px solid ${theme.border.primary}`
                  }}
                  onFocus={(e) => {
                    e.target.style.border = `1px solid ${theme.gold.primary}`;
                  }}
                  onBlur={(e) => {
                    e.target.style.border = `1px solid ${theme.border.primary}`;
                  }}
                />
              </div>
              <div>
                <label 
                  className="block text-sm font-medium mb-2"
                  style={{ color: theme.text.primary }}
                >
                  Last Name
                </label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl focus:outline-none transition-all duration-300"
                  style={{ 
                    backgroundColor: theme.background.secondary,
                    color: theme.text.primary,
                    border: `1px solid ${theme.border.primary}`
                  }}
                  onFocus={(e) => {
                    e.target.style.border = `1px solid ${theme.gold.primary}`;
                  }}
                  onBlur={(e) => {
                    e.target.style.border = `1px solid ${theme.border.primary}`;
                  }}
                />
              </div>
            </div>

            {/* Display Name (optional) */}
            <div>
              <label 
                className="block text-sm font-medium mb-2"
                style={{ color: theme.text.primary }}
              >
                Display Name (Optional)
              </label>
              <input
                type="text"
                value={formData.displayName}
                onChange={(e) => setFormData(prev => ({ ...prev, displayName: e.target.value }))}
                placeholder="How you'd like to be shown"
                className="w-full px-4 py-3 rounded-xl focus:outline-none transition-all duration-300"
                style={{ 
                  backgroundColor: theme.background.secondary,
                  color: theme.text.primary,
                  border: `1px solid ${theme.border.primary}`
                }}
                onFocus={(e) => {
                  e.target.style.border = `1px solid ${theme.gold.primary}`;
                }}
                onBlur={(e) => {
                  e.target.style.border = `1px solid ${theme.border.primary}`;
                }}
              />
            </div>

            {/* Password */}
            <div>
              <label 
                className="block text-sm font-medium mb-2"
                style={{ color: theme.text.primary }}
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                  required
                  className="w-full px-4 py-3 pr-12 rounded-xl focus:outline-none transition-all duration-300"
                  style={{ 
                    backgroundColor: theme.background.secondary,
                    color: theme.text.primary,
                    border: `1px solid ${theme.border.primary}`
                  }}
                  onFocus={(e) => {
                    e.target.style.border = `1px solid ${theme.gold.primary}`;
                  }}
                  onBlur={(e) => {
                    e.target.style.border = `1px solid ${theme.border.primary}`;
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-lg hover:bg-opacity-10 hover:bg-gray-500 transition-all duration-200"
                  style={{ color: theme.text.secondary }}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label 
                className="block text-sm font-medium mb-2"
                style={{ color: theme.text.primary }}
              >
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                  required
                  className="w-full px-4 py-3 pr-12 rounded-xl focus:outline-none transition-all duration-300"
                  style={{ 
                    backgroundColor: theme.background.secondary,
                    color: theme.text.primary,
                    border: `1px solid ${theme.border.primary}`
                  }}
                  onFocus={(e) => {
                    e.target.style.border = `1px solid ${theme.gold.primary}`;
                  }}
                  onBlur={(e) => {
                    e.target.style.border = `1px solid ${theme.border.primary}`;
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-lg hover:bg-opacity-10 hover:bg-gray-500 transition-all duration-200"
                  style={{ color: theme.text.secondary }}
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div 
                className="p-4 rounded-xl text-sm"
                style={{ 
                  backgroundColor: theme.status?.error + '20' || '#EF4444' + '20',
                  color: theme.status?.error || '#EF4444',
                  border: `1px solid ${theme.status?.error || '#EF4444'}20`
                }}
              >
                {error}
              </div>
            )}

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={submitting || !formData.password || !formData.confirmPassword}
              className="w-full py-4 rounded-2xl font-semibold text-lg flex items-center justify-center space-x-2 transition-all duration-300"
              style={{ 
                backgroundColor: (submitting || !formData.password || !formData.confirmPassword) 
                  ? theme.gold.primary + '60' 
                  : theme.gold.primary,
                color: theme.text.inverse,
                boxShadow: theme.shadow.medium
              }}
            >
              {submitting ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <FaSpinner />
                  </motion.div>
                  <span>Joining Team...</span>
                </>
              ) : (
                <>
                  <FaUser />
                  <span>Join Team</span>
                </>
              )}
            </motion.button>
          </form>

          <p 
            className="text-center text-sm mt-6"
            style={{ color: theme.text.tertiary }}
          >
            By joining, you agree to our Terms of Service and Privacy Policy
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default function TeamAcceptPage() {
  return (
    <Suspense fallback={
      <div 
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: '#FFFFFF' }}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="text-4xl"
          style={{ color: '#B8860B' }}
        >
          <FaSpinner />
        </motion.div>
      </div>
    }>
      <TeamAcceptContent />
    </Suspense>
  );
}