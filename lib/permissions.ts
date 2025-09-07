import { TeamPermissions, TeamMemberRole } from '@/types/team';

/**
 * Get default permissions based on team member role
 */
export function getPermissionsForRole(role: TeamMemberRole): TeamPermissions {
  switch (role) {
    case 'teammate':
      return {
        // Receipt permissions - full access
        canCreateReceipts: true,
        canEditOwnReceipts: true,
        canDeleteOwnReceipts: true,
        canViewTeamReceipts: false,
        
        // Business permissions - read-only
        canViewBusiness: true,
        canCreateBusiness: false,
        canEditBusiness: false,
        canDeleteBusiness: false,
        
        // Subscription permissions - no access
        canViewSubscription: false,
        canEditSubscription: false,
        canManageTeam: false,
        
        // UI/Feature permissions - Professional tier features, no limits
        hasReceiptLimits: false,
        showsProfessionalFeatures: true,
      };
    case 'admin':
      return {
        // Receipt permissions - full access
        canCreateReceipts: true,
        canEditOwnReceipts: true,
        canDeleteOwnReceipts: true,
        canViewTeamReceipts: true,
        
        // Business permissions - full access
        canViewBusiness: true,
        canCreateBusiness: true,
        canEditBusiness: true,
        canDeleteBusiness: true,
        
        // Subscription permissions - limited access
        canViewSubscription: true,
        canEditSubscription: false, // Only account holder can edit subscription
        canManageTeam: true,
        
        // UI/Feature permissions - Professional tier features, no limits
        hasReceiptLimits: false,
        showsProfessionalFeatures: true,
      };
    default:
      return getGuestPermissions();
  }
}

/**
 * Get permissions for non-team members (guest/basic users)
 */
export function getGuestPermissions(): TeamPermissions {
  return {
    canCreateReceipts: true,
    canEditOwnReceipts: true,
    canDeleteOwnReceipts: true,
    canViewTeamReceipts: false,
    canViewBusiness: true,
    canCreateBusiness: true,
    canEditBusiness: true,
    canDeleteBusiness: true,
    canViewSubscription: true,
    canEditSubscription: true,
    canManageTeam: false,
    hasReceiptLimits: true, // Basic users have limits
    showsProfessionalFeatures: false, // Unless they have Pro subscription
  };
}

/**
 * Get permissions for account holders (Professional tier users)
 */
export function getAccountHolderPermissions(): TeamPermissions {
  return {
    canCreateReceipts: true,
    canEditOwnReceipts: true,
    canDeleteOwnReceipts: true,
    canViewTeamReceipts: true,
    canViewBusiness: true,
    canCreateBusiness: true,
    canEditBusiness: true,
    canDeleteBusiness: true,
    canViewSubscription: true,
    canEditSubscription: true,
    canManageTeam: true,
    hasReceiptLimits: false, // Pro users have no limits
    showsProfessionalFeatures: true,
  };
}

/**
 * Check if user can perform a specific action
 */
export function canUserPerformAction(
  permissions: TeamPermissions, 
  action: keyof TeamPermissions
): boolean {
  return permissions[action] === true;
}

/**
 * Check if user should see Professional tier UI
 */
export function shouldShowProfessionalUI(permissions: TeamPermissions): boolean {
  return permissions.showsProfessionalFeatures;
}

/**
 * Check if user has receipt limits
 */
export function userHasReceiptLimits(permissions: TeamPermissions): boolean {
  return permissions.hasReceiptLimits;
}

/**
 * Get max receipt count for user (returns null if no limit)
 */
export function getMaxReceiptCount(permissions: TeamPermissions): number | null {
  return permissions.hasReceiptLimits ? 10 : null;
}