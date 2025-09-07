'use client';

import { useUserPermissions } from '@/hooks/useUserPermissions';
import TeammateStatusCard from './TeammateStatusCard';
import { FaCog as Settings, FaCreditCard as CreditCard, FaUsers as Users, FaBuilding as Building2, FaBell as Bell } from 'react-icons/fa';

interface SettingsContentProps {
  userId?: string;
  className?: string;
}

export default function SettingsContent({ userId, className = '' }: SettingsContentProps) {
  const { permissions, isTeamMember, isAccountHolder, teamMemberData, loading } = useUserPermissions(userId);

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-48"></div>
        <div className="h-64 bg-gray-200 rounded-2xl"></div>
        <div className="h-32 bg-gray-200 rounded-xl"></div>
      </div>
    );
  }

  return (
    <div className={`space-y-8 ${className}`}>
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
        <p className="text-gray-600">
          {isTeamMember ? 'Manage your team member preferences and view your account details.' : 'Manage your account, subscription, and business settings.'}
        </p>
      </div>

      {/* Team Member Status Card (only for team members) */}
      {isTeamMember && teamMemberData && (
        <TeammateStatusCard teamMember={teamMemberData} />
      )}

      {/* Account Holder Subscription Section (only for account holders) */}
      {isAccountHolder && (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
          <div className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center justify-center w-10 h-10 bg-gold-primary/10 rounded-lg">
                <CreditCard className="w-5 h-5 text-gold-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Subscription</h2>
                <p className="text-sm text-gray-600">Manage your plan and billing</p>
              </div>
            </div>
            
            {/* Subscription content would go here */}
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">Subscription management interface would be displayed here.</p>
            </div>
          </div>
        </div>
      )}

      {/* Business Management (read-only for teammates, full access for account holders) */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-lg">
              <Building2 className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Business Information</h2>
              <p className="text-sm text-gray-600">
                {permissions.canEditBusiness ? 'Manage your business details' : 'View business information'}
              </p>
            </div>
          </div>
          
          {/* Business content would go here */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">
              {permissions.canEditBusiness ? 
                'Business management interface would be displayed here.' : 
                'Business information (read-only) would be displayed here.'
              }
            </p>
          </div>
        </div>
      </div>

      {/* Team Management (only for account holders and admins) */}
      {permissions.canManageTeam && (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
          <div className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center justify-center w-10 h-10 bg-green-100 rounded-lg">
                <Users className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Team Management</h2>
                <p className="text-sm text-gray-600">Invite and manage team members</p>
              </div>
            </div>
            
            {/* Team management content would go here */}
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">Team management interface would be displayed here.</p>
            </div>
          </div>
        </div>
      )}

      {/* Notifications (available to everyone) */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center justify-center w-10 h-10 bg-purple-100 rounded-lg">
              <Bell className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Notifications</h2>
              <p className="text-sm text-gray-600">Configure your notification preferences</p>
            </div>
          </div>
          
          {/* Notification settings would go here */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">Notification preferences would be displayed here.</p>
          </div>
        </div>
      </div>

      {/* Account Settings (available to everyone) */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-lg">
              <Settings className="w-5 h-5 text-gray-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Account Settings</h2>
              <p className="text-sm text-gray-600">Update your profile and security settings</p>
            </div>
          </div>
          
          {/* Account settings would go here */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">Account settings interface would be displayed here.</p>
          </div>
        </div>
      </div>
    </div>
  );
}