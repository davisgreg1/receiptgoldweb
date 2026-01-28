'use client';

import { getUserSubscription } from '@/app/actions/get-subscription';
import { auth } from '@/lib/firebase-client';
import { useQuery } from '@tanstack/react-query';

export interface SubscriptionBilling {
    revenueCatUserId: string;
    billingPeriod: 'monthly' | 'annual';
    currentPeriodStart: string;
    currentPeriodEnd?: string;
    billingIssueDetectedAt: string | null;
    originalPurchaseDate: string;
}

export interface SubscriptionFeatures {
    taxPreparation: boolean;
    apiAccess: boolean;
    prioritySupport: boolean;
    multiBusinessManagement: boolean;
    advancedReporting: boolean;
    [key: string]: boolean; // Allow additional features
}

export interface SubscriptionLimits {
    maxBusinesses: number;
    maxReceipts: number;
    apiCallsPerMonth: number;
    maxReports: number;
}

export interface SubscriptionHistoryEntry {
    type: string;
    timestamp: string;
    [key: string]: unknown;
}

export interface LastRevenueCatEvent {
    eventData: Record<string, unknown>;
    productId: string;
    type: string;
    timestamp: string;
}

export type SubscriptionTier = 'free' | 'starter' | 'growth' | 'professional';
export type SubscriptionStatus = 'active' | 'canceled' | 'expired' | 'paused' | 'trial';

export interface UserSubscription {
    id: string;
    userId: string;
    billing: SubscriptionBilling;
    createdAt: string;
    updatedAt: string;
    currentTier: SubscriptionTier;
    tier: SubscriptionTier;
    status: SubscriptionStatus;
    deleted: boolean;
    wasDeleted: boolean;
    features: SubscriptionFeatures;
    limits: SubscriptionLimits;
    history: SubscriptionHistoryEntry[];
    lastMonthlyCountResetAt: string;
    lastRevenueCatEvent: LastRevenueCatEvent;
    lastSyncSource: string;
    lastWebhookUpdate: string;
    productId: string;
    restoredAt: string | null;
    syncedAt: string;
}

export interface UseSubscriptionResult {
    data: UserSubscription | null | undefined;
    isLoading: boolean;
    isError: boolean;
    error: Error | null;
}

export function useSubscription(userId?: string): UseSubscriptionResult {
    const { data, isLoading, isError, error } = useQuery<UserSubscription | null>({
        queryKey: ['user-subscription', userId],
        queryFn: async () => {
            if (!auth?.currentUser) throw new Error("Not authenticated");
            return getUserSubscription(userId as string);
        },
        enabled: !!userId,
    });

    return { data, isLoading, isError, error };
}