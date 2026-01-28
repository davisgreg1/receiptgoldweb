'use client';

import { useQuery } from '@tanstack/react-query';
import { db } from '@/lib/firebase-client';
import { collection, query, where, getDocs, Timestamp } from 'firebase/firestore';
import { useUserPermissions } from './useUserPermissions';

export function useMonthlySpend(userId?: string) {
    const { isTeamMember, teamMemberData, loading: permissionsLoading } = useUserPermissions(userId);

    const { data: spend, isLoading, error } = useQuery({
        queryKey: ['monthly-spend', userId, isTeamMember, teamMemberData?.accountHolderId],
        queryFn: async () => {
            if (!db) throw new Error("Firestore not initialized");

            let targetUserId = userId;
            if (isTeamMember && teamMemberData?.accountHolderId) {
                targetUserId = teamMemberData.accountHolderId;
            }

            // Calculate start and end of current month
            const now = new Date();
            const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
            const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);

            const receiptsRef = collection(db, 'receipts');
            const q = query(
                receiptsRef,
                where('userId', '==', targetUserId),
                where('date', '>=', Timestamp.fromDate(startOfMonth)),
                where('date', '<=', Timestamp.fromDate(endOfMonth))
            );

            const snapshot = await getDocs(q);

            let total = 0;
            snapshot.forEach(doc => {
                const data = doc.data();
                if (typeof data.amount === 'number') {
                    total += data.amount;
                }
            });

            return total;
        },
        enabled: !!userId && !permissionsLoading,
        staleTime: 10 * 60 * 1000, // 10 minutes cache for spend
    });

    return { spend: spend ?? null, isLoading, error };
}
