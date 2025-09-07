'use client';

import { TeamMember, TeamMemberRole } from '@/types/team';
import { FaUsers as Users, FaCrown as Crown, FaBuilding as Building2, FaEnvelope as Mail, FaCalendar as Calendar } from 'react-icons/fa';
import { BsShield as Shield } from 'react-icons/bs';

interface TeammateStatusCardProps {
  teamMember: TeamMember;
  className?: string;
}

export default function TeammateStatusCard({ teamMember, className = '' }: TeammateStatusCardProps) {
  const getRoleIcon = (role: TeamMemberRole) => {
    switch (role) {
      case 'admin':
        return <Crown className="w-5 h-5 text-gold-primary" />;
      case 'teammate':
        return <Users className="w-5 h-5 text-blue-500" />;
      default:
        return <Shield className="w-5 h-5 text-gray-500" />;
    }
  };

  const getRoleLabel = (role: TeamMemberRole) => {
    switch (role) {
      case 'admin':
        return 'Team Admin';
      case 'teammate':
        return 'Team Member';
      default:
        return 'Team Member';
    }
  };

  const getRoleDescription = (role: TeamMemberRole) => {
    switch (role) {
      case 'admin':
        return 'You have administrative privileges and can manage team members and view all business data.';
      case 'teammate':
        return 'You have access to create and manage receipts for this business with Professional features.';
      default:
        return 'Team member with standard access privileges.';
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  return (
    <div className={`bg-gradient-to-br from-white to-gray-50 rounded-2xl border border-gray-200 shadow-lg ${className}`}>
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-50 rounded-xl">
              {getRoleIcon(teamMember.role)}
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900">
                {getRoleLabel(teamMember.role)}
              </h3>
              <p className="text-sm text-gray-600">
                Professional Features Enabled
              </p>
            </div>
          </div>
          <div className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
            Active
          </div>
        </div>

        {/* Role Description */}
        <div className="mb-6">
          <p className="text-gray-700 leading-relaxed">
            {getRoleDescription(teamMember.role)}
          </p>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-100">
            <Building2 className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide">Business</p>
              <p className="text-sm font-medium text-gray-900">{teamMember.businessName}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-100">
            <Mail className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide">Account Holder</p>
              <p className="text-sm font-medium text-gray-900">{teamMember.accountHolderEmail}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-100">
            <Calendar className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide">Joined</p>
              <p className="text-sm font-medium text-gray-900">{formatDate(teamMember.joinedAt)}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-100">
            <Shield className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide">Status</p>
              <p className="text-sm font-medium text-green-600 capitalize">{teamMember.status}</p>
            </div>
          </div>
        </div>

        {/* Features Info */}
        <div className="mt-6 p-4 bg-gradient-to-r from-gold-primary/10 to-gold-muted/10 rounded-lg border border-gold-primary/20">
          <h4 className="text-sm font-semibold text-gold-rich mb-2">✨ Professional Features Available</h4>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>• Unlimited receipt storage</li>
            <li>• Advanced categorization and tagging</li>
            <li>• Export and reporting features</li>
            <li>• Team collaboration tools</li>
          </ul>
        </div>

        {/* Contact Info */}
        {teamMember.role === 'teammate' && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-xs text-gray-500">
              Need changes to your account or have questions? Contact your account holder at{' '}
              <span className="font-medium text-gray-700">{teamMember.accountHolderEmail}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}