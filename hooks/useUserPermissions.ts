'use client';

import { useState, useEffect } from 'react';
import { TeamPermissions, TeamMember } from '@/types/team';
import { getPermissionsForRole, getAccountHolderPermissions, canUserPerformAction } from '@/lib/permissions';

export interface UserPermissionsData {
  permissions: TeamPermissions;
  isTeamMember: boolean;
  isAccountHolder: boolean;
  teamMemberData?: TeamMember;
  loading: boolean;
  error?: string;
}

export function useUserPermissions(userId?: string): UserPermissionsData {
  const [data, setData] = useState<UserPermissionsData>({
    permissions: getAccountHolderPermissions(), // Default to account holder permissions
    isTeamMember: false,
    isAccountHolder: true,
    loading: true,
  });

  useEffect(() => {
    if (!userId) {
      setData(prev => ({ ...prev, loading: false }));
      return;
    }

    async function fetchUserPermissions() {
      try {
        setData(prev => ({ ...prev, loading: true, error: undefined }));

        // Check if user is a team member
        const response = await fetch(`/api/user/permissions?userId=${userId}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch user permissions');
        }

        const result = await response.json();

        if (result.isTeamMember && result.teamMember) {
          // User is a team member
          setData({
            permissions: getPermissionsForRole(result.teamMember.role),
            isTeamMember: true,
            isAccountHolder: false,
            teamMemberData: result.teamMember,
            loading: false,
          });
        } else {
          // User is an account holder or regular user
          setData({
            permissions: getAccountHolderPermissions(),
            isTeamMember: false,
            isAccountHolder: true,
            loading: false,
          });
        }
      } catch (error) {
        console.error('Error fetching user permissions:', error);
        setData(prev => ({
          ...prev,
          loading: false,
          error: error instanceof Error ? error.message : 'Unknown error',
        }));
      }
    }

    fetchUserPermissions();
  }, [userId]);

  return data;
}

// Convenience hook for checking specific permissions
export function useCanUserPerformAction(userId?: string, action?: keyof TeamPermissions) {
  const { permissions, loading } = useUserPermissions(userId);
  
  if (!action || loading) return false;
  
  return canUserPerformAction(permissions, action);
}